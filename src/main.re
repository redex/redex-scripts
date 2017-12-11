[%%raw {|require('isomorphic-fetch')|}];

open Rebase;
open Resync;

let encodeData = (data: NPMS.t) => Json.Encode.(
  object_([
    ("name", data.name |> string),
    ("version", data.version |> string),
    ("description", data.description |> string),
    ("author", data.author |> string),
    ("license", data.license |> string),
    ("keywords", data.keywords |> stringArray),
    ("readme", data.readme |> string),
    ("analyzed", data.analyzed |> Js.Date.toISOString |> string),
    ("updated", data.analyzed |> Js.Date.toISOString |> string),
    ("stars", data.stars |> nullable(int)),
    ("downloads", data.downloads |> Json.Encode.float),
    ("score", data.score |> Json.Encode.float)
  ])
);


Source.getPublished("data/sources.json")
|> Array.forEach(source =>
  NPMS.get(source)
  |> Future.whenCompleted(
      fun | Result.Ok(data) => {
            let json = encodeData(data) |> Js.Json.stringify;
            Node.Fs.writeFileSync("data/out/" ++ data.name ++ ".json", json, `utf8);
          }
          | Result.Error(e) =>
            Js.log4("\n", source, "\n", e)
      )
  );