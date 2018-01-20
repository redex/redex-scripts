#!/usr/bin/env node
'use strict';

var Json       = require("@glennsl/bs-json/src/Json.bs.js");
var Path       = require("path");
var Curry      = require("bs-platform/lib/js/curry.js");
var Utils      = require("./common/Utils.bs.js");
var Config     = require("./common/Config.bs.js");
var Rebase     = require("@glennsl/rebase/src/Rebase.bs.js");
var Resync     = require("refetch/src/Resync.bs.js");
var Source     = require("./common/Source.bs.js");
var Package    = require("./common/Package.bs.js");
var Manifest   = require("./common/Manifest.bs.js");
var Repository = require("./common/Repository.bs.js");

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
      }), Source.Unpublished[/* get */1](/* () */0));

/*  Not a pure module */
