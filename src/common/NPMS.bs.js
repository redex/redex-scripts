#!/usr/bin/env node
'use strict';

var Curry             = require("bs-platform/lib/js/curry.js");
var Resync            = require("refetch/src/Resync.js");
var Refetch           = require("refetch/src/Refetch.js");
var Pervasives        = require("bs-platform/lib/js/pervasives.js");
var Json_decode       = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Refetch__Response = require("refetch/src/Refetch__Response.js");

function fromJson(json) {
  return /* record */[
          /* analyzed */Json_decode.field("analyzedAt", (function (param) {
                  return Json_decode.map((function (prim) {
                                return new Date(prim);
                              }), Json_decode.string, param);
                }), json),
          /* name */Curry._1(Json_decode.at(/* :: */[
                    "collected",
                    /* :: */[
                      "metadata",
                      /* :: */[
                        "name",
                        /* [] */0
                      ]
                    ]
                  ], Json_decode.string), json),
          /* version */Curry._1(Json_decode.at(/* :: */[
                    "collected",
                    /* :: */[
                      "metadata",
                      /* :: */[
                        "version",
                        /* [] */0
                      ]
                    ]
                  ], Json_decode.string), json),
          /* description */Curry._1(Json_decode.at(/* :: */[
                    "collected",
                    /* :: */[
                      "metadata",
                      /* :: */[
                        "description",
                        /* [] */0
                      ]
                    ]
                  ], Json_decode.string), json),
          /* updated */Curry._1(Json_decode.at(/* :: */[
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
                    })), json),
          /* deprecated */Json_decode.optional(Json_decode.at(/* :: */[
                    "collected",
                    /* :: */[
                      "metadata",
                      /* :: */[
                        "deprecated",
                        /* [] */0
                      ]
                    ]
                  ], Json_decode.string), json),
          /* author */Json_decode.optional(Json_decode.at(/* :: */[
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
                  ], Json_decode.string), json),
          /* license */Json_decode.optional(Json_decode.at(/* :: */[
                    "collected",
                    /* :: */[
                      "metadata",
                      /* :: */[
                        "license",
                        /* [] */0
                      ]
                    ]
                  ], Json_decode.string), json),
          /* readme */Json_decode.optional(Json_decode.at(/* :: */[
                    "collected",
                    /* :: */[
                      "metadata",
                      /* :: */[
                        "readme",
                        /* [] */0
                      ]
                    ]
                  ], Json_decode.string), json),
          /* keywords */Json_decode.optional(Json_decode.at(/* :: */[
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
                    })), json),
          /* stars */Json_decode.optional(Json_decode.at(/* :: */[
                    "collected",
                    /* :: */[
                      "github",
                      /* :: */[
                        "starsCount",
                        /* [] */0
                      ]
                    ]
                  ], Json_decode.$$int), json),
          /* score */Curry._1(Json_decode.at(/* :: */[
                    "score",
                    /* :: */[
                      "final",
                      /* [] */0
                    ]
                  ], Json_decode.$$float), json),
          /* quality */Curry._1(Json_decode.at(/* :: */[
                    "score",
                    /* :: */[
                      "detail",
                      /* :: */[
                        "quality",
                        /* [] */0
                      ]
                    ]
                  ], Json_decode.$$float), json),
          /* popularity */Curry._1(Json_decode.at(/* :: */[
                    "score",
                    /* :: */[
                      "detail",
                      /* :: */[
                        "popularity",
                        /* [] */0
                      ]
                    ]
                  ], Json_decode.$$float), json),
          /* maintenance */Curry._1(Json_decode.at(/* :: */[
                    "score",
                    /* :: */[
                      "detail",
                      /* :: */[
                        "maintenance",
                        /* [] */0
                      ]
                    ]
                  ], Json_decode.$$float), json),
          /* homepageUrl */Json_decode.optional(Json_decode.at(/* :: */[
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
                  ], Json_decode.string), json),
          /* repositoryUrl */Json_decode.optional(Json_decode.at(/* :: */[
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
                  ], Json_decode.string), json),
          /* npmUrl */Json_decode.optional(Json_decode.at(/* :: */[
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
                  ], Json_decode.string), json),
          /* issuesUrl */Json_decode.optional(Json_decode.at(/* :: */[
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
                  ], Json_decode.string), json)
        ];
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

exports.fromJson = fromJson;
exports.get      = get;
/* Refetch Not a pure module */
