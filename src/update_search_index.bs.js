'use strict';

import * as Fs            from "fs";
import * as Json          from "../node_modules/@glennsl/bs-json/src/Json.bs.js";
import * as $$Array       from "../node_modules/bs-platform/lib/es6/array.js";
import * as Utils         from "./common/Utils.bs.js";
import * as Config        from "./common/Config.bs.js";
import * as Algoliasearch from "algoliasearch";

var client = Algoliasearch(Config.Algolia[/* appId */0], Config.Algolia[/* apiKey */2](/* () */0));

var index = client.initIndex(Config.Algolia[/* packageIndex */1]);

$$Array.map((function (record) {
        index.addObject(record, (function (err, _) {
                if (err == null) {
                  return /* () */0;
                } else {
                  console.log("");
                  console.log(record.id);
                  console.log("  ", err.message);
                  return /* () */0;
                }
              }));
        return /* () */0;
      }), $$Array.map((function (record) {
            return Object.assign({
                        objectID: record.id
                      }, record);
          }), $$Array.map((function (prim) {
                return prim;
              }), $$Array.map(Json.parseOrRaise, $$Array.map((function (path) {
                        return Fs.readFileSync(path, "utf8");
                      }), Utils.Fs[/* readDirRecursively */0](Config.packageDir))))));

export {
  client ,
  index  ,
  
}
/* client Not a pure module */
