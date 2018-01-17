open Rebase;

type packageType =
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
  | PlatformIndependent;

module Decode = {
  open Json.Decode;

  let packageType = string |> map(
    fun | "binding"     => Binding
        | "library"     => Library
        | "tool"        => Tool
        | "boilerplate" => Boilerplate
        | other         => failwith("Unknown package type: " ++ other)
  );

  let condition = string |> map(
    fun | "maintained"  => Maintained
        | "neglected"   => Neglected
        | "deprecated"  => Deprecated
        | other         => failwith("Unknown condition: " ++ other)
  );

  let platform = string |> map(
    fun | "browser"               => Browser
        | "node"                  => Node
        | "native"                => Native
        | "platform-independent"  => PlatformIndependent
        | other                   => failwith("Unknown platform: " ++ other)
  );
};

module Published = {
  type t = {
    id: string,
    packageType,
    condition,
    platforms: list(platform),
    comment: option(string)
  };

  let decode = (key, json) => Json.Decode.{
    id:           key,
    packageType:  json |> field("type", Decode.packageType),
    condition:    json |> field("condition", Decode.condition),
    platforms:    json |> field("platforms", list(Decode.platform)),
    comment:      json |> optional(field("comment", string))
  };
};

module Unpublished = {
  type t = {
    id: string,
    repository: Repository.t,
    packageType,
    condition,
    platforms: list(platform),
    comment: option(string)
  };

  let decode = (key, json) => Json.Decode.{
    id:           key,
    repository:   key |> Repository.parse,
    packageType:  json |> field("type", Decode.packageType),
    condition:    json |> field("condition", Decode.condition),
    platforms:    json |> field("platforms", list(Decode.platform)),
    comment:      json |> optional(field("comment", string))
  };
};

let decodeCollection = decoder =>
  Json.Decode.(
    dict(Fn.id) |> map(Fn.(
      Js.Dict.entries
      >> Array.map(decoder |> Fn.uncurry)
      >> List.fromArray
    ))
  );