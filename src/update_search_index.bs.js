

import * as Fs from "fs";
import * as Json from "../node_modules/@glennsl/bs-json/src/Json.bs.js";
import * as Utils from "./common/Utils.bs.js";
import * as Config from "./common/Config.bs.js";
import * as Algolia from "./bindings/Algolia.bs.js";

var client = Algolia.makeClient(Config.Algolia[/* appId */0], Config.Algolia[/* apiKey */2](/* () */0));

var index = client.initIndex(Config.Algolia[/* packageIndex */1]);

console.log("\nUpdating search index...");

function addSearchSpecificFields(record) {
  return Object.assign({
              objectID: record.id,
              flagCount: record.flags.length
            }, record);
}

var locals = Utils.Fs[/* readDirRecursively */0](Config.packageDir).map((function (path) {
            return Fs.readFileSync(path, "utf8");
          })).map(Json.parseOrRaise).map((function (prim) {
        return prim;
      }));

var browser = index.browseAll();

var remotes = [/* array */[]];

browser.on("result", (function (content) {
        remotes[0] = remotes[0].concat(content.hits);
        return /* () */0;
      }));

browser.on("error", (function (error) {
        console.log("Error: ", error);
        return /* () */0;
      }));

browser.on("end", (function () {
        remotes[0].filter((function (remote) {
                  return locals.every((function (local) {
                                return local.id !== remote.objectID;
                              }));
                })).forEach((function (remote) {
                console.log("Removing: ", remote.objectID);
                index.deleteObject(remote.objectID, (function (err) {
                        if (err == null) {
                          return /* () */0;
                        } else {
                          console.log("Error removing ", remote.objectID, ": ", err.message);
                          return /* () */0;
                        }
                      }));
                return /* () */0;
              }));
        locals.map(addSearchSpecificFields).forEach((function (record) {
                index.addObject(record, (function (err, _) {
                        if (err == null) {
                          return /* () */0;
                        } else {
                          console.log("Error adding ", record.id, ": ", err.message);
                          return /* () */0;
                        }
                      }));
                return /* () */0;
              }));
        console.log("Search index updated.");
        return /* () */0;
      }));

export {
  client ,
  index ,
  addSearchSpecificFields ,
  locals ,
  browser ,
  remotes ,
  
}
/* client Not a pure module */
