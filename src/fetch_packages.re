open! Rebase;

[%%raw {|require('isomorphic-fetch')|}];

let getSources = () => 
  Node.Fs.readFileSync(Config.sourcesFile, `ascii)
  |> Js.Json.parseExn
  |> Json.Decode.(field("published", array(string)));


let () = {
  open Resync;

  getSources()
  |> Array.forEach(source =>
    NPMS.get(source)
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
              Js.log4("\n", source, "\n", e)
        )
    );
}