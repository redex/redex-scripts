#!/usr/bin/env node
'use strict';

var Curry             = require("bs-platform/lib/js/curry.js");
var Utils             = require("./Utils.js");
var Rebase            = require("@glennsl/rebase/src/Rebase.bs.js");
var Repository        = require("./Repository.js");
var Js_null_undefined = require("bs-platform/lib/js/js_null_undefined.js");

function mapKeywordSynonym(keyword) {
  switch (keyword) {
    case "bs-platform" : 
    case "bsb" : 
        return "bucklescript";
    case "d3" : 
    case "d3js" : 
        return "d3.js";
    case "next" : 
        return "next.js";
    case "reasonml" : 
        return "reason";
    case "reasonreact" : 
        return "reason-react";
    case "regex" : 
        return "regular expressions";
    case "tdd" : 
    case "test" : 
        return "testing";
    default:
      return keyword;
  }
}

function ignoreKeyword(k) {
  switch (k) {
    case "data" : 
    case "reason" : 
        return /* true */1;
    default:
      if (Rebase.$$String[/* startsWith */3]("bs-", k)) {
        return /* true */1;
      } else {
        return /* false */0;
      }
  }
}

var partial_arg = Rebase.$$Array[/* map */0];

var partial_arg$1 = Rebase.$$Array[/* map */0];

var partial_arg$2 = Curry._2(Rebase.Fn[/* << */5], (function (prim) {
        return 1 - prim;
      }), ignoreKeyword);

var partial_arg$3 = Rebase.$$Array[/* filter */10];

var normalizeKeywords = Curry._2(Rebase.Fn[/* >> */6], Curry._2(Rebase.Fn[/* >> */6], Curry._2(Rebase.Fn[/* >> */6], (function (param) {
                return partial_arg((function (prim) {
                              return prim.toLocaleLowerCase();
                            }), param);
              }), (function (param) {
                return partial_arg$1(mapKeywordSynonym, param);
              })), (function (param) {
            return partial_arg$3(partial_arg$2, param);
          })), Utils.filterDuplicates);

function fromPublished(data) {
  return {
          type: "published",
          id: data[/* name */1],
          name: data[/* name */1],
          version: data[/* version */2],
          description: data[/* description */3],
          deprecated: Js_null_undefined.from_opt(data[/* deprecated */5]),
          author: Js_null_undefined.from_opt(data[/* author */6]),
          license: Js_null_undefined.from_opt(data[/* license */7]),
          keywords: Curry._1(normalizeKeywords, Rebase.Option[/* getOr */16](/* array */[], data[/* keywords */9])),
          readme: Rebase.Option[/* getOr */16]("", data[/* readme */8]),
          analyzed: data[/* analyzed */0],
          updated: data[/* analyzed */0],
          stars: Js_null_undefined.from_opt(data[/* stars */10]),
          score: data[/* score */11],
          quality: data[/* quality */12],
          popularity: data[/* popularity */13],
          maintenance: data[/* maintenance */14],
          homepageUrl: Js_null_undefined.from_opt(data[/* homepageUrl */15]),
          repositoryUrl: Js_null_undefined.from_opt(data[/* repositoryUrl */16]),
          npmUrl: Js_null_undefined.from_opt(data[/* npmUrl */17]),
          issuesUrl: Js_null_undefined.from_opt(data[/* issuesUrl */18]),
          docsUrl: undefined
        };
}

function fromUnpublished(repo, manifest, readme, stars) {
  return {
          type: "unpublished",
          id: Repository.makeId(repo),
          name: Repository.makeName(repo),
          version: manifest[/* version */1],
          description: Rebase.Option[/* getOr */16]("", manifest[/* description */2]),
          deprecated: undefined,
          author: Js_null_undefined.from_opt(manifest[/* author */3]),
          license: Js_null_undefined.from_opt(manifest[/* license */4]),
          keywords: Curry._1(normalizeKeywords, Rebase.Option[/* getOr */16](/* array */[], manifest[/* keywords */5])),
          readme: readme,
          analyzed: new Date(),
          updated: new Date(),
          stars: stars,
          score: 0,
          quality: 0,
          popularity: 0,
          maintenance: 0,
          homepageUrl: Js_null_undefined.from_opt(manifest[/* homepage */7]),
          repositoryUrl: Repository.getUrl(repo),
          npmUrl: undefined,
          issuesUrl: Js_null_undefined.from_opt(manifest[/* bugsUrl */9]),
          docsUrl: undefined
        };
}

exports.mapKeywordSynonym = mapKeywordSynonym;
exports.ignoreKeyword     = ignoreKeyword;
exports.normalizeKeywords = normalizeKeywords;
exports.fromPublished     = fromPublished;
exports.fromUnpublished   = fromUnpublished;
/* normalizeKeywords Not a pure module */
