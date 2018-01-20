'use strict';

import * as Fs                      from "fs";
import * as Json                    from "../node_modules/@glennsl/bs-json/src/Json.bs.js";
import * as Path                    from "path";
import * as Utils                   from "./common/Utils.bs.js";
import * as Config                  from "./common/Config.bs.js";
import * as Rebase                  from "../node_modules/@glennsl/rebase/src/Rebase.bs.js";
import * as Hashtbl                 from "../node_modules/bs-platform/lib/es6/hashtbl.js";
import * as Js_dict                 from "../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Json_decode             from "../node_modules/@glennsl/bs-json/src/Json_decode.bs.js";
import * as Json_encode             from "../node_modules/@glennsl/bs-json/src/Json_encode.bs.js";
import * as Caml_builtin_exceptions from "../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";

var outputFile = Path.join(Config.outputDir, "keywords.json");

function getKeywords(json) {
  return /* tuple */[
          Json_decode.field("id", Json_decode.string, json),
          Json_decode.field("keywords", (function (param) {
                  return Json_decode.array(Json_decode.string, param);
                }), json)
        ];
}

function makeInvertedIndex(data) {
  var index = Hashtbl.create(/* None */0, Rebase.$$Array[/* length */16](data));
  Rebase.$$Array[/* forEach */8]((function (param) {
          var id = param[0];
          return Rebase.$$Array[/* forEach */8]((function (keyword) {
                        var old;
                        try {
                          old = Hashtbl.find(index, keyword);
                        }
                        catch (exn){
                          if (exn === Caml_builtin_exceptions.not_found) {
                            old = /* [] */0;
                          } else {
                            throw exn;
                          }
                        }
                        return Hashtbl.replace(index, keyword, /* :: */[
                                    id,
                                    old
                                  ]);
                      }), param[1]);
        }), data);
  return Hashtbl.fold((function (k, v, acc) {
                return /* :: */[
                        /* tuple */[
                          k,
                          v
                        ],
                        acc
                      ];
              }), index, /* [] */0);
}

var json = Json.stringify(Json_encode.list((function (prim) {
            return prim;
          }), Rebase.List[/* map */0]((function (param) {
                var packages = param[1];
                return Js_dict.fromList(/* :: */[
                            /* tuple */[
                              "name",
                              param[0]
                            ],
                            /* :: */[
                              /* tuple */[
                                "count",
                                Rebase.List[/* length */19](packages)
                              ],
                              /* :: */[
                                /* tuple */[
                                  "packages",
                                  Json_encode.list((function (prim) {
                                          return prim;
                                        }), packages)
                                ],
                                /* [] */0
                              ]
                            ]
                          ]);
              }), makeInvertedIndex(Rebase.$$Array[/* map */0](getKeywords, Rebase.$$Array[/* map */0](Json.parseOrRaise, Rebase.$$Array[/* map */0]((function (path) {
                                return Fs.readFileSync(path, "utf8");
                              }), Rebase.$$Array[/* filter */10]((function (path) {
                                    return Rebase.$$String[/* endsWith */4](".json", path);
                                  }), Utils.Fs[/* readDirRecursively */0](Config.packageDir)))))))));

Utils.Fs[/* writeFile */2](outputFile, json);

export {
  outputFile        ,
  getKeywords       ,
  makeInvertedIndex ,
  
}
/* outputFile Not a pure module */
