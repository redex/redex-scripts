#!/usr/bin/env node
'use strict';

var Fs          = require("fs");
var Json        = require("@glennsl/bs-json/src/Json.js");
var Curry       = require("bs-platform/lib/js/curry.js");
var Config      = require("./Config.bs.js");
var Js_exn      = require("bs-platform/lib/js/js_exn.js");
var Rebase      = require("@glennsl/rebase/src/Rebase.bs.js");
var Js_dict     = require("bs-platform/lib/js/js_dict.js");
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
                    throw [
                          Json_decode.DecodeError,
                          "Unknown package type: " + other
                        ];
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
                    throw [
                          Json_decode.DecodeError,
                          "Unknown condition: " + other
                        ];
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
                    throw [
                          Json_decode.DecodeError,
                          "Unknown platform: " + other
                        ];
                }
              }), Json_decode.string, param);
}

function collection(decoder) {
  var partial_arg = Rebase.Fn[/* id */0];
  var partial_arg$1 = function (param) {
    return Json_decode.dict(partial_arg, param);
  };
  var partial_arg$2 = Rebase.$$Array[/* map */0];
  var partial_arg$3 = Curry._2(Rebase.Fn[/* >> */6], Curry._2(Rebase.Fn[/* >> */6], Js_dict.entries, (function (param) {
              return partial_arg$2((function (param) {
                            var key = param[0];
                            try {
                              return Curry._2(decoder, key, param[1]);
                            }
                            catch (raw_exn){
                              var exn = Js_exn.internalToOCamlException(raw_exn);
                              if (exn[0] === Json_decode.DecodeError) {
                                throw [
                                      Json_decode.DecodeError,
                                      exn[1] + ("\n\tat " + key)
                                    ];
                              } else {
                                throw exn;
                              }
                            }
                          }), param);
            })), Rebase.List[/* fromArray */12]);
  return (function (param) {
      return Json_decode.map(partial_arg$3, partial_arg$1, param);
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

function get() {
  return Json_decode.field("published", collection(fromJson), Json.parseOrRaise(Fs.readFileSync(Config.sourcesFile, "ascii")));
}

var Published = /* module */[
  /* fromJson */fromJson,
  /* get */get
];

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

function get$1() {
  return Json_decode.field("unpublished", collection(fromJson$1), Json.parseOrRaise(Fs.readFileSync(Config.sourcesFile, "ascii")));
}

var Unpublished = /* module */[
  /* fromJson */fromJson$1,
  /* get */get$1
];

exports.Decode      = Decode;
exports.Published   = Published;
exports.Unpublished = Unpublished;
/* fs Not a pure module */
