
[%%raw {|require('isomorphic-fetch')|}];

let source = Node.Process.argv[2];


let () = {
  open Rebase;
  open Resync;

  let package =
    if (source |> Js.String.includes("/")) {
    if (source |> Js.String.startsWith("github:")) {
      let repo = Repository.parse(source);
      Utils.Future.(
        Manifest.get(repo)            >>= manifest
        => Repository.getReadme(repo) >>= readme
        => Repository.getStats(repo)  >>= stats
        => return(Package.fromUnpublished(repo, manifest, readme, stats))
      )
    } else {
      NPMS.get(source) |> Future.map(Package.fromPublished);
    };

  package |> Future.whenCompleted(
    fun | Ok(package) => {
          let errors = Lint.lintPackage(package);
          errors |> List.forEach(error => Js.log2("  ", error));
        }
        | Error(e) =>
          Js.log4("\n", source, "\n", e)
  );
};