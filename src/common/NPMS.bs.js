

import * as Curry from "../../node_modules/bs-platform/lib/es6/curry.js";
import * as Resync from "../../node_modules/refetch/src/Resync.bs.js";
import * as Refetch from "../../node_modules/refetch/src/Refetch.bs.js";
import * as Pervasives from "../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Json_decode from "../../node_modules/@glennsl/bs-json/src/Json_decode.bs.js";
import * as Refetch__Response from "../../node_modules/refetch/src/Refetch__Response.bs.js";

function fromJson(param) {
  return Json_decode.obj((function (param) {
                var at = param[/* at */1];
                return /* record */[
                        /* analyzed */Curry._2(param[/* field */0][/* required */1], "analyzedAt", (function (param) {
                                return Json_decode.map((function (prim) {
                                              return new Date(prim);
                                            }), Json_decode.string, param);
                              })),
                        /* name */Curry._2(at[/* required */1], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "name",
                                  /* [] */0
                                ]
                              ]
                            ], Json_decode.string),
                        /* version */Curry._2(at[/* required */1], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "version",
                                  /* [] */0
                                ]
                              ]
                            ], Json_decode.string),
                        /* description */Curry._2(at[/* required */1], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "description",
                                  /* [] */0
                                ]
                              ]
                            ], Json_decode.string),
                        /* updated */Curry._2(at[/* required */1], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "date",
                                  /* [] */0
                                ]
                              ]
                            ], (function (param) {
                                return Json_decode.map((function (prim) {
                                              return new Date(prim);
                                            }), Json_decode.string, param);
                              })),
                        /* deprecated */Curry._2(at[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "deprecated",
                                  /* [] */0
                                ]
                              ]
                            ], Json_decode.string),
                        /* author */Curry._2(at[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "author",
                                  /* :: */[
                                    "name",
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ], Json_decode.string),
                        /* license */Curry._2(at[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "license",
                                  /* [] */0
                                ]
                              ]
                            ], Json_decode.string),
                        /* readme */Curry._2(at[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "readme",
                                  /* [] */0
                                ]
                              ]
                            ], Json_decode.string),
                        /* keywords */Curry._2(at[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "keywords",
                                  /* [] */0
                                ]
                              ]
                            ], (function (param) {
                                return Json_decode.array(Json_decode.string, param);
                              })),
                        /* stars */Curry._2(at[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "github",
                                /* :: */[
                                  "starsCount",
                                  /* [] */0
                                ]
                              ]
                            ], Json_decode.$$int),
                        /* score */Curry._2(at[/* required */1], /* :: */[
                              "score",
                              /* :: */[
                                "final",
                                /* [] */0
                              ]
                            ], Json_decode.$$float),
                        /* quality */Curry._2(at[/* required */1], /* :: */[
                              "score",
                              /* :: */[
                                "detail",
                                /* :: */[
                                  "quality",
                                  /* [] */0
                                ]
                              ]
                            ], Json_decode.$$float),
                        /* popularity */Curry._2(at[/* required */1], /* :: */[
                              "score",
                              /* :: */[
                                "detail",
                                /* :: */[
                                  "popularity",
                                  /* [] */0
                                ]
                              ]
                            ], Json_decode.$$float),
                        /* maintenance */Curry._2(at[/* required */1], /* :: */[
                              "score",
                              /* :: */[
                                "detail",
                                /* :: */[
                                  "maintenance",
                                  /* [] */0
                                ]
                              ]
                            ], Json_decode.$$float),
                        /* homepageUrl */Curry._2(at[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "links",
                                  /* :: */[
                                    "homepage",
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ], Json_decode.string),
                        /* repositoryUrl */Curry._2(at[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "links",
                                  /* :: */[
                                    "repository",
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ], Json_decode.string),
                        /* npmUrl */Curry._2(at[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "links",
                                  /* :: */[
                                    "npm",
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ], Json_decode.string),
                        /* issuesUrl */Curry._2(at[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "links",
                                  /* :: */[
                                    "bugs",
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ], Json_decode.string)
                      ];
              }), param);
}

function get(packageName) {
  var escapedName = encodeURIComponent(packageName);
  var url = "https://api.npms.io/v2/package/" + (String(escapedName) + "");
  return Resync.Future[/* map */8](fromJson, Resync.Future[/* flatMap */9]((function (param) {
                    if (param.tag) {
                      var status = param[0];
                      return Resync.Future[/* map */8]((function (r) {
                                    return Pervasives.failwith("failed to get data from npms.io: " + (status[/* reason */1] + (", " + r)));
                                  }), Curry._1(Refetch__Response.text, param[1]));
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
