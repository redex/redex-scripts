let length = List.length;
open Rebase;

let getKeywords = json => Json.Decode.(
  (
    json |> field("name", string),
    json |> field("keywords", array(string))
  )
);

let makeInvertedIndex = data => {
  let index = Hashtbl.create(data |> Array.length);

  data |> Array.forEach(
          ((name, keywords)) =>
            keywords |> Array.forEach(
                        keyword => {
                          let old = switch (Hashtbl.find(index, keyword)) {
                          | exception Not_found => []
                          | v => v
                          };
                          Hashtbl.replace(index, keyword, [name, ...old])
                        }));

  Hashtbl.fold((k, v, acc) => [(k, v), ...acc], index, [])
};

Node.Fs.readdirSync("data/generated/packages")
|> Array.map(filename => Node.Fs.readFileSync("data/generated/packages/" ++ filename, `utf8))
|> Array.map(Js.Json.parseExn)
|> Array.map(getKeywords)
|> makeInvertedIndex
|> List.map(((keyword, packages)) => Js.Dict.fromList(Json.Encode.[
  ("name", keyword |> string),
  ("count", length(packages) |> int),
  ("packages", packages |> list(string))
]))
|> Json.Encode.(list(dict))
|> Js.Json.stringify
|> json => Node.Fs.writeFileSync("data/generated/keywords.json", json, `utf8);