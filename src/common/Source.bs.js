

import * as Fs from "fs";
import * as Json from "../../node_modules/@glennsl/bs-json/src/Json.bs.js";
import * as Curry from "../../node_modules/bs-platform/lib/es6/curry.js";
import * as Config from "./Config.bs.js";
import * as Js_exn from "../../node_modules/bs-platform/lib/es6/js_exn.js";
import * as Rebase from "../../node_modules/@glennsl/rebase/src/Rebase.bs.js";
import * as Js_dict from "../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Repository from "./Repository.bs.js";
import * as Json_decode from "../../node_modules/@glennsl/bs-json/src/Json_decode.bs.js";

function category(param) {
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

function platform(param) {
  return Json_decode.map((function (other) {
                switch (other) {
                  case "any" : 
                      return /* Any */3;
                  case "browser" : 
                      return /* Browser */0;
                  case "native" : 
                      return /* Native */2;
                  case "node" : 
                      return /* Node */1;
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
  /* category */category,
  /* platform */platform,
  /* collection */collection
];

function fromJson(key, json) {
  return /* record */[
          /* id */key,
          /* category */Json_decode.field("category", category, json),
          /* flags */Json_decode.optional((function (param) {
                  return Json_decode.field("flags", (function (param) {
                                return Json_decode.array(Json_decode.string, param);
                              }), param);
                }), json),
          /* platforms */Json_decode.field("platforms", (function (param) {
                  return Json_decode.array(platform, param);
                }), json),
          /* keywords */Json_decode.optional((function (param) {
                  return Json_decode.field("keywords", (function (param) {
                                return Json_decode.array(Json_decode.string, param);
                              }), param);
                }), json),
          /* comment */Json_decode.optional((function (param) {
                  return Json_decode.field("comment", Json_decode.string, param);
                }), json)
        ];
}

function get($staropt$star, _) {
  var filename = $staropt$star ? $staropt$star[0] : Config.sourcesFile;
  return Json_decode.field("published", collection(fromJson), Json.parseOrRaise(Fs.readFileSync(filename, "ascii")));
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
          /* category */Json_decode.field("category", category, json),
          /* flags */Json_decode.optional((function (param) {
                  return Json_decode.field("flags", (function (param) {
                                return Json_decode.array(Json_decode.string, param);
                              }), param);
                }), json),
          /* platforms */Json_decode.field("platforms", (function (param) {
                  return Json_decode.array(platform, param);
                }), json),
          /* keywords */Json_decode.optional((function (param) {
                  return Json_decode.field("keywords", (function (param) {
                                return Json_decode.array(Json_decode.string, param);
                              }), param);
                }), json),
          /* comment */Json_decode.optional((function (param) {
                  return Json_decode.field("comment", Json_decode.string, param);
                }), json)
        ];
}

function get$1($staropt$star, _) {
  var filename = $staropt$star ? $staropt$star[0] : Config.sourcesFile;
  return Json_decode.field("unpublished", collection(fromJson$1), Json.parseOrRaise(Fs.readFileSync(filename, "ascii")));
}

var Unpublished = /* module */[
  /* fromJson */fromJson$1,
  /* get */get$1
];

export {
  Decode ,
  Published ,
  Unpublished ,
  
}
/* fs Not a pure module */
