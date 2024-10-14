import assert from "power-assert";

import * as Test from "./testHelper";

import { isNodeJS } from "../../lib/utils/utils";

import { Builder } from "../../lib/builder/builder";
import { TextBuilder } from "../../lib/builder/textBuilder";
import { HtmlBuilder } from "../../lib/builder/htmlBuilder";
import { ProcessReport } from "../../lib";

describe("Ruby版ReVIEWとの出力差確認", () => {
    "use strict";

    if (!isNodeJS()) {
        return;
    }

    let exec = require("child_process").exec;

    function convertByRubyReVIEW(fileName: string, target: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            exec(
                `bundle exec review-compile --level=1 --target=${target} content.re`,
                {
                    cwd: `test/fixture/valid/${fileName}/`,
                    env: process.env
                },
                (err: Error, stdout: Buffer, _stderr: Buffer) => {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve(stdout.toString());
                    }
                }
            );
        });
    }

    // PhantomJS 環境下専用のテスト
    describe("正しい構文のファイルが処理できること", () => {
        /* tslint:disable:no-require-imports */
        let fs = require("fs");
        let glob = require("glob");
        /* tslint:enable:no-require-imports */

        let typeList: { ext: string; target: string; builder: () => Builder; }[] = [
            {
                ext: "txt",
                target: "text",
                builder: () => new TextBuilder()
            },
            {
                ext: "html",
                target: "html",
                builder: () => new HtmlBuilder()
            }
        ];

        let path = "test/fixture/valid/";

        let ignoreFiles = [
            "ch01", // lead, emplist がまだサポートされていない
            "empty", // empty への対応をまだ行っていない ファイル実体は存在していない
            "block_graph", // graph への対応がまだ不完全なので
            "inline", // tti がまだサポートされていない < のエスケープとかも
            "lead", // ブロック構文内でのParagraphの扱いがおかしいのを直していない
            "preface", // めんどくさいので
            "preproc",  // めんどくさいので
            "inline_m", // まだ真面目に実装していない
        ];

        const withDraftFiles = [
            "block_comment_with_draft",
            "inline_comment_with_draft",
            "single_comment_with_draft"
        ].map(name => `${path}${name}/content.re`);

        function matchIgnoreFiles(filePath: string) {
            return ignoreFiles
                .map(name => `${path}${name}/content.re`)
                .some(ignoreFilePath => ignoreFilePath === filePath);
        }

        glob.sync(`${path}**/*.re`)
            .filter((filePath: string) => !matchIgnoreFiles(filePath))
            .forEach((filePath: string) => {
                let baseName = filePath
                    .substr(0, filePath.length - "/content.re".length)
                    .substr(path.length);

                let compileReports: ProcessReport[] = [];
                typeList.forEach(typeInfo => {
                    let targetFileName = `${path}${baseName}/content.${typeInfo.ext}`;
                    const options =
                        withDraftFiles.includes(filePath) ?
                            { draft: true } :
                            undefined;
                    it(`ファイル: ${baseName}/content.${typeInfo.ext}`, () => {
                        let text = fs.readFileSync(filePath, "utf8");

                        return Test.compile({
                            basePath: `${process.cwd()}/test/fixture/valid/${baseName}`,
                            read: _path => Promise.resolve(text),
                            builders: [typeInfo.builder()],
                            book: {
                                contents: [
                                    "content.re",
                                ]
                            },
                            listener: {
                                onReports: reports => compileReports = reports
                            }
                        }, options)
                            .then(s => {
                                const compileErrors = compileReports.filter(r => r.level > 1);
                                assert(compileErrors.length === 0, compileErrors.map(r => `${r.level}: ${r.message}`).join("\n"));

                                let result: string = s.results["content." + typeInfo.ext];
                                assert(result != null);

                                let assertResult = () => {
                                    let expected = fs.readFileSync(targetFileName, "utf8");
                                    assert(result === expected);
                                };

                                if (!fs.existsSync(targetFileName)) {
                                    // Ruby版の出力ファイルがない場合、出力処理を行う
                                    return convertByRubyReVIEW(baseName, typeInfo.target)
                                        .then(data => {
                                            fs.writeFileSync(targetFileName, data);

                                            assertResult();
                                            return true;
                                        });
                                } else {
                                    assertResult();
                                    return Promise.resolve(true);
                                }
                            });
                    });
                });
            });
    });
});
