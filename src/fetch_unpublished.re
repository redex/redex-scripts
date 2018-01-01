open! Rebase;

[%%raw {|require('isomorphic-fetch')|}];

let getSources = () => 
  Node.Fs.readFileSync(Config.sourcesFile, `ascii)
  |> Js.Json.parseExn
  |> Json.Decode.(field("unpublished", array(string)));


let () = {
  open Resync;

  getSources()
  |> Array.map(Source.parse)
  |> Array.forEach(source =>
    Utils.Future.(
      Manifest.get(source)        >>= manifest
      => Source.getReadme(source) >>= readme
      => Source.getStats(source)  >>= stats
      => {
        let json =
          Package.fromUnpublished(source, manifest, readme, stats)
          |> Package.encode
          |> Js.Json.stringify;

        let path = Node.Path.join([|
          Config.packageDir,
          "unpublished",
          Js.Global.encodeURIComponent(Source.makeId(source)) ++ ".json"
        |]);

        return(Utils.Fs.writeFile(path, json))
    }
  ) |> Future.whenCompleted(
      fun | Ok(())   => ()
          | Error(e) => Js.log4("\n", source, "\n", e)
    )
  );
};