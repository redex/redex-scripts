#!/usr/bin/env node
'use strict';

var Curry  = require("bs-platform/lib/js/curry.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");

var lints_000 = /* tuple */[
  "Missing description",
  (function ($$package) {
      return +($$package.description.trim() === "");
    })
];

var lints_001 = /* :: */[
  /* tuple */[
    "Missing readme",
    (function ($$package) {
        return +($$package.readme.trim() === "");
      })
  ],
  /* :: */[
    /* tuple */[
      "Short readme",
      (function ($$package) {
          var l = $$package.readme.trim().length;
          if (l > 0) {
            return +(l < 400);
          } else {
            return /* false */0;
          }
        })
    ],
    /* :: */[
      /* tuple */[
        "Missing license",
        (function ($$package) {
            return +($$package.license == null);
          })
      ],
      /* :: */[
        /* tuple */[
          "Missing keywords",
          (function ($$package) {
              return +(Rebase.$$Array[/* length */16]($$package.keywords) === 0);
            })
        ],
        /* :: */[
          /* tuple */[
            "Missing repository url",
            (function ($$package) {
                return +($$package.repositoryUrl == null);
              })
          ],
          /* :: */[
            /* tuple */[
              "Missing homepage url",
              (function ($$package) {
                  return +($$package.homepageUrl == null);
                })
            ],
            /* :: */[
              /* tuple */[
                "Missing issues url",
                (function ($$package) {
                    return +($$package.issuesUrl == null);
                  })
              ],
              /* :: */[
                /* tuple */[
                  "Readme > 10k bytes",
                  (function ($$package) {
                      return +(Rebase.$$String[/* length */1]($$package.readme) > 10000);
                    })
                ],
                /* [] */0
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
  return Rebase.List[/* map */0](Rebase.Option[/* getOrRaise */17], Rebase.List[/* filter */10](Rebase.Option[/* isSome */13], Rebase.List[/* map */0]((function (param) {
                        var match = Curry._1(param[1], $$package);
                        if (match !== 0) {
                          return /* Some */[param[0]];
                        } else {
                          return /* None */0;
                        }
                      }), lints)));
}

exports.lints       = lints;
exports.lintPackage = lintPackage;
/* No side effect */
