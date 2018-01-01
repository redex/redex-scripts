#!/usr/bin/env node
'use strict';

var Fs            = require("fs");
var $$Array       = require("bs-platform/lib/js/array.js");
var Utils         = require("./common/Utils.js");
var Config        = require("./common/Config.js");
var Process       = require("process");
var Caml_array    = require("bs-platform/lib/js/caml_array.js");
var Algoliasearch = require("algoliasearch");

var apiKey = Caml_array.caml_array_get(Process.argv, 2);

var client = Algoliasearch(Config.Algolia[/* appId */0], apiKey);

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
              }), $$Array.map((function (prim) {
                    return JSON.parse(prim);
                  }), $$Array.map((function (path) {
                        return Fs.readFileSync(path, "utf8");
                      }), Utils.Fs[/* readDirRecursively */0](Config.packageDir))))));

exports.apiKey = apiKey;
exports.client = client;
exports.index  = index;
/* apiKey Not a pure module */
