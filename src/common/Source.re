open Rebase;

type category =
  | Binding
  | Library
  | Tool
  | Boilerplate;

type condition =
  | Maintained
  | Neglected
  | Deprecated;

type platform =
  | Browser
  | Node
  | Native
  | Any;

module Decode = {
  open! Json.Decode;

  let category = string |> map(
    fun | "binding"     => Binding
        | "library"     => Library
        | "tool"        => Tool
        | "boilerplate" => Boilerplate
        | other         => raise(DecodeError("Unknown package type: " ++ other))
  );

  let condition = string |> map(
    fun | "maintained"  => Maintained
        | "neglected"   => Neglected
        | "deprecated"  => Deprecated
        | other         => raise(DecodeError("Unknown condition: " ++ other))
  );

  let platform = string |> map(
    fun | "browser" => Browser
        | "node"    => Node
        | "native"  => Native
        | "any"     => Any
        | other     => raise(DecodeError("Unknown platform: " ++ other))
  );

  let collection = decoder =>
    dict(Fn.id) |> map(Fn.(
      Js.Dict.entries
      >> Array.map(((key, json)) =>
          try (decoder(key, json)) {
          | DecodeError(msg) => raise(DecodeError(msg ++ "\n\tat " ++ key))
          })
      >> List.fromArray
    ));
};

module Published = {
  type t = {
    id: string,
    category,
    condition,
    platforms: array(platform),
    keywords: option(array(string)),
    comment: option(string)
  };

  let fromJson = (key, json) => Json.Decode.{
    id:         key,
    category:   json |> field("category", Decode.category),
    condition:  json |> field("condition", Decode.condition),
    platforms:  json |> field("platforms", array(Decode.platform)),
    keywords:   json |> optional(field("keywords", array(string))),
    comment:    json |> optional(field("comment", string))
  };

let get = () => 
  Node.Fs.readFileSync(Config.sourcesFile, `ascii)
  |> Json.parseOrRaise
  |> Json.Decode.(field("published", Decode.collection(fromJson)));
};

module Unpublished = {
  type t = {
    id: string,
    repository: Repository.t,
    category,
    condition,
    platforms: array(platform),
    keywords: option(array(string)),
    comment: option(string)
  };

  let fromJson = (key, json) => Json.Decode.{
    id:         key,
    repository: json |> field("repository", string |> map(Repository.parse)),
    category:   json |> field("category", Decode.category),
    condition:  json |> field("condition", Decode.condition),
    platforms:  json |> field("platforms", array(Decode.platform)),
    keywords:   json |> optional(field("keywords", array(string))),
    comment:    json |> optional(field("comment", string))
  };

  let get = () => 
    Node.Fs.readFileSync(Config.sourcesFile, `ascii)
    |> Json.parseOrRaise
    |> Json.Decode.(field("unpublished", Decode.collection(fromJson)));
};