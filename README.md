
# redex scripts

This repository contains a number of scripts used in generating and maintaining
the content of [redex](https://redex.github.io/). Please see
[the redex publishing guide](https://redex.github.io/publish) for information on
how to add a package.

## Scripts

* __fetch_published__ - reads the published package sources from souces.json, 
collects more information from npms.io and generates packages from the collected
data.

* __fetch_unpublished__ - reads the unpublished package sources from souces.json, 
collects more information from each repository and generates packages from the
collected data.

* __lint_packages__ - checks all generated packages for common issues.

* __lint_remote__ - runs the lints on a remote source, without generating a package.

* __update_search_index__ - reads the generated packages and updates the Algolia
search index. This requires a valid api key.

* __validate_sources__ - checks sources.json for common errors without fetching
any data from remote services. This is primarily used for CI on the data repository
to quickly check for silly mistakes before merging a PR.