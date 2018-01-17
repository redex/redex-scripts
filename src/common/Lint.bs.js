#!/usr/bin/env node
'use strict';

var Curry        = require("bs-platform/lib/js/curry.js");
var Rebase       = require("@glennsl/rebase/src/Rebase.bs.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");

function lints_000($$package) {
  var match = +($$package.description.trim() === "");
  if (match !== 0) {
    return /* Some */["Missing description"];
  } else {
    return /* None */0;
  }
}

var lints_001 = /* :: */[
  (function ($$package) {
      var match = +($$package.readme.trim() === "");
      if (match !== 0) {
        return /* Some */["Missing readme"];
      } else {
        return /* None */0;
      }
    }),
  /* :: */[
    (function ($$package) {
        var l = $$package.readme.trim().length;
        var match = +(l > 0 && l < 400);
        if (match !== 0) {
          return /* Some */["Short readme"];
        } else {
          return /* None */0;
        }
      }),
    /* :: */[
      (function ($$package) {
          var match = +($$package.license == null);
          if (match !== 0) {
            return /* Some */["Missing license"];
          } else {
            return /* None */0;
          }
        }),
      /* :: */[
        (function ($$package) {
            var match = +(Rebase.$$Array[/* length */16]($$package.keywords) === 0);
            if (match !== 0) {
              return /* Some */["Missing keywords"];
            } else {
              return /* None */0;
            }
          }),
        /* :: */[
          (function ($$package) {
              var match = Rebase.$$Array[/* exists */9]((function (k) {
                      return Rebase.$$String[/* startsWith */3]("bs-", k);
                    }), $$package.keywords);
              if (match !== 0) {
                return /* Some */["Keyword starting with 'bs-'"];
              } else {
                return /* None */0;
              }
            }),
          /* :: */[
            (function ($$package) {
                var match = +($$package.repositoryUrl == null);
                if (match !== 0) {
                  return /* Some */["Missing repository url"];
                } else {
                  return /* None */0;
                }
              }),
            /* :: */[
              (function ($$package) {
                  var match = +($$package.homepageUrl == null);
                  if (match !== 0) {
                    return /* Some */["Missing homepage url"];
                  } else {
                    return /* None */0;
                  }
                }),
              /* :: */[
                (function ($$package) {
                    var match = +($$package.issuesUrl == null);
                    if (match !== 0) {
                      return /* Some */["Missing issues url"];
                    } else {
                      return /* None */0;
                    }
                  }),
                /* :: */[
                  (function ($$package) {
                      var match = +(Rebase.$$String[/* length */1]($$package.readme) > 10000);
                      if (match !== 0) {
                        return /* Some */["Readme > 10k bytes"];
                      } else {
                        return /* None */0;
                      }
                    }),
                  /* :: */[
                    (function ($$package) {
                        return Rebase.Option[/* map */0]((function (message) {
                                      return "Deprecated - " + message;
                                    }), Js_primitive.null_undefined_to_opt($$package.deprecated));
                      }),
                    /* [] */0
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
];

var lints = /* :: */[
  lints_000,
  lints_001
];

function lintPackage($$package) {
  return Rebase.List[/* filterMap */18]((function (lint) {
                return Curry._1(lint, $$package);
              }), lints);
}

exports.lints       = lints;
exports.lintPackage = lintPackage;
/* No side effect */
