

import * as Lint from "./common/Lint.bs.js";
import * as NPMS from "./common/NPMS.bs.js";
import * as Curry from "../node_modules/bs-platform/lib/es6/curry.js";
import * as Utils from "./common/Utils.bs.js";
import * as Rebase from "../node_modules/@glennsl/rebase/src/Rebase.bs.js";
import * as Resync from "../node_modules/refetch/src/Resync.bs.js";
import * as Package from "./common/Package.bs.js";
import * as Process from "process";
import * as Manifest from "./common/Manifest.bs.js";
import * as Repository from "./common/Repository.bs.js";

require('isomorphic-fetch')
;

var name = Rebase.Option[/* getOrRaise */17](Rebase.$$Array[/* get */17](Process.argv, 2));

var eventuallyPackage;

if (Rebase.$$String[/* startsWith */3]("github:", name)) {
  var repo = Repository.parse(name);
  var source_004 = /* platforms : array */[/* Any */3];
  var source = /* record */[
    /* id */name,
    /* repository */repo,
    /* category : Binding */0,
    /* flags : None */0,
    source_004,
    /* keywords : None */0,
    /* comment : None */0
  ];
  eventuallyPackage = Utils.Future[/* >>= */0](Manifest.get(repo), (function (manifest) {
          return Utils.Future[/* >>= */0](Repository.getReadme(repo), (function (readme) {
                        return Utils.Future[/* >>= */0](Repository.getStats(repo), (function (stats) {
                                      return Curry._1(Utils.Future[/* return */1], Package.fromUnpublished(source, manifest, readme, stats));
                                    }));
                      }));
        }));
} else {
  var source_003 = /* platforms : array */[/* Any */3];
  var source$1 = /* record */[
    /* id */name,
    /* category : Binding */0,
    /* flags : None */0,
    source_003,
    /* keywords : None */0,
    /* comment : None */0
  ];
  eventuallyPackage = Resync.Future[/* map */8]((function (param) {
          return Package.fromPublished(source$1, param);
        }), NPMS.get(name));
}

Resync.Future[/* whenCompleted */6]((function (param) {
        if (param.tag) {
          console.log("\x1b[33;1m");
          console.log("\n", name, "\n", param[0]);
          console.log("\x1b[0m");
          return /* () */0;
        } else {
          var $$package = param[0];
          var truncatedPackage = Rebase.$$String[/* length */1]($$package.readme) > 1000 ? Object.assign($$package, {
                  readme: Rebase.$$String[/* sub */9](0, 1000, $$package.readme) + "..."
                }) : $$package;
          console.log("\n", JSON.stringify(truncatedPackage, null, 2));
          var errors = Lint.lintPackage($$package);
          if (Rebase.List[/* isEmpty */15](errors)) {
            console.log("\x1b[32;1m");
            console.log("No problems! :)");
            console.log("\x1b[0m");
            return /* () */0;
          } else {
            console.log("\x1b[31;1m");
            console.log(String(Rebase.List[/* length */19](errors)) + " problems:");
            Rebase.List[/* forEach */8]((function (error) {
                    console.log("  ", error);
                    return /* () */0;
                  }), errors);
            console.log("\x1b[0m");
            return /* () */0;
          }
        }
      }), eventuallyPackage);

export {
  
}
/*  Not a pure module */
