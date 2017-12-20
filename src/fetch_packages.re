open Rebase;

[%%raw {|require('isomorphic-fetch')|}];

module NPMS = {
  type t = {
    analyzed      : Js.Date.t,
    name          : string,
    version       : string,
    description   : string,
    updated       : Js.Date.t,
    author        : option(string),
    license       : option(string),
    readme        : option(string),
    keywords      : option(array(string)),
    stars         : option(int),
    score         : float,
    quality       : float,
    popularity    : float,
    maintenance   : float,
    homepageUrl   : option(string),
    repositoryUrl : option(string),
    npmUrl        : option(string),
    issuesUrl     : option(string),
  };

  let decode = json => Json.Decode.{
    analyzed      : json |> field("analyzedAt", string |> map(Js.Date.fromString)),
    name          : json |> at(["collected", "metadata", "name"], string),
    version       : json |> at(["collected", "metadata", "version"], string),
    description   : json |> at(["collected", "metadata", "description"], string),
    updated       : json |> at(["collected", "metadata", "date"], string |> map(Js.Date.fromString)),
    author        : json |> optional(at(["collected", "metadata", "author", "name"], string)),
    license       : json |> optional(at(["collected", "metadata", "license"], string)),
    readme        : json |> optional(at(["collected", "metadata", "readme"], string)),
    keywords      : json |> optional(at(["collected", "metadata", "keywords"], array(string))),
    stars         : json |> optional(at(["collected", "github", "starsCount"], int)),
    score         : json |> at(["score", "final"], Json.Decode.float),
    quality       : json |> at(["score", "detail", "quality"], Json.Decode.float),
    popularity    : json |> at(["score", "detail", "popularity"], Json.Decode.float),
    maintenance   : json |> at(["score", "detail", "maintenance"], Json.Decode.float),
    homepageUrl   : json |> optional(at(["collected", "metadata", "links", "homepage"], string)),
    repositoryUrl : json |> optional(at(["collected", "metadata", "links", "repository"], string)),
    npmUrl        : json |> optional(at(["collected", "metadata", "links", "npm"], string)),
    issuesUrl     : json |> optional(at(["collected", "metadata", "links", "bugs"], string)),
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
    "type"          : "published",
    "id"            : data.name,
    "name"          : data.name,
    "version"       : data.version,
    "description"   : data.description,
    "author"        : data.author         |> Js.Nullable.from_opt,
    "license"       : data.license        |> Js.Nullable.from_opt,
    "keywords"      : data.keywords       |> Option.getOr([||])
                                          |> Array.map(normalizeKeyword)
                                          |> Utils.filterDuplicates,
    "readme"        : data.readme         |> Option.getOr(""),
    "analyzed"      : data.analyzed,
    "updated"       : data.analyzed,
    "stars"         : data.stars          |> Js.Nullable.from_opt,
    "score"         : data.score,
    "quality"       : data.quality,
    "popularity"    : data.popularity,
    "maintenance"   : data.maintenance,
    "homepageUrl"   : data.homepageUrl    |> Js.Nullable.from_opt,
    "repositoryUrl" : data.repositoryUrl  |> Js.Nullable.from_opt,
    "npmUrl"        : data.npmUrl         |> Js.Nullable.from_opt,
    "issuesUrl"     : data.issuesUrl      |> Js.Nullable.from_opt,
    "docsUrl"       : Js.Nullable.null
  };

let getSources = () => 
  Node.Fs.readFileSync(Config.sourcesFile, `ascii)
  |> Js.Json.parseExn
  |> Json.Decode.(field("published", array(string)));


let () = {
  open Rebase;
  open Resync;

  getSources()
  |> Array.forEach(source =>
    NPMS.get(source)
    |> Future.whenCompleted(
        fun | Result.Ok(data) => {
              let json =
                data |> makePackage
                     |> Obj.magic
                     |> Js.Json.stringify;

              let path = Node.Path.join([|
                Config.packageDir,
                Js.Global.encodeURIComponent(data.name) ++ ".json"
              |]);

              Node.Fs.writeFileSync(path, json, `utf8);
            }
            | Result.Error(e) =>
              Js.log4("\n", source, "\n", e)
        )
    );
}