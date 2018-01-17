open! Rebase;

[%%raw {|require('isomorphic-fetch')|}];

let getSources = () => 
  Node.Fs.readFileSync(Config.sourcesFile, `ascii)
  |> Js.Json.parseExn
  |> Json.Decode.(field("unpublished", array(string)));


let () = {
  open Resync;

  getSources()
  |> Array.map(Repository.parse)
  |> Array.forEach(repo =>
    Utils.Future.(
      Manifest.get(repo)            >>= manifest
      => Repository.getReadme(repo) >>= readme
      => Repository.getStats(repo)  >>= stats
      => {
        let json =
          Package.fromUnpublished(repo, manifest, readme, stats)
          |> Package.encode
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