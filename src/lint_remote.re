[%%raw {|require('isomorphic-fetch')|}];

[@bs.val] external stringify : 'a => ([@bs.as {json|null|json}] _) => int => string = "JSON.stringify";


let () = {
  open Rebase;
  open Resync;

  let name = Node.Process.argv[2] |> Option.getOrRaise;

  let eventuallyPackage =
    if (name |> String.startsWith("github:")) {
      let repo = Repository.parse(name);
      let source = Source.Unpublished.{
        id: name,
        repository: repo,
        packageType: Binding,
        condition: Maintained,
        platforms: [|Any|],
        keywords: None,
        comment: None
      };

      Utils.Future.(
        Manifest.get(repo)            >>= manifest
        => Repository.getReadme(repo) >>= readme
        => Repository.getStats(repo)  >>= stats
        => return(Package.fromUnpublished(source, manifest, readme, stats))
      )
    } else {
      let source = Source.Published.{
        id: name,
        packageType: Binding,
        condition: Maintained,
        platforms: [|Any|],
        keywords: None,
        comment: None
      };

      NPMS.get(name) |> Future.map(Package.fromPublished(source));
    };

  eventuallyPackage |> Future.whenCompleted(
    fun | Ok(package) => {
          let truncatedPackage =
            if (String.length(package##readme) > 1000) {
              Js.Obj.assign(package, { "readme": (package##readme |> String.sub(~from=0, ~length=1000)) ++ "..." })
            } else {
              package
            };
          Js.log2("\n", stringify(truncatedPackage, 2));

          let errors = Lint.lintPackage(package);
          if (errors |> List.isEmpty) {
            Js.log("\027[32;1m");
            Js.log("No problems! :)");
            Js.log("\027[0m");
          } else {
            Js.log("\027[31;1m");
            Js.log((string_of_int(errors |> List.length)) ++ " problems:");
            errors |> List.forEach(error => Js.log2("  ", error));
            Js.log("\027[0m");
          }
        }
        | Error(e) => {
          Js.log("\027[33;1m");
          Js.log4("\n", name, "\n", e);
          Js.log("\027[0m");
        }
  );
};