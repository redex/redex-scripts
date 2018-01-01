#!/usr/bin/env node
'use strict';

var Path = require("path");

var outputDir = "data/generated";

var packageDir = Path.join(outputDir, "packages");

var apiKey = (require('./config_secret').algoliaApiKey);

var Algolia = /* module */[
  /* appId */"B1AVN0IGTU",
  /* packageIndex */"redex-packages",
  /* apiKey */apiKey
];

var sourcesFile = "data/sources.json";

exports.sourcesFile = sourcesFile;
exports.outputDir   = outputDir;
exports.packageDir  = packageDir;
exports.Algolia     = Algolia;
/* packageDir Not a pure module */
