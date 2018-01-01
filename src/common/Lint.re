open Rebase;

let lints = [
  package => package##description |> Js.String.trim == ""
    ? Some("Missing description") : None,

  package => package##readme |> Js.String.trim == ""
    ? Some("Missing readme") : None,

  package => {
    let l = package##readme |> Js.String.trim |> Js.String.length;
    l > 0 && l < 400
      ? Some("Short readme") : None
  },

  package => Js.Nullable.test(package##license)
    ? Some("Missing license") : None,

  package => Array.length(package##keywords) == 0
    ? Some("Missing keywords") : None,

  package => Js.Nullable.test(package##repositoryUrl)
    ? Some("Missing repository url") : None,

  package => Js.Nullable.test(package##homepageUrl)
    ? Some("Missing homepage url") : None,

  package => Js.Nullable.test(package##issuesUrl)
    ? Some("Missing issues url") : None,

  package => String.length(package##readme) > 10000
    ? Some("Readme > 10k bytes") : None,

  package => package##deprecated |> Js.toOption
                                 |> Option.map(message => "Deprecated - " ++ message)
];

let lintPackage: Package.t => list(string) = package =>
  lints |> List.filterMap(lint => lint(package));
