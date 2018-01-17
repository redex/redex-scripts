open Rebase;

module Fs = {
  type stats;

  [@bs.module "fs"] external statSync : string => stats = "";
  [@bs.module "fs"] external mkdirSync : string => unit = "";
  [@bs.send] external isDirectory : stats => bool = "";

  let rec readDirRecursively = dir => {
    Node.Fs.readdirSync(dir)
    |> Array.flatMap(filename => {
        let path = Node.Path.join2(dir, filename);
        switch (path |> statSync |> isDirectory) {
        | true  => readDirRecursively(path)
        | false => [|path|]
        }
      })
  };

  let ensureDirExists = path =>
    path |> Js.String.split(Node.Path.sep)
         |> Js.Array.reduce((acc, dir) => {
            let path = Node.Path.join2(acc, dir);

            if (!Node.Fs.existsSync(path)) {
              mkdirSync(path);
            };

            path
         }, "") |> ignore;

  let writeFile = (path, contents) => {
    path |> Node.Path.dirname
         |> ensureDirExists;

    Node.Fs.writeFileSync(path, contents, `utf8);
  }
};

let filterDuplicates = arr => {
  let unique = [||];
  let set = Hashtbl.create(Js.Array.length(arr));
  arr |> Js.Array.forEach(x => Hashtbl.replace(set, x, ()));
  set |> Hashtbl.iter((x, _) => Js.Array.push(x, unique) |> ignore);
  unique
};

module Future = {
  let (>>=) = (this, f) => Resync.Future.flatMap(f, this);
  let return = Resync.Future.from;
};