

import * as Fs from "fs";
import * as Path from "path";
import * as Rebase from "../../node_modules/@glennsl/rebase/src/Rebase.bs.js";
import * as Resync from "../../node_modules/refetch/src/Resync.bs.js";
import * as Hashtbl from "../../node_modules/bs-platform/lib/es6/hashtbl.js";

function readDirRecursively(dir) {
  return Rebase.$$Array[/* flatMap */5]((function (filename) {
                var path = Path.join(dir, filename);
                var match = Fs.statSync(path).isDirectory();
                if (match) {
                  return readDirRecursively(path);
                } else {
                  return /* array */[path];
                }
              }), Fs.readdirSync(dir));
}

function ensureDirExists(path) {
  Rebase.$$Array[/* reduce */3]((function (acc, dir) {
          var path = Path.join(acc, dir);
          if (!Fs.existsSync(path)) {
            Fs.mkdirSync(path);
          }
          return path;
        }), "", path.split(Path.sep));
  return /* () */0;
}

function writeFile(path, contents) {
  ensureDirExists(Path.dirname(path));
  Fs.writeFileSync(path, contents, "utf8");
  return /* () */0;
}

var Fs$1 = /* module */[
  /* readDirRecursively */readDirRecursively,
  /* ensureDirExists */ensureDirExists,
  /* writeFile */writeFile
];

function filterDuplicates(arr) {
  var unique = /* array */[];
  var set = Hashtbl.create(/* None */0, Rebase.$$Array[/* length */16](arr));
  Rebase.$$Array[/* forEach */8]((function (x) {
          return Hashtbl.replace(set, x, /* () */0);
        }), arr);
  Hashtbl.iter((function (x, _) {
          unique.push(x);
          return /* () */0;
        }), set);
  return unique;
}

function $great$great$eq($$this, f) {
  return Resync.Future[/* flatMap */9](f, $$this);
}

var $$return = Resync.Future[/* from */3];

var Future = /* module */[
  /* >>= */$great$great$eq,
  /* return */$$return
];

export {
  Fs$1 as Fs,
  filterDuplicates ,
  Future ,
  
}
/* fs Not a pure module */
