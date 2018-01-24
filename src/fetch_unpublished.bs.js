'use strict';

import * as Json       from "../node_modules/@glennsl/bs-json/src/Json.bs.js";
import * as Path       from "path";
import * as Curry      from "../node_modules/bs-platform/lib/es6/curry.js";
import * as Utils      from "./common/Utils.bs.js";
import * as Config     from "./common/Config.bs.js";
import * as Rebase     from "../node_modules/@glennsl/rebase/src/Rebase.bs.js";
import * as Resync     from "../node_modules/refetch/src/Resync.bs.js";
import * as Source     from "./common/Source.bs.js";
import * as Package    from "./common/Package.bs.js";
import * as Manifest   from "./common/Manifest.bs.js";
import * as Repository from "./common/Repository.bs.js";

require('isomorphic-fetch')
;

Rebase.List[/* forEach */8]((function (source) {
        var repo = source[/* repository */1];
        return Resync.Future[/* whenCompleted */6]((function (param) {
                      if (param.tag) {
                        console.log("\n", repo, "\n", param[0]);
                        return /* () */0;
                      } else {
                        return /* () */0;
                      }
                    }), Utils.Future[/* >>= */0](Manifest.get(repo), (function (manifest) {
                          return Utils.Future[/* >>= */0](Repository.getReadme(repo), (function (readme) {
                                        return Utils.Future[/* >>= */0](Repository.getStats(repo), (function (stats) {
                                                      var json = Json.stringify(Package.fromUnpublished(source, manifest, readme, stats));
                                                      var path = Path.join(Config.packageDir, "unpublished", encodeURIComponent(Repository.makeId(repo)) + ".json");
                                                      return Curry._1(Utils.Future[/* return */1], Utils.Fs[/* writeFile */2](path, json));
                                                    }));
                                      }));
                        })));
      }), Source.Unpublished[/* get */1](/* None */0, /* () */0));

export {
  
}
/*  Not a pure module */
