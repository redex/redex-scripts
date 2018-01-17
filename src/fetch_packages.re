open! Rebase;
open Source.Published;

[%%raw {|require('isomorphic-fetch')|}];

let getSources = () => 
  Node.Fs.readFileSync(Config.sourcesFile, `ascii)
  |> Js.Json.parseExn
  |> Json.Decode.(field("published", Source.decodeCollection(Source.Published.decode)));


let () = {
  open Resync;

  getSources()
  |> List.forEach(source =>
    NPMS.get(source.id)
    |> Future.whenCompleted(
        fun | Ok(data) => {
              let json =
                data |> Package.fromPublished
                     |> Obj.magic
                     |> Js.Json.stringify;

              let path = Node.Path.join([|
                Config.packageDir,
                Js.Global.encodeURIComponent(data.name) ++ ".json"
              |]);

              Utils.Fs.writeFile(path, json);
            }
            | Error(e) =>
              Js.log4("\n", source.id, "\n", e)
        )
    );
}