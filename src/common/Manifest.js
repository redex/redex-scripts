#!/usr/bin/env node
'use strict';

var Curry             = require("bs-platform/lib/js/curry.js");
var Resync            = require("refetch/src/Resync.js");
var Refetch           = require("refetch/src/Refetch.js");
var Pervasives        = require("bs-platform/lib/js/pervasives.js");
var Json_decode       = require("@glennsl/bs-json/src/Json_decode.js");
var Refetch__Response = require("refetch/src/Refetch__Response.js");

function decode(json) {
  return /* record */[
          /* name */Json_decode.field("name", Json_decode.string, json),
          /* version */Json_decode.field("version", Json_decode.string, json),
          /* description */Json_decode.optional((function (param) {
                  return Json_decode.field("description", Json_decode.string, param);
                }), json),
          /* author */Json_decode.optional((function (param) {
                  return Json_decode.field("author", Json_decode.string, param);
                }), json),
          /* license */Json_decode.optional(Json_decode.either(Json_decode.at(/* :: */[
                        "license",
                        /* :: */[
                          "type",
                          /* [] */0
                        ]
                      ], Json_decode.string), (function (param) {
                      return Json_decode.field("license", Json_decode.string, param);
                    })), json),
          /* keywords */Json_decode.optional((function (param) {
                  return Json_decode.field("keywords", (function (param) {
                                return Json_decode.array(Json_decode.string, param);
                              }), param);
                }), json),
          /* dependencies */Json_decode.optional((function (param) {
                  return Json_decode.field("dependencies", (function (param) {
                                return Json_decode.dict(Json_decode.string, param);
                              }), param);
                }), json),
          /* homepage */Json_decode.optional((function (param) {
                  return Json_decode.field("homepage", Json_decode.string, param);
                }), json),
          /* repositoryUrl */Json_decode.optional(Json_decode.either(Json_decode.at(/* :: */[
                        "repository",
                        /* :: */[
                          "url",
                          /* [] */0
                        ]
                      ], Json_decode.string), (function (param) {
                      return Json_decode.field("repository", Json_decode.string, param);
                    })), json),
          /* bugsUrl */Json_decode.optional(Json_decode.either(Json_decode.at(/* :: */[
                        "bugs",
                        /* :: */[
                          "url",
                          /* [] */0
                        ]
                      ], Json_decode.string), (function (param) {
                      return Json_decode.field("bugs", Json_decode.string, param);
                    })), json)
        ];
}

function get(source) {
  var url = "https://raw.githubusercontent.com/" + (String(source[0]) + ("/" + (String(source[1]) + "/master/package.json")));
  return Resync.Future[/* map */8](decode, Resync.Future[/* flatMap */9]((function (param) {
                    if (param.tag) {
                      return Pervasives.failwith("failed to get package.json");
                    } else {
                      return Curry._1(Refetch__Response.json, param[1]);
                    }
                  }), Refetch.get(url)));
}

exports.decode = decode;
exports.get    = get;
/* Refetch Not a pure module */
