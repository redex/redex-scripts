#!/usr/bin/env node
'use strict';

var Json    = require("@glennsl/bs-json/src/Json.bs.js");
var NPMS    = require("./common/NPMS.bs.js");
var Path    = require("path");
var Utils   = require("./common/Utils.bs.js");
var Config  = require("./common/Config.bs.js");
var Rebase  = require("@glennsl/rebase/src/Rebase.bs.js");
var Resync  = require("refetch/src/Resync.bs.js");
var Source  = require("./common/Source.bs.js");
var Package = require("./common/Package.bs.js");

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
      }), Source.Published[/* get */1](/* () */0));

/*  Not a pure module */
