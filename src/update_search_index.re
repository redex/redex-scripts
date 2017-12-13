let appId = "B1AVN0IGTU";
let apiKey = Node.Process.argv[2]; 

let client = Algolia.makeClient(appId, apiKey);
let index = Algolia.initIndex("re:libs", client);

Node.Fs.readdirSync("data/generated/packages")
|> Array.map(filename => Node.Fs.readFileSync("data/generated/packages/" ++ filename, `utf8))
|> Array.map(Js.Json.parseExn)
|> Array.map(record => Algolia.addObject(record, (err, _) => Js.log(err), index));