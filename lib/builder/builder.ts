"use strict";

import { t } from "../i18n/i18n";
import { AnalyzerError } from "../js/exception";

import { Book, BuilderProcess, ContentChunk, Symbol } from "../model/compilerModel";

import { SyntaxTree, NodeSyntaxTree, ChapterSyntaxTree, BlockElementSyntaxTree, InlineElementSyntaxTree, HeadlineSyntaxTree, UlistElementSyntaxTree, OlistElementSyntaxTree, DlistElementSyntaxTree, TextNodeSyntaxTree, ColumnSyntaxTree, ColumnHeadlineSyntaxTree, SingleLineCommentSyntaxTree } from "../parser/parser";

import { TreeVisitorArg, visit, visitAsync } from "../parser/walker";

import { nodeContentToString, findUp } from "../utils/utils";

/**
 * IAnalyzerとIValidatorでチェックをした後に構文木から出力を生成する。
 */
export interface Builder {
    name: string;
    extention: string;
    init(book: Book): Promise<null>;
    escape(data: any): string;
    chapterPre(process: BuilderProcess, node: ChapterSyntaxTree): any;
    chapterPost(process: BuilderProcess, node: ChapterSyntaxTree): any;
    headlinePre(process: BuilderProcess, name: string, node: HeadlineSyntaxTree): any;
    headlinePost(process: BuilderProcess, name: string, node: HeadlineSyntaxTree): any;
    columnPre(process: BuilderProcess, node: ColumnSyntaxTree): any;
    columnPost(process: BuilderProcess, node: ColumnSyntaxTree): any;
    columnHeadlinePre(process: BuilderProcess, node: ColumnHeadlineSyntaxTree): any;
    columnHeadlinePost(process: BuilderProcess, node: ColumnHeadlineSyntaxTree): any;
    ulistPre(process: BuilderProcess, name: string, node: UlistElementSyntaxTree): any;
    ulistPost(process: BuilderProcess, name: string, node: UlistElementSyntaxTree): any;
    olistPre(process: BuilderProcess, name: string, node: OlistElementSyntaxTree): any;
    olistPost(process: BuilderProcess, name: string, node: OlistElementSyntaxTree): any;
    blockPre(process: BuilderProcess, name: string, node: BlockElementSyntaxTree): any;
    blockPost(process: BuilderProcess, name: string, node: BlockElementSyntaxTree): any;
    inlinePre(process: BuilderProcess, name: string, node: InlineElementSyntaxTree): any;
    inlinePost(process: BuilderProcess, name: string, node: InlineElementSyntaxTree): any;
    text(process: BuilderProcess, node: TextNodeSyntaxTree): any;
    singleLineComment?(process: BuilderProcess, node: SingleLineCommentSyntaxTree): any;
}

/**
 * 表。
 */
export interface Table {
    /**
     * セル。「行<>-セル」の構造。
     */
    cells: TableCell[][];

    /**
     * ヘッダー行の数。0のとき、ヘッダー行はなく、1列目がヘッダー扱い。
     */
    headerRowCount: number;
}

/**
 * 表のセル。
 */
export interface TableCell {
    /**
     * セルに含まれるノード。[InlineElementSyntax]か[BlockElementContentTextSyntax]のいずれか。
     */
    nodes: SyntaxTree[];
}

/**
 * テキストセル。
 */
interface TextCell {
    text: string;
    location: {
        start: {
            offset: number,
            line: number,
            column: number
        },
        end: {
            offset: number,
            line: number,
            column: number
        }
    };
}

/**
 * デフォルトのビルダ。
 * Re:VIEWのASTから何らかのテキストに変換する時はこのクラスを拡張し作成する。
 */
export class DefaultBuilder implements Builder {
    book: Book;
    extention = "bug";

    get name(): string {
        return (<any>this).constructor.name;
    }

    init(book: Book): Promise<null> {
        this.book = book;

        return Promise.all(book.allChunks.map(chunk => this.processAst(chunk))).then(() => null);
    }

    private getDefaultVisitorArg(process: BuilderProcess): TreeVisitorArg {
        return {
            visitDefaultPre: (_node: SyntaxTree) => {
            },
            visitChapterPre: (node: ChapterSyntaxTree) => {
                return this.chapterPre(process, node);
            },
            visitChapterPost: (node: ChapterSyntaxTree) => {
                return this.chapterPost(process, node);
            },
            visitHeadlinePre: (node: HeadlineSyntaxTree) => {
                return this.headlinePre(process, "hd", node);
            },
            visitHeadlinePost: (node: HeadlineSyntaxTree) => {
                return this.headlinePost(process, "hd", node);
            },
            visitColumnPre: (node: ColumnSyntaxTree) => {
                return this.columnPre(process, node);
            },
            visitColumnPost: (node: ColumnSyntaxTree) => {
                return this.columnPost(process, node);
            },
            visitColumnHeadlinePre: (node: ColumnHeadlineSyntaxTree) => {
                return this.columnHeadlinePre(process, node);
            },
            visitColumnHeadlinePost: (node: ColumnHeadlineSyntaxTree) => {
                return this.columnHeadlinePost(process, node);
            },
            visitParagraphPre: (node: NodeSyntaxTree) => {
                return this.paragraphPre(process, "p", node);
            },
            visitParagraphPost: (node: NodeSyntaxTree) => {
                return this.paragraphPost(process, "p", node);
            },
            visitUlistPre: (node: UlistElementSyntaxTree) => {
                return this.ulistPre(process, "ul", node);
            },
            visitUlistPost: (node: UlistElementSyntaxTree) => {
                return this.ulistPost(process, "ul", node);
            },
            visitOlistPre: (node: OlistElementSyntaxTree) => {
                return this.olistPre(process, "ol", node);
            },
            visitOlistPost: (node: OlistElementSyntaxTree) => {
                return this.olistPost(process, "ol", node);
            },
            visitDlistPre: (node: DlistElementSyntaxTree) => {
                return this.dlistPre(process, "dl", node);
            },
            visitDlistPost: (node: DlistElementSyntaxTree) => {
                return this.dlistPost(process, "dl", node);
            },
            visitBlockElementPre: (node: BlockElementSyntaxTree) => {
                return this.blockPre(process, node.symbol, node);
            },
            visitBlockElementPost: (node: BlockElementSyntaxTree) => {
                return this.blockPost(process, node.symbol, node);
            },
            visitInlineElementPre: (node: InlineElementSyntaxTree) => {
                return this.inlinePre(process, node.symbol, node);
            },
            visitInlineElementPost: (node: InlineElementSyntaxTree) => {
                return this.inlinePost(process, node.symbol, node);
            },
            visitTextPre: (node: TextNodeSyntaxTree) => {
                this.text(process, node);
            },
            visitSingleLineCommentPre: (node: SingleLineCommentSyntaxTree) => {
                this.singleLineComment(process, node);
            }
        };
    }

    processAst(chunk: ContentChunk): Promise<null> {
        let process = chunk.createBuilderProcess(this);
        return visitAsync(chunk.tree.ast, this.getDefaultVisitorArg(process))
            .then(() => {
                this.processPost(process, chunk);
                return Promise.all(chunk.nodes.map(chunk => this.processAst(chunk))).then(() => null);
            });
    }

    escape(_data: any): string {
        throw new Error("please override this method");
    }

    getChapterTitle(process: BuilderProcess, chapter: ContentChunk): string | null {
        let chapterNode: ChapterSyntaxTree | null = null as any;
        visit(chapter.tree.ast, {
            visitDefaultPre: (_node, _parent) => {
                return !chapterNode;
            },
            visitChapterPre: (node, _parent) => {
                chapterNode = node;
                return false;
            }
        });
        if (!chapterNode) {
            return null;
        }
        return nodeContentToString(process, chapterNode.headline);
    }

    processPost(_process: BuilderProcess, _chunk: ContentChunk): void {
    }

    chapterPre(_process: BuilderProcess, _node: ChapterSyntaxTree): any {
    }

    chapterPost(_process: BuilderProcess, _node: ChapterSyntaxTree): any {
    }

    headlinePre(_process: BuilderProcess, _name: string, _node: HeadlineSyntaxTree): any {
    }

    headlinePost(_process: BuilderProcess, _name: string, _node: HeadlineSyntaxTree): any {
    }

    columnPre(_process: BuilderProcess, _node: ColumnSyntaxTree): any {
    }

    columnPost(_process: BuilderProcess, _node: ColumnSyntaxTree): any {
    }

    columnHeadlinePre(_process: BuilderProcess, _node: ColumnHeadlineSyntaxTree): any {
    }

    columnHeadlinePost(_process: BuilderProcess, _node: ColumnHeadlineSyntaxTree): any {
    }

    paragraphPre(_process: BuilderProcess, _name: string, _node: NodeSyntaxTree): any {
    }

    paragraphPost(_process: BuilderProcess, _name: string, _node: NodeSyntaxTree): any {
    }

    ulistPre(_process: BuilderProcess, _name: string, _node: UlistElementSyntaxTree): any {
    }

    ulistPost(_process: BuilderProcess, _name: string, _node: UlistElementSyntaxTree): any {
    }

    olistPre(_process: BuilderProcess, _name: string, _node: OlistElementSyntaxTree): any {
    }

    olistPost(_process: BuilderProcess, _name: string, _node: OlistElementSyntaxTree): any {
    }

    dlistPre(_process: BuilderProcess, _name: string, _node: DlistElementSyntaxTree): any {
    }

    dlistPost(_process: BuilderProcess, _name: string, _node: DlistElementSyntaxTree): any {
    }

    text(process: BuilderProcess, node: TextNodeSyntaxTree): any {
        // TODO in paragraph だったら note.text.replace("\n", "") したほうが良い…
        process.out(node.text);
    }

    blockPre(process: BuilderProcess, name: string, node: BlockElementSyntaxTree): any {
        let func: Function;
        func = (<any>this)[`block_${name}`];
        if (typeof func === "function") {
            return func.call(this, process, node);
        }

        func = (<any>this)[`block_${name}_pre`];
        if (typeof func !== "function") {
            throw new AnalyzerError(`block_${name}_pre or block_${name} is not Function`);
        }
        return func.call(this, process, node);
    }

    blockPost(process: BuilderProcess, name: string, node: BlockElementSyntaxTree): any {
        let func: Function;
        func = (<any>this)[`block_${name}`];
        if (typeof func === "function") {
            return;
        }

        func = (<any>this)[`block_${name}_post`];
        if (typeof func !== "function") {
            throw new AnalyzerError(`block_${name}_post is not Function`);
        }
        return func.call(this, process, node);
    }

    inlinePre(process: BuilderProcess, name: string, node: InlineElementSyntaxTree): any {
        let func: Function;
        func = (<any>this)[`inline_${name}`];
        if (typeof func === "function") {
            return func.call(this, process, node);
        }

        func = (<any>this)[`inline_${name}_pre`];
        if (typeof func !== "function") {
            throw new AnalyzerError(`inline_${name}_pre or inline_${name} is not Function`);
        }
        return func.call(this, process, node);
    }

    inlinePost(process: BuilderProcess, name: string, node: InlineElementSyntaxTree): any {
        let func: Function;
        func = (<any>this)[`inline_${name}`];
        if (typeof func === "function") {
            return;
        }

        func = (<any>this)[`inline_${name}_post`];
        if (typeof func !== "function") {
            throw new AnalyzerError(`inline_${name}_post is not Function`);
        }
        return func.call(this, process, node);
    }

    ulistParentHelper(process: BuilderProcess, node: UlistElementSyntaxTree, action: () => void, currentLevel: number = node.level) {
        if (currentLevel !== 1) {
            let result = findUp(node.parentNode, (n) => {
                if (n instanceof UlistElementSyntaxTree) {
                    return n.level === (currentLevel - 1);
                }
                return false;
            });
            if (result) {
                return;
            }
            action();
            this.ulistParentHelper(process, node, action, currentLevel - 1);
        }
    }

    findReference(process: BuilderProcess, node: SyntaxTree): Symbol {
        let founds = process.symbols.filter(symbol => symbol.node === node);
        if (founds.length !== 1) {
            throw new AnalyzerError("invalid status.");
        }
        return founds[0];
    }

    inline_hd_pre(process: BuilderProcess, node: InlineElementSyntaxTree) {
        process.out("「");
        const chapter = this.findReference(process, node).referenceTo?.referenceNode?.parentNode.toChapter();
        if (!chapter) {
            process.error(t("builder.chapter_not_found", 1), node);
            return false;
        }
        if (chapter.level === 1) {
            process.out(chapter.fqn).out("章 ");
        } else {
            process.out(chapter.fqn).out(" ");
        }

        // 再帰的に呼び出す（ラベルを使用した参照の場合、キャプションはインライン要素を含む可能性がある）
        visit(chapter.headline.caption, this.getDefaultVisitorArg(process));
        return false;
    }

    inline_hd_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("」");
    }

    block_raw(process: BuilderProcess, node: BlockElementSyntaxTree): any {
        // TODO Ruby版との出力差が結構あるのでテスト含め直す
        let content = nodeContentToString(process, node.args[0]);
        let matches = content.match(/\|(.+)\|/);
        if (matches && matches[1]) {
            let target = matches[1].split(",").some(name => this.name.toLowerCase() === `${name}builder`);
            if (target) {
                // "|hoge,fuga| piyo" の場合 matches[1] === "hoge,fuga"
                process.outRaw(content.substring(matches[0].length));
            }
        } else {
            process.outRaw(content);
        }
        return false;
    }

    inline_raw(process: BuilderProcess, node: InlineElementSyntaxTree): any {
        let content = nodeContentToString(process, node);
        let matches = content.match(/\|(.+)\|/);
        if (matches && matches[1]) {
            let target = matches[1].split(",").some(name => this.name.toLowerCase() === `${name}builder`);
            if (target) {
                // "|hoge,fuga| piyo" の場合 matches[1] === "hoge,fuga"
                process.outRaw(content.substring(matches[0].length));
            }
        } else {
            process.outRaw(content);
        }
        return false;
    }

    singleLineComment(_process: BuilderProcess, _node: SingleLineCommentSyntaxTree): any {
        // 特に何もしない
    }

    parseTable(tableContents: SyntaxTree[]): Table {
        return this.parseTableContents(this.parseTableLines(tableContents));
    }

    parseTableLines(tableContents: SyntaxTree[]): (InlineElementSyntaxTree | TextCell)[][] {
        const result: (InlineElementSyntaxTree | TextCell)[][] = [];
        let currentLine: (InlineElementSyntaxTree | TextCell)[] = [];
        let lastLineNumber = tableContents.length > 0 ? tableContents[0].location.start.line : 0;
        tableContents.forEach(node => {
            // 行の最後でノードが切り替わる場合に改行文字が含まれないので、
            // 行番号でチェックし、変わっていたら改行処理。
            if (node.location.start.line !== lastLineNumber) {
                result.push(currentLine);
                currentLine = [];
            }

            lastLineNumber = node.location.start.line;

            if (node.isInlineElement()) {
                currentLine.push(node.toInlineElement());
                return;
            }

            // 行成分に分解する。
            const positionOffset = node.location.start.offset;
            const lineNumberOffset = node.location.start.line;
            const columnOffset = node.location.start.column;

            const text = node.toTextNode().text;
            let currentOffset = 0;
            let lineNumber = 0;
            do {
                const lineEnd = text.indexOf("\n", currentOffset);
                const startLocation = {
                    offset: currentOffset + positionOffset,
                    line: lineNumber + lineNumberOffset,
                    column: currentOffset + columnOffset
                };

                const nextOffset = lineEnd + 1;
                const content =
                    lineEnd < 0 ?
                        // 最終行
                        text.substring(currentOffset) :
                        // そうでない
                        text.substring(currentOffset, nextOffset);

                currentLine.push(
                    {
                        text: content,
                        location: {
                            start: startLocation,
                            end: {
                                offset: startLocation.offset + content.length - 1,
                                line: startLocation.line,
                                column: startLocation.column + content.length - 1
                            }
                        }
                    }
                );

                lastLineNumber = startLocation.line;

                if (lineEnd < 0) {
                    break;
                }

                result.push(currentLine);
                currentLine = [];

                currentOffset = nextOffset;
                lineNumber++;
            } while (currentOffset < text.length);
        });

        if (currentLine.length > 0) {
            result.push(currentLine);
        }

        return result;
    }

    parseTableContents(lines: (InlineElementSyntaxTree | TextCell)[][]): Table {
        const rows: TableCell[][] = [];
        let currentRow: TableCell[] = [];
        let currentCell: SyntaxTree[] = [];
        let headerRowCount = 0;

        lines.forEach((line, rowNumber) => {
            line.forEach((node, columnNumber) => {
                if (node instanceof InlineElementSyntaxTree) {
                    currentCell.push(node);
                    return;
                }

                // Ruby実装との互換性のためトリム
                const textCells =
                    line.length === 1 ?
                        node.text.trim() :
                        columnNumber === 0 ?
                            node.text.trimStart() :
                            columnNumber === line.length - 1 ?
                                node.text.trimEnd() :
                                node.text;

                if (textCells.match(/^(-{12,}|={12,})$/g) != null) {
                    if (headerRowCount === 0) {
                        headerRowCount = rowNumber;
                    }

                    return;
                }

                const cells = textCells.split(/\t/g);
                const lastTokenNumber = cells.length - 1;
                cells.forEach((cell, tokenNumber) => {
                    if (!cell.length && !currentCell.length) {
                        // 空の列はスキップ
                        return;
                    }

                    let text: string;
                    if (cell === ".") {
                        text = "";
                    } else {
                        text = cell.startsWith("..") ? cell.substr(1) : cell;
                    }

                    currentCell.push(
                        new TextNodeSyntaxTree({
                            syntax: "InlineElementContentText",
                            // ここはとりあえず仮の値を入れておく。使わないし。
                            location: node.location,
                            text: text
                        })
                    );

                    // 次の列へ。ただし最後のトークンは除く（次にインラインが来るかもしれない）
                    if (tokenNumber !== lastTokenNumber && currentCell.length > 0) {
                        currentRow.push({ nodes: currentCell });
                        currentCell = [];
                    }
                });
            }); // line.forEach

            // 改行処理
            if (currentCell.length > 0) {
                currentRow.push({ nodes: currentCell });
                currentCell = [];
            }

            if (currentRow.length > 0) {
                rows.push(currentRow);
                currentRow = [];
            }
        });

        // 最終行の改行処理
        if (currentCell.length > 0) {
            currentRow.push({ nodes: currentCell });
        }
        if (currentRow.length > 0) {
            rows.push(currentRow);
        }

        // 列の補完
        let maxColumns = 0;
        for (const columns of rows.map(cells => cells.length)) {
            if (columns > maxColumns) {
                maxColumns = columns;
            }
        }

        // 空文字列セルを作って埋める。
        rows.forEach(row => {
            const cell = row[row.length - 1];
            const location = cell.nodes[cell.nodes.length - 1].location;
            for (let c = row.length; c < maxColumns; c++) {
                row.push({
                    nodes: [
                        new TextNodeSyntaxTree({
                            syntax: "InlineElementContentText",
                            location: {
                                start: {
                                    line: location.start.line,
                                    column: location.start.column,
                                    offset: location.start.offset,
                                },
                                end: {
                                    line: location.end?.line,
                                    column: location.end?.column,
                                    offset: location.end?.offset
                                }
                            },
                            text: ""
                        })
                    ]
                });
            }
        });

        return { cells: rows, headerRowCount: headerRowCount };
    }
}
