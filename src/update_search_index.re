let client = Algolia.makeClient(Config.Algolia.appId, Config.Algolia.apiKey());
let index = Algolia.initIndex(Config.Algolia.packageIndex, client);

Js.log("\nUpdating search index...");

let addSearchSpecificFields = record =>
  record |> Js.Obj.assign({
    "objectID": record##id,
    "flagCount": record##flags |> Array.length
  });

let locals =
	Utils.Fs.readDirRecursively(Config.packageDir)
	|> Js.Array.map(path => Node.Fs.readFileSync(path, `utf8))
	|> Js.Array.map(Json.parseOrRaise)
	|> Js.Array.map(Package.unsafeFromJson);

let browser =
	index |> Algolia.browseAll();

let remotes: ref(array({. "objectID": string })) = ref([||]);

browser |> Algolia.onResult(content => remotes := Js.Array.concat(Obj.magic(content)##hits, remotes^));
browser |> Algolia.onError(error => Js.log2("Error: ", error));
browser |> Algolia.onEnd(() => {
	remotes^ |> Js.Array.filter(remote => locals |> Js.Array.every(local => local##id !== remote##objectID))
				   |> Js.Array.forEach(remote => {
					   	 Js.log2("Removing: ", remote##objectID);
							 index |> Algolia.deleteObject(remote##objectID, err =>
								switch (err |> Js.toOption) {
								| Some(err) => Js.log4("Error removing ", remote##objectID, ": ", err##message);
								| None => ()
								}
							);
					 	 });

	locals |> Js.Array.map(addSearchSpecificFields)
				 |> Js.Array.forEach(record =>
						index |> Algolia.addObject(record, (err, _) =>
							switch (err |> Js.toOption) {
							| Some(err) => Js.log4("Error adding ", record##id, ": ", err##message);
							| None => ()
							}
						));

  Js.log("Search index updated.");
});
