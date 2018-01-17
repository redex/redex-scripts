open! Rebase;
open Source.Unpublished;

[%%raw {|require('isomorphic-fetch')|}];

let getSources = () => 
  Node.Fs.readFileSync(Config.sourcesFile, `ascii)
  |> Js.Json.parseExn
  |> Json.Decode.(field("unpublished", Source.decodeCollection(Source.Unpublished.decode)));


let () = {
  open Resync;

  getSources()
  |> List.forEach(({ repository: repo} as source) =>
    Utils.Future.(
      Manifest.get(repo)            >>= manifest
      => Repository.getReadme(repo) >>= readme
      => Repository.getStats(repo)  >>= stats
      => {
        let json =
          Package.fromUnpublished(repo, manifest, readme, stats)
          |> Package.toJson
          |> Js.Json.stringify;

        let path = Node.Path.join([|
          Config.packageDir,
          "unpublished",
          Js.Global.encodeURIComponent(Repository.makeId(repo)) ++ ".json"
        |]);

        return(Utils.Fs.writeFile(path, json))
    }
  ) |> Future.whenCompleted(
      fun | Ok(())   => ()
          | Error(e) => Js.log4("\n", repo, "\n", e)
    )
  );
};