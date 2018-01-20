#!/usr/bin/env node
'use strict';

var Curry             = require("bs-platform/lib/js/curry.js");
var Rebase            = require("@glennsl/rebase/src/Rebase.bs.js");
var Resync            = require("refetch/src/Resync.bs.js");
var Refetch           = require("refetch/src/Refetch.bs.js");
var Pervasives        = require("bs-platform/lib/js/pervasives.js");
var Json_decode       = require("@glennsl/bs-json/src/Json_decode.bs.js");
var Refetch__Response = require("refetch/src/Refetch__Response.bs.js");

function looksLikeUrl(str) {
  if (Rebase.$$String[/* startsWith */3]("http://", str)) {
    return /* true */1;
  } else {
    return Rebase.$$String[/* startsWith */3]("https://", str);
  }
}

function parseUrl(url) {
  if (Rebase.$$String[/* includes */2]("github.com", url)) {
    var segments = url.split("/");
    var length = Rebase.$$Array[/* length */16](segments);
    if (length < 2) {
      Pervasives.failwith("What the hell kind of a URL is this: " + url);
    }
    return /* Github */[
            Rebase.$$Array[/* getOrRaise */19](length - 2 | 0, segments),
            Rebase.$$Array[/* getOrRaise */19](length - 1 | 0, segments)
          ];
  } else {
    return Pervasives.failwith("Unknown URL: " + url);
  }
}

function looksLikeGitHubPath(str) {
  return Rebase.$$String[/* startsWith */3]("github:", str);
}

function parseGitHubPath(path) {
  var match = path.replace("github:", "").split("/");
  if (match.length !== 2) {
    return Pervasives.failwith("Not a vlid Github path: " + path);
  } else {
    var owner = match[0];
    var repo = match[1];
    return /* Github */[
            owner,
            repo
          ];
  }
}

function parse(str) {
  if (looksLikeUrl(str)) {
    return parseUrl(str);
  } else if (Rebase.$$String[/* startsWith */3]("github:", str)) {
    return parseGitHubPath(str);
  } else {
    return Pervasives.failwith("Fuck if I know what this is: " + str);
  }
}

function getUrl(param) {
  return "https://github.com/" + (String(param[0]) + ("/" + (String(param[1]) + "")));
}

function makeName(param) {
  return "" + (String(param[0]) + ("/" + (String(param[1]) + "")));
}

function makeId(param) {
  return "unpublished/" + (String(param[0]) + ("/" + (String(param[1]) + "")));
}

function getReadme(source) {
  var url = "https://raw.githubusercontent.com/" + (String(source[0]) + ("/" + (String(source[1]) + "/master/README.md")));
  return Resync.Future[/* flatMap */9]((function (param) {
                if (param.tag) {
                  return Pervasives.failwith("failed to get README");
                } else {
                  return Curry._1(Refetch__Response.text, param[1]);
                }
              }), Refetch.get(url));
}

function getStats(source) {
  var url = "https://api.github.com/repos/" + (String(source[0]) + ("/" + (String(source[1]) + "")));
  return Resync.Future[/* map */8]((function (param) {
                return Json_decode.field("stargazers_count", Json_decode.$$int, param);
              }), Resync.Future[/* flatMap */9]((function (param) {
                    if (param.tag) {
                      return Pervasives.failwith("failed to get stats: " + param[0][/* reason */1]);
                    } else {
                      return Curry._1(Refetch__Response.json, param[1]);
                    }
                  }), Refetch.get(url)));
}

exports.looksLikeUrl        = looksLikeUrl;
exports.parseUrl            = parseUrl;
exports.looksLikeGitHubPath = looksLikeGitHubPath;
exports.parseGitHubPath     = parseGitHubPath;
exports.parse               = parse;
exports.getUrl              = getUrl;
exports.makeName            = makeName;
exports.makeId              = makeId;
exports.getReadme           = getReadme;
exports.getStats            = getStats;
/* Refetch Not a pure module */
