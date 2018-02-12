type client;
type index;

type error = {.
  "name": string,
  "message": string,
  "statusCode": int
};
type content;
type browser;

/*
[@bs.module] external makeClient : (string, string) => client = "algoliasearch";
*/
[%%raw "import Algoliasearch from 'algoliasearch'"];
[@bs.val] external makeClient : (string, string) => client = "Algoliasearch";
let makeClient = makeClient;

[@bs.send.pipe: client] external initIndex : string => index = "";

[@bs.send.pipe: index] external addObjects : (array('a), (Js.nullable(error), content) => unit) => unit = "";
[@bs.send.pipe: index] external addObject : ('a, (Js.nullable(error), content) => unit) => unit = "";

[@bs.send.pipe: index] external deleteObject : ('a, (Js.nullable(error)) => unit) => unit = "";

[@bs.send.pipe: index] external browseAll : unit => browser = "";

[@bs.send.pipe: browser] external onResult : ([@bs.as "result"] _, content => unit) => unit = "on";
[@bs.send.pipe: browser] external onError : ([@bs.as "error"] _, error => unit) => unit = "on";
[@bs.send.pipe: browser] external onEnd : ([@bs.as "end"] _, unit => unit) => unit = "on";
[@bs.send.pipe: browser] external stop : unit => browser = "";

