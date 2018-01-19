#!/usr/bin/env node
'use strict';

var Lint       = require("./common/Lint.bs.js");
var NPMS       = require("./common/NPMS.bs.js");
var Curry      = require("bs-platform/lib/js/curry.js");
var Utils      = require("./common/Utils.bs.js");
var Rebase     = require("@glennsl/rebase/src/Rebase.bs.js");
var Resync     = require("refetch/src/Resync.js");
var Package    = require("./common/Package.bs.js");
var Process    = require("process");
var Manifest   = require("./common/Manifest.bs.js");
var Pervasives = require("bs-platform/lib/js/pervasives.js");
var Repository = require("./common/Repository.bs.js");

require('isomorphic-fetch')
;

var name = Rebase.Option[/* getOrRaise */17](Rebase.$$Array[/* get */17](Process.argv, 2));

var eventuallyPackage;

if (Rebase.$$String[/* startsWith */3]("github:", name)) {
  var repo = Repository.parse(name);
  var source_004 = /* platforms : int array */[/* Any */3];
  var source = /* record */[
    /* id */name,
    /* repository */repo,
    /* packageType : Binding */0,
    /* condition : Maintained */0,
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
  var source_003 = /* platforms : int array */[/* Any */3];
  var source$1 = /* record */[
    /* id */name,
    /* packageType : Binding */0,
    /* condition : Maintained */0,
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
          console.log("\n", JSON.stringify(truncatedPackage, (null), 2));
          var errors = Lint.lintPackage($$package);
          if (Rebase.List[/* isEmpty */15](errors)) {
            console.log("\x1b[32;1m");
            console.log("No problems! :)");
            console.log("\x1b[0m");
            return /* () */0;
          } else {
            console.log("\x1b[31;1m");
            console.log(Pervasives.string_of_int(Rebase.List[/* length */19](errors)) + " problems:");
            Rebase.List[/* forEach */8]((function (error) {
                    console.log("  ", error);
                    return /* () */0;
                  }), errors);
            console.log("\x1b[0m");
            return /* () */0;
          }
        }
      }), eventuallyPackage);

/*  Not a pure module */
