let sourcesFile = "data/sources.json";
let outputDir = "data/generated";
let packageDir = Node.Path.join2(outputDir, "packages");

module Algolia = {
  let appId = "B1AVN0IGTU";
  let packageIndex = "redex-packages";
  let apiKey: string = [%raw "require('./config_secret').algoliaApiKey"];
}