open Rebase;
open Source;

type t = {.
  "type"              : string,
  "id"                : string,
  "name"              : string,
  "version"           : string,
  "category"          : string,
  "flags"             : array(string),
  "platforms"         : array(string),
  "description"       : string,
  "deprecated"        : Js.nullable(string),
  "author"            : Js.nullable(string),
  "license"           : Js.nullable(string),
  "keywords"          : array(string),
  "originalKeywords"  : array(string),
  "readme"            : string,
  "analyzed"          : Js.Date.t,
  "updated"           : Js.Date.t,
  "stars"             : Js.nullable(int),
  "score"             : float,
  "quality"           : float,
  "popularity"        : float,
  "maintenance"       : float,
  "homepageUrl"       : Js.nullable(string),
  "repositoryUrl"     : Js.nullable(string),
  "npmUrl"            : Js.nullable(string),
  "issuesUrl"         : Js.nullable(string),
  "docsUrl"           : Js.nullable(string),
};

external unsafeFromJson : Js.Json.t => t = "%identity";
external toJson : t => Js.Json.t = "%identity";


let _encodecategory =
  fun | Binding     => "binding"
      | Library     => "library"
      | Tool        => "tool"
      | Boilerplate => "boilerplate"
;
let _encodePlatform =
  fun | Browser => "browser"
      | Node    => "node"
      | Native  => "native"
      | Any     => "any"
;

let _mapKeywordSynonym =
  fun | "reasonml"      => "reason"
      | "bsb"           => "bucklescript"
      | "bs-platform"   => "bucklescript"
      | "test"          => "testing"
      | "tdd"           => "testing"
      | "regex"         => "regular expressions"
      | "reasonreact"   => "react"
      | "reason-react"  => "react"
      | "next"          => "next.js"
      | "d3"            => "d3.js"
      | "d3js"          => "d3.js"
      | keyword         => keyword;

let _ignoreKeyword =
  fun | "reason"  => true
      | "data"    => true
      | k         when String.startsWith("bs-", k) => true
      | _         => false;

let _normalizeKeywords =
  Fn.( Array.map(Js.String.toLowerCase)
    >> Array.map(_mapKeywordSynonym)
    >> Array.filter(not << _ignoreKeyword)
    >> Utils.filterDuplicates);

let ensureDeprecated = (deprecated, flags) =>
  switch deprecated {
  | Some(_) when !(flags |> Js.Array.includes("deprecated")) =>
    Js.Array.concat([| "deprecated" |], flags)
  | _ => flags
  };

let fromPublished = (source: Source.Published.t, data: NPMS.t): t =>
  {
    "type"              : "published",
    "id"                : data.name,
    "name"              : data.name,
    "version"           : data.version,
    "category"          : source.category     |> _encodecategory,
    "flags"             : source.flags        |> Option.getOr([||])
                                              |> ensureDeprecated(data.deprecated),
    "platforms"         : source.platforms    |> Array.map(_encodePlatform),
    "description"       : data.description,
    "deprecated"        : data.deprecated     |> Js.Nullable.from_opt,
    "author"            : data.author         |> Js.Nullable.from_opt,
    "license"           : data.license        |> Js.Nullable.from_opt,
    "keywords"          : source.keywords     |> Option.or_(data.keywords)
                                              |> Option.getOr([||])
                                              |> _normalizeKeywords,
    "originalKeywords"  : data.keywords       |> Option.getOr([||])
                                              |> _normalizeKeywords,
    "readme"            : data.readme         |> Option.getOr(""),
    "analyzed"          : data.analyzed,
    "updated"           : data.analyzed,
    "stars"             : data.stars          |> Js.Nullable.from_opt,
    "score"             : data.score,
    "quality"           : data.quality,
    "popularity"        : data.popularity,
    "maintenance"       : data.maintenance,
    "homepageUrl"       : data.homepageUrl    |> Js.Nullable.from_opt,
    "repositoryUrl"     : data.repositoryUrl  |> Js.Nullable.from_opt,
    "npmUrl"            : data.npmUrl         |> Js.Nullable.from_opt,
    "issuesUrl"         : data.issuesUrl      |> Js.Nullable.from_opt,
    "docsUrl"           : Js.Nullable.undefined
  };

let fromUnpublished = (source: Source.Unpublished.t, manifest: Manifest.t, readme: string, stars: int): t =>
  {
    "type"              : "unpublished",
    "id"                : Repository.makeId(source.repository),
    "name"              : Repository.makeName(source.repository),
    "version"           : manifest.version,
    "category"          : source.category       |> _encodecategory,
    "flags"             : source.flags          |> Option.getOr([||]),
    "platforms"         : source.platforms      |> Array.map(_encodePlatform),
    "description"       : manifest.description  |> Option.getOr(""),
    "deprecated"        : Js.Nullable.undefined,
    "author"            : manifest.author       |> Js.Nullable.from_opt,
    "license"           : manifest.license      |> Js.Nullable.from_opt,
    "keywords"          : source.keywords       |> Option.or_(manifest.keywords)
                                                |> Option.getOr([||])
                                                |> _normalizeKeywords,
    "originalKeywords"  : manifest.keywords     |> Option.getOr([||])
                                                |> _normalizeKeywords,
    "readme"            : readme,
    "analyzed"          : Js.Date.make(),
    "updated"           : Js.Date.make(),
    "stars"             : Js.Nullable.return(stars),
    "score"             : 0.,
    "quality"           : 0.,
    "popularity"        : 0.,
    "maintenance"       : 0.,
    "homepageUrl"       : manifest.homepage     |> Js.Nullable.from_opt,
    "repositoryUrl"     : Js.Nullable.return(Repository.getUrl(source.repository)),
    "npmUrl"            : Js.Nullable.undefined,
    "issuesUrl"         : manifest.bugsUrl      |> Js.Nullable.from_opt,
    "docsUrl"           : Js.Nullable.undefined
  };
