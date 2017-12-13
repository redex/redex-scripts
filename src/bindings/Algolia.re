type client;
type index;

type error;
type content;

[@bs.module] external makeClient : (string, string) => client = "algoliasearch";

[@bs.send.pipe: client] external initIndex : string => index = "";

[@bs.send.pipe: index] external addObjects : (array(Js.Json.t), (error, content) => unit) => unit = "";
[@bs.send.pipe: index] external addObject : (Js.Json.t, (error, content) => unit) => unit = "";
