open Rebase;

let outputFile = Node.Path.join2(Config.outputDir, "keywords.json");

let getKeywords = json => Json.Decode.(
  (
    json |> field("id", string),
    json |> field("keywords", array(string))
  )
);

let makeInvertedIndex = data => {
  let index = Hashtbl.create(data |> Array.length);

  data |> Array.forEach(
          ((id, keywords)) =>
            keywords |> Array.forEach(
                        keyword => {
                          let old = switch (Hashtbl.find(index, keyword)) {
                          | exception Not_found => []
                          | v => v
                          };
                          Hashtbl.replace(index, keyword, [id, ...old])
                        }));

  Hashtbl.fold((k, v, acc) => [(k, v), ...acc], index, [])
};

Utils.Fs.readDirRecursively(Config.packageDir)
|> Array.filter(path => path |> String.endsWith(".json"))
|> Array.map(path => Node.Fs.readFileSync(path, `utf8))
|> Array.map(Json.parseOrRaise)
|> Array.map(getKeywords)
|> makeInvertedIndex
|> List.map(((keyword, packages)) => Js.Dict.fromList(Json.Encode.[
  ("name", keyword |> string),
  ("count", List.length(packages) |> int),
  ("packages", packages |> list(string))
]))
|> Json.Encode.(list(dict))
|> Json.stringify
|> json => Utils.Fs.writeFile(outputFile, json);