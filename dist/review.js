"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// lib/i18n/utils.ts
function deepAssign(target, ...args) {
  args.forEach((arg) => {
    Object.keys(arg).forEach((key) => {
      if (typeof arg[key] !== "object") {
        target[key] = arg[key];
      } else {
        target[key] = deepAssign(target[key] || {}, arg[key]);
      }
    });
  });
  return target;
}
var init_utils = __esm({
  "lib/i18n/utils.ts"() {
    "use strict";
  }
});

// lib/peg/action.ts
var action_exports = {};
__export(action_exports, {
  blockElement: () => blockElement,
  braceArg: () => braceArg,
  chapter: () => chapter,
  column: () => column,
  columnHeadline: () => columnHeadline,
  columnTerminator: () => columnTerminator,
  content: () => content,
  contents: () => contents,
  dlistElement: () => dlistElement,
  headline: () => headline,
  inlineElement: () => inlineElement,
  olistElement: () => olistElement,
  setup: () => setup,
  text: () => text,
  ulistElement: () => ulistElement
});
function checkRuleName(ruleName) {
  "use strict";
  if (!RuleName[ruleName]) {
    throw new Error(`unknown rule: ${ruleName}`);
  }
  return ruleName;
}
function setup(_env) {
  "use strict";
  env = _env;
}
function content(ruleName, c) {
  "use strict";
  return {
    syntax: checkRuleName(ruleName),
    location: env.location(),
    content: c
  };
}
function contents(ruleName, c, cc) {
  "use strict";
  let processed = [c];
  if (cc) {
    if (Array.isArray(cc.content)) {
      cc.content.forEach((c2) => processed.push(c2));
    } else {
      processed.push(cc.content);
    }
  }
  return {
    syntax: checkRuleName(ruleName),
    location: env.location(),
    content: processed
  };
}
function text(ruleName, text2) {
  "use strict";
  return {
    syntax: checkRuleName(ruleName),
    location: env.location(),
    text: text2
  };
}
function chapter(comments, headline2, text2) {
  "use strict";
  return {
    syntax: checkRuleName("Chapter"),
    location: env.location(),
    comments,
    headline: headline2,
    text: text2
  };
}
function headline(level, label, caption) {
  "use strict";
  return {
    syntax: checkRuleName("Headline"),
    location: env.location(),
    level: level.length,
    label,
    caption
  };
}
function blockElement(symbol, args, contents2 = []) {
  return {
    syntax: checkRuleName("BlockElement"),
    location: env.location(),
    symbol,
    args,
    content: contents2
  };
}
function inlineElement(symbol, contents2 = []) {
  return {
    syntax: checkRuleName("InlineElement"),
    location: env.location(),
    symbol,
    content: contents2
  };
}
function column(headline2, text2) {
  "use strict";
  return {
    syntax: checkRuleName("Column"),
    location: env.location(),
    headline: headline2,
    text: text2
  };
}
function columnHeadline(level, label, caption) {
  "use strict";
  return {
    syntax: checkRuleName("ColumnHeadline"),
    location: env.location(),
    level: level.length,
    label,
    caption
  };
}
function columnTerminator(level) {
  "use strict";
  return {
    syntax: checkRuleName("ColumnTerminator"),
    location: env.location(),
    level: level.length
  };
}
function braceArg(arg) {
  "use strict";
  return {
    syntax: checkRuleName("BraceArg"),
    location: env.location(),
    arg
  };
}
function ulistElement(level, text2) {
  "use strict";
  return {
    syntax: checkRuleName("UlistElement"),
    location: env.location(),
    level: level.length,
    text: text2
  };
}
function olistElement(n, text2) {
  "use strict";
  return {
    syntax: checkRuleName("OlistElement"),
    location: env.location(),
    no: parseInt(n, 10),
    text: text2
  };
}
function dlistElement(text2, content2) {
  "use strict";
  return {
    syntax: checkRuleName("DlistElement"),
    location: env.location(),
    text: text2,
    content: content2
  };
}
var env;
var init_action = __esm({
  "lib/peg/action.ts"() {
    "use strict";
    init_parser();
  }
});

// resources/grammar.js
var require_grammar = __commonJS({
  "resources/grammar.js"(exports2, module2) {
    "use strict";
    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }
    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }
    peg$subclass(peg$SyntaxError, Error);
    peg$SyntaxError.buildMessage = function(expected, found) {
      var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return '"' + literalEscape(expectation.text) + '"';
        },
        "class": function(expectation) {
          var escapedParts = "", i;
          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
          }
          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },
        any: function(expectation) {
          return "any character";
        },
        end: function(expectation) {
          return "end of input";
        },
        other: function(expectation) {
          return expectation.description;
        }
      };
      function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
      }
      function literalEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      function classEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
      }
      function describeExpected(expected2) {
        var descriptions = new Array(expected2.length), i, j;
        for (i = 0; i < expected2.length; i++) {
          descriptions[i] = describeExpectation(expected2[i]);
        }
        descriptions.sort();
        if (descriptions.length > 0) {
          for (i = 1, j = 1; i < descriptions.length; i++) {
            if (descriptions[i - 1] !== descriptions[i]) {
              descriptions[j] = descriptions[i];
              j++;
            }
          }
          descriptions.length = j;
        }
        switch (descriptions.length) {
          case 1:
            return descriptions[0];
          case 2:
            return descriptions[0] + " or " + descriptions[1];
          default:
            return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
        }
      }
      function describeFound(found2) {
        return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
      }
      return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    function peg$parse(input, options) {
      options = options !== void 0 ? options : {};
      var peg$FAILED = {}, peg$startRuleFunctions = { Start: peg$parseStart }, peg$startRuleFunction = peg$parseStart, peg$c0 = peg$otherExpectation("start"), peg$c1 = function(c) {
        return b.content("Start", c);
      }, peg$c2 = peg$otherExpectation("chapters"), peg$c3 = function(c, cc) {
        return b.contents("Chapters", c, cc);
      }, peg$c4 = peg$otherExpectation("chapter"), peg$c5 = function(comments, headline2, text3) {
        return b.chapter(comments, headline2, text3);
      }, peg$c6 = peg$otherExpectation("headline"), peg$c7 = "=", peg$c8 = peg$literalExpectation("=", false), peg$c9 = function(level, label, caption) {
        return b.headline(level, label, caption);
      }, peg$c10 = peg$otherExpectation("contents"), peg$c11 = peg$anyExpectation(), peg$c12 = function(c, cc) {
        return b.contents("Contents", c, cc);
      }, peg$c13 = peg$otherExpectation("content"), peg$c14 = function(c) {
        return b.content("Content", c);
      }, peg$c15 = peg$otherExpectation("paragraph"), peg$c16 = function(c) {
        return b.content("Paragraph", c);
      }, peg$c17 = peg$otherExpectation("paragraph subs"), peg$c18 = function(c, cc) {
        return b.contents("ParagraphSubs", c, cc);
      }, peg$c19 = peg$otherExpectation("paragraph sub"), peg$c20 = function(c) {
        return b.content("ParagraphSub", c);
      }, peg$c21 = peg$otherExpectation("text of content"), peg$c22 = /^[^\r\n]/, peg$c23 = peg$classExpectation(["\r", "\n"], true, false), peg$c24 = function(text3) {
        return b.text("ContentText", text3);
      }, peg$c25 = peg$otherExpectation("block element"), peg$c26 = "//", peg$c27 = peg$literalExpectation("//", false), peg$c28 = "{", peg$c29 = peg$literalExpectation("{", false), peg$c30 = "//}", peg$c31 = peg$literalExpectation("//}", false), peg$c32 = function(symbol, args, contents2) {
        return b.blockElement(symbol, args, contents2);
      }, peg$c33 = function(symbol, args) {
        return b.blockElement(symbol, args);
      }, peg$c34 = peg$otherExpectation("inline element"), peg$c35 = "@<", peg$c36 = peg$literalExpectation("@<", false), peg$c37 = /^[^>\r\n]/, peg$c38 = peg$classExpectation([">", "\r", "\n"], true, false), peg$c39 = ">", peg$c40 = peg$literalExpectation(">", false), peg$c41 = "}", peg$c42 = peg$literalExpectation("}", false), peg$c43 = function(symbol, contents2) {
        return b.inlineElement(symbol, contents2);
      }, peg$c44 = "|", peg$c45 = peg$literalExpectation("|", false), peg$c46 = "$", peg$c47 = peg$literalExpectation("$", false), peg$c48 = peg$otherExpectation("column"), peg$c49 = function(headline2, text3) {
        return b.column(headline2, text3);
      }, peg$c50 = peg$otherExpectation("column headline"), peg$c51 = "[column]", peg$c52 = peg$literalExpectation("[column]", false), peg$c53 = function(level, label, caption) {
        return b.columnHeadline(level, label, caption);
      }, peg$c54 = peg$otherExpectation("column contents"), peg$c55 = function(c, cc) {
        return b.contents("ColumnContents", c, cc);
      }, peg$c56 = peg$otherExpectation("column content"), peg$c57 = function(c) {
        return b.content("ColumnContent", c);
      }, peg$c58 = peg$otherExpectation("column terminator"), peg$c59 = "[/column]", peg$c60 = peg$literalExpectation("[/column]", false), peg$c61 = function(level) {
        return b.columnTerminator(level);
      }, peg$c62 = peg$otherExpectation("bracket argument"), peg$c63 = "[", peg$c64 = peg$literalExpectation("[", false), peg$c65 = "]", peg$c66 = peg$literalExpectation("]", false), peg$c67 = function(c) {
        return b.content("BracketArg", c);
      }, peg$c68 = peg$otherExpectation("bracket arg subs"), peg$c69 = function(c, cc) {
        return b.contents("BracketArgSubs", c, cc);
      }, peg$c70 = peg$otherExpectation("bracket arg sub"), peg$c71 = function(c) {
        return b.content("BracketArgSub", c);
      }, peg$c72 = peg$otherExpectation("text of bracket arg"), peg$c73 = "\\\\", peg$c74 = peg$literalExpectation("\\\\", false), peg$c75 = "\\]", peg$c76 = peg$literalExpectation("\\]", false), peg$c77 = "\\", peg$c78 = peg$literalExpectation("\\", false), peg$c79 = function(text3) {
        return b.text("BracketArgText", text3);
      }, peg$c80 = peg$otherExpectation("brace argument"), peg$c81 = /^[^\r\n}\\]/, peg$c82 = peg$classExpectation(["\r", "\n", "}", "\\"], true, false), peg$c83 = "\\}", peg$c84 = peg$literalExpectation("\\}", false), peg$c85 = function(arg) {
        return b.braceArg(arg);
      }, peg$c86 = peg$otherExpectation("contents of block element"), peg$c87 = function(c, cc) {
        return b.contents("BlockElementContents", c, cc);
      }, peg$c88 = peg$otherExpectation("content of block element"), peg$c89 = function(c) {
        return b.content("BlockElementContent", c);
      }, peg$c90 = peg$otherExpectation("paragraph in block"), peg$c91 = peg$otherExpectation("paragraph subs in block"), peg$c92 = peg$otherExpectation("paragraph sub in block"), peg$c93 = peg$otherExpectation("text of content in block"), peg$c94 = peg$otherExpectation("contents of inline element"), peg$c95 = function(c, cc) {
        return b.contents("InlineElementContents", c, cc);
      }, peg$c96 = peg$otherExpectation("content of inline element"), peg$c97 = function(c) {
        error("Inlines cannot not contain other inlines.");
      }, peg$c98 = function(c) {
        return b.content("InlineElementContent", c);
      }, peg$c99 = peg$otherExpectation("text of inline element"), peg$c100 = function(text3) {
        return b.text("InlineElementContentText", text3.map(function(x) {
          return x.filter(function(y) {
            return y != null;
          }).join("");
        }).join(""));
      }, peg$c101 = peg$otherExpectation("char of inline element content"), peg$c102 = "\r\n", peg$c103 = peg$literalExpectation("\r\n", false), peg$c104 = "\n", peg$c105 = peg$literalExpectation("\n", false), peg$c106 = function(char) {
        return char;
      }, peg$c107 = function() {
        return "\\";
      }, peg$c108 = function() {
        return "}";
      }, peg$c109 = "\\|", peg$c110 = peg$literalExpectation("\\|", false), peg$c111 = function() {
        return "|";
      }, peg$c112 = "\\$", peg$c113 = peg$literalExpectation("\\$", false), peg$c114 = function() {
        return "$";
      }, peg$c115 = peg$otherExpectation("inline content"), peg$c116 = function(c) {
        return b.content("SinglelineContent", c);
      }, peg$c117 = peg$otherExpectation("children of inline content"), peg$c118 = function(c, cc) {
        return b.contents("ContentInlines", c, cc);
      }, peg$c119 = peg$otherExpectation("child of inline content"), peg$c120 = function(c) {
        return b.content("ContentInline", c);
      }, peg$c121 = peg$otherExpectation("text of child of inline content"), peg$c122 = function(text3) {
        return b.text("ContentInlineText", text3);
      }, peg$c123 = peg$otherExpectation("ulist"), peg$c124 = function(c, cc) {
        return b.contents("Ulist", c, cc);
      }, peg$c125 = peg$otherExpectation("ulist element"), peg$c126 = " ", peg$c127 = peg$literalExpectation(" ", false), peg$c128 = "*", peg$c129 = peg$literalExpectation("*", false), peg$c130 = function(level, text3) {
        return b.ulistElement(level, text3);
      }, peg$c131 = peg$otherExpectation("olist"), peg$c132 = function(c, cc) {
        return b.contents("Olist", c, cc);
      }, peg$c133 = peg$otherExpectation("olist element"), peg$c134 = ".", peg$c135 = peg$literalExpectation(".", false), peg$c136 = function(n, text3) {
        return b.olistElement(n, text3);
      }, peg$c137 = peg$otherExpectation("dlist"), peg$c138 = function(c, cc) {
        return b.contents("Dlist", c, cc);
      }, peg$c139 = peg$otherExpectation("dlist element"), peg$c140 = ":", peg$c141 = peg$literalExpectation(":", false), peg$c142 = function(text3, content2) {
        return b.dlistElement(text3, content2);
      }, peg$c143 = peg$otherExpectation("contents of dlist element"), peg$c144 = function(c, cc) {
        return b.contents("DlistElementContents", c, cc);
      }, peg$c145 = peg$otherExpectation("content of dlist element"), peg$c146 = /^[ \t]/, peg$c147 = peg$classExpectation([" ", "	"], false, false), peg$c148 = function(c) {
        return b.content("DlistElementContent", c);
      }, peg$c149 = peg$otherExpectation("signle line comments"), peg$c150 = function(c, cc) {
        return b.contents("SinglelineComments", c, cc);
      }, peg$c151 = peg$otherExpectation("signle line comment"), peg$c152 = "#@", peg$c153 = peg$literalExpectation("#@", false), peg$c154 = function(text3) {
        return b.text("SinglelineComment", text3);
      }, peg$c155 = peg$otherExpectation("digits"), peg$c156 = peg$otherExpectation("digit"), peg$c157 = /^[0-9]/, peg$c158 = peg$classExpectation([["0", "9"]], false, false), peg$c159 = peg$otherExpectation("lower alphabet"), peg$c160 = /^[a-z]/, peg$c161 = peg$classExpectation([["a", "z"]], false, false), peg$c162 = peg$otherExpectation("newline"), peg$c163 = peg$otherExpectation("blank lines"), peg$c164 = peg$otherExpectation("spacer"), peg$c165 = /^[ \t\r\n]/, peg$c166 = peg$classExpectation([" ", "	", "\r", "\n"], false, false), peg$c167 = peg$otherExpectation("space"), peg$c168 = /^[ \u3000\t]/, peg$c169 = peg$classExpectation([" ", "\u3000", "	"], false, false), peg$c170 = peg$otherExpectation("end of file"), peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [{ line: 1, column: 1 }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
      function text2() {
        return input.substring(peg$savedPos, peg$currPos);
      }
      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }
      function expected(description, location2) {
        location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError(
          [peg$otherExpectation(description)],
          input.substring(peg$savedPos, peg$currPos),
          location2
        );
      }
      function error(message, location2) {
        location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location2);
      }
      function peg$literalExpectation(text3, ignoreCase) {
        return { type: "literal", text: text3, ignoreCase };
      }
      function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts, inverted, ignoreCase };
      }
      function peg$anyExpectation() {
        return { type: "any" };
      }
      function peg$endExpectation() {
        return { type: "end" };
      }
      function peg$otherExpectation(description) {
        return { type: "other", description };
      }
      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos], p;
        if (details) {
          return details;
        } else {
          p = pos - 1;
          while (!peg$posDetailsCache[p]) {
            p--;
          }
          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column
          };
          while (p < pos) {
            if (input.charCodeAt(p) === 10) {
              details.line++;
              details.column = 1;
            } else {
              details.column++;
            }
            p++;
          }
          peg$posDetailsCache[pos] = details;
          return details;
        }
      }
      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }
      function peg$fail(expected2) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }
        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected2);
      }
      function peg$buildSimpleError(message, location2) {
        return new peg$SyntaxError(message, null, null, location2);
      }
      function peg$buildStructuredError(expected2, found, location2) {
        return new peg$SyntaxError(
          peg$SyntaxError.buildMessage(expected2, found),
          expected2,
          found,
          location2
        );
      }
      function peg$parseStart() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseChapters();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c1(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c0);
          }
        }
        return s0;
      }
      function peg$parseChapters() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseChapter();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseChapters();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c3(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c2);
          }
        }
        return s0;
      }
      function peg$parseChapter() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseSinglelineComments();
        if (s1 === peg$FAILED) {
          s1 = null;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseHeadline();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseContents();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c5(s1, s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c4);
          }
        }
        return s0;
      }
      function peg$parseHeadline() {
        var s0, s1, s2, s3, s4, s5;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c7;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c8);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (input.charCodeAt(peg$currPos) === 61) {
              s2 = peg$c7;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseBraceArg();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseSpace();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseSpace();
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseSinglelineContent();
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_l();
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c9(s1, s2, s4);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }
        return s0;
      }
      function peg$parseContents() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c11);
          }
        }
        peg$silentFails--;
        if (s2 !== peg$FAILED) {
          peg$currPos = s1;
          s1 = void 0;
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseContent();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseContents();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_l();
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c12(s2, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c10);
          }
        }
        return s0;
      }
      function peg$parseContent() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseSinglelineComment();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c14(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseBlockElement();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c14(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseUlist();
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c14(s1);
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parseOlist();
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c14(s1);
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parseDlist();
                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c14(s1);
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = peg$parseParagraph();
                  if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c14(s1);
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = peg$parseColumn();
                    if (s1 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c14(s1);
                    }
                    s0 = s1;
                  }
                }
              }
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c13);
          }
        }
        return s0;
      }
      function peg$parseParagraph() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c7;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c8);
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseParagraphSubs();
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_l();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c16(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c15);
          }
        }
        return s0;
      }
      function peg$parseParagraphSubs() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseParagraphSub();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseParagraphSubs();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c17);
          }
        }
        return s0;
      }
      function peg$parseParagraphSub() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseInlineElement();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseNewline();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c20(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseContentText();
          if (s1 !== peg$FAILED) {
            s2 = peg$parseNewline();
            if (s2 === peg$FAILED) {
              s2 = null;
            }
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c20(s1);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c19);
          }
        }
        return s0;
      }
      function peg$parseContentText() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseNewline();
        peg$silentFails--;
        if (s4 === peg$FAILED) {
          s3 = void 0;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$currPos;
          peg$silentFails++;
          s5 = peg$parseHeadline();
          peg$silentFails--;
          if (s5 === peg$FAILED) {
            s4 = void 0;
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$currPos;
            peg$silentFails++;
            s6 = peg$parseSinglelineComment();
            peg$silentFails--;
            if (s6 === peg$FAILED) {
              s5 = void 0;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$currPos;
              peg$silentFails++;
              s7 = peg$parseBlockElement();
              peg$silentFails--;
              if (s7 === peg$FAILED) {
                s6 = void 0;
              } else {
                peg$currPos = s6;
                s6 = peg$FAILED;
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$currPos;
                peg$silentFails++;
                s8 = peg$parseUlist();
                peg$silentFails--;
                if (s8 === peg$FAILED) {
                  s7 = void 0;
                } else {
                  peg$currPos = s7;
                  s7 = peg$FAILED;
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$currPos;
                  peg$silentFails++;
                  s9 = peg$parseOlist();
                  peg$silentFails--;
                  if (s9 === peg$FAILED) {
                    s8 = void 0;
                  } else {
                    peg$currPos = s8;
                    s8 = peg$FAILED;
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$currPos;
                    peg$silentFails++;
                    s10 = peg$parseDlist();
                    peg$silentFails--;
                    if (s10 === peg$FAILED) {
                      s9 = void 0;
                    } else {
                      peg$currPos = s9;
                      s9 = peg$FAILED;
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = [];
                      s11 = peg$currPos;
                      s12 = peg$currPos;
                      peg$silentFails++;
                      s13 = peg$parseInlineElement();
                      peg$silentFails--;
                      if (s13 === peg$FAILED) {
                        s12 = void 0;
                      } else {
                        peg$currPos = s12;
                        s12 = peg$FAILED;
                      }
                      if (s12 !== peg$FAILED) {
                        if (peg$c22.test(input.charAt(peg$currPos))) {
                          s13 = input.charAt(peg$currPos);
                          peg$currPos++;
                        } else {
                          s13 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c23);
                          }
                        }
                        if (s13 !== peg$FAILED) {
                          s12 = [s12, s13];
                          s11 = s12;
                        } else {
                          peg$currPos = s11;
                          s11 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s11;
                        s11 = peg$FAILED;
                      }
                      if (s11 !== peg$FAILED) {
                        while (s11 !== peg$FAILED) {
                          s10.push(s11);
                          s11 = peg$currPos;
                          s12 = peg$currPos;
                          peg$silentFails++;
                          s13 = peg$parseInlineElement();
                          peg$silentFails--;
                          if (s13 === peg$FAILED) {
                            s12 = void 0;
                          } else {
                            peg$currPos = s12;
                            s12 = peg$FAILED;
                          }
                          if (s12 !== peg$FAILED) {
                            if (peg$c22.test(input.charAt(peg$currPos))) {
                              s13 = input.charAt(peg$currPos);
                              peg$currPos++;
                            } else {
                              s13 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c23);
                              }
                            }
                            if (s13 !== peg$FAILED) {
                              s12 = [s12, s13];
                              s11 = s12;
                            } else {
                              peg$currPos = s11;
                              s11 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s11;
                            s11 = peg$FAILED;
                          }
                        }
                      } else {
                        s10 = peg$FAILED;
                      }
                      if (s10 !== peg$FAILED) {
                        s3 = [s3, s4, s5, s6, s7, s8, s9, s10];
                        s2 = s3;
                      } else {
                        peg$currPos = s2;
                        s2 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s2;
                      s2 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s2;
                    s2 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s2;
                  s2 = peg$FAILED;
                }
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c24(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c21);
          }
        }
        return s0;
      }
      function peg$parseBlockElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c26) {
          s1 = peg$c26;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c27);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = [];
          s4 = peg$parseAZ();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseAZ();
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s2 = input.substring(s2, peg$currPos);
          } else {
            s2 = s3;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseBracketArg();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseBracketArg();
            }
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c28;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c29);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_l();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseBlockElementContents();
                  if (s6 === peg$FAILED) {
                    s6 = null;
                  }
                  if (s6 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 3) === peg$c30) {
                      s7 = peg$c30;
                      peg$currPos += 3;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c31);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_l();
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c32(s2, s3, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c26) {
            s1 = peg$c26;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c27);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = [];
            s4 = peg$parseAZ();
            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseAZ();
              }
            } else {
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              s2 = input.substring(s2, peg$currPos);
            } else {
              s2 = s3;
            }
            if (s2 !== peg$FAILED) {
              s3 = [];
              s4 = peg$parseBracketArg();
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                s4 = peg$parseBracketArg();
              }
              if (s3 !== peg$FAILED) {
                s4 = peg$parse_l();
                if (s4 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c33(s2, s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c25);
          }
        }
        return s0;
      }
      function peg$parseInlineElement() {
        var s0, s1, s2, s3, s4, s5, s6;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c35) {
          s1 = peg$c35;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c36);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = [];
          if (peg$c37.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c38);
            }
          }
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              if (peg$c37.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c38);
                }
              }
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s2 = input.substring(s2, peg$currPos);
          } else {
            s2 = s3;
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 62) {
              s3 = peg$c39;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c40);
              }
            }
            if (s3 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 123) {
                s4 = peg$c28;
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c29);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseBraceInlineElementContents();
                if (s5 === peg$FAILED) {
                  s5 = null;
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s6 = peg$c41;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c42);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c43(s2, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c35) {
            s1 = peg$c35;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c36);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            s3 = [];
            if (peg$c37.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c38);
              }
            }
            if (s4 !== peg$FAILED) {
              while (s4 !== peg$FAILED) {
                s3.push(s4);
                if (peg$c37.test(input.charAt(peg$currPos))) {
                  s4 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c38);
                  }
                }
              }
            } else {
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              s2 = input.substring(s2, peg$currPos);
            } else {
              s2 = s3;
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 62) {
                s3 = peg$c39;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c40);
                }
              }
              if (s3 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 124) {
                  s4 = peg$c44;
                  peg$currPos++;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c45);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parsePipeInlineElementContents();
                  if (s5 === peg$FAILED) {
                    s5 = null;
                  }
                  if (s5 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 124) {
                      s6 = peg$c44;
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c45);
                      }
                    }
                    if (s6 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c43(s2, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c35) {
              s1 = peg$c35;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c36);
              }
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$currPos;
              s3 = [];
              if (peg$c37.test(input.charAt(peg$currPos))) {
                s4 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c38);
                }
              }
              if (s4 !== peg$FAILED) {
                while (s4 !== peg$FAILED) {
                  s3.push(s4);
                  if (peg$c37.test(input.charAt(peg$currPos))) {
                    s4 = input.charAt(peg$currPos);
                    peg$currPos++;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c38);
                    }
                  }
                }
              } else {
                s3 = peg$FAILED;
              }
              if (s3 !== peg$FAILED) {
                s2 = input.substring(s2, peg$currPos);
              } else {
                s2 = s3;
              }
              if (s2 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 62) {
                  s3 = peg$c39;
                  peg$currPos++;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c40);
                  }
                }
                if (s3 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 36) {
                    s4 = peg$c46;
                    peg$currPos++;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c47);
                    }
                  }
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parseDollarInlineElementContents();
                    if (s5 === peg$FAILED) {
                      s5 = null;
                    }
                    if (s5 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 36) {
                        s6 = peg$c46;
                        peg$currPos++;
                      } else {
                        s6 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c47);
                        }
                      }
                      if (s6 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c43(s2, s5);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c34);
          }
        }
        return s0;
      }
      function peg$parseColumn() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseColumnHeadline();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseColumnContents();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseColumnTerminator();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c49(s1, s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c48);
          }
        }
        return s0;
      }
      function peg$parseColumnHeadline() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c7;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c8);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (input.charCodeAt(peg$currPos) === 61) {
              s2 = peg$c7;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 8) === peg$c51) {
            s2 = peg$c51;
            peg$currPos += 8;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c52);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseBraceArg();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = peg$parseSpace();
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseSpace();
              }
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parseSpace();
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseSpace();
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseSinglelineContent();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_l();
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c53(s1, s3, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c50);
          }
        }
        return s0;
      }
      function peg$parseColumnContents() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.length > peg$currPos) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c11);
          }
        }
        peg$silentFails--;
        if (s2 !== peg$FAILED) {
          peg$currPos = s1;
          s1 = void 0;
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseColumnContent();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseColumnContents();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_l();
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c55(s2, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c54);
          }
        }
        return s0;
      }
      function peg$parseColumnContent() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parseColumnTerminator();
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseSinglelineComment();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c57(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$currPos;
          peg$silentFails++;
          s2 = peg$parseColumnTerminator();
          peg$silentFails--;
          if (s2 === peg$FAILED) {
            s1 = void 0;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseBlockElement();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c57(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$currPos;
            peg$silentFails++;
            s2 = peg$parseColumnTerminator();
            peg$silentFails--;
            if (s2 === peg$FAILED) {
              s1 = void 0;
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
            if (s1 !== peg$FAILED) {
              s2 = peg$parseUlist();
              if (s2 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c57(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$currPos;
              peg$silentFails++;
              s2 = peg$parseColumnTerminator();
              peg$silentFails--;
              if (s2 === peg$FAILED) {
                s1 = void 0;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
              if (s1 !== peg$FAILED) {
                s2 = peg$parseOlist();
                if (s2 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c57(s2);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$currPos;
                peg$silentFails++;
                s2 = peg$parseColumnTerminator();
                peg$silentFails--;
                if (s2 === peg$FAILED) {
                  s1 = void 0;
                } else {
                  peg$currPos = s1;
                  s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$parseDlist();
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c57(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = peg$currPos;
                  peg$silentFails++;
                  s2 = peg$parseColumnTerminator();
                  peg$silentFails--;
                  if (s2 === peg$FAILED) {
                    s1 = void 0;
                  } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                  }
                  if (s1 !== peg$FAILED) {
                    s2 = peg$parseParagraph();
                    if (s2 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c57(s2);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    s1 = peg$currPos;
                    peg$silentFails++;
                    s2 = peg$parseColumnTerminator();
                    peg$silentFails--;
                    if (s2 === peg$FAILED) {
                      s1 = void 0;
                    } else {
                      peg$currPos = s1;
                      s1 = peg$FAILED;
                    }
                    if (s1 !== peg$FAILED) {
                      s2 = peg$parseChapter();
                      if (s2 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c57(s2);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  }
                }
              }
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c56);
          }
        }
        return s0;
      }
      function peg$parseColumnTerminator() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 61) {
          s2 = peg$c7;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c8);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (input.charCodeAt(peg$currPos) === 61) {
              s2 = peg$c7;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.substr(peg$currPos, 9) === peg$c59) {
            s2 = peg$c59;
            peg$currPos += 9;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c60);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseSpace();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseSpace();
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_l();
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c61(s1);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c58);
          }
        }
        return s0;
      }
      function peg$parseBracketArg() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
          s1 = peg$c63;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c64);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseBracketArgSubs();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s3 = peg$c65;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c66);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c67(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c62);
          }
        }
        return s0;
      }
      function peg$parseBracketArgSubs() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseBracketArgSub();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseBracketArgSubs();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c69(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c68);
          }
        }
        return s0;
      }
      function peg$parseBracketArgSub() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseInlineElement();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c71(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseBracketArgText();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c71(s1);
          }
          s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c70);
          }
        }
        return s0;
      }
      function peg$parseBracketArgText() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parseNewline();
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$currPos;
          peg$silentFails++;
          s6 = peg$parseInlineElement();
          peg$silentFails--;
          if (s6 === peg$FAILED) {
            s5 = void 0;
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
          if (s5 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c73) {
              s6 = peg$c73;
              peg$currPos += 2;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c74);
              }
            }
            if (s6 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c75) {
                s6 = peg$c75;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c76);
                }
              }
              if (s6 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 92) {
                  s6 = peg$c77;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c78);
                  }
                }
                if (s6 === peg$FAILED) {
                  s6 = peg$currPos;
                  s7 = peg$currPos;
                  peg$silentFails++;
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s8 = peg$c65;
                    peg$currPos++;
                  } else {
                    s8 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c66);
                    }
                  }
                  peg$silentFails--;
                  if (s8 === peg$FAILED) {
                    s7 = void 0;
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  if (s7 !== peg$FAILED) {
                    if (input.length > peg$currPos) {
                      s8 = input.charAt(peg$currPos);
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c11);
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
              }
            }
            if (s6 !== peg$FAILED) {
              s4 = [s4, s5, s6];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            s5 = peg$parseNewline();
            peg$silentFails--;
            if (s5 === peg$FAILED) {
              s4 = void 0;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              peg$silentFails++;
              s6 = peg$parseInlineElement();
              peg$silentFails--;
              if (s6 === peg$FAILED) {
                s5 = void 0;
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c73) {
                  s6 = peg$c73;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c74);
                  }
                }
                if (s6 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c75) {
                    s6 = peg$c75;
                    peg$currPos += 2;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c76);
                    }
                  }
                  if (s6 === peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 92) {
                      s6 = peg$c77;
                      peg$currPos++;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c78);
                      }
                    }
                    if (s6 === peg$FAILED) {
                      s6 = peg$currPos;
                      s7 = peg$currPos;
                      peg$silentFails++;
                      if (input.charCodeAt(peg$currPos) === 93) {
                        s8 = peg$c65;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c66);
                        }
                      }
                      peg$silentFails--;
                      if (s8 === peg$FAILED) {
                        s7 = void 0;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                      if (s7 !== peg$FAILED) {
                        if (input.length > peg$currPos) {
                          s8 = input.charAt(peg$currPos);
                          peg$currPos++;
                        } else {
                          s8 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c11);
                          }
                        }
                        if (s8 !== peg$FAILED) {
                          s7 = [s7, s8];
                          s6 = s7;
                        } else {
                          peg$currPos = s6;
                          s6 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    }
                  }
                }
                if (s6 !== peg$FAILED) {
                  s4 = [s4, s5, s6];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c79(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c72);
          }
        }
        return s0;
      }
      function peg$parseBraceArg() {
        var s0, s1, s2, s3, s4, s5, s6;
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 123) {
          s1 = peg$c28;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c29);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = [];
          s4 = peg$currPos;
          s5 = [];
          if (peg$c81.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c82);
            }
          }
          if (s6 !== peg$FAILED) {
            while (s6 !== peg$FAILED) {
              s5.push(s6);
              if (peg$c81.test(input.charAt(peg$currPos))) {
                s6 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c82);
                }
              }
            }
          } else {
            s5 = peg$FAILED;
          }
          if (s5 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c73) {
              s6 = peg$c73;
              peg$currPos += 2;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c74);
              }
            }
            if (s6 === peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c83) {
                s6 = peg$c83;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c84);
                }
              }
              if (s6 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 92) {
                  s6 = peg$c77;
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c78);
                  }
                }
              }
            }
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            s4 = peg$currPos;
            s5 = [];
            if (peg$c81.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c82);
              }
            }
            if (s6 !== peg$FAILED) {
              while (s6 !== peg$FAILED) {
                s5.push(s6);
                if (peg$c81.test(input.charAt(peg$currPos))) {
                  s6 = input.charAt(peg$currPos);
                  peg$currPos++;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c82);
                  }
                }
              }
            } else {
              s5 = peg$FAILED;
            }
            if (s5 !== peg$FAILED) {
              if (input.substr(peg$currPos, 2) === peg$c73) {
                s6 = peg$c73;
                peg$currPos += 2;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c74);
                }
              }
              if (s6 === peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c83) {
                  s6 = peg$c83;
                  peg$currPos += 2;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c84);
                  }
                }
                if (s6 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 92) {
                    s6 = peg$c77;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c78);
                    }
                  }
                }
              }
              if (s6 === peg$FAILED) {
                s6 = null;
              }
              if (s6 !== peg$FAILED) {
                s5 = [s5, s6];
                s4 = s5;
              } else {
                peg$currPos = s4;
                s4 = peg$FAILED;
              }
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          }
          if (s3 !== peg$FAILED) {
            s2 = input.substring(s2, peg$currPos);
          } else {
            s2 = s3;
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 125) {
              s3 = peg$c41;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c42);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c85(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c80);
          }
        }
        return s0;
      }
      function peg$parseBlockElementContents() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseBlockElementContent();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseBlockElementContents();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_l();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c87(s1, s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c86);
          }
        }
        return s0;
      }
      function peg$parseBlockElementContent() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseSinglelineComment();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c89(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseBlockElement();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c89(s1);
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseUlist();
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c89(s1);
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              s1 = peg$parseOlist();
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c89(s1);
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                s1 = peg$parseDlist();
                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c89(s1);
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  s1 = peg$parseBlockElementParagraph();
                  if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c89(s1);
                  }
                  s0 = s1;
                }
              }
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c88);
          }
        }
        return s0;
      }
      function peg$parseBlockElementParagraph() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseBlockElementParagraphSubs();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_l();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c16(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c90);
          }
        }
        return s0;
      }
      function peg$parseBlockElementParagraphSubs() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseBlockElementParagraphSub();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseBlockElementParagraphSubs();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c91);
          }
        }
        return s0;
      }
      function peg$parseBlockElementParagraphSub() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseInlineElement();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c20(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseBlockElementContentText();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c20(s1);
          }
          s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c92);
          }
        }
        return s0;
      }
      function peg$parseBlockElementContentText() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        if (input.substr(peg$currPos, 3) === peg$c30) {
          s5 = peg$c30;
          peg$currPos += 3;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c31);
          }
        }
        if (s5 === peg$FAILED) {
          s5 = peg$currPos;
          s6 = peg$parseNewline();
          if (s6 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c30) {
              s7 = peg$c30;
              peg$currPos += 3;
            } else {
              s7 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c31);
              }
            }
            if (s7 !== peg$FAILED) {
              s6 = [s6, s7];
              s5 = s6;
            } else {
              peg$currPos = s5;
              s5 = peg$FAILED;
            }
          } else {
            peg$currPos = s5;
            s5 = peg$FAILED;
          }
        }
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          s5 = peg$parseNewline();
          if (s5 === peg$FAILED) {
            s5 = null;
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$currPos;
            peg$silentFails++;
            s7 = peg$parseSinglelineComment();
            peg$silentFails--;
            if (s7 === peg$FAILED) {
              s6 = void 0;
            } else {
              peg$currPos = s6;
              s6 = peg$FAILED;
            }
            if (s6 !== peg$FAILED) {
              s7 = peg$currPos;
              peg$silentFails++;
              s8 = peg$parseBlockElement();
              peg$silentFails--;
              if (s8 === peg$FAILED) {
                s7 = void 0;
              } else {
                peg$currPos = s7;
                s7 = peg$FAILED;
              }
              if (s7 !== peg$FAILED) {
                s8 = peg$currPos;
                peg$silentFails++;
                s9 = peg$parseUlist();
                peg$silentFails--;
                if (s9 === peg$FAILED) {
                  s8 = void 0;
                } else {
                  peg$currPos = s8;
                  s8 = peg$FAILED;
                }
                if (s8 !== peg$FAILED) {
                  s9 = peg$currPos;
                  peg$silentFails++;
                  s10 = peg$parseOlist();
                  peg$silentFails--;
                  if (s10 === peg$FAILED) {
                    s9 = void 0;
                  } else {
                    peg$currPos = s9;
                    s9 = peg$FAILED;
                  }
                  if (s9 !== peg$FAILED) {
                    s10 = peg$currPos;
                    peg$silentFails++;
                    s11 = peg$parseDlist();
                    peg$silentFails--;
                    if (s11 === peg$FAILED) {
                      s10 = void 0;
                    } else {
                      peg$currPos = s10;
                      s10 = peg$FAILED;
                    }
                    if (s10 !== peg$FAILED) {
                      s11 = [];
                      s12 = peg$currPos;
                      s13 = peg$currPos;
                      peg$silentFails++;
                      s14 = peg$parseInlineElement();
                      peg$silentFails--;
                      if (s14 === peg$FAILED) {
                        s13 = void 0;
                      } else {
                        peg$currPos = s13;
                        s13 = peg$FAILED;
                      }
                      if (s13 !== peg$FAILED) {
                        if (peg$c22.test(input.charAt(peg$currPos))) {
                          s14 = input.charAt(peg$currPos);
                          peg$currPos++;
                        } else {
                          s14 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c23);
                          }
                        }
                        if (s14 !== peg$FAILED) {
                          s13 = [s13, s14];
                          s12 = s13;
                        } else {
                          peg$currPos = s12;
                          s12 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s12;
                        s12 = peg$FAILED;
                      }
                      if (s12 !== peg$FAILED) {
                        while (s12 !== peg$FAILED) {
                          s11.push(s12);
                          s12 = peg$currPos;
                          s13 = peg$currPos;
                          peg$silentFails++;
                          s14 = peg$parseInlineElement();
                          peg$silentFails--;
                          if (s14 === peg$FAILED) {
                            s13 = void 0;
                          } else {
                            peg$currPos = s13;
                            s13 = peg$FAILED;
                          }
                          if (s13 !== peg$FAILED) {
                            if (peg$c22.test(input.charAt(peg$currPos))) {
                              s14 = input.charAt(peg$currPos);
                              peg$currPos++;
                            } else {
                              s14 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c23);
                              }
                            }
                            if (s14 !== peg$FAILED) {
                              s13 = [s13, s14];
                              s12 = s13;
                            } else {
                              peg$currPos = s12;
                              s12 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s12;
                            s12 = peg$FAILED;
                          }
                        }
                      } else {
                        s11 = peg$FAILED;
                      }
                      if (s11 !== peg$FAILED) {
                        s12 = peg$parseNewline();
                        if (s12 === peg$FAILED) {
                          s12 = null;
                        }
                        if (s12 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7, s8, s9, s10, s11, s12];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            if (input.substr(peg$currPos, 3) === peg$c30) {
              s5 = peg$c30;
              peg$currPos += 3;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c31);
              }
            }
            if (s5 === peg$FAILED) {
              s5 = peg$currPos;
              s6 = peg$parseNewline();
              if (s6 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c30) {
                  s7 = peg$c30;
                  peg$currPos += 3;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c31);
                  }
                }
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
            }
            peg$silentFails--;
            if (s5 === peg$FAILED) {
              s4 = void 0;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parseNewline();
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$currPos;
                peg$silentFails++;
                s7 = peg$parseSinglelineComment();
                peg$silentFails--;
                if (s7 === peg$FAILED) {
                  s6 = void 0;
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$currPos;
                  peg$silentFails++;
                  s8 = peg$parseBlockElement();
                  peg$silentFails--;
                  if (s8 === peg$FAILED) {
                    s7 = void 0;
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$currPos;
                    peg$silentFails++;
                    s9 = peg$parseUlist();
                    peg$silentFails--;
                    if (s9 === peg$FAILED) {
                      s8 = void 0;
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$currPos;
                      peg$silentFails++;
                      s10 = peg$parseOlist();
                      peg$silentFails--;
                      if (s10 === peg$FAILED) {
                        s9 = void 0;
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$currPos;
                        peg$silentFails++;
                        s11 = peg$parseDlist();
                        peg$silentFails--;
                        if (s11 === peg$FAILED) {
                          s10 = void 0;
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                        if (s10 !== peg$FAILED) {
                          s11 = [];
                          s12 = peg$currPos;
                          s13 = peg$currPos;
                          peg$silentFails++;
                          s14 = peg$parseInlineElement();
                          peg$silentFails--;
                          if (s14 === peg$FAILED) {
                            s13 = void 0;
                          } else {
                            peg$currPos = s13;
                            s13 = peg$FAILED;
                          }
                          if (s13 !== peg$FAILED) {
                            if (peg$c22.test(input.charAt(peg$currPos))) {
                              s14 = input.charAt(peg$currPos);
                              peg$currPos++;
                            } else {
                              s14 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c23);
                              }
                            }
                            if (s14 !== peg$FAILED) {
                              s13 = [s13, s14];
                              s12 = s13;
                            } else {
                              peg$currPos = s12;
                              s12 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s12;
                            s12 = peg$FAILED;
                          }
                          if (s12 !== peg$FAILED) {
                            while (s12 !== peg$FAILED) {
                              s11.push(s12);
                              s12 = peg$currPos;
                              s13 = peg$currPos;
                              peg$silentFails++;
                              s14 = peg$parseInlineElement();
                              peg$silentFails--;
                              if (s14 === peg$FAILED) {
                                s13 = void 0;
                              } else {
                                peg$currPos = s13;
                                s13 = peg$FAILED;
                              }
                              if (s13 !== peg$FAILED) {
                                if (peg$c22.test(input.charAt(peg$currPos))) {
                                  s14 = input.charAt(peg$currPos);
                                  peg$currPos++;
                                } else {
                                  s14 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c23);
                                  }
                                }
                                if (s14 !== peg$FAILED) {
                                  s13 = [s13, s14];
                                  s12 = s13;
                                } else {
                                  peg$currPos = s12;
                                  s12 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s12;
                                s12 = peg$FAILED;
                              }
                            }
                          } else {
                            s11 = peg$FAILED;
                          }
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parseNewline();
                            if (s12 === peg$FAILED) {
                              s12 = null;
                            }
                            if (s12 !== peg$FAILED) {
                              s4 = [s4, s5, s6, s7, s8, s9, s10, s11, s12];
                              s3 = s4;
                            } else {
                              peg$currPos = s3;
                              s3 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c24(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c93);
          }
        }
        return s0;
      }
      function peg$parseBraceInlineElementContents() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseBraceInlineElementContent();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseBraceInlineElementContents();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c95(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c94);
          }
        }
        return s0;
      }
      function peg$parsePipeInlineElementContents() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parsePipeInlineElementContent();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsePipeInlineElementContents();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c95(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c94);
          }
        }
        return s0;
      }
      function peg$parseDollarInlineElementContents() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseDollarInlineElementContent();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseDollarInlineElementContents();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c95(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c94);
          }
        }
        return s0;
      }
      function peg$parseBraceInlineElementContent() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseInlineElement();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c97(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseBraceInlineElementContentText();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c98(s1);
          }
          s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c96);
          }
        }
        return s0;
      }
      function peg$parsePipeInlineElementContent() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseInlineElement();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c97(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parsePipeInlineElementContentText();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c98(s1);
          }
          s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c96);
          }
        }
        return s0;
      }
      function peg$parseDollarInlineElementContent() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseInlineElement();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c97(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseDollarInlineElementContentText();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c98(s1);
          }
          s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c96);
          }
        }
        return s0;
      }
      function peg$parseBraceInlineElementContentText() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseInlineElement();
        peg$silentFails--;
        if (s4 === peg$FAILED) {
          s3 = void 0;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseBraceInlineElementContentChar();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$currPos;
            peg$silentFails++;
            s4 = peg$parseInlineElement();
            peg$silentFails--;
            if (s4 === peg$FAILED) {
              s3 = void 0;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseBraceInlineElementContentChar();
              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c100(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c99);
          }
        }
        return s0;
      }
      function peg$parsePipeInlineElementContentText() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseInlineElement();
        peg$silentFails--;
        if (s4 === peg$FAILED) {
          s3 = void 0;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parsePipeInlineElementContentChar();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$currPos;
            peg$silentFails++;
            s4 = peg$parseInlineElement();
            peg$silentFails--;
            if (s4 === peg$FAILED) {
              s3 = void 0;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsePipeInlineElementContentChar();
              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c100(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c99);
          }
        }
        return s0;
      }
      function peg$parseDollarInlineElementContentText() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$currPos;
        peg$silentFails++;
        s4 = peg$parseInlineElement();
        peg$silentFails--;
        if (s4 === peg$FAILED) {
          s3 = void 0;
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseDollarInlineElementContentChar();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$currPos;
            s3 = peg$currPos;
            peg$silentFails++;
            s4 = peg$parseInlineElement();
            peg$silentFails--;
            if (s4 === peg$FAILED) {
              s3 = void 0;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseDollarInlineElementContentChar();
              if (s4 !== peg$FAILED) {
                s3 = [s3, s4];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c100(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c99);
          }
        }
        return s0;
      }
      function peg$parseBraceInlineElementContentChar() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 92) {
          s2 = peg$c77;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c78);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 125) {
            s2 = peg$c41;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c42);
            }
          }
          if (s2 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c102) {
              s2 = peg$c102;
              peg$currPos += 2;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c103);
              }
            }
            if (s2 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 10) {
                s2 = peg$c104;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c105);
                }
              }
            }
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c11);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c106(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c73) {
            s1 = peg$c73;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c74);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c107();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c83) {
              s1 = peg$c83;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c84);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c108();
            }
            s0 = s1;
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c101);
          }
        }
        return s0;
      }
      function peg$parsePipeInlineElementContentChar() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 92) {
          s2 = peg$c77;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c78);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 124) {
            s2 = peg$c44;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c45);
            }
          }
          if (s2 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c102) {
              s2 = peg$c102;
              peg$currPos += 2;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c103);
              }
            }
            if (s2 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 10) {
                s2 = peg$c104;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c105);
                }
              }
            }
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c11);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c106(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c73) {
            s1 = peg$c73;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c74);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c107();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c109) {
              s1 = peg$c109;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c110);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c111();
            }
            s0 = s1;
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c101);
          }
        }
        return s0;
      }
      function peg$parseDollarInlineElementContentChar() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 92) {
          s2 = peg$c77;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c78);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 36) {
            s2 = peg$c46;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c47);
            }
          }
          if (s2 === peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c102) {
              s2 = peg$c102;
              peg$currPos += 2;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c103);
              }
            }
            if (s2 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 10) {
                s2 = peg$c104;
                peg$currPos++;
              } else {
                s2 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c105);
                }
              }
            }
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c11);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c106(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c73) {
            s1 = peg$c73;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c74);
            }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c107();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c112) {
              s1 = peg$c112;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c113);
              }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c114();
            }
            s0 = s1;
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c101);
          }
        }
        return s0;
      }
      function peg$parseSinglelineContent() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseContentInlines();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseNewline();
          if (s2 === peg$FAILED) {
            s2 = peg$parseEOF();
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c116(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c115);
          }
        }
        return s0;
      }
      function peg$parseContentInlines() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseContentInline();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseContentInlines();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c118(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c117);
          }
        }
        return s0;
      }
      function peg$parseContentInline() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseInlineElement();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c120(s1);
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseContentInlineText();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c120(s1);
          }
          s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c119);
          }
        }
        return s0;
      }
      function peg$parseContentInlineText() {
        var s0, s1, s2, s3, s4, s5;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        s3 = peg$currPos;
        s4 = peg$currPos;
        peg$silentFails++;
        s5 = peg$parseInlineElement();
        peg$silentFails--;
        if (s5 === peg$FAILED) {
          s4 = void 0;
        } else {
          peg$currPos = s4;
          s4 = peg$FAILED;
        }
        if (s4 !== peg$FAILED) {
          if (peg$c22.test(input.charAt(peg$currPos))) {
            s5 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c23);
            }
          }
          if (s5 !== peg$FAILED) {
            s4 = [s4, s5];
            s3 = s4;
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
        } else {
          peg$currPos = s3;
          s3 = peg$FAILED;
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$currPos;
            peg$silentFails++;
            s5 = peg$parseInlineElement();
            peg$silentFails--;
            if (s5 === peg$FAILED) {
              s4 = void 0;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
            if (s4 !== peg$FAILED) {
              if (peg$c22.test(input.charAt(peg$currPos))) {
                s5 = input.charAt(peg$currPos);
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c23);
                }
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c122(s1);
        }
        s0 = s1;
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c121);
          }
        }
        return s0;
      }
      function peg$parseUlist() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseUlistElement();
        if (s1 === peg$FAILED) {
          s1 = peg$parseSinglelineComment();
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseUlist();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_l();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c124(s1, s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c123);
          }
        }
        return s0;
      }
      function peg$parseUlistElement() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c126;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c127);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (input.charCodeAt(peg$currPos) === 32) {
              s2 = peg$c126;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c127);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (input.charCodeAt(peg$currPos) === 42) {
            s3 = peg$c128;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c129);
            }
          }
          if (s3 !== peg$FAILED) {
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              if (input.charCodeAt(peg$currPos) === 42) {
                s3 = peg$c128;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c129);
                }
              }
            }
          } else {
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseSpace();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseSpace();
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseSinglelineContent();
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c130(s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c125);
          }
        }
        return s0;
      }
      function peg$parseOlist() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseOlistElement();
        if (s1 === peg$FAILED) {
          s1 = peg$parseSinglelineComment();
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseOlist();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_l();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c132(s1, s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c131);
          }
        }
        return s0;
      }
      function peg$parseOlistElement() {
        var s0, s1, s2, s3, s4, s5;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c126;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c127);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (input.charCodeAt(peg$currPos) === 32) {
              s2 = peg$c126;
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c127);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseDigits();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 46) {
              s3 = peg$c134;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c135);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = peg$parseSpace();
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseSpace();
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseSinglelineContent();
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c136(s2, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c133);
          }
        }
        return s0;
      }
      function peg$parseDlist() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseDlistElement();
        if (s1 === peg$FAILED) {
          s1 = peg$parseSinglelineComment();
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseDlist();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_l();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c138(s1, s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c137);
          }
        }
        return s0;
      }
      function peg$parseDlistElement() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (input.charCodeAt(peg$currPos) === 32) {
          s2 = peg$c126;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c127);
          }
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (input.charCodeAt(peg$currPos) === 32) {
            s2 = peg$c126;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c127);
            }
          }
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 58) {
            s2 = peg$c140;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c141);
            }
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 32) {
              s3 = peg$c126;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c127);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = peg$parseSpace();
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$parseSpace();
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parseSinglelineContent();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseDlistElementContents();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_l();
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c142(s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c139);
          }
        }
        return s0;
      }
      function peg$parseDlistElementContents() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseDlistElementContent();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseDlistElementContents();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_l();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c144(s1, s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c143);
          }
        }
        return s0;
      }
      function peg$parseDlistElementContent() {
        var s0, s1, s2, s3;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c146.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c147);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c146.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c147);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseSinglelineContent();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseNewline();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c148(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c145);
          }
        }
        return s0;
      }
      function peg$parseSinglelineComments() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$parseSinglelineComment();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseSinglelineComments();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c150(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c149);
          }
        }
        return s0;
      }
      function peg$parseSinglelineComment() {
        var s0, s1, s2, s3, s4, s5, s6;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c152) {
          s3 = peg$c152;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c153);
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$currPos;
          s5 = [];
          if (peg$c22.test(input.charAt(peg$currPos))) {
            s6 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s6 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c23);
            }
          }
          while (s6 !== peg$FAILED) {
            s5.push(s6);
            if (peg$c22.test(input.charAt(peg$currPos))) {
              s6 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s6 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c23);
              }
            }
          }
          if (s5 !== peg$FAILED) {
            s4 = input.substring(s4, peg$currPos);
          } else {
            s4 = s5;
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parseNewline();
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s3 = [s3, s4, s5];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_l();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c154(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c151);
          }
        }
        return s0;
      }
      function peg$parseDigits() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseDigit();
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            s2 = peg$parseDigit();
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c155);
          }
        }
        return s0;
      }
      function peg$parseDigit() {
        var s0, s1;
        peg$silentFails++;
        if (peg$c157.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c158);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c156);
          }
        }
        return s0;
      }
      function peg$parseAZ() {
        var s0, s1;
        peg$silentFails++;
        if (peg$c160.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c161);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c159);
          }
        }
        return s0;
      }
      function peg$parseNewline() {
        var s0, s1;
        peg$silentFails++;
        if (input.substr(peg$currPos, 2) === peg$c102) {
          s0 = peg$c102;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c103);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s0 = peg$c104;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c105);
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c162);
          }
        }
        return s0;
      }
      function peg$parse_l() {
        var s0, s1, s2, s3, s4;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = [];
        if (peg$c146.test(input.charAt(peg$currPos))) {
          s4 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s4 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c147);
          }
        }
        while (s4 !== peg$FAILED) {
          s3.push(s4);
          if (peg$c146.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c147);
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseNewline();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = [];
          if (peg$c146.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c147);
            }
          }
          while (s4 !== peg$FAILED) {
            s3.push(s4);
            if (peg$c146.test(input.charAt(peg$currPos))) {
              s4 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c147);
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parseNewline();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c163);
          }
        }
        return s0;
      }
      function peg$parse_() {
        var s0, s1, s2;
        peg$silentFails++;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c165.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c166);
          }
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c165.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c166);
            }
          }
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c164);
          }
        }
        return s0;
      }
      function peg$parseSpace() {
        var s0, s1;
        peg$silentFails++;
        if (peg$c168.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c169);
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c167);
          }
        }
        return s0;
      }
      function peg$parseEOF() {
        var s0, s1;
        peg$silentFails++;
        s0 = peg$currPos;
        peg$silentFails++;
        if (input.length > peg$currPos) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c11);
          }
        }
        peg$silentFails--;
        if (s1 === peg$FAILED) {
          s0 = void 0;
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c170);
          }
        }
        return s0;
      }
      var b = (init_action(), __toCommonJS(action_exports));
      b.setup({
        text: text2,
        location
      });
      peg$result = peg$startRuleFunction();
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(
          peg$maxFailExpected,
          peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
          peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
        );
      }
    }
    module2.exports = {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }
});

// lib/parser/walker.ts
function walk(ast, actor) {
  "use strict";
  if (!ast) {
    return;
  }
  let next = actor(ast);
  if (next) {
    walk(next, actor);
  }
}
function visit(ast, v) {
  "use strict";
  _visit(() => new SyncTaskPool(), ast, v);
}
function visitAsync(ast, v) {
  "use strict";
  return Promise.resolve(_visit(() => new AsyncTaskPool(), ast, v));
}
function _visit(poolGenerator, ast, v) {
  "use strict";
  let newV = {
    visitDefaultPre: v.visitDefaultPre,
    visitDefaultPost: v.visitDefaultPost || (() => {
    }),
    visitBlockElementPre: v.visitBlockElementPre || v.visitNodePre || v.visitDefaultPre,
    visitBlockElementPost: v.visitBlockElementPost || v.visitNodePost || v.visitDefaultPost || (() => {
    }),
    visitInlineElementPre: v.visitInlineElementPre || v.visitNodePre || v.visitDefaultPre,
    visitInlineElementPost: v.visitInlineElementPost || v.visitNodePost || v.visitDefaultPost || (() => {
    }),
    visitNodePre: v.visitNodePre || v.visitDefaultPre,
    visitNodePost: v.visitNodePost || v.visitDefaultPost || (() => {
    }),
    visitArgumentPre: v.visitArgumentPre || v.visitDefaultPre,
    visitArgumentPost: v.visitArgumentPost || v.visitDefaultPost || (() => {
    }),
    visitChapterPre: v.visitChapterPre || v.visitNodePre || v.visitDefaultPre,
    visitChapterPost: v.visitChapterPost || v.visitNodePost || v.visitDefaultPost || (() => {
    }),
    visitParagraphPre: v.visitParagraphPre || v.visitNodePre || v.visitDefaultPre,
    visitParagraphPost: v.visitParagraphPost || v.visitNodePost || (() => {
    }),
    visitHeadlinePre: v.visitHeadlinePre || v.visitDefaultPre,
    visitHeadlinePost: v.visitHeadlinePost || v.visitDefaultPost || (() => {
    }),
    visitUlistPre: v.visitUlistPre || v.visitNodePre || v.visitDefaultPre,
    visitUlistPost: v.visitUlistPost || v.visitNodePost || v.visitDefaultPost || (() => {
    }),
    visitOlistPre: v.visitOlistPre || v.visitDefaultPre,
    visitOlistPost: v.visitOlistPost || v.visitDefaultPost || (() => {
    }),
    visitDlistPre: v.visitDlistPre || v.visitDefaultPre,
    visitDlistPost: v.visitDlistPost || v.visitDefaultPost || (() => {
    }),
    visitColumnPre: v.visitColumnPre || v.visitNodePre || v.visitDefaultPre,
    visitColumnPost: v.visitColumnPost || v.visitNodePost || v.visitDefaultPost || (() => {
    }),
    visitColumnHeadlinePre: v.visitColumnHeadlinePre || v.visitDefaultPre,
    visitColumnHeadlinePost: v.visitColumnHeadlinePost || v.visitDefaultPost || (() => {
    }),
    visitTextPre: v.visitTextPre || v.visitDefaultPre,
    visitTextPost: v.visitTextPost || v.visitDefaultPost || (() => {
    }),
    visitSingleLineCommentPre: v.visitSingleLineCommentPre || v.visitDefaultPre,
    visitSingleLineCommentPost: v.visitSingleLineCommentPost || v.visitDefaultPost || (() => {
    })
  };
  newV.visitDefaultPre = newV.visitDefaultPre.bind(v);
  newV.visitDefaultPost = newV.visitDefaultPost.bind(v);
  newV.visitBlockElementPre = newV.visitBlockElementPre.bind(v);
  newV.visitBlockElementPost = newV.visitBlockElementPost.bind(v);
  newV.visitInlineElementPre = newV.visitInlineElementPre.bind(v);
  newV.visitInlineElementPost = newV.visitInlineElementPost.bind(v);
  newV.visitNodePre = newV.visitNodePre.bind(v);
  newV.visitNodePost = newV.visitNodePost.bind(v);
  newV.visitArgumentPre = newV.visitArgumentPre.bind(v);
  newV.visitArgumentPost = newV.visitArgumentPost.bind(v);
  newV.visitChapterPre = newV.visitChapterPre.bind(v);
  newV.visitChapterPost = newV.visitChapterPost.bind(v);
  newV.visitHeadlinePre = newV.visitHeadlinePre.bind(v);
  newV.visitHeadlinePost = newV.visitHeadlinePost.bind(v);
  newV.visitUlistPre = newV.visitUlistPre.bind(v);
  newV.visitUlistPost = newV.visitUlistPost.bind(v);
  newV.visitOlistPre = newV.visitOlistPre.bind(v);
  newV.visitOlistPost = newV.visitOlistPost.bind(v);
  newV.visitDlistPre = newV.visitDlistPre.bind(v);
  newV.visitDlistPost = newV.visitDlistPost.bind(v);
  newV.visitColumnPre = newV.visitColumnPre.bind(v);
  newV.visitColumnPost = newV.visitColumnPost.bind(v);
  newV.visitColumnHeadlinePre = newV.visitColumnHeadlinePre.bind(v);
  newV.visitColumnHeadlinePost = newV.visitColumnHeadlinePost.bind(v);
  newV.visitTextPre = newV.visitTextPre.bind(v);
  newV.visitTextPost = newV.visitTextPost.bind(v);
  newV.visitSingleLineCommentPre = newV.visitSingleLineCommentPre.bind(v);
  newV.visitSingleLineCommentPost = newV.visitSingleLineCommentPost.bind(v);
  return _visitSub(poolGenerator, null, ast, newV);
}
function _visitSub(poolGenerator, parent, ast, v) {
  "use strict";
  if (ast instanceof BlockElementSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitBlockElementPre(ast, parent);
      pool.handle(ret, {
        next: () => {
          _ast.args.forEach((next) => {
            pool.add(() => _visitSub(poolGenerator, ast, next, v));
          });
          _ast.childNodes.forEach((next) => {
            pool.add(() => _visitSub(poolGenerator, ast, next, v));
          });
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitBlockElementPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof InlineElementSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitInlineElementPre(ast, parent);
      pool.handle(ret, {
        next: () => {
          _ast.childNodes.forEach((next) => {
            pool.add(() => _visitSub(poolGenerator, ast, next, v));
          });
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitInlineElementPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof ArgumentSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitArgumentPre(_ast, parent);
      pool.handle(ret, {
        next: () => {
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitArgumentPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof ChapterSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitChapterPre(_ast, parent);
      pool.handle(ret, {
        next: () => {
          if (_ast.comments) {
            _ast.comments.forEach((next) => {
              pool.add(() => _visitSub(poolGenerator, ast, next, v));
            });
          }
          pool.add(() => _visitSub(poolGenerator, _ast, _ast.headline, v));
          if (_ast.text) {
            _ast.text.forEach((next) => {
              pool.add(() => _visitSub(poolGenerator, ast, next, v));
            });
          }
          _ast.childNodes.forEach((next) => {
            pool.add(() => _visitSub(poolGenerator, ast, next, v));
          });
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitChapterPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof HeadlineSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitHeadlinePre(ast, parent);
      pool.handle(ret, {
        next: () => {
          pool.add(() => _visitSub(poolGenerator, _ast, _ast.label, v));
          pool.add(() => _visitSub(poolGenerator, _ast, _ast.caption, v));
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitHeadlinePost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof ColumnSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitColumnPre(_ast, parent);
      pool.handle(ret, {
        next: () => {
          pool.add(() => _visitSub(poolGenerator, _ast, _ast.headline, v));
          if (_ast.text) {
            _ast.text.forEach((next) => {
              pool.add(() => _visitSub(poolGenerator, ast, next, v));
            });
          }
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitColumnPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof ColumnHeadlineSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitColumnHeadlinePre(_ast, parent);
      pool.handle(ret, {
        next: () => {
          pool.add(() => _visitSub(poolGenerator, _ast, _ast.caption, v));
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitColumnHeadlinePost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof UlistElementSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitUlistPre(ast, parent);
      pool.handle(ret, {
        next: () => {
          pool.add(() => _visitSub(poolGenerator, _ast, _ast.text, v));
          _ast.childNodes.forEach((next) => {
            pool.add(() => _visitSub(poolGenerator, ast, next, v));
          });
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitUlistPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof OlistElementSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitOlistPre(ast, parent);
      pool.handle(ret, {
        next: () => {
          pool.add(() => _visitSub(poolGenerator, _ast, _ast.text, v));
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitOlistPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof DlistElementSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitDlistPre(ast, parent);
      pool.handle(ret, {
        next: () => {
          pool.add(() => _visitSub(poolGenerator, _ast, _ast.text, v));
          pool.add(() => _visitSub(poolGenerator, _ast, _ast.content, v));
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitDlistPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof NodeSyntaxTree && (ast.ruleName === 7 /* Paragraph */ || ast.ruleName === 20 /* BlockElementParagraph */)) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitParagraphPre(_ast, parent);
      pool.handle(ret, {
        next: () => {
          _ast.childNodes.forEach((next) => {
            pool.add(() => _visitSub(poolGenerator, _ast, next, v));
          });
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitParagraphPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof NodeSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitNodePre(_ast, parent);
      pool.handle(ret, {
        next: () => {
          _ast.childNodes.forEach((next) => {
            pool.add(() => _visitSub(poolGenerator, _ast, next, v));
          });
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitNodePost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof TextNodeSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitTextPre(_ast, parent);
      pool.handle(ret, {
        next: () => {
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitTextPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast instanceof SingleLineCommentSyntaxTree) {
    let _ast = ast;
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitSingleLineCommentPre(_ast, parent);
      pool.handle(ret, {
        next: () => {
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitSingleLineCommentPost(_ast, parent));
      return pool.consume();
    })();
  } else if (ast) {
    return (() => {
      let pool = poolGenerator();
      let ret = v.visitDefaultPre(ast, parent);
      pool.handle(ret, {
        next: () => {
        },
        func: () => {
          typeof ret === "function" && ret(v);
        }
      });
      pool.add(() => v.visitDefaultPost(ast, parent));
      return pool.consume();
    })();
  } else {
    return (() => {
      let pool = poolGenerator();
      return pool.consume();
    })();
  }
}
var SyncTaskPool, AsyncTaskPool;
var init_walker = __esm({
  "lib/parser/walker.ts"() {
    "use strict";
    init_parser();
    SyncTaskPool = class {
      constructor() {
        this.tasks = [];
      }
      add(value) {
        this.tasks.push(value);
      }
      handle(value, statements) {
        if (typeof value === "undefined" || typeof value === "boolean" && value) {
          statements.next();
        } else if (typeof value === "function") {
          statements.func();
        }
      }
      consume() {
        return this.tasks.map((task) => task());
      }
    };
    AsyncTaskPool = class {
      constructor() {
        this.tasks = [];
      }
      add(value) {
        this.tasks.push(() => Promise.resolve(value()));
      }
      handle(value, statements) {
        if (typeof value === "undefined" || typeof value === "boolean" && value) {
          statements.next();
        } else if (value && typeof value.then === "function") {
          this.tasks.push(() => Promise.resolve(value));
        } else if (typeof value === "function") {
          statements.func();
        }
      }
      consume() {
        let promise = new Promise((resolve) => {
          let result = [];
          let next = () => {
            let func = this.tasks.shift();
            if (!func) {
              resolve(result);
              return;
            }
            func().then((value) => {
              result.push(value);
              next();
            });
          };
          next();
        });
        return promise;
      }
    };
  }
});

// lib/parser/parser.ts
var parser_exports = {};
__export(parser_exports, {
  ArgumentSyntaxTree: () => ArgumentSyntaxTree,
  BlockElementSyntaxTree: () => BlockElementSyntaxTree,
  ChapterSyntaxTree: () => ChapterSyntaxTree,
  ColumnHeadlineSyntaxTree: () => ColumnHeadlineSyntaxTree,
  ColumnSyntaxTree: () => ColumnSyntaxTree,
  DlistElementSyntaxTree: () => DlistElementSyntaxTree,
  HeadlineSyntaxTree: () => HeadlineSyntaxTree,
  InlineElementSyntaxTree: () => InlineElementSyntaxTree,
  NodeSyntaxTree: () => NodeSyntaxTree,
  OlistElementSyntaxTree: () => OlistElementSyntaxTree,
  ParseError: () => ParseError,
  RuleName: () => RuleName,
  SingleLineCommentSyntaxTree: () => SingleLineCommentSyntaxTree,
  SyntaxTree: () => SyntaxTree2,
  TextNodeSyntaxTree: () => TextNodeSyntaxTree,
  UlistElementSyntaxTree: () => UlistElementSyntaxTree,
  parse: () => parse2,
  transform: () => transform
});
function parse2(input) {
  "use strict";
  let rawResult = PEG.parse(input);
  let root = transform(rawResult).toNode();
  visit(root, {
    visitDefaultPre: (_ast) => {
    },
    visitParagraphPre: (ast) => {
      let subs = ast.childNodes[0].toNode();
      ast.childNodes = subs.childNodes;
    }
  });
  if (root.childNodes.length !== 0) {
    reconstruct(root.childNodes[0].toNode(), (chapter2) => chapter2.headline.level);
  }
  let ulistSet = [];
  visit(root, {
    visitDefaultPre: (ast) => {
      if (ast.ruleName === 31 /* Ulist */) {
        ulistSet.push(ast.toNode());
      }
    }
  });
  ulistSet.forEach((ulist) => {
    reconstruct(ulist, (ulistElement2) => ulistElement2.level);
  });
  visit(root, {
    visitDefaultPre: (ast, parent) => {
      ast.parentNode = parent;
    }
  });
  visit(root, {
    visitDefaultPre: (_ast, _parent) => {
    },
    visitChapterPre: (ast) => {
      ast.text.forEach((node, i, nodes) => {
        node.prev = nodes[i - 1];
        node.next = nodes[i + 1];
      });
    },
    visitColumnPre: (ast) => {
      ast.text.forEach((node, i, nodes) => {
        node.prev = nodes[i - 1];
        node.next = nodes[i + 1];
      });
    },
    visitNodePre: (ast) => {
      ast.childNodes.forEach((node, i, nodes) => {
        node.prev = nodes[i - 1];
        node.next = nodes[i + 1];
      });
    }
  });
  return {
    ast: root,
    cst: rawResult
  };
}
function transform(rawResult) {
  "use strict";
  if (!rawResult) {
    return null;
  }
  let rule = RuleName[rawResult.syntax];
  if (typeof rule === "undefined") {
    throw new ParseError(rawResult, "unknown rule: " + rawResult.syntax);
  }
  switch (rule) {
    case 3 /* Chapter */:
      return new ChapterSyntaxTree(rawResult);
    case 11 /* BlockElement */:
      return new BlockElementSyntaxTree(rawResult);
    case 4 /* Headline */:
      return new HeadlineSyntaxTree(rawResult);
    case 12 /* InlineElement */:
      return new InlineElementSyntaxTree(rawResult);
    case 39 /* Column */:
      return new ColumnSyntaxTree(rawResult);
    case 40 /* ColumnHeadline */:
      return new ColumnHeadlineSyntaxTree(rawResult);
    case 17 /* BraceArg */:
      return new ArgumentSyntaxTree(rawResult);
    case 32 /* UlistElement */:
      return new UlistElementSyntaxTree(rawResult);
    case 34 /* OlistElement */:
      return new OlistElementSyntaxTree(rawResult);
    case 36 /* DlistElement */:
      return new DlistElementSyntaxTree(rawResult);
    case 10 /* ContentText */:
    case 16 /* BracketArgText */:
    case 23 /* BlockElementContentText */:
    case 26 /* InlineElementContentText */:
    case 30 /* ContentInlineText */:
      return new TextNodeSyntaxTree(rawResult);
    case 45 /* SinglelineComment */:
      return new SingleLineCommentSyntaxTree(rawResult);
    // c, cc パターン
    case 2 /* Chapters */:
    case 5 /* Contents */:
    case 8 /* ParagraphSubs */:
    case 14 /* BracketArgSubs */:
    case 18 /* BlockElementContents */:
    case 21 /* BlockElementParagraphSubs */:
    case 24 /* InlineElementContents */:
    case 41 /* ColumnContents */:
    case 28 /* ContentInlines */:
    case 31 /* Ulist */:
    case 33 /* Olist */:
    case 35 /* Dlist */:
    case 37 /* DlistElementContents */:
    case 44 /* SinglelineComments */:
      return new NodeSyntaxTree(rawResult);
    // c パターン
    case 1 /* Start */:
    case 7 /* Paragraph */:
    case 13 /* BracketArg */:
    case 20 /* BlockElementParagraph */:
    case 22 /* BlockElementParagraphSub */:
    case 38 /* DlistElementContent */:
      return new NodeSyntaxTree(rawResult);
    // パースした内容は直接役にたたない c / c / c 系
    case 6 /* Content */:
    case 9 /* ParagraphSub */:
    case 15 /* BracketArgSub */:
    case 19 /* BlockElementContent */:
    case 25 /* InlineElementContent */:
    case 42 /* ColumnContent */:
    case 27 /* SinglelineContent */:
    case 29 /* ContentInline */:
      return transform(rawResult.content);
    default:
      return new SyntaxTree2(rawResult);
  }
}
function reconstruct(node, pickLevel) {
  "use strict";
  let originalChildNodes = node.childNodes;
  let nodeSets = [];
  let currentSet = {
    parent: null,
    children: []
  };
  originalChildNodes.forEach((child) => {
    if (child.ruleName === 45 /* SinglelineComment */) {
      currentSet.children.push(child);
    } else if (!currentSet.parent) {
      currentSet.parent = child;
    } else if (pickLevel(currentSet.parent) < pickLevel(child)) {
      currentSet.children.push(child);
    } else {
      nodeSets.push(currentSet);
      currentSet = {
        parent: child,
        children: []
      };
    }
  });
  if (currentSet.parent) {
    nodeSets.push(currentSet);
  }
  node.childNodes = [];
  nodeSets.forEach((nodes) => {
    const parent = nodes.parent;
    if (parent) {
      node.childNodes.push(parent);
      nodes.children.forEach((child) => {
        parent.childNodes.push(child);
      });
      reconstruct(parent, pickLevel);
    }
  });
}
var PEG, ParseError, RuleName, SyntaxTree2, NodeSyntaxTree, ChapterSyntaxTree, HeadlineSyntaxTree, BlockElementSyntaxTree, InlineElementSyntaxTree, ColumnSyntaxTree, ColumnHeadlineSyntaxTree, ArgumentSyntaxTree, UlistElementSyntaxTree, OlistElementSyntaxTree, DlistElementSyntaxTree, TextNodeSyntaxTree, SingleLineCommentSyntaxTree;
var init_parser = __esm({
  "lib/parser/parser.ts"() {
    "use strict";
    PEG = __toESM(require_grammar());
    init_walker();
    ParseError = class _ParseError {
      constructor(syntax, message) {
        this.syntax = syntax;
        this.message = message;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, _ParseError);
        }
        this.name = "ParseError";
      }
    };
    RuleName = /* @__PURE__ */ ((RuleName2) => {
      RuleName2[RuleName2["SyntaxError"] = 0] = "SyntaxError";
      RuleName2[RuleName2["Start"] = 1] = "Start";
      RuleName2[RuleName2["Chapters"] = 2] = "Chapters";
      RuleName2[RuleName2["Chapter"] = 3] = "Chapter";
      RuleName2[RuleName2["Headline"] = 4] = "Headline";
      RuleName2[RuleName2["Contents"] = 5] = "Contents";
      RuleName2[RuleName2["Content"] = 6] = "Content";
      RuleName2[RuleName2["Paragraph"] = 7] = "Paragraph";
      RuleName2[RuleName2["ParagraphSubs"] = 8] = "ParagraphSubs";
      RuleName2[RuleName2["ParagraphSub"] = 9] = "ParagraphSub";
      RuleName2[RuleName2["ContentText"] = 10] = "ContentText";
      RuleName2[RuleName2["BlockElement"] = 11] = "BlockElement";
      RuleName2[RuleName2["InlineElement"] = 12] = "InlineElement";
      RuleName2[RuleName2["BracketArg"] = 13] = "BracketArg";
      RuleName2[RuleName2["BracketArgSubs"] = 14] = "BracketArgSubs";
      RuleName2[RuleName2["BracketArgSub"] = 15] = "BracketArgSub";
      RuleName2[RuleName2["BracketArgText"] = 16] = "BracketArgText";
      RuleName2[RuleName2["BraceArg"] = 17] = "BraceArg";
      RuleName2[RuleName2["BlockElementContents"] = 18] = "BlockElementContents";
      RuleName2[RuleName2["BlockElementContent"] = 19] = "BlockElementContent";
      RuleName2[RuleName2["BlockElementParagraph"] = 20] = "BlockElementParagraph";
      RuleName2[RuleName2["BlockElementParagraphSubs"] = 21] = "BlockElementParagraphSubs";
      RuleName2[RuleName2["BlockElementParagraphSub"] = 22] = "BlockElementParagraphSub";
      RuleName2[RuleName2["BlockElementContentText"] = 23] = "BlockElementContentText";
      RuleName2[RuleName2["InlineElementContents"] = 24] = "InlineElementContents";
      RuleName2[RuleName2["InlineElementContent"] = 25] = "InlineElementContent";
      RuleName2[RuleName2["InlineElementContentText"] = 26] = "InlineElementContentText";
      RuleName2[RuleName2["SinglelineContent"] = 27] = "SinglelineContent";
      RuleName2[RuleName2["ContentInlines"] = 28] = "ContentInlines";
      RuleName2[RuleName2["ContentInline"] = 29] = "ContentInline";
      RuleName2[RuleName2["ContentInlineText"] = 30] = "ContentInlineText";
      RuleName2[RuleName2["Ulist"] = 31] = "Ulist";
      RuleName2[RuleName2["UlistElement"] = 32] = "UlistElement";
      RuleName2[RuleName2["Olist"] = 33] = "Olist";
      RuleName2[RuleName2["OlistElement"] = 34] = "OlistElement";
      RuleName2[RuleName2["Dlist"] = 35] = "Dlist";
      RuleName2[RuleName2["DlistElement"] = 36] = "DlistElement";
      RuleName2[RuleName2["DlistElementContents"] = 37] = "DlistElementContents";
      RuleName2[RuleName2["DlistElementContent"] = 38] = "DlistElementContent";
      RuleName2[RuleName2["Column"] = 39] = "Column";
      RuleName2[RuleName2["ColumnHeadline"] = 40] = "ColumnHeadline";
      RuleName2[RuleName2["ColumnContents"] = 41] = "ColumnContents";
      RuleName2[RuleName2["ColumnContent"] = 42] = "ColumnContent";
      RuleName2[RuleName2["ColumnTerminator"] = 43] = "ColumnTerminator";
      RuleName2[RuleName2["SinglelineComments"] = 44] = "SinglelineComments";
      RuleName2[RuleName2["SinglelineComment"] = 45] = "SinglelineComment";
      return RuleName2;
    })(RuleName || {});
    SyntaxTree2 = class {
      constructor(data) {
        this.ruleName = RuleName[data.syntax];
        if (typeof this.ruleName === "undefined") {
          throw new ParseError(data, "unknown rule: " + data.syntax);
        }
        let end = data.location.end || data.location.start;
        this.location = {
          start: {
            line: data.location.start.line,
            column: data.location.start.column,
            offset: data.location.start.offset
          },
          end: {
            line: end.line,
            column: end.column,
            offset: end.offset
          }
        };
      }
      toJSON() {
        let result = {};
        let lowPriorities = [];
        for (let k in this) {
          if (k === "ruleName") {
            result[k] = RuleName[this.ruleName];
          } else if (k === "prev" || k === "next" || k === "parentNode") {
          } else if (k === "childNodes") {
            lowPriorities.push(/* @__PURE__ */ ((k2) => {
              return () => {
                result[k2] = this[k2];
              };
            })(k));
          } else if (k === "fqn") {
          } else if (typeof this[k] !== "function") {
            result[k] = this[k];
          }
        }
        lowPriorities.forEach((fn) => fn());
        return result;
      }
      toString(indentLevel = 0) {
        let result = this.makeIndent(indentLevel) + "SyntaxTree:[\n";
        result += this.makeIndent(indentLevel + 1) + "offset = " + this.location.start.offset + ",\n";
        result += this.makeIndent(indentLevel + 1) + "line=" + this.location.start.line + ",\n";
        result += this.makeIndent(indentLevel + 1) + "column=" + this.location.start.column + ",\n";
        result += this.makeIndent(indentLevel + 1) + "name=" + RuleName[this.ruleName] + ",\n";
        this.toStringHook(indentLevel, result);
        result += this.makeIndent(indentLevel) + "]";
        return result;
      }
      makeIndent(indentLevel) {
        let indent = "";
        for (let i = 0; i < indentLevel; i++) {
          indent += "  ";
        }
        return indent;
      }
      toStringHook(_indentLevel, _result) {
      }
      /**
       * 引数が数字かどうかチェックして違うならば例外を投げる。
       * @param value
       * @returns {*=}
       */
      checkNumber(value) {
        if (typeof value !== "number") {
          throw new Error("number required. actual:" + typeof value + ":" + value);
        } else {
          return value;
        }
      }
      /**
       * 引数が文字列かどうかチェックして違うならば例外を投げる。
       * @param value
       * @returns {*=}
       */
      checkString(value) {
        if (typeof value !== "string") {
          throw new Error("string required. actual:" + typeof value + ":" + value);
        } else {
          return value;
        }
      }
      /**
       * 引数がオブジェクトかどうかチェックして違うならば例外を投げる。
       * @param value
       * @returns {*=}
       */
      checkObject(value) {
        if (typeof value !== "object") {
          throw new Error("object required. actual:" + typeof value + ":" + value);
        } else {
          return value;
        }
      }
      /**
       * 引数がArrayかどうかチェックして違うならば例外を投げる。
       * @param value
       * @returns {*=}
       */
      checkArray(value) {
        if (!Array.isArray(value)) {
          console.log(JSON.stringify(value, null, 2));
          throw new Error("array required. actual:" + typeof value + ":" + value);
        } else {
          return value;
        }
      }
      checkSyntaxType(clazz) {
        return this instanceof clazz;
      }
      isNode() {
        return this.checkSyntaxType(NodeSyntaxTree);
      }
      isBlockElement() {
        return this.checkSyntaxType(BlockElementSyntaxTree);
      }
      isInlineElement() {
        return this.checkSyntaxType(InlineElementSyntaxTree);
      }
      isArgument() {
        return this.checkSyntaxType(ArgumentSyntaxTree);
      }
      isChapter() {
        return this.checkSyntaxType(ChapterSyntaxTree);
      }
      isHeadline() {
        return this.checkSyntaxType(HeadlineSyntaxTree);
      }
      isUlist() {
        return this.checkSyntaxType(UlistElementSyntaxTree);
      }
      isOlist() {
        return this.checkSyntaxType(OlistElementSyntaxTree);
      }
      isDlist() {
        return this.checkSyntaxType(DlistElementSyntaxTree);
      }
      isTextNode() {
        return this.checkSyntaxType(TextNodeSyntaxTree);
      }
      isSingleLineComment() {
        return this.checkSyntaxType(SingleLineCommentSyntaxTree);
      }
      toOtherNode(clazz) {
        if (this instanceof clazz) {
          return this;
        } else {
          throw new Error("this node is not " + clazz.name + ", actual " + this.constructor.name);
        }
      }
      /**
       * thisをNodeSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toNode() {
        return this.toOtherNode(NodeSyntaxTree);
      }
      /**
       * thisをBlockElementSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toBlockElement() {
        return this.toOtherNode(BlockElementSyntaxTree);
      }
      /**
       * thisをInlineElementSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toInlineElement() {
        return this.toOtherNode(InlineElementSyntaxTree);
      }
      /**
       * thisをArgumentSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toArgument() {
        return this.toOtherNode(ArgumentSyntaxTree);
      }
      /**
       * thisをChapterSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toChapter() {
        return this.toOtherNode(ChapterSyntaxTree);
      }
      /**
       * thisをColumnSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toColumn() {
        return this.toOtherNode(ColumnSyntaxTree);
      }
      /**
       * thisをHeadlineSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toHeadline() {
        return this.toOtherNode(HeadlineSyntaxTree);
      }
      /**
       * thisをColumnHeadlineSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toColumnHeadline() {
        return this.toOtherNode(ColumnHeadlineSyntaxTree);
      }
      /**
       * thisをUlistElementSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toUlist() {
        return this.toOtherNode(UlistElementSyntaxTree);
      }
      /**
       * thisをOlistElementSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toOlist() {
        return this.toOtherNode(OlistElementSyntaxTree);
      }
      /**
       * thisをDlistElementSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toDlist() {
        return this.toOtherNode(DlistElementSyntaxTree);
      }
      /**
       * thisをTextNodeSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toTextNode() {
        return this.toOtherNode(TextNodeSyntaxTree);
      }
      /**
       * thisをSingleLineCommentSyntaxTreeにcast可能か調べ、可能ならcastして返し、そうでなければ例外を投げる。
       */
      toSingleLineCommentNode() {
        return this.toOtherNode(SingleLineCommentSyntaxTree);
      }
    };
    NodeSyntaxTree = class extends SyntaxTree2 {
      constructor(data) {
        super(data);
        this.childNodes = [];
        this.processChildNodes(data.content);
      }
      processChildNodes(content2) {
        if (Array.isArray(content2)) {
          content2.forEach((rawResult) => {
            let tree = transform(rawResult);
            if (tree) {
              this.childNodes.push(tree);
            }
          });
        } else if (content2 !== "" && content2) {
          ((rawResult) => {
            let tree = transform(rawResult);
            if (tree) {
              this.childNodes.push(tree);
            }
          })(content2);
        }
      }
      // @ts-ignore: error TS6133: 'result' is declared but its value is never read.
      toStringHook(indentLevel, result) {
        if (this.childNodes.length !== 0) {
          result += this.makeIndent(indentLevel + 1) + "childNodes[" + this.childNodes.length + "]=[\n";
          this.childNodes.forEach((node) => {
            result += node.toString(indentLevel + 2);
            result += "\n";
          });
          result += this.makeIndent(indentLevel + 1) + "]\n";
        }
      }
    };
    ChapterSyntaxTree = class _ChapterSyntaxTree extends NodeSyntaxTree {
      constructor(data) {
        super(data);
        if (data.comments && data.comments.content) {
          this.comments = this.checkArray(data.comments.content).map((data2) => {
            return transform(data2).toSingleLineCommentNode();
          });
        } else {
          this.comments = [];
        }
        this.headline = transform(this.checkObject(data.headline)).toHeadline();
        if (typeof data.text === "string" || data.text === null) {
          this.text = [];
          return;
        }
        this.text = this.checkArray(data.text.content).map((data2) => {
          return transform(data2);
        });
        delete this.childNodes;
        this.childNodes = [];
      }
      get level() {
        return this.headline.level;
      }
      get fqn() {
        let chapters = [];
        walk(this, (node) => {
          if (node instanceof _ChapterSyntaxTree) {
            chapters.unshift(node);
          }
          return node.parentNode;
        });
        let result = chapters.map((chapter2) => {
          return chapter2.no;
        }).join(".");
        return result;
      }
    };
    HeadlineSyntaxTree = class extends SyntaxTree2 {
      constructor(data) {
        super(data);
        this.level = this.checkNumber(data.level);
        if (data.label) {
          this.label = transform(this.checkObject(data.label)).toArgument();
        }
        this.caption = transform(this.checkObject(data.caption)).toNode();
      }
    };
    BlockElementSyntaxTree = class extends NodeSyntaxTree {
      constructor(data) {
        super(data);
        this.symbol = this.checkString(data.symbol);
        this.args = this.checkArray(data.args).map((data2) => {
          return transform(data2).toNode();
        });
      }
    };
    InlineElementSyntaxTree = class extends NodeSyntaxTree {
      constructor(data) {
        super(data);
        this.symbol = this.checkString(data.symbol);
      }
    };
    ColumnSyntaxTree = class extends NodeSyntaxTree {
      constructor(data) {
        super(data);
        this.headline = transform(this.checkObject(data.headline)).toColumnHeadline();
        if (typeof data.text === "string" || data.text === null) {
          this.text = [];
          return;
        }
        this.text = this.checkArray(data.text.content).map((data2) => {
          return transform(data2);
        });
        delete this.childNodes;
        this.childNodes = [];
      }
      get level() {
        return this.headline.level;
      }
      get fqn() {
        let chapters = [];
        walk(this, (node) => {
          if (node instanceof ChapterSyntaxTree) {
            chapters.unshift(node);
          }
          return node.parentNode;
        });
        let result = chapters.map((chapter2) => {
          return chapter2.no;
        }).join(".");
        return result;
      }
    };
    ColumnHeadlineSyntaxTree = class extends SyntaxTree2 {
      constructor(data) {
        super(data);
        this.level = this.checkNumber(data.level);
        if (data.label) {
          this.label = transform(this.checkObject(data.label)).toArgument();
        }
        this.caption = transform(this.checkObject(data.caption)).toNode();
      }
    };
    ArgumentSyntaxTree = class extends SyntaxTree2 {
      constructor(data) {
        super(data);
        this.arg = this.checkString(data.arg);
      }
    };
    UlistElementSyntaxTree = class extends NodeSyntaxTree {
      constructor(data) {
        super(data);
        this.level = this.checkNumber(data.level);
        this.text = transform(this.checkObject(data.text));
        delete this.childNodes;
        this.childNodes = [];
      }
    };
    OlistElementSyntaxTree = class extends SyntaxTree2 {
      constructor(data) {
        super(data);
        this.no = this.checkNumber(data.no);
        this.text = transform(this.checkObject(data.text));
      }
    };
    DlistElementSyntaxTree = class extends SyntaxTree2 {
      constructor(data) {
        super(data);
        this.text = transform(this.checkObject(data.text));
        this.content = transform(this.checkObject(data.content));
      }
    };
    TextNodeSyntaxTree = class extends SyntaxTree2 {
      constructor(data) {
        super(data);
        this.text = this.checkString(data.text).replace(/\n+$/, "");
      }
    };
    SingleLineCommentSyntaxTree = class extends SyntaxTree2 {
      constructor(data) {
        super(data);
        this.text = this.checkString(data.text).replace(/^#@/, "").replace(/\n+$/, "");
      }
    };
  }
});

// lib/js/exception.ts
function replace(src) {
  "use strict";
  return (_) => src;
}
var DummyError, AnalyzerError;
var init_exception = __esm({
  "lib/js/exception.ts"() {
    DummyError = class {
      constructor(message) {
        this.message = message;
      }
    };
    DummyError = __decorateClass([
      replace(Error)
    ], DummyError);
    AnalyzerError = class _AnalyzerError extends DummyError {
      constructor(message) {
        super(message);
        this.name = "AnalyzerError";
        this.message = message;
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, _AnalyzerError);
        }
      }
    };
  }
});

// lib/builder/builder.ts
var builder_exports = {};
__export(builder_exports, {
  DefaultBuilder: () => DefaultBuilder
});
var DefaultBuilder;
var init_builder = __esm({
  "lib/builder/builder.ts"() {
    "use strict";
    init_i18n();
    init_exception();
    init_parser();
    init_walker();
    init_utils2();
    DefaultBuilder = class {
      constructor() {
        this.extention = "bug";
      }
      get name() {
        return this.constructor.name;
      }
      init(book) {
        this.book = book;
        return Promise.all(book.allChunks.map((chunk) => this.processAst(chunk))).then(() => null);
      }
      getDefaultVisitorArg(process2) {
        return {
          visitDefaultPre: (_node) => {
          },
          visitChapterPre: (node) => {
            return this.chapterPre(process2, node);
          },
          visitChapterPost: (node) => {
            return this.chapterPost(process2, node);
          },
          visitHeadlinePre: (node) => {
            return this.headlinePre(process2, "hd", node);
          },
          visitHeadlinePost: (node) => {
            return this.headlinePost(process2, "hd", node);
          },
          visitColumnPre: (node) => {
            return this.columnPre(process2, node);
          },
          visitColumnPost: (node) => {
            return this.columnPost(process2, node);
          },
          visitColumnHeadlinePre: (node) => {
            return this.columnHeadlinePre(process2, node);
          },
          visitColumnHeadlinePost: (node) => {
            return this.columnHeadlinePost(process2, node);
          },
          visitParagraphPre: (node) => {
            return this.paragraphPre(process2, "p", node);
          },
          visitParagraphPost: (node) => {
            return this.paragraphPost(process2, "p", node);
          },
          visitUlistPre: (node) => {
            return this.ulistPre(process2, "ul", node);
          },
          visitUlistPost: (node) => {
            return this.ulistPost(process2, "ul", node);
          },
          visitOlistPre: (node) => {
            return this.olistPre(process2, "ol", node);
          },
          visitOlistPost: (node) => {
            return this.olistPost(process2, "ol", node);
          },
          visitDlistPre: (node) => {
            return this.dlistPre(process2, "dl", node);
          },
          visitDlistPost: (node) => {
            return this.dlistPost(process2, "dl", node);
          },
          visitBlockElementPre: (node) => {
            return this.blockPre(process2, node.symbol, node);
          },
          visitBlockElementPost: (node) => {
            return this.blockPost(process2, node.symbol, node);
          },
          visitInlineElementPre: (node) => {
            return this.inlinePre(process2, node.symbol, node);
          },
          visitInlineElementPost: (node) => {
            return this.inlinePost(process2, node.symbol, node);
          },
          visitTextPre: (node) => {
            this.text(process2, node);
          },
          visitSingleLineCommentPre: (node) => {
            this.singleLineComment(process2, node);
          }
        };
      }
      processAst(chunk) {
        let process2 = chunk.createBuilderProcess(this);
        return visitAsync(chunk.tree.ast, this.getDefaultVisitorArg(process2)).then(() => {
          this.processPost(process2, chunk);
          return Promise.all(chunk.nodes.map((chunk2) => this.processAst(chunk2))).then(() => null);
        });
      }
      escape(_data) {
        throw new Error("please override this method");
      }
      getChapterTitle(process2, chapter2) {
        let chapterNode = null;
        visit(chapter2.tree.ast, {
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
        return nodeContentToString(process2, chapterNode.headline);
      }
      processPost(_process, _chunk) {
      }
      chapterPre(_process, _node) {
      }
      chapterPost(_process, _node) {
      }
      headlinePre(_process, _name, _node) {
      }
      headlinePost(_process, _name, _node) {
      }
      columnPre(_process, _node) {
      }
      columnPost(_process, _node) {
      }
      columnHeadlinePre(_process, _node) {
      }
      columnHeadlinePost(_process, _node) {
      }
      paragraphPre(_process, _name, _node) {
      }
      paragraphPost(_process, _name, _node) {
      }
      ulistPre(_process, _name, _node) {
      }
      ulistPost(_process, _name, _node) {
      }
      olistPre(_process, _name, _node) {
      }
      olistPost(_process, _name, _node) {
      }
      dlistPre(_process, _name, _node) {
      }
      dlistPost(_process, _name, _node) {
      }
      text(process2, node) {
        process2.out(node.text);
      }
      blockPre(process2, name, node) {
        let func;
        func = this[`block_${name}`];
        if (typeof func === "function") {
          return func.call(this, process2, node);
        }
        func = this[`block_${name}_pre`];
        if (typeof func !== "function") {
          throw new AnalyzerError(`block_${name}_pre or block_${name} is not Function`);
        }
        return func.call(this, process2, node);
      }
      blockPost(process2, name, node) {
        let func;
        func = this[`block_${name}`];
        if (typeof func === "function") {
          return;
        }
        func = this[`block_${name}_post`];
        if (typeof func !== "function") {
          throw new AnalyzerError(`block_${name}_post is not Function`);
        }
        return func.call(this, process2, node);
      }
      inlinePre(process2, name, node) {
        let func;
        func = this[`inline_${name}`];
        if (typeof func === "function") {
          return func.call(this, process2, node);
        }
        func = this[`inline_${name}_pre`];
        if (typeof func !== "function") {
          throw new AnalyzerError(`inline_${name}_pre or inline_${name} is not Function`);
        }
        return func.call(this, process2, node);
      }
      inlinePost(process2, name, node) {
        let func;
        func = this[`inline_${name}`];
        if (typeof func === "function") {
          return;
        }
        func = this[`inline_${name}_post`];
        if (typeof func !== "function") {
          throw new AnalyzerError(`inline_${name}_post is not Function`);
        }
        return func.call(this, process2, node);
      }
      ulistParentHelper(process2, node, action, currentLevel = node.level) {
        if (currentLevel !== 1) {
          let result = findUp(node.parentNode, (n) => {
            if (n instanceof UlistElementSyntaxTree) {
              return n.level === currentLevel - 1;
            }
            return false;
          });
          if (result) {
            return;
          }
          action();
          this.ulistParentHelper(process2, node, action, currentLevel - 1);
        }
      }
      findReference(process2, node) {
        let founds = process2.symbols.filter((symbol) => symbol.node === node);
        if (founds.length !== 1) {
          throw new AnalyzerError("invalid status.");
        }
        return founds[0];
      }
      inline_hd_pre(process2, node) {
        process2.out("\u300C");
        const chapter2 = this.findReference(process2, node).referenceTo?.referenceNode?.parentNode.toChapter();
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        if (chapter2.level === 1) {
          process2.out(chapter2.fqn).out("\u7AE0 ");
        } else {
          process2.out(chapter2.fqn).out(" ");
        }
        visit(chapter2.headline.caption, this.getDefaultVisitorArg(process2));
        return false;
      }
      inline_hd_post(process2, _node) {
        process2.out("\u300D");
      }
      block_raw(process2, node) {
        let content2 = nodeContentToString(process2, node.args[0]);
        let matches = content2.match(/\|(.+)\|/);
        if (matches && matches[1]) {
          let target = matches[1].split(",").some((name) => this.name.toLowerCase() === `${name}builder`);
          if (target) {
            process2.outRaw(content2.substring(matches[0].length));
          }
        } else {
          process2.outRaw(content2);
        }
        return false;
      }
      inline_raw(process2, node) {
        let content2 = nodeContentToString(process2, node);
        let matches = content2.match(/\|(.+)\|/);
        if (matches && matches[1]) {
          let target = matches[1].split(",").some((name) => this.name.toLowerCase() === `${name}builder`);
          if (target) {
            process2.outRaw(content2.substring(matches[0].length));
          }
        } else {
          process2.outRaw(content2);
        }
        return false;
      }
      singleLineComment(_process, _node) {
      }
      parseTable(tableContents) {
        return this.parseTableContents(this.parseTableLines(tableContents));
      }
      parseTableLines(tableContents) {
        const result = [];
        let currentLine = [];
        let lastLineNumber = tableContents.length > 0 ? tableContents[0].location.start.line : 0;
        tableContents.forEach((node) => {
          if (node.location.start.line !== lastLineNumber) {
            result.push(currentLine);
            currentLine = [];
          }
          lastLineNumber = node.location.start.line;
          if (node.isInlineElement()) {
            currentLine.push(node.toInlineElement());
            return;
          }
          const positionOffset = node.location.start.offset;
          const lineNumberOffset = node.location.start.line;
          const columnOffset = node.location.start.column;
          const text2 = node.toTextNode().text;
          let currentOffset = 0;
          let lineNumber = 0;
          do {
            const lineEnd = text2.indexOf("\n", currentOffset);
            const startLocation = {
              offset: currentOffset + positionOffset,
              line: lineNumber + lineNumberOffset,
              column: currentOffset + columnOffset
            };
            const nextOffset = lineEnd + 1;
            const content2 = lineEnd < 0 ? (
              // 最終行
              text2.substring(currentOffset)
            ) : (
              // そうでない
              text2.substring(currentOffset, nextOffset)
            );
            currentLine.push(
              {
                text: content2,
                location: {
                  start: startLocation,
                  end: {
                    offset: startLocation.offset + content2.length - 1,
                    line: startLocation.line,
                    column: startLocation.column + content2.length - 1
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
          } while (currentOffset < text2.length);
        });
        if (currentLine.length > 0) {
          result.push(currentLine);
        }
        return result;
      }
      parseTableContents(lines) {
        const rows = [];
        let currentRow = [];
        let currentCell = [];
        let headerRowCount = 0;
        lines.forEach((line, rowNumber) => {
          line.forEach((node, columnNumber) => {
            if (node instanceof InlineElementSyntaxTree) {
              currentCell.push(node);
              return;
            }
            const textCells = line.length === 1 ? node.text.trim() : columnNumber === 0 ? node.text.trimStart() : columnNumber === line.length - 1 ? node.text.trimEnd() : node.text;
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
                return;
              }
              let text2;
              if (cell === ".") {
                text2 = "";
              } else {
                text2 = cell.startsWith("..") ? cell.substr(1) : cell;
              }
              currentCell.push(
                new TextNodeSyntaxTree({
                  syntax: "InlineElementContentText",
                  // ここはとりあえず仮の値を入れておく。使わないし。
                  location: node.location,
                  text: text2
                })
              );
              if (tokenNumber !== lastTokenNumber && currentCell.length > 0) {
                currentRow.push({ nodes: currentCell });
                currentCell = [];
              }
            });
          });
          if (currentCell.length > 0) {
            currentRow.push({ nodes: currentCell });
            currentCell = [];
          }
          if (currentRow.length > 0) {
            rows.push(currentRow);
            currentRow = [];
          }
        });
        if (currentCell.length > 0) {
          currentRow.push({ nodes: currentCell });
        }
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        let maxColumns = 0;
        for (const columns of rows.map((cells) => cells.length)) {
          if (columns > maxColumns) {
            maxColumns = columns;
          }
        }
        rows.forEach((row) => {
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
                      offset: location.start.offset
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
        return { cells: rows, headerRowCount };
      }
    };
  }
});

// lib/builder/textBuilder.ts
var textBuilder_exports = {};
__export(textBuilder_exports, {
  TextBuilder: () => TextBuilder
});
var TextBuilder;
var init_textBuilder = __esm({
  "lib/builder/textBuilder.ts"() {
    "use strict";
    init_builder();
    init_i18n();
    init_parser();
    init_walker();
    init_utils2();
    TextBuilder = class extends DefaultBuilder {
      constructor() {
        super(...arguments);
        this.extention = "txt";
      }
      escape(data) {
        return data;
      }
      headlinePre(process2, _name, node) {
        process2.out("\u25A0H").out(node.level).out("\u25A0");
        if (node.level === 1) {
          let text2 = t("builder.chapter", node.parentNode.no);
          process2.out(text2).out("\u3000");
        } else if (node.level < 4) {
          process2.out(getHeadlineLevels(node).join(".")).out("\u3000");
        }
      }
      headlinePost(process2, _name, _node) {
        process2.out("\n\n");
      }
      columnHeadlinePre(process2, node) {
        process2.out("\n\u25C6\u2192\u958B\u59CB:\u30B3\u30E9\u30E0\u2190\u25C6\n");
        process2.out("\u25A0");
        return (v) => {
          visit(node.caption, v);
        };
      }
      columnHeadlinePost(process2, _node) {
        process2.out("\n");
      }
      columnPost(process2, _node) {
        process2.out("\u25C6\u2192\u7D42\u4E86:\u30B3\u30E9\u30E0\u2190\u25C6\n\n");
      }
      paragraphPost(process2, _name, _node) {
        process2.out("\n");
      }
      ulistPre(process2, _name, node) {
        this.ulistParentHelper(process2, node, () => {
          process2.out("\n\n\u25CF	");
        });
        if (node.parentNode instanceof UlistElementSyntaxTree && node.prev instanceof UlistElementSyntaxTree === false) {
          process2.out("\n\n");
        } else if (node.parentNode instanceof UlistElementSyntaxTree) {
          process2.out("");
        }
        process2.out("\u25CF	");
      }
      ulistPost(process2, _name, _node) {
        process2.out("\n");
      }
      olistPre(process2, _name, node) {
        process2.out(node.no).out("	");
      }
      olistPost(process2, _name, _node) {
        process2.out("\n");
      }
      dlistPre(process2, _name, node) {
        return (v) => {
          process2.out("\u2605");
          visit(node.text, v);
          process2.out("\u2606\n");
          process2.out("	");
          visit(node.content, v);
          process2.out("\n");
        };
      }
      dlistPost(process2, _name, _node) {
        process2.out("\n");
      }
      block_list_pre(process2, node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u30EA\u30B9\u30C8\u2190\u25C6\n");
        let chapter2 = findChapter(node, 1);
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        let text2 = t("builder.list", chapter2.fqn, node.no);
        process2.out(text2).out("\u3000");
        return (v) => {
          visit(node.args[1], v);
          process2.outRaw("\n\n");
          const nodeCount = node.childNodes.length;
          let nodeIndex = 0;
          node.childNodes.forEach((node2) => {
            visit(node2, v);
            nodeIndex++;
            if (nodeIndex < nodeCount) {
              process2.out("\n");
            }
          });
        };
      }
      block_list_post(process2, _node) {
        process2.out("\n\u25C6\u2192\u7D42\u4E86:\u30EA\u30B9\u30C8\u2190\u25C6\n");
      }
      block_listnum_pre(process2, node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u30EA\u30B9\u30C8\u2190\u25C6\n");
        let chapter2 = findChapter(node, 1);
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        let text2 = t("builder.list", chapter2.fqn, node.no);
        process2.out(text2).out("\u3000");
        let lineCount = 1;
        return (v) => {
          visit(node.args[1], v);
          let lineCountMax = 0;
          node.childNodes.forEach((node2, _index, _childNodes) => {
            if (node2.isTextNode()) {
              lineCountMax += node2.toTextNode().text.split("\n").length;
            }
          });
          let lineDigit = Math.max(linesToFigure(lineCountMax), 2);
          process2.outRaw("\n\n");
          node.childNodes.forEach((node2, index, childNodes) => {
            if (node2.isTextNode()) {
              let hasNext = !!childNodes[index + 1];
              let textNode = node2.toTextNode();
              let lines = textNode.text.split("\n");
              lines.forEach((line, index2) => {
                process2.out(padLeft(String(lineCount), " ", lineDigit)).out(": ");
                process2.out(line);
                if (!hasNext || lines.length - 1 !== index2) {
                  lineCount++;
                }
                process2.out("\n");
              });
            } else {
              visit(node2, v);
            }
            lineCount++;
          });
        };
      }
      block_listnum_post(process2, _node) {
        process2.out("\u25C6\u2192\u7D42\u4E86:\u30EA\u30B9\u30C8\u2190\u25C6\n");
      }
      inline_list(process2, node) {
        let chapter2 = findChapter(node, 1);
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        let listNode = this.findReference(process2, node).referenceTo.referenceNode.toBlockElement();
        let text2 = t("builder.list", chapter2.fqn, listNode.no);
        process2.out(text2);
        return false;
      }
      block_emlist_pre(process2, node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u30A4\u30F3\u30E9\u30A4\u30F3\u30EA\u30B9\u30C8\u2190\u25C6\n");
        return (v) => {
          if (node.args[0]) {
            process2.out("\u25A0");
            visit(node.args[0], v);
            process2.out("\n");
          }
          const nodeCount = node.childNodes.length;
          let nodeIndex = 0;
          node.childNodes.forEach((node2) => {
            visit(node2, v);
            nodeIndex++;
            if (nodeIndex < nodeCount) {
              process2.out("\n");
            }
          });
        };
      }
      block_emlist_post(process2, _node) {
        process2.out("\n\u25C6\u2192\u7D42\u4E86:\u30A4\u30F3\u30E9\u30A4\u30F3\u30EA\u30B9\u30C8\u2190\u25C6\n");
      }
      block_emlistnum_pre(process2, node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u30A4\u30F3\u30E9\u30A4\u30F3\u30EA\u30B9\u30C8\u2190\u25C6\n");
        let lineCount = 1;
        return (v) => {
          if (node.args[0]) {
            process2.out("\u25A0");
            visit(node.args[0], v);
            process2.out("\n");
          }
          let lineCountMax = 0;
          node.childNodes.forEach((node2, _index, _childNodes) => {
            if (node2.isTextNode()) {
              lineCountMax += node2.toTextNode().text.split("\n").length;
            }
          });
          let lineDigit = Math.max(linesToFigure(lineCountMax), 2);
          node.childNodes.forEach((node2, index, childNodes) => {
            if (node2.isTextNode()) {
              let hasNext = !!childNodes[index + 1];
              let textNode = node2.toTextNode();
              let lines = textNode.text.split("\n");
              lines.forEach((line, index2) => {
                process2.out(padLeft(String(lineCount), " ", lineDigit)).out(": ");
                process2.out(line);
                if (!hasNext || lines.length - 1 !== index2) {
                  lineCount++;
                }
                process2.out("\n");
              });
            } else {
              visit(node2, v);
            }
            lineCount++;
          });
        };
      }
      block_emlistnum_post(process2, _node) {
        process2.out("\u25C6\u2192\u7D42\u4E86:\u30A4\u30F3\u30E9\u30A4\u30F3\u30EA\u30B9\u30C8\u2190\u25C6\n");
      }
      inline_br(process2, _node) {
        process2.out("\n");
      }
      inline_b_pre(process2, _node) {
        process2.out("\u2605");
      }
      inline_b_post(process2, _node) {
        process2.out("\u2606");
      }
      inline_code_pre(process2, _node) {
        process2.out("\u25B3");
      }
      inline_code_post(process2, _node) {
        process2.out("\u2606");
      }
      inline_href_pre(process2, _node) {
        process2.out("\u25B3");
      }
      inline_href_post(process2, _node) {
        process2.out("\u2606");
      }
      inline_href(process2, node) {
        let href = null;
        let text2 = nodeContentToString(process2, node);
        if (text2.indexOf(",") !== -1) {
          href = text2.slice(0, text2.indexOf(","));
          text2 = text2.slice(text2.indexOf(",") + 1).trimLeft();
        }
        if (href) {
          process2.out(text2).out("\uFF08\u25B3").out(href).out("\u2606\uFF09");
        } else {
          process2.out("\u25B3").out(text2).out("\u2606");
        }
        return false;
      }
      block_label(_process, _node) {
        return false;
      }
      inline_ruby(process2, node) {
        let contentString = nodeContentToString(process2, node);
        let keywordData = contentString.split(",");
        process2.out(keywordData[0]);
        return (_v) => {
          node.childNodes.forEach((_node) => {
            process2.out("\u25C6\u2192DTP\u9023\u7D61:\u300C").out(keywordData[0]);
            process2.out("\u300D\u306B\u300C ").out(keywordData[1].trim()).out("\u300D\u3068\u30EB\u30D3\u2190\u25C6");
          });
        };
      }
      inline_u_pre(process2, _node) {
        process2.out("\uFF20");
      }
      inline_u_post(process2, _node) {
        process2.out("\uFF20\u25C6\u2192\uFF20\u301C\uFF20\u90E8\u5206\u306B\u4E0B\u7DDA\u2190\u25C6");
      }
      inline_kw(process2, node) {
        process2.out("\u2605");
        return (_v) => {
          node.childNodes.forEach((node2) => {
            let contentString = nodeContentToString(process2, node2);
            let keywordData = contentString.split(",");
            let pre = keywordData[0];
            let post = (keywordData[1] || "").trimLeft();
            process2.out(`${pre}\u2606`);
            if (post) {
              process2.out(`\uFF08${post}\uFF09`);
            }
          });
        };
      }
      inline_tt_pre(process2, _node) {
        process2.out("\u25B3");
      }
      inline_tt_post(process2, _node) {
        process2.out("\u2606");
      }
      inline_em_pre(process2, node) {
        process2.warn(t("compile.deprecated_inline_symbol", "em"), node);
        process2.out("@<em>{");
      }
      inline_em_post(process2, _node) {
        process2.out("}");
      }
      block_image(process2, node) {
        let label = nodeContentToString(process2, node.args[0]);
        return process2.findImageFile(label).then((imagePath) => {
          let caption = nodeContentToString(process2, node.args[1]);
          process2.out("\u25C6\u2192\u958B\u59CB:\u56F3\u2190\u25C6\n");
          process2.out("\u56F3").out(process2.base.chapter.no).out(".").out(node.no).out("\u3000").out(caption).out("\n");
          process2.out("\n");
          process2.out("\u25C6\u2192").out(imagePath).out("\u2190\u25C6\n");
          process2.out("\u25C6\u2192\u7D42\u4E86:\u56F3\u2190\u25C6\n");
          return false;
        }).catch((id) => {
          process2.error(t("builder.image_not_found", id), node);
          return false;
        });
      }
      block_indepimage(process2, node) {
        process2.out("\u25C6\u2192\u753B\u50CF ").out(nodeContentToString(process2, node.args[0])).out("\u2190\u25C6\n");
        if (node.args[1]) {
          process2.out("\u56F3\u3000").out(nodeContentToString(process2, node.args[1])).out("\n\n");
        }
        return false;
      }
      block_graph_pre(process2, node) {
        process2.outRaw("\u25C6\u2192\u958B\u59CB:\u56F3\u2190\u25C6\n");
        let toolName = nodeContentToString(process2, node.args[1]);
        process2.outRaw("graph: ").out(toolName).outRaw("</p>\n");
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_graph_post(process2, _node) {
        process2.outRaw("\u25C6\u2192\u7D42\u4E86:\u56F3\u2190\u25C6\n");
      }
      inline_img(process2, node) {
        let imgNode = this.findReference(process2, node).referenceTo.referenceNode.toBlockElement();
        process2.out("\u56F3").out(process2.base.chapter.no).out(".").out(imgNode.no).out("\n");
        return false;
      }
      inline_icon(process2, node) {
        let chapterFileName = process2.base.chapter.name;
        let chapterName = chapterFileName.substring(0, chapterFileName.length - 3);
        let imageName = nodeContentToString(process2, node);
        let imagePath = "images/" + chapterName + "-" + imageName + ".png";
        process2.out("\u25C6\u2192\u753B\u50CF ").out(imagePath).out("\u2190\u25C6");
        return false;
      }
      block_footnote(process2, node) {
        process2.out("\u3010\u6CE8").out(node.no).out("\u3011");
        return (v) => {
          visit(node.args[1], v);
          process2.out("\n");
        };
      }
      inline_fn(process2, node) {
        let footnoteNode = this.findReference(process2, node).referenceTo.referenceNode.toBlockElement();
        process2.out("\u3010\u6CE8").out(footnoteNode.no).out("\u3011");
        return false;
      }
      block_lead_pre(process2, _node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u30EA\u30FC\u30C9\u2190\u25C6\n");
      }
      block_lead_post(process2, _node) {
        process2.out("\u25C6\u2192\u7D42\u4E86:\u30EA\u30FC\u30C9\u2190\u25C6\n");
      }
      inline_tti_pre(process2, _node) {
        process2.out("\u25B2");
      }
      inline_tti_post(process2, _node) {
        process2.out("\u2606\u25C6\u2192\u7B49\u5E45\u30D5\u30A9\u30F3\u30C8\u30A4\u30BF\u2190\u25C6");
      }
      inline_ttb_pre(process2, _node) {
        process2.out("\u2605");
      }
      inline_ttb_post(process2, _node) {
        process2.out("\u2606\u25C6\u2192\u7B49\u5E45\u30D5\u30A9\u30F3\u30C8\u592A\u5B57\u2190\u25C6");
      }
      block_noindent(process2, _node) {
        process2.out("\u25C6\u2192DTP\u9023\u7D61:\u6B21\u306E1\u884C\u30A4\u30F3\u30C7\u30F3\u30C8\u306A\u3057\u2190\u25C6\n");
        return false;
      }
      block_blankline(process2, _node) {
        process2.out("\n");
        return false;
      }
      block_source_pre(process2, node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u30EA\u30B9\u30C8\u2190\u25C6\n");
        process2.out("\u25A0").out(nodeContentToString(process2, node.args[0])).out("\n");
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_source_post(process2, _node) {
        process2.out("\n\u25C6\u2192\u7D42\u4E86:\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u30EA\u30B9\u30C8\u2190\u25C6\n");
      }
      block_cmd_pre(process2, node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u30B3\u30DE\u30F3\u30C9\u2190\u25C6\n");
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_cmd_post(process2, _node) {
        process2.out("\n\u25C6\u2192\u7D42\u4E86:\u30B3\u30DE\u30F3\u30C9\u2190\u25C6\n");
      }
      block_quote_pre(process2, node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u5F15\u7528\u2190\u25C6\n");
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_quote_post(process2, _node) {
        process2.out("\n\u25C6\u2192\u7D42\u4E86:\u5F15\u7528\u2190\u25C6\n");
      }
      inline_ami_pre(_process, _node) {
      }
      inline_ami_post(process2, node) {
        process2.out("\u25C6\u2192DTP\u9023\u7D61:\u300C").out(nodeContentToString(process2, node)).out("\u300D\u306B\u7DB2\u30AB\u30B1\u2190\u25C6");
      }
      inline_bou_pre(_process, _node) {
      }
      inline_bou_post(process2, node) {
        process2.out("\u25C6\u2192DTP\u9023\u7D61:\u300C").out(nodeContentToString(process2, node)).out("\u300D\u306B\u508D\u70B9\u2190\u25C6");
      }
      inline_del_pre(process2, _node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u524A\u9664\u8868\u73FE\u2190\u25C6");
      }
      inline_del_post(process2, _node) {
        process2.out("\u25C6\u2192\u7D42\u4E86:\u524A\u9664\u8868\u73FE\u2190\u25C6");
      }
      inline_i_pre(process2, _node) {
        process2.out("\u25B2");
      }
      inline_i_post(process2, _node) {
        process2.out("\u2606");
      }
      inline_ins_pre(process2, _node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u633F\u5165\u8868\u73FE\u2190\u25C6");
      }
      inline_ins_post(process2, _node) {
        process2.out("\u25C6\u2192\u7D42\u4E86:\u633F\u5165\u8868\u73FE\u2190\u25C6");
      }
      inline_m_pre(process2, _node) {
        process2.outRaw("TODO: ");
      }
      inline_m_post(process2, _node) {
        process2.outRaw("");
      }
      inline_strong_pre(process2, _node) {
        process2.out("\u2605");
      }
      inline_strong_post(process2, _node) {
        process2.out("\u2606");
      }
      inline_tcy_pre(process2, _node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u56DE\u8EE2\u2190\u25C6");
      }
      inline_tcy_post(process2, _node) {
        process2.out("\u25C6\u2192\u7D42\u4E86:\u7E26\u56DE\u8EE2\u2190\u25C6");
      }
      inline_uchar(process2, node) {
        let hexString = nodeContentToString(process2, node);
        let code = parseInt(hexString, 16);
        let result = "";
        while (code !== 0) {
          result = String.fromCharCode(code & 65535) + result;
          code >>>= 16;
        }
        process2.out(result);
        return false;
      }
      block_table_pre(process2, node) {
        process2.out("\n\u25C6\u2192\u958B\u59CB:\u8868\u2190\u25C6\n");
        let chapter2 = findChapter(node, 1);
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        let text2 = t("builder.table", chapter2.fqn, node.no);
        process2.out(text2).out("\u3000").out(nodeContentToString(process2, node.args[1])).out("\n\n");
        const table = this.parseTable(node.childNodes);
        return (v) => {
          if (table.headerRowCount === 0) {
            table.cells.forEach((columns) => {
              if (columns.length === 0) {
                return;
              }
              process2.out("\u2605");
              columns[0].nodes.forEach((node2) => {
                visit(node2, v);
              });
              process2.out("\u2606");
              for (let c = 1; c < columns.length; c++) {
                process2.outRaw("	");
                columns[c].nodes.forEach((node2) => {
                  visit(node2, v);
                });
              }
              process2.outRaw("\n");
            });
          } else {
            let r = 0;
            for (; r < table.headerRowCount; r++) {
              const columns = table.cells[r];
              columns.forEach((cell, index) => {
                process2.out("\u2605");
                cell.nodes.forEach((node2) => {
                  visit(node2, v);
                });
                process2.out("\u2606");
                if (index < columns.length - 1) {
                  process2.outRaw("	");
                } else {
                  process2.outRaw("\n");
                }
              });
            }
            for (; r < table.cells.length; r++) {
              const columns = table.cells[r];
              columns.forEach((cell, index) => {
                cell.nodes.forEach((node2) => {
                  visit(node2, v);
                });
                if (index < columns.length - 1) {
                  process2.outRaw("	");
                } else {
                  process2.outRaw("\n");
                }
              });
            }
          }
        };
      }
      block_table_post(process2, _node) {
        process2.out("\u25C6\u2192\u7D42\u4E86:\u8868\u2190\u25C6\n\n");
      }
      inline_table(process2, node) {
        let chapter2 = findChapter(node, 1);
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        let listNode = this.findReference(process2, node).referenceTo.referenceNode.toBlockElement();
        let text2 = t("builder.table", chapter2.fqn, listNode.no);
        process2.out(text2);
        return false;
      }
      block_tsize(_process, _node) {
        return false;
      }
      block_comment_pre(process2, node) {
        if (!this.book.config.isDraft) {
          return false;
        }
        process2.out("\u25C6\u2192");
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_comment_post(process2, _node) {
        if (!this.book.config.isDraft) {
          return;
        }
        process2.out("\u2190\u25C6\n");
      }
      inline_comment_pre(process2, _node) {
        if (!this.book.config.isDraft) {
          return false;
        }
        process2.out("\u25C6\u2192");
        return true;
      }
      inline_comment_post(process2, _node) {
        if (!this.book.config.isDraft) {
          return;
        }
        process2.out("\u2190\u25C6");
      }
      inline_chap(process2, node) {
        let chapName = nodeContentToString(process2, node);
        let chapter2 = process2.findChapter(chapName);
        process2.out("\u7B2C").out(chapter2.no).out("\u7AE0");
        return false;
      }
      inline_title(process2, node) {
        let chapName = nodeContentToString(process2, node);
        let chapter2 = process2.findChapter(chapName);
        let title = this.getChapterTitle(process2, chapter2);
        process2.out(title);
        return false;
      }
      inline_chapref(process2, node) {
        let chapName = nodeContentToString(process2, node);
        let chapter2 = process2.findChapter(chapName);
        let title = this.getChapterTitle(process2, chapter2);
        process2.out("\u7B2C").out(chapter2.no).out("\u7AE0\u300C").out(title).out("\u300D");
        return false;
      }
      inline_idx(process2, node) {
        const text2 = nodeContentToString(process2, node);
        process2.out(`${text2}\u25C6\u2192\u7D22\u5F15\u9805\u76EE:${text2}\u2190\u25C6`);
        return false;
      }
      inline_hidx(process2, node) {
        const text2 = nodeContentToString(process2, node);
        process2.out(`\u25C6\u2192\u7D22\u5F15\u9805\u76EE:${text2}\u2190\u25C6`);
        return false;
      }
      block_flushright_pre(process2, node) {
        process2.out("\u25C6\u2192\u958B\u59CB:\u53F3\u5BC4\u305B\u2190\u25C6\n");
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_flushright_post(process2, _node) {
        process2.out("\n\u25C6\u2192\u7D42\u4E86:\u53F3\u5BC4\u305B\u2190\u25C6\n");
      }
      block_captionblock_pre(typename, process2, node) {
        process2.out(`\u25C6\u2192\u958B\u59CB:${typename}\u2190\u25C6
`);
        if (node.args[0]) {
          let caption = nodeContentToString(process2, node.args[0]);
          process2.out(`\u25A0${caption}
`);
        }
      }
      block_captionblock_post(typename, process2, _node) {
        process2.out(`\u25C6\u2192\u7D42\u4E86:${typename}\u2190\u25C6
`);
      }
      block_info_pre(process2, node) {
        this.block_captionblock_pre("\u60C5\u5831", process2, node);
      }
      block_info_post(process2, node) {
        this.block_captionblock_post("\u60C5\u5831", process2, node);
      }
      block_note_pre(process2, node) {
        this.block_captionblock_pre("\u30CE\u30FC\u30C8", process2, node);
      }
      block_note_post(process2, node) {
        this.block_captionblock_post("\u30CE\u30FC\u30C8", process2, node);
      }
      block_memo_pre(process2, node) {
        this.block_captionblock_pre("\u30E1\u30E2", process2, node);
      }
      block_memo_post(process2, node) {
        this.block_captionblock_post("\u30E1\u30E2", process2, node);
      }
      block_tip_pre(process2, node) {
        this.block_captionblock_pre("TIP", process2, node);
      }
      block_tip_post(process2, node) {
        this.block_captionblock_post("TIP", process2, node);
      }
      block_warning_pre(process2, node) {
        this.block_captionblock_pre("\u5371\u967A", process2, node);
      }
      block_warning_post(process2, node) {
        this.block_captionblock_post("\u5371\u967A", process2, node);
      }
      block_important_pre(process2, node) {
        this.block_captionblock_pre("\u91CD\u8981", process2, node);
      }
      block_important_post(process2, node) {
        this.block_captionblock_post("\u91CD\u8981", process2, node);
      }
      block_caution_pre(process2, node) {
        this.block_captionblock_pre("\u8B66\u544A", process2, node);
      }
      block_caution_post(process2, node) {
        this.block_captionblock_post("\u8B66\u544A", process2, node);
      }
      block_notice_pre(process2, node) {
        this.block_captionblock_pre("\u6CE8\u610F", process2, node);
      }
      block_notice_post(process2, node) {
        this.block_captionblock_post("\u6CE8\u610F", process2, node);
      }
    };
  }
});

// lib/builder/htmlBuilder.ts
var htmlBuilder_exports = {};
__export(htmlBuilder_exports, {
  HtmlBuilder: () => HtmlBuilder
});
var HtmlBuilder;
var init_htmlBuilder = __esm({
  "lib/builder/htmlBuilder.ts"() {
    "use strict";
    init_i18n();
    init_builder();
    init_parser();
    init_walker();
    init_utils2();
    HtmlBuilder = class extends DefaultBuilder {
      constructor(standalone = true) {
        super();
        this.standalone = standalone;
        this.extention = "html";
        this.escapeMap = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;"
        };
      }
      escape(data) {
        let regexp = new RegExp(`[${Object.keys(this.escapeMap).join("")}]`, "g");
        return String(data).replace(regexp, (c) => this.escapeMap[c]);
      }
      normalizeId(label) {
        if (label.match(/^[a-z][a-z0-9_/-]*$/i)) {
          return label;
        } else if (label.match(/^[0-9_.-][a-z0-9_.-]*$/i)) {
          return `id_${label}`;
        } else {
          return `id_${encodeURIComponent(label.replace(/_/g, "__").replace(/ /g, "-")).replace(/%/g, "_").replace(/\+/g, "-")}`;
        }
      }
      processPost(process2, chunk) {
        if (this.standalone) {
          let pre = "";
          pre += `<?xml version="1.0" encoding="UTF-8"?>
`;
          pre += `<!DOCTYPE html>
`;
          pre += `<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xmlns:ops="http://www.idpf.org/2007/ops" xml:lang="ja">
`;
          pre += `<head>
`;
          pre += `  <meta charset="UTF-8" />
`;
          pre += `  <link rel="stylesheet" type="text/css" href="stylesheet.css" />
`;
          pre += `  <meta name="generator" content="Re:VIEW" />
`;
          let name = null;
          visit(chunk.tree.ast, {
            visitDefaultPre: () => {
            },
            visitChapterPre: (node) => {
              if (node.headline.level === 1) {
                name = nodeContentToString(
                  process2,
                  node.headline.caption,
                  /* textOnly */
                  true
                );
              }
            }
          });
          pre += "  <title>" + this.escape(name) + "</title>\n";
          pre += "</head>\n";
          pre += "<body>\n";
          process2.pushOut(pre);
          process2.outRaw("</body>\n");
          process2.outRaw("</html>\n");
        }
      }
      headlinePre(process2, _name, node) {
        process2.outRaw("<h").out(node.level);
        if (node.label) {
          process2.outRaw(' id="').out(this.normalizeId(node.label.arg)).outRaw('"');
        }
        process2.outRaw(">");
        process2.outRaw('<a id="h').out(getHeadlineLevels(node).join("-")).outRaw('"></a>');
        if (node.level === 1) {
          let text2 = t("builder.chapter", node.parentNode.no);
          process2.outRaw(`<span class="secno">`);
          process2.out(text2).out("\u3000");
          process2.outRaw(`</span>`);
        } else if (node.level < 4) {
          process2.out(getHeadlineLevels(node).join(".")).out("\u3000");
        }
      }
      headlinePost(process2, _name, node) {
        process2.outRaw("</h").out(node.level).outRaw(">\n");
      }
      columnPre(process2, _node) {
        process2.outRaw('<div class="column">\n\n');
      }
      columnPost(process2, _node) {
        process2.outRaw("</div>\n");
      }
      columnHeadlinePre(process2, node) {
        process2.outRaw("<h").out(node.level);
        if (node.label) {
          process2.outRaw(' id="').out(this.normalizeId(node.label.arg)).outRaw('"');
        }
        process2.outRaw(">");
        process2.outRaw('<a id="column-').out(node.parentNode.no).outRaw('"></a>');
        return (v) => {
          visit(node.caption, v);
        };
      }
      columnHeadlinePost(process2, node) {
        process2.outRaw("</h").out(node.level).outRaw(">\n");
      }
      paragraphPre(process2, _name, node) {
        if (node.prev && node.prev.isBlockElement() && node.prev.toBlockElement().symbol === "noindent") {
          process2.outRaw('<p class="noindent">');
        } else {
          process2.outRaw("<p>");
        }
      }
      paragraphPost(process2, _name, _node) {
        process2.outRaw("</p>\n");
      }
      ulistPre(process2, _name, node) {
        this.ulistParentHelper(process2, node, () => {
          process2.outRaw("<ul>\n<li>");
        });
        if (node.prev instanceof UlistElementSyntaxTree === false) {
          process2.outRaw("<ul>\n");
        }
        process2.outRaw("<li>");
      }
      ulistPost(process2, _name, node) {
        process2.outRaw("</li>\n");
        if (node.next instanceof UlistElementSyntaxTree === false) {
          process2.outRaw("</ul>\n");
        }
        this.ulistParentHelper(process2, node, () => {
          process2.outRaw("</li>\n</ul>\n");
        });
      }
      olistPre(process2, _name, node) {
        if (node.prev instanceof OlistElementSyntaxTree === false) {
          process2.outRaw("<ol>\n");
        }
        process2.outRaw("<li>");
      }
      olistPost(process2, _name, node) {
        process2.outRaw("</li>\n");
        if (node.next instanceof OlistElementSyntaxTree === false) {
          process2.outRaw("</ol>\n");
        }
      }
      dlistPre(process2, _name, node) {
        if (node.prev instanceof DlistElementSyntaxTree === false) {
          process2.outRaw("<dl>\n");
        }
        return (v) => {
          process2.outRaw("<dt>");
          visit(node.text, v);
          process2.outRaw("</dt>\n");
          process2.outRaw("<dd>");
          visit(node.content, v);
          process2.outRaw("</dd>\n");
        };
      }
      dlistPost(process2, _name, node) {
        if (node.next instanceof DlistElementSyntaxTree === false) {
          process2.outRaw("</dl>\n");
        }
      }
      block_list_pre(process2, node) {
        process2.outRaw('<div class="caption-code">\n');
        let chapter2 = findChapter(node, 1);
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        let text2 = t("builder.list", chapter2.fqn, node.no);
        process2.outRaw('<p class="caption">').out(text2).outRaw(": ");
        return (v) => {
          visit(node.args[1], v);
          process2.outRaw("</p>\n");
          process2.outRaw('<pre class="list">');
          const nodeCount = node.childNodes.length;
          let nodeIndex = 0;
          node.childNodes.forEach((node2) => {
            visit(node2, v);
            nodeIndex++;
            if (nodeIndex < nodeCount) {
              process2.out("\n");
            }
          });
        };
      }
      block_list_post(process2, _node) {
        process2.outRaw("\n</pre>\n").outRaw("</div>\n");
      }
      block_listnum_pre(process2, node) {
        process2.outRaw('<div class="code">\n');
        let chapter2 = findChapter(node, 1);
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        let text2 = t("builder.list", chapter2.fqn, node.no);
        process2.outRaw('<p class="caption">').out(text2).out(": ");
        let lineCount = 1;
        return (v) => {
          visit(node.args[1], v);
          process2.outRaw("</p>\n");
          process2.outRaw('<pre class="list">');
          let lineCountMax = 0;
          node.childNodes.forEach((node2) => {
            if (node2.isTextNode()) {
              lineCountMax += node2.toTextNode().text.split("\n").length;
            }
          });
          let lineDigit = Math.max(linesToFigure(lineCountMax), 2);
          const nodeCount = node.childNodes.length;
          let nodeIndex = 0;
          node.childNodes.forEach((node2, index, childNodes) => {
            if (node2.isTextNode()) {
              let hasNext = !!childNodes[index + 1];
              let textNode = node2.toTextNode();
              let lines = textNode.text.split("\n");
              lines.forEach((line, index2) => {
                process2.out(padLeft(String(lineCount), " ", lineDigit)).out(": ");
                process2.out(line);
                if (!hasNext || lines.length - 1 !== index2) {
                  lineCount++;
                }
                if (lines.length - 1 !== index2) {
                  process2.out("\n");
                }
              });
            } else {
              visit(node2, v);
            }
            nodeIndex++;
            if (nodeIndex < nodeCount) {
              process2.out("\n");
            }
            lineCount++;
          });
        };
      }
      block_listnum_post(process2, _node) {
        process2.outRaw("\n</pre>\n").outRaw("</div>\n");
      }
      inline_list(process2, node) {
        let chapter2 = findChapter(node, 1);
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        let listNode = this.findReference(process2, node).referenceTo.referenceNode.toBlockElement();
        let text2 = t("builder.list", chapter2.fqn, listNode.no);
        process2.out(text2);
        return false;
      }
      block_emlist_pre(process2, node) {
        process2.outRaw('<div class="emlist-code">\n');
        return (v) => {
          if (node.args[0]) {
            process2.outRaw('<p class="caption">');
            visit(node.args[0], v);
            process2.outRaw("</p>\n");
          }
          process2.outRaw('<pre class="emlist">');
          const nodeCount = node.childNodes.length;
          let nodeIndex = 0;
          node.childNodes.forEach((node2) => {
            visit(node2, v);
            nodeIndex++;
            if (nodeIndex < nodeCount) {
              process2.out("\n");
            }
          });
        };
      }
      block_emlist_post(process2, _node) {
        process2.outRaw("\n</pre>\n").outRaw("</div>\n");
      }
      block_emlistnum_pre(process2, node) {
        process2.outRaw('<div class="emlistnum-code">\n');
        process2.outRaw('<pre class="emlist">');
        let lineCount = 1;
        return (v) => {
          let lineCountMax = 0;
          node.childNodes.forEach((node2) => {
            if (node2.isTextNode()) {
              lineCountMax += node2.toTextNode().text.split("\n").length;
            }
          });
          let lineDigit = Math.max(linesToFigure(lineCountMax), 2);
          const nodeCount = node.childNodes.length;
          let nodeIndex = 0;
          node.childNodes.forEach((node2, index, childNodes) => {
            if (node2.isTextNode()) {
              let hasNext = !!childNodes[index + 1];
              let textNode = node2.toTextNode();
              let lines = textNode.text.split("\n");
              lines.forEach((line, index2) => {
                process2.out(padLeft(String(lineCount), " ", lineDigit)).out(": ");
                process2.out(line);
                if (!hasNext || lines.length - 1 !== index2) {
                  lineCount++;
                }
                if (lines.length - 1 !== index2) {
                  process2.out("\n");
                }
              });
            } else {
              visit(node2, v);
            }
            nodeIndex++;
            if (nodeIndex < nodeCount) {
              process2.out("\n");
            }
            lineCount++;
          });
        };
      }
      block_emlistnum_post(process2, _node) {
        process2.outRaw("\n</pre>\n").outRaw("</div>\n");
      }
      inline_br(process2, _node) {
        process2.outRaw("<br />");
      }
      inline_b_pre(process2, _node) {
        process2.outRaw("<b>");
      }
      inline_b_post(process2, _node) {
        process2.outRaw("</b>");
      }
      inline_code_pre(process2, _node) {
        process2.outRaw(`<code class="inline-code tt">`);
      }
      inline_code_post(process2, _node) {
        process2.outRaw(`</code>`);
      }
      inline_href(process2, node) {
        let href = nodeContentToString(process2, node);
        let text2 = href;
        if (href.indexOf(",") !== -1) {
          text2 = href.slice(href.indexOf(",") + 1).trimLeft();
          href = href.slice(0, href.indexOf(","));
        }
        process2.outRaw('<a href="').outRaw(href).outRaw('" class="link">').out(text2).outRaw("</a>");
        return false;
      }
      block_label(process2, node) {
        process2.outRaw('<a id="');
        process2.out(nodeContentToString(process2, node.args[0]));
        process2.outRaw('"></a>\n');
        return false;
      }
      inline_tt_pre(process2, _node) {
        process2.outRaw(`<code class="tt">`);
      }
      inline_tt_post(process2, _node) {
        process2.outRaw(`</code>`);
      }
      inline_ruby_pre(process2, node) {
        process2.outRaw("<ruby>");
        return (_v) => {
          node.childNodes.forEach((node2) => {
            let contentString = nodeContentToString(process2, node2);
            let keywordData = contentString.split(",");
            process2.out(keywordData[0]);
            process2.outRaw("<rp>\uFF08</rp>");
            process2.outRaw("<rt>").out(keywordData[1]).outRaw("</rt>");
            process2.outRaw("<rp>\uFF09</rp>");
          });
        };
      }
      inline_ruby_post(process2, _node) {
        process2.outRaw("</ruby>");
      }
      inline_u_pre(process2, _node) {
        process2.outRaw("<u>");
      }
      inline_u_post(process2, _node) {
        process2.outRaw("</u>");
      }
      inline_kw_pre(process2, node) {
        process2.outRaw('<b class="kw">');
        return (_v) => {
          node.childNodes.forEach((node2) => {
            let contentString = nodeContentToString(process2, node2);
            let keywordData = contentString.split(",");
            let pre = keywordData[0];
            let post = (keywordData[1] || "").trimLeft();
            process2.out(`${pre}`);
            if (post) {
              process2.out(` (${post})`);
            }
          });
        };
      }
      inline_kw_post(process2, node) {
        let contentString = nodeContentToString(process2, node);
        let keywordData = contentString.split(",");
        let pre = keywordData[0];
        process2.outRaw("</b>").outRaw("<!-- IDX:").out(pre).outRaw(" -->");
      }
      inline_em_pre(process2, _node) {
        process2.outRaw("<em>");
      }
      inline_em_post(process2, _node) {
        process2.outRaw("</em>");
      }
      block_image(process2, node) {
        let label = nodeContentToString(process2, node.args[0]);
        return process2.findImageFile(label).then((imagePath) => {
          let caption = nodeContentToString(process2, node.args[1]);
          let scale = 1;
          if (node.args[2]) {
            let regexp = new RegExp("scale=(\\d+(?:\\.\\d+))");
            let result = regexp.exec(nodeContentToString(process2, node.args[2]));
            if (result) {
              scale = parseFloat(result[1]);
            }
          }
          process2.outRaw(`<div id="`).out(label).outRaw(`" class="image">
`);
          if (scale !== 1) {
            let scaleClass = `000${scale * 100}`;
            scaleClass = scaleClass.substr(scaleClass.length - 3);
            process2.outRaw(`<img src="${imagePath}" alt="`).out(caption).outRaw(`" class="width-`).out(scaleClass).outRaw('per" />\n');
          } else {
            process2.outRaw(`<img src="${imagePath}" alt="`).out(caption).outRaw(`" />
`);
          }
          process2.outRaw('<p class="caption">\n');
          process2.out("\u56F3").out(process2.base.chapter.no).out(".").out(node.no).out(": ").out(caption);
          process2.outRaw("\n</p>\n");
          process2.outRaw("</div>\n");
          return false;
        }).catch((id) => {
          process2.error(t("builder.image_not_found", id), node);
          return false;
        });
      }
      block_indepimage(process2, node) {
        let label = nodeContentToString(process2, node.args[0]);
        return process2.findImageFile(label).then((imagePath) => {
          let caption = "";
          if (node.args[1]) {
            caption = nodeContentToString(process2, node.args[1]);
          }
          let scale = 1;
          if (node.args[2]) {
            let regexp = new RegExp("scale=(\\d+(?:\\.\\d+))");
            let result = regexp.exec(nodeContentToString(process2, node.args[2]));
            if (result) {
              scale = parseFloat(result[1]);
            }
          }
          process2.outRaw('<div class="image">\n');
          if (scale !== 1) {
            let scaleClass = `000${scale * 100}`;
            scaleClass = scaleClass.substr(scaleClass.length - 3);
            process2.outRaw(`<img src="${imagePath}" alt="`).out(caption).outRaw(`" class="width-`).out(scaleClass).outRaw('per" />\n');
          } else {
            process2.outRaw(`<img src="${imagePath}" alt="`).out(caption).outRaw(`" />
`);
          }
          if (node.args[1]) {
            process2.outRaw('<p class="caption">\n');
            process2.out("\u56F3: ").out(caption);
            process2.outRaw("\n</p>\n");
          }
          process2.outRaw("</div>\n");
          return false;
        });
      }
      block_graph_pre(process2, node) {
        process2.outRaw("<div>\n");
        let toolName = nodeContentToString(process2, node.args[1]);
        process2.outRaw("<p>graph: ").out(toolName).outRaw("</p>\n");
        process2.outRaw("<pre>");
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_graph_post(process2, _node) {
        process2.outRaw("\n</pre>\n").outRaw("</div>\n");
      }
      inline_img(process2, node) {
        let imgNode = this.findReference(process2, node).referenceTo.referenceNode.toBlockElement();
        process2.out("\u56F3").out(process2.base.chapter.no).out(".").out(imgNode.no);
        return false;
      }
      inline_icon(process2, node) {
        let chapterFileName = process2.base.chapter.name;
        let chapterName = chapterFileName.substring(0, chapterFileName.length - 3);
        let imageName = nodeContentToString(process2, node);
        let imagePath = "images/" + this.escape(chapterName) + "-" + this.escape(imageName) + ".png";
        process2.outRaw('<img src="' + imagePath + '" alt="[').out(imageName).outRaw(']" />');
        return false;
      }
      block_footnote(process2, node) {
        let label = nodeContentToString(process2, node.args[0]);
        process2.outRaw('<div class="footnote" epub:type="footnote" id="fn-').outRaw(label).outRaw('"><p class="footnote">');
        process2.outRaw("[*").out(node.no).outRaw("] ");
        return (v) => {
          visit(node.args[1], v);
          process2.outRaw("</p></div>\n");
        };
      }
      inline_fn(process2, node) {
        let footnoteNode = this.findReference(process2, node).referenceTo.referenceNode.toBlockElement();
        let label = nodeContentToString(process2, footnoteNode.args[0]);
        process2.outRaw(`<a id="fnb-`).out(label).outRaw(`" href="#fn-`).out(label).outRaw(`" class="noteref" epub:type="noteref">*`).out(footnoteNode.no).outRaw("</a>");
        return false;
      }
      block_lead_pre(process2, _node) {
        process2.outRaw('<div class="lead">\n');
      }
      block_lead_post(process2, _node) {
        process2.outRaw("</div>\n");
      }
      inline_tti_pre(process2, _node) {
        process2.outRaw(`<code class="tt"><i>`);
      }
      inline_tti_post(process2, _node) {
        process2.outRaw(`</i></code>`);
      }
      inline_ttb_pre(process2, _node) {
        process2.outRaw(`<code class="tt"><b>`);
      }
      inline_ttb_post(process2, _node) {
        process2.outRaw(`</b></code>`);
      }
      block_noindent(_process, _node) {
        return false;
      }
      block_blankline(process2, _node) {
        process2.outRaw("<p><br /></p>\n");
        return false;
      }
      block_source_pre(process2, node) {
        process2.outRaw('<div class="source-code">\n');
        process2.outRaw('<p class="caption">').out(nodeContentToString(process2, node.args[0])).outRaw("</p>\n");
        process2.outRaw('<pre class="source">');
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_source_post(process2, _node) {
        process2.outRaw("\n</pre>\n").outRaw("</div>\n");
      }
      block_cmd_pre(process2, node) {
        process2.outRaw('<div class="cmd-code">\n');
        process2.outRaw('<pre class="cmd">');
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_cmd_post(process2, _node) {
        process2.outRaw("\n</pre>\n").outRaw("</div>\n");
      }
      block_quote_pre(process2, node) {
        process2.outRaw("<blockquote><p>");
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_quote_post(process2, _node) {
        process2.outRaw("</p></blockquote>\n");
      }
      inline_ami_pre(process2, _node) {
        process2.outRaw('<span class="ami">');
      }
      inline_ami_post(process2, _node) {
        process2.outRaw("</span>");
      }
      inline_bou_pre(process2, _node) {
        process2.outRaw('<span class="bou">');
      }
      inline_bou_post(process2, _node) {
        process2.outRaw("</span>");
      }
      inline_del_pre(process2, _node) {
        process2.outRaw("<del>");
      }
      inline_del_post(process2, _node) {
        process2.outRaw("</del>");
      }
      inline_i_pre(process2, _node) {
        process2.outRaw("<i>");
      }
      inline_i_post(process2, _node) {
        process2.outRaw("</i>");
      }
      inline_ins_pre(process2, _node) {
        process2.outRaw("<ins>");
      }
      inline_ins_post(process2, _node) {
        process2.outRaw("</ins>");
      }
      inline_m_pre(process2, _node) {
        process2.outRaw("<span>TODO: ");
      }
      inline_m_post(process2, _node) {
        process2.outRaw("</span>");
      }
      inline_strong_pre(process2, _node) {
        process2.outRaw("<strong>");
      }
      inline_strong_post(process2, _node) {
        process2.outRaw("</strong>");
      }
      inline_tcy_pre(process2, _node) {
        process2.outRaw('<span class="tcy">');
      }
      inline_tcy_post(process2, _node) {
        process2.outRaw("</span>");
      }
      inline_uchar_pre(process2, _node) {
        process2.outRaw("&#x");
      }
      inline_uchar_post(process2, _node) {
        process2.outRaw(";");
      }
      block_table_pre(process2, node) {
        let chapter2 = findChapter(node, 1);
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        let text2 = t("builder.table", chapter2.fqn, node.no);
        process2.outRaw("<div");
        if (node.args[0] != null) {
          process2.outRaw(' id="').out(this.normalizeId(node.args[0].childNodes[0].toNode().childNodes[0].toTextNode().text)).outRaw('"');
        }
        process2.outRaw(' class="table">\n');
        process2.outRaw('<p class="caption">').out(text2).out(": ").out(nodeContentToString(process2, node.args[1])).outRaw("</p>\n");
        process2.outRaw("<table>\n");
        const table = this.parseTable(node.childNodes);
        return (v) => {
          if (table.headerRowCount === 0) {
            table.cells.forEach((columns) => {
              if (columns.length === 0) {
                return;
              }
              process2.outRaw("<tr>");
              process2.outRaw("<th>");
              columns[0].nodes.forEach((node2) => {
                visit(node2, v);
              });
              process2.outRaw("</th>");
              for (let c = 1; c < columns.length; c++) {
                process2.outRaw("<td>");
                columns[c].nodes.forEach((node2) => {
                  visit(node2, v);
                });
                process2.outRaw("</td>");
              }
              process2.outRaw("</tr>\n");
            });
          } else {
            let r = 0;
            for (; r < table.headerRowCount; r++) {
              process2.outRaw("<tr>");
              table.cells[r].forEach((columns) => {
                process2.outRaw("<th>");
                columns.nodes.forEach((node2) => {
                  visit(node2, v);
                });
                process2.outRaw("</th>");
              });
              process2.outRaw("</tr>\n");
            }
            for (; r < table.cells.length; r++) {
              process2.outRaw("<tr>");
              table.cells[r].forEach((columns) => {
                process2.outRaw("<td>");
                columns.nodes.forEach((node2) => {
                  visit(node2, v);
                });
                process2.outRaw("</td>");
              });
              process2.outRaw("</tr>\n");
            }
          }
        };
      }
      block_table_post(process2, _node) {
        process2.outRaw("</table>\n").outRaw("</div>\n");
      }
      inline_table(process2, node) {
        let chapter2 = findChapter(node, 1);
        if (!chapter2) {
          process2.error(t("builder.chapter_not_found", 1), node);
          return false;
        }
        let listNode = this.findReference(process2, node).referenceTo.referenceNode.toBlockElement();
        let text2 = t("builder.table", chapter2.fqn, listNode.no);
        process2.outRaw('<span class="tableref">').out(text2).outRaw("</span>");
        return false;
      }
      block_tsize(_process, _node) {
        return false;
      }
      block_comment_pre(process2, node) {
        if (!this.book.config.isDraft) {
          return false;
        }
        process2.outRaw('<div class="draft-comment">');
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_comment_post(process2, _node) {
        if (!this.book.config.isDraft) {
          return;
        }
        process2.outRaw("</div>\n");
      }
      inline_comment_pre(process2, _node) {
        if (!this.book.config.isDraft) {
          return false;
        }
        process2.outRaw('<span class="draft-comment">');
        return true;
      }
      inline_comment_post(process2, _node) {
        if (!this.book.config.isDraft) {
          return;
        }
        process2.outRaw("</span>");
      }
      inline_chap(process2, node) {
        let chapName = nodeContentToString(process2, node);
        let chapter2 = process2.findChapter(chapName);
        process2.out(t("builder.chapter", chapter2.no));
        return false;
      }
      inline_title(process2, node) {
        let chapName = nodeContentToString(process2, node);
        let chapter2 = process2.findChapter(chapName);
        let title = this.getChapterTitle(process2, chapter2);
        process2.out(title);
        return false;
      }
      inline_chapref(process2, node) {
        let chapName = nodeContentToString(process2, node);
        let chapter2 = process2.findChapter(chapName);
        let title = this.getChapterTitle(process2, chapter2);
        process2.out(t("builder.chapter_ref", chapter2.no, title));
        return false;
      }
      inline_idx(process2, node) {
        const text2 = nodeContentToString(process2, node);
        process2.out(text2).outRaw("<!-- IDX:").out(text2).outRaw(" -->");
        return false;
      }
      inline_hidx(process2, node) {
        const text2 = nodeContentToString(process2, node);
        process2.outRaw("<!-- IDX:").out(text2).outRaw(" -->");
        return false;
      }
      block_flushright_pre(process2, node) {
        process2.outRaw('<p class="flushright">');
        return (v) => {
          node.childNodes.forEach((node2) => {
            visit(node2, v);
          });
        };
      }
      block_flushright_post(process2, _node) {
        process2.outRaw("</p>\n");
      }
      block_captionblock_pre(typename, process2, node) {
        process2.outRaw(`<div class="${typename}">
`);
        if (node.args[0]) {
          let label = nodeContentToString(process2, node.args[0]);
          process2.outRaw('<p class="caption">').out(label).outRaw("</p>\n");
        }
      }
      block_captionblock_post(_typename, process2, _node) {
        process2.outRaw("</div>\n");
      }
      block_info_pre(process2, node) {
        this.block_captionblock_pre("info", process2, node);
      }
      block_info_post(process2, node) {
        this.block_captionblock_post("info", process2, node);
      }
      block_note_pre(process2, node) {
        this.block_captionblock_pre("note", process2, node);
      }
      block_note_post(process2, node) {
        this.block_captionblock_post("note", process2, node);
      }
      block_memo_pre(process2, node) {
        this.block_captionblock_pre("memo", process2, node);
      }
      block_memo_post(process2, node) {
        this.block_captionblock_post("memo", process2, node);
      }
      block_tip_pre(process2, node) {
        this.block_captionblock_pre("tip", process2, node);
      }
      block_tip_post(process2, node) {
        this.block_captionblock_post("tip", process2, node);
      }
      block_warning_pre(process2, node) {
        this.block_captionblock_pre("warning", process2, node);
      }
      block_warning_post(process2, node) {
        this.block_captionblock_post("warning", process2, node);
      }
      block_important_pre(process2, node) {
        this.block_captionblock_pre("important", process2, node);
      }
      block_important_post(process2, node) {
        this.block_captionblock_post("important", process2, node);
      }
      block_caution_pre(process2, node) {
        this.block_captionblock_pre("caution", process2, node);
      }
      block_caution_post(process2, node) {
        this.block_captionblock_post("caution", process2, node);
      }
      block_notice_pre(process2, node) {
        this.block_captionblock_pre("notice", process2, node);
      }
      block_notice_post(process2, node) {
        this.block_captionblock_post("notice", process2, node);
      }
    };
  }
});

// lib/parser/analyzer.ts
var analyzer_exports = {};
__export(analyzer_exports, {
  AcceptableSyntax: () => AcceptableSyntax,
  AcceptableSyntaxes: () => AcceptableSyntaxes,
  DefaultAnalyzer: () => DefaultAnalyzer,
  SyntaxType: () => SyntaxType
});
var SyntaxType, AcceptableSyntaxes, AcceptableSyntax, AnalyzeProcess, DefaultAnalyzer;
var init_analyzer = __esm({
  "lib/parser/analyzer.ts"() {
    "use strict";
    init_i18n();
    init_exception();
    init_parser();
    init_utils2();
    SyntaxType = /* @__PURE__ */ ((SyntaxType2) => {
      SyntaxType2[SyntaxType2["Block"] = 0] = "Block";
      SyntaxType2[SyntaxType2["Inline"] = 1] = "Inline";
      SyntaxType2[SyntaxType2["Other"] = 2] = "Other";
      return SyntaxType2;
    })(SyntaxType || {});
    AcceptableSyntaxes = class {
      constructor(acceptableSyntaxes) {
        this.acceptableSyntaxes = acceptableSyntaxes;
      }
      /**
       * 指定されたノードに当てはまる AcceptableSyntax を探して返す。
       * 長さが1じゃないとおかしい。(呼び出し元でチェックする)
       * @param node
       * @returns {AcceptableSyntax[]}
       */
      find(node) {
        let results;
        if (node instanceof InlineElementSyntaxTree) {
          let n = node;
          results = this.inlines.filter((s) => s.symbolName === n.symbol);
        } else if (node instanceof BlockElementSyntaxTree) {
          let n = node;
          results = this.blocks.filter((s) => s.symbolName === n.symbol);
        } else {
          results = this.others.filter((s) => node instanceof s.clazz);
        }
        return results;
      }
      get inlines() {
        return this.acceptableSyntaxes.filter((s) => s.type === 1 /* Inline */);
      }
      get blocks() {
        return this.acceptableSyntaxes.filter((s) => s.type === 0 /* Block */);
      }
      get others() {
        return this.acceptableSyntaxes.filter((s) => s.type === 2 /* Other */);
      }
      toJSON() {
        return {
          "rev": "1",
          // データフォーマットのリビジョン
          "SyntaxType": SyntaxType,
          "acceptableSyntaxes": this.acceptableSyntaxes
        };
      }
    };
    AcceptableSyntax = class {
      constructor() {
        this.argsLength = [];
        this.allowInline = true;
        this.allowFullySyntax = false;
      }
      toJSON() {
        return {
          "type": this.type,
          "class": this.clazz ? this.clazz.name : void 0,
          "symbolName": this.symbolName,
          "argsLength": this.argsLength.length !== 0 ? this.argsLength : void 0,
          "description": this.description
        };
      }
    };
    AnalyzeProcess = class {
      constructor() {
        this.acceptableSyntaxes = [];
      }
      prepare() {
        this.current = new AcceptableSyntax();
      }
      build(methodName) {
        if (methodName.indexOf("block_") === 0) {
          this.current.type = this.current.type || 0 /* Block */;
          this.current.symbolName = this.current.symbolName || methodName.substring("block_".length);
        } else if (methodName.indexOf("inline_") === 0) {
          this.current.type = this.current.type || 1 /* Inline */;
          this.current.symbolName = this.current.symbolName || methodName.substring("inline_".length);
        } else {
          this.current.type = this.current.type || 2 /* Other */;
          this.current.symbolName = this.current.symbolName || methodName;
        }
        switch (this.current.type) {
          case 0 /* Block */:
            if (this.current.argsLength.length === 0) {
              throw new AnalyzerError("must call builder.checkArgsLength(...number[]) in " + methodName);
            }
            break;
          case 2 /* Other */:
            if (!this.current.clazz) {
              throw new AnalyzerError("must call builder.setClass(class) in " + methodName);
            }
            break;
          case 1 /* Inline */:
            break;
        }
        if (!this.current.description) {
          throw new AnalyzerError("must call builder.setDescription(string) in " + methodName);
        }
        if (!this.current.process) {
          throw new AnalyzerError("must call builder.processNode(func) in " + methodName);
        }
        this.acceptableSyntaxes.push(this.current);
      }
      setSyntaxType(type) {
        this.current.type = type;
      }
      setClass(clazz) {
        this.current.clazz = clazz;
      }
      setSymbol(symbolName) {
        this.current.symbolName = symbolName;
      }
      setDescription(description) {
        this.current.description = description;
      }
      checkArgsLength(...argsLength) {
        this.current.argsLength = argsLength;
      }
      setAllowInline(enable) {
        this.current.allowInline = enable;
      }
      setAllowFullySyntax(enable) {
        this.current.allowFullySyntax = enable;
      }
      processNode(func) {
        this.current.process = func;
      }
    };
    DefaultAnalyzer = class {
      getAcceptableSyntaxes() {
        if (!this._acceptableSyntaxes) {
          this._acceptableSyntaxes = this.constructAcceptableSyntaxes();
        }
        return new AcceptableSyntaxes(this._acceptableSyntaxes);
      }
      constructAcceptableSyntaxes() {
        let process2 = new AnalyzeProcess();
        for (let k in this) {
          if (typeof this[k] !== "function") {
            continue;
          }
          let func = null;
          if (k.indexOf("block_") === 0) {
            func = this[k];
          } else if (k.indexOf("inline_") === 0) {
            func = this[k];
          } else if (k === "headline") {
            func = this[k];
          } else if (k === "column") {
            func = this[k];
          } else if (k === "ulist") {
            func = this[k];
          } else if (k === "olist") {
            func = this[k];
          } else if (k === "dlist") {
            func = this[k];
          }
          if (func) {
            process2.prepare();
            func.bind(this)(process2);
            process2.build(k);
          }
        }
        return process2.acceptableSyntaxes;
      }
      headline(builder) {
        builder.setSyntaxType(2 /* Other */);
        builder.setClass(HeadlineSyntaxTree);
        builder.setDescription(t("description.headline"));
        builder.processNode((process2, n) => {
          let node = n.toHeadline();
          let label = null;
          if (node.label) {
            label = node.label.arg;
          } else {
            label = nodeContentToString(process2, node.caption);
          }
          process2.addSymbol({
            symbolName: "hd",
            labelName: label,
            node
          });
          if (node.level === 1) {
            let label2 = null;
            if (node.label) {
              label2 = node.label.arg;
            } else {
              label2 = process2.chapter.name.substr(0, process2.chapter.name.lastIndexOf(".re"));
            }
            process2.addSymbol({
              symbolName: "chapter",
              labelName: label2,
              node
            });
          }
        });
      }
      column(builder) {
        builder.setSyntaxType(2 /* Other */);
        builder.setClass(ColumnSyntaxTree);
        builder.setDescription(t("description.column"));
        builder.processNode((process2, n) => {
          let node = n.toColumn();
          node.no = process2.nextIndex("column");
          process2.addSymbol({
            symbolName: "column",
            node
          });
        });
      }
      ulist(builder) {
        builder.setSyntaxType(2 /* Other */);
        builder.setClass(UlistElementSyntaxTree);
        builder.setDescription(t("description.ulist"));
        builder.processNode((process2, n) => {
          let node = n.toUlist();
          process2.addSymbol({
            symbolName: "ul",
            node
          });
        });
      }
      olist(builder) {
        builder.setSyntaxType(2 /* Other */);
        builder.setClass(OlistElementSyntaxTree);
        builder.setDescription(t("description.olist"));
        builder.processNode((process2, n) => {
          let node = n.toOlist();
          process2.addSymbol({
            symbolName: "ol",
            node
          });
        });
      }
      dlist(builder) {
        builder.setSyntaxType(2 /* Other */);
        builder.setClass(DlistElementSyntaxTree);
        builder.setDescription(t("description.dlist"));
        builder.processNode((process2, n) => {
          let node = n.toDlist();
          process2.addSymbol({
            symbolName: "dl",
            node
          });
        });
      }
      block_list(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("list");
        builder.setDescription(t("description.block_list"));
        builder.checkArgsLength(2, 3);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          node.no = process2.nextIndex("list");
          process2.addSymbol({
            symbolName: node.symbol,
            labelName: nodeContentToString(process2, node.args[0]),
            node
          });
        });
      }
      block_listnum(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("listnum");
        builder.setDescription(t("description.block_listnum"));
        builder.checkArgsLength(2, 3);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          node.no = process2.nextIndex("list");
          process2.addSymbol({
            symbolName: "list",
            labelName: nodeContentToString(process2, node.args[0]),
            node
          });
        });
      }
      inline_list(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("list");
        builder.setDescription(t("description.inline_list"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            referenceTo: process2.constructReferenceTo(node, nodeContentToString(process2, node)),
            node
          });
        });
      }
      block_emlist(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("emlist");
        builder.setDescription(t("description.block_emlist"));
        builder.checkArgsLength(0, 1, 2);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      block_emlistnum(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("emlistnum");
        builder.setDescription(t("description.block_emlistnum"));
        builder.checkArgsLength(0, 1, 2);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          process2.addSymbol({
            symbolName: "emlist",
            node
          });
        });
      }
      inline_hd(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("hd");
        builder.setDescription(t("description.inline_hd"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            referenceTo: process2.constructReferenceTo(node, nodeContentToString(process2, node)),
            node
          });
        });
      }
      block_image(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("image");
        builder.setDescription(t("description.block_image"));
        builder.checkArgsLength(2, 3);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          node.no = process2.nextIndex("image");
          process2.addSymbol({
            symbolName: node.symbol,
            labelName: nodeContentToString(process2, node.args[0]),
            node
          });
        });
      }
      block_indepimage(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("indepimage");
        builder.setDescription(t("description.block_indepimage"));
        builder.checkArgsLength(1, 2, 3);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      block_graph(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("graph");
        builder.setDescription(t("description.block_graph"));
        builder.checkArgsLength(2, 3);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          node.no = process2.nextIndex("image");
          process2.addSymbol({
            symbolName: "image",
            labelName: nodeContentToString(process2, node.args[0]),
            node
          });
        });
      }
      inline_img(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("img");
        builder.setDescription(t("description.inline_img"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            referenceTo: process2.constructReferenceTo(node, nodeContentToString(process2, node), "image"),
            node
          });
        });
      }
      inline_icon(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("icon");
        builder.setDescription(t("description.inline_icon"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      block_footnote(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("footnote");
        builder.setDescription(t("description.block_footnote"));
        builder.checkArgsLength(2);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          node.no = process2.nextIndex("footnote");
          process2.addSymbol({
            symbolName: node.symbol,
            labelName: nodeContentToString(process2, node.args[0]),
            node
          });
        });
      }
      inline_fn(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("fn");
        builder.setDescription(t("description.inline_fn"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            referenceTo: process2.constructReferenceTo(node, nodeContentToString(process2, node), "footnote"),
            node
          });
        });
      }
      inline_idx(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("idx");
        builder.setDescription(t("description.inline_idx"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      inline_hidx(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("hidx");
        builder.setDescription(t("description.inline_hidx"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      blockDecorationSyntax(builder, symbol, ...argsLength) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol(symbol);
        builder.setDescription(t("description.block_" + symbol));
        builder.checkArgsLength.apply(builder, argsLength);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      block_lead(builder) {
        this.blockDecorationSyntax(builder, "lead", 0);
        builder.setAllowFullySyntax(true);
      }
      block_noindent(builder) {
        this.blockDecorationSyntax(builder, "noindent", 0);
      }
      block_blankline(builder) {
        this.blockDecorationSyntax(builder, "blankline", 0);
      }
      block_source(builder) {
        this.blockDecorationSyntax(builder, "source", 1);
      }
      block_cmd(builder) {
        this.blockDecorationSyntax(builder, "cmd", 0);
      }
      block_quote(builder) {
        this.blockDecorationSyntax(builder, "quote", 0);
      }
      inlineDecorationSyntax(builder, symbol) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol(symbol);
        builder.setDescription(t("description.inline_" + symbol));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      inline_br(builder) {
        this.inlineDecorationSyntax(builder, "br");
      }
      inline_ruby(builder) {
        this.inlineDecorationSyntax(builder, "ruby");
      }
      inline_b(builder) {
        this.inlineDecorationSyntax(builder, "b");
      }
      inline_code(builder) {
        this.inlineDecorationSyntax(builder, "code");
      }
      inline_tt(builder) {
        this.inlineDecorationSyntax(builder, "tt");
      }
      inline_href(builder) {
        this.inlineDecorationSyntax(builder, "href");
      }
      block_label(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("label");
        builder.setDescription(t("description.block_label"));
        builder.checkArgsLength(1);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          node.no = process2.nextIndex("label");
          process2.addSymbol({
            symbolName: node.symbol,
            labelName: nodeContentToString(process2, node.args[0]),
            node
          });
        });
      }
      inline_u(builder) {
        this.inlineDecorationSyntax(builder, "u");
      }
      inline_kw(builder) {
        this.inlineDecorationSyntax(builder, "kw");
      }
      inline_em(builder) {
        this.inlineDecorationSyntax(builder, "em");
      }
      inline_tti(builder) {
        this.inlineDecorationSyntax(builder, "tti");
      }
      inline_ttb(builder) {
        this.inlineDecorationSyntax(builder, "ttb");
      }
      inline_ami(builder) {
        this.inlineDecorationSyntax(builder, "ami");
      }
      inline_bou(builder) {
        this.inlineDecorationSyntax(builder, "bou");
      }
      inline_del(builder) {
        this.inlineDecorationSyntax(builder, "del");
      }
      inline_i(builder) {
        this.inlineDecorationSyntax(builder, "i");
      }
      inline_ins(builder) {
        this.inlineDecorationSyntax(builder, "ins");
      }
      inline_m(builder) {
        this.inlineDecorationSyntax(builder, "m");
      }
      inline_strong(builder) {
        this.inlineDecorationSyntax(builder, "strong");
      }
      inline_tcy(builder) {
        this.inlineDecorationSyntax(builder, "tcy");
      }
      inline_uchar(builder) {
        this.inlineDecorationSyntax(builder, "uchar");
      }
      block_table(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("table");
        builder.setDescription(t("description.block_table"));
        builder.checkArgsLength(2);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          node.no = process2.nextIndex("table");
          process2.addSymbol({
            symbolName: node.symbol,
            labelName: nodeContentToString(process2, node.args[0]),
            node
          });
        });
      }
      inline_table(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("table");
        builder.setDescription(t("description.inline_table"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            referenceTo: process2.constructReferenceTo(node, nodeContentToString(process2, node)),
            node
          });
        });
      }
      block_tsize(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setDescription(t("description.block_tsize"));
        builder.checkArgsLength(1);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      block_raw(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("raw");
        builder.setDescription(t("description.block_raw"));
        builder.checkArgsLength(1);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      inline_raw(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("raw");
        builder.setDescription(t("description.inline_raw"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      block_comment(builder) {
        builder.setSyntaxType(0 /* Block */);
        builder.setSymbol("comment");
        builder.setDescription(t("description.block_comment"));
        builder.checkArgsLength(0);
        builder.processNode((process2, n) => {
          let node = n.toBlockElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      inline_comment(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("comment");
        builder.setDescription(t("description.inline_comment"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            node
          });
        });
      }
      inline_chap(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("chap");
        builder.setDescription(t("description.inline_chap"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            referenceTo: process2.constructReferenceTo(node, nodeContentToString(process2, node), "chapter"),
            node
          });
        });
      }
      inline_title(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("title");
        builder.setDescription(t("description.inline_title"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            referenceTo: process2.constructReferenceTo(node, nodeContentToString(process2, node), "chapter"),
            node
          });
        });
      }
      inline_chapref(builder) {
        builder.setSyntaxType(1 /* Inline */);
        builder.setSymbol("chapref");
        builder.setDescription(t("description.inline_chapref"));
        builder.processNode((process2, n) => {
          let node = n.toInlineElement();
          process2.addSymbol({
            symbolName: node.symbol,
            referenceTo: process2.constructReferenceTo(node, nodeContentToString(process2, node), "chapter"),
            node
          });
        });
      }
      block_flushright(builder) {
        this.blockDecorationSyntax(builder, "flushright", 0);
      }
      blockBoxedContentSyntax(builder, symbol) {
        this.blockDecorationSyntax(builder, symbol, 0);
        builder.setAllowFullySyntax(true);
      }
      block_note(builder) {
        this.blockBoxedContentSyntax(builder, "note");
      }
      block_memo(builder) {
        this.blockBoxedContentSyntax(builder, "memo");
      }
      block_tip(builder) {
        this.blockBoxedContentSyntax(builder, "tip");
      }
      block_info(builder) {
        this.blockBoxedContentSyntax(builder, "info");
      }
      block_warning(builder) {
        this.blockBoxedContentSyntax(builder, "warning");
      }
      block_important(builder) {
        this.blockBoxedContentSyntax(builder, "important");
      }
      block_caution(builder) {
        this.blockBoxedContentSyntax(builder, "caution");
      }
      block_notice(builder) {
        this.blockBoxedContentSyntax(builder, "notice");
      }
      // TODO 以下のものの実装をすすめる
      // ↑実装が簡単
      // block_texequation // latexの式のやつなので…
      // inline_m // latex のインラインのやつなので…
      // クソめんどくさいの壁
      // block_bibpaper
      // inline_bib
      // ↓実装が難しい
    };
  }
});

// lib/parser/validator.ts
var validator_exports = {};
__export(validator_exports, {
  DefaultValidator: () => DefaultValidator
});
var DefaultValidator;
var init_validator = __esm({
  "lib/parser/validator.ts"() {
    "use strict";
    init_i18n();
    init_analyzer();
    init_walker();
    init_utils2();
    DefaultValidator = class {
      start(book, acceptableSyntaxes, builders) {
        this.acceptableSyntaxes = acceptableSyntaxes;
        this.builders = builders;
        this.checkBuilder(book, acceptableSyntaxes, builders);
        this.checkBook(book);
        this.resolveSymbolAndReference(book);
      }
      checkBuilder(book, acceptableSyntaxes, builders = []) {
        acceptableSyntaxes.acceptableSyntaxes.forEach((syntax) => {
          let prefix = "";
          switch (syntax.type) {
            case 2 /* Other */:
              return;
            case 0 /* Block */:
              prefix = "block_";
              break;
            case 1 /* Inline */:
              prefix = "inline_";
              break;
          }
          let funcName1 = prefix + syntax.symbolName;
          let funcName2 = prefix + syntax.symbolName + "_pre";
          builders.forEach((builder) => {
            let func = builder[funcName1] || builder[funcName2];
            if (!func) {
              book.process.error(SyntaxType[syntax.type] + " " + syntax.symbolName + " is not supported in " + builder.name);
            }
          });
        });
      }
      checkBook(book) {
        book.predef.forEach((chunk) => this.checkChunk(chunk));
        book.contents.forEach((chunk) => this.checkChunk(chunk));
        book.appendix.forEach((chunk) => this.checkChunk(chunk));
        book.postdef.forEach((chunk) => this.checkChunk(chunk));
      }
      checkChunk(chunk) {
        visit(chunk.tree.ast, {
          visitDefaultPre: (_node) => {
          },
          visitHeadlinePre: (node) => {
            let results = this.acceptableSyntaxes.find(node);
            if (results.length !== 1) {
              chunk.process.error(t("compile.syntax_definietion_error"), node);
              return;
            }
            return results[0].process(chunk.process, node);
          },
          visitColumnPre: (node) => {
            let results = this.acceptableSyntaxes.find(node);
            if (results.length !== 1) {
              chunk.process.error(t("compile.syntax_definietion_error"), node);
              return;
            }
            return results[0].process(chunk.process, node);
          },
          visitBlockElementPre: (node) => {
            let results = this.acceptableSyntaxes.find(node);
            if (results.length !== 1) {
              chunk.process.error(t("compile.block_not_supported", node.symbol), node);
              return;
            }
            let expects = results[0].argsLength;
            let arg = node.args || [];
            if (expects.indexOf(arg.length) === -1) {
              let expected = expects.map((n) => Number(n).toString()).join(" or ");
              let message = t("compile.args_length_mismatch", expected, arg.length);
              chunk.process.error(message, node);
              return;
            }
            return results[0].process(chunk.process, node);
          },
          visitInlineElementPre: (node) => {
            let results = this.acceptableSyntaxes.find(node);
            if (results.length !== 1) {
              chunk.process.error(t("compile.inline_not_supported", node.symbol), node);
              return;
            }
            return results[0].process(chunk.process, node);
          }
        });
        visit(chunk.tree.ast, {
          visitDefaultPre: (_node) => {
          },
          visitChapterPre: (node) => {
            if (node.level === 1) {
              if (!findChapter(node)) {
                chunk.process.error(t("compile.chapter_not_toplevel"), node);
              }
            } else {
              let parent = findChapter(node.parentNode);
              if (!parent) {
                chunk.process.error(t("compile.chapter_topleve_eq1"), node);
              }
            }
          }
        });
        this.chechBlockGraphTool(chunk);
      }
      chechBlockGraphTool(chunk) {
        visit(chunk.tree.ast, {
          visitDefaultPre: (_node) => {
          },
          visitBlockElementPre: (node) => {
            if (node.symbol !== "graph") {
              return;
            }
            let toolNameNode = node.args[1];
            if (!toolNameNode) {
              return;
            }
            let toolName = nodeContentToString(chunk.process, toolNameNode);
            switch (toolName) {
              case "graphviz":
                break;
              case "gnuplot":
              case "blockdiag":
              case "aafigure":
                chunk.process.info(t("compile.graph_tool_is_not_recommended"), toolNameNode);
                break;
              default:
                chunk.process.error(t("compile.unknown_graph_tool", toolName), toolNameNode);
            }
          }
        });
      }
      resolveSymbolAndReference(book) {
        let symbols = book.allChunks.reduce((p, c) => p.concat(c.process.symbols), []);
        symbols.forEach((symbol) => {
          const referenceTo = symbol.referenceTo;
          if (!referenceTo) {
            return;
          }
          if (!referenceTo.chapter && referenceTo.chapterName) {
            const chapterFileName = `${referenceTo.chapterName}.re`;
            book.allChunks.forEach((chunk) => {
              if (chapterFileName === chunk.name) {
                referenceTo.chapter = chunk;
              }
            });
          }
        });
        symbols.forEach((symbol) => {
          if (symbol.referenceTo && !symbol.referenceTo.referenceNode) {
            let reference = symbol.referenceTo;
            symbols.forEach((symbol2) => {
              if (reference.chapter === symbol2.chapter && reference.targetSymbol === symbol2.symbolName && (reference.label == null || reference.label === symbol2.labelName)) {
                reference.referenceNode = symbol2.node;
              }
            });
            if (!reference.referenceNode) {
              symbol.chapter.process.error(t("compile.reference_is_missing", reference.targetSymbol, reference.label ?? reference.chapterName), symbol.node);
              return;
            }
          }
        });
        symbols.forEach((symbol1) => {
          symbols.forEach((symbol2) => {
            if (symbol1 === symbol2) {
              return;
            }
            if (symbol1.chapter === symbol2.chapter && symbol1.symbolName === symbol2.symbolName) {
              if (symbol1.labelName && symbol2.labelName && symbol1.labelName === symbol2.labelName) {
                if (symbol1.symbolName === "hd") {
                  symbol1.chapter.process.error(t("compile.duplicated_label_headline"), symbol1.node, symbol2.node);
                } else {
                  symbol1.chapter.process.error(t("compile.duplicated_label"), symbol1.node, symbol2.node);
                }
                return;
              }
            }
          });
        });
      }
    };
  }
});

// lib/controller/configRaw.ts
var BookStructure, ContentStructure;
var init_configRaw = __esm({
  "lib/controller/configRaw.ts"() {
    "use strict";
    BookStructure = class _BookStructure {
      // TODO コンストラクタ隠したい
      constructor(predef, contents2, appendix, postdef) {
        this.predef = predef;
        this.contents = contents2;
        this.appendix = appendix;
        this.postdef = postdef;
        this.predef = this.predef || [];
        this.contents = this.contents || [];
        this.appendix = this.appendix || [];
        this.postdef = this.postdef || [];
      }
      static createBook(config) {
        if (!config) {
          return new _BookStructure([], [], [], []);
        }
        let predef = (config.predef || config.PREDEF || []).map((v) => ContentStructure.createChapter(v));
        let contents2 = (config.contents || config.CHAPS || []).map((v) => {
          if (!v) {
            return null;
          }
          if (typeof v === "string") {
            return ContentStructure.createChapter(v);
          } else if (v.chapter) {
            return ContentStructure.createChapter(v.chapter);
          } else if (v.part) {
            return ContentStructure.createPart(v.part);
          } else if (typeof v.file === "string" && v.chapters) {
            return ContentStructure.createPart(v);
          } else if (typeof v.file === "string") {
            return ContentStructure.createChapter(v);
          } else if (typeof v === "object") {
            return ContentStructure.createPart({
              file: Object.keys(v)[0],
              chapters: v[Object.keys(v)[0]].map((c) => ({ file: c }))
            });
          } else {
            return null;
          }
        });
        let appendix = (config.appendix || config.APPENDIX || []).map((v) => ContentStructure.createChapter(v));
        let postdef = (config.postdef || config.POSTDEF || []).map((v) => ContentStructure.createChapter(v));
        return new _BookStructure(predef, contents2, appendix, postdef);
      }
    };
    ContentStructure = class _ContentStructure {
      constructor(part, chapter2) {
        this.part = part;
        this.chapter = chapter2;
      }
      static createChapter(value) {
        if (typeof value === "string") {
          return new _ContentStructure(null, { file: value });
        } else if (value && typeof value.file === "string") {
          return new _ContentStructure(null, value);
        } else {
          return null;
        }
      }
      static createPart(part) {
        if (!part) {
          return null;
        }
        let p = {
          file: part.file,
          chapters: (part.chapters || []).map((c) => typeof c === "string" ? { file: c } : c)
        };
        return new _ContentStructure(p, null);
      }
    };
  }
});

// node_modules/colors/lib/styles.js
var require_styles = __commonJS({
  "node_modules/colors/lib/styles.js"(exports2, module2) {
    var styles = {};
    module2["exports"] = styles;
    var codes = {
      reset: [0, 0],
      bold: [1, 22],
      dim: [2, 22],
      italic: [3, 23],
      underline: [4, 24],
      inverse: [7, 27],
      hidden: [8, 28],
      strikethrough: [9, 29],
      black: [30, 39],
      red: [31, 39],
      green: [32, 39],
      yellow: [33, 39],
      blue: [34, 39],
      magenta: [35, 39],
      cyan: [36, 39],
      white: [37, 39],
      gray: [90, 39],
      grey: [90, 39],
      brightRed: [91, 39],
      brightGreen: [92, 39],
      brightYellow: [93, 39],
      brightBlue: [94, 39],
      brightMagenta: [95, 39],
      brightCyan: [96, 39],
      brightWhite: [97, 39],
      bgBlack: [40, 49],
      bgRed: [41, 49],
      bgGreen: [42, 49],
      bgYellow: [43, 49],
      bgBlue: [44, 49],
      bgMagenta: [45, 49],
      bgCyan: [46, 49],
      bgWhite: [47, 49],
      bgGray: [100, 49],
      bgGrey: [100, 49],
      bgBrightRed: [101, 49],
      bgBrightGreen: [102, 49],
      bgBrightYellow: [103, 49],
      bgBrightBlue: [104, 49],
      bgBrightMagenta: [105, 49],
      bgBrightCyan: [106, 49],
      bgBrightWhite: [107, 49],
      // legacy styles for colors pre v1.0.0
      blackBG: [40, 49],
      redBG: [41, 49],
      greenBG: [42, 49],
      yellowBG: [43, 49],
      blueBG: [44, 49],
      magentaBG: [45, 49],
      cyanBG: [46, 49],
      whiteBG: [47, 49]
    };
    Object.keys(codes).forEach(function(key) {
      var val = codes[key];
      var style = styles[key] = [];
      style.open = "\x1B[" + val[0] + "m";
      style.close = "\x1B[" + val[1] + "m";
    });
  }
});

// node_modules/colors/lib/system/has-flag.js
var require_has_flag = __commonJS({
  "node_modules/colors/lib/system/has-flag.js"(exports2, module2) {
    "use strict";
    module2.exports = function(flag, argv) {
      argv = argv || process.argv;
      var terminatorPos = argv.indexOf("--");
      var prefix = /^-{1,2}/.test(flag) ? "" : "--";
      var pos = argv.indexOf(prefix + flag);
      return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
    };
  }
});

// node_modules/colors/lib/system/supports-colors.js
var require_supports_colors = __commonJS({
  "node_modules/colors/lib/system/supports-colors.js"(exports2, module2) {
    "use strict";
    var os = require("os");
    var hasFlag = require_has_flag();
    var env2 = process.env;
    var forceColor = void 0;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false")) {
      forceColor = false;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = true;
    }
    if ("FORCE_COLOR" in env2) {
      forceColor = env2.FORCE_COLOR.length === 0 || parseInt(env2.FORCE_COLOR, 10) !== 0;
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(stream) {
      if (forceColor === false) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (stream && !stream.isTTY && forceColor !== true) {
        return 0;
      }
      var min = forceColor ? 1 : 0;
      if (process.platform === "win32") {
        var osRelease = os.release().split(".");
        if (Number(process.versions.node.split(".")[0]) >= 8 && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env2) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some(function(sign) {
          return sign in env2;
        }) || env2.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env2) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env2.TEAMCITY_VERSION) ? 1 : 0;
      }
      if ("TERM_PROGRAM" in env2) {
        var version = parseInt((env2.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env2.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Hyper":
            return 3;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env2.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env2.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env2) {
        return 1;
      }
      if (env2.TERM === "dumb") {
        return min;
      }
      return min;
    }
    function getSupportLevel(stream) {
      var level = supportsColor(stream);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: getSupportLevel(process.stdout),
      stderr: getSupportLevel(process.stderr)
    };
  }
});

// node_modules/colors/lib/custom/trap.js
var require_trap = __commonJS({
  "node_modules/colors/lib/custom/trap.js"(exports2, module2) {
    module2["exports"] = function runTheTrap(text2, options) {
      var result = "";
      text2 = text2 || "Run the trap, drop the bass";
      text2 = text2.split("");
      var trap = {
        a: ["@", "\u0104", "\u023A", "\u0245", "\u0394", "\u039B", "\u0414"],
        b: ["\xDF", "\u0181", "\u0243", "\u026E", "\u03B2", "\u0E3F"],
        c: ["\xA9", "\u023B", "\u03FE"],
        d: ["\xD0", "\u018A", "\u0500", "\u0501", "\u0502", "\u0503"],
        e: [
          "\xCB",
          "\u0115",
          "\u018E",
          "\u0258",
          "\u03A3",
          "\u03BE",
          "\u04BC",
          "\u0A6C"
        ],
        f: ["\u04FA"],
        g: ["\u0262"],
        h: ["\u0126", "\u0195", "\u04A2", "\u04BA", "\u04C7", "\u050A"],
        i: ["\u0F0F"],
        j: ["\u0134"],
        k: ["\u0138", "\u04A0", "\u04C3", "\u051E"],
        l: ["\u0139"],
        m: ["\u028D", "\u04CD", "\u04CE", "\u0520", "\u0521", "\u0D69"],
        n: ["\xD1", "\u014B", "\u019D", "\u0376", "\u03A0", "\u048A"],
        o: [
          "\xD8",
          "\xF5",
          "\xF8",
          "\u01FE",
          "\u0298",
          "\u047A",
          "\u05DD",
          "\u06DD",
          "\u0E4F"
        ],
        p: ["\u01F7", "\u048E"],
        q: ["\u09CD"],
        r: ["\xAE", "\u01A6", "\u0210", "\u024C", "\u0280", "\u042F"],
        s: ["\xA7", "\u03DE", "\u03DF", "\u03E8"],
        t: ["\u0141", "\u0166", "\u0373"],
        u: ["\u01B1", "\u054D"],
        v: ["\u05D8"],
        w: ["\u0428", "\u0460", "\u047C", "\u0D70"],
        x: ["\u04B2", "\u04FE", "\u04FC", "\u04FD"],
        y: ["\xA5", "\u04B0", "\u04CB"],
        z: ["\u01B5", "\u0240"]
      };
      text2.forEach(function(c) {
        c = c.toLowerCase();
        var chars = trap[c] || [" "];
        var rand = Math.floor(Math.random() * chars.length);
        if (typeof trap[c] !== "undefined") {
          result += trap[c][rand];
        } else {
          result += c;
        }
      });
      return result;
    };
  }
});

// node_modules/colors/lib/custom/zalgo.js
var require_zalgo = __commonJS({
  "node_modules/colors/lib/custom/zalgo.js"(exports2, module2) {
    module2["exports"] = function zalgo(text2, options) {
      text2 = text2 || "   he is here   ";
      var soul = {
        "up": [
          "\u030D",
          "\u030E",
          "\u0304",
          "\u0305",
          "\u033F",
          "\u0311",
          "\u0306",
          "\u0310",
          "\u0352",
          "\u0357",
          "\u0351",
          "\u0307",
          "\u0308",
          "\u030A",
          "\u0342",
          "\u0313",
          "\u0308",
          "\u034A",
          "\u034B",
          "\u034C",
          "\u0303",
          "\u0302",
          "\u030C",
          "\u0350",
          "\u0300",
          "\u0301",
          "\u030B",
          "\u030F",
          "\u0312",
          "\u0313",
          "\u0314",
          "\u033D",
          "\u0309",
          "\u0363",
          "\u0364",
          "\u0365",
          "\u0366",
          "\u0367",
          "\u0368",
          "\u0369",
          "\u036A",
          "\u036B",
          "\u036C",
          "\u036D",
          "\u036E",
          "\u036F",
          "\u033E",
          "\u035B",
          "\u0346",
          "\u031A"
        ],
        "down": [
          "\u0316",
          "\u0317",
          "\u0318",
          "\u0319",
          "\u031C",
          "\u031D",
          "\u031E",
          "\u031F",
          "\u0320",
          "\u0324",
          "\u0325",
          "\u0326",
          "\u0329",
          "\u032A",
          "\u032B",
          "\u032C",
          "\u032D",
          "\u032E",
          "\u032F",
          "\u0330",
          "\u0331",
          "\u0332",
          "\u0333",
          "\u0339",
          "\u033A",
          "\u033B",
          "\u033C",
          "\u0345",
          "\u0347",
          "\u0348",
          "\u0349",
          "\u034D",
          "\u034E",
          "\u0353",
          "\u0354",
          "\u0355",
          "\u0356",
          "\u0359",
          "\u035A",
          "\u0323"
        ],
        "mid": [
          "\u0315",
          "\u031B",
          "\u0300",
          "\u0301",
          "\u0358",
          "\u0321",
          "\u0322",
          "\u0327",
          "\u0328",
          "\u0334",
          "\u0335",
          "\u0336",
          "\u035C",
          "\u035D",
          "\u035E",
          "\u035F",
          "\u0360",
          "\u0362",
          "\u0338",
          "\u0337",
          "\u0361",
          " \u0489"
        ]
      };
      var all = [].concat(soul.up, soul.down, soul.mid);
      function randomNumber(range) {
        var r = Math.floor(Math.random() * range);
        return r;
      }
      function isChar(character) {
        var bool = false;
        all.filter(function(i) {
          bool = i === character;
        });
        return bool;
      }
      function heComes(text3, options2) {
        var result = "";
        var counts;
        var l;
        options2 = options2 || {};
        options2["up"] = typeof options2["up"] !== "undefined" ? options2["up"] : true;
        options2["mid"] = typeof options2["mid"] !== "undefined" ? options2["mid"] : true;
        options2["down"] = typeof options2["down"] !== "undefined" ? options2["down"] : true;
        options2["size"] = typeof options2["size"] !== "undefined" ? options2["size"] : "maxi";
        text3 = text3.split("");
        for (l in text3) {
          if (isChar(l)) {
            continue;
          }
          result = result + text3[l];
          counts = { "up": 0, "down": 0, "mid": 0 };
          switch (options2.size) {
            case "mini":
              counts.up = randomNumber(8);
              counts.mid = randomNumber(2);
              counts.down = randomNumber(8);
              break;
            case "maxi":
              counts.up = randomNumber(16) + 3;
              counts.mid = randomNumber(4) + 1;
              counts.down = randomNumber(64) + 3;
              break;
            default:
              counts.up = randomNumber(8) + 1;
              counts.mid = randomNumber(6) / 2;
              counts.down = randomNumber(8) + 1;
              break;
          }
          var arr = ["up", "mid", "down"];
          for (var d in arr) {
            var index = arr[d];
            for (var i = 0; i <= counts[index]; i++) {
              if (options2[index]) {
                result = result + soul[index][randomNumber(soul[index].length)];
              }
            }
          }
        }
        return result;
      }
      return heComes(text2, options);
    };
  }
});

// node_modules/colors/lib/maps/america.js
var require_america = __commonJS({
  "node_modules/colors/lib/maps/america.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      return function(letter, i, exploded) {
        if (letter === " ") return letter;
        switch (i % 3) {
          case 0:
            return colors.red(letter);
          case 1:
            return colors.white(letter);
          case 2:
            return colors.blue(letter);
        }
      };
    };
  }
});

// node_modules/colors/lib/maps/zebra.js
var require_zebra = __commonJS({
  "node_modules/colors/lib/maps/zebra.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      return function(letter, i, exploded) {
        return i % 2 === 0 ? letter : colors.inverse(letter);
      };
    };
  }
});

// node_modules/colors/lib/maps/rainbow.js
var require_rainbow = __commonJS({
  "node_modules/colors/lib/maps/rainbow.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      var rainbowColors = ["red", "yellow", "green", "blue", "magenta"];
      return function(letter, i, exploded) {
        if (letter === " ") {
          return letter;
        } else {
          return colors[rainbowColors[i++ % rainbowColors.length]](letter);
        }
      };
    };
  }
});

// node_modules/colors/lib/maps/random.js
var require_random = __commonJS({
  "node_modules/colors/lib/maps/random.js"(exports2, module2) {
    module2["exports"] = function(colors) {
      var available = [
        "underline",
        "inverse",
        "grey",
        "yellow",
        "red",
        "green",
        "blue",
        "white",
        "cyan",
        "magenta",
        "brightYellow",
        "brightRed",
        "brightGreen",
        "brightBlue",
        "brightWhite",
        "brightCyan",
        "brightMagenta"
      ];
      return function(letter, i, exploded) {
        return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 2))]](letter);
      };
    };
  }
});

// node_modules/colors/lib/colors.js
var require_colors = __commonJS({
  "node_modules/colors/lib/colors.js"(exports2, module2) {
    var colors = {};
    module2["exports"] = colors;
    colors.themes = {};
    var util = require("util");
    var ansiStyles = colors.styles = require_styles();
    var defineProps = Object.defineProperties;
    var newLineRegex = new RegExp(/[\r\n]+/g);
    colors.supportsColor = require_supports_colors().supportsColor;
    if (typeof colors.enabled === "undefined") {
      colors.enabled = colors.supportsColor() !== false;
    }
    colors.enable = function() {
      colors.enabled = true;
    };
    colors.disable = function() {
      colors.enabled = false;
    };
    colors.stripColors = colors.strip = function(str) {
      return ("" + str).replace(/\x1B\[\d+m/g, "");
    };
    var stylize = colors.stylize = function stylize2(str, style) {
      if (!colors.enabled) {
        return str + "";
      }
      var styleMap = ansiStyles[style];
      if (!styleMap && style in colors) {
        return colors[style](str);
      }
      return styleMap.open + str + styleMap.close;
    };
    var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
    var escapeStringRegexp = function(str) {
      if (typeof str !== "string") {
        throw new TypeError("Expected a string");
      }
      return str.replace(matchOperatorsRe, "\\$&");
    };
    function build(_styles) {
      var builder = function builder2() {
        return applyStyle.apply(builder2, arguments);
      };
      builder._styles = _styles;
      builder.__proto__ = proto;
      return builder;
    }
    var styles = function() {
      var ret = {};
      ansiStyles.grey = ansiStyles.gray;
      Object.keys(ansiStyles).forEach(function(key) {
        ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), "g");
        ret[key] = {
          get: function() {
            return build(this._styles.concat(key));
          }
        };
      });
      return ret;
    }();
    var proto = defineProps(function colors2() {
    }, styles);
    function applyStyle() {
      var args = Array.prototype.slice.call(arguments);
      var str = args.map(function(arg) {
        if (arg != null && arg.constructor === String) {
          return arg;
        } else {
          return util.inspect(arg);
        }
      }).join(" ");
      if (!colors.enabled || !str) {
        return str;
      }
      var newLinesPresent = str.indexOf("\n") != -1;
      var nestedStyles = this._styles;
      var i = nestedStyles.length;
      while (i--) {
        var code = ansiStyles[nestedStyles[i]];
        str = code.open + str.replace(code.closeRe, code.open) + code.close;
        if (newLinesPresent) {
          str = str.replace(newLineRegex, function(match) {
            return code.close + match + code.open;
          });
        }
      }
      return str;
    }
    colors.setTheme = function(theme) {
      if (typeof theme === "string") {
        console.log("colors.setTheme now only accepts an object, not a string.  If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
        return;
      }
      for (var style in theme) {
        (function(style2) {
          colors[style2] = function(str) {
            if (typeof theme[style2] === "object") {
              var out = str;
              for (var i in theme[style2]) {
                out = colors[theme[style2][i]](out);
              }
              return out;
            }
            return colors[theme[style2]](str);
          };
        })(style);
      }
    };
    function init() {
      var ret = {};
      Object.keys(styles).forEach(function(name) {
        ret[name] = {
          get: function() {
            return build([name]);
          }
        };
      });
      return ret;
    }
    var sequencer = function sequencer2(map2, str) {
      var exploded = str.split("");
      exploded = exploded.map(map2);
      return exploded.join("");
    };
    colors.trap = require_trap();
    colors.zalgo = require_zalgo();
    colors.maps = {};
    colors.maps.america = require_america()(colors);
    colors.maps.zebra = require_zebra()(colors);
    colors.maps.rainbow = require_rainbow()(colors);
    colors.maps.random = require_random()(colors);
    for (map in colors.maps) {
      (function(map2) {
        colors[map2] = function(str) {
          return sequencer(colors.maps[map2], str);
        };
      })(map);
    }
    var map;
    defineProps(colors, init());
  }
});

// node_modules/colors/lib/extendStringPrototype.js
var require_extendStringPrototype = __commonJS({
  "node_modules/colors/lib/extendStringPrototype.js"(exports2, module2) {
    var colors = require_colors();
    module2["exports"] = function() {
      var addProperty = function(color, func) {
        String.prototype.__defineGetter__(color, func);
      };
      addProperty("strip", function() {
        return colors.strip(this);
      });
      addProperty("stripColors", function() {
        return colors.strip(this);
      });
      addProperty("trap", function() {
        return colors.trap(this);
      });
      addProperty("zalgo", function() {
        return colors.zalgo(this);
      });
      addProperty("zebra", function() {
        return colors.zebra(this);
      });
      addProperty("rainbow", function() {
        return colors.rainbow(this);
      });
      addProperty("random", function() {
        return colors.random(this);
      });
      addProperty("america", function() {
        return colors.america(this);
      });
      var x = Object.keys(colors.styles);
      x.forEach(function(style) {
        addProperty(style, function() {
          return colors.stylize(this, style);
        });
      });
      function applyTheme(theme) {
        var stringPrototypeBlacklist = [
          "__defineGetter__",
          "__defineSetter__",
          "__lookupGetter__",
          "__lookupSetter__",
          "charAt",
          "constructor",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "toLocaleString",
          "toString",
          "valueOf",
          "charCodeAt",
          "indexOf",
          "lastIndexOf",
          "length",
          "localeCompare",
          "match",
          "repeat",
          "replace",
          "search",
          "slice",
          "split",
          "substring",
          "toLocaleLowerCase",
          "toLocaleUpperCase",
          "toLowerCase",
          "toUpperCase",
          "trim",
          "trimLeft",
          "trimRight"
        ];
        Object.keys(theme).forEach(function(prop) {
          if (stringPrototypeBlacklist.indexOf(prop) !== -1) {
            console.log("warn: ".red + ("String.prototype" + prop).magenta + " is probably something you don't want to override.  Ignoring style name");
          } else {
            if (typeof theme[prop] === "string") {
              colors[prop] = colors[theme[prop]];
              addProperty(prop, function() {
                return colors[prop](this);
              });
            } else {
              var themePropApplicator = function(str) {
                var ret = str || this;
                for (var t2 = 0; t2 < theme[prop].length; t2++) {
                  ret = colors[theme[prop][t2]](ret);
                }
                return ret;
              };
              addProperty(prop, themePropApplicator);
              colors[prop] = function(str) {
                return themePropApplicator(str);
              };
            }
          }
        });
      }
      colors.setTheme = function(theme) {
        if (typeof theme === "string") {
          console.log("colors.setTheme now only accepts an object, not a string. If you are trying to set a theme from a file, it is now your (the caller's) responsibility to require the file.  The old syntax looked like colors.setTheme(__dirname + '/../themes/generic-logging.js'); The new syntax looks like colors.setTheme(require(__dirname + '/../themes/generic-logging.js'));");
          return;
        } else {
          applyTheme(theme);
        }
      };
    };
  }
});

// node_modules/colors/lib/index.js
var require_lib = __commonJS({
  "node_modules/colors/lib/index.js"(exports2, module2) {
    var colors = require_colors();
    module2["exports"] = colors;
    require_extendStringPrototype()();
  }
});

// lib/controller/config.ts
var Config, NodeJSConfig, WebBrowserConfig;
var init_config = __esm({
  "lib/controller/config.ts"() {
    "use strict";
    init_builder();
    init_configRaw();
    init_compilerModel();
    init_analyzer();
    init_validator();
    init_utils2();
    Config = class {
      constructor(original) {
        this.original = original;
      }
      get isDraft() {
        return false;
      }
      get read() {
        throw new Error("please implements this method");
      }
      get write() {
        throw new Error("please implements this method");
      }
      get exists() {
        throw new Error("please implements this method");
      }
      get analyzer() {
        return this.original.analyzer || new DefaultAnalyzer();
      }
      get validators() {
        let config = this.original;
        if (!config.validators || config.validators.length === 0) {
          return [new DefaultValidator()];
        } else if (!Array.isArray(config.validators)) {
          return [config.validators];
        } else {
          return config.validators;
        }
      }
      get builders() {
        if (this._builders) {
          return this._builders;
        }
        let config = this.original;
        if (!config.builders || config.builders.length === 0) {
          this._builders = [new DefaultBuilder()];
        } else if (!Array.isArray(config.builders)) {
          this._builders = [config.builders];
        } else {
          this._builders = config.builders;
        }
        return this._builders;
      }
      get listener() {
        throw new Error("please implements this method");
      }
      get book() {
        if (!this._bookStructure) {
          this._bookStructure = BookStructure.createBook(this.original.book);
        }
        return this._bookStructure;
      }
      resolvePath(_path) {
        throw new Error("please implements this method");
      }
    };
    NodeJSConfig = class extends Config {
      constructor(options, original) {
        super(original);
        this.options = options;
        this.original = original;
      }
      get isDraft() {
        return this.options.draft ?? false;
      }
      get read() {
        return this.original.read || IO.read;
      }
      get write() {
        return this.original.write || IO.write;
      }
      get exists() {
        return (path) => {
          let fs = require("fs");
          let _path = require("path");
          let basePath = this.original.basePath || __dirname;
          let promise = new Promise((resolve) => {
            fs.exists(_path.resolve(basePath, path), (result) => {
              resolve({ path, result });
            });
          });
          return promise;
        };
      }
      get listener() {
        if (this._listener) {
          return this._listener;
        }
        let listener = this.original.listener || {};
        listener.onAcceptables = listener.onAcceptables || (() => {
        });
        listener.onSymbols = listener.onSymbols || (() => {
        });
        listener.onReports = listener.onReports || ((b) => this.onReports(b));
        listener.onCompileSuccess = listener.onCompileSuccess || ((b) => this.onCompileSuccess(b));
        listener.onCompileFailed = listener.onCompileFailed || (() => this.onCompileFailed());
        this._listener = listener;
        return this._listener;
      }
      onReports(reports) {
        let colors = require_lib();
        colors.setTheme({
          info: "cyan",
          warn: "yellow",
          error: "red"
        });
        reports.forEach((report) => {
          let message = "";
          if (report.chapter) {
            message += report.chapter.name + " ";
          }
          if (report.nodes) {
            report.nodes.forEach((node) => {
              message += "[" + node.location.start.line + "," + node.location.start.column + "] ";
            });
          }
          message += report.message;
          if (report.level === 2 /* Error */) {
            console.warn(message.error);
          } else if (report.level === 1 /* Warning */) {
            console.error(message.warn);
          } else if (report.level === 0 /* Info */) {
            console.info(message.info);
          } else {
            throw new Error("unknown report level.");
          }
        });
      }
      onCompileSuccess(_book) {
        if (!this.options?.inproc) {
          process.exit(0);
        }
      }
      onCompileFailed() {
        if (!this.options?.inproc) {
          process.exit(1);
        }
      }
      resolvePath(path) {
        let p = require("path");
        let base = this.options.base || "./";
        return p.join(base, path);
      }
    };
    WebBrowserConfig = class extends Config {
      constructor(options, original) {
        super(original);
        this.options = options;
        this.original = original;
      }
      get isDraft() {
        return this.options.draft ?? false;
      }
      get read() {
        return this.original.read || (() => {
          throw new Error("please implement config.read method");
        });
      }
      get write() {
        return this.original.write || (() => {
          throw new Error("please implement config.write method");
        });
      }
      get exists() {
        return (path) => {
          if (window.location.protocol === "file:") {
            return this._existsFileScheme(path);
          } else {
            return this._existsHttpScheme(path);
          }
        };
      }
      _existsFileScheme(_path) {
        let promise = new Promise((resolve) => {
          let canvas = document.createElement("canvas");
          canvas.width = 200;
          canvas.height = 14;
          let ctx = canvas.getContext("2d");
          ctx.fillText("file://\u3067\u306F\u753B\u50CF\u306E\u5B58\u5728\u30C1\u30A7\u30C3\u30AF\u304C\u3067\u304D\u307E\u305B\u3093", 2, 10);
          let dataUrl = canvas.toDataURL();
          resolve({ path: dataUrl, result: true });
        });
        return promise;
      }
      _existsHttpScheme(path) {
        let promise = new Promise((resolve) => {
          try {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 304) {
                  resolve({ path, result: true });
                } else {
                  resolve({ path, result: false });
                }
              }
            };
            xhr.open("GET", path);
            xhr.setRequestHeader("If-Modified-Since", (/* @__PURE__ */ new Date()).toUTCString());
            xhr.send();
          } catch (e) {
            if (e instanceof DOMException) {
              let de = e;
              console.log(de.message);
            }
            resolve({ path, result: false });
          }
        });
        return promise;
      }
      get listener() {
        if (this._listener) {
          return this._listener;
        }
        let listener = this.original.listener || {};
        listener.onAcceptables = listener.onAcceptables || (() => {
        });
        listener.onSymbols = listener.onSymbols || (() => {
        });
        listener.onReports = listener.onReports || this.onReports;
        listener.onCompileSuccess = listener.onCompileSuccess || this.onCompileSuccess;
        listener.onCompileFailed = listener.onCompileFailed || this.onCompileFailed;
        this._listener = listener;
        return this._listener;
      }
      onReports(reports) {
        reports.forEach((report) => {
          let message = "";
          if (report.chapter) {
            message += report.chapter.name + " ";
          }
          if (report.nodes) {
            report.nodes.forEach((node) => {
              message += "[" + node.location.start.line + "," + node.location.start.column + "] ";
            });
          }
          message += report.message;
          if (report.level === 2 /* Error */) {
            console.warn(message);
          } else if (report.level === 1 /* Warning */) {
            console.error(message);
          } else if (report.level === 0 /* Info */) {
            console.info(message);
          } else {
            throw new Error("unknown report level.");
          }
        });
      }
      onCompileSuccess(_book) {
      }
      onCompileFailed(_book) {
      }
      resolvePath(path) {
        if (!this.options.base) {
          return path;
        }
        let base = this.options.base;
        if (!this.endWith(base, "/") && !this.startWith(path, "/")) {
          base += "/";
        }
        return base + path;
      }
      startWith(str, target) {
        return str.indexOf(target) === 0;
      }
      endWith(str, target) {
        return str.indexOf(target, str.length - target.length) !== -1;
      }
    };
  }
});

// lib/parser/preprocessor.ts
var SyntaxPreprocessor;
var init_preprocessor = __esm({
  "lib/parser/preprocessor.ts"() {
    "use strict";
    init_parser();
    init_walker();
    init_utils2();
    SyntaxPreprocessor = class {
      start(book) {
        this.acceptableSyntaxes = book.acceptableSyntaxes;
        book.predef.forEach((chunk) => this.preprocessChunk(chunk));
        book.contents.forEach((chunk) => this.preprocessChunk(chunk));
        book.appendix.forEach((chunk) => this.preprocessChunk(chunk));
        book.postdef.forEach((chunk) => this.preprocessChunk(chunk));
      }
      preprocessChunk(chunk) {
        visit(chunk.tree.ast, {
          visitDefaultPre: (_node) => {
          },
          visitColumnPre: (node) => {
            this.preprocessColumnSyntax(chunk, node);
          },
          visitBlockElementPre: (node) => {
            this.preprocessBlockSyntax(chunk, node);
          }
        });
        chunk.nodes.forEach((chunk2) => this.preprocessChunk(chunk2));
      }
      /**
       * コラム記法を組み替える。
       * コラムの中ではHeadlineが使えるが、コラム自体の見出しレベルより深いレベルのHeadlineしか許可されない。
       * そのため、コラム自体より浅いレベルの見出しレベルを見つけたらコラム内から脱出させる。
       * @param chunk
       * @param column
       */
      preprocessColumnSyntax(chunk, column2) {
        function reconstruct2(parent, target, to = column2.parentNode.toChapter()) {
          if (target.level <= to.level) {
            reconstruct2(parent.parentNode.toNode(), target, to.parentNode.toChapter());
            return;
          }
          to.childNodes.splice(to.childNodes.indexOf(parent) + 1, 0, target);
          column2.text.splice(column2.text.indexOf(target), 1);
        }
        visit(column2, {
          visitDefaultPre: (_node) => {
          },
          visitColumnPre: (_node) => {
          },
          visitChapterPre: (node) => {
            if (column2.level < node.headline.level) {
              return;
            }
            reconstruct2(column2, node);
          }
        });
        visit(chunk.tree.ast, {
          visitDefaultPre: (ast, parent) => {
            ast.parentNode = parent;
          }
        });
        visit(chunk.tree.ast, {
          visitDefaultPre: (_ast, _parent) => {
          },
          visitChapterPre: (ast) => {
            ast.text.forEach((node, i, nodes) => {
              node.prev = nodes[i - 1];
              node.next = nodes[i + 1];
            });
          },
          visitColumnPre: (ast) => {
            ast.text.forEach((node, i, nodes) => {
              node.prev = nodes[i - 1];
              node.next = nodes[i + 1];
            });
          },
          visitNodePre: (ast) => {
            ast.childNodes.forEach((node, i, nodes) => {
              node.prev = nodes[i - 1];
              node.next = nodes[i + 1];
            });
          }
        });
      }
      /**
       * ブロック記法の中身を組み替える。
       * ブロック記法は 1. 全ての記法を許可 2. インライン記法のみ許可 3. 全てを許可しない の3パターンの組み換えがある。
       * @param chapter
       * @param node
       */
      preprocessBlockSyntax(chunk, node) {
        if (node.childNodes.length === 0) {
          return;
        }
        let syntaxes = this.acceptableSyntaxes.find(node);
        if (syntaxes.length !== 1) {
          return;
        }
        let syntax = syntaxes[0];
        if (syntax.allowFullySyntax) {
          return;
        } else if (syntax.allowInline) {
          let info = null;
          let resultNodes = [];
          let lastNode = null;
          visit(node.childNodes[0], {
            visitDefaultPre: (node2) => {
              if (node2.ruleName === 24 /* InlineElementContents */ || node2.ruleName === 25 /* InlineElementContent */ || node2.ruleName === 26 /* InlineElementContentText */) {
                return;
              }
              if (!info) {
                info = {
                  offset: node2.location.start.offset,
                  line: node2.location.start.line,
                  column: node2.location.start.column
                };
              }
              lastNode = node2;
            },
            visitInlineElementPre: (node2) => {
              let textNode = new TextNodeSyntaxTree({
                syntax: "BlockElementContentText",
                location: {
                  start: {
                    offset: info?.offset ?? node2.location.start.offset,
                    line: info?.line ?? node2.location.start.line,
                    column: info?.column ?? node2.location.start.column
                  },
                  end: {
                    offset: node2.location.start.offset,
                    line: void 0,
                    column: void 0
                  }
                },
                // @<br>{} などは info がない
                text: info?.offset == null ? "" : chunk.process.input.substring(info.offset, node2.location.start.offset)
              });
              if (textNode.text.length > 0) {
                resultNodes.push(textNode);
              }
              resultNodes.push(node2);
              info = null;
              lastNode = node2;
            },
            visitSingleLineCommentPre: (node2) => {
              if (!info) {
                lastNode = node2;
                return;
              }
              let textNode = new TextNodeSyntaxTree({
                syntax: "BlockElementContentText",
                location: {
                  start: {
                    offset: info.offset,
                    line: info.line,
                    column: info.column
                  },
                  end: {
                    offset: node2.location.start.offset,
                    line: void 0,
                    column: void 0
                  }
                },
                text: chunk.process.input.substring(info.offset, node2.location.start.offset)
              });
              if (textNode.text) {
                resultNodes.push(textNode);
              }
              info = null;
              lastNode = node2;
            }
          });
          if (info) {
            let textNode = new TextNodeSyntaxTree({
              syntax: "BlockElementContentText",
              location: {
                start: {
                  offset: info.offset,
                  line: info.line,
                  column: info.column
                },
                end: {
                  offset: node.location.start.offset,
                  line: void 0,
                  column: void 0
                }
              },
              text: chunk.process.input.substring(info.offset, lastNode.location.end.offset)
            });
            if (textNode.text.length > 0) {
              resultNodes.push(textNode);
            }
          }
          node.childNodes = resultNodes;
        } else {
          let first = node.childNodes[0];
          let last = node.childNodes[node.childNodes.length - 1];
          let textNode = new TextNodeSyntaxTree({
            syntax: "BlockElementContentText",
            location: {
              start: {
                offset: first.location.start.offset,
                line: first.location.start.line,
                column: first.location.start.column
              },
              end: {
                offset: last.location.start.offset,
                line: void 0,
                column: void 0
              }
            },
            text: nodeContentToString(chunk.process, node)
          });
          node.childNodes = [textNode];
        }
      }
    };
  }
});

// lib/controller/controller.ts
var controller_exports = {};
__export(controller_exports, {
  Controller: () => Controller
});
var PEG2, Controller;
var init_controller = __esm({
  "lib/controller/controller.ts"() {
    "use strict";
    PEG2 = __toESM(require_grammar());
    init_compilerModel();
    init_parser();
    init_config();
    init_configRaw();
    init_parser();
    init_preprocessor();
    init_textBuilder();
    init_htmlBuilder();
    init_walker();
    init_utils2();
    Controller = class {
      constructor(options = {}) {
        this.options = options;
        this.builders = { TextBuilder, HtmlBuilder };
      }
      /**
       * 設定の初期化を行う。
       * 通常、 ReVIEW.start 経由で呼び出される。
       * @param data
       */
      initConfig(data) {
        if (isNodeJS()) {
          this.config = new NodeJSConfig(this.options, data);
        } else {
          this.config = new WebBrowserConfig(this.options, data);
        }
      }
      process() {
        return Promise.resolve(new Book2(this.config)).then((book) => this.acceptableSyntaxes(book)).then((book) => this.toContentChunk(book)).then((book) => this.readReVIEWFiles(book)).then((book) => this.parseContent(book)).then((book) => this.preprocessContent(book)).then((book) => this.processContent(book)).then((book) => this.writeContent(book)).then((book) => this.compileFinished(book)).catch((err) => this.handleError(err));
      }
      acceptableSyntaxes(book) {
        book.acceptableSyntaxes = book.config.analyzer.getAcceptableSyntaxes();
        if (book.config.listener.onAcceptables(book.acceptableSyntaxes) === false) {
          book.config.listener.onCompileFailed();
          return Promise.reject(null);
        }
        return Promise.resolve(book);
      }
      toContentChunk(book) {
        let convert = (c, parent) => {
          let chunk = null;
          if (c.part) {
            chunk = new ContentChunk(book, c.part.file);
            c.part.chapters.forEach((c2) => {
              convert(ContentStructure.createChapter(c2), chunk);
            });
          } else if (c.chapter) {
            chunk = new ContentChunk(book, parent, c.chapter.file);
          } else {
            return null;
          }
          if (parent) {
            parent.nodes.push(chunk);
          }
          return chunk;
        };
        book.predef = this.config.book.predef.map((c) => convert(c));
        book.contents = this.config.book.contents.map((c) => convert(c));
        book.appendix = this.config.book.appendix.map((c) => convert(c));
        book.postdef = this.config.book.postdef.map((c) => convert(c));
        return book;
      }
      readReVIEWFiles(book) {
        let promises = [];
        let read = (chunk) => {
          let resolvedPath = book.config.resolvePath(chunk.name);
          promises.push(book.config.read(resolvedPath).then((input) => chunk.input = input));
          chunk.nodes.forEach((chunk2) => read(chunk2));
        };
        book.predef.forEach((chunk) => read(chunk));
        book.contents.forEach((chunk) => read(chunk));
        book.appendix.forEach((chunk) => read(chunk));
        book.postdef.forEach((chunk) => read(chunk));
        return Promise.all(promises).then(() => book);
      }
      parseContent(book) {
        let _parse = (chunk) => {
          try {
            chunk.tree = parse2(chunk.input);
          } catch (e) {
            if (!(e instanceof PEG2.SyntaxError)) {
              throw e;
            }
            let se = e;
            let errorNode = new SyntaxTree2({
              syntax: se.name,
              location: {
                start: {
                  line: se.line,
                  column: se.column,
                  offset: se.offset
                },
                end: void 0
                // TODO SyntaxError が置き換えられたらなんとかできるかも…
              }
            });
            chunk.tree = { ast: errorNode, cst: null };
          }
          chunk.nodes.forEach((chunk2) => _parse(chunk2));
        };
        book.predef.forEach((chunk) => _parse(chunk));
        book.contents.forEach((chunk) => _parse(chunk));
        book.appendix.forEach((chunk) => _parse(chunk));
        book.postdef.forEach((chunk) => _parse(chunk));
        return book;
      }
      preprocessContent(book) {
        let numberingChapter = (chunk, counter) => {
          let chapters = [];
          visit(chunk.tree.ast, {
            visitDefaultPre: (_node) => {
            },
            visitChapterPre: (node) => {
              chapters.push(node);
            }
          });
          let max = 0;
          let currentLevel = 1;
          chapters.forEach((chapter2) => {
            let level = chapter2.headline.level;
            max = Math.max(max, level);
            let i;
            if (currentLevel > level) {
              for (i = level + 1; i <= max; i++) {
                counter[i] = 0;
              }
            } else if (currentLevel < level) {
              for (i = level; i <= max; i++) {
                counter[i] = 0;
              }
            }
            currentLevel = level;
            counter[level] = (counter[level] || 0) + 1;
            chapter2.no = counter[level];
          });
          chunk.no = counter[1];
          chunk.nodes.forEach((chunk2) => numberingChapter(chunk2, counter));
        };
        let numberingChapters = (chunks, counter = {}) => {
          chunks.forEach((chunk) => numberingChapter(chunk, counter));
        };
        numberingChapters(book.predef);
        numberingChapters(book.contents);
        numberingChapters(book.appendix);
        numberingChapters(book.postdef);
        let preprocessor = new SyntaxPreprocessor();
        preprocessor.start(book);
        return book;
      }
      processContent(book) {
        book.config.validators.forEach((validator) => {
          validator.start(book, book.acceptableSyntaxes, this.config.builders);
        });
        if (book.reports.some((report) => report.level === 2 /* Error */)) {
          return Promise.resolve(book);
        }
        let symbols = book.allChunks.reduce((p, c) => p.concat(c.process.symbols), []);
        if (this.config.listener.onSymbols(symbols) === false) {
          return Promise.resolve(book);
        }
        return Promise.all(this.config.builders.map((builder) => builder.init(book))).then(() => book);
      }
      writeContent(book) {
        let promises = [];
        let write = (chunk) => {
          chunk.builderProcesses.forEach((process2) => {
            let baseName = chunk.name.substr(0, chunk.name.lastIndexOf(".re"));
            let fileName = baseName + "." + process2.builder.extention;
            promises.push(this.config.write(fileName, process2.result));
          });
          chunk.nodes.forEach((chunk2) => write(chunk2));
        };
        book.predef.forEach((chunk) => write(chunk));
        book.contents.forEach((chunk) => write(chunk));
        book.appendix.forEach((chunk) => write(chunk));
        book.postdef.forEach((chunk) => write(chunk));
        return Promise.all(promises).then(() => book);
      }
      compileFinished(book) {
        book.config.listener.onReports(book.reports);
        if (!book.hasError) {
          book.config.listener.onCompileSuccess(book);
        } else {
          book.config.listener.onCompileFailed(book);
        }
        return book;
      }
      handleError(err) {
        console.error("unexpected error", err);
        if (err && err.stack) {
          console.error(err.stack);
        }
        return Promise.reject(err);
      }
    };
  }
});

// lib/index.ts
function start(setup3, options) {
  "use strict";
  let controller = new Controller(options);
  setup3(controller);
  return controller.process();
}
var init_lib = __esm({
  "lib/index.ts"() {
    "use strict";
    init_compilerModel();
    init_controller();
    init_parser();
    init_parser();
    init_analyzer();
    init_validator();
    init_builder();
    init_htmlBuilder();
    init_textBuilder();
    init_analyzer();
  }
});

// lib/utils/utils.ts
function isBrowser() {
  "use strict";
  return typeof window !== "undefined";
}
function isNodeJS() {
  "use strict";
  if (typeof atom !== "undefined") {
    return true;
  }
  return !isBrowser() && !isAMD() && typeof exports === "object";
}
function isAMD() {
  "use strict";
  return typeof define === "function" && define.amd;
}
function nodeContentToString(process2, node, textOnly) {
  "use strict";
  let minPos = Number.MAX_VALUE;
  let maxPos = -1;
  let childVisitor = {
    visitDefaultPre: (node2) => {
      minPos = Math.min(minPos, node2.location.start.offset);
      maxPos = Math.max(maxPos, node2.location.end.offset);
    }
  };
  let visitor = null;
  visitor = {
    visitDefaultPre: (_node) => {
    },
    visitNodePre: (node2) => {
      node2.childNodes.forEach((child) => visit(child, textOnly ? visitor : childVisitor));
      return false;
    },
    visitHeadlinePre: (node2) => {
      visit(node2.caption, childVisitor);
      return false;
    },
    visitUlistPre: (node2) => {
      visit(node2.text, childVisitor);
      return false;
    },
    visitDlistPre: (node2) => {
      visit(node2.text, childVisitor);
      visit(node2.content, childVisitor);
      return false;
    },
    visitOlistPre: (node2) => {
      visit(node2.text, childVisitor);
      return false;
    },
    visitTextPre: (text2) => {
      visit(textOnly ? text2 : node, childVisitor);
      return false;
    }
  };
  visit(node, visitor);
  if (maxPos < 0) {
    return "";
  } else {
    return process2.input.substring(minPos, maxPos);
  }
}
function findUp(node, predicate) {
  "use strict";
  let result = null;
  walk(node, (node2) => {
    if (predicate(node2)) {
      result = node2;
      return null;
    }
    return node2.parentNode;
  });
  return result;
}
function findChapter(node, level) {
  "use strict";
  let chapter2 = null;
  walk(node, (node2) => {
    if (node2 instanceof ChapterSyntaxTree) {
      chapter2 = node2;
      if (typeof level === "undefined" || node2.level === level) {
        return null;
      }
    }
    return node2.parentNode;
  });
  return chapter2;
}
function getHeadlineLevels(node) {
  const numbers = {};
  let maxLevel = 0;
  walk(node, (node2) => {
    if (node2 instanceof ChapterSyntaxTree) {
      numbers[node2.level] = node2.no;
      maxLevel = Math.max(maxLevel, node2.level);
    } else if (node2 instanceof ColumnSyntaxTree) {
      numbers[node2.level] = -1;
      maxLevel = Math.max(maxLevel, node2.level);
    }
    return node2.parentNode;
  });
  const result = [];
  for (let i = 1; i <= maxLevel; i++) {
    if (numbers[i] === -1) {
      result.push(0);
    } else if (typeof numbers[i] === "undefined") {
      result.push(1);
    } else {
      result.push(numbers[i] || 0);
    }
  }
  return result;
}
function target2builder(target) {
  "use strict";
  let builderName = target.charAt(0).toUpperCase() + target.substring(1) + "Builder";
  if (builderName === "TextBuilder") {
    return new TextBuilder();
  }
  if (builderName === "HtmlBuilder") {
    return new HtmlBuilder();
  }
  return null;
}
function linesToFigure(lines) {
  "use strict";
  return String(lines).length;
}
function padLeft(str, pad, maxLength) {
  "use strict";
  if (maxLength <= str.length) {
    return str;
  }
  return stringRepeat(maxLength - str.length, pad) + str;
}
function stringRepeat(times, src) {
  "use strict";
  return new Array(times + 1).join(src);
}
var IO, Exec;
var init_utils2 = __esm({
  "lib/utils/utils.ts"() {
    "use strict";
    init_compilerModel();
    init_parser();
    init_textBuilder();
    init_htmlBuilder();
    init_analyzer();
    init_validator();
    init_walker();
    init_lib();
    ((IO2) => {
      "use strict";
      function read(path) {
        let fs = require("fs");
        return new Promise((resolve, reject) => {
          fs.readFile(path, { encoding: "utf8" }, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      }
      IO2.read = read;
      function write(path, content2) {
        let fs = require("fs");
        return new Promise((resolve, reject) => {
          fs.writeFile(path, content2, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(null);
            }
          });
        });
      }
      IO2.write = write;
    })(IO || (IO = {}));
    ((Exec2) => {
      "use strict";
      function singleCompile(input, fileName, target, tmpConfig) {
        "use strict";
        let config = tmpConfig || {};
        config.read = config.read || (() => Promise.resolve(input));
        config.analyzer = config.analyzer || new DefaultAnalyzer();
        config.validators = config.validators || [new DefaultValidator()];
        if (target && target2builder(target) == null) {
          console.error(target + " is not exists in builder");
          process.exit(1);
        }
        config.builders = config.builders;
        if (!config.builders) {
          if (target) {
            let builder = target2builder(target);
            if (!builder) {
              return Promise.reject(`unknown target: ${target}`);
            }
            config.builders = [builder];
          } else {
            config.builders = [new TextBuilder()];
          }
        }
        config.book = config.book || {
          contents: [
            { file: fileName }
          ]
        };
        config.book.contents = config.book.contents || [
          { file: fileName }
        ];
        let results = {};
        config.write = config.write || ((path, content2) => results[path] = content2);
        config.listener = config.listener || {
          onReports: () => {
          },
          onCompileSuccess: () => {
          },
          onCompileFailed: () => {
          }
        };
        config.listener.onReports = config.listener.onReports || (() => {
        });
        config.listener.onCompileSuccess = config.listener.onCompileSuccess || (() => {
        });
        config.listener.onCompileFailed = config.listener.onCompileFailed || (() => {
        });
        let originalCompileSuccess = config.listener.onCompileSuccess;
        config.listener.onCompileSuccess = (book) => {
          originalCompileSuccess(book);
        };
        let originalCompileFailed = config.listener.onCompileFailed;
        config.listener.onCompileFailed = (book) => {
          originalCompileFailed(book);
        };
        return start((review) => {
          review.initConfig(config);
        }).then((book) => {
          return {
            book,
            results
          };
        });
      }
      Exec2.singleCompile = singleCompile;
    })(Exec || (Exec = {}));
  }
});

// lib/i18n/en.ts
var en;
var init_en = __esm({
  "lib/i18n/en.ts"() {
    "use strict";
    en = {
      "sample": "Hello!"
    };
  }
});

// lib/i18n/ja.ts
var ja;
var init_ja = __esm({
  "lib/i18n/ja.ts"() {
    "use strict";
    ja = {
      "sample": "\u3053\u3093\u3061\u3083\u30FC\u3059\uFF01",
      "description": {
        "headline": '\u30C1\u30E3\u30D7\u30BF\u30FC\u306E\u59CB\u307E\u308A\u3092\u793A\u3057\u307E\u3059\u3002\n"= \u898B\u51FA\u3057" \u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002',
        "column": '\u30B3\u30E9\u30E0\u306E\u59CB\u307E\u308A\u3092\u793A\u3057\u307E\u3059\u3002\n"===[column] \u898B\u51FA\u3057" \u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\n"===[/column]"\u3092\u4F7F\u3046\u304B\u3001\u6B21\u306E\u898B\u51FA\u3057\u304C\u59CB\u307E\u308B\u3068\u30B3\u30E9\u30E0\u306E\u7D42\u308F\u308A\u306B\u306A\u308A\u307E\u3059\u3002',
        "ulist": "\u756A\u53F7\u306A\u3057\u7B87\u6761\u66F8\u304D\u3092\u793A\u3057\u307E\u3059\u3002*\u8A18\u53F7\u3092\u3064\u306A\u3052\u3066\u66F8\u304F\u3068\u3055\u3089\u306B\u30A4\u30F3\u30C7\u30F3\u30C8\u3057\u305F\u7B87\u6761\u66F8\u304D\u306B\u3059\u308B\u4E8B\u304C\u3067\u304D\u307E\u3059\u3002\n * \u98DF\u6599\u54C1\u3092\u8CB7\u3046\u3053\u3068\u3002\n ** \u725B\u4E73\n ** \u306B\u3093\u3058\u3093\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u884C\u982D\u306B\u5FC5\u305A\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\u304C\u5FC5\u8981\u3067\u3059\u3002",
        "olist": "\u6570\u5B57\u4ED8\u304D\u7B87\u6761\u66F8\u304D\u3092\u793A\u3057\u307E\u3059\u3002\n 1. \u306F\u3058\u3081\u306B\u795E\u306F\u5929\u3068\u5730\u3068\u3092\u60F3\u50CF\u3055\u308C\u305F\u3002\n 2. \u5730\u306F\u5F62\u306A\u304F\u3001\u3080\u306A\u3057\u304F\u3001\u3084\u307F\u304C\u6DF5\u306E\u304A\u3082\u3066\u306B\u3042\u308A\u3001\u795E\u306E\u970A\u304C\u6C34\u306E\u304A\u3082\u3066\u3092\u304A\u304A\u3063\u3066\u3044\u305F\u3002\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u884C\u982D\u306B\u5FC5\u305A\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\u304C\u5FC5\u8981\u3067\u3059\u3002",
        "dlist": "\u7528\u8A9E\u30EA\u30B9\u30C8\u3092\u793A\u3057\u307E\u3059\u3002\n: \u30EC\u30D0\u30AC\u30C1\u30E3\n  \u30EC\u30D0\u30FC\u3092\u30AC\u30C1\u30E3\u30AC\u30C1\u30E3\u52D5\u304B\u3059\u3053\u3068\u3002\u719F\u7DF4\u8005\u306F\u30EC\u30D0\u30AC\u30C1\u30E3\u3059\u3079\u304D\u6642\u3068\u3057\u306A\u3044\u6642\u3092\u660E\u78BA\u306B\u4F7F\u3044\u5206\u3051\u52DD\u5229\u3092\u63B4\u307F\u53D6\u308B\u3002\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u672C\u6587\u306E\u884C\u306F\u5148\u982D\u306B\u534A\u89D2\u30B9\u30DA\u30FC\u30B9\u304B\u30BF\u30D6\u304C\u5FC5\u8981\u3067\u3059\u3002",
        "block_list": '\u30EA\u30B9\u30C8\u3092\u793A\u3057\u307E\u3059\u3002\u6280\u8853\u66F8\u3067\u306F\u30D7\u30ED\u30B0\u30E9\u30E0\u30B3\u30FC\u30C9\u306E\u63B2\u8F09\u306B\u4F7F\u3044\u307E\u3059\u3002\n//list[label][caption]{\nalert("Hello!");\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002',
        "inline_list": '\u30EA\u30B9\u30C8\u3078\u306E\u53C2\u7167\u3092\u793A\u3057\u307E\u3059\u3002\n//list[hoge][caption]{alert("Hello!");\n//}\n \u3092\u53C2\u7167\u3059\u308B\u6642\u306F @<list>{hoge} \u3068\u66F8\u304D\u307E\u3059\u3002',
        "block_listnum": '\u884C\u756A\u53F7\u4ED8\u304D\u306E\u30EA\u30B9\u30C8\u3092\u793A\u3057\u307E\u3059\u3002\n//listnum[hello.js][\u30CF\u30ED\u30FC\u30EF\u30FC\u30EB\u30C9]{\nconsole.log("Hello world!");\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002',
        "block_emlist": '\u975E\u63A1\u756A\u306E\u30EA\u30B9\u30C8\u3092\u793A\u3057\u307E\u3059\u3002\n//emlist[\u30CF\u30ED\u30FC\u30EF\u30FC\u30EB\u30C9]{\nconsole.log("Hello world");\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002',
        "block_emlistnum": '\u884C\u756A\u53F7\u4ED8\u304D\u306E\u975E\u63A1\u756A\u306E\u30EA\u30B9\u30C8\u3092\u793A\u3057\u307E\u3059\u3002\n//emlistnum{\nconsole.log("Hello world");\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002',
        "block_image": "\u56F3\u8868\u3092\u793A\u3057\u307E\u3059\u3002\n//image[sample][\u30B5\u30F3\u30D7\u30EB][scale=0.3]{\n\u30E1\u30E2\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\n\u7AE0\u306E\u30D5\u30A1\u30A4\u30EB\u540D\u304Ctest.re\u306E\u5834\u5408\u3001images/test/sample.jpg\u304C\u53C2\u7167\u3055\u308C\u307E\u3059\u3002\n\u753B\u50CF\u306E\u30B5\u30A4\u30BA\u3092\u8ABF\u6574\u3057\u305F\u3044\u5834\u5408\u3001scale\u3067\u500D\u7387\u304C\u6307\u5B9A\u3067\u304D\u307E\u3059\u3002\n\u4E2D\u306B\u66F8\u304B\u308C\u3066\u3044\u308B\u30E1\u30E2\u306F\u7121\u8996\u3055\u308C\u307E\u3059\u3002",
        "block_indepimage": "\u975E\u63A1\u756A\u306E\u56F3\u8868\u3092\u793A\u3057\u307E\u3059\u3002\n//image[sample][\u30B5\u30F3\u30D7\u30EB][scale=0.3]{\n\u30E1\u30E2\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u8A73\u7D30\u306F //image \u3068\u540C\u69D8\u3067\u3059\u3002",
        "block_graph": "\u30B0\u30E9\u30D5\u3092\u793A\u3057\u307E\u3059\u3002\n//graph[sample][\u30C4\u30FC\u30EB\u540D][\u30B5\u30F3\u30D7\u30EB]{\n\u30E1\u30E2\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\n\u6587\u7AE0\u4E2D\u304B\u3089\u53C2\u7167\u3059\u308B\u6642\u306F@<img>{sample}\u304C\u5229\u7528\u3067\u304D\u307E\u3059\u3002\n\u4E2D\u306B\u66F8\u304B\u308C\u3066\u3044\u308B\u30E1\u30E2\u306F\u7121\u8996\u3055\u308C\u307E\u3059\u3002",
        "inline_img": "\u56F3\u8868\u3078\u306E\u53C2\u7167\u3092\u793A\u3057\u307E\u3059\u3002\n//image[sample][\u30B5\u30F3\u30D7\u30EB]{\n//}\n\u3092\u53C2\u7167\u3059\u308B\u3068\u304D\u306F @<img>{sample} \u3068\u66F8\u304D\u307E\u3059\u3002",
        "inline_icon": "\u6587\u4E2D\u306B\u8868\u793A\u3055\u308C\u308B\u56F3\u8868\u3092\u793A\u3057\u307E\u3059\u3002\n@<icon>{sample}\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u7AE0\u306E\u30D5\u30A1\u30A4\u30EB\u540D\u304Ctest.re\u306E\u5834\u5408\u3001images/test-sample.jpen\u304C\u53C2\u7167\u3055\u308C\u307E\u3059\u3002",
        "block_footnote": "\u811A\u6CE8\u3092\u793A\u3057\u307E\u3059\u3002\n//footnote[sample][\u30B5\u30F3\u30D7\u30EB\u3068\u3057\u3066\u306F\u3044\u3055\u3055\u304B\u8C6A\u83EF\u3059\u304E\u308B\u304B\u3082\uFF01]\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_fn": "\u811A\u6CE8\u3078\u306E\u53C2\u7167\u3092\u793A\u3057\u307E\u3059\u3002\n//footnote[sample][\u30B5\u30F3\u30D7\u30EB\u3068\u3044\u3046\u306B\u306F\u30B7\u30E7\u30DC\u3059\u304E\u308B]\n\u3092\u53C2\u7167\u3059\u308B\u3068\u304D\u306F @<fn>{sample} \u3068\u66F8\u304D\u307E\u3059\u3002",
        "block_lead": "\u30EA\u30FC\u30C9\u5206\u3092\u793A\u3057\u307E\u3059\u3002\n//lead{\n\u4E16\u754C\u3092\u5909\u3048\u305F\u304F\u306F\u306A\u3044\u304B\uFF1F\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002lead\u8A18\u6CD5\u4E2D\u3067\u306F\u3001\u5168\u3066\u306E\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u3084\u30D6\u30ED\u30C3\u30AF\u69CB\u6587\u304C\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
        "block_noindent": "\u30D1\u30E9\u30B0\u30E9\u30D5\u3092\u5207\u3089\u305A\u306B\u6B21\u306E\u8981\u7D20\u3092\u7D9A\u3051\u308B\u3053\u3068\u3092\u793A\u3057\u307E\u3059\u3002\n//noindent\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "block_blankline": "1\u884C\u3076\u3093\u306E\u7A7A\u884C\u3092\u660E\u793A\u3057\u3066\u5165\u308C\u307E\u3059\u3002\n//blankline\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "block_source": '\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u306E\u5F15\u7528\u3092\u793A\u3057\u307E\u3059\u3002\n//source[hello.js]{\nconsole.log("Hello world!");\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002',
        "block_cmd": "\u30B3\u30DE\u30F3\u30C9\u30E9\u30A4\u30F3\u306E\u30AD\u30E3\u30D7\u30C1\u30E3\u3092\u793A\u3057\u307E\u3059\u3002\n//cmd{\n$ git clone git@github.com:vvakame/review.js.git\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "block_quote": "\u5F15\u7528\u3092\u793A\u3057\u307E\u3059\u3002\n//quote{\n\u795E\u306F\u8A00\u3063\u3066\u3044\u308B\u2026\u3053\u3053\u3067\u6B7B\u306C\u5B9A\u3081\u3067\u306F\u306A\u3044\u3068\u2026\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_hd": "TODO \u5F8C\u3067\u66F8\u304F\u3002\u898B\u51FA\u3057\u53C2\u7167\u3092\u4F5C\u6210\u3059\u308B\u3002",
        "inline_code": '\u77ED\u3044\u30D7\u30ED\u30B0\u30E9\u30E0\u30B3\u30FC\u30C9\u3092\u8A18\u8FF0\u3057\u307E\u3059\u3002\n@<code>{alert("Hello!");}\n\u9577\u3044\u30BD\u30FC\u30B9\u30B3\u30FC\u30C9\u306B\u306Flist\u8A18\u6CD5\u3092\u4F7F\u3044\u307E\u3057\u3087\u3046\u3002',
        "inline_br": "\u6539\u884C\u3092\u793A\u3057\u307E\u3059\u3002\u30EA\u30B9\u30C8\u5185\u3067\u306E\u6539\u884C\u3084\u3001\u6BB5\u843D\u3092\u5909\u3048\u305A\u306B\u6539\u884C\u3092\u3057\u305F\u3044\u5834\u5408\u306B\u4F7F\u3044\u307E\u3059\u3002",
        "inline_u": "\u4E0B\u7DDA\u306B\u3057\u307E\u3059\u3002\n@<u>{\u3053\u306E\u90E8\u5206\u304C\u4E0B\u7DDA\u306B\u306A\u308B}",
        "inline_ruby": "\u8AAD\u307F\u4EEE\u540D\u3092\u632F\u308A\u307E\u3059\u3002\n@<ruby>{\u7F8A,\u3072\u3064\u3058}",
        "inline_b": "\u30DC\u30FC\u30EB\u30C9(\u592A\u5B57)\u306B\u3057\u307E\u3059\u3002\n@<b>{\u3053\u306E\u90E8\u5206\u304C\u592A\u5B57\u306B\u306A\u308B}",
        "inline_href": "\u30EA\u30F3\u30AF\u3092\u793A\u3057\u307E\u3059\u3002\nURL\u3092\u66F8\u304D\u305F\u3044\u5834\u5408\u306B\u4F7F\u3044\u307E\u3059\u3002\n@<href>{https://github.com/vvakame/review.js} \u307E\u305F\u306F @<href>{https://github.com/vvakame/review.js, review.js} \u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "block_label": "\u30A2\u30F3\u30AB\u30FC\u3092\u793A\u3057\u307E\u3059\u3002\n@<href>{#anchor}\u304B\u3089\u98DB\u3093\u3067\u6765\u3089\u308C\u308B\u3088\u3046\u306B\u3059\u308B\u305F\u3081\u306B\u306F\n//label[anchor]\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_kw": "\u30AD\u30FC\u30EF\u30FC\u30C9\u3092\u793A\u3057\u307E\u3059\u3002\n\u305D\u308C\u306F\u304A\u304B\u3057\u3044\u3060\u308D\u3046@<kw>{JK, \u5E38\u8B58\u7684\u306B\u8003\u3048\u3066}\u3002\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_tti": "\u30C6\u30EC\u30BF\u30A4\u30D7\u6587\u5B57(\u7B49\u5E45\u30D5\u30A9\u30F3\u30C8)\u306E\u30A4\u30BF\u30EA\u30C3\u30AF\u3067\u51FA\u529B\u3059\u308B\u3053\u3068\u3092\u793A\u3057\u307E\u3059\u3002\n@<tti>{keyword}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_ttb": "\u30C6\u30EC\u30BF\u30A4\u30D7\u6587\u5B57(\u7B49\u5E45\u30D5\u30A9\u30F3\u30C8)\u306E\u30DC\u30FC\u30EB\u30C9\u3067\u51FA\u529B\u3059\u308B\u3053\u3068\u3092\u793A\u3057\u307E\u3059\u3002\n@<ttb>{class}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_ami": "\u7DB2\u639B\u3051\u6709\u308A\u3067\u51FA\u529B\u3059\u308B\u3053\u3068\u3092\u793A\u3057\u307E\u3059\u3002\n@<ami>{\u91CD\u70B9\uFF01}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_bou": "\u508D\u70B9\u6709\u308A\u3067\u51FA\u529B\u3059\u308B\u3053\u3068\u3092\u793A\u3057\u307E\u3059\u3002\n@<bou>{\u306A\u3093\u3060\u3063\u3066\uFF1F}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_del": "\u524A\u9664\u7B87\u6240\u3092\u660E\u793A\u3057\u307E\u3059\u3002\n\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u306F\u6253\u3061\u6D88\u3057\u7DDA\u304C\u5F15\u304B\u308C\u307E\u3059\u3002\n@<del>{\u524A\u9664}\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_i": "\u30A4\u30BF\u30EA\u30C3\u30AF\u3067\u51FA\u529B\u3059\u308B\u3053\u3068\u3092\u793A\u3057\u307E\u3059\u3002\n@<i>{\u659C\u4F53}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_ins": "\u633F\u5165\u7B87\u6240\u3092\u660E\u793A\u3057\u307E\u3059\u3002\n\u30C7\u30D5\u30A9\u30EB\u30C8\u3067\u306F\u4E0B\u7DDA\u304C\u5F15\u304B\u308C\u307E\u3059\u3002\n@<ins>{\u633F\u5165}\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_m": "TeX\u306E\u5F0F\u3092\u633F\u5165\u3059\u308B\u3053\u3068\u3092\u793A\u3057\u307E\u3059\u3002\n@<m>{TeX\u5F0F}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_strong": "\u30DC\u30FC\u30EB\u30C9\u3067\u51FA\u529B\u3059\u308B\u3053\u3068\u3092\u793A\u3057\u307E\u3059\u3002\n@<strong>{\u5F37\u8ABF\uFF01}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_tcy": "\u7E26\u66F8\u304D\u306E\u6587\u66F8\u306B\u304A\u3044\u3066\u6587\u5B57\u3092\u7E26\u4E2D\u6A2A\u3067\u51FA\u529B\u3057\u307E\u3059\u3002\n@<tcy>{AB}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_uchar": "\u6307\u5B9A\u3055\u308C\u305F\u5024\u309216\u9032\u6570\u306E\u5024\u3068\u3057\u3066\u6271\u3044\u3001Unicode\u6587\u5B57\u3068\u3057\u3066\u51FA\u529B\u3059\u308B\u3053\u3068\u3092\u793A\u3057\u307E\u3059\u3002\n@<uchar>{1F64B}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "inline_tt": "\u56F2\u307E\u308C\u305F\u30C6\u30AD\u30B9\u30C8\u3092\u7B49\u5E45\u30D5\u30A9\u30F3\u30C8\u3067\u8868\u793A\u3057\u307E\u3059\u3002",
        "inline_em": "\u30C6\u30AD\u30B9\u30C8\u3092\u5F37\u8ABF\u3057\u307E\u3059\u3002\n@<em>{\u3053\u306E\u3088\u3046\u306B\u5F37\u8ABF\u3055\u308C\u307E\u3059}",
        "block_raw": "\u751F\u30C7\u30FC\u30BF\u3092\u8868\u3057\u307E\u3059\u3002\n//raw[|html,text|\u307B\u3052]\u3068\u66F8\u304F\u3068\u3001\u51FA\u529B\u5148\u304Chtml\u304Btext\u306E\u6642\u306E\u307F\u5185\u5BB9\u304C\u305D\u306E\u307E\u307E\u51FA\u529B\u3055\u308C\u307E\u3059\u3002\nRe:VIEW\u306E\u8A18\u6CD5\u3092\u8D85\u3048\u3066\u305D\u306E\u307E\u307E\u51FA\u529B\u3055\u308C\u308B\u306E\u3067\u3001\u69CB\u9020\u3092\u58CA\u3055\u306C\u3088\u3046\u614E\u91CD\u306B\u4F7F\u3063\u3066\u304F\u3060\u3055\u3044\u3002",
        "inline_raw": "\u751F\u30C7\u30FC\u30BF\u3092\u8868\u3057\u307E\u3059\u3002\n@<raw>{|html,text|\u307B\u3052}\u3068\u66F8\u304F\u3068\u3001\u51FA\u529B\u5148\u304Chtml\u304Btext\u306E\u6642\u306E\u307F\u5185\u5BB9\u304C\u305D\u306E\u307E\u307E\u51FA\u529B\u3055\u308C\u307E\u3059\u3002\nRe:VIEW\u306E\u8A18\u6CD5\u3092\u8D85\u3048\u3066\u305D\u306E\u307E\u307E\u51FA\u529B\u3055\u308C\u308B\u306E\u3067\u3001\u69CB\u9020\u3092\u58CA\u3055\u306C\u3088\u3046\u614E\u91CD\u306B\u4F7F\u3063\u3066\u304F\u3060\u3055\u3044\u3002",
        "block_comment": "\u30B3\u30E1\u30F3\u30C8\u3092\u793A\u3057\u307E\u3059\u3002\n//comment{\n\u30B3\u30E1\u30F3\u30C8\u3067\u3059\u3088\u30FC\n//}\n\u3068\u66F8\u304F\u3053\u3068\u306B\u3088\u308A\u3001\u6587\u66F8\u306B\u306F\u51FA\u529B\u3055\u308C\u306A\u3044\u6587\u3092\u66F8\u304F\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002",
        "inline_comment": "\u30B3\u30E1\u30F3\u30C8\u3092\u793A\u3057\u307E\u3059\u3002\n@<comment>{\u30B3\u30E1\u30F3\u30C8\u3067\u3059\u3088\u30FC}\u3068\u66F8\u304F\u3053\u3068\u306B\u3088\u308A\u3001\u6587\u66F8\u306B\u306F\u51FA\u529B\u3055\u308C\u306A\u3044\u6587\u3092\u66F8\u304F\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002",
        "inline_chap": "\u7AE0\u756A\u53F7\u3092\u793A\u3057\u307E\u3059\u3002\n\u30D5\u30A1\u30A4\u30EB\u540D\u306E.re\u306E\u524D\u306E\u90E8\u5206\u304B =={sample} \u30BF\u30A4\u30C8\u30EB \u306E{}\u90E8\u5206\u3092\u53C2\u7167\u3057\u307E\u3059\u3002@<chap>{sample} \u3068\u66F8\u304D\u307E\u3059\u3002",
        "inline_title": "\u7AE0\u30BF\u30A4\u30C8\u30EB\u3092\u793A\u3057\u307E\u3059\u3002\n\u30D5\u30A1\u30A4\u30EB\u540D\u306E.re\u306E\u524D\u306E\u90E8\u5206\u304B =={sample} \u30BF\u30A4\u30C8\u30EB \u306E{}\u90E8\u5206\u3092\u53C2\u7167\u3057\u307E\u3059\u3002@<title>{sample} \u3068\u66F8\u304D\u307E\u3059\u3002",
        "inline_chapref": "\u7AE0\u756A\u53F7+\u7AE0\u30BF\u30A4\u30C8\u30EB\u3092\u793A\u3057\u307E\u3059\u3002\n\u30D5\u30A1\u30A4\u30EB\u540D\u306E.re\u306E\u524D\u306E\u90E8\u5206\u304B =={sample} \u30BF\u30A4\u30C8\u30EB \u306E{}\u90E8\u5206\u3092\u53C2\u7167\u3057\u307E\u3059\u3002@<chapref>{sample} \u3068\u66F8\u304D\u307E\u3059\u3002",
        "inline_idx": "\u6587\u5B57\u5217\u3092\u51FA\u529B\u3059\u308B\u3068\u3068\u3082\u306B\u3001\u7D22\u5F15\u3068\u3057\u3066\u767B\u9332\u3057\u307E\u3059\u3002\n`\u89AA\u7D22\u5F15\u6587\u5B57\u5217<<>>\u5B50\u7D22\u5F15\u6587\u5B57\u5217`\u306E\u3088\u3046\u306B\u89AA\u5B50\u95A2\u4FC2\u306B\u3042\u308B\u7D22\u5F15\u3082\u5B9A\u7FA9\u3067\u304D\u307E\u3059\u3002\n@<idx>{sample} \u3068\u66F8\u304D\u307E\u3059\u3002",
        "inline_hidx": "\u7D22\u5F15\u3068\u3057\u3066\u767B\u9332\u3057\u307E\u3059 (idx \u3068\u7570\u306A\u308A\u3001\u7D19\u9762\u5185\u306B\u51FA\u529B\u306F\u3057\u307E\u305B\u3093)\u3002\n`\u89AA\u7D22\u5F15\u6587\u5B57\u5217<<>>\u5B50\u7D22\u5F15\u6587\u5B57\u5217`\u306E\u3088\u3046\u306B\u89AA\u5B50\u95A2\u4FC2\u306B\u3042\u308B\u7D22\u5F15\u3082\u5B9A\u7FA9\u3067\u304D\u307E\u3059\u3002\n@<hidx>{sample} \u3068\u66F8\u304D\u307E\u3059\u3002",
        "block_flushright": "\u53F3\u5BC4\u305B\u3092\u793A\u3057\u307E\u3059\u3002\n//flushright{\n\u795E\u306F\u8A00\u3063\u3066\u3044\u308B\u2026\u3053\u3053\u3067\u5DE6\u3078\u884C\u304F\u5B9A\u3081\u3067\u306F\u306A\u3044\u3068\u2026\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002",
        "block_memo": "\u3061\u3087\u3063\u3068\u3057\u305F\u30E1\u30E2\u3092\u793A\u3057\u307E\u3059\u3002\n//memo[\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3]{\n\u3088\u308A\u8A73\u3057\u3044\u60C5\u5831\u306FURL:XXXX\u3092\u53C2\u7167\u304F\u3060\u3055\u3044\u3002\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u30D6\u30ED\u30C3\u30AF\u4E2D\u3067\u306F\u3001\u5168\u3066\u306E\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u304C\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
        "block_info": "\u3061\u3087\u3063\u3068\u3057\u305F\u53C2\u8003\u60C5\u5831\u3092\u793A\u3057\u307E\u3059\u3002\n//info[\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3]{\n\u3088\u308A\u8A73\u3057\u3044\u60C5\u5831\u306FURL:XXXX\u3092\u53C2\u7167\u304F\u3060\u3055\u3044\u3002\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u30D6\u30ED\u30C3\u30AF\u4E2D\u3067\u306F\u3001\u5168\u3066\u306E\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u304C\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
        "block_tip": "\u3061\u3087\u3063\u3068\u3057\u305FTips\u3092\u793A\u3057\u307E\u3059\u3002\n//tip[\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3]{\n\u3088\u308A\u8A73\u3057\u3044\u60C5\u5831\u306FURL:XXXX\u3092\u53C2\u7167\u304F\u3060\u3055\u3044\u3002\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u30D6\u30ED\u30C3\u30AF\u4E2D\u3067\u306F\u3001\u5168\u3066\u306E\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u304C\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
        "block_note": "\u3061\u3087\u3063\u3068\u3057\u305F\u30CE\u30FC\u30C8\u3092\u793A\u3057\u307E\u3059\u3002\n//note[\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3]{\n\u3088\u308A\u8A73\u3057\u3044\u60C5\u5831\u306FURL:XXXX\u3092\u53C2\u7167\u304F\u3060\u3055\u3044\u3002\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u30D6\u30ED\u30C3\u30AF\u4E2D\u3067\u306F\u3001\u5168\u3066\u306E\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u304C\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
        "block_warning": "\u3061\u3087\u3063\u3068\u3057\u305F\u8B66\u544A\u60C5\u5831\u3092\u793A\u3057\u307E\u3059\u3002\n//warning[\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3]{\n\u5148\u307B\u3069\u306E\u4F8B\u3068\u306F\u51FA\u529B\u7D50\u679C\u304C\u7570\u306A\u308A\u307E\u3059\u3002\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u30D6\u30ED\u30C3\u30AF\u4E2D\u3067\u306F\u3001\u5168\u3066\u306E\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u304C\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
        "block_important": "\u3061\u3087\u3063\u3068\u3057\u305F\u91CD\u8981\u60C5\u5831\u3092\u793A\u3057\u307E\u3059\u3002\n//important[\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3]{\n\u4E00\u5B9A\u671F\u9593\u64CD\u4F5C\u3057\u306A\u3044\u5834\u5408\u3001\u30AD\u30E3\u30C3\u30B7\u30E5\u306F\u524A\u9664\u3055\u308C\u308B\u3053\u3068\u304C\u3042\u308A\u307E\u3059\u3002\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u30D6\u30ED\u30C3\u30AF\u4E2D\u3067\u306F\u3001\u5168\u3066\u306E\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u304C\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
        "block_caution": "\u3061\u3087\u3063\u3068\u3057\u305F\u8B66\u544A\u60C5\u5831\u3092\u793A\u3057\u307E\u3059\u3002\n//caution[\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3]{\n\u4E00\u5EA6\u5B9F\u884C\u3059\u308B\u3068\u4FEE\u6B63\u306F\u3067\u304D\u307E\u305B\u3093\u3002\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u30D6\u30ED\u30C3\u30AF\u4E2D\u3067\u306F\u3001\u5168\u3066\u306E\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u304C\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
        "block_notice": "\u3061\u3087\u3063\u3068\u3057\u305F\u6CE8\u610F\u60C5\u5831\u3092\u793A\u3057\u307E\u3059\u3002\n//notice[\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3]{\n\u30A8\u30E9\u30FC\u304C\u306A\u3051\u308C\u3070\u7279\u306B\u4F55\u3082\u51FA\u529B\u3055\u308C\u307E\u305B\u3093\u3002\n//}\n\u3068\u3044\u3046\u5F62\u5F0F\u3067\u66F8\u304D\u307E\u3059\u3002\u30D6\u30ED\u30C3\u30AF\u4E2D\u3067\u306F\u3001\u5168\u3066\u306E\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u304C\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
        // TODO 以下は今後書き直す
        "block_table": "\u30C6\u30FC\u30D6\u30EB\u3092\u793A\u3057\u307E\u3059\u3002\nTODO \u6B63\u3057\u304F\u5B9F\u88C5\u3057\u305F\u5F8C\u306B\u66F8\u304F",
        "inline_table": "\u30C6\u30FC\u30D6\u30EB\u3078\u306E\u53C2\u7167\u3092\u793A\u3057\u307E\u3059\u3002\nTODO \u6B63\u3057\u304F\u5B9F\u88C5\u3057\u305F\u5F8C\u306B\u66F8\u304F",
        "block_tsize": "\u30C6\u30FC\u30D6\u30EB\u306E\u5927\u304D\u3055\u3092\u6307\u5B9A\u3057\u307E\u3059\u3002\nTODO \u6B63\u3057\u304F\u5B9F\u88C5\u3057\u305F\u5F8C\u306B\u66F8\u304F"
      },
      "compile": {
        "file_not_exists": "\u30D5\u30A1\u30A4\u30EB %s \u304C\u958B\u3051\u307E\u305B\u3093\u3002",
        "block_not_supported": "%s \u3068\u3044\u3046\u30D6\u30ED\u30C3\u30AF\u69CB\u6587\u306F\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002",
        "inline_not_supported": "%s \u3068\u3044\u3046\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u306F\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002",
        "part_is_missing": "\u30D1\u30FC\u30C8 %s \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002",
        "chapter_is_missing": "\u30C1\u30E3\u30D7\u30BF\u30FC %s \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002",
        "reference_is_missing": "\u53C2\u7167\u5148 %s \u306E %s \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002",
        "duplicated_label": "\u30E9\u30D9\u30EB\u306B\u91CD\u8907\u304C\u3042\u308B\u3088\u3046\u3067\u3059\u3002",
        "duplicated_label_headline": "\u30E9\u30D9\u30EB\u306B\u91CD\u8907\u304C\u3042\u308B\u3088\u3046\u3067\u3059\u3002 =={a-label} \u30E9\u30D9\u30EB \u306E\u3088\u3046\u306B\u660E\u793A\u7684\u306B\u30E9\u30D9\u30EB\u3092\u6307\u5B9A\u3059\u308B\u3053\u3068\u3092\u56DE\u907F\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002",
        // TODO できれば 引数 という言葉を避けたい…
        "args_length_mismatch": "\u5F15\u6570\u306E\u6570\u306B\u9F5F\u9F6C\u304C\u3042\u308A\u307E\u3059\u3002 \u671F\u5F85\u5024 %s, \u5B9F\u969B %s",
        "args_hd_path_not_implemented": "\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3\u306B\u3088\u308B\u53C2\u7167\u306F\u307E\u3060\u5B9F\u88C5\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002{\u30E9\u30D9\u30EB}\u304B{\u7AE0ID|\u30E9\u30D9\u30EB}\u306E\u5F62\u5F0F\u3092\u4F7F\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u6307\u5B9A\u3055\u308C\u305F\u8981\u7D20\u306F %s \u3067\u3057\u305F\u3002",
        "body_string_only": "\u5185\u5BB9\u306F\u5168\u3066\u6587\u5B57\u3067\u306A\u3051\u308C\u3070\u3044\u3051\u307E\u305B\u3093\u3002",
        "chapter_not_toplevel": "\u6DF1\u30551\u306E\u30C1\u30E3\u30D7\u30BF\u30FC\u306F\u6700\u4E0A\u4F4D\u306B\u306A\u3051\u308C\u3070\u3044\u3051\u307E\u305B\u3093\u3002",
        "chapter_topleve_eq1": "\u6700\u4E0A\u4F4D\u306E\u30C1\u30E3\u30D7\u30BF\u30FC\u306F\u6DF1\u30551\u306E\u3082\u306E\u3067\u306A\u3051\u308C\u3070\u3044\u3051\u307E\u305B\u3093\u3002",
        "deprecated_inline_symbol": "%s \u3068\u3044\u3046\u30A4\u30F3\u30E9\u30A4\u30F3\u69CB\u6587\u306F\u975E\u63A8\u5968\u3067\u3059\u3002",
        "graph_tool_is_not_recommended": "graph\u7528\u30C4\u30FC\u30EB\u306B\u306Fgraphviz\u3092\u304A\u3059\u3059\u3081\u3057\u307E\u3059\u3002",
        "unknown_graph_tool": "%s \u3068\u3044\u3046graph\u7528\u30C4\u30FC\u30EB\u306F\u30B5\u30DD\u30FC\u30C8\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002"
      },
      "builder": {
        "chapter_not_found": "\u6DF1\u3055 %d \u306B\u30DE\u30C3\u30C1\u3059\u308B\u30C1\u30E3\u30D7\u30BF\u30FC\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002",
        "image_not_found": "ID: %s \u306B\u30DE\u30C3\u30C1\u3059\u308B\u753B\u50CF\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002",
        "chapter": "\u7B2C%d\u7AE0",
        "chapter_ref": "\u7B2C%d\u7AE0\u300C%s\u300D",
        "list": "\u30EA\u30B9\u30C8%s.%s",
        "table": "\u8868%s.%s"
      }
    };
  }
});

// node_modules/sprintf-js/src/sprintf.js
var require_sprintf = __commonJS({
  "node_modules/sprintf-js/src/sprintf.js"(exports2) {
    !function() {
      "use strict";
      var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
      };
      function sprintf2(key) {
        return sprintf_format(sprintf_parse(key), arguments);
      }
      function vsprintf(fmt, argv) {
        return sprintf2.apply(null, [fmt].concat(argv || []));
      }
      function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = "", i, k, ph, pad, pad_character, pad_length, is_positive, sign;
        for (i = 0; i < tree_length; i++) {
          if (typeof parse_tree[i] === "string") {
            output += parse_tree[i];
          } else if (typeof parse_tree[i] === "object") {
            ph = parse_tree[i];
            if (ph.keys) {
              arg = argv[cursor];
              for (k = 0; k < ph.keys.length; k++) {
                if (arg == void 0) {
                  throw new Error(sprintf2('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k - 1]));
                }
                arg = arg[ph.keys[k]];
              }
            } else if (ph.param_no) {
              arg = argv[ph.param_no];
            } else {
              arg = argv[cursor++];
            }
            if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
              arg = arg();
            }
            if (re.numeric_arg.test(ph.type) && (typeof arg !== "number" && isNaN(arg))) {
              throw new TypeError(sprintf2("[sprintf] expecting number but found %T", arg));
            }
            if (re.number.test(ph.type)) {
              is_positive = arg >= 0;
            }
            switch (ph.type) {
              case "b":
                arg = parseInt(arg, 10).toString(2);
                break;
              case "c":
                arg = String.fromCharCode(parseInt(arg, 10));
                break;
              case "d":
              case "i":
                arg = parseInt(arg, 10);
                break;
              case "j":
                arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0);
                break;
              case "e":
                arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential();
                break;
              case "f":
                arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg);
                break;
              case "g":
                arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg);
                break;
              case "o":
                arg = (parseInt(arg, 10) >>> 0).toString(8);
                break;
              case "s":
                arg = String(arg);
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "t":
                arg = String(!!arg);
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "T":
                arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase();
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "u":
                arg = parseInt(arg, 10) >>> 0;
                break;
              case "v":
                arg = arg.valueOf();
                arg = ph.precision ? arg.substring(0, ph.precision) : arg;
                break;
              case "x":
                arg = (parseInt(arg, 10) >>> 0).toString(16);
                break;
              case "X":
                arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase();
                break;
            }
            if (re.json.test(ph.type)) {
              output += arg;
            } else {
              if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                sign = is_positive ? "+" : "-";
                arg = arg.toString().replace(re.sign, "");
              } else {
                sign = "";
              }
              pad_character = ph.pad_char ? ph.pad_char === "0" ? "0" : ph.pad_char.charAt(1) : " ";
              pad_length = ph.width - (sign + arg).length;
              pad = ph.width ? pad_length > 0 ? pad_character.repeat(pad_length) : "" : "";
              output += ph.align ? sign + arg + pad : pad_character === "0" ? sign + pad + arg : pad + sign + arg;
            }
          }
        }
        return output;
      }
      var sprintf_cache = /* @__PURE__ */ Object.create(null);
      function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
          return sprintf_cache[fmt];
        }
        var _fmt = fmt, match, parse_tree = [], arg_names = 0;
        while (_fmt) {
          if ((match = re.text.exec(_fmt)) !== null) {
            parse_tree.push(match[0]);
          } else if ((match = re.modulo.exec(_fmt)) !== null) {
            parse_tree.push("%");
          } else if ((match = re.placeholder.exec(_fmt)) !== null) {
            if (match[2]) {
              arg_names |= 1;
              var field_list = [], replacement_field = match[2], field_match = [];
              if ((field_match = re.key.exec(replacement_field)) !== null) {
                field_list.push(field_match[1]);
                while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                  if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                    field_list.push(field_match[1]);
                  } else {
                    throw new SyntaxError("[sprintf] failed to parse named argument key");
                  }
                }
              } else {
                throw new SyntaxError("[sprintf] failed to parse named argument key");
              }
              match[2] = field_list;
            } else {
              arg_names |= 2;
            }
            if (arg_names === 3) {
              throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
            }
            parse_tree.push(
              {
                placeholder: match[0],
                param_no: match[1],
                keys: match[2],
                sign: match[3],
                pad_char: match[4],
                align: match[5],
                width: match[6],
                precision: match[7],
                type: match[8]
              }
            );
          } else {
            throw new SyntaxError("[sprintf] unexpected placeholder");
          }
          _fmt = _fmt.substring(match[0].length);
        }
        return sprintf_cache[fmt] = parse_tree;
      }
      if (typeof exports2 !== "undefined") {
        exports2["sprintf"] = sprintf2;
        exports2["vsprintf"] = vsprintf;
      }
      if (typeof window !== "undefined") {
        window["sprintf"] = sprintf2;
        window["vsprintf"] = vsprintf;
        if (typeof define === "function" && define["amd"]) {
          define(function() {
            return {
              "sprintf": sprintf2,
              "vsprintf": vsprintf
            };
          });
        }
      }
    }();
  }
});

// lib/i18n/i18n.ts
function setup2(lang = "ja") {
  resource = deepAssign({}, langs.en, langs.ja, langs[lang]);
}
function t(str, ...args) {
  let parts = str.split(".");
  let base = resource;
  parts.forEach((part) => {
    base = base[part];
  });
  if (typeof base !== "string") {
    throw new Error(`unknown key: ${str}`);
  }
  return sprintf(base, ...args);
}
var langs, resource, sprintf;
var init_i18n = __esm({
  "lib/i18n/i18n.ts"() {
    "use strict";
    init_utils();
    init_utils2();
    init_en();
    init_ja();
    langs = {
      ja,
      en
    };
    resource = deepAssign({}, langs.en, langs.ja);
    if (typeof window !== "undefined" && window.sprintf) {
      sprintf = window.sprintf;
    } else {
      sprintf = require_sprintf().sprintf;
    }
    if (isNodeJS != null) {
      isNodeJS();
    }
    setup2();
  }
});

// lib/model/compilerModel.ts
var compilerModel_exports = {};
__export(compilerModel_exports, {
  Book: () => Book2,
  BookProcess: () => BookProcess,
  BuilderProcess: () => BuilderProcess2,
  ContentChunk: () => ContentChunk,
  Process: () => Process2,
  ProcessReport: () => ProcessReport2,
  ReportLevel: () => ReportLevel
});
var ReportLevel, ProcessReport2, BookProcess, Process2, BuilderProcess2, Book2, ContentChunk;
var init_compilerModel = __esm({
  "lib/model/compilerModel.ts"() {
    "use strict";
    init_i18n();
    init_walker();
    ReportLevel = /* @__PURE__ */ ((ReportLevel2) => {
      ReportLevel2[ReportLevel2["Info"] = 0] = "Info";
      ReportLevel2[ReportLevel2["Warning"] = 1] = "Warning";
      ReportLevel2[ReportLevel2["Error"] = 2] = "Error";
      return ReportLevel2;
    })(ReportLevel || {});
    ProcessReport2 = class {
      constructor(level, part, chapter2, message, nodes = []) {
        this.level = level;
        this.part = part;
        this.chapter = chapter2;
        this.message = message;
        this.nodes = nodes;
      }
    };
    BookProcess = class {
      constructor() {
        this.reports = [];
      }
      info(message) {
        this.reports.push(new ProcessReport2(0 /* Info */, null, null, message));
      }
      warn(message) {
        this.reports.push(new ProcessReport2(1 /* Warning */, null, null, message));
      }
      error(message) {
        this.reports.push(new ProcessReport2(2 /* Error */, null, null, message));
      }
    };
    Process2 = class {
      constructor(part, chapter2, input) {
        this.part = part;
        this.chapter = chapter2;
        this.input = input;
        this.symbols = [];
        this.indexCounter = {};
        this.afterProcess = [];
        this._reports = [];
      }
      info(message, ...nodes) {
        this._reports.push(new ProcessReport2(0 /* Info */, this.part, this.chapter, message, nodes));
      }
      warn(message, ...nodes) {
        this._reports.push(new ProcessReport2(1 /* Warning */, this.part, this.chapter, message, nodes));
      }
      error(message, ...nodes) {
        this._reports.push(new ProcessReport2(2 /* Error */, this.part, this.chapter, message, nodes));
      }
      nextIndex(kind) {
        let nextIndex = this.indexCounter[kind];
        if (typeof nextIndex === "undefined") {
          nextIndex = 1;
        } else {
          nextIndex++;
        }
        this.indexCounter[kind] = nextIndex;
        return nextIndex;
      }
      get reports() {
        return this._reports.sort((a, b) => {
          if (a.nodes.length === 0 && b.nodes.length === 0) {
            return 0;
          } else if (a.nodes.length === 0) {
            return -1;
          } else if (b.nodes.length === 0) {
            return 1;
          } else {
            return a.nodes[0].location.start.offset - b.nodes[0].location.start.offset;
          }
        });
      }
      addSymbol(symbol) {
        symbol.chapter = this.chapter;
        this.symbols.push(symbol);
      }
      get missingSymbols() {
        let result = [];
        this.symbols.forEach((symbol) => {
          if (symbol.referenceTo && !symbol.referenceTo.referenceNode) {
            result.push(symbol);
          }
        });
        return result;
      }
      constructReferenceTo(node, value, targetSymbol = node.symbol, separator = "|") {
        let splitted = value.split(separator);
        if (targetSymbol === "chapter") {
          if (splitted.length !== 1) {
            let message = t("compile.args_length_mismatch", "1", splitted.length);
            this.error(message, node);
            return null;
          }
          return {
            chapterName: splitted[0],
            targetSymbol
          };
        }
        if (targetSymbol === "fn") {
          if (splitted.length !== 1) {
            let message = t("compile.args_length_mismatch", "1", splitted.length);
            this.error(message, node);
            return null;
          }
          return {
            chapter: this.chapter,
            chapterName: this.chapter?.name,
            targetSymbol,
            label: splitted[0]
          };
        }
        if (targetSymbol !== "hd") {
          if (splitted.length === 2) {
            return {
              chapterName: splitted[0],
              targetSymbol,
              label: splitted[1]
            };
          } else if (splitted.length === 1) {
            return {
              chapter: this.chapter,
              chapterName: this.chapter?.name,
              targetSymbol,
              label: splitted[0]
            };
          } else {
            let message = t("compile.args_length_mismatch", "1 or 2", splitted.length);
            this.error(message, node);
            return null;
          }
        } else {
          if (splitted.length === 2) {
            return {
              chapterName: splitted[0],
              targetSymbol,
              label: splitted[1]
            };
          } else if (splitted.length === 1) {
            return {
              chapter: this.chapter,
              chapterName: this.chapter?.name,
              targetSymbol,
              label: splitted[0]
            };
          } else {
            let message = t("compile.args_hd_path_not_implemented", splitted.length);
            this.error(message, node);
            return null;
          }
        }
      }
      addAfterProcess(func) {
        this.afterProcess.push(func);
      }
      doAfterProcess() {
        this.afterProcess.forEach((func) => func());
        this.afterProcess = [];
      }
    };
    BuilderProcess2 = class {
      constructor(builder, base) {
        this.builder = builder;
        this.base = base;
        this.result = "";
      }
      get info() {
        return this.base.info.bind(this.base);
      }
      get warn() {
        return this.base.warn.bind(this.base);
      }
      get error() {
        return this.base.error.bind(this.base);
      }
      out(data) {
        this.result += this.builder.escape(data);
        return this;
      }
      outRaw(data) {
        this.result += data;
        return this;
      }
      // TODO pushOut いみふ感高いのでやめよう 削除だ！
      pushOut(data) {
        this.result = data + this.result;
        return this;
      }
      get input() {
        return this.base.input;
      }
      get symbols() {
        return this.base.symbols;
      }
      findChapter(chapId) {
        let book = this.base.chapter.book;
        let chaps = book.allChunks.filter((chunk) => {
          let name = chunk.name.substr(0, chunk.name.lastIndexOf(".re"));
          if (name === chapId) {
            return true;
          }
          let chapter2 = null;
          visit(chunk.tree.ast, {
            visitDefaultPre: (_node, _parent) => {
              return !chapter2;
            },
            visitChapterPre: (node, _parent) => {
              chapter2 = node;
              return false;
            }
          });
          if (chapter2 && chapter2.headline.label) {
            return chapter2.headline.label.arg === chapId;
          }
          return false;
        });
        return chaps[0];
      }
      /**
       * 指定されたidの画像を探す。
       * 解決ルールは https://github.com/kmuto/review/wiki/ImagePath の通り。
       * Config側で絶対パス化やリソースの差し替えを行う可能性があるため、このメソッドの返り値は無加工で使うこと。
       * @param id
       * @returns {Promise<string>}
       */
      findImageFile(id) {
        let config = (this.base.part || this.base.chapter).book.config;
        let fileNameList = [];
        (() => {
          let imageDirList = ["images/"];
          let builderList = [this.builder.extention + "/", ""];
          let chapSwitchList = [true, false];
          let chunkName = (this.base.chapter || this.base.part).name;
          chunkName = chunkName.substring(0, chunkName.lastIndexOf("."));
          let chapSeparatorList = ["/", "-"];
          let extList = ["png", "jpg", "jpeg", "gif"];
          imageDirList.forEach((imageDir) => {
            builderList.forEach((builder) => {
              chapSwitchList.forEach((chapSwitch) => {
                chapSeparatorList.forEach((chapSeparator) => {
                  extList.forEach((ext) => {
                    let fileName = "";
                    fileName += imageDir;
                    fileName += builder;
                    if (chapSwitch) {
                      fileName += chunkName;
                      fileName += chapSeparator;
                    }
                    fileName += id + "." + ext;
                    if (fileNameList.indexOf(fileName) === -1) {
                      fileNameList.push(fileName);
                    }
                  });
                });
              });
            });
          });
        })();
        let promise = new Promise((resolve, reject) => {
          let checkFileExists = () => {
            if (fileNameList.length === 0) {
              reject(id);
              return;
            }
            let fileName = fileNameList.shift();
            config.exists(fileName).then((result) => {
              if (result.result) {
                resolve(result.path);
                return;
              }
              checkFileExists();
            });
          };
          checkFileExists();
        });
        return promise;
      }
    };
    Book2 = class {
      constructor(config) {
        this.config = config;
        this.process = new BookProcess();
        this.predef = [];
        this.contents = [];
        this.appendix = [];
        this.postdef = [];
      }
      get allChunks() {
        let tmpArray = [];
        let add = (chunk) => {
          tmpArray.push(chunk);
          chunk.nodes.forEach((chunk2) => add(chunk2));
        };
        this.predef.forEach((chunk) => add(chunk));
        this.contents.forEach((chunk) => add(chunk));
        this.appendix.forEach((chunk) => add(chunk));
        this.postdef.forEach((chunk) => add(chunk));
        return tmpArray;
      }
      get reports() {
        let results = [];
        results = results.concat(this.process.reports);
        let gatherReports = (chunk) => {
          results = results.concat(chunk.process.reports);
          chunk.nodes.forEach((chunk2) => gatherReports(chunk2));
        };
        this.predef.forEach((chunk) => gatherReports(chunk));
        this.contents.forEach((chunk) => gatherReports(chunk));
        this.appendix.forEach((chunk) => gatherReports(chunk));
        this.postdef.forEach((chunk) => gatherReports(chunk));
        return results;
      }
      get hasError() {
        return this.reports.some((report) => report.level === 2 /* Error */);
      }
      get hasWarning() {
        return this.reports.some((report) => report.level === 1 /* Warning */);
      }
    };
    ContentChunk = class _ContentChunk {
      constructor(book, parent, name) {
        this.book = book;
        this.nodes = [];
        this.builderProcesses = [];
        if (parent instanceof _ContentChunk) {
          this.parent = parent;
          this.name = name;
        } else if (typeof name === "string") {
          this.name = name;
        } else {
          this.name = parent;
        }
        let part = parent ? parent : null;
        let chapter2 = this;
        this.process = new Process2(part, chapter2, null);
      }
      get input() {
        return this._input;
      }
      set input(value) {
        this._input = value;
        this.process.input = value;
      }
      createBuilderProcess(builder) {
        let builderProcess = new BuilderProcess2(builder, this.process);
        this.builderProcesses.push(builderProcess);
        return builderProcess;
      }
      findResultByBuilder(builder) {
        let founds;
        if (typeof builder === "string") {
          founds = this.builderProcesses.filter((process2) => process2.builder.name === builder);
        } else {
          founds = this.builderProcesses.filter((process2) => process2.builder === builder);
        }
        return founds[0].result;
      }
    };
  }
});

// lib/index.js
var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = { enumerable: true, get: function() {
      return m[k];
    } };
  }
  Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
  if (k2 === void 0) k2 = k;
  o[k2] = m[k];
});
var __exportStar = exports && exports.__exportStar || function(m, exports2) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyntaxType = exports.TextBuilder = exports.HtmlBuilder = exports.DefaultBuilder = exports.DefaultValidator = exports.DefaultAnalyzer = exports.AcceptableSyntaxes = exports.SyntaxTree = exports.ProcessReport = exports.ReportLevel = exports.ContentChunk = exports.Book = void 0;
exports.start = start2;
var compilerModel_1 = (init_compilerModel(), __toCommonJS(compilerModel_exports));
Object.defineProperty(exports, "Book", { enumerable: true, get: function() {
  return compilerModel_1.Book;
} });
Object.defineProperty(exports, "ContentChunk", { enumerable: true, get: function() {
  return compilerModel_1.ContentChunk;
} });
Object.defineProperty(exports, "ReportLevel", { enumerable: true, get: function() {
  return compilerModel_1.ReportLevel;
} });
Object.defineProperty(exports, "ProcessReport", { enumerable: true, get: function() {
  return compilerModel_1.ProcessReport;
} });
var controller_1 = (init_controller(), __toCommonJS(controller_exports));
var parser_1 = (init_parser(), __toCommonJS(parser_exports));
Object.defineProperty(exports, "SyntaxTree", { enumerable: true, get: function() {
  return parser_1.SyntaxTree;
} });
__exportStar((init_parser(), __toCommonJS(parser_exports)), exports);
var analyzer_1 = (init_analyzer(), __toCommonJS(analyzer_exports));
Object.defineProperty(exports, "AcceptableSyntaxes", { enumerable: true, get: function() {
  return analyzer_1.AcceptableSyntaxes;
} });
Object.defineProperty(exports, "DefaultAnalyzer", { enumerable: true, get: function() {
  return analyzer_1.DefaultAnalyzer;
} });
var validator_1 = (init_validator(), __toCommonJS(validator_exports));
Object.defineProperty(exports, "DefaultValidator", { enumerable: true, get: function() {
  return validator_1.DefaultValidator;
} });
var builder_1 = (init_builder(), __toCommonJS(builder_exports));
Object.defineProperty(exports, "DefaultBuilder", { enumerable: true, get: function() {
  return builder_1.DefaultBuilder;
} });
var htmlBuilder_1 = (init_htmlBuilder(), __toCommonJS(htmlBuilder_exports));
Object.defineProperty(exports, "HtmlBuilder", { enumerable: true, get: function() {
  return htmlBuilder_1.HtmlBuilder;
} });
var textBuilder_1 = (init_textBuilder(), __toCommonJS(textBuilder_exports));
Object.defineProperty(exports, "TextBuilder", { enumerable: true, get: function() {
  return textBuilder_1.TextBuilder;
} });
var analyzer_2 = (init_analyzer(), __toCommonJS(analyzer_exports));
Object.defineProperty(exports, "SyntaxType", { enumerable: true, get: function() {
  return analyzer_2.SyntaxType;
} });
function start2(setup3, options) {
  "use strict";
  var controller = new controller_1.Controller(options);
  setup3(controller);
  return controller.process();
}
