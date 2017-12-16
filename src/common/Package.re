type t = {.
  "type"          : string,
  "id"            : string,

  "name"          : string,
  "version"       : string,
  "description"   : string,
  "author"        : Js.nullable(string),
  "license"       : Js.nullable(string),
  "keywords"      : array(string),
  "readme"        : string,
  "analyzed"      : Js.Date.t,
  "updated"       : Js.Date.t,
  "stars"         : Js.nullable(int),
  "score"         : float,
  "quality"       : float,
  "popularity"    : float,
  "maintenance"   : float,
  "homepageUrl"   : Js.nullable(string),
  "repositoryUrl" : Js.nullable(string),
  "npmUrl"        : Js.nullable(string),
  "issuesUrl"     : Js.nullable(string),
  "docsUrl"       : Js.nullable(string),
};

external unsafeDecode : Js.Json.t => t = "%identity";
external encode : t => Js.Json.t = "%identity";