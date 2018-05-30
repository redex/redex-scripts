type t = {
  analyzed      : Js.Date.t,
  name          : string,
  version       : string,
  description   : string,
  updated       : Js.Date.t,
  deprecated    : option(string),
  author        : option(string),
  license       : option(string),
  readme        : option(string),
  keywords      : option(array(string)),
  stars         : option(int),
  score         : float,
  quality       : float,
  popularity    : float,
  maintenance   : float,
  homepageUrl   : option(string),
  repositoryUrl : option(string),
  npmUrl        : option(string),
  issuesUrl     : option(string),
};

let fromJson = Json.Decode.(
  obj (({field, at}) => {
    analyzed      : field.required("analyzedAt", string |> map(Js.Date.fromString)),
    name          : at.required(["collected", "metadata", "name"], string),
    version       : at.required(["collected", "metadata", "version"], string),
    description   : at.required(["collected", "metadata", "description"], string),
    updated       : at.required(["collected", "metadata", "date"], string |> map(Js.Date.fromString)),
    deprecated    : at.optional(["collected", "metadata", "deprecated"], string),
    author        : at.optional(["collected", "metadata", "author", "name"], string),
    license       : at.optional(["collected", "metadata", "license"], string),
    readme        : at.optional(["collected", "metadata", "readme"], string),
    keywords      : at.optional(["collected", "metadata", "keywords"], array(string)),
    stars         : at.optional(["collected", "github", "starsCount"], int),
    score         : at.required(["score", "final"], Json.Decode.float),
    quality       : at.required(["score", "detail", "quality"], Json.Decode.float),
    popularity    : at.required(["score", "detail", "popularity"], Json.Decode.float),
    maintenance   : at.required(["score", "detail", "maintenance"], Json.Decode.float),
    homepageUrl   : at.optional(["collected", "metadata", "links", "homepage"], string),
    repositoryUrl : at.optional(["collected", "metadata", "links", "repository"], string),
    npmUrl        : at.optional(["collected", "metadata", "links", "npm"], string),
    issuesUrl     : at.optional(["collected", "metadata", "links", "bugs"], string),
  })
);

let get = (packageName: string) => {
  open Refetch;
  open Resync;

  let escapedName = Js.Global.encodeURIComponent(packageName);
  let url = {j|https://api.npms.io/v2/package/$escapedName|j};

  get(url) |> Future.flatMap(
              fun | Response.Ok(_, response) => Response.json(response)
                  | Response.Error(status, response) =>
                    Response.text(response)
                    |> Future.map(
                      r => failwith("failed to get data from npms.io: " ++ status.reason ++ ", " ++ r)))
          |> Future.map(fromJson)
};