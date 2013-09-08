///<reference path='Parser.ts' />
///<reference path='Builder.ts' />

module ReVIEW {

	/**
	 * コマンドライン引数を解釈した結果のオプション。
	 */
	export interface IOptions {
		reviewfile?:string;
		base?:string;
	}

	/**
	 * コンパイル実行時の設定。
	 * 本についての情報や処理実行時のプログラムの差し替え。
	 */
	export interface IConfig {
		// TODO めんどくさくてまだ書いてない要素がたくさんある

		read?:(path:string)=>string;
		write?:(path:string, data:string)=>void;

		outputReport?:(reports:ReVIEW.ProcessReport[])=>void;

		compileSuccess?:()=>void;
		compileFailed?:()=>void;

		analyzer:Build.IAnalyzer;
		validators:Build.IValidator[];
		builders:Build.IBuilder[];

		book:{
			preface?:string[];
			chapters:string[];
			afterword?:string[];
		};
	}

	/**
	 * 処理時に発生したレポートのレベル。
	 */
	export enum ReportLevel {
		Info,
		Warning,
		Error
	}

	/**
	 * 処理時に発生したレポート。
	 */
	export class ProcessReport {
		constructor(public level:ReportLevel, public part:Part, public chapter:Chapter, public message:string, public nodes:Parse.SyntaxTree[] = []) {
		}
	}

	/**
	 * コンパイル処理時の出力ハンドリング。
	 */
	export class Process {
		symbols:ISymbol[] = [];
		indexCounter:{ [kind:string]:number; } = {};
		afterProcess:Function[] = [];
		private _reports:ProcessReport[] = [];

		constructor(public part:Part, public chapter:Chapter) {
		}

		info(message:string, ...nodes:Parse.SyntaxTree[]) {
			this._reports.push(new ProcessReport(ReportLevel.Info, this.part, this.chapter, message, nodes));
		}

		warn(message:string, ...nodes:Parse.SyntaxTree[]) {
			this._reports.push(new ProcessReport(ReportLevel.Warning, this.part, this.chapter, message, nodes));
		}

		error(message:string, ...nodes:Parse.SyntaxTree[]) {
			this._reports.push(new ProcessReport(ReportLevel.Error, this.part, this.chapter, message, nodes));
		}

		nextIndex(kind:string) {
			var nextIndex = this.indexCounter[kind];
			if (typeof nextIndex === "undefined") {
				nextIndex = 1;
			} else {
				nextIndex++;
			}
			this.indexCounter[kind] = nextIndex;
			return nextIndex;
		}

		get reports():ProcessReport[] {
			return this._reports.sort((a, b) => {
				if (a.nodes.length === 0 && b.nodes.length === 0) {
					return 0;
				} else if (a.nodes.length === 0) {
					return -1;
				} else if (b.nodes.length === 0) {
					return 1;
				} else {
					return a.nodes[0].offset - b.nodes[0].offset;
				}
			});
		}

		addSymbol(symbol:ISymbol) {
			symbol.part = this.part;
			symbol.chapter = this.chapter;
			this.symbols.push(symbol);
		}

		get missingSymbols():ISymbol[] {
			var result:ISymbol[] = [];
			this.symbols.forEach(symbol=> {
				if (symbol.referenceTo && !symbol.referenceTo.referenceNode) {
					result.push(symbol);
				}
			});
			return result;
		}

		addAfterProcess(func:Function) {
			this.afterProcess.push(func);
		}

		doAfterProcess() {
			this.afterProcess.forEach((func)=>func());
			this.afterProcess = [];
		}
	}

	export class BuilderProcess {

		constructor(public builder:ReVIEW.Build.IBuilder, public base:Process) {
		}

		get info():(message:string, ...nodes:Parse.SyntaxTree[])=>void {
			return this.base.info;
		}

		get warn():(message:string, ...nodes:Parse.SyntaxTree[])=>void {
			return this.base.warn;
		}

		get error():(message:string, ...nodes:Parse.SyntaxTree[])=>void {
			return this.base.error;
		}

		result:string = "";

		out(data:any):BuilderProcess {
			// 最近のブラウザだと単純結合がアホみたいに早いらしいので
			this.result += data;
			return this;
		}

		get symbols():ISymbol[] {
			return this.base.symbols;
		}
	}

	/**
	 * シンボルについての情報。
	 */
	export interface ISymbol {
		part?:Part;
		chapter?:Chapter;
		symbolName:string;
		labelName?:string;
		referenceTo?:IReferenceTo;
		node:ReVIEW.Parse.SyntaxTree;
	}

	/**
	 * 参照先についての情報。
	 */
	export interface IReferenceTo {
		part?:Part;
		partName:string;
		chapter?:Chapter;
		chapterName:string;
		targetSymbol:string;
		label:string;
		// 上記情報から解決した結果のNode
		referenceNode?:ReVIEW.Parse.SyntaxTree;
	}

	/**
	 * 本全体を表す。
	 */
	export class Book {
		parts:Part[] = [];

		constructor(public config:IConfig) {
		}

		get reports():ProcessReport[] {
			var flatten = (data:any[])=> {
				if (data.some((d)=>Array.isArray(d))) {
					return flatten(data.reduce((p, c)=> p.concat(c), []));
				} else {
					return data;
				}
			};
			return flatten(this.parts.map(part=>part.chapters.map(chapter=>chapter.process.reports)));
		}
	}

	/**
	 * パートを表す。
	 * パートは 前書き、本文、後書き など。
	 * Ruby版でいうと PREDEF, CHAPS, POSTDEF。
	 * 章番号はパート毎に採番される。(Ruby版では PREDEF は採番されない)
	 */
	export class Part {
		chapters:Chapter[];

		constructor(public parent:Book, public no:number, public name:string) {
		}
	}

	/**
	 * チャプターを表す。
	 */
	export class Chapter {
		process:Process;
		builderProcesses:BuilderProcess[] = [];

		constructor(public parent:Part, public no:number, public name:string, public root:ReVIEW.Parse.SyntaxTree) {
			this.process = new Process(this.parent, this);
		}

		createBuilderProcess(builder:ReVIEW.Build.IBuilder):BuilderProcess {
			var builderProcess = new BuilderProcess(builder, this.process);
			this.builderProcesses.push(builderProcess);
			return builderProcess;
		}

		findResultByBuilder(builderName:string);

		findResultByBuilder(builder:ReVIEW.Build.IBuilder);

		findResultByBuilder(builder:any) {
			var founds:BuilderProcess[];
			if (typeof builder === "string") {
				founds = this.builderProcesses.filter(process => process.builder.name === builder);
			} else {
				founds = this.builderProcesses.filter(process => process.builder === builder);
			}
			// TODO 何かエラー投げたほうがいい気もするなー
			return founds[0].result;
		}
	}

	/**
	 * 構文解析用途のモジュール。
	 */
	export module Parse {

		/**
		 * 構文解析時に発生したエラー。
		 */
		export class ParseError implements Error {
			name:string;

			constructor(public syntax:IConcreatSyntaxTree, public message:string) {
				if ((<any>Error).captureStackTrace) {
					(<any>Error).captureStackTrace(this, ParseError);
				}
				this.name = "ParseError";
			}
		}

		/**
		 * 構文解析直後の生データ。
		 */
		export interface IConcreatSyntaxTree {
			// 共通
			syntax: string;
			line: number;
			column: number;
			offset: number;

			// Ruleによっては
			headline?: any;
			text?:any;
			level?:number;
			label?:any;
			tag?:any;
			caption?:any;
			name?:any;
			args?:any;
			content?:any;
			contents?:any;
			arg?:any;
			no?:any;
		}

		/**
		 * 構文解析時のルール名。
		 */
		export enum RuleName {
			SyntaxError,

			Start,
			Chapters,
			Chapter,
			Headline,
			Paragraphs,
			Paragraph,
			Contents,
			Content,
			ContentText,
			BlockElement,
			InlineElement,
			BracketArg,
			BraceArg,
			BlockElementContents,
			BlockElementContent,
			BlockElementContentText,
			InlineElementContents,
			InlineElementContent,
			InlineElementContentText,
			SinglelineContent,
			ContentInlines,
			ContentInline,
			ContentInlineText,
			Ulist,
			UlistElement,
			Olist,
			OlistElement,
			Dlist,
			DlistElement,
			DlistElementContent,
			SinglelineComment,
		}

		/**
		 * 構文解析後の少し加工したデータ。
		 */
		export class SyntaxTree {
			parentNode:SyntaxTree;
			offset:number;
			line:number;
			column:number;
			ruleName:RuleName;
			// analyzer 中で設定する項目
			no:number;

			constructor(data:IConcreatSyntaxTree) {
				this.ruleName = RuleName[data.syntax];
				if (typeof this.ruleName === "undefined") {
					throw new ParseError(data, "unknown rule: " + data.syntax);
				}
				this.offset = data.offset;
				this.line = data.line;
				this.column = data.column;
			}

			toJSON():any {
				var result = {};
				for (var k in this) {
					if (k === "ruleName") {
						result[k] = RuleName[this[k]];
					} else if (k === "fqn") {
						// TODO あとでちゃんと出るようにする
					} else if (k !== "parentNode" && typeof this[k] !== "function") {
						result[k] = this[k];
					}
				}
				return result;
			}

			toString(indentLevel:number = 0):string {
				var result = this.makeIndent(indentLevel) + "SyntaxTree:[\n";
				result += this.makeIndent(indentLevel + 1) + "offset = " + this.offset + ",\n";
				result += this.makeIndent(indentLevel + 1) + "line=" + this.line + ",\n";
				result += this.makeIndent(indentLevel + 1) + "column=" + this.column + ",\n";
				result += this.makeIndent(indentLevel + 1) + "name=" + RuleName[this.ruleName] + ",\n";
				this.toStringHook(indentLevel, result);
				result += this.makeIndent(indentLevel) + "]";

				return result;
			}

			makeIndent(indentLevel:number) {
				var indent = "";
				for (var i = 0; i < indentLevel; i++) {
					indent += "  ";
				}
				return indent;
			}

			toStringHook(indentLevel:number, result:string) {
			}

			/**
			 * 引数が数字かどうかチェックして違うならば例外を投げる。
			 * @param value
			 * @returns {*=}
			 */
				checkNumber(value:any):number {
				if (typeof value !== "number") {
					throw new Error("number required. actual:" + (typeof value) + ":" + value);
				} else {
					return value;
				}
			}

			/**
			 * 引数が文字列かどうかチェックして違うならば例外を投げる。
			 * @param value
			 * @returns {*=}
			 */
				checkString(value:any):string {
				if (typeof value !== "string") {
					throw new Error("string required. actual:" + (typeof value) + ":" + value);
				} else {
					return value;
				}
			}

			/**
			 * 引数がオブジェクトかどうかチェックして違うならば例外を投げる。
			 * @param value
			 * @returns {*=}
			 */
				checkObject(value:any):any {
				if (typeof value !== "object") {
					throw new Error("object required. actual:" + (typeof value) + ":" + value);
				} else {
					return value;
				}
			}

			/**
			 * 引数がArrayかどうかチェックして違うならば例外を投げる。
			 * @param value
			 * @returns {*=}
			 */
				checkArray(value:any):any[] {
				if (!Array.isArray(value)) {
					throw new Error("array required. actual:" + (typeof value) + ":" + value);
				} else {
					return value;
				}
			}

			private toOtherNode<T extends SyntaxTree >(clazz:any):T {
				if (this instanceof clazz) {
					return <T>this;
				} else {
					throw new Error("this node is not " + clazz.name + ", actual " + (<any>this).constructor.name);
				}
			}

			/**
			 * thisをNodeSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
			 */
				toNode():NodeSyntaxTree {
				return this.toOtherNode<NodeSyntaxTree>(NodeSyntaxTree);
			}

			/**
			 * thisをBlockElementSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
			 */
				toBlockElement():BlockElementSyntaxTree {
				return this.toOtherNode<BlockElementSyntaxTree>(BlockElementSyntaxTree);
			}

			/**
			 * thisをInlineElementSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
			 */
				toInlineElement():InlineElementSyntaxTree {
				return this.toOtherNode<InlineElementSyntaxTree>(InlineElementSyntaxTree);
			}

			/**
			 * thisをArgumentSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
			 */
				toArgument():ArgumentSyntaxTree {
				return this.toOtherNode<ArgumentSyntaxTree>(ArgumentSyntaxTree);
			}

			/**
			 * thisをChapterSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
			 */
				toChapter():ChapterSyntaxTree {
				return this.toOtherNode<ChapterSyntaxTree>(ChapterSyntaxTree);
			}

			/**
			 * thisをHeadlineSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
			 */
				toHeadline():HeadlineSyntaxTree {
				return this.toOtherNode<HeadlineSyntaxTree>(HeadlineSyntaxTree);
			}

			/**
			 * thisをUlistElementSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
			 */
				toUlist():UlistElementSyntaxTree {
				return this.toOtherNode<UlistElementSyntaxTree>(UlistElementSyntaxTree);
			}

			/**
			 * thisをOlistElementSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
			 */
				toOlist():OlistElementSyntaxTree {
				return this.toOtherNode<OlistElementSyntaxTree>(OlistElementSyntaxTree);
			}

			/**
			 * thisをDlistElementSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
			 */
				toDlist():DlistElementSyntaxTree {
				return this.toOtherNode<DlistElementSyntaxTree>(DlistElementSyntaxTree);
			}

			/**
			 * thisをTextNodeSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
			 */
				toTextNode():TextNodeSyntaxTree {
				return this.toOtherNode<TextNodeSyntaxTree>(TextNodeSyntaxTree);
			}
		}

		export class NodeSyntaxTree extends SyntaxTree {
			childNodes:SyntaxTree[];

			constructor(data:IConcreatSyntaxTree) {
				super(data);
				this.childNodes = [];
				this.processChildNodes(data.content);
			}

			private processChildNodes(content:any) {
				if (Array.isArray(content)) {
					content.forEach((rawResult:IConcreatSyntaxTree)=> {
						var tree = transform(rawResult);
						if (tree) {
							this.childNodes.push(tree);
						}
					});
				} else if (content !== "" && content) {
					((rawResult:IConcreatSyntaxTree)=> {
						var tree = transform(rawResult);
						if (tree) {
							this.childNodes.push(tree);
						}
					})(content);
				}
			}

			toStringHook(indentLevel:number, result:string) {
				if (this.childNodes.length !== 0) {
					result += this.makeIndent(indentLevel + 1) + "childNodes[" + this.childNodes.length + "]=[\n";
					this.childNodes.forEach((node)=> {
						result += node.toString(indentLevel + 2);
						result += "\n";
					});
					result += this.makeIndent(indentLevel + 1) + "]\n";
				}
			}
		}

		// TODO SyntaxTree と指定されている所についてもっと細かく書けるはず…

		// TODO Chapter も NodeSyntaxTree を継承するべき
		export class ChapterSyntaxTree extends NodeSyntaxTree {
			headline:HeadlineSyntaxTree;
			text:SyntaxTree[];

			constructor(data:IConcreatSyntaxTree) {
				super(data);

				this.headline = transform(this.checkObject(data.headline)).toHeadline();
				if (typeof data.text === "string") {
					return;
				}
				this.text = this.checkArray(data.text.content).map((data:IConcreatSyntaxTree)=> {
					return transform(data);
				});

				delete this.childNodes; // JSON化した時の属性順制御のため…
				this.childNodes = [];
			}

			get level():number {
				return this.headline.level;
			}

			get fqn():string {
				var chapters:ChapterSyntaxTree[] = [];
				ReVIEW.walk(this, (node:SyntaxTree) => {
					if (node instanceof ReVIEW.Parse.ChapterSyntaxTree) {
						chapters.unshift(node.toChapter());
					}
					return node.parentNode;
				});
				var result = chapters.map((chapter)=> {
					return chapter.no;
				}).join(".");
				return result;
			}
		}

		export class HeadlineSyntaxTree extends SyntaxTree {
			level:number;
			label:ArgumentSyntaxTree;
			tag:ArgumentSyntaxTree;
			caption:NodeSyntaxTree;

			constructor(data:IConcreatSyntaxTree) {
				super(data);

				this.level = this.checkNumber(data.level);
				if (data.label !== "") {
					this.label = transform(this.checkObject(data.label)).toArgument();
				}
				if (data.tag !== "") {
					this.tag = transform(this.checkObject(data.tag)).toArgument();
				}
				this.caption = transform(this.checkObject(data.caption)).toNode();
			}
		}

		export class BlockElementSyntaxTree extends NodeSyntaxTree {
			name:string;
			args:ArgumentSyntaxTree[];

			constructor(data:IConcreatSyntaxTree) {
				super(data);
				this.name = this.checkString(data.name);
				this.args = this.checkArray(data.args).map((data:IConcreatSyntaxTree)=> {
					return transform(data).toArgument();
				});
			}
		}

		export class InlineElementSyntaxTree extends NodeSyntaxTree {
			name:string;

			constructor(data:IConcreatSyntaxTree) {
				super(data);
				this.name = this.checkString(data.name);
			}
		}

		export class ArgumentSyntaxTree extends SyntaxTree {
			arg:string;

			constructor(data:IConcreatSyntaxTree) {
				super(data);
				this.arg = this.checkString(data.arg);
			}
		}

		export class UlistElementSyntaxTree extends NodeSyntaxTree {
			level:number;
			text:SyntaxTree;

			constructor(data:IConcreatSyntaxTree) {
				super(data);
				this.level = this.checkNumber(data.level);
				this.text = transform(this.checkObject(data.text));

				delete this.childNodes; // JSON化した時の属性順制御のため…
				this.childNodes = [];
			}
		}

		export class OlistElementSyntaxTree extends SyntaxTree {
			no:number;
			text:SyntaxTree;

			constructor(data:IConcreatSyntaxTree) {
				super(data);
				this.no = this.checkNumber(data.no);
				this.text = transform(this.checkObject(data.text));
			}
		}

		export class DlistElementSyntaxTree extends SyntaxTree {
			text:SyntaxTree;
			content:SyntaxTree;

			constructor(data:IConcreatSyntaxTree) {
				super(data);
				this.text = transform(this.checkObject(data.text));
				this.content = transform(this.checkObject(data.content));
			}
		}

		export class TextNodeSyntaxTree extends SyntaxTree {
			text:string;

			constructor(data:IConcreatSyntaxTree) {
				super(data);
				this.text = this.checkString(data.text);
			}
		}
	}
}
