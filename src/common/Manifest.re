open Rebase;

let _orElse = f =>
  fun | Some(_) as self => self
      | None            => f();

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

let fromJson = Json.Decode.(
  obj (({field, at}) => {
    name          : field.required("name", string),
    version       : field.required("version", string),
    description   : field.optional("description", string),
    author        : field.optional("author", string),
    license       : at.optional(["license", "type"], string)
                    |> _orElse(() => field.optional("type", string)),
    keywords      : field.optional("keywords", array(string)),
    dependencies  : field.optional("dependencies", dict(string)),
    homepage      : field.optional("homepage", string),
    repositoryUrl : at.optional(["repository", "url"], string)
                    |> _orElse(() => field.optional("repository", string)),
    bugsUrl       : at.optional(["bugs", "url"], string)
                    |> _orElse(() => field.optional("bugs", string)),
  })
);

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
           |> Future.map(fromJson)
};