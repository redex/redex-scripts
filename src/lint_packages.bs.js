'use strict';

import * as Fs     from "fs";
import * as Json   from "../node_modules/@glennsl/bs-json/src/Json.bs.js";
import * as Lint   from "./common/Lint.bs.js";
import * as Utils  from "./common/Utils.bs.js";
import * as Config from "./common/Config.bs.js";
import * as Rebase from "../node_modules/@glennsl/rebase/src/Rebase.bs.js";

Rebase.$$Array[/* forEach */8]((function (param) {
        console.log("");
        console.log(param[0]);
        return Rebase.List[/* forEach */8]((function (error) {
                      console.log("  ", error);
                      return /* () */0;
                    }), param[1]);
      }), Rebase.$$Array[/* filter */10]((function (param) {
            return +(param[1] !== /* [] */0);
          }), Rebase.$$Array[/* map */0]((function (p) {
                return /* tuple */[
                        p.name,
                        Lint.lintPackage(p)
                      ];
              }), Rebase.$$Array[/* map */0]((function (prim) {
                    return prim;
                  }), Rebase.$$Array[/* map */0](Json.parseOrRaise, Rebase.$$Array[/* map */0]((function (path) {
                            return Fs.readFileSync(path, "utf8");
                          }), Utils.Fs[/* readDirRecursively */0](Config.packageDir)))))));

export {
  
}
/*  Not a pure module */
