open Rebase;

let lints = [
  package => package##description |> String.trim == ""
    ? Some("Missing description") : None,

  package => package##readme |> String.trim == ""
    ? Some("Missing readme") : None,

  package => {
    let l = package##readme |> String.trim |> String.length;
    l > 0 && l < 400
      ? Some("Short readme") : None
  },

  package => Js.Nullable.test(package##license)
    ? Some("Missing license") : None,

  package => Array.length(package##keywords) == 0
    ? Some("Missing keywords") : None,

  package => package##keywords |> Array.exists(k => k |> String.startsWith("bs-"))
    ? Some("Keyword starting with 'bs-'") : None,

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
