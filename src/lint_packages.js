#!/usr/bin/env node
'use strict';

var Fs     = require("fs");
var Lint   = require("./common/Lint.js");
var Utils  = require("./common/Utils.js");
var Config = require("./common/Config.js");
var Rebase = require("@glennsl/rebase/src/Rebase.bs.js");

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
                  }), Rebase.$$Array[/* map */0]((function (prim) {
                        return JSON.parse(prim);
                      }), Rebase.$$Array[/* map */0]((function (path) {
                            return Fs.readFileSync(path, "utf8");
                          }), Utils.Fs[/* readDirRecursively */0](Config.packageDir)))))));

/*  Not a pure module */
