type t = {
  name          : string,
  version       : string,
  description   : option(string),
  author        : option(string),
  license       : option(string),
  keywords      : option(array(string)),
  dependencies  : option(Js.Dict.t(string)),
  homepage      : option(string),
  repositoryUrl : option(string),
  bugsUrl       : option(string),

};

let decode = json => Json.Decode.{
  name          : json |> field("name", string),
  version       : json |> field("version", string),
  description   : json |> optional(field("description", string)),
  author        : json |> optional(field("author", string)),
  license       : json |> optional(either(
                            at(["license", "type"], string),
                            field("license", string))),
  keywords      : json |> optional(field("keywords", array(string))),
  dependencies  : json |> optional(field("dependencies", dict(string))),
  homepage      : json |> optional(field("homepage", string)),
  repositoryUrl : json |> optional(either(
                            at(["repository", "url"], string),
                            field("repository", string))),
  bugsUrl       : json |> optional(either(
                            at(["bugs", "url"], string),
                            field("bugs", string))),
};

let get = repo => {
  open Refetch;
  open Resync;

  let url = 
    switch repo {
    | Repository.Github(user, repo) => {j|https://raw.githubusercontent.com/$user/$repo/master/package.json|j}
    };

  get(url) |> Future.flatMap(
              fun | Response.Ok(_, response) => Response.json(response)
                  | _ => failwith("failed to get package.json"))
           |> Future.map(decode)
};