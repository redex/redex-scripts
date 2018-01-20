'use strict';

import * as Curry             from "../../node_modules/bs-platform/lib/es6/curry.js";
import * as Utils             from "./Utils.bs.js";
import * as Rebase            from "../../node_modules/@glennsl/rebase/src/Rebase.bs.js";
import * as Repository        from "./Repository.bs.js";
import * as Js_null_undefined from "../../node_modules/bs-platform/lib/es6/js_null_undefined.js";

function _encodecategory(param) {
  switch (param) {
    case 0 : 
        return "binding";
    case 1 : 
        return "library";
    case 2 : 
        return "tool";
    case 3 : 
        return "boilerplate";
    
  }
}

function _encodePlatform(param) {
  switch (param) {
    case 0 : 
        return "browser";
    case 1 : 
        return "node";
    case 2 : 
        return "native";
    case 3 : 
        return "any";
    
  }
}

function _mapKeywordSynonym(keyword) {
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
    case "reason-react" : 
    case "reasonreact" : 
        return "react";
    case "regex" : 
        return "regular expressions";
    case "tdd" : 
    case "test" : 
        return "testing";
    default:
      return keyword;
  }
}

function _ignoreKeyword(k) {
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
      }), _ignoreKeyword);

var partial_arg$3 = Rebase.$$Array[/* filter */10];

var _normalizeKeywords = Curry._2(Rebase.Fn[/* >> */6], Curry._2(Rebase.Fn[/* >> */6], Curry._2(Rebase.Fn[/* >> */6], (function (param) {
                return partial_arg((function (prim) {
                              return prim.toLowerCase();
                            }), param);
              }), (function (param) {
                return partial_arg$1(_mapKeywordSynonym, param);
              })), (function (param) {
            return partial_arg$3(partial_arg$2, param);
          })), Utils.filterDuplicates);

function fromPublished(source, data) {
  return {
          type: "published",
          id: data[/* name */1],
          name: data[/* name */1],
          version: data[/* version */2],
          category: _encodecategory(source[/* category */1]),
          flags: Rebase.Option[/* getOr */16](/* array */[], source[/* flags */2]),
          platforms: Rebase.$$Array[/* map */0](_encodePlatform, source[/* platforms */3]),
          description: data[/* description */3],
          deprecated: Js_null_undefined.from_opt(data[/* deprecated */5]),
          author: Js_null_undefined.from_opt(data[/* author */6]),
          license: Js_null_undefined.from_opt(data[/* license */7]),
          keywords: Curry._1(_normalizeKeywords, Rebase.Option[/* getOr */16](/* array */[], Rebase.Option[/* or_ */15](data[/* keywords */9], source[/* keywords */4]))),
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

function fromUnpublished(source, manifest, readme, stars) {
  return {
          type: "unpublished",
          id: Repository.makeId(source[/* repository */1]),
          name: Repository.makeName(source[/* repository */1]),
          version: manifest[/* version */1],
          category: _encodecategory(source[/* category */2]),
          flags: Rebase.Option[/* getOr */16](/* array */[], source[/* flags */3]),
          platforms: Rebase.$$Array[/* map */0](_encodePlatform, source[/* platforms */4]),
          description: Rebase.Option[/* getOr */16]("", manifest[/* description */2]),
          deprecated: undefined,
          author: Js_null_undefined.from_opt(manifest[/* author */3]),
          license: Js_null_undefined.from_opt(manifest[/* license */4]),
          keywords: Curry._1(_normalizeKeywords, Rebase.Option[/* getOr */16](/* array */[], Rebase.Option[/* or_ */15](manifest[/* keywords */5], source[/* keywords */5]))),
          readme: readme,
          analyzed: new Date(),
          updated: new Date(),
          stars: stars,
          score: 0,
          quality: 0,
          popularity: 0,
          maintenance: 0,
          homepageUrl: Js_null_undefined.from_opt(manifest[/* homepage */7]),
          repositoryUrl: Repository.getUrl(source[/* repository */1]),
          npmUrl: undefined,
          issuesUrl: Js_null_undefined.from_opt(manifest[/* bugsUrl */9]),
          docsUrl: undefined
        };
}

export {
  _encodecategory    ,
  _encodePlatform    ,
  _mapKeywordSynonym ,
  _ignoreKeyword     ,
  _normalizeKeywords ,
  fromPublished      ,
  fromUnpublished    ,
  
}
/* _normalizeKeywords Not a pure module */
