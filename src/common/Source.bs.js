#!/usr/bin/env node
'use strict';

var Curry       = require("bs-platform/lib/js/curry.js");
var Rebase      = require("@glennsl/rebase/src/Rebase.bs.js");
var Js_dict     = require("bs-platform/lib/js/js_dict.js");
var Pervasives  = require("bs-platform/lib/js/pervasives.js");
var Repository  = require("./Repository.bs.js");
var Json_decode = require("@glennsl/bs-json/src/Json_decode.js");

function packageType(param) {
  return Json_decode.map((function (other) {
                switch (other) {
                  case "binding" : 
                      return /* Binding */0;
                  case "boilerplate" : 
                      return /* Boilerplate */3;
                  case "library" : 
                      return /* Library */1;
                  case "tool" : 
                      return /* Tool */2;
                  default:
                    return Pervasives.failwith("Unknown package type: " + other);
                }
              }), Json_decode.string, param);
}

function condition(param) {
  return Json_decode.map((function (other) {
                switch (other) {
                  case "deprecated" : 
                      return /* Deprecated */2;
                  case "maintained" : 
                      return /* Maintained */0;
                  case "neglected" : 
                      return /* Neglected */1;
                  default:
                    return Pervasives.failwith("Unknown condition: " + other);
                }
              }), Json_decode.string, param);
}

function platform(param) {
  return Json_decode.map((function (other) {
                switch (other) {
                  case "browser" : 
                      return /* Browser */0;
                  case "native" : 
                      return /* Native */2;
                  case "node" : 
                      return /* Node */1;
                  case "platform-independent" : 
                      return /* PlatformIndependent */3;
                  default:
                    return Pervasives.failwith("Unknown platform: " + other);
                }
              }), Json_decode.string, param);
}

function collection(decoder) {
  var partial_arg = Rebase.Fn[/* id */0];
  var partial_arg$1 = function (param) {
    return Json_decode.dict(partial_arg, param);
  };
  var partial_arg$2 = Curry._1(Rebase.Fn[/* uncurry */4], decoder);
  var partial_arg$3 = Rebase.$$Array[/* map */0];
  var partial_arg$4 = Curry._2(Rebase.Fn[/* >> */6], Curry._2(Rebase.Fn[/* >> */6], Js_dict.entries, (function (param) {
              return partial_arg$3(partial_arg$2, param);
            })), Rebase.List[/* fromArray */12]);
  return (function (param) {
      return Json_decode.map(partial_arg$4, partial_arg$1, param);
    });
}

var Decode = /* module */[
  /* packageType */packageType,
  /* condition */condition,
  /* platform */platform,
  /* collection */collection
];

function fromJson(key, json) {
  return /* record */[
          /* id */key,
          /* packageType */Json_decode.field("type", packageType, json),
          /* condition */Json_decode.field("condition", condition, json),
          /* platforms */Json_decode.field("platforms", (function (param) {
                  return Json_decode.list(platform, param);
                }), json),
          /* comment */Json_decode.optional((function (param) {
                  return Json_decode.field("comment", Json_decode.string, param);
                }), json)
        ];
}

var Published = /* module */[/* fromJson */fromJson];

function fromJson$1(key, json) {
  return /* record */[
          /* id */key,
          /* repository */Json_decode.field("repository", (function (param) {
                  return Json_decode.map(Repository.parse, Json_decode.string, param);
                }), json),
          /* packageType */Json_decode.field("type", packageType, json),
          /* condition */Json_decode.field("condition", condition, json),
          /* platforms */Json_decode.field("platforms", (function (param) {
                  return Json_decode.list(platform, param);
                }), json),
          /* comment */Json_decode.optional((function (param) {
                  return Json_decode.field("comment", Json_decode.string, param);
                }), json)
        ];
}

var Unpublished = /* module */[/* fromJson */fromJson$1];

exports.Decode      = Decode;
exports.Published   = Published;
exports.Unpublished = Unpublished;
/* Js_dict Not a pure module */
