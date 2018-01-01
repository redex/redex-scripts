open Rebase;

let lints = [
  ("Missing description", package => package##description |> Js.String.trim == ""),
  ("Missing readme", package => package##readme |> Js.String.trim == ""),
  ("Short readme", package => { let l = package##readme |> Js.String.trim |> Js.String.length; l > 0 && l < 400 }),
  ("Missing license", package => Js.Nullable.test(package##license)),
  ("Missing keywords", package => Array.length(package##keywords) == 0),
  ("Missing repository url", package => Js.Nullable.test(package##repositoryUrl)),
  ("Missing homepage url", package => Js.Nullable.test(package##homepageUrl)),
  ("Missing issues url", package => Js.Nullable.test(package##issuesUrl)),
  ("Readme > 10k bytes", package => String.length(package##readme) > 10000),
  ("Deprecated", package => !Js.Nullable.test(package##deprecated)),
];

let lintPackage: Package.t => list(string) = package =>
  lints |> List.map(((message, test)) => test(package) ? Some(message) : None)
        |> List.filter(Option.isSome)
        |> List.map(Option.getOrRaise);
