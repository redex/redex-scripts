

import * as Curry from "../../node_modules/bs-platform/lib/es6/curry.js";
import * as Resync from "../../node_modules/refetch/src/Resync.bs.js";
import * as Refetch from "../../node_modules/refetch/src/Refetch.bs.js";
import * as Pervasives from "../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Json_decode from "../../node_modules/@glennsl/bs-json/src/Json_decode.bs.js";
import * as Refetch__Response from "../../node_modules/refetch/src/Refetch__Response.bs.js";

function fromJson(json) {
  return /* record */[
          /* name */Json_decode.field("name", Json_decode.string, json),
          /* version */Json_decode.field("version", Json_decode.string, json),
          /* description */Json_decode.optional((function (param) {
                  return Json_decode.field("description", Json_decode.string, param);
                }), json),
          /* author */Json_decode.optional((function (param) {
                  return Json_decode.field("author", Json_decode.string, param);
                }), json),
          /* license */Json_decode.optional(Json_decode.either(Json_decode.at(/* :: */[
                        "license",
                        /* :: */[
                          "type",
                          /* [] */0
                        ]
                      ], Json_decode.string), (function (param) {
                      return Json_decode.field("license", Json_decode.string, param);
                    })), json),
          /* keywords */Json_decode.optional((function (param) {
                  return Json_decode.field("keywords", (function (param) {
                                return Json_decode.array(Json_decode.string, param);
                              }), param);
                }), json),
          /* dependencies */Json_decode.optional((function (param) {
                  return Json_decode.field("dependencies", (function (param) {
                                return Json_decode.dict(Json_decode.string, param);
                              }), param);
                }), json),
          /* homepage */Json_decode.optional((function (param) {
                  return Json_decode.field("homepage", Json_decode.string, param);
                }), json),
          /* repositoryUrl */Json_decode.optional(Json_decode.either(Json_decode.at(/* :: */[
                        "repository",
                        /* :: */[
                          "url",
                          /* [] */0
                        ]
                      ], Json_decode.string), (function (param) {
                      return Json_decode.field("repository", Json_decode.string, param);
                    })), json),
          /* bugsUrl */Json_decode.optional(Json_decode.either(Json_decode.at(/* :: */[
                        "bugs",
                        /* :: */[
                          "url",
                          /* [] */0
                        ]
                      ], Json_decode.string), (function (param) {
                      return Json_decode.field("bugs", Json_decode.string, param);
                    })), json)
        ];
}

function get(repo) {
  var url = "https://raw.githubusercontent.com/" + (String(repo[0]) + ("/" + (String(repo[1]) + "/master/package.json")));
  return Resync.Future[/* map */8](fromJson, Resync.Future[/* flatMap */9]((function (param) {
                    if (param.tag) {
                      return Pervasives.failwith("failed to get package.json");
                    } else {
                      return Curry._1(Refetch__Response.json, param[1]);
                    }
                  }), Refetch.get(url)));
}

export {
  fromJson ,
  get ,
  
}
/* Refetch Not a pure module */
