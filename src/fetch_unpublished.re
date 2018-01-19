open! Rebase;
open Source.Unpublished;

[%%raw {|require('isomorphic-fetch')|}];

let () = {
  open Resync;

  Source.Unpublished.get()
  |> List.forEach(({ repository: repo}) =>
    Utils.Future.(
      Manifest.get(repo)            >>= manifest
      => Repository.getReadme(repo) >>= readme
      => Repository.getStats(repo)  >>= stats
      => {
        let json =
          Package.fromUnpublished(repo, manifest, readme, stats)
          |> Package.toJson
          |> Json.stringify;

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