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
        | other         => raise(DecodeError("Unknown package type: " ++ other))
  );

  let condition = string |> map(
    fun | "maintained"  => Maintained
        | "neglected"   => Neglected
        | "deprecated"  => Deprecated
        | other         => raise(DecodeError("Unknown condition: " ++ other))
  );

  let platform = string |> map(
    fun | "browser"               => Browser
        | "node"                  => Node
        | "native"                => Native
        | "platform-independent"  => PlatformIndependent
        | other                   => raise(DecodeError("Unknown platform: " ++ other))
  );

  let collection = decoder =>
    Json.Decode.(
      dict(Fn.id) |> map(Fn.(
        Js.Dict.entries
        >> Array.map(((key, json)) =>
            try (decoder(key, json)) {
            | DecodeError(msg) => raise(DecodeError(msg ++ "\n\tat " ++ key))
            })
        >> List.fromArray
      ))
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

  let fromJson = (key, json) => Json.Decode.{
    id:           key,
    packageType:  json |> field("type", Decode.packageType),
    condition:    json |> field("condition", Decode.condition),
    platforms:    json |> field("platforms", list(Decode.platform)),
    comment:      json |> optional(field("comment", string))
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
    packageType,
    condition,
    platforms: list(platform),
    comment: option(string)
  };

  let fromJson = (key, json) => Json.Decode.{
    id:           key,
    repository:   json |> field("repository", string |> map(Repository.parse)),
    packageType:  json |> field("type", Decode.packageType),
    condition:    json |> field("condition", Decode.condition),
    platforms:    json |> field("platforms", list(Decode.platform)),
    comment:      json |> optional(field("comment", string))
  };

  let get = () => 
    Node.Fs.readFileSync(Config.sourcesFile, `ascii)
    |> Json.parseOrRaise
    |> Json.Decode.(field("unpublished", Decode.collection(fromJson)));
};