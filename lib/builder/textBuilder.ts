"use strict";

import { BuilderProcess } from "../model/compilerModel";

import { DefaultBuilder } from "./builder";

import { t } from "../i18n/i18n";

import { NodeSyntaxTree, BlockElementSyntaxTree, InlineElementSyntaxTree, HeadlineSyntaxTree, UlistElementSyntaxTree, OlistElementSyntaxTree, DlistElementSyntaxTree, ColumnSyntaxTree, ColumnHeadlineSyntaxTree } from "../parser/parser";

import { visit, TreeVisitor, TreeVisitorReturn } from "../parser/walker";

import { nodeContentToString, findChapter, padLeft, linesToFigure, getHeadlineLevels } from "../utils/utils";

export class TextBuilder extends DefaultBuilder {
    extention = "txt";

    escape(data: any): string {
        return data;
    }

    headlinePre(process: BuilderProcess, _name: string, node: HeadlineSyntaxTree) {
        process.out("■H").out(node.level).out("■");
        if (node.level === 1) {
            let text = t("builder.chapter", node.parentNode.no);
            process.out(text).out("　");
        } else if (node.level < 4) {
            process.out(getHeadlineLevels(node).join(".")).out("　");
        }
    }

    headlinePost(process: BuilderProcess, _name: string, _node: HeadlineSyntaxTree) {
        process.out("\n\n");
    }

    columnHeadlinePre(process: BuilderProcess, node: ColumnHeadlineSyntaxTree) {
        process.out("\n◆→開始:コラム←◆\n");
        process.out("■");
        return (v: TreeVisitor) => {
            visit(node.caption, v);
        };
    }

    columnHeadlinePost(process: BuilderProcess, _node: ColumnHeadlineSyntaxTree) {
        process.out("\n");
    }

    columnPost(process: BuilderProcess, _node: ColumnSyntaxTree) {
        process.out("◆→終了:コラム←◆\n\n");
    }

    paragraphPost(process: BuilderProcess, _name: string, _node: NodeSyntaxTree) {
        process.out("\n");
    }

    ulistPre(process: BuilderProcess, _name: string, node: UlistElementSyntaxTree) {
        this.ulistParentHelper(process, node, () => {
            process.out("\n\n●\t");
        });
        if (node.parentNode instanceof UlistElementSyntaxTree && node.prev instanceof UlistElementSyntaxTree === false) {
            process.out("\n\n");
        } else if (node.parentNode instanceof UlistElementSyntaxTree) {
            process.out("");
        }
        process.out("●\t");
    }

    ulistPost(process: BuilderProcess, _name: string, _node: UlistElementSyntaxTree) {
        process.out("\n");
    }

    olistPre(process: BuilderProcess, _name: string, node: OlistElementSyntaxTree) {
        process.out(node.no).out("\t");
    }

    olistPost(process: BuilderProcess, _name: string, _node: OlistElementSyntaxTree) {
        process.out("\n");
    }

    dlistPre(process: BuilderProcess, _name: string, node: DlistElementSyntaxTree) {
        return (v: TreeVisitor) => {
            process.out("★");
            visit(node.text, v);
            process.out("☆\n");
            process.out("\t");
            visit(node.content, v);
            process.out("\n");
        };
    }

    dlistPost(process: BuilderProcess, _name: string, _node: DlistElementSyntaxTree) {
        process.out("\n");
    }

    block_list_pre(process: BuilderProcess, node: BlockElementSyntaxTree): TreeVisitorReturn {
        process.out("◆→開始:リスト←◆\n");
        let chapter = findChapter(node, 1);
        if (!chapter) {
            process.error(t("builder.chapter_not_found", 1), node);
            return false;
        }
        let text = t("builder.list", chapter.fqn, node.no);
        process.out(text).out("　");
        return (v: TreeVisitor) => {
            // name はパスしたい, langもパスしたい
            visit(node.args[1], v);

            process.outRaw("\n\n");

            const nodeCount = node.childNodes.length;
            let nodeIndex = 0;
            node.childNodes.forEach((node) => {
                visit(node, v);

                // 入力の改行が保持されるべきだが、ASTのパースで消えてしまうため補完。
                // なお、\rは保持されるので、元ファイルの改行コードが\r\nの場合の考慮は不要。
                nodeIndex++;
                if (nodeIndex < nodeCount) {
                    process.out("\n");
                }
            });
        };
    }

    block_list_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("\n◆→終了:リスト←◆\n");
    }

    block_listnum_pre(process: BuilderProcess, node: BlockElementSyntaxTree): TreeVisitorReturn {
        process.out("◆→開始:リスト←◆\n");
        let chapter = findChapter(node, 1);
        if (!chapter) {
            process.error(t("builder.chapter_not_found", 1), node);
            return false;
        }
        let text = t("builder.list", chapter.fqn, node.no);
        process.out(text).out("　");
        let lineCount = 1;
        return (v: TreeVisitor) => {
            // name はパスしたい, langもパスしたい
            visit(node.args[1], v);

            let lineCountMax = 0;
            node.childNodes.forEach((node, _index, _childNodes) => {
                if (node.isTextNode()) {
                    lineCountMax += node.toTextNode().text.split("\n").length;
                }
            });
            let lineDigit = Math.max(linesToFigure(lineCountMax), 2);

            process.outRaw("\n\n");

            node.childNodes.forEach((node, index, childNodes) => {
                if (node.isTextNode()) {
                    // 改行する可能性があるのはTextNodeだけ…のはず
                    let hasNext = !!childNodes[index + 1];
                    let textNode = node.toTextNode();
                    let lines = textNode.text.split("\n");
                    lines.forEach((line, index) => {
                        process.out(padLeft(String(lineCount), " ", lineDigit)).out(": ");
                        process.out(line);
                        if (!hasNext || lines.length - 1 !== index) {
                            lineCount++;
                        }
                        process.out("\n");
                    });
                } else {
                    visit(node, v);
                }

                lineCount++;
            });
        };
    }

    block_listnum_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("◆→終了:リスト←◆\n");
    }

    inline_list(process: BuilderProcess, node: InlineElementSyntaxTree) {
        let chapter = findChapter(node, 1);
        if (!chapter) {
            process.error(t("builder.chapter_not_found", 1), node);
            return false;
        }
        let listNode = this.findReference(process, node).referenceTo!.referenceNode!.toBlockElement();
        let text = t("builder.list", chapter.fqn, listNode.no);
        process.out(text);
        return false;
    }

    block_emlist_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        process.out("◆→開始:インラインリスト←◆\n");
        return (v: TreeVisitor) => {
            // name はパスしたい
            if (node.args[0]) {
                process.out("■");
                visit(node.args[0], v);
                process.out("\n");
            }

            const nodeCount = node.childNodes.length;
            let nodeIndex = 0;
            node.childNodes.forEach((node) => {
                visit(node, v);

                // 入力の改行が保持されるべきだが、ASTのパースで消えてしまうため補完。
                // なお、\rは保持されるので、元ファイルの改行コードが\r\nの場合の考慮は不要。
                nodeIndex++;
                if (nodeIndex < nodeCount) {
                    process.out("\n");
                }
            });
        };
    }

    block_emlist_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("\n◆→終了:インラインリスト←◆\n");
    }

    block_emlistnum_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        process.out("◆→開始:インラインリスト←◆\n");
        let lineCount = 1;
        return (v: TreeVisitor) => {
            // name はパスしたい
            if (node.args[0]) {
                process.out("■");
                visit(node.args[0], v);
                process.out("\n");
            }

            let lineCountMax = 0;
            node.childNodes.forEach((node, _index, _childNodes) => {
                if (node.isTextNode()) {
                    lineCountMax += node.toTextNode().text.split("\n").length;
                }
            });
            let lineDigit = Math.max(linesToFigure(lineCountMax), 2);

            node.childNodes.forEach((node, index, childNodes) => {
                if (node.isTextNode()) {
                    // 改行する可能性があるのはTextNodeだけ…のはず
                    let hasNext = !!childNodes[index + 1];
                    let textNode = node.toTextNode();
                    let lines = textNode.text.split("\n");
                    lines.forEach((line, index) => {
                        process.out(padLeft(String(lineCount), " ", lineDigit)).out(": ");
                        process.out(line);
                        if (!hasNext || lines.length - 1 !== index) {
                            lineCount++;
                        }
                        process.out("\n");
                    });
                } else {
                    visit(node, v);
                }

                lineCount++;
            });
        };
    }

    block_emlistnum_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("◆→終了:インラインリスト←◆\n");
    }

    inline_br(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("\n");
    }

    inline_b_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("★");
    }

    inline_b_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("☆");
    }

    inline_code_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("△");
    }

    inline_code_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("☆");
    }

    inline_href_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("△");
    }

    inline_href_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("☆");
    }

    inline_href(process: BuilderProcess, node: InlineElementSyntaxTree) {
        let href: string | null = null;
        let text = nodeContentToString(process, node);
        if (text.indexOf(",") !== -1) {
            href = text.slice(0, text.indexOf(","));
            text = text.slice(text.indexOf(",") + 1).trimLeft();
        }
        if (href) {
            process.out(text).out("（△").out(href).out("☆）");
        } else {
            process.out("△").out(text).out("☆");
        }
        return false;
    }

    block_label(_process: BuilderProcess, _node: BlockElementSyntaxTree) {
        return false;
    }

    inline_ruby(process: BuilderProcess, node: InlineElementSyntaxTree) {
        let contentString = nodeContentToString(process, node);
        let keywordData = contentString.split(",");
        process.out(keywordData[0]);
        return (_v: TreeVisitor) => {
            // name, args はパス
            node.childNodes.forEach(_node => {
                process.out("◆→DTP連絡:「").out(keywordData[0]);
                process.out("」に「 ").out(keywordData[1].trim()).out("」とルビ←◆");
            });
        };
    }

    inline_u_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("＠");
    }

    inline_u_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("＠◆→＠〜＠部分に下線←◆");
    }

    inline_kw(process: BuilderProcess, node: InlineElementSyntaxTree) {
        process.out("★");
        return (_v: TreeVisitor) => {
            // name, args はパス
            node.childNodes.forEach(node => {
                let contentString = nodeContentToString(process, node);
                let keywordData = contentString.split(",");
                let pre = keywordData[0];
                let post = (keywordData[1] || "").trimLeft();
                process.out(`${pre}☆`);
                if (post) {
                    process.out(`（${post}）`);
                }
            });
        };
    }

    inline_tt_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("△");
    }

    inline_tt_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("☆");
    }

    inline_em_pre(process: BuilderProcess, node: InlineElementSyntaxTree) {
        process.warn(t("compile.deprecated_inline_symbol", "em"), node);
        process.out("@<em>{");
    }

    inline_em_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("}");
    }

    block_image(process: BuilderProcess, node: BlockElementSyntaxTree) {
        let label = nodeContentToString(process, node.args[0]);
        return process.findImageFile(label)
            .then(imagePath => {
                let caption = nodeContentToString(process, node.args[1]);
                process.out("◆→開始:図←◆\n");
                process.out("図").out(process.base.chapter!.no).out(".").out(node.no).out("　").out(caption).out("\n");
                process.out("\n");
                process.out("◆→").out(imagePath).out("←◆\n");
                process.out("◆→終了:図←◆\n");
                return false;
            })
            .catch(id => {
                process.error(t("builder.image_not_found", id), node);
                return false;
            });
    }

    block_indepimage(process: BuilderProcess, node: BlockElementSyntaxTree) {
        process.out("◆→画像 ").out(nodeContentToString(process, node.args[0])).out("←◆\n");
        if (node.args[1]) {
            process.out("図　").out(nodeContentToString(process, node.args[1])).out("\n\n");
        }
        return false;
    }

    block_graph_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        // TODO 以下はとりあえず正規のRe:VIEW文書が食えるようにするための仮実装
        process.outRaw("◆→開始:図←◆\n");
        let toolName = nodeContentToString(process, node.args[1]);
        process.outRaw("graph: ").out(toolName).outRaw("</p>\n");
        return (v: TreeVisitor) => {
            // name, args はパスしたい
            node.childNodes.forEach((node) => {
                visit(node, v);
            });
        };
    }

    block_graph_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        // TODO 以下はとりあえず正規のRe:VIEW文書が食えるようにするための仮実装
        process.outRaw("◆→終了:図←◆\n");
    }

    inline_img(process: BuilderProcess, node: InlineElementSyntaxTree) {
        let imgNode = this.findReference(process, node).referenceTo!.referenceNode!.toBlockElement();
        process.out("図").out(process.base.chapter!.no).out(".").out(imgNode.no).out("\n");
        return false;
    }

    inline_icon(process: BuilderProcess, node: InlineElementSyntaxTree) {
        // TODO ファイル名探索ロジックをもっと頑張る(jpgとかsvgとか)
        let chapterFileName = process.base.chapter!.name;
        let chapterName = chapterFileName.substring(0, chapterFileName.length - 3);
        let imageName = nodeContentToString(process, node);
        let imagePath = "images/" + chapterName + "-" + imageName + ".png";
        process.out("◆→画像 ").out(imagePath).out("←◆");
        return false;
    }

    block_footnote(process: BuilderProcess, node: BlockElementSyntaxTree) {
        process.out("【注").out(node.no).out("】");
        return (v: TreeVisitor) => {
            visit(node.args[1], v);
            process.out("\n");
        };
    }

    inline_fn(process: BuilderProcess, node: InlineElementSyntaxTree) {
        let footnoteNode = this.findReference(process, node).referenceTo!.referenceNode!.toBlockElement();
        process.out("【注").out(footnoteNode.no).out("】");
        return false;
    }

    block_lead_pre(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("◆→開始:リード←◆\n");
    }

    block_lead_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("◆→終了:リード←◆\n");
    }

    inline_tti_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("▲");
    }

    inline_tti_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("☆◆→等幅フォントイタ←◆");
    }

    inline_ttb_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("★");
    }

    inline_ttb_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("☆◆→等幅フォント太字←◆");
    }

    block_noindent(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("◆→DTP連絡:次の1行インデントなし←◆\n");
        return false;
    }
    block_blankline(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("\n");
        return false;
    }

    block_source_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        process.out("◆→開始:ソースコードリスト←◆\n");
        process.out("■").out(nodeContentToString(process, node.args[0])).out("\n");

        return (v: TreeVisitor) => {
            // name, args はパスしたい
            node.childNodes.forEach((node) => {
                visit(node, v);
            });
        };
    }

    block_source_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("\n◆→終了:ソースコードリスト←◆\n");
    }

    block_cmd_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        process.out("◆→開始:コマンド←◆\n");

        return (v: TreeVisitor) => {
            // name, args はパスしたい
            node.childNodes.forEach((node) => {
                visit(node, v);
            });
        };
    }

    block_cmd_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("\n◆→終了:コマンド←◆\n");
    }

    block_quote_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        process.out("◆→開始:引用←◆\n");

        return (v: TreeVisitor) => {
            // name, args はパスしたい
            node.childNodes.forEach((node) => {
                visit(node, v);
            });
        };
    }

    block_quote_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("\n◆→終了:引用←◆\n");
    }

    inline_ami_pre(_process: BuilderProcess, _node: InlineElementSyntaxTree) {
    }

    inline_ami_post(process: BuilderProcess, node: InlineElementSyntaxTree) {
        // TODO 入れ子になっている場合オペレータさんにイミフな出力になっちゃう
        process.out("◆→DTP連絡:「").out(nodeContentToString(process, node)).out("」に網カケ←◆");
    }

    inline_bou_pre(_process: BuilderProcess, _node: InlineElementSyntaxTree) {
    }

    inline_bou_post(process: BuilderProcess, node: InlineElementSyntaxTree) {
        // TODO 入れ子になっている場合オペレータさんにイミフな出力になっちゃう
        process.out("◆→DTP連絡:「").out(nodeContentToString(process, node)).out("」に傍点←◆");
    }

    inline_del_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("◆→開始:削除表現←◆");
    }

    inline_del_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("◆→終了:削除表現←◆");
    }

    inline_i_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("▲");
    }

    inline_i_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("☆");
    }

    inline_ins_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("◆→開始:挿入表現←◆");
    }

    inline_ins_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("◆→終了:挿入表現←◆");
    }

    inline_m_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        // TODO
        process.outRaw("TODO: ");
    }

    inline_m_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.outRaw("");
    }

    inline_strong_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("★");
    }

    inline_strong_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("☆");
    }

    inline_tcy_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("◆→開始:回転←◆");
    }

    inline_tcy_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        process.out("◆→終了:縦回転←◆");
    }

    inline_uchar(process: BuilderProcess, node: InlineElementSyntaxTree) {
        let hexString = nodeContentToString(process, node);
        let code = parseInt(hexString, 16);
        let result = "";
        /* eslint-disable no-bitwise*/
        while (code !== 0) {
            result = String.fromCharCode(code & 0xFFFF) + result;
            code >>>= 16;
        }
        /* eslint-enable no-bitwise */
        process.out(result);
        return false;
    }

    block_table_pre(process: BuilderProcess, node: BlockElementSyntaxTree): TreeVisitorReturn {
        process.out("\n◆→開始:表←◆\n");
        let chapter = findChapter(node, 1);
        if (!chapter) {
            process.error(t("builder.chapter_not_found", 1), node);
            return false;
        }
        let text = t("builder.table", chapter.fqn, node.no);
        process.out(text).out("　").out(nodeContentToString(process, node.args[1])).out("\n\n");
        const table = this.parseTable(node.childNodes);
        return (v: TreeVisitor) => {
            if (table.headerRowCount === 0) {
                // 1列目がヘッダー
                table.cells.forEach((columns) => {
                    if (columns.length === 0) {
                        return;
                    }

                    // ヘッダー列
                    process.out("★");
                    columns[0].nodes.forEach((node) => {
                        visit(node, v);
                    });
                    process.out("☆");

                    // 残りの列
                    for (let c = 1; c < columns.length; c++) {
                        process.outRaw("\t");

                        columns[c].nodes.forEach((node) => {
                            visit(node, v);
                        });
                    }

                    process.outRaw("\n");
                });
            } else {
                // ヘッダー行
                let r = 0;
                for (; r < table.headerRowCount; r++) {
                    const columns = table.cells[r];
                    columns.forEach((cell, index) => {
                        // TODO: ヘッダーにインラインがある場合は？
                        process.out("★");
                        cell.nodes.forEach((node) => {
                            visit(node, v);
                        });
                        process.out("☆");

                        if (index < columns.length - 1) {
                            process.outRaw("\t");
                        } else {
                            process.outRaw("\n");
                        }
                    });
                }

                // ボディ
                for (; r < table.cells.length; r++) {
                    const columns = table.cells[r];
                    columns.forEach((cell, index) => {
                        cell.nodes.forEach((node) => {
                            visit(node, v);
                        });

                        if (index < columns.length - 1) {
                            process.outRaw("\t");
                        } else {
                            process.outRaw("\n");
                        }
                    });
                }
            }
        };
    }

    block_table_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("◆→終了:表←◆\n\n");
    }

    inline_table(process: BuilderProcess, node: InlineElementSyntaxTree) {
        let chapter = findChapter(node, 1);
        if (!chapter) {
            process.error(t("builder.chapter_not_found", 1), node);
            return false;
        }
        let listNode = this.findReference(process, node).referenceTo!.referenceNode!.toBlockElement();
        let text = t("builder.table", chapter.fqn, listNode.no);
        process.out(text);
        return false;
    }

    block_tsize(_process: BuilderProcess, _node: BlockElementSyntaxTree) {
        // TODO 以下はとりあえず正規のRe:VIEW文書が食えるようにするための仮実装
        return false;
    }

    block_comment_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        if (!this.book.config.isDraft) {
            // 中断
            return false;
        }

        process.out("◆→");

        return (v: TreeVisitor) => {
            // name, args はパスしたい
            node.childNodes.forEach((node) => {
                visit(node, v);
            });
        };
    }

    block_comment_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        if (!this.book.config.isDraft) {
            return;
        }

        process.out("←◆\n");
    }

    inline_comment_pre(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        if (!this.book.config.isDraft) {
            // 中断
            return false;
        }

        process.out("◆→");
        return true;
    }

    inline_comment_post(process: BuilderProcess, _node: InlineElementSyntaxTree) {
        if (!this.book.config.isDraft) {
            return;
        }

        process.out("←◆");
    }

    inline_chap(process: BuilderProcess, node: InlineElementSyntaxTree) {
        let chapName = nodeContentToString(process, node);
        let chapter = process.findChapter(chapName);
        process.out("第").out(chapter.no).out("章");
        return false;
    }

    inline_title(process: BuilderProcess, node: InlineElementSyntaxTree) {
        let chapName = nodeContentToString(process, node);
        let chapter = process.findChapter(chapName);
        let title = this.getChapterTitle(process, chapter);
        process.out(title);
        return false;
    }

    inline_chapref(process: BuilderProcess, node: InlineElementSyntaxTree) {
        let chapName = nodeContentToString(process, node);
        let chapter = process.findChapter(chapName);
        let title = this.getChapterTitle(process, chapter);
        process.out("第").out(chapter.no).out("章「").out(title).out("」");
        return false;
    }

    inline_idx(process: BuilderProcess, node: InlineElementSyntaxTree) {
        const text = nodeContentToString(process, node);
        process.out(`${text}◆→索引項目:${text}←◆`);
        return false;
    }

    inline_hidx(process: BuilderProcess, node: InlineElementSyntaxTree) {
        const text = nodeContentToString(process, node);
        process.out(`◆→索引項目:${text}←◆`);
        return false;
    }

    block_flushright_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        process.out("◆→開始:右寄せ←◆\n");

        return (v: TreeVisitor) => {
            node.childNodes.forEach((node) => {
                visit(node, v);
            });
        };
    }

    block_flushright_post(process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out("\n◆→終了:右寄せ←◆\n");
    }

    block_captionblock_pre(typename: string, process: BuilderProcess, node: BlockElementSyntaxTree) {
        process.out(`◆→開始:${typename}←◆\n`);
        if (node.args[0]) {
            let caption = nodeContentToString(process, node.args[0]);
            process.out(`■${caption}\n`);
        }
    }

    block_captionblock_post(typename: string, process: BuilderProcess, _node: BlockElementSyntaxTree) {
        process.out(`◆→終了:${typename}←◆\n`);
    }

    block_info_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_pre("情報", process, node);
    }

    block_info_post(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_post("情報", process, node);
    }

    block_note_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_pre("ノート", process, node);
    }

    block_note_post(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_post("ノート", process, node);
    }

    block_memo_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_pre("メモ", process, node);
    }

    block_memo_post(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_post("メモ", process, node);
    }

    block_tip_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_pre("TIP", process, node);
    }

    block_tip_post(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_post("TIP", process, node);
    }

    block_warning_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_pre("危険", process, node);
    }

    block_warning_post(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_post("危険", process, node);
    }

    block_important_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_pre("重要", process, node);
    }

    block_important_post(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_post("重要", process, node);
    }

    block_caution_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_pre("警告", process, node);
    }

    block_caution_post(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_post("警告", process, node);
    }

    block_notice_pre(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_pre("注意", process, node);
    }

    block_notice_post(process: BuilderProcess, node: BlockElementSyntaxTree) {
        this.block_captionblock_post("注意", process, node);
    }
}
