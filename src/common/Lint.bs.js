

import * as Curry from "../../node_modules/bs-platform/lib/es6/curry.js";
import * as Rebase from "../../node_modules/@glennsl/rebase/src/Rebase.bs.js";
import * as Js_primitive from "../../node_modules/bs-platform/lib/es6/js_primitive.js";

function lints_000($$package) {
  var match = Rebase.$$String[/* trim */8]($$package.description) === "";
  if (match) {
    return /* Some */["Missing description"];
  } else {
    return /* None */0;
  }
}

var lints_001 = /* :: */[
  (function ($$package) {
      var match = Rebase.$$String[/* trim */8]($$package.readme) === "";
      if (match) {
        return /* Some */["Missing readme"];
      } else {
        return /* None */0;
      }
    }),
  /* :: */[
    (function ($$package) {
        var l = Rebase.$$String[/* length */1](Rebase.$$String[/* trim */8]($$package.readme));
        var match = l > 0 && l < 400;
        if (match) {
          return /* Some */["Short readme"];
        } else {
          return /* None */0;
        }
      }),
    /* :: */[
      (function ($$package) {
          var match = ($$package.license == null);
          if (match) {
            return /* Some */["Missing license"];
          } else {
            return /* None */0;
          }
        }),
      /* :: */[
        (function ($$package) {
            var match = Rebase.$$Array[/* length */16]($$package.keywords) === 0;
            if (match) {
              return /* Some */["Missing keywords"];
            } else {
              return /* None */0;
            }
          }),
        /* :: */[
          (function ($$package) {
              var sorted = $$package.keywords.slice().sort();
              var match = sorted.some((function (x, i) {
                      return x === Rebase.$$Array[/* unsafeGetUnchecked */21](i - 1 | 0, sorted);
                    }));
              if (match) {
                return /* Some */["Duplicate keywords"];
              } else {
                return /* None */0;
              }
            }),
          /* :: */[
            (function ($$package) {
                var match = Rebase.$$Array[/* exists */9]((function (k) {
                        return Rebase.$$String[/* startsWith */3]("bs-", k);
                      }), $$package.keywords);
                if (match) {
                  return /* Some */["Keyword starting with 'bs-'"];
                } else {
                  return /* None */0;
                }
              }),
            /* :: */[
              (function ($$package) {
                  var match = ($$package.repositoryUrl == null);
                  if (match) {
                    return /* Some */["Missing repository url"];
                  } else {
                    return /* None */0;
                  }
                }),
              /* :: */[
                (function ($$package) {
                    var match = ($$package.homepageUrl == null);
                    if (match) {
                      return /* Some */["Missing homepage url"];
                    } else {
                      return /* None */0;
                    }
                  }),
                /* :: */[
                  (function ($$package) {
                      var match = ($$package.issuesUrl == null);
                      if (match) {
                        return /* Some */["Missing issues url"];
                      } else {
                        return /* None */0;
                      }
                    }),
                  /* :: */[
                    (function ($$package) {
                        var match = Rebase.$$String[/* length */1]($$package.readme) > 10000;
                        if (match) {
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

export {
  lints ,
  lintPackage ,
  
}
/* No side effect */
