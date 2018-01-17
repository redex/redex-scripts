let client = Algolia.makeClient(Config.Algolia.appId, Config.Algolia.apiKey);
let index = Algolia.initIndex(Config.Algolia.packageIndex, client);

Utils.Fs.readDirRecursively(Config.packageDir)
|> Array.map(path => Node.Fs.readFileSync(path, `utf8))
|> Array.map(Json.parseOrRaise)
|> Array.map(Package.unsafeFromJson)
|> Array.map(record => Js.Obj.assign({ "objectID": record##id }, record))
|> Array.map(record =>
  index |> Algolia.addObject(record, (err, _) =>
    switch (err |> Js.toOption) {
    | Some(err) =>
      Js.log("");
      Js.log(record##id);
      Js.log2("  ", err##message);
    | None => ()
    }
  ));