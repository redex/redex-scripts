open Rebase;

external decodePackage : Js.Json.t => Package.t = "%identity";


let lints = [
  ("Missing readme", package => package##readme == ""),
  ("Missing license", package => Js.Nullable.test(package##license)),
  ("Missing keywords", package => Array.length(package##keywords) == 0),
  ("Missing repository url", package => Js.Nullable.test(package##repositoryUrl)),
  ("Missing homepage url", package => Js.Nullable.test(package##homepageUrl)),
  ("Missing issues url", package => Js.Nullable.test(package##issuesUrl)),
  ("Readme > 10k bytes", package => String.length(package##readme) > 10000),
];

Utils.Fs.readDirRecursively(Config.packageDir)
|> Array.map(path => Node.Fs.readFileSync(path, `utf8))
|> Array.map(Js.Json.parseExn)
|> Array.map(decodePackage)
|> Array.map(package => {
    let errors =
      lints |> List.map(((message, test)) => test(package) ? Some(message) : None)
            |> List.filter(Option.isSome)
            |> List.map(Option.getOrRaise);

    (package, errors)
  })
|> Array.filter(((_, errors)) => errors != [])
|> Array.forEach(((package, errors)) => {
  Js.log("");
  Js.log(package##name);
  errors |> List.forEach(error => Js.log2("  ", error))
});