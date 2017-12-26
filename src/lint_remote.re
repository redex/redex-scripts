
[%%raw {|require('isomorphic-fetch')|}];

let source = Node.Process.argv[2];


let () = {
  open Rebase;
  open Resync;

  let package =
    if (source |> Js.String.includes("/")) {
      let source = Source.parse(source);
      Utils.Future.(
        Manifest.get(source)        >>= manifest
        => Source.getReadme(source) >>= readme
        => Source.getStats(source)  >>= stats
        => return(Package.fromUnpublished(source, manifest, readme, stats))
      )
    } else {
      NPMS.get(source) |> Future.map(Package.fromPublished);
    };

  package |> Future.whenCompleted(
    fun | Result.Ok(package) => {
          let errors = Lint.lintPackage(package);
          errors |> List.forEach(error => Js.log2("  ", error));
        }
        | Result.Error(e) =>
          Js.log4("\n", source, "\n", e)
  );
};