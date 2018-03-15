

import * as Path from "path";

var match = (process.env.NODE_ENV);

var env = match === "production" ? /* Production */661752345 : /* Development */378050971;

var outputDir = "data/generated";

var packageDir = Path.join(outputDir, "packages");

var packageIndex = env >= 661752345 ? "redex-packages" : "redex-test";

function apiKey() {
  return (require('./config_secret').algoliaApiKey);
}

var Algolia = /* module */[
  /* appId */"B1AVN0IGTU",
  /* packageIndex */packageIndex,
  /* apiKey */apiKey
];

var sourcesFile = "data/sources.json";

export {
  env ,
  sourcesFile ,
  outputDir ,
  packageDir ,
  Algolia ,
  
}
/* match Not a pure module */
