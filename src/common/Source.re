/*open Rebase;*/

type unpublishedSource = 
  | Github(string, string);

let looksLikeUrl = str =>
  Js.String.startsWith("http://", str) || 
  Js.String.startsWith("https://", str);

let parseUrl = url => {
  if (!(url |> Js.String.includes("github.com"))) {
    failwith("Unknown URL: " ++ url);
  } else {
    let segments = Js.String.split("/", url);
    let length = Array.length(segments);

    if (length < 2) {
      failwith("What the hell kind of a URL is this: " ++ url);
    };

    Github(segments[length - 2], segments[length - 1])
  }
};

let looksLikeGitHubPath = str =>
  Js.String.split("/", str) |> Array.length === 2;

let parseGitHubPath = path =>
  switch (path |> Js.String.split("/")) {
  | [|user, repo|]  => Github(user, repo)
  | _               => failwith("???")
  };

let parse = str =>
  if (str |> looksLikeUrl) {
    parseUrl(str);
  } else if (str |> looksLikeGitHubPath) {
    parseGitHubPath(str);
  } else {
    failwith("Fuck if I know what this is: " ++ str);
  };