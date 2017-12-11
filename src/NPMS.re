
type t = {
  analyzed: Js.Date.t,
  name: string,
  version: string,
  description: string,
  updated: Js.Date.t,
  author: string,
  license: string,
  readme: string,
  keywords: array(string),
  stars: option(int),
  downloads: float, /* yes, apparently you can have fractional downloads */
  score: float
};

let _decodeSillyArray = decode => Json.Decode.(
  dict(decode) |> map(Js.Dict.entries)
               |> map(Array.map(snd))
);

let decode = json => Json.Decode.{
  analyzed: json |> field("analyzedAt", string |> map(Js.Date.fromString)),
  name: json |> at(["collected", "metadata", "name"], string),
  version: json |> at(["collected", "metadata", "version"], string),
  description: json |> at(["collected", "metadata", "description"], string),
  /*
  created: json |> at(["time", "created"], string |> map(Js.Date.fromString)),
  modified: json |> at(["time", "modified"], string |> map(Js.Date.fromString)),
  */
  updated: json |> at(["collected", "metadata", "date"], string |> map(Js.Date.fromString)),
  author: json |> oneOf([
                    at(["collected", "metadata", "author", "name"], string),
                    at(["collected", "metadata", "publisher", "username"], string)
                  ]),
  license: json |> at(["collected", "metadata", "license"], string),
  readme: json |> at(["collected", "metadata", "readme"], string),
  keywords: json |> withDefault([||], at(["collected", "metadata", "keywords"], _decodeSillyArray(string))),
  stars: json |> optional(at(["collected", "github", "starsCount"], int)),
  downloads: json |> at(["evaluation", "popularity", "downloadsCount"], Json.Decode.float),
  score: json |> at(["score", "final"], Json.Decode.float),
};

let get = (packageName: string) => {
  open Refetch;
  open Resync;

  let url = {j|https://api.npms.io/v2/package/$packageName|j};

  get(url) |> Future.flatMap(
              fun | Response.Ok(_, response) => Response.json(response)
                  | Response.Error(status, response) =>
                    Response.text(response)
                    |> Future.map(
                      r => failwith("failed to get data from npms.io: " ++ status.reason ++ ", " ++ r)))
           |> Future.map(decode)
};