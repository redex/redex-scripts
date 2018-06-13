

import * as Curry from "../../node_modules/bs-platform/lib/es6/curry.js";
import * as Resync from "../../node_modules/refetch/src/Resync.bs.js";
import * as Refetch from "../../node_modules/refetch/src/Refetch.bs.js";
import * as Pervasives from "../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Json_decode from "../../node_modules/@glennsl/bs-json/src/Json_decode.bs.js";
import * as Refetch__Response from "../../node_modules/refetch/src/Refetch__Response.bs.js";

function _orElse(f, self) {
  if (self) {
    return self;
  } else {
    return Curry._1(f, /* () */0);
  }
}

function fromJson(param) {
  return Json_decode.obj((function (param) {
                var at = param[/* at */1];
                var field = param[/* field */0];
                return /* record */[
                        /* name */Curry._2(field[/* required */1], "name", Json_decode.string),
                        /* version */Curry._2(field[/* required */1], "version", Json_decode.string),
                        /* description */Curry._2(field[/* optional */0], "description", Json_decode.string),
                        /* author */Curry._2(field[/* optional */0], "author", Json_decode.string),
                        /* license */_orElse((function () {
                                return Curry._2(field[/* optional */0], "type", Json_decode.string);
                              }), Curry._2(at[/* optional */0], /* :: */[
                                  "license",
                                  /* :: */[
                                    "type",
                                    /* [] */0
                                  ]
                                ], Json_decode.string)),
                        /* keywords */Curry._2(field[/* optional */0], "keywords", (function (param) {
                                return Json_decode.array(Json_decode.string, param);
                              })),
                        /* dependencies */Curry._2(field[/* optional */0], "dependencies", (function (param) {
                                return Json_decode.dict(Json_decode.string, param);
                              })),
                        /* homepage */Curry._2(field[/* optional */0], "homepage", Json_decode.string),
                        /* repositoryUrl */_orElse((function () {
                                return Curry._2(field[/* optional */0], "repository", Json_decode.string);
                              }), Curry._2(at[/* optional */0], /* :: */[
                                  "repository",
                                  /* :: */[
                                    "url",
                                    /* [] */0
                                  ]
                                ], Json_decode.string)),
                        /* bugsUrl */_orElse((function () {
                                return Curry._2(field[/* optional */0], "bugs", Json_decode.string);
                              }), Curry._2(at[/* optional */0], /* :: */[
                                  "bugs",
                                  /* :: */[
                                    "url",
                                    /* [] */0
                                  ]
                                ], Json_decode.string))
                      ];
              }), param);
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
  _orElse ,
  fromJson ,
  get ,
  
}
/* Refetch Not a pure module */
