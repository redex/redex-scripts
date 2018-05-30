#!/usr/bin/env node
'use strict';

require('fs');
require('path');
var Process = require('process');

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

function caml_array_set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    xs[index] = newval;
    return /* () */0;
  }
}

function caml_array_get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    return xs[index];
  }
}

function caml_make_vect(len, init) {
  var b = new Array(len);
  for(var i = 0 ,i_finish = len - 1 | 0; i <= i_finish; ++i){
    b[i] = init;
  }
  return b;
}

function caml_array_blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for(var j = 0 ,j_finish = len - 1 | 0; j <= j_finish; ++j){
      a2[j + i2 | 0] = a1[j + i1 | 0];
    }
    return /* () */0;
  } else {
    for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){
      a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
    }
    return /* () */0;
  }
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

function id(x) {
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

var id$1 = [0];

function get_id() {
  id$1[0] += 1;
  return id$1[0];
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

function caml_float_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}
/* No side effect */

var for_in = function (o,foo){
        for (var x in o) { foo(x); }
      };

function caml_equal(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return true;
    } else {
      var a_type = typeof a;
      if (a_type === "string" || a_type === "number" || a_type === "boolean" || a_type === "undefined" || a === null) {
        return false;
      } else {
        var b_type = typeof b;
        if (a_type === "function" || b_type === "function") {
          throw [
                invalid_argument,
                "equal: functional value"
              ];
        } else if (b_type === "number" || b_type === "undefined" || b === null) {
          return false;
        } else {
          var tag_a = a.tag | 0;
          var tag_b = b.tag | 0;
          if (tag_a === 250) {
            _a = a[0];
            continue ;
          } else if (tag_b === 250) {
            _b = b[0];
            continue ;
          } else if (tag_a === 248) {
            return a[1] === b[1];
          } else if (tag_a === 251) {
            throw [
                  invalid_argument,
                  "equal: abstract value"
                ];
          } else if (tag_a !== tag_b) {
            return false;
          } else {
            var len_a = a.length | 0;
            var len_b = b.length | 0;
            if (len_a === len_b) {
              if (Array.isArray(a)) {
                var a$1 = a;
                var b$1 = b;
                var _i = 0;
                var same_length = len_a;
                while(true) {
                  var i = _i;
                  if (i === same_length) {
                    return true;
                  } else if (caml_equal(a$1[i], b$1[i])) {
                    _i = i + 1 | 0;
                    continue ;
                  } else {
                    return false;
                  }
                }              } else {
                var a$2 = a;
                var b$2 = b;
                var result = [true];
                var do_key_a = (function(b$2,result){
                return function do_key_a(key) {
                  if (b$2.hasOwnProperty(key)) {
                    return 0;
                  } else {
                    result[0] = false;
                    return /* () */0;
                  }
                }
                }(b$2,result));
                var do_key_b = (function(a$2,b$2,result){
                return function do_key_b(key) {
                  if (!a$2.hasOwnProperty(key) || !caml_equal(b$2[key], a$2[key])) {
                    result[0] = false;
                    return /* () */0;
                  } else {
                    return 0;
                  }
                }
                }(a$2,b$2,result));
                for_in(a$2, do_key_a);
                if (result[0]) {
                  for_in(b$2, do_key_b);
                }
                return result[0];
              }
            } else {
              return false;
            }
          }
        }
      }
    }
  }}
/* No side effect */

/* node_std_output Not a pure module */

function caml_sys_random_seed() {
  return /* array */[((Date.now() | 0) ^ 4294967295) * Math.random() | 0];
}
/* No side effect */

/* repeat Not a pure module */

var min_int = /* record */[
  /* hi */-2147483648,
  /* lo */0
];

var max_int = /* record */[
  /* hi */2147483647,
  /* lo */1
];

var one = /* record */[
  /* hi */0,
  /* lo */1
];

var zero = /* record */[
  /* hi */0,
  /* lo */0
];

var neg_one = /* record */[
  /* hi */-1,
  /* lo */4294967295
];

function neg_signed(x) {
  return (x & 2147483648) !== 0;
}

function add(param, param$1) {
  var other_low_ = param$1[/* lo */1];
  var this_low_ = param[/* lo */1];
  var lo = this_low_ + other_low_ & 4294967295;
  var overflow = neg_signed(this_low_) && (neg_signed(other_low_) || !neg_signed(lo)) || neg_signed(other_low_) && !neg_signed(lo) ? 1 : 0;
  var hi = param[/* hi */0] + param$1[/* hi */0] + overflow & 4294967295;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function not(param) {
  var hi = param[/* hi */0] ^ -1;
  var lo = param[/* lo */1] ^ -1;
  return /* record */[
          /* hi */hi,
          /* lo */(lo >>> 0)
        ];
}

function eq(x, y) {
  if (x[/* hi */0] === y[/* hi */0]) {
    return x[/* lo */1] === y[/* lo */1];
  } else {
    return false;
  }
}

function neg(x) {
  if (eq(x, min_int)) {
    return min_int;
  } else {
    return add(not(x), one);
  }
}

function sub(x, y) {
  return add(x, neg(y));
}

function lsl_(x, numBits) {
  if (numBits === 0) {
    return x;
  } else {
    var lo = x[/* lo */1];
    if (numBits >= 32) {
      return /* record */[
              /* hi */(lo << (numBits - 32 | 0)),
              /* lo */0
            ];
    } else {
      var hi = (lo >>> (32 - numBits | 0)) | (x[/* hi */0] << numBits);
      return /* record */[
              /* hi */hi,
              /* lo */((lo << numBits) >>> 0)
            ];
    }
  }
}

function asr_(x, numBits) {
  if (numBits === 0) {
    return x;
  } else {
    var hi = x[/* hi */0];
    if (numBits < 32) {
      var hi$1 = (hi >> numBits);
      var lo = (hi << (32 - numBits | 0)) | (x[/* lo */1] >>> numBits);
      return /* record */[
              /* hi */hi$1,
              /* lo */(lo >>> 0)
            ];
    } else {
      var lo$1 = (hi >> (numBits - 32 | 0));
      return /* record */[
              /* hi */hi >= 0 ? 0 : -1,
              /* lo */(lo$1 >>> 0)
            ];
    }
  }
}

function is_zero(param) {
  if (param[/* hi */0] !== 0 || param[/* lo */1] !== 0) {
    return false;
  } else {
    return true;
  }
}

function mul(_this, _other) {
  while(true) {
    var other = _other;
    var $$this = _this;
    var exit = 0;
    var lo;
    var this_hi = $$this[/* hi */0];
    var exit$1 = 0;
    var exit$2 = 0;
    var exit$3 = 0;
    if (this_hi !== 0 || $$this[/* lo */1] !== 0) {
      exit$3 = 4;
    } else {
      return zero;
    }
    if (exit$3 === 4) {
      if (other[/* hi */0] !== 0 || other[/* lo */1] !== 0) {
        exit$2 = 3;
      } else {
        return zero;
      }
    }
    if (exit$2 === 3) {
      if (this_hi !== -2147483648 || $$this[/* lo */1] !== 0) {
        exit$1 = 2;
      } else {
        lo = other[/* lo */1];
        exit = 1;
      }
    }
    if (exit$1 === 2) {
      var other_hi = other[/* hi */0];
      var lo$1 = $$this[/* lo */1];
      var exit$4 = 0;
      if (other_hi !== -2147483648 || other[/* lo */1] !== 0) {
        exit$4 = 3;
      } else {
        lo = lo$1;
        exit = 1;
      }
      if (exit$4 === 3) {
        var other_lo = other[/* lo */1];
        if (this_hi < 0) {
          if (other_hi < 0) {
            _other = neg(other);
            _this = neg($$this);
            continue ;
          } else {
            return neg(mul(neg($$this), other));
          }
        } else if (other_hi < 0) {
          return neg(mul($$this, neg(other)));
        } else {
          var a48 = (this_hi >>> 16);
          var a32 = this_hi & 65535;
          var a16 = (lo$1 >>> 16);
          var a00 = lo$1 & 65535;
          var b48 = (other_hi >>> 16);
          var b32 = other_hi & 65535;
          var b16 = (other_lo >>> 16);
          var b00 = other_lo & 65535;
          var c48 = 0;
          var c32 = 0;
          var c16 = 0;
          var c00 = a00 * b00;
          c16 = (c00 >>> 16) + a16 * b00;
          c32 = (c16 >>> 16);
          c16 = (c16 & 65535) + a00 * b16;
          c32 = c32 + (c16 >>> 16) + a32 * b00;
          c48 = (c32 >>> 16);
          c32 = (c32 & 65535) + a16 * b16;
          c48 += (c32 >>> 16);
          c32 = (c32 & 65535) + a00 * b32;
          c48 += (c32 >>> 16);
          c32 = c32 & 65535;
          c48 = c48 + (a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48) & 65535;
          var hi = c32 | (c48 << 16);
          var lo$2 = c00 & 65535 | ((c16 & 65535) << 16);
          return /* record */[
                  /* hi */hi,
                  /* lo */(lo$2 >>> 0)
                ];
        }
      }
      
    }
    if (exit === 1) {
      if ((lo & 1) === 0) {
        return zero;
      } else {
        return min_int;
      }
    }
    
  }}

function or_(param, param$1) {
  return /* record */[
          /* hi */param[/* hi */0] | param$1[/* hi */0],
          /* lo */((param[/* lo */1] | param$1[/* lo */1]) >>> 0)
        ];
}

function ge(param, param$1) {
  var other_hi = param$1[/* hi */0];
  var hi = param[/* hi */0];
  if (hi > other_hi) {
    return true;
  } else if (hi < other_hi) {
    return false;
  } else {
    return param[/* lo */1] >= param$1[/* lo */1];
  }
}

function gt(x, y) {
  if (x[/* hi */0] > y[/* hi */0]) {
    return true;
  } else if (x[/* hi */0] < y[/* hi */0]) {
    return false;
  } else {
    return x[/* lo */1] > y[/* lo */1];
  }
}

function le(x, y) {
  return !gt(x, y);
}

function to_float(param) {
  return param[/* hi */0] * (0x100000000) + param[/* lo */1];
}

var two_ptr_32_dbl = Math.pow(2, 32);

var two_ptr_63_dbl = Math.pow(2, 63);

var neg_two_ptr_63 = -Math.pow(2, 63);

function of_float(x) {
  if (isNaN(x) || !isFinite(x)) {
    return zero;
  } else if (x <= neg_two_ptr_63) {
    return min_int;
  } else if (x + 1 >= two_ptr_63_dbl) {
    return max_int;
  } else if (x < 0) {
    return neg(of_float(-x));
  } else {
    var hi = x / two_ptr_32_dbl | 0;
    var lo = x % two_ptr_32_dbl | 0;
    return /* record */[
            /* hi */hi,
            /* lo */(lo >>> 0)
          ];
  }
}

function div$1(_self, _other) {
  while(true) {
    var other = _other;
    var self = _self;
    var self_hi = self[/* hi */0];
    var exit = 0;
    var exit$1 = 0;
    if (other[/* hi */0] !== 0 || other[/* lo */1] !== 0) {
      exit$1 = 2;
    } else {
      throw division_by_zero;
    }
    if (exit$1 === 2) {
      if (self_hi !== -2147483648) {
        if (self_hi !== 0 || self[/* lo */1] !== 0) {
          exit = 1;
        } else {
          return zero;
        }
      } else if (self[/* lo */1] !== 0) {
        exit = 1;
      } else if (eq(other, one) || eq(other, neg_one)) {
        return self;
      } else if (eq(other, min_int)) {
        return one;
      } else {
        var other_hi = other[/* hi */0];
        var half_this = asr_(self, 1);
        var approx = lsl_(div$1(half_this, other), 1);
        var exit$2 = 0;
        if (approx[/* hi */0] !== 0 || approx[/* lo */1] !== 0) {
          exit$2 = 3;
        } else if (other_hi < 0) {
          return one;
        } else {
          return neg(one);
        }
        if (exit$2 === 3) {
          var y = mul(other, approx);
          var rem = add(self, neg(y));
          return add(approx, div$1(rem, other));
        }
        
      }
    }
    if (exit === 1) {
      var other_hi$1 = other[/* hi */0];
      var exit$3 = 0;
      if (other_hi$1 !== -2147483648 || other[/* lo */1] !== 0) {
        exit$3 = 2;
      } else {
        return zero;
      }
      if (exit$3 === 2) {
        if (self_hi < 0) {
          if (other_hi$1 < 0) {
            _other = neg(other);
            _self = neg(self);
            continue ;
          } else {
            return neg(div$1(neg(self), other));
          }
        } else if (other_hi$1 < 0) {
          return neg(div$1(self, neg(other)));
        } else {
          var res = zero;
          var rem$1 = self;
          while(ge(rem$1, other)) {
            var approx$1 = caml_float_max(1, Math.floor(to_float(rem$1) / to_float(other)));
            var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
            var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
            var approxRes = of_float(approx$1);
            var approxRem = mul(approxRes, other);
            while(approxRem[/* hi */0] < 0 || gt(approxRem, rem$1)) {
              approx$1 -= delta;
              approxRes = of_float(approx$1);
              approxRem = mul(approxRes, other);
            }            if (is_zero(approxRes)) {
              approxRes = one;
            }
            res = add(res, approxRes);
            rem$1 = add(rem$1, neg(approxRem));
          }          return res;
        }
      }
      
    }
    
  }}

function mod_$1(self, other) {
  var y = mul(div$1(self, other), other);
  return add(self, neg(y));
}

function of_int32(lo) {
  return /* record */[
          /* hi */lo < 0 ? -1 : 0,
          /* lo */(lo >>> 0)
        ];
}
/* two_ptr_32_dbl Not a pure module */

/* float_of_string Not a pure module */

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw [
          invalid_argument,
          "index out of bounds"
        ];
  } else {
    return s.charCodeAt(i);
  }
}
/* No side effect */

function not_implemented(s) {
  var str = s + " not implemented by BuckleScript yet\n";
  throw new Error(str);
}
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

function null_undefined_to_opt(x) {
  if (x === null || x === undefined) {
    return /* None */0;
  } else {
    return /* Some */[x];
  }
}

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
  id,
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

function lints_000($$package) {
  var match = $$String[/* trim */8]($$package.description) === "";
  if (match) {
    return /* Some */["Missing description"];
  } else {
    return /* None */0;
  }
}

var lints_001 = /* :: */[
  (function ($$package) {
      var match = $$String[/* trim */8]($$package.readme) === "";
      if (match) {
        return /* Some */["Missing readme"];
      } else {
        return /* None */0;
      }
    }),
  /* :: */[
    (function ($$package) {
        var l = $$String[/* length */1]($$String[/* trim */8]($$package.readme));
        var match = l > 0 && l < 400;
        if (match) {
          return /* Some */["Short readme"];
        } else {
          return /* None */0;
        }
      }),
    /* :: */[
      (function ($$package) {
          var match = ($$package.license == null);
          if (match) {
            return /* Some */["Missing license"];
          } else {
            return /* None */0;
          }
        }),
      /* :: */[
        (function ($$package) {
            var match = $$Array[/* length */16]($$package.keywords) === 0;
            if (match) {
              return /* Some */["Missing keywords"];
            } else {
              return /* None */0;
            }
          }),
        /* :: */[
          (function ($$package) {
              var sorted = $$package.keywords.slice().sort();
              var match = sorted.some((function (x, i) {
                      return x === $$Array[/* unsafeGetUnchecked */21](i - 1 | 0, sorted);
                    }));
              if (match) {
                return /* Some */["Duplicate keywords"];
              } else {
                return /* None */0;
              }
            }),
          /* :: */[
            (function ($$package) {
                var match = $$Array[/* exists */9]((function (k) {
                        return $$String[/* startsWith */3]("bs-", k);
                      }), $$package.keywords);
                if (match) {
                  return /* Some */["Keyword starting with 'bs-'"];
                } else {
                  return /* None */0;
                }
              }),
            /* :: */[
              (function ($$package) {
                  var match = ($$package.repositoryUrl == null);
                  if (match) {
                    return /* Some */["Missing repository url"];
                  } else {
                    return /* None */0;
                  }
                }),
              /* :: */[
                (function ($$package) {
                    var match = ($$package.homepageUrl == null);
                    if (match) {
                      return /* Some */["Missing homepage url"];
                    } else {
                      return /* None */0;
                    }
                  }),
                /* :: */[
                  (function ($$package) {
                      var match = ($$package.issuesUrl == null);
                      if (match) {
                        return /* Some */["Missing issues url"];
                      } else {
                        return /* None */0;
                      }
                    }),
                  /* :: */[
                    (function ($$package) {
                        var match = $$String[/* length */1]($$package.readme) > 10000;
                        if (match) {
                          return /* Some */["Readme > 10k bytes"];
                        } else {
                          return /* None */0;
                        }
                      }),
                    /* :: */[
                      (function ($$package) {
                          return Option[/* map */0]((function (message) {
                                        return "Deprecated - " + message;
                                      }), null_undefined_to_opt($$package.deprecated));
                        }),
                      /* [] */0
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
];

var lints = /* :: */[
  lints_000,
  lints_001
];

function lintPackage($$package) {
  return List[/* filterMap */18]((function (lint) {
                return _1(lint, $$package);
              }), lints);
}
/* No side effect */

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

function map$5(f, future) {
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
  /* map */map$5,
  /* flatMap */flatMap$5,
  /* fromJSPromise */fromJSPromise
];
/* No side effect */

function other(m) {
  return m;
}

var Method = /* module */[
  /* get */"GET",
  /* head */"HEAD",
  /* post */"POST",
  /* put */"PUT",
  /* delete */"DELETE",
  /* connect */"CONNECT",
  /* options */"OPTIONS",
  /* trace */"TRACE",
  /* patch */"PATCH",
  /* other */other
];

var RequestInit = [(function (prim, prim$1, prim$2, prim$3, prim$4, prim$5, prim$6, prim$7, prim$8, prim$9, prim$10, _) {
      var tmp = { };
      if (prim) {
        tmp.method = prim[0];
      }
      if (prim$1) {
        tmp.headers = prim$1[0];
      }
      if (prim$2) {
        tmp.body = prim$2[0];
      }
      if (prim$3) {
        tmp.referrer = prim$3[0];
      }
      if (prim$4) {
        tmp.referrerPolicy = prim$4[0];
      }
      if (prim$5) {
        tmp.mode = prim$5[0];
      }
      if (prim$6) {
        tmp.credentials = prim$6[0];
      }
      if (prim$7) {
        tmp.cache = prim$7[0];
      }
      if (prim$8) {
        tmp.redirect = prim$8[0];
      }
      if (prim$9) {
        tmp.integrity = prim$9[0];
      }
      if (prim$10) {
        tmp.keepalive = prim$10[0];
      }
      return tmp;
    })];
/* No side effect */

/* No side effect */

function fromList$2(entries) {
  var dict = { };
  var _param = entries;
  while(true) {
    var param = _param;
    if (param) {
      var match = param[0];
      dict[match[0]] = match[1];
      _param = param[1];
      continue ;
    } else {
      return dict;
    }
  }}
/* unsafeDeleteKey Not a pure module */

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

function _pairifyHeader(h) {
  var param = h;
  if (typeof param === "number") {
    return failwith("TODO");
  } else {
    var variant = param[0];
    if (variant >= 246273139) {
      if (variant !== 826042841) {
        if (variant !== 1022564063) {
          if (variant >= 246273140) {
            return failwith("TODO");
          } else {
            return /* tuple */[
                    "Content-Type",
                    param[1]
                  ];
          }
        } else {
          return /* tuple */[
                  "Content-Length",
                  String(param[1])
                ];
        }
      } else {
        var scheme = param[1];
        var value;
        if (scheme[0] >= -881134847) {
          value = "Bearer " + (String(scheme[1]) + "");
        } else {
          var match = scheme[1];
          var encoded = _1(btoa, "" + (String(match[0]) + (":" + (String(match[1]) + ""))));
          value = "Basic " + (String(encoded) + "");
        }
        return /* tuple */[
                "Authorization",
                value
              ];
      }
    } else if (variant !== -378039458) {
      if (variant !== 4099528) {
        return failwith("TODO");
      } else {
        var match$1 = param[1];
        return /* tuple */[
                match$1[0],
                match$1[1]
              ];
      }
    } else {
      var match$2 = param[1];
      var typ = match$2[0];
      var typ$1 = typeof typ === "number" ? (
          typ >= -735835133 ? "attachment" : "inline"
        ) : typ[1];
      var value$1 = List[/* reduce */3]((function (acc, p) {
              return "" + (String(acc) + ("; " + (String(p) + "")));
            }), typ$1, List[/* map */0]((function (param) {
                  if (param[0] >= -786699545) {
                    return "filename=\"" + (String(param[1]) + "\"");
                  } else {
                    var match = param[1];
                    return "" + (String(match[0]) + ("=\"" + (String(match[1]) + "\"")));
                  }
                }), match$2[1]));
      return /* tuple */[
              "Content-Disposition",
              value$1
            ];
    }
  }
}

function _stringifyPair(param) {
  return "" + (String(param[0]) + (": " + (String(param[1]) + "")));
}

function _stringifyHeader(header) {
  return _stringifyPair(_pairifyHeader(header));
}

function _encode(headers) {
  return fromList$2(List[/* map */0](_pairifyHeader, headers));
}
/* Js_dict Not a pure module */

function make$2(method_, $staropt$star, $staropt$star$1, body, url) {
  var queryParams = $staropt$star ? $staropt$star[0] : /* [] */0;
  var headers = $staropt$star$1 ? $staropt$star$1[0] : /* [] */0;
  return /* record */[
          /* url */url,
          /* method */method_,
          /* queryParams */queryParams,
          /* headers */headers,
          /* body */body
        ];
}

function _encodeMethod(param) {
  if (typeof param === "number") {
    if (param >= 357830602) {
      if (param !== 492530731) {
        if (param >= 891112544) {
          if (param >= 994393768) {
            return Method[/* patch */8];
          } else {
            return Method[/* post */2];
          }
        } else if (param >= 801894688) {
          return Method[/* head */1];
        } else {
          return Method[/* connect */5];
        }
      } else {
        return Method[/* delete */4];
      }
    } else if (param >= 3997359) {
      if (param >= 336447077) {
        return Method[/* trace */7];
      } else {
        return Method[/* put */3];
      }
    } else if (param >= 3546230) {
      return Method[/* get */0];
    } else {
      return Method[/* options */6];
    }
  } else {
    return Method[/* other */9](param[1]);
  }
}

function _buildUrl(url, params) {
  var encodeParam = function (param) {
    return encodeURIComponent(param[0]) + ("=" + encodeURIComponent(param[1]));
  };
  var params$1 = $$String[/* joinWith */11]("&", List[/* map */0](encodeParam, params));
  if (params$1 === "") {
    return url;
  } else {
    return "" + (String(url) + ("?" + (String(params$1) + "")));
  }
}

function _stringifyPayload(param) {
  var variant = param[0];
  if (variant >= 781815140) {
    if (variant >= 826371656) {
      return JSON.stringify(param[1]);
    } else {
      return $$String[/* joinWith */11]("&", List[/* map */0]((function (param) {
                        return "" + (String(param[0]) + ("=" + (String(param[1]) + "")));
                      }), param[1]));
    }
  } else if (variant >= -976970511) {
    return param[1];
  } else {
    var match = param[1];
    var boundary = match[0];
    return List[/* reduce */3]((function (acc, p) {
                  return "\n" + (acc + p);
                }), "--" + (String(boundary) + "\n"), List[/* map */0]((function (param) {
                      var headers = List[/* reduce */3]((function (acc, h) {
                              return acc + (h + "\n");
                            }), "", List[/* map */0](_stringifyHeader, param[0]));
                      var payload = _stringifyPayload(param[1]);
                      return "" + (String(headers) + ("\n" + (String(payload) + ("\n--" + (String(boundary) + "\n")))));
                    }), match[1]));
  }
}

function _toFetchRequest(request) {
  return new Request(_buildUrl(request[/* url */0], request[/* queryParams */2]), RequestInit[/* make */0](/* Some */[_encodeMethod(request[/* method */1])], /* Some */[_encode(List[/* reverse */20](request[/* headers */3]))], Option[/* map */0](_2(Fn[/* >> */6], _stringifyPayload, (function (prim) {
                            return prim;
                          })), request[/* body */4]), /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* None */0, /* () */0));
}
/* Refetch__Headers Not a pure module */

function codeFromInt(param) {
  if (param >= 227) {
    var switcher = param - 400 | 0;
    if (switcher > 111 || switcher < 0) {
      return failwith("TODO: exception or option?");
    } else {
      switch (switcher) {
        case 0 : 
            return /* BadRequest */-365540310;
        case 1 : 
            return /* Unauthorized */324098644;
        case 2 : 
            return /* PaymentRequired */-503105947;
        case 3 : 
            return /* Forbidden */-438114087;
        case 4 : 
            return /* NotFound */-296251313;
        case 5 : 
            return /* MethodNotAllowed */-988253514;
        case 6 : 
            return /* NotAcceptable */-418805899;
        case 7 : 
            return /* ProxyAuthenticationRequired */-720432155;
        case 8 : 
            return /* RequestTimeout */-57405646;
        case 9 : 
            return /* Conflict */-36288910;
        case 10 : 
            return /* Gone */792903807;
        case 11 : 
            return /* LengthRequired */-905327483;
        case 12 : 
            return /* PreconditionFailed */493432085;
        case 13 : 
            return /* PayloadTooLarge */-622680555;
        case 14 : 
            return /* UriTooLong */-526477244;
        case 15 : 
            return /* UnsupportedMediaType */571975273;
        case 16 : 
            return /* RangeNotSatisfiable */-68461033;
        case 17 : 
            return /* ExpectationFailed */765829369;
        case 18 : 
            return /* ImATeapot */237675874;
        case 21 : 
            return /* MisdirectedRequest */-555940656;
        case 22 : 
            return /* UnprocessableEntity */-973855501;
        case 23 : 
            return /* Locked */240875818;
        case 24 : 
            return /* FailedDependency */95496968;
        case 26 : 
            return /* UpgradeRequired */834799099;
        case 28 : 
            return /* PreconditionRequired */-457736521;
        case 29 : 
            return /* TooManyRequests */43187863;
        case 31 : 
            return /* RequestHeaderFieldsTooLarge */484044636;
        case 51 : 
            return /* UnavailableForLegalReasons */-879960241;
        case 100 : 
            return /* InternalServerError */-493013592;
        case 101 : 
            return /* NotImplemented */-781201777;
        case 102 : 
            return /* BadGateway */923446495;
        case 103 : 
            return /* ServiceUnavailable */611365435;
        case 104 : 
            return /* GatewayTimeout */230055709;
        case 105 : 
            return /* HttpVersionNotSupported */-856874229;
        case 106 : 
            return /* VariantAlsoNegotiates */876444641;
        case 107 : 
            return /* InsufficientStorage */61697368;
        case 108 : 
            return /* LoopDetected */-214822874;
        case 19 : 
        case 20 : 
        case 25 : 
        case 27 : 
        case 30 : 
        case 32 : 
        case 33 : 
        case 34 : 
        case 35 : 
        case 36 : 
        case 37 : 
        case 38 : 
        case 39 : 
        case 40 : 
        case 41 : 
        case 42 : 
        case 43 : 
        case 44 : 
        case 45 : 
        case 46 : 
        case 47 : 
        case 48 : 
        case 49 : 
        case 50 : 
        case 52 : 
        case 53 : 
        case 54 : 
        case 55 : 
        case 56 : 
        case 57 : 
        case 58 : 
        case 59 : 
        case 60 : 
        case 61 : 
        case 62 : 
        case 63 : 
        case 64 : 
        case 65 : 
        case 66 : 
        case 67 : 
        case 68 : 
        case 69 : 
        case 70 : 
        case 71 : 
        case 72 : 
        case 73 : 
        case 74 : 
        case 75 : 
        case 76 : 
        case 77 : 
        case 78 : 
        case 79 : 
        case 80 : 
        case 81 : 
        case 82 : 
        case 83 : 
        case 84 : 
        case 85 : 
        case 86 : 
        case 87 : 
        case 88 : 
        case 89 : 
        case 90 : 
        case 91 : 
        case 92 : 
        case 93 : 
        case 94 : 
        case 95 : 
        case 96 : 
        case 97 : 
        case 98 : 
        case 99 : 
        case 109 : 
            return failwith("TODO: exception or option?");
        case 110 : 
            return /* NotExtended */-201667380;
        case 111 : 
            return /* NetworkAuthenticationRequired */-731098587;
        
      }
    }
  } else if (param >= 200) {
    switch (param - 200 | 0) {
      case 0 : 
          return /* OK */17692;
      case 1 : 
          return /* Created */-558113336;
      case 2 : 
          return /* Accepted */566851975;
      case 3 : 
          return /* NonAuthoritativeInformation */-449270550;
      case 4 : 
          return /* NoContent */-113889576;
      case 5 : 
          return /* ResetContent */-748150966;
      case 6 : 
          return /* PartialContent */-1003105320;
      case 7 : 
          return /* MultiStatus */-696181141;
      case 8 : 
          return /* AlreadyReported */-771826261;
      case 9 : 
      case 10 : 
      case 11 : 
      case 12 : 
      case 13 : 
      case 14 : 
      case 15 : 
      case 16 : 
      case 17 : 
      case 18 : 
      case 19 : 
      case 20 : 
      case 21 : 
      case 22 : 
      case 23 : 
      case 24 : 
      case 25 : 
          return failwith("TODO: exception or option?");
      case 26 : 
          return /* IMUsed */1047445569;
      
    }
  } else {
    return failwith("TODO: exception or option?");
  }
}
/* No side effect */

function _getStatus(response) {
  return /* record */[
          /* code */codeFromInt(response.status),
          /* reason */response.statusText
        ];
}

function _make(res) {
  var status = _getStatus(res);
  var match = status[/* code */0];
  if (match >= -558113335) {
    if (match >= 17692) {
      if (match !== 566851975) {
        if (match !== 1047445569) {
          if (match >= 17693) {
            return /* Error */__(1, [
                      status,
                      res
                    ]);
          } else {
            return /* Ok */__(0, [
                      status,
                      res
                    ]);
          }
        } else {
          return /* Ok */__(0, [
                    status,
                    res
                  ]);
        }
      } else {
        return /* Ok */__(0, [
                  status,
                  res
                ]);
      }
    } else if (match !== -449270550) {
      if (match !== -113889576) {
        return /* Error */__(1, [
                  status,
                  res
                ]);
      } else {
        return /* Ok */__(0, [
                  status,
                  res
                ]);
      }
    } else {
      return /* Ok */__(0, [
                status,
                res
              ]);
    }
  } else if (match >= -748150966) {
    if (match !== -696181141) {
      if (match >= -748150965) {
        if (match >= -558113336) {
          return /* Ok */__(0, [
                    status,
                    res
                  ]);
        } else {
          return /* Error */__(1, [
                    status,
                    res
                  ]);
        }
      } else {
        return /* Ok */__(0, [
                  status,
                  res
                ]);
      }
    } else {
      return /* Ok */__(0, [
                status,
                res
              ]);
    }
  } else if (match !== -1003105320) {
    if (match !== -771826261) {
      return /* Error */__(1, [
                status,
                res
              ]);
    } else {
      return /* Ok */__(0, [
                status,
                res
              ]);
    }
  } else {
    return /* Ok */__(0, [
              status,
              res
            ]);
  }
}

var text = _2(Fn[/* >> */6], (function (prim) {
        return prim.text();
      }), Future[/* fromJSPromise */10]);

var json$1 = _2(Fn[/* >> */6], (function (prim) {
        return prim.json();
      }), Future[/* fromJSPromise */10]);
/* text Not a pure module */

function fetch$1(request) {
  return Future[/* fromJSPromise */10](fetch(_toFetchRequest(request)).then((function (res) {
                    return Promise.resolve(_make(res));
                  })));
}

function get$2(url) {
  return fetch$1(make$2(/* GET */3546230, /* None */0, /* None */0, /* None */0, url));
}
/* Refetch__Request Not a pure module */

function blit(a1, ofs1, a2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (a1.length - len | 0) || ofs2 < 0 || ofs2 > (a2.length - len | 0)) {
    throw [
          invalid_argument,
          "Array.blit"
        ];
  } else {
    return caml_array_blit(a1, ofs1, a2, ofs2, len);
  }
}

var Bottom = create("Array.Bottom");
/* No side effect */

function _isInteger(value) {
  if (isFinite(value)) {
    return Math.floor(value) === value;
  } else {
    return false;
  }
}

var DecodeError = create("Json_decode.DecodeError");

function $$float(json) {
  if (typeof json === "number") {
    return json;
  } else {
    throw [
          DecodeError,
          "Expected number, got " + JSON.stringify(json)
        ];
  }
}

function $$int(json) {
  var f = $$float(json);
  if (_isInteger(f)) {
    return f;
  } else {
    throw [
          DecodeError,
          "Expected integer, got " + JSON.stringify(json)
        ];
  }
}

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

function _jsonDict(json) {
  if (typeof json === "object" && !Array.isArray(json) && json !== null) {
    return json;
  } else {
    throw [
          DecodeError,
          "Expected object, got " + JSON.stringify(json)
        ];
  }
}

function dict(decode, json) {
  var source = _jsonDict(json);
  var keys = Object.keys(source);
  var l = keys.length;
  var target = { };
  for(var i = 0 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
    var key = keys[i];
    var value;
    try {
      value = _1(decode, source[key]);
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
}

var FieldNotFound = create("Json_decode.FieldNotFound");

function obj(builder, json) {
  _jsonDict(json);
  var tag = function (msg, key) {
    return msg + ("\n\tat field '" + (key + "'"));
  };
  var get$$1 = function (key, decode, json) {
    var match = _jsonDict(json)[key];
    if (match !== undefined) {
      try {
        return _1(decode, match);
      }
      catch (raw_exn){
        var exn = internalToOCamlException(raw_exn);
        if (exn[0] === FieldNotFound) {
          throw [
                FieldNotFound,
                tag(exn[1], key)
              ];
        } else if (exn[0] === DecodeError) {
          throw [
                DecodeError,
                tag(exn[1], key)
              ];
        } else {
          throw exn;
        }
      }
    } else {
      throw [
            FieldNotFound,
            "Expected required field '" + (key + "'")
          ];
    }
  };
  var field_000 = function (key, decode) {
    var exit = 0;
    var x;
    try {
      x = get$$1(key, decode, json);
      exit = 1;
    }
    catch (raw_exn){
      var exn = internalToOCamlException(raw_exn);
      if (exn[0] === FieldNotFound) {
        return /* None */0;
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      return /* Some */[x];
    }
    
  };
  var field_001 = function (key, decode) {
    try {
      return get$$1(key, decode, json);
    }
    catch (raw_exn){
      var exn = internalToOCamlException(raw_exn);
      if (exn[0] === FieldNotFound) {
        throw [
              DecodeError,
              exn[1]
            ];
      } else {
        throw exn;
      }
    }
  };
  var field = /* record */[
    field_000,
    field_001
  ];
  var getPath = function (key_path, decode) {
    if (key_path) {
      var rest = key_path[1];
      var key = key_path[0];
      if (rest) {
        var partial_arg = getPath(rest, decode);
        return (function (param) {
            return get$$1(key, partial_arg, param);
          });
      } else {
        return (function (param) {
            return get$$1(key, decode, param);
          });
      }
    } else {
      throw [
            invalid_argument,
            "Expected key_path to contain at least one element"
          ];
    }
  };
  var at_000 = function (path, decode) {
    var exit = 0;
    var x;
    try {
      x = getPath(path, decode)(json);
      exit = 1;
    }
    catch (raw_exn){
      var exn = internalToOCamlException(raw_exn);
      if (exn[0] === FieldNotFound) {
        return /* None */0;
      } else {
        throw exn;
      }
    }
    if (exit === 1) {
      return /* Some */[x];
    }
    
  };
  var at_001 = function (path, decode) {
    try {
      return getPath(path, decode)(json);
    }
    catch (raw_exn){
      var exn = internalToOCamlException(raw_exn);
      if (exn[0] === FieldNotFound) {
        throw [
              DecodeError,
              exn[1]
            ];
      } else {
        throw exn;
      }
    }
  };
  var at = /* record */[
    at_000,
    at_001
  ];
  return _1(builder, /* record */[
              /* field */field,
              /* at */at
            ]);
}

function field(key, decode, json) {
  var dict = _jsonDict(json);
  var match = dict[key];
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
}

function map$8(f, decode, json) {
  return _1(f, _1(decode, json));
}
/* No side effect */

function fromJson(param) {
  return obj((function (param) {
                var at$$1 = param[/* at */1];
                return /* record */[
                        /* analyzed */_2(param[/* field */0][/* required */1], "analyzedAt", (function (param) {
                                return map$8((function (prim) {
                                              return new Date(prim);
                                            }), string, param);
                              })),
                        /* name */_2(at$$1[/* required */1], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "name",
                                  /* [] */0
                                ]
                              ]
                            ], string),
                        /* version */_2(at$$1[/* required */1], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "version",
                                  /* [] */0
                                ]
                              ]
                            ], string),
                        /* description */_2(at$$1[/* required */1], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "description",
                                  /* [] */0
                                ]
                              ]
                            ], string),
                        /* updated */_2(at$$1[/* required */1], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "date",
                                  /* [] */0
                                ]
                              ]
                            ], (function (param) {
                                return map$8((function (prim) {
                                              return new Date(prim);
                                            }), string, param);
                              })),
                        /* deprecated */_2(at$$1[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "deprecated",
                                  /* [] */0
                                ]
                              ]
                            ], string),
                        /* author */_2(at$$1[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "author",
                                  /* :: */[
                                    "name",
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ], string),
                        /* license */_2(at$$1[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "license",
                                  /* [] */0
                                ]
                              ]
                            ], string),
                        /* readme */_2(at$$1[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "readme",
                                  /* [] */0
                                ]
                              ]
                            ], string),
                        /* keywords */_2(at$$1[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "keywords",
                                  /* [] */0
                                ]
                              ]
                            ], (function (param) {
                                return array(string, param);
                              })),
                        /* stars */_2(at$$1[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "github",
                                /* :: */[
                                  "starsCount",
                                  /* [] */0
                                ]
                              ]
                            ], $$int),
                        /* score */_2(at$$1[/* required */1], /* :: */[
                              "score",
                              /* :: */[
                                "final",
                                /* [] */0
                              ]
                            ], $$float),
                        /* quality */_2(at$$1[/* required */1], /* :: */[
                              "score",
                              /* :: */[
                                "detail",
                                /* :: */[
                                  "quality",
                                  /* [] */0
                                ]
                              ]
                            ], $$float),
                        /* popularity */_2(at$$1[/* required */1], /* :: */[
                              "score",
                              /* :: */[
                                "detail",
                                /* :: */[
                                  "popularity",
                                  /* [] */0
                                ]
                              ]
                            ], $$float),
                        /* maintenance */_2(at$$1[/* required */1], /* :: */[
                              "score",
                              /* :: */[
                                "detail",
                                /* :: */[
                                  "maintenance",
                                  /* [] */0
                                ]
                              ]
                            ], $$float),
                        /* homepageUrl */_2(at$$1[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "links",
                                  /* :: */[
                                    "homepage",
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ], string),
                        /* repositoryUrl */_2(at$$1[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "links",
                                  /* :: */[
                                    "repository",
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ], string),
                        /* npmUrl */_2(at$$1[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "links",
                                  /* :: */[
                                    "npm",
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ], string),
                        /* issuesUrl */_2(at$$1[/* optional */0], /* :: */[
                              "collected",
                              /* :: */[
                                "metadata",
                                /* :: */[
                                  "links",
                                  /* :: */[
                                    "bugs",
                                    /* [] */0
                                  ]
                                ]
                              ]
                            ], string)
                      ];
              }), param);
}

function get$3(packageName) {
  var escapedName = encodeURIComponent(packageName);
  var url = "https://api.npms.io/v2/package/" + (String(escapedName) + "");
  return Future[/* map */8](fromJson, Future[/* flatMap */9]((function (param) {
                    if (param.tag) {
                      var status = param[0];
                      return Future[/* map */8]((function (r) {
                                    return failwith("failed to get data from npms.io: " + (status[/* reason */1] + (", " + r)));
                                  }), _1(text, param[1]));
                    } else {
                      return _1(json$1, param[1]);
                    }
                  }), get$2(url)));
}
/* Refetch Not a pure module */

var max_int$2 = 2147483647;
/* No side effect */

var max_int$3 = /* int64 */[
  /* hi */2147483647,
  /* lo */4294967295
];
/* No side effect */

/* No side effect */

/* No side effect */

/* No side effect */

function cmn(q, a, b, x, s, t) {
  var a$1 = ((a + q | 0) + x | 0) + t | 0;
  return ((a$1 << s) | (a$1 >>> (32 - s | 0)) | 0) + b | 0;
}

function f(a, b, c, d, x, s, t) {
  return cmn(b & c | (b ^ -1) & d, a, b, x, s, t);
}

function g(a, b, c, d, x, s, t) {
  return cmn(b & d | c & (d ^ -1), a, b, x, s, t);
}

function h(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function i(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | d ^ -1), a, b, x, s, t);
}

function cycle(x, k) {
  var a = x[0];
  var b = x[1];
  var c = x[2];
  var d = x[3];
  a = f(a, b, c, d, k[0], 7, -680876936);
  d = f(d, a, b, c, k[1], 12, -389564586);
  c = f(c, d, a, b, k[2], 17, 606105819);
  b = f(b, c, d, a, k[3], 22, -1044525330);
  a = f(a, b, c, d, k[4], 7, -176418897);
  d = f(d, a, b, c, k[5], 12, 1200080426);
  c = f(c, d, a, b, k[6], 17, -1473231341);
  b = f(b, c, d, a, k[7], 22, -45705983);
  a = f(a, b, c, d, k[8], 7, 1770035416);
  d = f(d, a, b, c, k[9], 12, -1958414417);
  c = f(c, d, a, b, k[10], 17, -42063);
  b = f(b, c, d, a, k[11], 22, -1990404162);
  a = f(a, b, c, d, k[12], 7, 1804603682);
  d = f(d, a, b, c, k[13], 12, -40341101);
  c = f(c, d, a, b, k[14], 17, -1502002290);
  b = f(b, c, d, a, k[15], 22, 1236535329);
  a = g(a, b, c, d, k[1], 5, -165796510);
  d = g(d, a, b, c, k[6], 9, -1069501632);
  c = g(c, d, a, b, k[11], 14, 643717713);
  b = g(b, c, d, a, k[0], 20, -373897302);
  a = g(a, b, c, d, k[5], 5, -701558691);
  d = g(d, a, b, c, k[10], 9, 38016083);
  c = g(c, d, a, b, k[15], 14, -660478335);
  b = g(b, c, d, a, k[4], 20, -405537848);
  a = g(a, b, c, d, k[9], 5, 568446438);
  d = g(d, a, b, c, k[14], 9, -1019803690);
  c = g(c, d, a, b, k[3], 14, -187363961);
  b = g(b, c, d, a, k[8], 20, 1163531501);
  a = g(a, b, c, d, k[13], 5, -1444681467);
  d = g(d, a, b, c, k[2], 9, -51403784);
  c = g(c, d, a, b, k[7], 14, 1735328473);
  b = g(b, c, d, a, k[12], 20, -1926607734);
  a = h(a, b, c, d, k[5], 4, -378558);
  d = h(d, a, b, c, k[8], 11, -2022574463);
  c = h(c, d, a, b, k[11], 16, 1839030562);
  b = h(b, c, d, a, k[14], 23, -35309556);
  a = h(a, b, c, d, k[1], 4, -1530992060);
  d = h(d, a, b, c, k[4], 11, 1272893353);
  c = h(c, d, a, b, k[7], 16, -155497632);
  b = h(b, c, d, a, k[10], 23, -1094730640);
  a = h(a, b, c, d, k[13], 4, 681279174);
  d = h(d, a, b, c, k[0], 11, -358537222);
  c = h(c, d, a, b, k[3], 16, -722521979);
  b = h(b, c, d, a, k[6], 23, 76029189);
  a = h(a, b, c, d, k[9], 4, -640364487);
  d = h(d, a, b, c, k[12], 11, -421815835);
  c = h(c, d, a, b, k[15], 16, 530742520);
  b = h(b, c, d, a, k[2], 23, -995338651);
  a = i(a, b, c, d, k[0], 6, -198630844);
  d = i(d, a, b, c, k[7], 10, 1126891415);
  c = i(c, d, a, b, k[14], 15, -1416354905);
  b = i(b, c, d, a, k[5], 21, -57434055);
  a = i(a, b, c, d, k[12], 6, 1700485571);
  d = i(d, a, b, c, k[3], 10, -1894986606);
  c = i(c, d, a, b, k[10], 15, -1051523);
  b = i(b, c, d, a, k[1], 21, -2054922799);
  a = i(a, b, c, d, k[8], 6, 1873313359);
  d = i(d, a, b, c, k[15], 10, -30611744);
  c = i(c, d, a, b, k[6], 15, -1560198380);
  b = i(b, c, d, a, k[13], 21, 1309151649);
  a = i(a, b, c, d, k[4], 6, -145523070);
  d = i(d, a, b, c, k[11], 10, -1120210379);
  c = i(c, d, a, b, k[2], 15, 718787259);
  b = i(b, c, d, a, k[9], 21, -343485551);
  x[0] = a + x[0] | 0;
  x[1] = b + x[1] | 0;
  x[2] = c + x[2] | 0;
  x[3] = d + x[3] | 0;
  return /* () */0;
}

var state = /* array */[
  1732584193,
  -271733879,
  -1732584194,
  271733878
];

var md5blk = /* array */[
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0
];

function caml_md5_string(s, start, len) {
  var s$1 = s.slice(start, len);
  var n = s$1.length;
  state[0] = 1732584193;
  state[1] = -271733879;
  state[2] = -1732584194;
  state[3] = 271733878;
  for(var i = 0; i <= 15; ++i){
    md5blk[i] = 0;
  }
  var i_end = n / 64 | 0;
  for(var i$1 = 1; i$1 <= i_end; ++i$1){
    for(var j = 0; j <= 15; ++j){
      var k = ((i$1 << 6) - 64 | 0) + (j << 2) | 0;
      md5blk[j] = ((s$1.charCodeAt(k) + (s$1.charCodeAt(k + 1 | 0) << 8) | 0) + (s$1.charCodeAt(k + 2 | 0) << 16) | 0) + (s$1.charCodeAt(k + 3 | 0) << 24) | 0;
    }
    cycle(state, md5blk);
  }
  var s_tail = s$1.slice((i_end << 6));
  for(var kk = 0; kk <= 15; ++kk){
    md5blk[kk] = 0;
  }
  var i_end$1 = s_tail.length - 1 | 0;
  for(var i$2 = 0; i$2 <= i_end$1; ++i$2){
    md5blk[i$2 / 4 | 0] = md5blk[i$2 / 4 | 0] | (s_tail.charCodeAt(i$2) << (i$2 % 4 << 3));
  }
  var i$3 = i_end$1 + 1 | 0;
  md5blk[i$3 / 4 | 0] = md5blk[i$3 / 4 | 0] | (128 << (i$3 % 4 << 3));
  if (i$3 > 55) {
    cycle(state, md5blk);
    for(var i$4 = 0; i$4 <= 15; ++i$4){
      md5blk[i$4] = 0;
    }
  }
  md5blk[14] = (n << 3);
  cycle(state, md5blk);
  return String.fromCharCode(state[0] & 255, (state[0] >> 8) & 255, (state[0] >> 16) & 255, (state[0] >> 24) & 255, state[1] & 255, (state[1] >> 8) & 255, (state[1] >> 16) & 255, (state[1] >> 24) & 255, state[2] & 255, (state[2] >> 8) & 255, (state[2] >> 16) & 255, (state[2] >> 24) & 255, state[3] & 255, (state[3] >> 8) & 255, (state[3] >> 16) & 255, (state[3] >> 24) & 255);
}
/* No side effect */

function string$1(str) {
  return caml_md5_string(str, 0, str.length);
}
/* No side effect */

var size = 54;
/* No side effect */

function assign(st1, st2) {
  blit(st2[/* st */0], 0, st1[/* st */0], 0, 55);
  st1[/* idx */1] = st2[/* idx */1];
  return /* () */0;
}

function full_init(s, seed) {
  var combine = function (accu, x) {
    return string$1(accu + String(x));
  };
  var extract = function (d) {
    return ((get(d, 0) + (get(d, 1) << 8) | 0) + (get(d, 2) << 16) | 0) + (get(d, 3) << 24) | 0;
  };
  var seed$1 = seed.length === 0 ? /* array */[0] : seed;
  var l = seed$1.length;
  for(var i = 0; i <= 54; ++i){
    caml_array_set(s[/* st */0], i, i);
  }
  var accu = "x";
  for(var i$1 = 0 ,i_finish = 54 + (
      55 > l ? 55 : l
    ) | 0; i$1 <= i_finish; ++i$1){
    var j = i$1 % 55;
    var k = i$1 % l;
    accu = combine(accu, caml_array_get(seed$1, k));
    caml_array_set(s[/* st */0], j, (caml_array_get(s[/* st */0], j) ^ extract(accu)) & 1073741823);
  }
  s[/* idx */1] = 0;
  return /* () */0;
}

function make$5(seed) {
  var result = /* record */[
    /* st */caml_make_vect(55, 0),
    /* idx */0
  ];
  full_init(result, seed);
  return result;
}

function make_self_init() {
  return make$5(caml_sys_random_seed(/* () */0));
}

function copy$3(s) {
  var result = /* record */[
    /* st */caml_make_vect(55, 0),
    /* idx */0
  ];
  assign(result, s);
  return result;
}

function bits(s) {
  s[/* idx */1] = (s[/* idx */1] + 1 | 0) % 55;
  var curval = caml_array_get(s[/* st */0], s[/* idx */1]);
  var newval = caml_array_get(s[/* st */0], (s[/* idx */1] + 24 | 0) % 55) + (curval ^ (curval >>> 25) & 31) | 0;
  var newval30 = newval & 1073741823;
  caml_array_set(s[/* st */0], s[/* idx */1], newval30);
  return newval30;
}

function $$int$1(s, bound) {
  if (bound > 1073741823 || bound <= 0) {
    throw [
          invalid_argument,
          "Random.int"
        ];
  } else {
    var s$1 = s;
    var n = bound;
    while(true) {
      var r = bits(s$1);
      var v = r % n;
      if ((r - v | 0) > ((1073741823 - n | 0) + 1 | 0)) {
        continue ;
      } else {
        return v;
      }
    }  }
}

function int32(s, bound) {
  if (bound <= 0) {
    throw [
          invalid_argument,
          "Random.int32"
        ];
  } else {
    var s$1 = s;
    var n = bound;
    while(true) {
      var b1 = bits(s$1);
      var b2 = ((bits(s$1) & 1) << 30);
      var r = b1 | b2;
      var v = r % n;
      if ((r - v | 0) > ((max_int$2 - n | 0) + 1 | 0)) {
        continue ;
      } else {
        return v;
      }
    }  }
}

function int64(s, bound) {
  if (le(bound, /* int64 */[
          /* hi */0,
          /* lo */0
        ])) {
    throw [
          invalid_argument,
          "Random.int64"
        ];
  } else {
    var s$1 = s;
    var n = bound;
    while(true) {
      var b1 = of_int32(bits(s$1));
      var b2 = lsl_(of_int32(bits(s$1)), 30);
      var b3 = lsl_(of_int32(bits(s$1) & 7), 60);
      var r = or_(b1, /* int64 */[
            /* hi */b2[0] | b3[0],
            /* lo */((b2[1] | b3[1]) >>> 0)
          ]);
      var v = mod_$1(r, n);
      if (gt(sub(r, v), add(sub(max_int$3, n), /* int64 */[
                  /* hi */0,
                  /* lo */1
                ]))) {
        continue ;
      } else {
        return v;
      }
    }  }
}

var nativeint = size === 32 ? int32 : (function (s, bound) {
      return int64(s, of_int32(bound))[1] | 0;
    });

function rawfloat(s) {
  var r1 = bits(s);
  var r2 = bits(s);
  return (r1 / 1073741824.0 + r2) / 1073741824.0;
}

function $$float$1(s, bound) {
  return rawfloat(s) * bound;
}

function bool$1(s) {
  return (bits(s) & 1) === 0;
}

var State = [
  make$5,
  make_self_init,
  copy$3,
  bits,
  $$int$1,
  int32,
  nativeint,
  int64,
  $$float$1,
  bool$1
];
/* No side effect */

function push(x, q) {
  if (q[/* length */0] === 0) {
    var cell = [];
    cell[0] = x;
    cell[1] = cell;
    q[/* length */0] = 1;
    q[/* tail */1] = cell;
    return /* () */0;
  } else {
    var tail = q[/* tail */1];
    var head = tail[/* next */1];
    var cell$1 = /* record */[
      /* content */x,
      /* next */head
    ];
    q[/* length */0] = q[/* length */0] + 1 | 0;
    tail[/* next */1] = cell$1;
    q[/* tail */1] = cell$1;
    return /* () */0;
  }
}

function unsafe_pop(q) {
  q[/* length */0] = q[/* length */0] - 1 | 0;
  var tail = q[/* tail */1];
  var head = tail[/* next */1];
  if (head === tail) {
    q[/* tail */1] = /* None */0;
  } else {
    tail[/* next */1] = head[/* next */1];
  }
  return head[/* content */0];
}
/* No side effect */

function rotl32(x, n) {
  return (x << n) | (x >>> (32 - n | 0));
}

function caml_hash_mix_int(h, d) {
  var d$1 = d;
  d$1 = imul(d$1, 3432918353);
  d$1 = rotl32(d$1, 15);
  d$1 = imul(d$1, 461845907);
  var h$1 = h ^ d$1;
  h$1 = rotl32(h$1, 13);
  return (h$1 + (h$1 << 2) | 0) + 3864292196 | 0;
}

function caml_hash_final_mix(h) {
  var h$1 = h ^ (h >>> 16);
  h$1 = imul(h$1, 2246822507);
  h$1 = h$1 ^ (h$1 >>> 13);
  h$1 = imul(h$1, 3266489909);
  return h$1 ^ (h$1 >>> 16);
}

function caml_hash_mix_string(h, s) {
  var len = s.length;
  var block = (len / 4 | 0) - 1 | 0;
  var hash = h;
  for(var i = 0; i <= block; ++i){
    var j = (i << 2);
    var w = s.charCodeAt(j) | (s.charCodeAt(j + 1 | 0) << 8) | (s.charCodeAt(j + 2 | 0) << 16) | (s.charCodeAt(j + 3 | 0) << 24);
    hash = caml_hash_mix_int(hash, w);
  }
  var modulo = len & 3;
  if (modulo !== 0) {
    var w$1 = modulo === 3 ? (s.charCodeAt(len - 1 | 0) << 16) | (s.charCodeAt(len - 2 | 0) << 8) | s.charCodeAt(len - 3 | 0) : (
        modulo === 2 ? (s.charCodeAt(len - 1 | 0) << 8) | s.charCodeAt(len - 2 | 0) : s.charCodeAt(len - 1 | 0)
      );
    hash = caml_hash_mix_int(hash, w$1);
  }
  hash = hash ^ len;
  return hash;
}
/* No side effect */

function caml_hash(count, _, seed, obj) {
  var hash = seed;
  if (typeof obj === "number") {
    var u = obj | 0;
    hash = caml_hash_mix_int(hash, (u + u | 0) + 1 | 0);
    return caml_hash_final_mix(hash);
  } else if (typeof obj === "string") {
    hash = caml_hash_mix_string(hash, obj);
    return caml_hash_final_mix(hash);
  } else {
    var queue = /* record */[
      /* length */0,
      /* tail : None */0
    ];
    var num = count;
    push(obj, queue);
    num = num - 1 | 0;
    while(queue[/* length */0] !== 0 && num > 0) {
      var obj$1 = unsafe_pop(queue);
      if (typeof obj$1 === "number") {
        var u$1 = obj$1 | 0;
        hash = caml_hash_mix_int(hash, (u$1 + u$1 | 0) + 1 | 0);
        num = num - 1 | 0;
      } else if (typeof obj$1 === "string") {
        hash = caml_hash_mix_string(hash, obj$1);
        num = num - 1 | 0;
      } else if (typeof obj$1 !== "boolean") {
        if (typeof obj$1 !== "undefined") {
          if (typeof obj$1 === "symbol") {
            throw [
                  assert_failure,
                  [
                    "caml_hash.ml",
                    72,
                    8
                  ]
                ];
          } else if (typeof obj$1 !== "function") {
            var size = obj$1.length;
            if (size !== undefined) {
              var obj_tag = obj$1.tag | 0;
              var tag = (size << 10) | obj_tag;
              if (tag === 248) {
                hash = caml_hash_mix_int(hash, obj$1[1]);
              } else {
                hash = caml_hash_mix_int(hash, tag);
                var v = size - 1 | 0;
                var block = v < num ? v : num;
                for(var i = 0; i <= block; ++i){
                  push(obj$1[i], queue);
                }
              }
            }
            
          }
          
        }
        
      }
      
    }    return caml_hash_final_mix(hash);
  }
}
/* No side effect */

/* No side effect */

var forward_tag = 250;
/* No side effect */

var Undefined = create("CamlinternalLazy.Undefined");

function raise_undefined() {
  throw Undefined;
}

function force_lazy_block(blk) {
  var closure = blk[0];
  blk[0] = raise_undefined;
  try {
    var result = _1(closure, /* () */0);
    blk[0] = result;
    blk.tag = forward_tag;
    return result;
  }
  catch (e){
    blk[0] = (function () {
        throw e;
      });
    throw e;
  }
}
/* No side effect */

var randomized = [false];

var prng = __(246, [(function () {
        return State[/* make_self_init */1](/* () */0);
      })]);

function power_2_above(_x, n) {
  while(true) {
    var x = _x;
    if (x >= n || (x << 1) < x) {
      return x;
    } else {
      _x = (x << 1);
      continue ;
    }
  }}

function create$2($staropt$star, initial_size) {
  var random = $staropt$star ? $staropt$star[0] : randomized[0];
  var s = power_2_above(16, initial_size);
  var seed;
  if (random) {
    var tag = prng.tag | 0;
    seed = State[/* bits */3](tag === 250 ? prng[0] : (
            tag === 246 ? force_lazy_block(prng) : prng
          ));
  } else {
    seed = 0;
  }
  return /* record */[
          /* size */0,
          /* data */caml_make_vect(s, /* Empty */0),
          /* seed */seed,
          /* initial_size */s
        ];
}

function resize(indexfun, h) {
  var odata = h[/* data */1];
  var osize = odata.length;
  var nsize = (osize << 1);
  if (nsize >= osize) {
    var ndata = caml_make_vect(nsize, /* Empty */0);
    h[/* data */1] = ndata;
    var insert_bucket = function (param) {
      if (param) {
        var key = param[0];
        insert_bucket(param[2]);
        var nidx = _2(indexfun, h, key);
        return caml_array_set(ndata, nidx, /* Cons */[
                    key,
                    param[1],
                    caml_array_get(ndata, nidx)
                  ]);
      } else {
        return /* () */0;
      }
    };
    for(var i = 0 ,i_finish = osize - 1 | 0; i <= i_finish; ++i){
      insert_bucket(caml_array_get(odata, i));
    }
    return /* () */0;
  } else {
    return 0;
  }
}

function key_index(h, key) {
  if (h.length >= 3) {
    return caml_hash(10, 100, h[/* seed */2], key) & (h[/* data */1].length - 1 | 0);
  } else {
    return not_implemented("caml_hash_univ_param") % h[/* data */1].length;
  }
}

function replace(h, key, info) {
  var replace_bucket = function (param) {
    if (param) {
      var next = param[2];
      var k = param[0];
      if (caml_equal(k, key)) {
        return /* Cons */[
                key,
                info,
                next
              ];
      } else {
        return /* Cons */[
                k,
                param[1],
                replace_bucket(next)
              ];
      }
    } else {
      throw not_found;
    }
  };
  var i = key_index(h, key);
  var l = caml_array_get(h[/* data */1], i);
  try {
    return caml_array_set(h[/* data */1], i, replace_bucket(l));
  }
  catch (exn){
    if (exn === not_found) {
      caml_array_set(h[/* data */1], i, /* Cons */[
            key,
            info,
            l
          ]);
      h[/* size */0] = h[/* size */0] + 1 | 0;
      if (h[/* size */0] > (h[/* data */1].length << 1)) {
        return resize(key_index, h);
      } else {
        return 0;
      }
    } else {
      throw exn;
    }
  }
}

function iter$5(f, h) {
  var do_bucket = function (_param) {
    while(true) {
      var param = _param;
      if (param) {
        _2(f, param[0], param[1]);
        _param = param[2];
        continue ;
      } else {
        return /* () */0;
      }
    }  };
  var d = h[/* data */1];
  for(var i = 0 ,i_finish = d.length - 1 | 0; i <= i_finish; ++i){
    do_bucket(caml_array_get(d, i));
  }
  return /* () */0;
}
/* No side effect */

function filterDuplicates(arr) {
  var unique = /* array */[];
  var set = create$2(/* None */0, $$Array[/* length */16](arr));
  $$Array[/* forEach */8]((function (x) {
          return replace(set, x, /* () */0);
        }), arr);
  iter$5((function (x, _) {
          unique.push(x);
          return /* () */0;
        }), set);
  return unique;
}

function $great$great$eq($$this, f) {
  return Future[/* flatMap */9](f, $$this);
}

var $$return = Future[/* from */3];

var Future$1 = /* module */[
  /* >>= */$great$great$eq,
  /* return */$$return
];
/* fs Not a pure module */

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

function parse(str) {
  if (looksLikeUrl(str)) {
    return parseUrl(str);
  } else if ($$String[/* startsWith */3]("github:", str)) {
    return parseGitHubPath(str);
  } else {
    return failwith("Fuck if I know what this is: " + str);
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
  return Future[/* flatMap */9]((function (param) {
                if (param.tag) {
                  return failwith("failed to get README");
                } else {
                  return _1(text, param[1]);
                }
              }), get$2(url));
}

function getStats(source) {
  var url = "https://api.github.com/repos/" + (String(source[0]) + ("/" + (String(source[1]) + "")));
  return Future[/* map */8]((function (param) {
                return field("stargazers_count", $$int, param);
              }), Future[/* flatMap */9]((function (param) {
                    if (param.tag) {
                      return failwith("failed to get stats: " + param[0][/* reason */1]);
                    } else {
                      return _1(json$1, param[1]);
                    }
                  }), get$2(url)));
}
/* Refetch Not a pure module */

function fromOption$1(x) {
  if (x) {
    return x[0];
  } else {
    return undefined;
  }
}
/* No side effect */

function _encodecategory(param) {
  switch (param) {
    case 0 : 
        return "binding";
    case 1 : 
        return "library";
    case 2 : 
        return "tool";
    case 3 : 
        return "boilerplate";
    
  }
}

function _encodePlatform(param) {
  switch (param) {
    case 0 : 
        return "browser";
    case 1 : 
        return "node";
    case 2 : 
        return "native";
    case 3 : 
        return "any";
    
  }
}

function _mapKeywordSynonym(keyword) {
  switch (keyword) {
    case "bs-platform" : 
    case "bsb" : 
        return "bucklescript";
    case "d3" : 
    case "d3js" : 
        return "d3.js";
    case "next" : 
        return "next.js";
    case "reasonml" : 
        return "reason";
    case "reason-react" : 
    case "reasonreact" : 
        return "react";
    case "regex" : 
        return "regular expressions";
    case "tdd" : 
    case "test" : 
        return "testing";
    default:
      return keyword;
  }
}

function _ignoreKeyword(k) {
  switch (k) {
    case "data" : 
    case "reason" : 
        return true;
    default:
      if ($$String[/* startsWith */3]("bs-", k)) {
        return true;
      } else {
        return false;
      }
  }
}

var partial_arg = $$Array[/* map */0];

var partial_arg$1 = $$Array[/* map */0];

var partial_arg$2 = _2(Fn[/* << */5], (function (prim) {
        return !prim;
      }), _ignoreKeyword);

var partial_arg$3 = $$Array[/* filter */10];

var _normalizeKeywords = _2(Fn[/* >> */6], _2(Fn[/* >> */6], _2(Fn[/* >> */6], (function (param) {
                return partial_arg((function (prim) {
                              return prim.toLowerCase();
                            }), param);
              }), (function (param) {
                return partial_arg$1(_mapKeywordSynonym, param);
              })), (function (param) {
            return partial_arg$3(partial_arg$2, param);
          })), filterDuplicates);

function ensureDeprecated(deprecated, flags) {
  if (deprecated && !flags.includes("deprecated")) {
    return flags.concat(/* array */["deprecated"]);
  } else {
    return flags;
  }
}

function fromPublished(source, data) {
  return {
          type: "published",
          id: data[/* name */1],
          name: data[/* name */1],
          version: data[/* version */2],
          category: _encodecategory(source[/* category */1]),
          flags: ensureDeprecated(data[/* deprecated */5], Option[/* getOr */16](/* array */[], source[/* flags */2])),
          platforms: $$Array[/* map */0](_encodePlatform, source[/* platforms */3]),
          description: data[/* description */3],
          deprecated: fromOption$1(data[/* deprecated */5]),
          author: fromOption$1(data[/* author */6]),
          license: fromOption$1(data[/* license */7]),
          keywords: _1(_normalizeKeywords, Option[/* getOr */16](/* array */[], Option[/* or_ */15](data[/* keywords */9], source[/* keywords */4]))),
          originalKeywords: _1(_normalizeKeywords, Option[/* getOr */16](/* array */[], data[/* keywords */9])),
          readme: Option[/* getOr */16]("", data[/* readme */8]),
          analyzed: data[/* analyzed */0],
          updated: data[/* analyzed */0],
          stars: fromOption$1(data[/* stars */10]),
          score: data[/* score */11],
          quality: data[/* quality */12],
          popularity: data[/* popularity */13],
          maintenance: data[/* maintenance */14],
          homepageUrl: fromOption$1(data[/* homepageUrl */15]),
          repositoryUrl: fromOption$1(data[/* repositoryUrl */16]),
          npmUrl: fromOption$1(data[/* npmUrl */17]),
          issuesUrl: fromOption$1(data[/* issuesUrl */18]),
          docsUrl: undefined
        };
}

function fromUnpublished(source, manifest, readme, stars) {
  return {
          type: "unpublished",
          id: makeId(source[/* repository */1]),
          name: makeName(source[/* repository */1]),
          version: manifest[/* version */1],
          category: _encodecategory(source[/* category */2]),
          flags: Option[/* getOr */16](/* array */[], source[/* flags */3]),
          platforms: $$Array[/* map */0](_encodePlatform, source[/* platforms */4]),
          description: Option[/* getOr */16]("", manifest[/* description */2]),
          deprecated: undefined,
          author: fromOption$1(manifest[/* author */3]),
          license: fromOption$1(manifest[/* license */4]),
          keywords: _1(_normalizeKeywords, Option[/* getOr */16](/* array */[], Option[/* or_ */15](manifest[/* keywords */5], source[/* keywords */5]))),
          originalKeywords: _1(_normalizeKeywords, Option[/* getOr */16](/* array */[], manifest[/* keywords */5])),
          readme: readme,
          analyzed: new Date(),
          updated: new Date(),
          stars: stars,
          score: 0,
          quality: 0,
          popularity: 0,
          maintenance: 0,
          homepageUrl: fromOption$1(manifest[/* homepage */7]),
          repositoryUrl: getUrl(source[/* repository */1]),
          npmUrl: undefined,
          issuesUrl: fromOption$1(manifest[/* bugsUrl */9]),
          docsUrl: undefined
        };
}
/* _normalizeKeywords Not a pure module */

function fromJson$1(param) {
  return obj((function (param) {
                var at$$1 = param[/* at */1];
                var field$$1 = param[/* field */0];
                return /* record */[
                        /* name */_2(field$$1[/* required */1], "name", string),
                        /* version */_2(field$$1[/* required */1], "version", string),
                        /* description */_2(field$$1[/* optional */0], "description", string),
                        /* author */_2(field$$1[/* optional */0], "author", string),
                        /* license */Option[/* or_ */15](_2(field$$1[/* optional */0], "type", string), _2(at$$1[/* optional */0], /* :: */[
                                  "license",
                                  /* :: */[
                                    "type",
                                    /* [] */0
                                  ]
                                ], string)),
                        /* keywords */_2(field$$1[/* optional */0], "keywords", (function (param) {
                                return array(string, param);
                              })),
                        /* dependencies */_2(field$$1[/* optional */0], "dependencies", (function (param) {
                                return dict(string, param);
                              })),
                        /* homepage */_2(field$$1[/* optional */0], "homepage", string),
                        /* repositoryUrl */Option[/* or_ */15](_2(field$$1[/* optional */0], "repository", string), _2(at$$1[/* optional */0], /* :: */[
                                  "repository",
                                  /* :: */[
                                    "url",
                                    /* [] */0
                                  ]
                                ], string)),
                        /* bugsUrl */Option[/* or_ */15](_2(field$$1[/* optional */0], "bugs", string), _2(at$$1[/* optional */0], /* :: */[
                                  "bugs",
                                  /* :: */[
                                    "url",
                                    /* [] */0
                                  ]
                                ], string))
                      ];
              }), param);
}

function get$4(repo) {
  var url = "https://raw.githubusercontent.com/" + (String(repo[0]) + ("/" + (String(repo[1]) + "/master/package.json")));
  return Future[/* map */8](fromJson$1, Future[/* flatMap */9]((function (param) {
                    if (param.tag) {
                      return failwith("failed to get package.json");
                    } else {
                      return _1(json$1, param[1]);
                    }
                  }), get$2(url)));
}
/* Refetch Not a pure module */

require('isomorphic-fetch')
;

var name = Option[/* getOrRaise */17]($$Array[/* get */17](Process.argv, 2));

var eventuallyPackage;

if ($$String[/* startsWith */3]("github:", name)) {
  var repo = parse(name);
  var source_004 = /* platforms : array */[/* Any */3];
  var source = /* record */[
    /* id */name,
    /* repository */repo,
    /* category : Binding */0,
    /* flags : None */0,
    source_004,
    /* keywords : None */0,
    /* comment : None */0
  ];
  eventuallyPackage = Future$1[/* >>= */0](get$4(repo), (function (manifest) {
          return Future$1[/* >>= */0](getReadme(repo), (function (readme) {
                        return Future$1[/* >>= */0](getStats(repo), (function (stats) {
                                      return _1(Future$1[/* return */1], fromUnpublished(source, manifest, readme, stats));
                                    }));
                      }));
        }));
} else {
  var source_003 = /* platforms : array */[/* Any */3];
  var source$1 = /* record */[
    /* id */name,
    /* category : Binding */0,
    /* flags : None */0,
    source_003,
    /* keywords : None */0,
    /* comment : None */0
  ];
  eventuallyPackage = Future[/* map */8]((function (param) {
          return fromPublished(source$1, param);
        }), get$3(name));
}

Future[/* whenCompleted */6]((function (param) {
        if (param.tag) {
          console.log("\x1b[33;1m");
          console.log("\n", name, "\n", param[0]);
          console.log("\x1b[0m");
          return /* () */0;
        } else {
          var $$package = param[0];
          var truncatedPackage = $$String[/* length */1]($$package.readme) > 1000 ? Object.assign($$package, {
                  readme: $$String[/* sub */9](0, 1000, $$package.readme) + "..."
                }) : $$package;
          console.log("\n", JSON.stringify(truncatedPackage, null, 2));
          var errors = lintPackage($$package);
          if (List[/* isEmpty */15](errors)) {
            console.log("\x1b[32;1m");
            console.log("No problems! :)");
            console.log("\x1b[0m");
            return /* () */0;
          } else {
            console.log("\x1b[31;1m");
            console.log(String(List[/* length */19](errors)) + " problems:");
            List[/* forEach */8]((function (error) {
                    console.log("  ", error);
                    return /* () */0;
                  }), errors);
            console.log("\x1b[0m");
            return /* () */0;
          }
        }
      }), eventuallyPackage);
/*  Not a pure module */
