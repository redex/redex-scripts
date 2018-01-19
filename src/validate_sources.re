open Rebase;

let assertNotEmpty = (array, msg) => 
  if (Array.length(array) === 0) {
    failwith(msg);
  };

let assertNoDuplicates = (array, msg) => {
  let sorted = array |> Js.Array.copy |> Js.Array.sortInPlace;
  if (sorted |> Js.Array.somei((x, i) => x === Array.unsafeGetUnchecked(i - 1, sorted))) {
    failwith(msg);
  }
};

try {
  Source.Published.get()
  |> List.forEach((source: Source.Published.t) => {
    assertNotEmpty(source.platforms, "No platforms specified\n\tat " ++ source.id);
    assertNoDuplicates(source.platforms, "Duplicate items in platforms\n\tat " ++ source.id);
    source.keywords |> Option.forEach(keywords => assertNoDuplicates(keywords, "Duplicate items in keywords\n\tat " ++ source.id));
  });

  Source.Unpublished.get()
  |> List.forEach((source: Source.Unpublished.t) => {
    assertNotEmpty(source.platforms, "No platforms specified\n\tat " ++ source.id);
    assertNoDuplicates(source.platforms, "Duplicate items in platforms\n\tat " ++ source.id);
    source.keywords |> Option.forEach(keywords => assertNoDuplicates(keywords, "Duplicate items in keywords\n\tat " ++ source.id));
  });
} {
  | Failure(msg)
  | Json.ParseError(msg)
  | Json.Decode.DecodeError(msg) =>
    Js.log(msg);
    Node.Process.exit(1)
}