[%%raw {|require('isomorphic-fetch')|}];

module NPMS = {
  type t = {
    analyzed: Js.Date.t,
    name: string,
    version: string,
    description: string,
    updated: Js.Date.t,
    author: string,
    license: option(string),
    readme: string,
    keywords: array(string),
    stars: option(int),
    downloads: float, /* yes, apparently you can have fractional downloads */
    score: float
  };

  let decode = json => Json.Decode.{
    analyzed: json |> field("analyzedAt", string |> map(Js.Date.fromString)),
    name: json |> at(["collected", "metadata", "name"], string),
    version: json |> at(["collected", "metadata", "version"], string),
    description: json |> at(["collected", "metadata", "description"], string),
    /*
    created: json |> at(["time", "created"], string |> map(Js.Date.fromString)),
    modified: json |> at(["time", "modified"], string |> map(Js.Date.fromString)),
    */
    updated: json |> at(["collected", "metadata", "date"], string |> map(Js.Date.fromString)),
    author: json |> oneOf([
                      at(["collected", "metadata", "author", "name"], string),
                      at(["collected", "metadata", "publisher", "username"], string)
                    ]),
    license: json |> optional(at(["collected", "metadata", "license"], string)),
    readme: json |> withDefault("", at(["collected", "metadata", "readme"], string)),
    keywords: json |> withDefault([||], at(["collected", "metadata", "keywords"], array(string))),
    stars: json |> optional(at(["collected", "github", "starsCount"], int)),
    downloads: json |> at(["evaluation", "popularity", "downloadsCount"], Json.Decode.float),
    score: json |> at(["score", "final"], Json.Decode.float),
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

let encodePackage = (data: NPMS.t) => Json.Encode.(
  object_([
    ("name", data.name |> string),
    ("version", data.version |> string),
    ("description", data.description |> string),
    ("author", data.author |> string),
    ("license", data.license |> nullable(string)),
    ("keywords", data.keywords |> stringArray),
    ("readme", data.readme |> string),
    ("analyzed", data.analyzed |> Js.Date.toISOString |> string),
    ("updated", data.analyzed |> Js.Date.toISOString |> string),
    ("stars", data.stars |> nullable(int)),
    ("downloads", data.downloads |> Json.Encode.float),
    ("score", data.score |> Json.Encode.float)
  ])
);

let getPublished = sourceFilename => 
  Node.Fs.readFileSync(sourceFilename, `ascii)
  |> Js.Json.parseExn
  |> Json.Decode.(field("published", array(string)));


let () = {
  open Rebase;
  open Resync;

  getPublished("data/sources.json")
  |> Array.forEach(source =>
    NPMS.get(source)
    |> Future.whenCompleted(
        fun | Result.Ok(data) => {
              let json = encodePackage(data) |> Js.Json.stringify;
              Node.Fs.writeFileSync("data/generated/packages/" ++ Js.Global.encodeURIComponent(data.name) ++ ".json", json, `utf8);
            }
            | Result.Error(e) =>
              Js.log4("\n", source, "\n", e)
        )
    );
}