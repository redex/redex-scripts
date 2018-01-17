open Rebase;

try {
  Source.Published.get()
  |> List.forEach((source: Source.Published.t) =>
    if (List.length(source.platforms) === 0) {
      failwith("No platforms specified\n\tat " ++ source.id);
    }
  );

  Source.Unpublished.get()
  |> List.forEach((source: Source.Unpublished.t) =>
    if (List.length(source.platforms) === 0) {
      failwith("No platforms specified\n\tat " ++ source.id);
    }
  );
} {
  | Failure(msg)
  | Json.ParseError(msg)
  | Json.Decode.DecodeError(msg) =>
    Js.log(msg);
    Node.Process.exit(1)
}