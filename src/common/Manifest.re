type t = {
  name: string,
  version: string,
  description: option(string),
  author: option(string),
  license: option(string),
  keywords: array(string),
  dependencies: Js.Dict.t(string)
};

let decode = json => Json.Decode.{
  name: json |> field("name", string),
  version: json |> field("version", string),
  description: json |> optional(field("description", string)),
  author: json |> optional(field("author", string)),
  license: json |> optional(field("license", string)),
  keywords: json |> withDefault([||], field("keywords", array(string))),
  dependencies: json |> withDefault(Js.Dict.empty(), field("dependencies", dict(string))),
};

let get = source => {
  open Refetch;
  open Resync;

  let url = 
    switch source {
    | Source.Github(user, repo) => {j|https://raw.githubusercontent.com/$user/$repo/master/package.json|j}
    };

  get(url) |> Future.flatMap(
              fun | Response.Ok(_, response) => Response.json(response)
                  | _ => failwith("failed to get package.json"))
           |> Future.map(decode)
};