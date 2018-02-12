let env =
	switch [%raw "process.env.NODE_ENV"] {
		| "production" => `Production
		| _ => `Development
	};

let sourcesFile = "data/sources.json";
let outputDir = "data/generated";
let packageDir = Node.Path.join2(outputDir, "packages");

module Algolia = {
  let appId = "B1AVN0IGTU";
  let packageIndex =
		switch env {
		| `Production => "redex-packages"
		| `Development => "redex-test"
		};
  let apiKey: unit => string = () => [%raw "require('./config_secret').algoliaApiKey"];
}
