'use strict';

import * as Json    from "../node_modules/@glennsl/bs-json/src/Json.bs.js";
import * as NPMS    from "./common/NPMS.bs.js";
import * as Path    from "path";
import * as Utils   from "./common/Utils.bs.js";
import * as Config  from "./common/Config.bs.js";
import * as Rebase  from "../node_modules/@glennsl/rebase/src/Rebase.bs.js";
import * as Resync  from "../node_modules/refetch/src/Resync.bs.js";
import * as Source  from "./common/Source.bs.js";
import * as Package from "./common/Package.bs.js";

require('isomorphic-fetch')
;

Rebase.List[/* forEach */8]((function (source) {
        return Resync.Future[/* whenCompleted */6]((function (param) {
                      if (param.tag) {
                        console.log("\n", source[/* id */0], "\n", param[0]);
                        return /* () */0;
                      } else {
                        var data = param[0];
                        var json = Json.stringify(Package.fromPublished(source, data));
                        var path = Path.join(Config.packageDir, encodeURIComponent(data[/* name */1]) + ".json");
                        return Utils.Fs[/* writeFile */2](path, json);
                      }
                    }), NPMS.get(source[/* id */0]));
      }), Source.Published[/* get */1](/* None */0, /* () */0));

export {
  
}
/*  Not a pure module */
