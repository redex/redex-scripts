'use strict';

import * as Path from "path";

var outputDir = "data/generated";

var packageDir = Path.join(outputDir, "packages");

function apiKey() {
  return (require('./config_secret').algoliaApiKey);
}

var Algolia = /* module */[
  /* appId */"B1AVN0IGTU",
  /* packageIndex */"redex-packages",
  /* apiKey */apiKey
];

var sourcesFile = "data/sources.json";

export {
  sourcesFile ,
  outputDir   ,
  packageDir  ,
  Algolia     ,
  
}
/* packageDir Not a pure module */
