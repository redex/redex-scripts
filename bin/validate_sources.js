#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Path = require('path');
var Fs = require('fs');
var Process = require('process');

var id = [0];

function get_id() {
  id[0] += 1;
  return id[0];
}

function create(str) {
  var v_001 = get_id(/* () */0);
  var v = /* tuple */[
    str,
    v_001
  ];
  v.tag = 248;
  return v;
}

function isCamlExceptionOrOpenVariant(e) {
  if (e === undefined) {
    return false;
  } else if (e.tag === 248) {
    return true;
  } else {
    var slot = e[0];
    if (slot !== undefined) {
      return slot.tag === 248;
    } else {
      return false;
    }
  }
}
/* No side effect */

var $$Error = create("Js_exn.Error");

function internalToOCamlException(e) {
  if (isCamlExceptionOrOpenVariant(e)) {
    return e;
  } else {
    return [
            $$Error,
            e
          ];
  }
}
/* No side effect */

var ParseError = create("Json.ParseError");

function parseOrRaise(s) {
  try {
    return JSON.parse(s);
  }
  catch (raw_exn){
    var exn = internalToOCamlException(raw_exn);
    if (exn[0] === $$Error) {
      var match = exn[1].message;
      var message = match !== undefined ? match : "Unknown error";
      throw [
            ParseError,
            message
          ];
    } else {
      throw exn;
    }
  }
}
/* No side effect */

var out_of_memory = /* tuple */[
  "Out_of_memory",
  0
];

var sys_error = /* tuple */[
  "Sys_error",
  -1
];

var failure = /* tuple */[
  "Failure",
  -2
];

var invalid_argument = /* tuple */[
  "Invalid_argument",
  -3
];

var end_of_file = /* tuple */[
  "End_of_file",
  -4
];

var division_by_zero = /* tuple */[
  "Division_by_zero",
  -5
];

var not_found = /* tuple */[
  "Not_found",
  -6
];

var match_failure = /* tuple */[
  "Match_failure",
  -7
];

var stack_overflow = /* tuple */[
  "Stack_overflow",
  -8
];

var sys_blocked_io = /* tuple */[
  "Sys_blocked_io",
  -9
];

var assert_failure = /* tuple */[
  "Assert_failure",
  -10
];

var undefined_recursive_module = /* tuple */[
  "Undefined_recursive_module",
  -11
];

out_of_memory.tag = 248;

sys_error.tag = 248;

failure.tag = 248;

invalid_argument.tag = 248;

end_of_file.tag = 248;

division_by_zero.tag = 248;

not_found.tag = 248;

match_failure.tag = 248;

stack_overflow.tag = 248;

sys_blocked_io.tag = 248;

assert_failure.tag = 248;

undefined_recursive_module.tag = 248;
/*  Not a pure module */

function caml_array_sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while(j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }  return result;
}
/* No side effect */

function app(_f, _args) {
  while(true) {
    var args = _args;
    var f = _f;
    var arity = f.length;
    var arity$1 = arity === 0 ? 1 : arity;
    var len = args.length;
    var d = arity$1 - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    } else if (d < 0) {
      _args = caml_array_sub(args, arity$1, -d | 0);
      _f = f.apply(null, caml_array_sub(args, 0, arity$1));
      continue ;
    } else {
      return (function(f,args){
      return function (x) {
        return app(f, args.concat(/* array */[x]));
      }
      }(f,args));
    }
  }}

function curry_1(o, a0, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[a0]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          return o(a0);
      case 2 : 
          return (function (param) {
              return o(a0, param);
            });
      case 3 : 
          return (function (param, param$1) {
              return o(a0, param, param$1);
            });
      case 4 : 
          return (function (param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            });
      case 5 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            });
      
    }
  }
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    return curry_1(o, a0, arity);
  }
}

function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return (function (a0) {
        return _1(o, a0);
      });
  }
}

function curry_2(o, a0, a1, arity) {
  if (arity > 7 || arity < 0) {
    return app(o, /* array */[
                a0,
                a1
              ]);
  } else {
    switch (arity) {
      case 0 : 
      case 1 : 
          return app(o(a0), /* array */[a1]);
      case 2 : 
          return o(a0, a1);
      case 3 : 
          return (function (param) {
              return o(a0, a1, param);
            });
      case 4 : 
          return (function (param, param$1) {
              return o(a0, a1, param, param$1);
            });
      case 5 : 
          return (function (param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            });
      case 6 : 
          return (function (param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            });
      case 7 : 
          return (function (param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            });
      
    }
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    return curry_2(o, a0, a1, arity);
  }
}
/* No side effect */

function id$1(x) {
  return x;
}

function $$const(x, _) {
  return x;
}

function flip(f, a, b) {
  return _2(f, b, a);
}

function curry(f, a, b) {
  return _1(f, /* tuple */[
              a,
              b
            ]);
}

function uncurry(f, param) {
  return _2(f, param[0], param[1]);
}

function $less$less(f, g, x) {
  return _1(f, _1(g, x));
}

function $great$great(f, g, x) {
  return _1(g, _1(f, x));
}

function tap(f, x) {
  _1(f, x);
  return x;
}
/* No side effect */

function div(x, y) {
  if (y === 0) {
    throw division_by_zero;
  } else {
    return x / y | 0;
  }
}

var imul = ( Math.imul || function (x,y) {
  y |= 0; return ((((x >> 16) * y) << 16) + (x & 0xffff) * y)|0; 
}
);
/* imul Not a pure module */

/* No side effect */

var InvalidArgument = create("Rebase__Types.InvalidArgument");

var IndexOutOfBounds = create("Rebase__Types.IndexOutOfBounds");

var NotFound = create("Rebase__Types.NotFound");
/* No side effect */

/* No side effect */

function from$1(x) {
  return /* :: */[
          x,
          /* [] */0
        ];
}

function fromArray$1(arr) {
  var _acc = /* [] */0;
  var _i = arr.length - 1 | 0;
  while(true) {
    var i = _i;
    var acc = _acc;
    if (i !== -1) {
      _i = i - 1 | 0;
      _acc = /* :: */[
        arr[i],
        acc
      ];
      continue ;
    } else {
      return acc;
    }
  }}

function fromSeq(seq) {
  var match = _1(seq, /* () */0);
  if (match) {
    return /* :: */[
            match[0],
            fromSeq(match[1])
          ];
  } else {
    return /* [] */0;
  }
}

function range$1($staropt$star, start, finish) {
  var step = $staropt$star ? $staropt$star[0] : 1;
  if (step === 0) {
    throw [
          InvalidArgument,
          "List.range: ~step=0 would cause infinite loop"
        ];
  } else if (step < 0 && start < finish || step > 0 && start > finish) {
    return /* [] */0;
  } else {
    var last = imul(div(finish - start | 0, step), step) + start | 0;
    var _acc = /* [] */0;
    var _n = last;
    while(true) {
      var n = _n;
      var acc = _acc;
      if (n === start) {
        return /* :: */[
                n,
                acc
              ];
      } else {
        _n = n - step | 0;
        _acc = /* :: */[
          n,
          acc
        ];
        continue ;
      }
    }  }
}

function isEmpty$1(param) {
  if (param) {
    return false;
  } else {
    return true;
  }
}

function head$1(param) {
  if (param) {
    return /* Some */[param[0]];
  } else {
    return /* None */0;
  }
}

function tail(param) {
  if (param) {
    return /* Some */[param[1]];
  } else {
    return /* None */0;
  }
}

function reverseAndAppend(_acc, _param) {
  while(true) {
    var param = _param;
    var acc = _acc;
    if (param) {
      _param = param[1];
      _acc = /* :: */[
        param[0],
        acc
      ];
      continue ;
    } else {
      return acc;
    }
  }}

function reverse(self) {
  return reverseAndAppend(/* [] */0, self);
}

function filter$1(predicate, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var xs = param[1];
      var x = param[0];
      if (_1(predicate, x)) {
        return /* :: */[
                x,
                filter$1(predicate, xs)
              ];
      } else {
        _param = xs;
        continue ;
      }
    } else {
      return /* [] */0;
    }
  }}

function filterMap$1(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var xs = param[1];
      var match = _1(f, param[0]);
      if (match) {
        return /* :: */[
                match[0],
                filterMap$1(f, xs)
              ];
      } else {
        _param = xs;
        continue ;
      }
    } else {
      return /* [] */0;
    }
  }}

function exists$1(predicate, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (_1(predicate, param[0])) {
        return true;
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return false;
    }
  }}

function forEach$1(f, _param) {
  while(true) {
    var param = _param;
    if (param) {
      _1(f, param[0]);
      _param = param[1];
      continue ;
    } else {
      return /* () */0;
    }
  }}

function find$1(predicate, _param) {
  while(true) {
    var param = _param;
    if (param) {
      var x = param[0];
      if (_1(predicate, x)) {
        return /* Some */[x];
      } else {
        _param = param[1];
        continue ;
      }
    } else {
      return /* None */0;
    }
  }}

function forAll$1(predicate, _param) {
  while(true) {
    var param = _param;
    if (param) {
      if (_1(predicate, param[0])) {
        _param = param[1];
        continue ;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }}

function flatMap$1(f, self) {
  var aux = function (_inner, _outer) {
    while(true) {
      var outer = _outer;
      var inner = _inner;
      if (inner) {
        return /* :: */[
                inner[0],
                aux(inner[1], outer)
              ];
      } else if (outer) {
        _outer = outer[1];
        _inner = _1(f, outer[0]);
        continue ;
      } else {
        return /* [] */0;
      }
    }  };
  return aux(/* [] */0, self);
}

function map$1(f, param) {
  if (param) {
    return /* :: */[
            _1(f, param[0]),
            map$1(f, param[1])
          ];
  } else {
    return /* [] */0;
  }
}

function product$1(f, xs, ys) {
  return flatMap$1((function (x) {
                return map$1((function (y) {
                              return _2(f, x, y);
                            }), ys);
              }), xs);
}

function apply$1(fs, xs) {
  return product$1((function (f, x) {
                return _1(f, x);
              }), fs, xs);
}

function reduce$1(f, _acc, _param) {
  while(true) {
    var param = _param;
    var acc = _acc;
    if (param) {
      _param = param[1];
      _acc = _2(f, acc, param[0]);
      continue ;
    } else {
      return acc;
    }
  }}

function reduceRight$1(f, acc, param) {
  if (param) {
    return _2(f, reduceRight$1(f, acc, param[1]), param[0]);
  } else {
    return acc;
  }
}

function length(self) {
  var _acc = 0;
  var _param = self;
  while(true) {
    var param = _param;
    var acc = _acc;
    if (param) {
      _param = param[1];
      _acc = acc + 1 | 0;
      continue ;
    } else {
      return acc;
    }
  }}

function zip$1(ys, xs) {
  if (xs && ys) {
    return /* :: */[
            /* tuple */[
              xs[0],
              ys[0]
            ],
            zip$1(ys[1], xs[1])
          ];
  } else {
    return /* [] */0;
  }
}

function concat(ys, xs) {
  if (xs) {
    return /* :: */[
            xs[0],
            concat(ys, xs[1])
          ];
  } else if (ys) {
    return /* :: */[
            ys[0],
            concat(ys[1], /* [] */0)
          ];
  } else {
    return /* [] */0;
  }
}
/* No side effect */

function __(tag, block) {
  block.tag = tag;
  return block;
}
/* No side effect */

/* No side effect */

/* No side effect */

/* node_std_output Not a pure module */

/* No side effect */

/* repeat Not a pure module */

/* two_ptr_32_dbl Not a pure module */

/* float_of_string Not a pure module */

/* No side effect */

/* No side effect */

/* No side effect */

function failwith(s) {
  throw [
        failure,
        s
      ];
}

var Exit = create("Pervasives.Exit");
/* No side effect */

function length$1(l) {
  var _len = 0;
  var _param = l;
  while(true) {
    var param = _param;
    var len = _len;
    if (param) {
      _param = param[1];
      _len = len + 1 | 0;
      continue ;
    } else {
      return len;
    }
  }}
/* No side effect */

function undefined_to_opt(x) {
  if (x === undefined) {
    return /* None */0;
  } else {
    return /* Some */[x];
  }
}
/* No side effect */

function from$2(x) {
  return /* array */[x];
}

function unsafeGetUnchecked(index, self) {
  return self[index];
}

function unsafeSetUnchecked(index, value, self) {
  self[index] = value;
  return /* () */0;
}

function make(length, value) {
  var array = new Array(length);
  array.fill(value);
  return array;
}

function fromList$1(list) {
  if (list) {
    var array = make(length$1(list), list[0]);
    var _i = 1;
    var _param = list[1];
    while(true) {
      var param = _param;
      var i = _i;
      if (param) {
        array[i] = param[0];
        _param = param[1];
        _i = i + 1 | 0;
        continue ;
      } else {
        return array;
      }
    }  } else {
    return /* array */[];
  }
}

function fromSeq$1(seq) {
  var array = /* array */[];
  var _seq = seq;
  while(true) {
    var seq$1 = _seq;
    var match = _1(seq$1, /* () */0);
    if (match) {
      array.push(match[0]);
      _seq = match[1];
      continue ;
    } else {
      return array;
    }
  }}

function range$2($staropt$star, start, finish) {
  var step = $staropt$star ? $staropt$star[0] : 1;
  if (step === 0) {
    throw [
          InvalidArgument,
          "Array.range: ~step=0 would cause infinite loop"
        ];
  } else if (step < 0 && start < finish) {
    return /* array */[];
  } else if (step > 0 && start > finish) {
    return /* array */[];
  } else {
    var array = /* array */[];
    var last = imul(div(finish - start | 0, step), step) + start | 0;
    var loop = function (_n) {
      while(true) {
        var n = _n;
        array.push(n);
        if (n !== last) {
          _n = n + step | 0;
          continue ;
        } else {
          return 0;
        }
      }    };
    loop(start);
    return array;
  }
}

function get$1(self, i) {
  if (i >= 0 && i < self.length) {
    return /* Some */[self[i]];
  } else {
    return /* None */0;
  }
}

function set(self, i, value) {
  if (i >= 0 && i < self.length) {
    self[i] = value;
    return /* () */0;
  } else {
    return /* () */0;
  }
}

function getOrRaise(i, self) {
  if (i >= 0 && i < self.length) {
    return self[i];
  } else {
    throw IndexOutOfBounds;
  }
}

function setOrRaise(i, value, self) {
  if (i >= 0 && i < self.length) {
    self[i] = value;
    return /* () */0;
  } else {
    throw IndexOutOfBounds;
  }
}

function exists$3(f, self) {
  return self.some(__1(f));
}

function filter$3(f, self) {
  return self.filter(__1(f));
}

function find$3(f, self) {
  return undefined_to_opt(self.find(__1(f)));
}

function findIndex(f, self) {
  var i = self.findIndex(__1(f));
  if (i !== -1) {
    return /* Some */[/* tuple */[
              i,
              self[i]
            ]];
  } else {
    return /* None */0;
  }
}

function forAll$2(f, self) {
  return self.every(__1(f));
}

function flatMap$2(f, self) {
  var result = /* array */[];
  for(var i = 0 ,i_finish = self.length - 1 | 0; i <= i_finish; ++i){
    var nested = _1(f, self[i]);
    for(var j = 0 ,j_finish = nested.length - 1 | 0; j <= j_finish; ++j){
      result.push(nested[j]);
    }
  }
  return result;
}

function filterMap$2(f, self) {
  var result = /* array */[];
  for(var i = 0 ,i_finish = self.length - 1 | 0; i <= i_finish; ++i){
    var match = _1(f, self[i]);
    if (match) {
      result.push(match[0]);
    }
    
  }
  return result;
}

function product$2(f, xs, ys) {
  return flatMap$2((function (x) {
                return ys.map((function (y) {
                              return _2(f, x, y);
                            }));
              }), xs);
}

function apply$2(fs, xs) {
  return product$2((function (f, x) {
                return _1(f, x);
              }), fs, xs);
}
/* No side effect */

function from$3(x) {
  return /* Some */[x];
}

function some(x) {
  return /* Some */[x];
}

function fromResult(param) {
  if (param.tag) {
    return /* None */0;
  } else {
    return /* Some */[param[0]];
  }
}

function isSome(param) {
  if (param) {
    return true;
  } else {
    return false;
  }
}

function isNone(param) {
  if (param) {
    return false;
  } else {
    return true;
  }
}

function or_$1(other, self) {
  if (self) {
    return self;
  } else {
    return other;
  }
}

function getOr(other, param) {
  if (param) {
    return param[0];
  } else {
    return other;
  }
}

function getOrRaise$1(param) {
  if (param) {
    return param[0];
  } else {
    throw [
          InvalidArgument,
          "getOrRaise called on None"
        ];
  }
}

function map$3(f, param) {
  if (param) {
    return /* Some */[_1(f, param[0])];
  } else {
    return /* None */0;
  }
}

function mapOr(f, other, param) {
  if (param) {
    return _1(f, param[0]);
  } else {
    return other;
  }
}

function mapOrElse(f, g, param) {
  if (param) {
    return _1(f, param[0]);
  } else {
    return _1(g, /* () */0);
  }
}

function exists$4(predicate, param) {
  if (param) {
    return _1(predicate, param[0]);
  } else {
    return false;
  }
}

function forAll$3(predicate, param) {
  if (param) {
    return _1(predicate, param[0]);
  } else {
    return true;
  }
}

function filter$4(predicate, self) {
  if (self && _1(predicate, self[0])) {
    return self;
  } else {
    return /* None */0;
  }
}

function forEach$2(f, param) {
  if (param) {
    return _1(f, param[0]);
  } else {
    return /* () */0;
  }
}

function find$4(predicate, param) {
  if (param) {
    var x = param[0];
    if (_1(predicate, x)) {
      return /* Some */[x];
    } else {
      return /* None */0;
    }
  } else {
    return /* None */0;
  }
}

function andThen(f, param) {
  if (param) {
    return _1(f, param[0]);
  } else {
    return /* None */0;
  }
}

function flatten$1(param) {
  if (param) {
    return param[0];
  } else {
    return /* None */0;
  }
}

function apply$3(f, a) {
  if (f) {
    return map$3(f[0], a);
  } else {
    return /* None */0;
  }
}

function reduce$2(f, acc, param) {
  if (param) {
    return _2(f, acc, param[0]);
  } else {
    return acc;
  }
}

function reduceRight$2(f, acc, param) {
  if (param) {
    return _2(f, acc, param[0]);
  } else {
    return acc;
  }
}

var flatMap$3 = andThen;
/* No side effect */

/* No side effect */

function isEmpty$2(s) {
  return s.trim().length === 0;
}

function join(param) {
  if (param) {
    return param[0] + join(param[1]);
  } else {
    return "";
  }
}

function joinWith(sep, param) {
  if (param) {
    var ss = param[1];
    var s = param[0];
    if (ss) {
      return s + (sep + joinWith(sep, ss));
    } else {
      return s;
    }
  } else {
    return "";
  }
}
/* No side effect */

function Array_000(prim, prim$1) {
  return prim$1.map(prim);
}

function Array_003(prim, prim$1, prim$2) {
  return prim$2.reduce(prim, prim$1);
}

function Array_004(prim, prim$1, prim$2) {
  return prim$2.reduceRight(prim, prim$1);
}

function Array_008(prim, prim$1) {
  prim$1.forEach(prim);
  return /* () */0;
}

function Array_011(prim, prim$1) {
  return prim$1.concat(prim);
}

function Array_016(prim) {
  return prim.length;
}

function Array_024(prim, prim$1) {
  prim$1.fill(prim);
  return /* () */0;
}

function Array_025(prim, prim$1, prim$2) {
  return prim$2.slice(prim, prim$1);
}

function Array_026(prim) {
  return prim.slice();
}

function Array_027(prim, prim$1) {
  return prim$1.map(prim);
}

function Array_028(prim, prim$1) {
  prim$1.forEach(prim);
  return /* () */0;
}

var $$Array = [
  Array_000,
  apply$2,
  from$2,
  Array_003,
  Array_004,
  flatMap$2,
  forAll$2,
  find$3,
  Array_008,
  exists$3,
  filter$3,
  Array_011,
  make,
  fromList$1,
  fromSeq$1,
  range$2,
  Array_016,
  get$1,
  set,
  getOrRaise,
  setOrRaise,
  unsafeGetUnchecked,
  unsafeSetUnchecked,
  filterMap$2,
  Array_024,
  Array_025,
  Array_026,
  Array_027,
  Array_028,
  findIndex
];

var Fn = /* Rebase__Fn */[
  id$1,
  $$const,
  flip,
  curry,
  uncurry,
  $less$less,
  $great$great,
  tap
];

var List = [
  map$1,
  apply$1,
  from$1,
  reduce$1,
  reduceRight$1,
  flatMap$1,
  forAll$1,
  find$1,
  forEach$1,
  exists$1,
  filter$1,
  concat,
  fromArray$1,
  fromSeq,
  range$1,
  isEmpty$1,
  head$1,
  tail,
  filterMap$1,
  length,
  reverse,
  zip$1
];

var Option = [
  map$3,
  apply$3,
  from$3,
  reduce$2,
  reduceRight$2,
  flatMap$3,
  forAll$3,
  find$4,
  forEach$2,
  exists$4,
  filter$4,
  some,
  fromResult,
  isSome,
  isNone,
  or_$1,
  getOr,
  getOrRaise$1,
  mapOr,
  mapOrElse,
  flatten$1
];

function String_000(prim, prim$1) {
  return prim$1.concat(prim);
}

function String_001(prim) {
  return prim.length;
}

function String_002(prim, prim$1) {
  return prim$1.includes(prim);
}

function String_003(prim, prim$1) {
  return prim$1.startsWith(prim);
}

function String_004(prim, prim$1) {
  return prim$1.endsWith(prim);
}

function String_006(prim, prim$1, prim$2) {
  return prim$2.padStart(prim, prim$1);
}

function String_007(prim, prim$1, prim$2) {
  return prim$2.padEnd(prim, prim$1);
}

function String_008(prim) {
  return prim.trim();
}

function String_009(prim, prim$1, prim$2) {
  return prim$2.substr(prim, prim$1);
}

var $$String = [
  String_000,
  String_001,
  String_002,
  String_003,
  String_004,
  isEmpty$2,
  String_006,
  String_007,
  String_008,
  String_009,
  join,
  joinWith
];
/* No side effect */

var match = (process.env.NODE_ENV);

var outputDir = "data/generated";

var packageDir = Path.join(outputDir, "packages");

var sourcesFile = "data/sources.json";
/* match Not a pure module */

function entries(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values = new Array(l);
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    var key = keys[i];
    values[i] = /* tuple */[
      key,
      dict[key]
    ];
  }
  return values;
}
/* unsafeDeleteKey Not a pure module */

function _dispatch(f, value) {
  return _1(f, value);
}

function _complete(promise, value) {
  promise[/* value */0] = /* Some */[value];
  return List[/* forEach */8]((function (f) {
                return _1(f, value);
              }), promise[/* callbacks */1]);
}

function make$1() {
  return /* record */[
          /* value : None */0,
          /* callbacks : [] */0
        ];
}

function from$5(value) {
  return /* record */[
          /* value : Some */[/* Ok */__(0, [value])],
          /* callbacks : [] */0
        ];
}

function resolve(promise, value) {
  return _complete(promise, /* Ok */__(0, [value]));
}

function reject(promise, exn) {
  return _complete(promise, /* Error */__(1, [exn]));
}

function whenCompleted(f, future) {
  future[/* callbacks */1] = /* :: */[
    f,
    future[/* callbacks */1]
  ];
  return Option[/* forEach */8](__1(f), future[/* value */0]);
}

function whenResolved(f, future) {
  return whenCompleted((function (param) {
                if (param.tag) {
                  return /* () */0;
                } else {
                  return _1(f, param[0]);
                }
              }), future);
}

function map$6(f, future) {
  var promise = /* record */[
    /* value : None */0,
    /* callbacks : [] */0
  ];
  whenCompleted((function (param) {
          if (param.tag) {
            return _complete(promise, /* Error */__(1, [param[0]]));
          } else {
            var value = _1(f, param[0]);
            return _complete(promise, /* Ok */__(0, [value]));
          }
        }), future);
  return promise;
}

function flatMap$5(f, future) {
  var promise = /* record */[
    /* value : None */0,
    /* callbacks : [] */0
  ];
  whenCompleted((function (param) {
          if (param.tag) {
            return _complete(promise, /* Error */__(1, [param[0]]));
          } else {
            return whenCompleted((function (param) {
                          if (param.tag) {
                            return _complete(promise, /* Error */__(1, [param[0]]));
                          } else {
                            return _complete(promise, /* Ok */__(0, [param[0]]));
                          }
                        }), _1(f, param[0]));
          }
        }), future);
  return promise;
}

function fromJSPromise(jsPromise) {
  var promise = /* record */[
    /* value : None */0,
    /* callbacks : [] */0
  ];
  jsPromise.then((function (v) {
            return Promise.resolve(_complete(promise, /* Ok */__(0, [v])));
          })).catch((function (e) {
          return Promise.resolve(_complete(promise, /* Error */__(1, [e])));
        }));
  return promise;
}

var Future = /* module */[
  /* _dispatch */_dispatch,
  /* _complete */_complete,
  /* make */make$1,
  /* from */from$5,
  /* resolve */resolve,
  /* reject */reject,
  /* whenCompleted */whenCompleted,
  /* whenResolved */whenResolved,
  /* map */map$6,
  /* flatMap */flatMap$5,
  /* fromJSPromise */fromJSPromise
];
/* No side effect */

/* No side effect */

/* No side effect */

var btoa = (
  function () {
    if (btoa) return btoa;

    var Buffer = Buffer || require('buffer').Buffer;
    return function (str) {
      return new Buffer(str).toString('base64');
    }
  }()
);
/* btoa Not a pure module */

/* Js_dict Not a pure module */

/* Refetch__Headers Not a pure module */

/* No side effect */

var text = _2(Fn[/* >> */6], (function (prim) {
        return prim.text();
      }), Future[/* fromJSPromise */10]);

var json$1 = _2(Fn[/* >> */6], (function (prim) {
        return prim.json();
      }), Future[/* fromJSPromise */10]);
/* text Not a pure module */

/* Refetch__Request Not a pure module */

var Bottom = create("Array.Bottom");
/* No side effect */

var DecodeError = create("Json_decode.DecodeError");

function string(json) {
  if (typeof json === "string") {
    return json;
  } else {
    throw [
          DecodeError,
          "Expected string, got " + JSON.stringify(json)
        ];
  }
}

function array(decode, json) {
  if (Array.isArray(json)) {
    var length = json.length;
    var target = new Array(length);
    for(var i = 0 ,i_finish = length - 1 | 0; i <= i_finish; ++i){
      var value;
      try {
        value = _1(decode, json[i]);
      }
      catch (raw_exn){
        var exn = internalToOCamlException(raw_exn);
        if (exn[0] === DecodeError) {
          throw [
                DecodeError,
                exn[1] + ("\n\tin array at index " + String(i))
              ];
        } else {
          throw exn;
        }
      }
      target[i] = value;
    }
    return target;
  } else {
    throw [
          DecodeError,
          "Expected array, got " + JSON.stringify(json)
        ];
  }
}

function dict(decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var keys = Object.keys(json);
    var l = keys.length;
    var target = { };
    for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      var key = keys[i];
      var value;
      try {
        value = _1(decode, json[key]);
      }
      catch (raw_exn){
        var exn = internalToOCamlException(raw_exn);
        if (exn[0] === DecodeError) {
          throw [
                DecodeError,
                exn[1] + "\n\tin dict"
              ];
        } else {
          throw exn;
        }
      }
      target[key] = value;
    }
    return target;
  } else {
    throw [
          DecodeError,
          "Expected object, got " + JSON.stringify(json)
        ];
  }
}

function field(key, decode, json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    var match = json[key];
    if (match !== undefined) {
      try {
        return _1(decode, match);
      }
      catch (raw_exn){
        var exn = internalToOCamlException(raw_exn);
        if (exn[0] === DecodeError) {
          throw [
                DecodeError,
                exn[1] + ("\n\tat field '" + (key + "'"))
              ];
        } else {
          throw exn;
        }
      }
    } else {
      throw [
            DecodeError,
            "Expected field \'" + (String(key) + "\'")
          ];
    }
  } else {
    throw [
          DecodeError,
          "Expected object, got " + JSON.stringify(json)
        ];
  }
}

function optional(decode, json) {
  try {
    return /* Some */[_1(decode, json)];
  }
  catch (raw_exn){
    var exn = internalToOCamlException(raw_exn);
    if (exn[0] === DecodeError) {
      return /* None */0;
    } else {
      throw exn;
    }
  }
}

function map$8(f, decode, json) {
  return _1(f, _1(decode, json));
}
/* No side effect */

function looksLikeUrl(str) {
  if ($$String[/* startsWith */3]("http://", str)) {
    return true;
  } else {
    return $$String[/* startsWith */3]("https://", str);
  }
}

function parseUrl(url) {
  if ($$String[/* includes */2]("github.com", url)) {
    var segments = url.split("/");
    var length = $$Array[/* length */16](segments);
    if (length < 2) {
      failwith("What the hell kind of a URL is this: " + url);
    }
    return /* Github */[
            $$Array[/* getOrRaise */19](length - 2 | 0, segments),
            $$Array[/* getOrRaise */19](length - 1 | 0, segments)
          ];
  } else {
    return failwith("Unknown URL: " + url);
  }
}

function parseGitHubPath(path) {
  var match = path.replace("github:", "").split("/");
  if (match.length !== 2) {
    return failwith("Not a vlid Github path: " + path);
  } else {
    var owner = match[0];
    var repo = match[1];
    return /* Github */[
            owner,
            repo
          ];
  }
}

function parse$1(str) {
  if (looksLikeUrl(str)) {
    return parseUrl(str);
  } else if ($$String[/* startsWith */3]("github:", str)) {
    return parseGitHubPath(str);
  } else {
    return failwith("Fuck if I know what this is: " + str);
  }
}
/* Refetch Not a pure module */

function category(param) {
  return map$8((function (other) {
                switch (other) {
                  case "binding" : 
                      return /* Binding */0;
                  case "boilerplate" : 
                      return /* Boilerplate */3;
                  case "library" : 
                      return /* Library */1;
                  case "tool" : 
                      return /* Tool */2;
                  default:
                    throw [
                          DecodeError,
                          "Unknown package type: " + other
                        ];
                }
              }), string, param);
}

function platform(param) {
  return map$8((function (other) {
                switch (other) {
                  case "any" : 
                      return /* Any */3;
                  case "browser" : 
                      return /* Browser */0;
                  case "native" : 
                      return /* Native */2;
                  case "node" : 
                      return /* Node */1;
                  default:
                    throw [
                          DecodeError,
                          "Unknown platform: " + other
                        ];
                }
              }), string, param);
}

function collection(decoder) {
  var partial_arg = Fn[/* id */0];
  var partial_arg$1 = function (param) {
    return dict(partial_arg, param);
  };
  var partial_arg$2 = $$Array[/* map */0];
  var partial_arg$3 = _2(Fn[/* >> */6], _2(Fn[/* >> */6], entries, (function (param) {
              return partial_arg$2((function (param) {
                            var key = param[0];
                            try {
                              return _2(decoder, key, param[1]);
                            }
                            catch (raw_exn){
                              var exn = internalToOCamlException(raw_exn);
                              if (exn[0] === DecodeError) {
                                throw [
                                      DecodeError,
                                      exn[1] + ("\n\tat " + key)
                                    ];
                              } else {
                                throw exn;
                              }
                            }
                          }), param);
            })), List[/* fromArray */12]);
  return (function (param) {
      return map$8(partial_arg$3, partial_arg$1, param);
    });
}

function fromJson(key, json) {
  return /* record */[
          /* id */key,
          /* category */field("category", category, json),
          /* flags */optional((function (param) {
                  return field("flags", (function (param) {
                                return array(string, param);
                              }), param);
                }), json),
          /* platforms */field("platforms", (function (param) {
                  return array(platform, param);
                }), json),
          /* keywords */optional((function (param) {
                  return field("keywords", (function (param) {
                                return array(string, param);
                              }), param);
                }), json),
          /* comment */optional((function (param) {
                  return field("comment", string, param);
                }), json)
        ];
}

function get$3($staropt$star, _) {
  var filename = $staropt$star ? $staropt$star[0] : sourcesFile;
  return field("published", collection(fromJson), parseOrRaise(Fs.readFileSync(filename, "ascii")));
}

var Published = /* module */[
  /* fromJson */fromJson,
  /* get */get$3
];

function fromJson$1(key, json) {
  return /* record */[
          /* id */key,
          /* repository */field("repository", (function (param) {
                  return map$8(parse$1, string, param);
                }), json),
          /* category */field("category", category, json),
          /* flags */optional((function (param) {
                  return field("flags", (function (param) {
                                return array(string, param);
                              }), param);
                }), json),
          /* platforms */field("platforms", (function (param) {
                  return array(platform, param);
                }), json),
          /* keywords */optional((function (param) {
                  return field("keywords", (function (param) {
                                return array(string, param);
                              }), param);
                }), json),
          /* comment */optional((function (param) {
                  return field("comment", string, param);
                }), json)
        ];
}

function get$1$1($staropt$star, _) {
  var filename = $staropt$star ? $staropt$star[0] : sourcesFile;
  return field("unpublished", collection(fromJson$1), parseOrRaise(Fs.readFileSync(filename, "ascii")));
}

var Unpublished = /* module */[
  /* fromJson */fromJson$1,
  /* get */get$1$1
];
/* fs Not a pure module */

var filename = $$Array[/* get */17](Process.argv, 2);

function assertNotEmpty(array$$1, msg) {
  if ($$Array[/* length */16](array$$1) === 0) {
    return failwith(msg);
  } else {
    return 0;
  }
}

function assertNoDuplicates(array$$1, msg) {
  var sorted = array$$1.slice().sort();
  if (sorted.some((function (x, i) {
            return x === $$Array[/* unsafeGetUnchecked */21](i - 1 | 0, sorted);
          }))) {
    return failwith(msg);
  } else {
    return 0;
  }
}

try {
  List[/* forEach */8]((function (source) {
          assertNotEmpty(source[/* platforms */3], "No platforms specified\n\tat " + source[/* id */0]);
          assertNoDuplicates(source[/* platforms */3], "Duplicate items in platforms\n\tat " + source[/* id */0]);
          return Option[/* forEach */8]((function (keywords) {
                        return assertNoDuplicates(keywords, "Duplicate items in keywords\n\tat " + source[/* id */0]);
                      }), source[/* keywords */4]);
        }), Published[/* get */1](filename, /* () */0));
  List[/* forEach */8]((function (source) {
          assertNotEmpty(source[/* platforms */4], "No platforms specified\n\tat " + source[/* id */0]);
          assertNoDuplicates(source[/* platforms */4], "Duplicate items in platforms\n\tat " + source[/* id */0]);
          return Option[/* forEach */8]((function (keywords) {
                        return assertNoDuplicates(keywords, "Duplicate items in keywords\n\tat " + source[/* id */0]);
                      }), source[/* keywords */5]);
        }), Unpublished[/* get */1](filename, /* () */0));
}
catch (raw_exn){
  var exn = internalToOCamlException(raw_exn);
  var exit$1 = 0;
  var msg;
  if (exn[0] === failure) {
    msg = exn[1];
    exit$1 = 1;
  } else if (exn[0] === ParseError) {
    msg = exn[1];
    exit$1 = 1;
  } else if (exn[0] === DecodeError) {
    msg = exn[1];
    exit$1 = 1;
  } else {
    throw exn;
  }
  if (exit$1 === 1) {
    console.log(msg);
    Process.exit(1);
  }
  
}
/* filename Not a pure module */

exports.filename = filename;
exports.assertNotEmpty = assertNotEmpty;
exports.assertNoDuplicates = assertNoDuplicates;
