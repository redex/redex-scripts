#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Fs = require('fs');
var Path = require('path');
var Algoliasearch = _interopDefault(require('algoliasearch'));

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
    return /* false */0;
  } else if (e.tag === 248) {
    return /* true */1;
  } else {
    var slot = e[0];
    if (slot !== undefined) {
      return +(slot.tag === 248);
    } else {
      return /* false */0;
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
  }
  return result;
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
    var arity$1 = arity ? arity : 1;
    var len = args.length;
    var d = arity$1 - len | 0;
    if (d) {
      if (d < 0) {
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
    } else {
      return f.apply(null, args);
    }
  }
}

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

function map(f, a) {
  var l = a.length;
  if (l) {
    var r = caml_make_vect(l, _1(f, a[0]));
    for(var i = 1 ,i_finish = l - 1 | 0; i <= i_finish; ++i){
      r[i] = _1(f, a[i]);
    }
    return r;
  } else {
    return /* array */[];
  }
}

var Bottom = create("Array.Bottom");


/* No side effect */

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

var InvalidArgument = create("Rebase__Types.InvalidArgument");

var IndexOutOfBounds = create("Rebase__Types.IndexOutOfBounds");

var NotFound = create("Rebase__Types.NotFound");


/* No side effect */

/* No side effect */

/* No side effect */

function __(tag, block) {
  block.tag = tag;
  return block;
}


/* No side effect */

function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}

function caml_compare(_a, _b) {
  while(true) {
    var b = _b;
    var a = _a;
    if (a === b) {
      return 0;
    } else {
      var a_type = typeof a;
      var b_type = typeof b;
      if (a_type === "string") {
        var x = a;
        var y = b;
        if (x < y) {
          return -1;
        } else if (x === y) {
          return 0;
        } else {
          return 1;
        }
      } else {
        var is_a_number = +(a_type === "number");
        var is_b_number = +(b_type === "number");
        if (is_a_number !== 0) {
          if (is_b_number !== 0) {
            return caml_int_compare(a, b);
          } else {
            return -1;
          }
        } else if (is_b_number !== 0) {
          return 1;
        } else if (a_type === "boolean" || a_type === "undefined" || a === null) {
          var x$1 = a;
          var y$1 = b;
          if (x$1 === y$1) {
            return 0;
          } else if (x$1 < y$1) {
            return -1;
          } else {
            return 1;
          }
        } else if (a_type === "function" || b_type === "function") {
          throw [
                invalid_argument,
                "compare: functional value"
              ];
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
            return caml_int_compare(a[1], b[1]);
          } else if (tag_a === 251) {
            throw [
                  invalid_argument,
                  "equal: abstract value"
                ];
          } else if (tag_a !== tag_b) {
            if (tag_a < tag_b) {
              return -1;
            } else {
              return 1;
            }
          } else {
            var len_a = a.length | 0;
            var len_b = b.length | 0;
            if (len_a === len_b) {
              var a$1 = a;
              var b$1 = b;
              var _i = 0;
              var same_length = len_a;
              while(true) {
                var i = _i;
                if (i === same_length) {
                  return 0;
                } else {
                  var res = caml_compare(a$1[i], b$1[i]);
                  if (res !== 0) {
                    return res;
                  } else {
                    _i = i + 1 | 0;
                    continue ;
                    
                  }
                }
              }
            } else if (len_a < len_b) {
              var a$2 = a;
              var b$2 = b;
              var _i$1 = 0;
              var short_length = len_a;
              while(true) {
                var i$1 = _i$1;
                if (i$1 === short_length) {
                  return -1;
                } else {
                  var res$1 = caml_compare(a$2[i$1], b$2[i$1]);
                  if (res$1 !== 0) {
                    return res$1;
                  } else {
                    _i$1 = i$1 + 1 | 0;
                    continue ;
                    
                  }
                }
              }
            } else {
              var a$3 = a;
              var b$3 = b;
              var _i$2 = 0;
              var short_length$1 = len_b;
              while(true) {
                var i$2 = _i$2;
                if (i$2 === short_length$1) {
                  return 1;
                } else {
                  var res$2 = caml_compare(a$3[i$2], b$3[i$2]);
                  if (res$2 !== 0) {
                    return res$2;
                  } else {
                    _i$2 = i$2 + 1 | 0;
                    continue ;
                    
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

function caml_greaterequal(a, b) {
  return +(caml_compare(a, b) >= 0);
}


/* No side effect */

/* stdin Not a pure module */

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
  /* hi */134217727,
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
  return +((x & 2147483648) !== 0);
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
    return +(x[/* lo */1] === y[/* lo */1]);
  } else {
    return /* false */0;
  }
}

function neg(x) {
  if (eq(x, min_int)) {
    return min_int;
  } else {
    return add(not(x), one);
  }
}

function sub$1(x, y) {
  return add(x, neg(y));
}

function lsl_(x, numBits) {
  if (numBits) {
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
  } else {
    return x;
  }
}

function asr_(x, numBits) {
  if (numBits) {
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
  } else {
    return x;
  }
}

function is_zero(param) {
  if (param[/* hi */0] !== 0 || param[/* lo */1] !== 0) {
    return /* false */0;
  } else {
    return /* true */1;
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
    if (this_hi !== 0) {
      exit$3 = 4;
    } else if ($$this[/* lo */1] !== 0) {
      exit$3 = 4;
    } else {
      return zero;
    }
    if (exit$3 === 4) {
      if (other[/* hi */0] !== 0) {
        exit$2 = 3;
      } else if (other[/* lo */1] !== 0) {
        exit$2 = 3;
      } else {
        return zero;
      }
    }
    if (exit$2 === 3) {
      if (this_hi !== -2147483648) {
        exit$1 = 2;
      } else if ($$this[/* lo */1] !== 0) {
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
      if (other_hi !== -2147483648) {
        exit$4 = 3;
      } else if (other[/* lo */1] !== 0) {
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
    
  }
}

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
    return /* true */1;
  } else if (hi < other_hi) {
    return /* false */0;
  } else {
    return +(param[/* lo */1] >= param$1[/* lo */1]);
  }
}

function gt(x, y) {
  if (x[/* hi */0] > y[/* hi */0]) {
    return /* true */1;
  } else if (x[/* hi */0] < y[/* hi */0]) {
    return /* false */0;
  } else {
    return +(x[/* lo */1] > y[/* lo */1]);
  }
}

function le(x, y) {
  return 1 - gt(x, y);
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
    if (other[/* hi */0] !== 0) {
      exit$1 = 2;
    } else if (other[/* lo */1] !== 0) {
      exit$1 = 2;
    } else {
      throw division_by_zero;
    }
    if (exit$1 === 2) {
      if (self_hi !== -2147483648) {
        if (self_hi !== 0) {
          exit = 1;
        } else if (self[/* lo */1] !== 0) {
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
        if (approx[/* hi */0] !== 0) {
          exit$2 = 3;
        } else if (approx[/* lo */1] !== 0) {
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
      if (other_hi$1 !== -2147483648) {
        exit$3 = 2;
      } else if (other[/* lo */1] !== 0) {
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
            var approx$1 = Math.max(1, Math.floor(to_float(rem$1) / to_float(other)));
            var log2 = Math.ceil(Math.log(approx$1) / Math.LN2);
            var delta = log2 <= 48 ? 1 : Math.pow(2, log2 - 48);
            var approxRes = of_float(approx$1);
            var approxRem = mul(approxRes, other);
            while(approxRem[/* hi */0] < 0 || gt(approxRem, rem$1)) {
              approx$1 -= delta;
              approxRes = of_float(approx$1);
              approxRem = mul(approxRes, other);
            }
            if (is_zero(approxRes)) {
              approxRes = one;
            }
            res = add(res, approxRes);
            rem$1 = add(rem$1, neg(approxRem));
          }
          return res;
        }
      }
      
    }
    
  }
}

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

/* not_implemented Not a pure module */

/* No side effect */

var Exit = create("Pervasives.Exit");

function max(x, y) {
  if (caml_greaterequal(x, y)) {
    return x;
  } else {
    return y;
  }
}


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
  }
}


/* No side effect */

function to_js_boolean(b) {
  if (b) {
    return true;
  } else {
    return false;
  }
}


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
    }
  } else {
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
  }
}

function range$2($staropt$star, start, finish) {
  var step = $staropt$star ? $staropt$star[0] : 1;
  if (step) {
    if (step < 0 && start < finish) {
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
        }
      };
      loop(start);
      return array;
    }
  } else {
    throw [
          InvalidArgument,
          "Array.range: ~step=0 would cause infinite loop"
        ];
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
  return +self.some((function (x) {
                return to_js_boolean(_1(f, x));
              }));
}

function filter$3(f, self) {
  return self.filter((function (x) {
                return to_js_boolean(_1(f, x));
              }));
}

function find$3(f, self) {
  return undefined_to_opt(self.find((function (x) {
                    return to_js_boolean(_1(f, x));
                  })));
}

function findIndex(f, self) {
  var i = self.findIndex((function (x) {
          return to_js_boolean(_1(f, x));
        }));
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
  return +self.every((function (x) {
                return to_js_boolean(_1(f, x));
              }));
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

/* No side effect */

/* No side effect */

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


/* No side effect */

/* No side effect */

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

function string(str) {
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
    return string(accu + x);
  };
  var extract = function (d) {
    return ((get(d, 0) + (get(d, 1) << 8) | 0) + (get(d, 2) << 16) | 0) + (get(d, 3) << 24) | 0;
  };
  var seed$1 = seed.length ? seed : /* int array */[0];
  var l = seed$1.length;
  for(var i = 0; i <= 54; ++i){
    caml_array_set(s[/* st */0], i, i);
  }
  var accu = "x";
  for(var i$1 = 0 ,i_finish = 54 + max(55, l) | 0; i$1 <= i_finish; ++i$1){
    var j = i$1 % 55;
    var k = i$1 % l;
    accu = combine(accu, caml_array_get(seed$1, k));
    caml_array_set(s[/* st */0], j, (caml_array_get(s[/* st */0], j) ^ extract(accu)) & 1073741823);
  }
  s[/* idx */1] = 0;
  return /* () */0;
}

function make$4(seed) {
  var result = /* record */[
    /* st */caml_make_vect(55, 0),
    /* idx */0
  ];
  full_init(result, seed);
  return result;
}

function make_self_init() {
  return make$4(caml_sys_random_seed(/* () */0));
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

function $$int(s, bound) {
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
    }
  }
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
    }
  }
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
      if (gt(sub$1(r, v), add(sub$1(max_int$3, n), /* int64 */[
                  /* hi */0,
                  /* lo */1
                ]))) {
        continue ;
        
      } else {
        return v;
      }
    }
  }
}

var nativeint = size === 32 ? int32 : (function (s, bound) {
      return int64(s, of_int32(bound))[1] | 0;
    });

function rawfloat(s) {
  var r1 = bits(s);
  var r2 = bits(s);
  return (r1 / 1073741824.0 + r2) / 1073741824.0;
}

function $$float(s, bound) {
  return rawfloat(s) * bound;
}

function bool(s) {
  return +((bits(s) & 1) === 0);
}

var State = [
  make$4,
  make_self_init,
  copy$3,
  bits,
  $$int,
  int32,
  nativeint,
  int64,
  $$float,
  bool
];


/* No side effect */

/* No side effect */

/* No side effect */

/* No side effect */

/* No side effect */

var Undefined = create("CamlinternalLazy.Undefined");


/* No side effect */

var prng = __(246, [(function () {
        return State[/* make_self_init */1](/* () */0);
      })]);


/* No side effect */

function readDirRecursively(dir) {
  return $$Array[/* flatMap */5]((function (filename) {
                var path = Path.join(dir, filename);
                var match = +Fs.statSync(path).isDirectory();
                if (match !== 0) {
                  return readDirRecursively(path);
                } else {
                  return /* array */[path];
                }
              }), Fs.readdirSync(dir));
}

function ensureDirExists(path) {
  $$Array[/* reduce */3]((function (acc, dir) {
          var path = Path.join(acc, dir);
          if (!Fs.existsSync(path)) {
            Fs.mkdirSync(path);
          }
          return path;
        }), "", path.split(Path.sep));
  return /* () */0;
}

function writeFile(path, contents) {
  ensureDirExists(Path.dirname(path));
  Fs.writeFileSync(path, contents, "utf8");
  return /* () */0;
}

var Fs$1 = /* module */[
  /* readDirRecursively */readDirRecursively,
  /* ensureDirExists */ensureDirExists,
  /* writeFile */writeFile
];


/* fs Not a pure module */

var outputDir = "data/generated";

var packageDir = Path.join(outputDir, "packages");

function apiKey() {
  return (require('./config_secret').algoliaApiKey);
}

var Algolia = /* module */[
  /* appId */"B1AVN0IGTU",
  /* packageIndex */"redex-packages",
  /* apiKey */apiKey
];


/* packageDir Not a pure module */

function makeClient(prim, prim$1) {
  return Algoliasearch(prim, prim$1);
}


/*  Not a pure module */

var client = makeClient(Algolia[/* appId */0], Algolia[/* apiKey */2](/* () */0));

var index$2 = client.initIndex(Algolia[/* packageIndex */1]);

map((function (record) {
        index$2.addObject(record, (function (err, _) {
                if (err == null) {
                  return /* () */0;
                } else {
                  console.log("");
                  console.log(record.id);
                  console.log("  ", err.message);
                  return /* () */0;
                }
              }));
        return /* () */0;
      }), map((function (record) {
            return Object.assign({
                        objectID: record.id
                      }, record);
          }), map((function (prim) {
                return prim;
              }), map(parseOrRaise, map((function (path) {
                        return Fs.readFileSync(path, "utf8");
                      }), Fs$1[/* readDirRecursively */0](packageDir))))));


/* client Not a pure module */

exports.client = client;
exports.index = index$2;
