open Rebase;
 
[%%raw {|require('isomorphic-fetch')|}];
let makePackage = (manifest: Manifest.t, readme: string, stars: int): Package.t =>
  {
    "type"        : "unpublished",
    "id"          : "unpublished/" ++ manifest.name,
    "name"        : manifest.name,
    "version"     : manifest.version,
    "description" : manifest.description |> Option.getOr(""),
    "author"      : manifest.author |> Js.Nullable.from_opt,
    "license"     : manifest.license |> Js.Nullable.from_opt,
    "keywords"    : manifest.keywords |> Array.map(Js.String.toLowerCase),
    "readme"      : readme,
    "analyzed"    : Js.Date.make(),
    "updated"     : Js.Date.make(),
    "stars"       : Js.Nullable.return(stars),
    "downloads"   : 0.,
    "score"       : 0.,
    "quality"     : 0.,
    "popularity"  : 0.,
    "maintenance" : 0.
  };

let getSources = sourceFilename => 
  Node.Fs.readFileSync(sourceFilename, `ascii)
  |> Js.Json.parseExn
  |> Json.Decode.(field("unpublished", array(string)));

let getReadme = source => {
  open Refetch;
  open Resync;

  let url = 
    switch source {
    | Source.Github(user, repo) => {j|https://raw.githubusercontent.com/$user/$repo/master/README.md|j}
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
    | Source.Github(user, repo) => {j|https://api.github.com/repos/$user/$repo|j}
    };

  get(url) |> Future.flatMap(
              fun | Response.Ok(_, response) => Response.json(response)
                  | Response.Error(status, _) => failwith("failed to get stats: " ++ status.reason))
           |> Future.map(Json.Decode.(field("stargazers_count", int)));
};

let () = {
  open Rebase;
  open Resync;

  getSources("data/sources.json")
  |> Array.map(Source.parse)
  |> Array.forEach(source =>
    Manifest.get(source)
    |> Future.flatMap(manifest => getReadme(source) |> Future.map(readme => (manifest, readme)))
    |> Future.flatMap(((manifest, readme)) => getStats(source) |> Future.map(stats => (manifest, readme, stats)))
    |> Future.whenCompleted(
        fun | Result.Ok((manifest, readme, stats)) => {
              let json =
                makePackage(manifest, readme, stats)
                     |> Obj.magic
                     |> Js.Json.stringify;

              Node.Fs.writeFileSync("data/generated/packages/unpublished/" ++ Js.Global.encodeURIComponent(manifest.name) ++ ".json", json, `utf8);
            }
            | Result.Error(e) =>
              Js.log4("\n", source, "\n", e)
        )
    );
  }