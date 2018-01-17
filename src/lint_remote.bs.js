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
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var Repository = require("./common/Repository.bs.js");

require('isomorphic-fetch')
;

var source = Caml_array.caml_array_get(Process.argv, 2);

var $$package;

if (source.includes("/")) {
  var repo = Repository.parse(source);
  $$package = Utils.Future[/* >>= */0](Manifest.get(repo), (function (manifest) {
          return Utils.Future[/* >>= */0](Repository.getReadme(repo), (function (readme) {
                        return Utils.Future[/* >>= */0](Repository.getStats(repo), (function (stats) {
                                      return Curry._1(Utils.Future[/* return */1], Package.fromUnpublished(repo, manifest, readme, stats));
                                    }));
                      }));
        }));
} else {
  $$package = Resync.Future[/* map */8](Package.fromPublished, NPMS.get(source));
}

Resync.Future[/* whenCompleted */6]((function (param) {
        if (param.tag) {
          console.log("\n", source, "\n", param[0]);
          return /* () */0;
        } else {
          var errors = Lint.lintPackage(param[0]);
          return Rebase.List[/* forEach */8]((function (error) {
                        console.log("  ", error);
                        return /* () */0;
                      }), errors);
        }
      }), $$package);

exports.source = source;
/*  Not a pure module */
