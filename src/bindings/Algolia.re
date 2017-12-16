type client;
type index;

type error = {.
  "name": string,
  "message": string,
  "statusCode": int
};
type content;

[@bs.module] external makeClient : (string, string) => client = "algoliasearch";

[@bs.send.pipe: client] external initIndex : string => index = "";

[@bs.send.pipe: index] external addObjects : (array('a), (Js.nullable(error), content) => unit) => unit = "";
[@bs.send.pipe: index] external addObject : ('a, (Js.nullable(error), content) => unit) => unit = "";
