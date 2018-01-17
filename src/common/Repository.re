open Rebase;

type t = 
  | Github(string, string);

let looksLikeUrl = str =>
  String.startsWith("http://", str) || 
  String.startsWith("https://", str);

let parseUrl = url => {
  if (!(url |> String.includes("github.com"))) {
    failwith("Unknown URL: " ++ url);
  } else {
    let segments = Js.String.split("/", url);
    let length = Array.length(segments);

    if (length < 2) {
      failwith("What the hell kind of a URL is this: " ++ url);
    };

    Github(segments |> Array.getOrRaise(length - 2), segments |> Array.getOrRaise(length - 1))
  }
};

let looksLikeGitHubPath = str =>
  str |> String.startsWith("github:");

let parseGitHubPath = path =>
  switch (path |> Js.String.replace("github:", "") |> Js.String.split("/")) {
  | [|owner, repo|]   => Github(owner, repo)
  | _                 => failwith("Not a vlid Github path: " ++ path)
  };

let parse = str =>
  if (str |> looksLikeUrl) {
    parseUrl(str);
  } else if (str |> looksLikeGitHubPath) {
    parseGitHubPath(str);
  } else {
    failwith("Fuck if I know what this is: " ++ str);
  };

let getUrl =
  fun | Github(owner, repo) => {j|https://github.com/$owner/$repo|j}
;

let makeName =
  fun | Github(owner, repo) => {j|$owner/$repo|j}
;

let makeId =
  fun | Github(owner, repo) => {j|unpublished/$owner/$repo|j}
;

let getReadme = source => {
  open Refetch;
  open Resync;

  let url = 
    switch source {
    | Github(owner, repo) => {j|https://raw.githubusercontent.com/$owner/$repo/master/README.md|j}
    };

  get(url) |> Future.flatMap(
              fun | Response.Ok(_, response) => Response.text(response)
                  | _ => failwith("failed to get README"));
};

let getStats = source => {
  open Refetch;
  open Resync;

  let url = 
    switch source {
    | Github(owner, repo) => {j|https://api.github.com/repos/$owner/$repo|j}
    };

  get(url) |> Future.flatMap(
              fun | Response.Ok(_, response) => Response.json(response)
                  | Response.Error(status, _) => failwith("failed to get stats: " ++ status.reason))
           |> Future.map(Json.Decode.(field("stargazers_count", int)));
};