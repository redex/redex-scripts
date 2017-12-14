[%%raw {|require('isomorphic-fetch')|}];

module NPMS = {
  type t = {
    analyzed: Js.Date.t,
    name: string,
    version: string,
    description: string,
    updated: Js.Date.t,
    author: option(string),
    license: option(string),
    readme: string,
    keywords: array(string),
    stars: option(int),
    downloads: float, /* yes, apparently you can have fractional downloads */
    score: float,
    quality: float,
    popularity: float,
    maintenance: float,
  };

  let decode = json => Json.Decode.{
    analyzed:     json |> field("analyzedAt", string |> map(Js.Date.fromString)),
    name:         json |> at(["collected", "metadata", "name"], string),
    version:      json |> at(["collected", "metadata", "version"], string),
    description:  json |> at(["collected", "metadata", "description"], string),
    updated:      json |> at(["collected", "metadata", "date"], string |> map(Js.Date.fromString)),
    author:       json |> optional(at(["collected", "metadata", "author", "name"], string)),
    license:      json |> optional(at(["collected", "metadata", "license"], string)),
    readme:       json |> withDefault("", at(["collected", "metadata", "readme"], string)),
    keywords:     json |> withDefault([||], at(["collected", "metadata", "keywords"], array(string))),
    stars:        json |> optional(at(["collected", "github", "starsCount"], int)),
    downloads:    json |> at(["evaluation", "popularity", "downloadsCount"], Json.Decode.float),
    score:        json |> at(["score", "final"], Json.Decode.float),
    quality:      json |> at(["score", "detail", "quality"], Json.Decode.float),
    popularity:   json |> at(["score", "detail", "popularity"], Json.Decode.float),
    maintenance:  json |> at(["score", "detail", "maintenance"], Json.Decode.float),
  };

  let get = (packageName: string) => {
    open Refetch;
    open Resync;

    let escapedName = Js.Global.encodeURIComponent(packageName);
    let url = {j|https://api.npms.io/v2/package/$escapedName|j};

    get(url) |> Future.flatMap(
                fun | Response.Ok(_, response) => Response.json(response)
                    | Response.Error(status, response) =>
                      Response.text(response)
                      |> Future.map(
                        r => failwith("failed to get data from npms.io: " ++ status.reason ++ ", " ++ r)))
            |> Future.map(decode)
  };
};

let normalizeKeyword = keyword =>
  switch (Js.String.toLowerCase(keyword)) {
  | "reasonml"  => "reason"
  | keyword     => keyword
  };

let makePackage = (data: NPMS.t): Package.t =>
  {
    "type"        : "published",
    "id"          : data.name,
    "name"        : data.name,
    "version"     : data.version,
    "description" : data.description,
    "author"      : data.author |> Js.Nullable.from_opt,
    "license"     : data.license |> Js.Nullable.from_opt,
    "keywords"    : data.keywords |> Array.map(normalizeKeyword),
    "readme"      : data.readme,
    "analyzed"    : data.analyzed,
    "updated"     : data.analyzed,
    "stars"       : data.stars |> Js.Nullable.from_opt,
    "downloads"   : data.downloads,
    "score"       : data.score,
    "quality"     : data.quality,
    "popularity"  : data.popularity,
    "maintenance" : data.maintenance
  };

let getSources = sourceFilename => 
  Node.Fs.readFileSync(sourceFilename, `ascii)
  |> Js.Json.parseExn
  |> Json.Decode.(field("published", array(string)));


let () = {
  open Rebase;
  open Resync;

  getSources("data/sources.json")
  |> Array.forEach(source =>
    NPMS.get(source)
    |> Future.whenCompleted(
        fun | Result.Ok(data) => {
              let json =
                data |> makePackage
                     |> Obj.magic
                     |> Js.Json.stringify;

              Node.Fs.writeFileSync("data/generated/packages/" ++ Js.Global.encodeURIComponent(data.name) ++ ".json", json, `utf8);
            }
            | Result.Error(e) =>
              Js.log4("\n", source, "\n", e)
        )
    );
}