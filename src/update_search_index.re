let apiKey = Node.Process.argv[2]; 

let client = Algolia.makeClient(Config.Algolia.appId, apiKey);
let index = Algolia.initIndex(Config.Algolia.packageIndex, client);

Utils.Fs.readDirRecursively(Config.packageDir)
|> Array.map(path => Node.Fs.readFileSync(path, `utf8))
|> Array.map(Js.Json.parseExn)
|> Array.map(record => Algolia.addObject(record, (err, _) => Js.log(err), index));