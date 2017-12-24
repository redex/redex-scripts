open! Rebase;
 
[%%raw {|require('isomorphic-fetch')|}];
let getSources = () => 
  Node.Fs.readFileSync(Config.sourcesFile, `ascii)
  |> Js.Json.parseExn
  |> Json.Decode.(field("unpublished", array(string)));

let getReadme = source => {
  open Refetch;
  open Resync;

  let url = 
    switch source {
    | Source.Github(owner, repo) => {j|https://raw.githubusercontent.com/$owner/$repo/master/README.md|j}
    };

  get(url) |> Future.flatMap(
              fun | Response.Ok(_, response) => Response.text(response)
                  | _ => failwith("failed to get README"));
};

let getStats = source => {
  open Refetch;
  open Resync;

  let url = 
    switch source {
    | Source.Github(owner, repo) => {j|https://api.github.com/repos/$owner/$repo|j}
    };

  get(url) |> Future.flatMap(
              fun | Response.Ok(_, response) => Response.json(response)
                  | Response.Error(status, _) => failwith("failed to get stats: " ++ status.reason))
           |> Future.map(Json.Decode.(field("stargazers_count", int)));
};

let getRepositoryUrl =
  fun | Source.Github(owner, repo) => {j|https://github.com/$owner/$repo|j}
;

let makeName =
  fun | Source.Github(owner, repo) => {j|$owner/$repo|j}
;

let makeId =
  fun | Source.Github(owner, repo) => {j|unpublished/$owner/$repo|j}
;

let makePackage = (source: Source.t, manifest: Manifest.t, readme: string, stars: int): Package.t =>
  {
    "type"          : "unpublished",
    "id"            : makeId(source),
    "name"          : makeName(source),
    "version"       : manifest.version,
    "description"   : manifest.description  |> Option.getOr(""),
    "author"        : manifest.author       |> Js.Nullable.from_opt,
    "license"       : manifest.license      |> Js.Nullable.from_opt,
    "keywords"      : manifest.keywords     |> Option.getOr([||])
                                            |> Array.map(Js.String.toLowerCase)
                                            |> Utils.filterDuplicates,
    "readme"        : readme,
    "analyzed"      : Js.Date.make(),
    "updated"       : Js.Date.make(),
    "stars"         : Js.Nullable.return(stars),
    "score"         : 0.,
    "quality"       : 0.,
    "popularity"    : 0.,
    "maintenance"   : 0.,
    "homepageUrl"   : manifest.homepage     |> Js.Nullable.from_opt,
    "repositoryUrl" : Js.Nullable.return(getRepositoryUrl(source)),
    "npmUrl"        : Js.Nullable.null,
    "issuesUrl"     : manifest.bugsUrl      |> Js.Nullable.from_opt,
    "docsUrl"       : Js.Nullable.null
  };

let () = {
  open Resync;

  getSources()
  |> Array.map(Source.parse)
  |> Array.forEach(source =>
    Manifest.get(source)
    |> Future.flatMap(manifest => getReadme(source) |> Future.map(readme => (manifest, readme)))
    |> Future.flatMap(((manifest, readme)) => getStats(source) |> Future.map(stats => (manifest, readme, stats)))
    |> Future.whenCompleted(
        fun | Result.Ok((manifest, readme, stats)) => {
              let json =
                makePackage(source, manifest, readme, stats)
                     |> Obj.magic
                     |> Js.Json.stringify;

              let path = Node.Path.join([|
                Config.packageDir,
                "unpublished",
                Js.Global.encodeURIComponent(makeId(source)) ++ ".json"
              |]);

              Node.Fs.writeFileSync(path, json, `utf8);
            }
            | Result.Error(e) =>
              Js.log4("\n", source, "\n", e)
        )
    );
  }