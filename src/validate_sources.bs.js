'use strict';

import * as Json from "../node_modules/@glennsl/bs-json/src/Json.bs.js";
import * as Js_exn from "../node_modules/bs-platform/lib/es6/js_exn.js";
import * as Rebase from "../node_modules/@glennsl/rebase/src/Rebase.bs.js";
import * as Source from "./common/Source.bs.js";
import * as Process from "process";
import * as Pervasives from "../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Json_decode from "../node_modules/@glennsl/bs-json/src/Json_decode.bs.js";
import * as Caml_builtin_exceptions from "../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";

var filename = Rebase.$$Array[/* get */17](Process.argv, 2);

function assertNotEmpty(array, msg) {
  if (Rebase.$$Array[/* length */16](array)) {
    return 0;
  } else {
    return Pervasives.failwith(msg);
  }
}

function assertNoDuplicates(array, msg) {
  var sorted = array.slice().sort();
  if (sorted.some((function (x, i) {
            return +(x === Rebase.$$Array[/* unsafeGetUnchecked */21](i - 1 | 0, sorted));
          }))) {
    return Pervasives.failwith(msg);
  } else {
    return 0;
  }
}

try {
  Rebase.List[/* forEach */8]((function (source) {
          assertNotEmpty(source[/* platforms */3], "No platforms specified\n\tat " + source[/* id */0]);
          assertNoDuplicates(source[/* platforms */3], "Duplicate items in platforms\n\tat " + source[/* id */0]);
          return Rebase.Option[/* forEach */8]((function (keywords) {
                        return assertNoDuplicates(keywords, "Duplicate items in keywords\n\tat " + source[/* id */0]);
                      }), source[/* keywords */4]);
        }), Source.Published[/* get */1](filename, /* () */0));
  Rebase.List[/* forEach */8]((function (source) {
          assertNotEmpty(source[/* platforms */4], "No platforms specified\n\tat " + source[/* id */0]);
          assertNoDuplicates(source[/* platforms */4], "Duplicate items in platforms\n\tat " + source[/* id */0]);
          return Rebase.Option[/* forEach */8]((function (keywords) {
                        return assertNoDuplicates(keywords, "Duplicate items in keywords\n\tat " + source[/* id */0]);
                      }), source[/* keywords */5]);
        }), Source.Unpublished[/* get */1](filename, /* () */0));
}
catch (raw_exn){
  var exn = Js_exn.internalToOCamlException(raw_exn);
  var exit = 0;
  var msg;
  if (exn[0] === Caml_builtin_exceptions.failure) {
    msg = exn[1];
    exit = 1;
  } else if (exn[0] === Json.ParseError) {
    msg = exn[1];
    exit = 1;
  } else if (exn[0] === Json_decode.DecodeError) {
    msg = exn[1];
    exit = 1;
  } else {
    throw exn;
  }
  if (exit === 1) {
    console.log(msg);
    Process.exit(1);
  }
  
}

export {
  filename ,
  assertNotEmpty ,
  assertNoDuplicates ,
  
}
/* filename Not a pure module */
