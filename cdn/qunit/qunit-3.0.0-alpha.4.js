/*!
 * QUnit 3.0.0-alpha.4
 * https://qunitjs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 */
(function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = !1;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  // We don't use global-this-polyfill [1], because it modifies
  // the globals scope by default. QUnit must not affect the host context
  // as developers may test their project may be such a polyfill, and/or
  // they may intentionally test their project with and without certain
  // polyfills and we must not affect that. It also uses an obscure
  // mechanism that seems to sometimes causes a runtime error in older
  // browsers (specifically Safari and IE versions that support
  // Object.defineProperty but then report _T_ as undefined).
  // [1] https://github.com/ungap/global-this/blob/v0.4.4/esm/index.js
  //
  // Another way is `Function('return this')()`, but doing so relies
  // on eval which will cause a CSP error on some servers.
  //
  // Instead, simply check the four options that already exist
  // in all supported environments.
  function getGlobalThis() {
    if (typeof globalThis !== 'undefined') {
      // For SpiderMonkey, modern browsers, and recent Node.js
      // eslint-disable-next-line no-undef
      return globalThis;
    }
    if (typeof self !== 'undefined') {
      // For web workers
      // eslint-disable-next-line no-undef
      return self;
    }
    if (typeof window$1 !== 'undefined') {
      // For document context in browsers
      return window$1;
    }
    if (typeof global !== 'undefined') {
      // For Node.js
      // eslint-disable-next-line no-undef
      return global;
    }
    throw new Error('Unable to locate global object');
  }

  // This avoids a simple `export const` assignment as that would lead Rollup
  // to change getGlobalThis and use the same (generated) variable name there.
  var g = getGlobalThis();

  // These optional globals are undefined in one or more environments:
  // modern browser, old browser, Node.js, SpiderMonkey.
  // Calling code must check these for truthy-ness before use.
  var console$1 = g.console;
  var setTimeout$1 = g.setTimeout;
  var clearTimeout = g.clearTimeout;
  var process$1 = g.process;
  var window$1 = g.window;
  var document = window$1 && window$1.document;
  var navigator = window$1 && window$1.navigator;
  var sessionStorage = function () {
    var x = 'qunit-test-string';
    try {
      g.sessionStorage.setItem(x, x);
      g.sessionStorage.removeItem(x);
      return g.sessionStorage;
    } catch (e) {
      return undefined;
    }
  }();

  // Fallback for ES6 Map, `new Map(iterable)`, and ES7 Map#keys
  //
  // Support: Safari 7; Map is undefined
  // Support: iOS 8; `new Map(iterable)` is not supported
  // Support: IE 11; Map#keys is undefined
  var StringMap = typeof g.Map === 'function' && typeof g.Map.prototype.keys === 'function' && typeof g.Symbol === 'function' && _typeof(g.Symbol.iterator) === 'symbol' ? g.Map : function StringMap(input) {
    var _this = this;
    var store = Object.create(null);
    var hasOwn = Object.prototype.hasOwnProperty;
    this.has = function (strKey) {
      return hasOwn.call(store, strKey);
    };
    this.get = function (strKey) {
      return store[strKey];
    };
    this.set = function (strKey, val) {
      if (!hasOwn.call(store, strKey)) {
        this.size++;
      }
      store[strKey] = val;
      return this;
    };
    this.delete = function (strKey) {
      if (hasOwn.call(store, strKey)) {
        delete store[strKey];
        this.size--;
      }
    };
    this.forEach = function (callback) {
      for (var strKey in store) {
        callback(store[strKey], strKey);
      }
    };
    this.keys = function () {
      return Object.keys(store);
    };
    this.clear = function () {
      store = Object.create(null);
      this.size = 0;
    };
    this.size = 0;
    if (input) {
      input.forEach(function (val, strKey) {
        _this.set(strKey, val);
      });
    }
  };

  // Basic fallback for ES6 Set
  // Support: IE 11, `new Set(iterable)` parameter not yet implemented
  // Test for Set#values() which came after Set(iterable).
  var StringSet = typeof g.Set === 'function' && typeof g.Set.prototype.values === 'function' ? g.Set : function (input) {
    var set = Object.create(null);
    if (Array.isArray(input)) {
      input.forEach(function (item) {
        set[item] = true;
      });
    }
    return {
      add: function add(value) {
        set[value] = true;
      },
      has: function has(value) {
        return value in set;
      },
      get size() {
        return Object.keys(set).length;
      }
    };
  };

  var toString = Object.prototype.toString;
  var hasOwn$3 = Object.prototype.hasOwnProperty;
  var performance = {
    // eslint-disable-next-line compat/compat -- Checked
    now: window$1 && window$1.performance && window$1.performance.now ? window$1.performance.now.bind(window$1.performance) : Date.now
  };

  // Returns a new Array with the elements that are in a but not in b
  function diff$1(a, b) {
    return a.filter(function (a) {
      return b.indexOf(a) === -1;
    });
  }

  /**
   * Determines whether an element exists in a given array or not.
   *
   * @method inArray
   * @param {any} elem
   * @param {Array} array
   * @return {boolean}
   */
  var inArray = Array.prototype.includes ? function (elem, array) {
    return array.includes(elem);
  } : function (elem, array) {
    return array.indexOf(elem) !== -1;
  };

  /**
   * Recursively clone an object into a plain array or object, taking only the
   * own enumerable properties.
   *
   * @param {any} obj
   * @param {bool} [allowArray=true]
   * @return {Object|Array}
   */
  function objectValues(obj) {
    var allowArray = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var vals = allowArray && is('array', obj) ? [] : {};
    for (var key in obj) {
      if (hasOwn$3.call(obj, key)) {
        var val = obj[key];
        vals[key] = val === Object(val) ? objectValues(val, allowArray) : val;
      }
    }
    return vals;
  }

  /**
   * Recursively clone an object into a plain object, taking only the
   * subset of own enumerable properties that exist a given model.
   *
   * @param {any} obj
   * @param {any} model
   * @return {Object}
   */
  function objectValuesSubset(obj, model) {
    // Return primitive values unchanged to avoid false positives or confusing
    // results from assert.propContains().
    // E.g. an actual null or false wrongly equaling an empty object,
    // or an actual string being reported as object not matching a partial object.
    if (obj !== Object(obj)) {
      return obj;
    }

    // Unlike objectValues(), subset arrays to a plain objects as well.
    // This enables subsetting [20, 30] with {1: 30}.
    var subset = {};
    for (var key in model) {
      if (hasOwn$3.call(model, key) && hasOwn$3.call(obj, key)) {
        subset[key] = objectValuesSubset(obj[key], model[key]);
      }
    }
    return subset;
  }

  // Support: IE 11, iOS 7-8
  function extend(a, b, undefOnly, allProperties) {
    for (var prop in b) {
      if (hasOwn$3.call(b, prop) || allProperties) {
        if (b[prop] === undefined) {
          delete a[prop];
        } else if (!(undefOnly && typeof a[prop] !== 'undefined')) {
          a[prop] = b[prop];
        }
      }
    }
    return a;
  }
  function objectType(obj) {
    if (typeof obj === 'undefined') {
      return 'undefined';
    }

    // Consider: typeof null === object
    if (obj === null) {
      return 'null';
    }
    var match = toString.call(obj).match(/^\[object\s(.*)\]$/);
    var type = match && match[1];
    switch (type) {
      case 'Number':
        if (isNaN(obj)) {
          return 'nan';
        }
        return 'number';
      case 'String':
      case 'Boolean':
      case 'Array':
      case 'Set':
      case 'Map':
      case 'Date':
      case 'RegExp':
      case 'Function':
      case 'Symbol':
        return type.toLowerCase();
      default:
        return _typeof(obj);
    }
  }

  // Safe object type checking
  function is(type, obj) {
    return objectType(obj) === type;
  }

  // Based on Java's String.hashCode, a simple but not
  // rigorously collision resistant hashing function
  function generateHash(module, testName) {
    var str = module + '\x1C' + testName;
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }

    // Convert the possibly negative integer hash code into an 8 character hex string, which isn't
    // strictly necessary but increases user understanding that the id is a SHA-like hash
    var hex = (0x100000000 + hash).toString(16);
    if (hex.length < 8) {
      hex = '0000000' + hex;
    }
    return hex.slice(-8);
  }

  /**
   * Converts an error into a simple string for comparisons.
   *
   * @param {Error|any} error
   * @return {string}
   */
  function errorString(error) {
    // Use String() instead of toString() to handle non-object values like undefined or null.
    var resultErrorString = String(error);

    // If the error wasn't a subclass of Error but something like
    // an object literal with name and message properties...
    if (resultErrorString.slice(0, 7) === '[object') {
      // Based on https://es5.github.io/#x15.11.4.4
      return (error.name || 'Error') + (error.message ? ": ".concat(error.message) : '');
    } else {
      return resultErrorString;
    }
  }
  function escapeText(str) {
    if (!str) {
      return '';
    }

    // Both single quotes and double quotes (for attributes)
    return ('' + str).replace(/['"<>&]/g, function (s) {
      switch (s) {
        case "'":
          return '&#039;';
        case '"':
          return '&quot;';
        case '<':
          return '&lt;';
        case '>':
          return '&gt;';
        case '&':
          return '&amp;';
      }
    });
  }
  function isAsyncFunction(fn) {
    return typeof fn === 'function' && Object.prototype.toString.call(fn) === '[object AsyncFunction]';
  }

  function getUrlParams() {
    var urlParams = Object.create(null);
    // Only interact with URLs via window.location
    var location = typeof window$1 !== 'undefined' && window$1.location;
    // Silently skip in non-browser environment
    if (location) {
      var params = location.search.slice(1).split('&');
      var length = params.length;
      for (var i = 0; i < length; i++) {
        if (params[i]) {
          var param = params[i].split('=');
          var name = decodeQueryParam(param[0]);

          // Allow just a key to turn on a flag, e.g., test.html?noglobals
          var value = param.length === 1 || decodeQueryParam(param.slice(1).join('='));
          if (name in urlParams) {
            urlParams[name] = [].concat(urlParams[name], value);
          } else {
            urlParams[name] = value;
          }
        }
      }
    }
    return urlParams;
  }
  function decodeQueryParam(param) {
    return decodeURIComponent(param.replace(/\+/g, '%20'));
  }
  var urlParams = getUrlParams();

  /**
   * Config object: Maintain internal state
   * Later exposed as QUnit.config
   * `config` initialized at top of scope
   */
  var config = {
    // HTML Reporter: Modify document.title when suite is done
    altertitle: true,
    autostart: true,
    // HTML Reporter: collapse every test except the first failing test
    // If false, all failing tests will be expanded
    collapse: true,
    current: undefined,
    // whether or not to fail when there are zero tests
    failOnZeroTests: true,
    // Select by pattern or case-insensitive substring match against "moduleName: testName"
    filter: '',
    fixture: undefined,
    // HTML Reporter: Hide results of passed tests.
    hidepassed: false,
    // Depth up-to which object will be dumped
    maxDepth: 5,
    // Select case-insensitive match of the module name
    module: undefined,
    // HTML Reporter: Select module/test by array of internal IDs
    moduleId: undefined,
    noglobals: false,
    notrycatch: false,
    // By default, run previously failed tests first
    // very useful in combination with "Hide passed tests" checked
    reorder: true,
    reporters: {},
    // When enabled, all tests must call expect()
    requireExpects: false,
    // By default, scroll to top of the page when suite is done
    scrolltop: true,
    // Enable randomized ordering of tests.
    seed: undefined,
    // The storage module to use for reordering tests
    storage: sessionStorage,
    testId: undefined,
    testTimeout: 3000,
    // The updateRate controls how often QUnit will yield the main thread
    // between tests. This is mainly for the benefit of the HTML Reporter,
    // so that the browser can visually paint DOM changes with test results.
    // This also helps avoid causing browsers to prompt a warning about
    // long-running scripts.
    updateRate: 1000,
    // HTML Reporter: List of URL parameters that are given visual controls.
    // These are given an `<input type=checkbox/>` or `<select/>` by the HTML Reporter.
    // Values can be read from QUnit.urlParams.
    urlConfig: [{
      id: 'hidepassed',
      label: 'Hide passed tests',
      tooltip: 'Only show tests and assertions that fail. Stored as query string.'
    }, {
      id: 'noglobals',
      label: 'Check for globals',
      tooltip: 'Enabling this will test if any test introduces new properties on the ' + 'global object (e.g. `window` in browsers). Stored as query string.'
    }, {
      id: 'notrycatch',
      label: 'No try-catch',
      tooltip: 'Enabling this will run tests outside of a try-catch block. Stored as query string.'
    }],
    // List of defined modules (read-only).
    modules: [],
    // Semi-internal state.
    //
    // These are undocumented but defacto stable for certain limited use cases,
    // in order to maintain ecosystem compat with popular QUnit 2.x plugins and integrations.
    //
    // - currentModule: This object represents the most recent `QUnit.module()` call,
    //   and is used by functions like `QUnit.test()` to determine their module parent.
    //   It is also referred to from `config.modules` and `config._moduleStack`.
    //
    //   This starts out with an unnamed placeholder module to hold any "global" tests.
    //   The unnamed module was introduced in QUnit 1.16. When we reach doStart() in start.js,
    //   if no global tests exist, the unnamed module will be removed `config.modules`, as if
    //   it never existed, and thus never exposed to the events and callbacks API.
    //
    //   Note that this unnamed initial module is not a "root" module, it is not an ancestor
    //   to any other modules. Doing so would negatively impact developer experience by ading
    //   needless indentation, indirection, and other visible noise in test results (or require
    //   workarounds to prevent that). Since the unnamed module is a regular module, it will
    //   "end" after the last global test (i.e. before the first named module), and not e.g.
    //   at the end of the test run.
    //   To set global hooks, use `QUnit.hooks` instead.
    //   To listen for the end of the run, handle the "runEnd" event from `QUnit.on()`.
    //
    // - blocking: Whether new tests will be defined and queued, or executed immediately.
    //   In other words, whether QUnit.start() has been called yet.
    //
    // - started: Used to measure runtime duration from `QUnit.on('runStart')`.
    //
    // - queue: List of internal objects. The only supported operation is checking
    //   the length of the array, or emptying the array as a way to halt execution.
    //
    // - stats: Internal assertion counts. Use `QUnit.on('runEnd')` instead.
    //   These are discouraged per the notice at https://qunitjs.com/api/callbacks/QUnit.done/.
    //   https://qunitjs.com/api/callbacks/QUnit.on/#the-runend-event
    //
    currentModule: null,
    // initial unnamed module for "global tests", assigned in core.js.
    blocking: true,
    started: 0,
    callbacks: {},
    queue: [],
    stats: {
      all: 0,
      bad: 0,
      testCount: 0
    },
    // Internal state, exposed to ease in-process resets
    // Ref https://github.com/qunitjs/qunit/pull/1598
    _moduleStack: [],
    _globalHooks: {},
    _pq: null,
    // ProcessingQueue singleton, assigned in core.js
    _QUnit: null,
    // Self-reference to the exported QUnit API, for start.js
    _runStarted: false,
    _event_listeners: Object.create(null),
    _event_memory: {}
  };
  function readFlatPreconfigBoolean(val, dest) {
    if (typeof val === 'boolean' || typeof val === 'string' && val !== '') {
      config[dest] = val === true || val === 'true' || val === '1';
    }
  }
  function readFlatPreconfigNumber(val, dest) {
    if (typeof val === 'number' || typeof val === 'string' && /^[0-9]+$/.test(val)) {
      config[dest] = +val;
    }
  }
  function readFlatPreconfigString(val, dest) {
    if (typeof val === 'string' && val !== '') {
      config[dest] = val;
    }
  }
  function readFlatPreconfigStringOrBoolean(val, dest) {
    if (typeof val === 'boolean' || typeof val === 'string' && val !== '') {
      config[dest] = val;
    }
  }
  function readFlatPreconfigStringArray(val, dest) {
    if (typeof val === 'string' && val !== '') {
      config[dest] = [val];
    }
  }
  function readFlatPreconfig(obj) {
    readFlatPreconfigBoolean(obj.qunit_config_altertitle, 'altertitle');
    readFlatPreconfigBoolean(obj.qunit_config_autostart, 'autostart');
    readFlatPreconfigBoolean(obj.qunit_config_collapse, 'collapse');
    readFlatPreconfigBoolean(obj.qunit_config_failonzerotests, 'failOnZeroTests');
    readFlatPreconfigString(obj.qunit_config_filter, 'filter');
    readFlatPreconfigString(obj.qunit_config_fixture, 'fixture');
    readFlatPreconfigBoolean(obj.qunit_config_hidepassed, 'hidepassed');
    readFlatPreconfigNumber(obj.qunit_config_maxdepth, 'maxDepth');
    readFlatPreconfigString(obj.qunit_config_module, 'module');
    readFlatPreconfigStringArray(obj.qunit_config_moduleid, 'moduleId');
    readFlatPreconfigBoolean(obj.qunit_config_noglobals, 'noglobals');
    readFlatPreconfigBoolean(obj.qunit_config_notrycatch, 'notrycatch');
    readFlatPreconfigBoolean(obj.qunit_config_reorder, 'reorder');
    readFlatPreconfigBoolean(obj.qunit_config_requireexpects, 'requireExpects');
    readFlatPreconfigBoolean(obj.qunit_config_scrolltop, 'scrolltop');
    readFlatPreconfigStringOrBoolean(obj.qunit_config_seed, 'seed');
    readFlatPreconfigStringArray(obj.qunit_config_testid, 'testId');
    readFlatPreconfigNumber(obj.qunit_config_testtimeout, 'testTimeout');
    var reporterKeys = {
      qunit_config_reporters_console: 'console',
      qunit_config_reporters_perf: 'perf',
      qunit_config_reporters_tap: 'tap',
      qunit_config_reporters_html: 'html'
    };
    for (var key in reporterKeys) {
      var val = obj[key];
      // Based on readFlatPreconfigBoolean
      if (typeof val === 'boolean' || typeof val === 'string' && val !== '') {
        var dest = reporterKeys[key];
        config.reporters[dest] = val === true || val === 'true' || val === '1';
      }
    }
  }
  if (process$1 && 'env' in process$1) {
    readFlatPreconfig(process$1.env);
  }
  readFlatPreconfig(g);

  // Apply a predefined QUnit.config object
  //
  // Ignore QUnit.config if it is a QUnit distribution instead of preconfig.
  // That means QUnit was loaded twice! (Use the same approach as export.js)
  var preConfig = g && g.QUnit && !g.QUnit.version && g.QUnit.config;
  if (preConfig) {
    extend(config, preConfig);
  }

  // Apply QUnit.urlParams
  // in accordance with /docs/api/config.index.md#order
  readFlatPreconfigString(urlParams.filter, 'filter');
  readFlatPreconfigNumber(urlParams.maxDepth, 'maxDepth');
  readFlatPreconfigString(urlParams.module, 'module');
  if (urlParams.moduleId) {
    config.moduleId = [].concat(urlParams.moduleId);
  }
  if (urlParams.testId) {
    config.testId = [].concat(urlParams.testId);
  }
  readFlatPreconfigBoolean(urlParams.hidepassed, 'hidepassed');
  readFlatPreconfigBoolean(urlParams.noglobals, 'noglobals');
  readFlatPreconfigBoolean(urlParams.notrycatch, 'notrycatch');
  readFlatPreconfigStringOrBoolean(urlParams.seed, 'seed');
  if (config.seed === 'true' || config.seed === true) {
    // Generate a random seed
    // Length of `Math.random()` fraction, in base 36, may vary from 6-14.
    // Pad and take slice to a consistent 10-digit value.
    // TODO: Present this in HtmlReporter
    config.seed = (Math.random().toString(36) + '0000000000').slice(2, 12);
  }

  var dump = (function () {
    function quote(str) {
      return '"' + str.toString().replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
    }
    function literal(o) {
      return o + '';
    }
    function join(pre, arr, post) {
      var s = dump.separator();
      var inner = dump.indent(1);
      if (arr.join) {
        arr = arr.join(',' + s + inner);
      }
      if (!arr) {
        return pre + post;
      }
      var base = dump.indent();
      return [pre, inner + arr, base + post].join(s);
    }
    function array(arr, stack) {
      if (config.maxDepth && dump.depth > config.maxDepth) {
        return '[object Array]';
      }
      this.up();
      var i = arr.length;
      var ret = new Array(i);
      while (i--) {
        ret[i] = this.parse(arr[i], undefined, stack);
      }
      this.down();
      return join('[', ret, ']');
    }
    function isArray(obj) {
      return (
        // Native Arrays
        Array.isArray(obj)

        // NodeList objects
        || typeof obj.length === 'number' && obj.item !== undefined && (obj.length ? obj.item(0) === obj[0] : obj.item(0) === null && obj[0] === undefined)
      );
    }
    var reName = /^function (\w+)/;
    var dump = {
      // The objType is used mostly internally, you can fix a (custom) type in advance
      parse: function parse(obj, objType, stack) {
        stack = stack || [];
        var objIndex = stack.indexOf(obj);
        if (objIndex !== -1) {
          return "recursion(".concat(objIndex - stack.length, ")");
        }
        objType = objType || this.typeOf(obj);
        var parser = this.parsers[objType];
        var parserType = _typeof(parser);
        if (parserType === 'function') {
          stack.push(obj);
          var res = parser.call(this, obj, stack);
          stack.pop();
          return res;
        }
        if (parserType === 'string') {
          return parser;
        }
        return '[ERROR: Missing QUnit.dump formatter for type ' + objType + ']';
      },
      typeOf: function typeOf(obj) {
        if (obj === null) {
          return 'null';
        }
        if (typeof obj === 'undefined') {
          return 'undefined';
        } else if (is('regexp', obj)) {
          return 'regexp';
        } else if (is('date', obj)) {
          return 'date';
        } else if (is('function', obj)) {
          return 'function';
        } else if (obj.setInterval !== undefined && obj.document !== undefined && obj.nodeType === undefined) {
          return 'window';
        } else if (obj.nodeType === 9) {
          return 'document';
        } else if (obj.nodeType) {
          return 'node';
        } else if (isArray(obj)) {
          return 'array';
        } else if (obj.constructor === Error.prototype.constructor) {
          return 'error';
        }
        return _typeof(obj);
      },
      separator: function separator() {
        return '\n';
      },
      // Extra can be a number, shortcut for increasing-calling-decreasing
      indent: function indent(extra) {
        var chr = this.indentChar;
        return new Array(this.depth + (extra || 0)).join(chr);
      },
      up: function up(a) {
        this.depth += a || 1;
      },
      down: function down(a) {
        this.depth -= a || 1;
      },
      setParser: function setParser(name, parser) {
        this.parsers[name] = parser;
      },
      // The next 3 are exposed so you can use them
      quote: quote,
      literal: literal,
      join: join,
      depth: 1,
      /**
       * @deprecated since 3.0.0, use QUnit.config.maxDepth instead.
       */
      get maxDepth() {
        return config.maxDepth;
      },
      set maxDepth(value) {
        config.maxDepth = value;
      },
      // This is the list of parsers, to modify them, use dump.setParser
      parsers: {
        window: '[Window]',
        document: '[Document]',
        error: function error(_error) {
          return 'Error("' + _error.message + '")';
        },
        // This has been unused since QUnit 1.0.0.
        // @todo Deprecate and remove.
        unknown: '[Unknown]',
        null: 'null',
        undefined: 'undefined',
        function: function _function(fn) {
          var ret = 'function';

          // Functions never have name in IE
          var name = 'name' in fn ? fn.name : (reName.exec(fn) || [])[1];
          if (name) {
            ret += ' ' + name;
          }
          ret += '(';
          ret = [ret, dump.parse(fn, 'functionArgs'), '){'].join('');
          return join(ret, dump.parse(fn, 'functionCode'), '}');
        },
        array: array,
        nodelist: array,
        arguments: array,
        object: function object(map, stack) {
          var ret = [];
          if (config.maxDepth && dump.depth > config.maxDepth) {
            return '[object Object]';
          }
          dump.up();
          var keys = [];
          for (var key in map) {
            keys.push(key);
          }

          // Some properties are not always enumerable on Error objects.
          var nonEnumerableProperties = ['message', 'name'];
          for (var i in nonEnumerableProperties) {
            var _key = nonEnumerableProperties[i];
            if (_key in map && !inArray(_key, keys)) {
              keys.push(_key);
            }
          }
          keys.sort();
          for (var _i = 0; _i < keys.length; _i++) {
            var _key2 = keys[_i];
            var val = map[_key2];
            ret.push(dump.parse(_key2, 'key') + ': ' + dump.parse(val, undefined, stack));
          }
          dump.down();
          return join('{', ret, '}');
        },
        node: function node(_node) {
          var open = '<';
          var close = '>';
          var tag = _node.nodeName.toLowerCase();
          var ret = open + tag;
          var attrs = _node.attributes;
          if (attrs) {
            for (var i = 0; i < attrs.length; i++) {
              var val = attrs[i].nodeValue;

              // IE6 includes all attributes in .attributes, even ones not explicitly
              // set. Those have values like undefined, null, 0, false, "" or
              // "inherit".
              if (val && val !== 'inherit') {
                ret += ' ' + attrs[i].nodeName + '=' + dump.parse(val, 'attribute');
              }
            }
          }
          ret += close;

          // Show content of TextNode or CDATASection
          if (_node.nodeType === 3 || _node.nodeType === 4) {
            ret += _node.nodeValue;
          }
          return ret + open + '/' + tag + close;
        },
        // Function calls it internally, it's the arguments part of the function
        functionArgs: function functionArgs(fn) {
          var l = fn.length;
          if (!l) {
            return '';
          }
          var args = new Array(l);
          while (l--) {
            // 97 is 'a'
            args[l] = String.fromCharCode(97 + l);
          }
          return ' ' + args.join(', ') + ' ';
        },
        // Object calls it internally, the key part of an item in a map
        key: quote,
        // Function calls it internally, it's the content of the function
        functionCode: '[code]',
        // Node calls it internally, it's a html attribute value
        attribute: quote,
        string: quote,
        date: quote,
        regexp: literal,
        number: literal,
        boolean: literal,
        symbol: function symbol(sym) {
          return sym.toString();
        }
      },
      // Indentation unit
      indentChar: '  '
    };
    return dump;
  })();

  var BOXABLE_TYPES = new StringSet(['boolean', 'number', 'string']);

  // Memory for previously seen containers (object, array, map, set).
  // Used for recursion detection, and to avoid repeated comparison.
  //
  // Elements are { a: val, b: val }.
  var memory = [];
  function useStrictEquality(a, b) {
    return a === b;
  }
  function useObjectValueEquality(a, b) {
    return a === b || a.valueOf() === b.valueOf();
  }
  function compareConstructors(a, b) {
    // Comparing constructors is more strict than using `instanceof`
    return getConstructor(a) === getConstructor(b);
  }
  function getConstructor(obj) {
    var proto = Object.getPrototypeOf(obj);

    // If the obj prototype descends from a null constructor, treat it
    // as a null prototype.
    // Ref https://github.com/qunitjs/qunit/issues/851
    //
    // Allow objects with no prototype, from Object.create(null), to be equivalent to
    // plain objects that have Object as their constructor.
    return !proto || proto.constructor === null ? Object : obj.constructor;
  }
  function getRegExpFlags(regexp) {
    return 'flags' in regexp ? regexp.flags : regexp.toString().match(/[gimuy]*$/)[0];
  }

  // Specialised comparisons after entryTypeCallbacks.object, based on `objectType()`
  var objTypeCallbacks = {
    undefined: useStrictEquality,
    null: useStrictEquality,
    // Handle boxed boolean
    boolean: useObjectValueEquality,
    number: function number(a, b) {
      // Handle NaN and boxed number
      return a === b || a.valueOf() === b.valueOf() || isNaN(a.valueOf()) && isNaN(b.valueOf());
    },
    // Handle boxed string
    string: useObjectValueEquality,
    symbol: useStrictEquality,
    date: useObjectValueEquality,
    nan: function nan() {
      return true;
    },
    regexp: function regexp(a, b) {
      return a.source === b.source

      // Include flags in the comparison
      && getRegExpFlags(a) === getRegExpFlags(b);
    },
    // identical reference only
    function: useStrictEquality,
    array: function array(a, b) {
      if (a.length !== b.length) {
        // Safe and faster
        return false;
      }
      for (var i = 0; i < a.length; i++) {
        if (!typeEquiv(a[i], b[i])) {
          return false;
        }
      }
      return true;
    },
    // Define sets a and b to be equivalent if for each element aVal in a, there
    // is some element bVal in b such that aVal and bVal are equivalent. Element
    // repetitions are not counted, so these are equivalent:
    // a = new Set( [ X={}, Y=[], Y ] );
    // b = new Set( [ Y, X, X ] );
    set: function set(a, b) {
      if (a.size !== b.size) {
        // This optimization has certain quirks because of the lack of
        // repetition counting. For instance, adding the same
        // (reference-identical) element to two equivalent sets can
        // make them non-equivalent.
        return false;
      }
      var outerEq = true;
      a.forEach(function (aVal) {
        // Short-circuit if the result is already known. (Using for...of
        // with a break clause would be cleaner here, but it would cause
        // a syntax error on older JavaScript implementations even if
        // Set is unused)
        if (!outerEq) {
          return;
        }
        var innerEq = false;
        b.forEach(function (bVal) {
          // Likewise, short-circuit if the result is already known
          if (innerEq) {
            return;
          }

          // Swap out the global memory, as nested typeEquiv() would clobber it
          var originalMemory = memory;
          memory = [];
          if (typeEquiv(bVal, aVal)) {
            innerEq = true;
          }
          // Restore
          memory = originalMemory;
        });
        if (!innerEq) {
          outerEq = false;
        }
      });
      return outerEq;
    },
    // Define maps a and b to be equivalent if for each key-value pair (aKey, aVal)
    // in a, there is some key-value pair (bKey, bVal) in b such that
    // [ aKey, aVal ] and [ bKey, bVal ] are equivalent. Key repetitions are not
    // counted, so these are equivalent:
    // a = new Map( [ [ {}, 1 ], [ {}, 1 ], [ [], 1 ] ] );
    // b = new Map( [ [ {}, 1 ], [ [], 1 ], [ [], 1 ] ] );
    map: function map(a, b) {
      if (a.size !== b.size) {
        // This optimization has certain quirks because of the lack of
        // repetition counting. For instance, adding the same
        // (reference-identical) key-value pair to two equivalent maps
        // can make them non-equivalent.
        return false;
      }
      var outerEq = true;
      a.forEach(function (aVal, aKey) {
        // Short-circuit if the result is already known. (Using for...of
        // with a break clause would be cleaner here, but it would cause
        // a syntax error on older JavaScript implementations even if
        // Map is unused)
        if (!outerEq) {
          return;
        }
        var innerEq = false;
        b.forEach(function (bVal, bKey) {
          // Likewise, short-circuit if the result is already known
          if (innerEq) {
            return;
          }

          // Swap out the global memory, as nested typeEquiv() would clobber it
          var originalMemory = memory;
          memory = [];
          if (objTypeCallbacks.array([bVal, bKey], [aVal, aKey])) {
            innerEq = true;
          }
          // Restore
          memory = originalMemory;
        });
        if (!innerEq) {
          outerEq = false;
        }
      });
      return outerEq;
    }
  };

  // Entry points from typeEquiv, based on `typeof`
  var entryTypeCallbacks = {
    undefined: useStrictEquality,
    null: useStrictEquality,
    boolean: useStrictEquality,
    number: function number(a, b) {
      // Handle NaN
      return a === b || isNaN(a) && isNaN(b);
    },
    string: useStrictEquality,
    symbol: useStrictEquality,
    function: useStrictEquality,
    object: function object(a, b) {
      // Handle memory (skip recursion)
      if (memory.some(function (pair) {
        return pair.a === a && pair.b === b;
      })) {
        return true;
      }
      memory.push({
        a: a,
        b: b
      });
      var aObjType = objectType(a);
      var bObjType = objectType(b);
      if (aObjType !== 'object' || bObjType !== 'object') {
        // Handle literal `null`
        // Handle: Array, Map/Set, Date, Regxp/Function, boxed primitives
        return aObjType === bObjType && objTypeCallbacks[aObjType](a, b);
      }

      // NOTE: Literal null must not make it here as it would throw
      if (compareConstructors(a, b) === false) {
        return false;
      }
      var aProperties = [];
      var bProperties = [];

      // Be strict and go deep, no filtering with hasOwnProperty.
      for (var i in a) {
        // Collect a's properties
        aProperties.push(i);

        // Skip OOP methods that look the same
        if (a.constructor !== Object && typeof a.constructor !== 'undefined' && typeof a[i] === 'function' && typeof b[i] === 'function' && a[i].toString() === b[i].toString()) {
          continue;
        }
        if (!typeEquiv(a[i], b[i])) {
          return false;
        }
      }
      for (var _i in b) {
        // Collect b's properties
        bProperties.push(_i);
      }
      return objTypeCallbacks.array(aProperties.sort(), bProperties.sort());
    }
  };
  function typeEquiv(a, b) {
    // Optimization: Only perform type-specific comparison when pairs are not strictly equal.
    if (a === b) {
      return true;
    }
    var aType = _typeof(a);
    var bType = _typeof(b);
    if (aType !== bType) {
      // Support comparing primitive to boxed primitives
      // Try again after possibly unwrapping one
      return (aType === 'object' && BOXABLE_TYPES.has(objectType(a)) ? a.valueOf() : a) === (bType === 'object' && BOXABLE_TYPES.has(objectType(b)) ? b.valueOf() : b);
    }
    return entryTypeCallbacks[aType](a, b);
  }
  function innerEquiv(a, b) {
    var res = typeEquiv(a, b);
    // Release any retained objects and reset recursion detection for next call
    memory = [];
    return res;
  }

  /**
   * Test any two types of JavaScript values for equality.
   *
   * @author Philippe Rathé <prathe@gmail.com>
   * @author David Chan <david@troi.org>
   */
  function equiv(a, b) {
    if (arguments.length === 2) {
      return a === b || innerEquiv(a, b);
    }

    // Given 0 or 1 arguments, just return true (nothing to compare).
    // Given (A,B,C,D) compare C,D then B,C then A,B.
    var i = arguments.length - 1;
    while (i > 0) {
      if (!innerEquiv(arguments[i - 1], arguments[i])) {
        return false;
      }
      i--;
    }
    return true;
  }

  // Stacktrace cleaner to focus on the path from error source to test suite.
  //
  // This should reduce a raw stack trace like this:
  //
  // > foo.broken()@/example/foo.js
  // > Bar@/example/bar.js
  // > @/test/bar.test.js
  // > @/lib/qunit.js:500:12
  // > @/lib/qunit.js:100:28
  // > @/lib/qunit.js:200:56
  // > setTimeout@
  // > @/dist/vendor.js
  //
  // and shorten it to show up until the end of the user's bar.test.js code.
  //
  // > foo.broken()@/example/foo.js
  // > Bar@/example/bar.js
  // > @/test/bar.test.js
  //
  // QUnit will obtain one example trace (once per process/pageload suffices),
  // strip off any :<line> and :<line>:<column>, and use that as match needle,
  // to the first QUnit-internal frames, and then stop at that point.
  // Any later frames, including those that are outside QUnit again, will be ommitted
  // as being uninteresting to the test, since QUnit will have either started or
  // resumed the test. This we also clean away browser built-ins, or other
  // vendor/bundler that may be higher up the stack.
  //
  // Stripping :<line>:<column> is not for prettyness, it is essential for the
  // match needle to work, since this sample trace will by definitin not be the
  // same line as e.g. the QUnit.test() call we're trying to identify.
  //
  // See also:
  // - https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error/Stack

  function qunitFileName() {
    var error = new Error();
    if (!error.stack) {
      // Copy of sourceFromStacktrace() to avoid circular dependency
      // Support: IE 11
      try {
        throw error;
      } catch (err) {
        error = err;
      }
    }
    return (error.stack || ''
    // Copy of extractStacktrace() to avoid circular dependency
    // Support: V8/Chrome
    ).replace(/^error$\n/im, '').split('\n')[0]
    // Global replace, because a frame like localhost:4000/lib/qunit.js:1234:50,
    // would otherwise (harmlessly, but uselessly) remove only the port (first match).
    // https://github.com/qunitjs/qunit/issues/1769
    .replace(/(:\d+)+\)?/g, '')
    // Remove anything prior to the last slash (Unix/Windows) from the last frame,
    // leaving only "qunit.js".
    .replace(/.+[/\\]/, '');
  }
  var fileName = qunitFileName();

  /**
   * Responsibilities:
   * - For internal errors from QUnit itself, remove the first qunit.js frames.
   * - For errors in Node.js, format any remaining qunit.js and node:internal
   *   frames as internal (i.e. grey out).
   *
   * @param {string} Error#stack
   * @param {Function} formatInternal Format a string in an "internal" color
   * @param {string|null} [eToString] Error#toString() to help remove
   *  noise from Node.js/V8 stack traces.
   */
  function annotateStacktrace(stack, formatInternal) {
    var eToString = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var frames = stack.split('\n');
    var annotated = [];
    if (eToString && eToString.indexOf(frames[0]) !== -1) {
      // In Firefox and Safari e.stack starts with frame 0, but in V8 (Chrome/Node.js),
      // e.stack starts first stringified message. Preserve this separately,
      // so that, below, we can distinguish between internal frames on top
      // (to remove) vs later internal frames (to format differently).
      annotated.push(frames.shift());
    }
    var initialInternal = true;
    for (var i = 0; i < frames.length; i++) {
      var frame = frames[i];
      var isInternal = frame.indexOf(fileName) !== -1 || frame.indexOf('node:internal/') !== -1;
      if (!isInternal) {
        initialInternal = false;
      }
      // Remove initial internal frames entirely.
      if (!initialInternal) {
        annotated.push(isInternal ? formatInternal(frame) : frame);
      }
    }
    return annotated.join('\n');
  }
  function extractStacktrace(e, offset) {
    offset = offset === undefined ? 4 : offset;
    if (e && e.stack) {
      var _stack = e.stack.split('\n');
      // In Firefox and Safari, e.stack starts immediately with the first frame.
      //
      // In V8 (Chrome/Node.js), the stack starts first with a stringified error message,
      // and the real stack starting on line 2.
      if (/^error$/i.test(_stack[0])) {
        _stack.shift();
      }
      if (fileName) {
        var include = [];
        for (var i = offset; i < _stack.length; i++) {
          if (_stack[i].indexOf(fileName) !== -1) {
            break;
          }
          include.push(_stack[i]);
        }
        if (include.length) {
          return include.join('\n');
        }
      }
      return _stack[offset];
    }
  }
  function sourceFromStacktrace(offset) {
    var error = new Error();

    // Support: IE 11, iOS 7
    // Not all browsers generate the `stack` property for `new Error()`
    // See also https://github.com/qunitjs/qunit/issues/636
    if (!error.stack) {
      try {
        throw error;
      } catch (err) {
        error = err;
      }
    }
    return extractStacktrace(error, offset);
  }
  function stack(offset) {
    offset = (offset || 0) + 2;
    // Support Safari: Use temp variable to avoid triggering ES6 Proper Tail Calls,
    // which ensures a consistent cross-browser result.
    // https://bugs.webkit.org/show_bug.cgi?id=276187
    var source = sourceFromStacktrace(offset);
    return source;
  }

  var Assert = /*#__PURE__*/function () {
    function Assert(testContext) {
      _classCallCheck(this, Assert);
      this.test = testContext;
    }
    return _createClass(Assert, [{
      key: "timeout",
      value: function timeout(duration) {
        if (typeof duration !== 'number') {
          throw new Error('You must pass a number as the duration to assert.timeout');
        }
        this.test.timeout = duration;

        // If a timeout has been set, clear it and reset with the new duration
        if (config.timeout) {
          clearTimeout(config.timeout);
          config.timeout = null;
          if (config.timeoutHandler && this.test.timeout > 0) {
            this.test.internalResetTimeout(this.test.timeout);
          }
        }
      }

      // Documents a "step", which is a string value, in a test as a passing assertion
    }, {
      key: "step",
      value: function step(value) {
        if (typeof value === 'undefined' || value === '') {
          throw new TypeError('You must provide a value to assert.step');
        }
        if (typeof value !== 'string') {
          throw new TypeError('You must provide a string value to assert.step');
        }
        this.test.steps.push(value);
      }

      // Verifies the steps in a test match a given array of string values
    }, {
      key: "verifySteps",
      value: function verifySteps(steps, message) {
        // Since the steps array is just string values, we can clone with slice
        var actualStepsClone = this.test.steps.slice();
        this.deepEqual(actualStepsClone, steps, message);
        this.test.stepsCount += this.test.steps.length;
        this.test.steps.length = 0;
      }
    }, {
      key: "expect",
      value: function expect(asserts) {
        if (arguments.length === 1) {
          this.test.expected = asserts;
        } else {
          return this.test.expected;
        }
      }

      // Create a new async pause and return a new function that can release the pause.
    }, {
      key: "async",
      value: function async(count) {
        if (count === undefined) {
          count = 1;
        } else if (typeof count !== 'number') {
          throw new TypeError('async takes number as an input');
        }
        var requiredCalls = count;
        return this.test.internalStop(requiredCalls);
      }
    }, {
      key: "closeTo",
      value: function closeTo(actual, expected, delta, message) {
        if (typeof delta !== 'number') {
          throw new TypeError('closeTo() requires a delta argument');
        }
        this.pushResult({
          result: Math.abs(actual - expected) <= delta,
          actual: actual,
          expected: expected,
          message: message || "value should be within ".concat(delta, " inclusive")
        });
      }
    }, {
      key: "push",
      value: function push(result, actual, expected, message, negative) {
        var currentTest = this instanceof Assert && this.test || config.current;
        return currentTest.pushResult({
          result: result,
          actual: actual,
          expected: expected,
          message: message,
          negative: negative
        });
      }

      // Public API to internal test.pushResult()
    }, {
      key: "pushResult",
      value: function pushResult(resultInfo) {
        // Prefer context object when possible, so that test.pushResult() can provide
        // useful error when producing assertions on a closed test.
        var currentTest = this instanceof Assert && this.test || config.current;

        // Backwards compatibility for direct use of global QUnit.assert.* methods.
        // It's use is not recommended as it can leak assertions to other tests from async
        // tests, because we only get a reference to the current test.
        if (!currentTest) {
          throw new Error('assertion outside test context, in ' + sourceFromStacktrace(2));
        }
        return currentTest.pushResult(resultInfo);
      }
    }, {
      key: "ok",
      value: function ok(result, message) {
        if (!message) {
          message = result ? 'okay' : "failed, expected argument to be truthy, was: ".concat(dump.parse(result));
        }
        this.pushResult({
          result: !!result,
          actual: result,
          expected: true,
          message: message
        });
      }
    }, {
      key: "notOk",
      value: function notOk(result, message) {
        if (!message) {
          message = !result ? 'okay' : "failed, expected argument to be falsy, was: ".concat(dump.parse(result));
        }
        this.pushResult({
          result: !result,
          actual: result,
          expected: false,
          message: message
        });
      }
    }, {
      key: "true",
      value: function _true(result, message) {
        this.pushResult({
          result: result === true,
          actual: result,
          expected: true,
          message: message
        });
      }
    }, {
      key: "false",
      value: function _false(result, message) {
        this.pushResult({
          result: result === false,
          actual: result,
          expected: false,
          message: message
        });
      }
    }, {
      key: "equal",
      value: function equal(actual, expected, message) {
        this.pushResult({
          // eslint-disable-next-line eqeqeq
          result: expected == actual,
          actual: actual,
          expected: expected,
          message: message
        });
      }
    }, {
      key: "notEqual",
      value: function notEqual(actual, expected, message) {
        this.pushResult({
          // eslint-disable-next-line eqeqeq
          result: expected != actual,
          actual: actual,
          expected: expected,
          message: message,
          negative: true
        });
      }
    }, {
      key: "propEqual",
      value: function propEqual(actual, expected, message) {
        actual = objectValues(actual);
        expected = objectValues(expected);
        this.pushResult({
          result: equiv(actual, expected),
          actual: actual,
          expected: expected,
          message: message
        });
      }
    }, {
      key: "notPropEqual",
      value: function notPropEqual(actual, expected, message) {
        actual = objectValues(actual);
        expected = objectValues(expected);
        this.pushResult({
          result: !equiv(actual, expected),
          actual: actual,
          expected: expected,
          message: message,
          negative: true
        });
      }
    }, {
      key: "propContains",
      value: function propContains(actual, expected, message) {
        actual = objectValuesSubset(actual, expected);

        // The expected parameter is usually a plain object, but clone it for
        // consistency with propEqual(), and to make it easy to explain that
        // inheritence is not considered (on either side), and to support
        // recursively checking subsets of nested objects.
        expected = objectValues(expected, false);
        this.pushResult({
          result: equiv(actual, expected),
          actual: actual,
          expected: expected,
          message: message
        });
      }
    }, {
      key: "notPropContains",
      value: function notPropContains(actual, expected, message) {
        actual = objectValuesSubset(actual, expected);
        expected = objectValues(expected);
        this.pushResult({
          result: !equiv(actual, expected),
          actual: actual,
          expected: expected,
          message: message,
          negative: true
        });
      }
    }, {
      key: "deepEqual",
      value: function deepEqual(actual, expected, message) {
        this.pushResult({
          result: equiv(actual, expected),
          actual: actual,
          expected: expected,
          message: message
        });
      }
    }, {
      key: "notDeepEqual",
      value: function notDeepEqual(actual, expected, message) {
        this.pushResult({
          result: !equiv(actual, expected),
          actual: actual,
          expected: expected,
          message: message,
          negative: true
        });
      }
    }, {
      key: "strictEqual",
      value: function strictEqual(actual, expected, message) {
        this.pushResult({
          result: expected === actual,
          actual: actual,
          expected: expected,
          message: message
        });
      }
    }, {
      key: "notStrictEqual",
      value: function notStrictEqual(actual, expected, message) {
        this.pushResult({
          result: expected !== actual,
          actual: actual,
          expected: expected,
          message: message,
          negative: true
        });
      }
    }, {
      key: 'throws',
      value: function throws(block, expected, message) {
        var _validateExpectedExce = validateExpectedExceptionArgs(expected, message, 'throws');
        var _validateExpectedExce2 = _slicedToArray(_validateExpectedExce, 2);
        expected = _validateExpectedExce2[0];
        message = _validateExpectedExce2[1];
        var currentTest = this instanceof Assert && this.test || config.current;
        if (typeof block !== 'function') {
          currentTest.assert.pushResult({
            result: false,
            actual: block,
            message: 'The value provided to `assert.throws` in ' + '"' + currentTest.testName + '" was not a function.'
          });
          return;
        }
        var actual;
        var result = false;
        currentTest.ignoreGlobalErrors = true;
        try {
          block.call(currentTest.testEnvironment);
        } catch (e) {
          actual = e;
        }
        currentTest.ignoreGlobalErrors = false;
        if (actual) {
          var _validateException = validateException(actual, expected, message);
          var _validateException2 = _slicedToArray(_validateException, 3);
          result = _validateException2[0];
          expected = _validateException2[1];
          message = _validateException2[2];
        }
        currentTest.assert.pushResult({
          result: result,
          // undefined if it didn't throw
          actual: actual && errorString(actual),
          expected: expected,
          message: message
        });
      }
    }, {
      key: "rejects",
      value: function rejects(promise, expected, message) {
        var _validateExpectedExce3 = validateExpectedExceptionArgs(expected, message, 'rejects');
        var _validateExpectedExce4 = _slicedToArray(_validateExpectedExce3, 2);
        expected = _validateExpectedExce4[0];
        message = _validateExpectedExce4[1];
        var currentTest = this instanceof Assert && this.test || config.current;
        var then = promise && promise.then;
        if (typeof then !== 'function') {
          currentTest.assert.pushResult({
            result: false,
            message: 'The value provided to `assert.rejects` in ' + '"' + currentTest.testName + '" was not a promise.',
            actual: promise
          });
          return;
        }
        var done = this.async();
        return then.call(promise, function handleFulfillment() {
          currentTest.assert.pushResult({
            result: false,
            message: 'The promise returned by the `assert.rejects` callback in ' + '"' + currentTest.testName + '" did not reject.',
            actual: promise
          });
          done();
        }, function handleRejection(actual) {
          var result;
          var _validateException3 = validateException(actual, expected, message);
          var _validateException4 = _slicedToArray(_validateException3, 3);
          result = _validateException4[0];
          expected = _validateException4[1];
          message = _validateException4[2];
          currentTest.assert.pushResult({
            result: result,
            // leave rejection value of undefined as-is
            actual: actual && errorString(actual),
            expected: expected,
            message: message
          });
          done();
        });
      }
    }]);
  }();
  function validateExpectedExceptionArgs(expected, message, assertionMethod) {
    var expectedType = objectType(expected);

    // 'expected' is optional unless doing string comparison
    if (expectedType === 'string') {
      if (message === undefined) {
        message = expected;
        expected = undefined;
        return [expected, message];
      } else {
        throw new Error('assert.' + assertionMethod + ' does not accept a string value for the expected argument.\n' + 'Use a non-string object value (e.g. RegExp or validator function) instead if necessary.');
      }
    }
    var valid = !expected // TODO: be more explicit here
    || expectedType === 'regexp' || expectedType === 'function' || expectedType === 'object';
    if (!valid) {
      throw new Error('Invalid expected value type (' + expectedType + ') ' + 'provided to assert.' + assertionMethod + '.');
    }
    return [expected, message];
  }
  function validateException(actual, expected, message) {
    var result = false;
    var expectedType = objectType(expected);

    // These branches should be exhaustive, based on validation done in validateExpectedException

    // We don't want to validate
    if (!expected) {
      result = true;

      // Expected is a regexp
    } else if (expectedType === 'regexp') {
      result = expected.test(errorString(actual));

      // Log the string form of the regexp
      expected = String(expected);

      // Expected is a constructor, maybe an Error constructor.
      // Note the extra check on its prototype - this is an implicit
      // requirement of "instanceof", else it will throw a TypeError.
    } else if (expectedType === 'function' && expected.prototype !== undefined && actual instanceof expected) {
      result = true;

      // Expected is an Error object
    } else if (expectedType === 'object') {
      result = actual instanceof expected.constructor && actual.name === expected.name && actual.message === expected.message;

      // Log the string form of the Error object
      expected = errorString(expected);

      // Expected is a validation function which returns true if validation passed
    } else if (expectedType === 'function') {
      // protect against accidental semantics which could hard error in the test
      try {
        result = expected.call({}, actual) === true;
        expected = null;
      } catch (e) {
        // assign the "expected" to a nice error string to communicate the local failure to the user
        expected = errorString(e);
      }
    }
    return [result, expected, message];
  }

  // Provide an alternative to assert.throws(), for environments that consider throws a reserved word
  // Known to us are: Closure Compiler, Narwhal
  // eslint-disable-next-line dot-notation
  Assert.prototype.raises = Assert.prototype['throws'];

  var SUPPORTED_EVENTS = ['error', 'runStart', 'suiteStart', 'testStart', 'assertion', 'testEnd', 'suiteEnd', 'runEnd'];
  var MEMORY_EVENTS = ['error', 'runEnd'];

  /**
   * Emits an event with the specified data to all currently registered listeners.
   * Callbacks will fire in the order in which they are registered (FIFO). This
   * function is not exposed publicly; it is used by QUnit internals to emit
   * logging events.
   *
   * @private
   * @method emit
   * @param {string} eventName
   * @param {Object} data
   * @return {void}
   */
  function emit(eventName, data) {
    /* istanbul ignore if: private function */
    if (typeof eventName !== 'string') {
      throw new TypeError('eventName must be a string when emitting an event');
    }

    // Clone the callbacks in case one of them registers a new callback
    var originalCallbacks = config._event_listeners[eventName];
    var callbacks = originalCallbacks ? _toConsumableArray(originalCallbacks) : [];
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i](data);
    }
    if (inArray(eventName, MEMORY_EVENTS)) {
      config._event_memory[eventName] = data;
    }
  }
  var prioritySymbol = {};

  /**
   * Registers a callback as a listener to the specified event.
   *
   * @public
   * @method on
   * @param {string} eventName
   * @param {Function} callback
   * @param {Object} [priority] Internal parameter for PerfReporter
   * @return {void}
   */
  function on(eventName, callback) {
    var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    if (typeof eventName !== 'string') {
      throw new TypeError('eventName must be a string when registering a listener');
    }
    if (!inArray(eventName, SUPPORTED_EVENTS)) {
      var events = SUPPORTED_EVENTS.join(', ');
      throw new Error("\"".concat(eventName, "\" is not a valid event; must be one of: ").concat(events, "."));
    }
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function when registering a listener');
    }
    /* istanbul ignore if: internal argument */
    if (priority && priority !== prioritySymbol) {
      throw new TypeError('invalid priority parameter');
    }
    var listeners = config._event_listeners[eventName] || (config._event_listeners[eventName] = []);

    // Don't register the same callback more than once
    if (!inArray(callback, listeners)) {
      if (priority === prioritySymbol) {
        listeners.unshift(callback);
      } else {
        listeners.push(callback);
      }
      if (config._event_memory[eventName] !== undefined) {
        callback(config._event_memory[eventName]);
      }
    }
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var promisePolyfill = {exports: {}};

  (function () {

    /** @suppress {undefinedVars} */
    var globalNS = function () {
      // the only reliable means to get the global object is
      // `Function('return this')()`
      // However, this causes CSP violations in Chrome apps.
      if (typeof globalThis !== 'undefined') {
        return globalThis;
      }
      if (typeof self !== 'undefined') {
        return self;
      }
      if (typeof window !== 'undefined') {
        return window;
      }
      if (typeof commonjsGlobal !== 'undefined') {
        return commonjsGlobal;
      }
      throw new Error('unable to locate global object');
    }();

    // Expose the polyfill if Promise is undefined or set to a
    // non-function value. The latter can be due to a named HTMLElement
    // being exposed by browsers for legacy reasons.
    // https://github.com/taylorhakes/promise-polyfill/issues/114
    if (typeof globalNS['Promise'] === 'function') {
      promisePolyfill.exports = globalNS['Promise'];
      return;
    }

    /**
     * @this {Promise}
     */
    function finallyConstructor(callback) {
      var constructor = this.constructor;
      return this.then(function (value) {
        // @ts-ignore
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        // @ts-ignore
        return constructor.resolve(callback()).then(function () {
          // @ts-ignore
          return constructor.reject(reason);
        });
      });
    }
    function allSettled(arr) {
      var P = this;
      return new P(function (resolve, reject) {
        if (!(arr && typeof arr.length !== 'undefined')) {
          return reject(new TypeError(_typeof(arr) + ' ' + arr + ' is not iterable(cannot read property Symbol(Symbol.iterator))'));
        }
        var args = Array.prototype.slice.call(arr);
        if (args.length === 0) return resolve([]);
        var remaining = args.length;
        function res(i, val) {
          if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
            var then = val.then;
            if (typeof then === 'function') {
              then.call(val, function (val) {
                res(i, val);
              }, function (e) {
                args[i] = {
                  status: 'rejected',
                  reason: e
                };
                if (--remaining === 0) {
                  resolve(args);
                }
              });
              return;
            }
          }
          args[i] = {
            status: 'fulfilled',
            value: val
          };
          if (--remaining === 0) {
            resolve(args);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    }

    // Store setTimeout reference so promise-polyfill will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var setTimeoutFunc = setTimeout;
    function isArray(x) {
      return Boolean(x && typeof x.length !== 'undefined');
    }
    function noop() {}

    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
      return function () {
        fn.apply(thisArg, arguments);
      };
    }

    /**
     * @constructor
     * @param {Function} fn
     */
    function Promise(fn) {
      if (!(this instanceof Promise)) throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function') throw new TypeError('not a function');
      /** @type {!number} */
      this._state = 0;
      /** @type {!boolean} */
      this._handled = false;
      /** @type {Promise|undefined} */
      this._value = undefined;
      /** @type {!Array<!Function>} */
      this._deferreds = [];
      doResolve(fn, this);
    }
    function handle(self, deferred) {
      while (self._state === 3) {
        self = self._value;
      }
      if (self._state === 0) {
        self._deferreds.push(deferred);
        return;
      }
      self._handled = true;
      Promise._immediateFn(function () {
        var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
          return;
        }
        var ret;
        try {
          ret = cb(self._value);
        } catch (e) {
          reject(deferred.promise, e);
          return;
        }
        resolve(deferred.promise, ret);
      });
    }
    function resolve(self, newValue) {
      try {
        // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
        if (newValue === self) throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && (_typeof(newValue) === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (newValue instanceof Promise) {
            self._state = 3;
            self._value = newValue;
            finale(self);
            return;
          } else if (typeof then === 'function') {
            doResolve(bind(then, newValue), self);
            return;
          }
        }
        self._state = 1;
        self._value = newValue;
        finale(self);
      } catch (e) {
        reject(self, e);
      }
    }
    function reject(self, newValue) {
      self._state = 2;
      self._value = newValue;
      finale(self);
    }
    function finale(self) {
      if (self._state === 2 && self._deferreds.length === 0) {
        Promise._immediateFn(function () {
          if (!self._handled) {
            Promise._unhandledRejectionFn(self._value);
          }
        });
      }
      for (var i = 0, len = self._deferreds.length; i < len; i++) {
        handle(self, self._deferreds[i]);
      }
      self._deferreds = null;
    }

    /**
     * @constructor
     */
    function Handler(onFulfilled, onRejected, promise) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.promise = promise;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, self) {
      var done = false;
      try {
        fn(function (value) {
          if (done) return;
          done = true;
          resolve(self, value);
        }, function (reason) {
          if (done) return;
          done = true;
          reject(self, reason);
        });
      } catch (ex) {
        if (done) return;
        done = true;
        reject(self, ex);
      }
    }
    Promise.prototype['catch'] = function (onRejected) {
      return this.then(null, onRejected);
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
      // @ts-ignore
      var prom = new this.constructor(noop);
      handle(this, new Handler(onFulfilled, onRejected, prom));
      return prom;
    };
    Promise.prototype['finally'] = finallyConstructor;
    Promise.all = function (arr) {
      return new Promise(function (resolve, reject) {
        if (!isArray(arr)) {
          return reject(new TypeError('Promise.all accepts an array'));
        }
        var args = Array.prototype.slice.call(arr);
        if (args.length === 0) return resolve([]);
        var remaining = args.length;
        function res(i, val) {
          try {
            if (val && (_typeof(val) === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(val, function (val) {
                  res(i, val);
                }, reject);
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };
    Promise.allSettled = allSettled;
    Promise.resolve = function (value) {
      if (value && _typeof(value) === 'object' && value.constructor === Promise) {
        return value;
      }
      return new Promise(function (resolve) {
        resolve(value);
      });
    };
    Promise.reject = function (value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    };
    Promise.race = function (arr) {
      return new Promise(function (resolve, reject) {
        if (!isArray(arr)) {
          return reject(new TypeError('Promise.race accepts an array'));
        }
        for (var i = 0, len = arr.length; i < len; i++) {
          Promise.resolve(arr[i]).then(resolve, reject);
        }
      });
    };

    // Use polyfill for setImmediate for performance gains
    // @ts-ignore
    if (typeof setImmediate === 'function') {
      // @ts-ignore
      var setImmediateFunc = setImmediate;
      Promise._immediateFn = function (fn) {
        setImmediateFunc(fn);
      };
    } else {
      Promise._immediateFn = function (fn) {
        setTimeoutFunc(fn, 0);
      };
    }
    Promise._unhandledRejectionFn = function _unhandledRejectionFn(err) {
      if (typeof console !== 'undefined' && console) {
        console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
      }
    };
    promisePolyfill.exports = Promise;
  })();
  var promisePolyfillExports = promisePolyfill.exports;
  var _Promise = /*@__PURE__*/getDefaultExportFromCjs(promisePolyfillExports);

  function createRegisterCallbackFunction(key) {
    // Initialize key collection of callback
    if (typeof config.callbacks[key] === 'undefined') {
      config.callbacks[key] = [];
    }
    return function registerCallback(callback) {
      var priority = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (typeof callback !== 'function') {
        throw new TypeError('Callback parameter must be a function');
      }
      /* istanbul ignore if: internal argument */
      if (priority && priority !== prioritySymbol) {
        throw new TypeError('invalid priority parameter');
      }
      if (priority === prioritySymbol) {
        config.callbacks[key].unshift(callback);
      } else {
        config.callbacks[key].push(callback);
      }
    };
  }
  function runLoggingCallbacks(key, arg) {
    var callbacks = config.callbacks[key];

    // Handling 'log' callbacks separately. Unlike the other callbacks,
    // the log callback is not controlled by the processing queue,
    // but rather used by asserts. Hence to promisfy the 'log' callback
    // would mean promisfying each step of a test
    if (key === 'log') {
      callbacks.map(function (callback) {
        return callback(arg);
      });
      return;
    }

    // ensure that each callback is executed serially
    var promiseChain = _Promise.resolve();
    callbacks.forEach(function (callback) {
      promiseChain = promiseChain.then(function () {
        return _Promise.resolve(callback(arg));
      });
    });
    return promiseChain;
  }

  /* eslint-disable indent */

  /*
   * This file is a modified version of google-diff-match-patch's JavaScript implementation
   * (https://code.google.com/p/google-diff-match-patch/source/browse/trunk/javascript/diff_match_patch_uncompressed.js),
   * modifications are licensed as more fully set forth in LICENSE.txt.
   *
   * The original source of google-diff-match-patch is attributable and licensed as follows:
   *
   * Copyright 2006 Google Inc.
   * https://code.google.com/p/google-diff-match-patch/
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * https://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * More Info:
   *  https://code.google.com/p/google-diff-match-patch/
   *
   * Usage: QUnit.diff(expected, actual)
   *
   */
  function DiffMatchPatch() {}

  //  DIFF FUNCTIONS

  /**
   * The data structure representing a diff is an array of tuples:
   * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
   * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
   */
  var DIFF_DELETE = -1;
  var DIFF_INSERT = 1;
  var DIFF_EQUAL = 0;
  var hasOwn$2 = Object.prototype.hasOwnProperty;

  /**
   * Find the differences between two texts.  Simplifies the problem by stripping
   * any common prefix or suffix off the texts before diffing.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {boolean=} optChecklines Optional speedup flag. If present and false,
   *     then don't run a line-level diff first to identify the changed areas.
   *     Defaults to true, which does a faster, slightly less optimal diff.
   * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.
   */
  DiffMatchPatch.prototype.DiffMain = function (text1, text2, optChecklines) {
    // The diff must be complete in up to 1 second.
    var deadline = Date.now() + 1000;

    // Check for null inputs.
    if (text1 === null || text2 === null) {
      throw new Error('Cannot diff null input.');
    }

    // Check for equality (speedup).
    if (text1 === text2) {
      if (text1) {
        return [[DIFF_EQUAL, text1]];
      }
      return [];
    }
    if (typeof optChecklines === 'undefined') {
      optChecklines = true;
    }

    // Trim off common prefix (speedup).
    var commonlength = this.diffCommonPrefix(text1, text2);
    var commonprefix = text1.substring(0, commonlength);
    text1 = text1.substring(commonlength);
    text2 = text2.substring(commonlength);

    // Trim off common suffix (speedup).
    commonlength = this.diffCommonSuffix(text1, text2);
    var commonsuffix = text1.substring(text1.length - commonlength);
    text1 = text1.substring(0, text1.length - commonlength);
    text2 = text2.substring(0, text2.length - commonlength);

    // Compute the diff on the middle block.
    var diffs = this.diffCompute(text1, text2, optChecklines, deadline);

    // Restore the prefix and suffix.
    if (commonprefix) {
      diffs.unshift([DIFF_EQUAL, commonprefix]);
    }
    if (commonsuffix) {
      diffs.push([DIFF_EQUAL, commonsuffix]);
    }
    this.diffCleanupMerge(diffs);
    return diffs;
  };

  /**
   * Reduce the number of edits by eliminating operationally trivial equalities.
   * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.
   */
  DiffMatchPatch.prototype.diffCleanupEfficiency = function (diffs) {
    var changes, equalities, equalitiesLength, lastequality, pointer, preIns, preDel, postIns, postDel;
    changes = false;
    equalities = []; // Stack of indices where equalities are found.
    equalitiesLength = 0; // Keeping our own length var is faster in JS.
    /** @type {?string} */
    lastequality = null;

    // Always equal to diffs[equalities[equalitiesLength - 1]][1]
    pointer = 0; // Index of current position.

    // Is there an insertion operation before the last equality.
    preIns = false;

    // Is there a deletion operation before the last equality.
    preDel = false;

    // Is there an insertion operation after the last equality.
    postIns = false;

    // Is there a deletion operation after the last equality.
    postDel = false;
    while (pointer < diffs.length) {
      // Equality found.
      if (diffs[pointer][0] === DIFF_EQUAL) {
        if (diffs[pointer][1].length < 4 && (postIns || postDel)) {
          // Candidate found.
          equalities[equalitiesLength++] = pointer;
          preIns = postIns;
          preDel = postDel;
          lastequality = diffs[pointer][1];
        } else {
          // Not a candidate, and can never become one.
          equalitiesLength = 0;
          lastequality = null;
        }
        postIns = postDel = false;

        // An insertion or deletion.
      } else {
        if (diffs[pointer][0] === DIFF_DELETE) {
          postDel = true;
        } else {
          postIns = true;
        }

        /*
         * Five types to be split:
         * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
         * <ins>A</ins>X<ins>C</ins><del>D</del>
         * <ins>A</ins><del>B</del>X<ins>C</ins>
         * <ins>A</del>X<ins>C</ins><del>D</del>
         * <ins>A</ins><del>B</del>X<del>C</del>
         */
        if (lastequality && (preIns && preDel && postIns && postDel || lastequality.length < 2 && preIns + preDel + postIns + postDel === 3)) {
          // Duplicate record.
          diffs.splice(equalities[equalitiesLength - 1], 0, [DIFF_DELETE, lastequality]);

          // Change second copy to insert.
          diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
          equalitiesLength--; // Throw away the equality we just deleted;
          lastequality = null;
          if (preIns && preDel) {
            // No changes made which could affect previous entry, keep going.
            postIns = postDel = true;
            equalitiesLength = 0;
          } else {
            equalitiesLength--; // Throw away the previous equality.
            pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
            postIns = postDel = false;
          }
          changes = true;
        }
      }
      pointer++;
    }
    if (changes) {
      this.diffCleanupMerge(diffs);
    }
  };

  /**
   * Convert a diff array into a pretty HTML report.
   * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.
   * @param {integer} string to be beautified.
   * @return {string} HTML representation.
   */
  DiffMatchPatch.prototype.diffPrettyHtml = function (diffs) {
    var html = [];
    for (var x = 0; x < diffs.length; x++) {
      var op = diffs[x][0]; // Operation (insert, delete, equal)
      var data = diffs[x][1]; // Text of change.
      switch (op) {
        case DIFF_INSERT:
          html[x] = '<ins>' + escapeText(data) + '</ins>';
          break;
        case DIFF_DELETE:
          html[x] = '<del>' + escapeText(data) + '</del>';
          break;
        case DIFF_EQUAL:
          html[x] = '<span>' + escapeText(data) + '</span>';
          break;
      }
    }
    return html.join('');
  };

  /**
   * Determine the common prefix of two strings.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {number} The number of characters common to the start of each
   *     string.
   */
  DiffMatchPatch.prototype.diffCommonPrefix = function (text1, text2) {
    var pointermid, pointermax, pointermin, pointerstart;

    // Quick check for common null cases.
    if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
      return 0;
    }

    // Binary search.
    // Performance analysis: https://neil.fraser.name/news/2007/10/09/
    pointermin = 0;
    pointermax = Math.min(text1.length, text2.length);
    pointermid = pointermax;
    pointerstart = 0;
    while (pointermin < pointermid) {
      if (text1.substring(pointerstart, pointermid) === text2.substring(pointerstart, pointermid)) {
        pointermin = pointermid;
        pointerstart = pointermin;
      } else {
        pointermax = pointermid;
      }
      pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
    }
    return pointermid;
  };

  /**
   * Determine the common suffix of two strings.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {number} The number of characters common to the end of each string.
   */
  DiffMatchPatch.prototype.diffCommonSuffix = function (text1, text2) {
    var pointermid, pointermax, pointermin, pointerend;

    // Quick check for common null cases.
    if (!text1 || !text2 || text1.charAt(text1.length - 1) !== text2.charAt(text2.length - 1)) {
      return 0;
    }

    // Binary search.
    // Performance analysis: https://neil.fraser.name/news/2007/10/09/
    pointermin = 0;
    pointermax = Math.min(text1.length, text2.length);
    pointermid = pointermax;
    pointerend = 0;
    while (pointermin < pointermid) {
      if (text1.substring(text1.length - pointermid, text1.length - pointerend) === text2.substring(text2.length - pointermid, text2.length - pointerend)) {
        pointermin = pointermid;
        pointerend = pointermin;
      } else {
        pointermax = pointermid;
      }
      pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
    }
    return pointermid;
  };

  /**
   * Find the differences between two texts.  Assumes that the texts do not
   * have any common prefix or suffix.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {boolean} checklines Speedup flag.  If false, then don't run a
   *     line-level diff first to identify the changed areas.
   *     If true, then run a faster, slightly less optimal diff.
   * @param {number} deadline Time when the diff should be complete by.
   * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.
   * @private
   */
  DiffMatchPatch.prototype.diffCompute = function (text1, text2, checklines, deadline) {
    var diffs, longtext, shorttext, i, hm, text1A, text2A, text1B, text2B, midCommon, diffsA, diffsB;
    if (!text1) {
      // Just add some text (speedup).
      return [[DIFF_INSERT, text2]];
    }
    if (!text2) {
      // Just delete some text (speedup).
      return [[DIFF_DELETE, text1]];
    }
    longtext = text1.length > text2.length ? text1 : text2;
    shorttext = text1.length > text2.length ? text2 : text1;
    i = longtext.indexOf(shorttext);
    if (i !== -1) {
      // Shorter text is inside the longer text (speedup).
      diffs = [[DIFF_INSERT, longtext.substring(0, i)], [DIFF_EQUAL, shorttext], [DIFF_INSERT, longtext.substring(i + shorttext.length)]];

      // Swap insertions for deletions if diff is reversed.
      if (text1.length > text2.length) {
        diffs[0][0] = diffs[2][0] = DIFF_DELETE;
      }
      return diffs;
    }
    if (shorttext.length === 1) {
      // Single character string.
      // After the previous speedup, the character can't be an equality.
      return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
    }

    // Check to see if the problem can be split in two.
    hm = this.diffHalfMatch(text1, text2);
    if (hm) {
      // A half-match was found, sort out the return data.
      text1A = hm[0];
      text1B = hm[1];
      text2A = hm[2];
      text2B = hm[3];
      midCommon = hm[4];

      // Send both pairs off for separate processing.
      diffsA = this.DiffMain(text1A, text2A, checklines, deadline);
      diffsB = this.DiffMain(text1B, text2B, checklines, deadline);

      // Merge the results.
      return diffsA.concat([[DIFF_EQUAL, midCommon]], diffsB);
    }
    if (checklines && text1.length > 100 && text2.length > 100) {
      return this.diffLineMode(text1, text2, deadline);
    }
    return this.diffBisect(text1, text2, deadline);
  };

  /**
   * Do the two texts share a substring which is at least half the length of the
   * longer text?
   * This speedup can produce non-minimal diffs.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     text1, the suffix of text1, the prefix of text2, the suffix of
   *     text2 and the common middle.  Or null if there was no match.
   * @private
   */
  DiffMatchPatch.prototype.diffHalfMatch = function (text1, text2) {
    var longtext, shorttext, dmp, text1A, text2B, text2A, text1B, midCommon, hm1, hm2, hm;
    longtext = text1.length > text2.length ? text1 : text2;
    shorttext = text1.length > text2.length ? text2 : text1;
    if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
      return null; // Pointless.
    }
    dmp = this; // 'this' becomes 'window' in a closure.

    /**
     * Does a substring of shorttext exist within longtext such that the substring
     * is at least half the length of longtext?
     * Closure, but does not reference any external variables.
     * @param {string} longtext Longer string.
     * @param {string} shorttext Shorter string.
     * @param {number} i Start index of quarter length substring within longtext.
     * @return {Array.<string>} Five element Array, containing the prefix of
     *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
     *     of shorttext and the common middle.  Or null if there was no match.
     * @private
     */
    function diffHalfMatchI(longtext, shorttext, i) {
      var seed, j, bestCommon, prefixLength, suffixLength, bestLongtextA, bestLongtextB, bestShorttextA, bestShorttextB;

      // Start with a 1/4 length substring at position i as a seed.
      seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
      j = -1;
      bestCommon = '';
      while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {
        prefixLength = dmp.diffCommonPrefix(longtext.substring(i), shorttext.substring(j));
        suffixLength = dmp.diffCommonSuffix(longtext.substring(0, i), shorttext.substring(0, j));
        if (bestCommon.length < suffixLength + prefixLength) {
          bestCommon = shorttext.substring(j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
          bestLongtextA = longtext.substring(0, i - suffixLength);
          bestLongtextB = longtext.substring(i + prefixLength);
          bestShorttextA = shorttext.substring(0, j - suffixLength);
          bestShorttextB = shorttext.substring(j + prefixLength);
        }
      }
      if (bestCommon.length * 2 >= longtext.length) {
        return [bestLongtextA, bestLongtextB, bestShorttextA, bestShorttextB, bestCommon];
      } else {
        return null;
      }
    }

    // First check if the second quarter is the seed for a half-match.
    hm1 = diffHalfMatchI(longtext, shorttext, Math.ceil(longtext.length / 4));

    // Check again based on the third quarter.
    hm2 = diffHalfMatchI(longtext, shorttext, Math.ceil(longtext.length / 2));
    if (!hm1 && !hm2) {
      return null;
    } else if (!hm2) {
      hm = hm1;
    } else if (!hm1) {
      hm = hm2;
    } else {
      // Both matched.  Select the longest.
      hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
    }

    // A half-match was found, sort out the return data.
    if (text1.length > text2.length) {
      text1A = hm[0];
      text1B = hm[1];
      text2A = hm[2];
      text2B = hm[3];
    } else {
      text2A = hm[0];
      text2B = hm[1];
      text1A = hm[2];
      text1B = hm[3];
    }
    midCommon = hm[4];
    return [text1A, text1B, text2A, text2B, midCommon];
  };

  /**
   * Do a quick line-level diff on both strings, then rediff the parts for
   * greater accuracy.
   * This speedup can produce non-minimal diffs.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {number} deadline Time when the diff should be complete by.
   * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.
   * @private
   */
  DiffMatchPatch.prototype.diffLineMode = function (text1, text2, deadline) {
    var a, diffs, linearray, pointer, countInsert, countDelete, textInsert, textDelete, j;

    // Scan the text on a line-by-line basis first.
    a = this.diffLinesToChars(text1, text2);
    text1 = a.chars1;
    text2 = a.chars2;
    linearray = a.lineArray;
    diffs = this.DiffMain(text1, text2, false, deadline);

    // Convert the diff back to original text.
    this.diffCharsToLines(diffs, linearray);

    // Eliminate freak matches (e.g. blank lines)
    this.diffCleanupSemantic(diffs);

    // Rediff any replacement blocks, this time character-by-character.
    // Add a dummy entry at the end.
    diffs.push([DIFF_EQUAL, '']);
    pointer = 0;
    countDelete = 0;
    countInsert = 0;
    textDelete = '';
    textInsert = '';
    while (pointer < diffs.length) {
      switch (diffs[pointer][0]) {
        case DIFF_INSERT:
          countInsert++;
          textInsert += diffs[pointer][1];
          break;
        case DIFF_DELETE:
          countDelete++;
          textDelete += diffs[pointer][1];
          break;
        case DIFF_EQUAL:
          // Upon reaching an equality, check for prior redundancies.
          if (countDelete >= 1 && countInsert >= 1) {
            // Delete the offending records and add the merged ones.
            diffs.splice(pointer - countDelete - countInsert, countDelete + countInsert);
            pointer = pointer - countDelete - countInsert;
            a = this.DiffMain(textDelete, textInsert, false, deadline);
            for (j = a.length - 1; j >= 0; j--) {
              diffs.splice(pointer, 0, a[j]);
            }
            pointer = pointer + a.length;
          }
          countInsert = 0;
          countDelete = 0;
          textDelete = '';
          textInsert = '';
          break;
      }
      pointer++;
    }
    diffs.pop(); // Remove the dummy entry at the end.

    return diffs;
  };

  /**
   * Find the 'middle snake' of a diff, split the problem in two
   * and return the recursively constructed diff.
   * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {number} deadline Time at which to bail if not yet complete.
   * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.
   * @private
   */
  DiffMatchPatch.prototype.diffBisect = function (text1, text2, deadline) {
    var text1Length, text2Length, maxD, vOffset, vLength, v1, v2, x, delta, front, k1start, k1end, k2start, k2end, k2Offset, k1Offset, x1, x2, y1, y2, d, k1, k2;

    // Cache the text lengths to prevent multiple calls.
    text1Length = text1.length;
    text2Length = text2.length;
    maxD = Math.ceil((text1Length + text2Length) / 2);
    vOffset = maxD;
    vLength = 2 * maxD;
    v1 = new Array(vLength);
    v2 = new Array(vLength);

    // Setting all elements to -1 is faster in Chrome & Firefox than mixing
    // integers and undefined.
    for (x = 0; x < vLength; x++) {
      v1[x] = -1;
      v2[x] = -1;
    }
    v1[vOffset + 1] = 0;
    v2[vOffset + 1] = 0;
    delta = text1Length - text2Length;

    // If the total number of characters is odd, then the front path will collide
    // with the reverse path.
    front = delta % 2 !== 0;

    // Offsets for start and end of k loop.
    // Prevents mapping of space beyond the grid.
    k1start = 0;
    k1end = 0;
    k2start = 0;
    k2end = 0;
    for (d = 0; d < maxD; d++) {
      // Bail out if deadline is reached.
      if (Date.now() > deadline) {
        break;
      }

      // Walk the front path one step.
      for (k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
        k1Offset = vOffset + k1;
        if (k1 === -d || k1 !== d && v1[k1Offset - 1] < v1[k1Offset + 1]) {
          x1 = v1[k1Offset + 1];
        } else {
          x1 = v1[k1Offset - 1] + 1;
        }
        y1 = x1 - k1;
        while (x1 < text1Length && y1 < text2Length && text1.charAt(x1) === text2.charAt(y1)) {
          x1++;
          y1++;
        }
        v1[k1Offset] = x1;
        if (x1 > text1Length) {
          // Ran off the right of the graph.
          k1end += 2;
        } else if (y1 > text2Length) {
          // Ran off the bottom of the graph.
          k1start += 2;
        } else if (front) {
          k2Offset = vOffset + delta - k1;
          if (k2Offset >= 0 && k2Offset < vLength && v2[k2Offset] !== -1) {
            // Mirror x2 onto top-left coordinate system.
            x2 = text1Length - v2[k2Offset];
            if (x1 >= x2) {
              // Overlap detected.
              return this.diffBisectSplit(text1, text2, x1, y1, deadline);
            }
          }
        }
      }

      // Walk the reverse path one step.
      for (k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
        k2Offset = vOffset + k2;
        if (k2 === -d || k2 !== d && v2[k2Offset - 1] < v2[k2Offset + 1]) {
          x2 = v2[k2Offset + 1];
        } else {
          x2 = v2[k2Offset - 1] + 1;
        }
        y2 = x2 - k2;
        while (x2 < text1Length && y2 < text2Length && text1.charAt(text1Length - x2 - 1) === text2.charAt(text2Length - y2 - 1)) {
          x2++;
          y2++;
        }
        v2[k2Offset] = x2;
        if (x2 > text1Length) {
          // Ran off the left of the graph.
          k2end += 2;
        } else if (y2 > text2Length) {
          // Ran off the top of the graph.
          k2start += 2;
        } else if (!front) {
          k1Offset = vOffset + delta - k2;
          if (k1Offset >= 0 && k1Offset < vLength && v1[k1Offset] !== -1) {
            x1 = v1[k1Offset];
            y1 = vOffset + x1 - k1Offset;

            // Mirror x2 onto top-left coordinate system.
            x2 = text1Length - x2;
            if (x1 >= x2) {
              // Overlap detected.
              return this.diffBisectSplit(text1, text2, x1, y1, deadline);
            }
          }
        }
      }
    }

    // Diff took too long and hit the deadline or
    // number of diffs equals number of characters, no commonality at all.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  };

  /**
   * Given the location of the 'middle snake', split the diff in two parts
   * and recurse.
   * @param {string} text1 Old string to be diffed.
   * @param {string} text2 New string to be diffed.
   * @param {number} x Index of split point in text1.
   * @param {number} y Index of split point in text2.
   * @param {number} deadline Time at which to bail if not yet complete.
   * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.
   * @private
   */
  DiffMatchPatch.prototype.diffBisectSplit = function (text1, text2, x, y, deadline) {
    var text1a, text1b, text2a, text2b, diffs, diffsb;
    text1a = text1.substring(0, x);
    text2a = text2.substring(0, y);
    text1b = text1.substring(x);
    text2b = text2.substring(y);

    // Compute both diffs serially.
    diffs = this.DiffMain(text1a, text2a, false, deadline);
    diffsb = this.DiffMain(text1b, text2b, false, deadline);
    return diffs.concat(diffsb);
  };

  /**
   * Reduce the number of edits by eliminating semantically trivial equalities.
   * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.
   */
  DiffMatchPatch.prototype.diffCleanupSemantic = function (diffs) {
    var changes = false;
    var equalities = []; // Stack of indices where equalities are found.
    var equalitiesLength = 0; // Keeping our own length var is faster in JS.
    /** @type {?string} */
    var lastequality = null;

    // Always equal to diffs[equalities[equalitiesLength - 1]][1]
    var pointer = 0; // Index of current position.

    // Number of characters that changed prior to the equality.
    var lengthInsertions1 = 0;
    var lengthDeletions1 = 0;

    // Number of characters that changed after the equality.
    var lengthInsertions2 = 0;
    var lengthDeletions2 = 0;
    while (pointer < diffs.length) {
      if (diffs[pointer][0] === DIFF_EQUAL) {
        // Equality found.
        equalities[equalitiesLength++] = pointer;
        lengthInsertions1 = lengthInsertions2;
        lengthDeletions1 = lengthDeletions2;
        lengthInsertions2 = 0;
        lengthDeletions2 = 0;
        lastequality = diffs[pointer][1];
      } else {
        // An insertion or deletion.
        if (diffs[pointer][0] === DIFF_INSERT) {
          lengthInsertions2 += diffs[pointer][1].length;
        } else {
          lengthDeletions2 += diffs[pointer][1].length;
        }

        // Eliminate an equality that is smaller or equal to the edits on both
        // sides of it.
        if (lastequality && lastequality.length <= Math.max(lengthInsertions1, lengthDeletions1) && lastequality.length <= Math.max(lengthInsertions2, lengthDeletions2)) {
          // Duplicate record.
          diffs.splice(equalities[equalitiesLength - 1], 0, [DIFF_DELETE, lastequality]);

          // Change second copy to insert.
          diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;

          // Throw away the equality we just deleted.
          equalitiesLength--;

          // Throw away the previous equality (it needs to be reevaluated).
          equalitiesLength--;
          pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;

          // Reset the counters.
          lengthInsertions1 = 0;
          lengthDeletions1 = 0;
          lengthInsertions2 = 0;
          lengthDeletions2 = 0;
          lastequality = null;
          changes = true;
        }
      }
      pointer++;
    }

    // Normalize the diff.
    if (changes) {
      this.diffCleanupMerge(diffs);
    }
    var deletion, insertion, overlapLength1, overlapLength2;

    // Find any overlaps between deletions and insertions.
    // e.g: <del>abcxxx</del><ins>xxxdef</ins>
    //   -> <del>abc</del>xxx<ins>def</ins>
    // e.g: <del>xxxabc</del><ins>defxxx</ins>
    //   -> <ins>def</ins>xxx<del>abc</del>
    // Only extract an overlap if it is as big as the edit ahead or behind it.
    pointer = 1;
    while (pointer < diffs.length) {
      if (diffs[pointer - 1][0] === DIFF_DELETE && diffs[pointer][0] === DIFF_INSERT) {
        deletion = diffs[pointer - 1][1];
        insertion = diffs[pointer][1];
        overlapLength1 = this.diffCommonOverlap(deletion, insertion);
        overlapLength2 = this.diffCommonOverlap(insertion, deletion);
        if (overlapLength1 >= overlapLength2) {
          if (overlapLength1 >= deletion.length / 2 || overlapLength1 >= insertion.length / 2) {
            // Overlap found.  Insert an equality and trim the surrounding edits.
            diffs.splice(pointer, 0, [DIFF_EQUAL, insertion.substring(0, overlapLength1)]);
            diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlapLength1);
            diffs[pointer + 1][1] = insertion.substring(overlapLength1);
            pointer++;
          }
        } else {
          if (overlapLength2 >= deletion.length / 2 || overlapLength2 >= insertion.length / 2) {
            // Reverse overlap found.
            // Insert an equality and swap and trim the surrounding edits.
            diffs.splice(pointer, 0, [DIFF_EQUAL, deletion.substring(0, overlapLength2)]);
            diffs[pointer - 1][0] = DIFF_INSERT;
            diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlapLength2);
            diffs[pointer + 1][0] = DIFF_DELETE;
            diffs[pointer + 1][1] = deletion.substring(overlapLength2);
            pointer++;
          }
        }
        pointer++;
      }
      pointer++;
    }
  };

  /**
   * Determine if the suffix of one string is the prefix of another.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {number} The number of characters common to the end of the first
   *     string and the start of the second string.
   * @private
   */
  DiffMatchPatch.prototype.diffCommonOverlap = function (text1, text2) {
    // Cache the text lengths to prevent multiple calls.
    var text1Length = text1.length;
    var text2Length = text2.length;

    // Eliminate the null case.
    if (text1Length === 0 || text2Length === 0) {
      return 0;
    }

    // Truncate the longer string.
    if (text1Length > text2Length) {
      text1 = text1.substring(text1Length - text2Length);
    } else if (text1Length < text2Length) {
      text2 = text2.substring(0, text1Length);
    }
    var textLength = Math.min(text1Length, text2Length);

    // Quick check for the worst case.
    if (text1 === text2) {
      return textLength;
    }

    // Start by looking for a single character match
    // and increase length until no match is found.
    // Performance analysis: https://neil.fraser.name/news/2010/11/04/
    var best = 0;
    var length = 1;
    while (true) {
      var pattern = text1.substring(textLength - length);
      var found = text2.indexOf(pattern);
      if (found === -1) {
        return best;
      }
      length += found;
      if (found === 0 || text1.substring(textLength - length) === text2.substring(0, length)) {
        best = length;
        length++;
      }
    }
  };

  /**
   * Split two texts into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * @param {string} text1 First string.
   * @param {string} text2 Second string.
   * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
   *     An object containing the encoded text1, the encoded text2 and
   *     the array of unique strings.
   *     The zeroth element of the array of unique strings is intentionally blank.
   * @private
   */
  DiffMatchPatch.prototype.diffLinesToChars = function (text1, text2) {
    var lineArray = []; // E.g. lineArray[4] === 'Hello\n'
    var lineHash = {}; // E.g. lineHash['Hello\n'] === 4

    // '\x00' is a valid character, but various debuggers don't like it.
    // So we'll insert a junk entry to avoid generating a null character.
    lineArray[0] = '';

    /**
     * Split a text into an array of strings.  Reduce the texts to a string of
     * hashes where each Unicode character represents one line.
     * Modifies linearray and linehash through being a closure.
     * @param {string} text String to encode.
     * @return {string} Encoded string.
     * @private
     */
    function diffLinesToCharsMunge(text) {
      var chars = '';

      // Walk the text, pulling out a substring for each line.
      // text.split('\n') would would temporarily double our memory footprint.
      // Modifying text would create many large strings to garbage collect.
      var lineStart = 0;
      var lineEnd = -1;

      // Keeping our own length variable is faster than looking it up.
      var lineArrayLength = lineArray.length;
      while (lineEnd < text.length - 1) {
        lineEnd = text.indexOf('\n', lineStart);
        if (lineEnd === -1) {
          lineEnd = text.length - 1;
        }
        var line = text.substring(lineStart, lineEnd + 1);
        lineStart = lineEnd + 1;
        if (hasOwn$2.call(lineHash, line)) {
          chars += String.fromCharCode(lineHash[line]);
        } else {
          chars += String.fromCharCode(lineArrayLength);
          lineHash[line] = lineArrayLength;
          lineArray[lineArrayLength++] = line;
        }
      }
      return chars;
    }
    var chars1 = diffLinesToCharsMunge(text1);
    var chars2 = diffLinesToCharsMunge(text2);
    return {
      chars1: chars1,
      chars2: chars2,
      lineArray: lineArray
    };
  };

  /**
   * Rehydrate the text in a diff from a string of line hashes to real lines of
   * text.
   * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.
   * @param {!Array.<string>} lineArray Array of unique strings.
   * @private
   */
  DiffMatchPatch.prototype.diffCharsToLines = function (diffs, lineArray) {
    for (var x = 0; x < diffs.length; x++) {
      var chars = diffs[x][1];
      var text = [];
      for (var y = 0; y < chars.length; y++) {
        text[y] = lineArray[chars.charCodeAt(y)];
      }
      diffs[x][1] = text.join('');
    }
  };

  /**
   * Reorder and merge like edit sections.  Merge equalities.
   * Any edit section can move as long as it doesn't cross an equality.
   * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.
   */
  DiffMatchPatch.prototype.diffCleanupMerge = function (diffs) {
    diffs.push([DIFF_EQUAL, '']); // Add a dummy entry at the end.
    var pointer = 0;
    var countDelete = 0;
    var countInsert = 0;
    var textDelete = '';
    var textInsert = '';
    while (pointer < diffs.length) {
      switch (diffs[pointer][0]) {
        case DIFF_INSERT:
          countInsert++;
          textInsert += diffs[pointer][1];
          pointer++;
          break;
        case DIFF_DELETE:
          countDelete++;
          textDelete += diffs[pointer][1];
          pointer++;
          break;
        case DIFF_EQUAL:
          // Upon reaching an equality, check for prior redundancies.
          if (countDelete + countInsert > 1) {
            if (countDelete !== 0 && countInsert !== 0) {
              // Factor out any common prefixes.
              var commonlength = this.diffCommonPrefix(textInsert, textDelete);
              if (commonlength !== 0) {
                if (pointer - countDelete - countInsert > 0 && diffs[pointer - countDelete - countInsert - 1][0] === DIFF_EQUAL) {
                  diffs[pointer - countDelete - countInsert - 1][1] += textInsert.substring(0, commonlength);
                } else {
                  diffs.splice(0, 0, [DIFF_EQUAL, textInsert.substring(0, commonlength)]);
                  pointer++;
                }
                textInsert = textInsert.substring(commonlength);
                textDelete = textDelete.substring(commonlength);
              }

              // Factor out any common suffixies.
              commonlength = this.diffCommonSuffix(textInsert, textDelete);
              if (commonlength !== 0) {
                diffs[pointer][1] = textInsert.substring(textInsert.length - commonlength) + diffs[pointer][1];
                textInsert = textInsert.substring(0, textInsert.length - commonlength);
                textDelete = textDelete.substring(0, textDelete.length - commonlength);
              }
            }

            // Delete the offending records and add the merged ones.
            if (countDelete === 0) {
              diffs.splice(pointer - countInsert, countDelete + countInsert, [DIFF_INSERT, textInsert]);
            } else if (countInsert === 0) {
              diffs.splice(pointer - countDelete, countDelete + countInsert, [DIFF_DELETE, textDelete]);
            } else {
              diffs.splice(pointer - countDelete - countInsert, countDelete + countInsert, [DIFF_DELETE, textDelete], [DIFF_INSERT, textInsert]);
            }
            pointer = pointer - countDelete - countInsert + (countDelete ? 1 : 0) + (countInsert ? 1 : 0) + 1;
          } else if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
            // Merge this equality with the previous one.
            diffs[pointer - 1][1] += diffs[pointer][1];
            diffs.splice(pointer, 1);
          } else {
            pointer++;
          }
          countInsert = 0;
          countDelete = 0;
          textDelete = '';
          textInsert = '';
          break;
      }
    }
    if (diffs[diffs.length - 1][1] === '') {
      diffs.pop(); // Remove the dummy entry at the end.
    }

    // Second pass: look for single edits surrounded on both sides by equalities
    // which can be shifted sideways to eliminate an equality.
    // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
    var changes = false;
    pointer = 1;

    // Intentionally ignore the first and last element (don't need checking).
    while (pointer < diffs.length - 1) {
      if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
        var diffPointer = diffs[pointer][1];
        var position = diffPointer.substring(diffPointer.length - diffs[pointer - 1][1].length);

        // This is a single edit surrounded by equalities.
        if (position === diffs[pointer - 1][1]) {
          // Shift the edit over the previous equality.
          diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
          diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
          diffs.splice(pointer - 1, 1);
          changes = true;
        } else if (diffPointer.substring(0, diffs[pointer + 1][1].length) === diffs[pointer + 1][1]) {
          // Shift the edit over the next equality.
          diffs[pointer - 1][1] += diffs[pointer + 1][1];
          diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
          diffs.splice(pointer + 1, 1);
          changes = true;
        }
      }
      pointer++;
    }

    // If shifts were made, the diff needs reordering and another shift sweep.
    if (changes) {
      this.diffCleanupMerge(diffs);
    }
  };
  function diff(o, n) {
    var diff, output, text;
    diff = new DiffMatchPatch();
    output = diff.DiffMain(o, n);
    diff.diffCleanupEfficiency(output);
    text = diff.diffPrettyHtml(output);
    return text;
  }

  function makeAddGlobalHook(hookName) {
    return function addGlobalHook(callback) {
      if (!config._globalHooks[hookName]) {
        config._globalHooks[hookName] = [];
      }
      config._globalHooks[hookName].push(callback);
    };
  }
  var hooks = {
    beforeEach: makeAddGlobalHook('beforeEach'),
    afterEach: makeAddGlobalHook('afterEach')
  };

  var SuiteReport = /*#__PURE__*/function () {
    function SuiteReport(name, parentSuite) {
      _classCallCheck(this, SuiteReport);
      this.name = name;
      this.fullName = parentSuite ? parentSuite.fullName.concat(name) : [];

      // When an "error" event is emitted from onUncaughtException(), the
      // "runEnd" event should report the status as failed. The "runEnd" event data
      // is tracked through this property (via the "globalSuiteReport" instance).
      this.globalFailureCount = 0;
      this.tests = [];
      this.childSuites = [];
      if (parentSuite) {
        parentSuite.pushChildSuite(this);
      }
    }
    return _createClass(SuiteReport, [{
      key: "start",
      value: function start(recordTime) {
        if (recordTime) {
          this._startTime = performance.now();
        }
        return {
          name: this.name,
          fullName: this.fullName.slice(),
          tests: this.tests.map(function (test) {
            return test.start();
          }),
          childSuites: this.childSuites.map(function (suite) {
            return suite.start();
          }),
          testCounts: {
            // TODO: Due to code reuse, this ends up computing getStatus()
            // for tests that obviously haven't run yet. It's harmless but
            // quite inefficient recursion, that we repeat many times over
            // also via test.start() and suite.start() above.
            total: this.getTestCounts().total
          }
        };
      }
    }, {
      key: "end",
      value: function end(recordTime) {
        if (recordTime) {
          this._endTime = performance.now();
        }
        return {
          name: this.name,
          fullName: this.fullName.slice(),
          tests: this.tests.map(function (test) {
            return test.end();
          }),
          childSuites: this.childSuites.map(function (suite) {
            return suite.end();
          }),
          testCounts: this.getTestCounts(),
          runtime: this.getRuntime(),
          status: this.getStatus()
        };
      }
    }, {
      key: "pushChildSuite",
      value: function pushChildSuite(suite) {
        this.childSuites.push(suite);
      }
    }, {
      key: "pushTest",
      value: function pushTest(test) {
        this.tests.push(test);
      }
    }, {
      key: "getRuntime",
      value: function getRuntime() {
        return Math.round(this._endTime - this._startTime);
      }
    }, {
      key: "getTestCounts",
      value: function getTestCounts() {
        var counts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          passed: 0,
          failed: 0,
          skipped: 0,
          todo: 0,
          total: 0
        };
        counts.failed += this.globalFailureCount;
        counts.total += this.globalFailureCount;
        counts = this.tests.reduce(function (counts, test) {
          if (test.valid) {
            counts[test.getStatus()]++;
            counts.total++;
          }
          return counts;
        }, counts);
        return this.childSuites.reduce(function (counts, suite) {
          return suite.getTestCounts(counts);
        }, counts);
      }
    }, {
      key: "getStatus",
      value: function getStatus() {
        var _this$getTestCounts = this.getTestCounts(),
          total = _this$getTestCounts.total,
          failed = _this$getTestCounts.failed,
          skipped = _this$getTestCounts.skipped,
          todo = _this$getTestCounts.todo;
        if (failed) {
          return 'failed';
        } else {
          if (skipped === total) {
            return 'skipped';
          } else if (todo === total) {
            return 'todo';
          } else {
            return 'passed';
          }
        }
      }
    }]);
  }();

  var globalSuiteReport = new SuiteReport();

  // This also pushes the unnamed module to config.modules.
  // It is important that we not push this into the moduleStack,
  // since it is not meant to be a parent to any other modules.
  var unnamedModule = createModule('', {}, {}, globalSuiteReport);
  function isParentModuleInQueue() {
    var modulesInQueue = config.modules.filter(function (module) {
      return !module.ignored;
    }).map(function (module) {
      return module.moduleId;
    });
    return config._moduleStack.some(function (module) {
      return modulesInQueue.includes(module.moduleId);
    });
  }

  /**
   * This does:
   * - Create a module object
   * - Link it to and from a parent module (if one is on the stack)
   * - Link it to a parent SuiteReport (if one is on the stack)
   * - Push it to `config.modules`
   *
   * It does NOT push it to config._moduleStack. That's only relevant for
   * scoped modules, and is the responsibility of processModule().
   *
   * @param {string} name
   * @param {Object} testEnvironment
   * @param {Object} modifiers
   * @param {SuiteReport} suiteReport Force the report, for use by the initial unnamedModule
   * @return {Object}
   */
  function createModule(name, testEnvironment, modifiers, suiteReport) {
    var parentModule = config._moduleStack.length ? config._moduleStack[config._moduleStack.length - 1] : null;
    var moduleName = parentModule !== null ? [parentModule.name, name].join(' > ') : name;
    var skip = parentModule !== null && parentModule.skip || modifiers.skip;
    var todo = parentModule !== null && parentModule.todo || modifiers.todo;
    var module = {
      name: moduleName,
      parentModule: parentModule,
      hooks: {
        before: [],
        beforeEach: [],
        afterEach: [],
        after: []
      },
      testEnvironment: extend(
      // Live inheritence as of QUnit 3. https://github.com/qunitjs/qunit/pull/1762
      parentModule ? Object.create(parentModule.testEnvironment || {}) : {}, testEnvironment),
      tests: [],
      moduleId: generateHash(moduleName),
      testsRun: 0,
      testsIgnored: 0,
      childModules: [],
      suiteReport: suiteReport || new SuiteReport(name, parentModule ? parentModule.suiteReport : globalSuiteReport),
      // Initialised by test.js when the module start executing,
      // i.e. before the first test in this module (or a child).
      stats: null,
      // Pass along `skip` and `todo` properties from parent module, in case
      // there is one, to childs. And use own otherwise.
      // This property will be used to mark own tests and tests of child suites
      // as either `skipped` or `todo`.
      skip: skip,
      todo: skip ? false : todo,
      ignored: modifiers.ignored || false
    };
    if (parentModule) {
      parentModule.childModules.push(module);
    }
    config.modules.push(module);
    return module;
  }
  function setHookFromEnvironment(environment, hooks, name) {
    var potentialHook = environment[name];
    if (typeof potentialHook === 'function') {
      hooks[name].push(potentialHook);
    }
    delete environment[name];
  }
  function makeSetHook(module, hookName) {
    return function setHook(callback) {
      if (config.currentModule !== module) {
        throw new Error("Cannot add ".concat(hookName, " hook outside the containing module. Called on \"").concat(module.name, "\", instead of expected \"").concat(config.currentModule.name, "\". https://qunitjs.com/api/QUnit/module/#E0002"));
      }
      module.hooks[hookName].push(callback);
    };
  }
  function processModule(name, options, scope) {
    var modifiers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (typeof options === 'function') {
      scope = options;
      options = undefined;
    }
    if (isAsyncFunction(scope)) {
      throw new TypeError('QUnit.module() callback must not be async. For async module setup, use hooks. https://qunitjs.com/api/QUnit/module/#hooks');
    }
    var module = createModule(name, options, modifiers);

    // Transfer any initial hooks from the options object to the 'hooks' object
    var testEnvironment = module.testEnvironment;
    var hooks = module.hooks;
    setHookFromEnvironment(testEnvironment, hooks, 'before');
    setHookFromEnvironment(testEnvironment, hooks, 'beforeEach');
    setHookFromEnvironment(testEnvironment, hooks, 'afterEach');
    setHookFromEnvironment(testEnvironment, hooks, 'after');
    var moduleFns = {
      before: makeSetHook(module, 'before'),
      beforeEach: makeSetHook(module, 'beforeEach'),
      afterEach: makeSetHook(module, 'afterEach'),
      after: makeSetHook(module, 'after')
    };
    var prevModule = config.currentModule;
    config.currentModule = module;
    if (typeof scope === 'function') {
      config._moduleStack.push(module);
      try {
        var cbReturnValue = scope.call(module.testEnvironment, moduleFns);
        if (cbReturnValue && typeof cbReturnValue.then === 'function') {
          throw new TypeError('QUnit.module() callback must not be async. For async module setup, use hooks. https://qunitjs.com/api/QUnit/module/#hooks');
        }
      } finally {
        // If the module closure threw an uncaught error during the load phase,
        // we let this bubble up to global error handlers. But, not until after
        // we teardown internal state to ensure correct module nesting.
        // Ref https://github.com/qunitjs/qunit/issues/1478.
        config._moduleStack.pop();
        config.currentModule = module.parentModule || prevModule;
      }
    }
  }
  var focused$1 = false; // indicates that the "only" filter was used

  function module$1(name, options, scope) {
    var ignored = focused$1 && !isParentModuleInQueue();
    processModule(name, options, scope, {
      ignored: ignored
    });
  }
  module$1.only = function () {
    if (!focused$1) {
      // Upon the first module.only() call,
      // delete any and all previously registered modules and tests.
      //
      // TODO: This does not clear SuiteReport, which means the empty modules are
      // left behind and wrongly reported as "skipped" (skipped == total), and
      // deleted tests wrongly count toward runEnd.testCounts as passing test
      // (this.getFailedAssertions().length === 0).
      // This is why /test/cli/fixtures/only-test-only-module-mix.tap.txt reports
      // 1..3 instead of 1..1.
      config.modules.length = 0;
      config.queue.length = 0;

      // Ignore any tests declared after this block within the same
      // module parent. https://github.com/qunitjs/qunit/issues/1645
      config.currentModule.ignored = true;
    }
    focused$1 = true;
    processModule.apply(void 0, arguments);
  };
  module$1.skip = function (name, options, scope) {
    if (focused$1) {
      return;
    }
    processModule(name, options, scope, {
      skip: true
    });
  };
  module$1.if = function (name, condition, options, scope) {
    if (focused$1) {
      return;
    }
    processModule(name, options, scope, {
      skip: !condition
    });
  };
  module$1.todo = function (name, options, scope) {
    if (focused$1) {
      return;
    }
    processModule(name, options, scope, {
      todo: true
    });
  };

  /**
   * Handle a global error that should result in a failed test run.
   *
   * Summary:
   *
   * - If we're strictly inside a test (or one if its module hooks), the exception
   *   becomes a failed assertion.
   *
   *   This has the important side-effect that uncaught exceptions (such as
   *   calling an undefined function) during a "todo" test do NOT result in
   *   a failed test run.
   *
   * - If we're anywhere outside a test (be it in early event callbacks, or
   *   internally between tests, or somewhere after "runEnd" if the process is
   *   still alive for some reason), then send an "error" event to the reporters.
   *
   * @since 2.17.0
   * @param {Error|any} error
   */
  function onUncaughtException(error) {
    if (config.current) {
      // This omits 'actual' and 'expected' (undefined)
      config.current.assert.pushResult({
        result: false,
        message: "global failure: ".concat(errorString(error)),
        // We could let callers specify an offset to subtract a number of frames via
        // sourceFromStacktrace, in case they are a wrapper further away from the error
        // handler, and thus reduce some noise in the stack trace. However, we're not
        // doing this right now because it would almost never be used in practice given
        // the vast majority of error values will be Error objects, and thus have their
        // own stack trace already.
        source: error && error.stack || sourceFromStacktrace(2)
      });
    } else {
      // The "error" event was added in QUnit 2.17.
      // Increase "bad assertion" stats despite no longer pushing an assertion in this case.
      // This ensures "runEnd" and "QUnit.done()" handlers behave as expected, since the "bad"
      // count is typically how reporters decide on the boolean outcome of the test run.
      globalSuiteReport.globalFailureCount++;
      config.stats.bad++;
      config.stats.all++;
      emit('error', error);
    }
  }

  /**
   * Creates a seeded "sample" generator which is used for randomizing tests.
   */
  function unitSamplerGenerator(seed) {
    // 32-bit xorshift, requires only a nonzero seed
    // https://excamera.com/sphinx/article-xorshift.html
    var sample = parseInt(generateHash(seed), 16) || -1;
    return function () {
      sample ^= sample << 13;
      sample ^= sample >>> 17;
      sample ^= sample << 5;

      // ECMAScript has no unsigned number type
      if (sample < 0) {
        sample += 0x100000000;
      }
      return sample / 0x100000000;
    };
  }
  var ProcessingQueue = /*#__PURE__*/function () {
    function ProcessingQueue() {
      _classCallCheck(this, ProcessingQueue);
      this.priorityCount = 0;
      this.unitSampler = null;

      // This is a queue of functions that are tasks within a single test.
      // After tests are dequeued from config.queue they are expanded into
      // a set of tasks in this queue.
      this.taskQueue = [];
      this.finished = false;
    }

    /**
     * Advances the taskQueue to the next task. If the taskQueue is empty,
     * process the testQueue
     */
    return _createClass(ProcessingQueue, [{
      key: "advance",
      value: function advance() {
        this.advanceTaskQueue();
        if (!this.taskQueue.length && !config.blocking && !config.current) {
          this.advanceTestQueue();
        }
      }

      /**
       * Advances the taskQueue with an increased depth
       */
    }, {
      key: "advanceTaskQueue",
      value: function advanceTaskQueue() {
        var start = performance.now();
        config.depth = (config.depth || 0) + 1;
        this.processTaskQueue(start);
        config.depth--;
      }

      /**
       * Process the first task on the taskQueue as a promise.
       * Each task is a function added by Test#queue() in test.js
       */
    }, {
      key: "processTaskQueue",
      value: function processTaskQueue(start) {
        var _this = this;
        if (this.taskQueue.length && !config.blocking) {
          var elapsedTime = performance.now() - start;
          if (!setTimeout$1 || config.updateRate <= 0 || elapsedTime < config.updateRate) {
            var task = this.taskQueue.shift();
            _Promise.resolve(task()).then(function () {
              if (!_this.taskQueue.length) {
                _this.advance();
              } else {
                _this.processTaskQueue(start);
              }
            });
          } else {
            setTimeout$1(function () {
              _this.advance();
            });
          }
        }
      }

      /**
       * Advance the testQueue to the next test to process. Call done() if testQueue completes.
       */
    }, {
      key: "advanceTestQueue",
      value: function advanceTestQueue() {
        if (!config.blocking && !config.queue.length && config.depth === 0) {
          this.done();
          return;
        }
        var testTasks = config.queue.shift();
        this.addToTaskQueue(testTasks());
        if (this.priorityCount > 0) {
          this.priorityCount--;
        }
        this.advance();
      }

      /**
       * Enqueue the tasks for a test into the task queue.
       * @param {Array} tasksArray
       */
    }, {
      key: "addToTaskQueue",
      value: function addToTaskQueue(tasksArray) {
        var _this$taskQueue;
        (_this$taskQueue = this.taskQueue).push.apply(_this$taskQueue, _toConsumableArray(tasksArray));
      }

      /**
       * Return the number of tasks remaining in the task queue to be processed.
       * @return {number}
       */
    }, {
      key: "taskCount",
      value: function taskCount() {
        return this.taskQueue.length;
      }

      /**
       * Adds a test to the TestQueue for execution.
       * @param {Function} testTasksFunc
       * @param {boolean} prioritize
       */
    }, {
      key: "add",
      value: function add(testTasksFunc, prioritize) {
        if (prioritize) {
          config.queue.splice(this.priorityCount++, 0, testTasksFunc);
        } else if (config.seed) {
          if (!this.unitSampler) {
            this.unitSampler = unitSamplerGenerator(config.seed);
          }

          // Insert into a random position after all prioritized items
          var index = Math.floor(this.unitSampler() * (config.queue.length - this.priorityCount + 1));
          config.queue.splice(this.priorityCount + index, 0, testTasksFunc);
        } else {
          config.queue.push(testTasksFunc);
        }
      }
    }, {
      key: "abort",
      value: function abort() {
        // Delete the next test and anything after it.
        // Thus, leaving only the bare minimum to cleanly exit the current test.
        for (var i = 0, len = config.queue.length; i < len; i++) {
          if (config.queue[i].name === 'runTest') {
            var nextTestIndex = i;
            config.queue.splice(nextTestIndex);
            return;
          }
        }
      }

      /**
       * This function is called when the ProcessingQueue is done processing all
       * items. It handles emitting the final run events.
       */
    }, {
      key: "done",
      value: function done() {
        // We have reached the end of the processing queue and are about to emit the
        // "runEnd" event after which reporters typically stop listening and exit
        // the process. First, check if we need to emit an error event.
        if (config.stats.testCount === 0 && config.failOnZeroTests === true) {
          var error;
          if (config.filter && config.filter.length) {
            error = new Error("No tests matched the filter \"".concat(config.filter, "\"."));
          } else if (config.module && config.module.length) {
            error = new Error("No tests matched the module \"".concat(config.module, "\"."));
          } else if (config.moduleId && config.moduleId.length) {
            error = new Error("No tests matched the moduleId \"".concat(config.moduleId, "\"."));
          } else if (config.testId && config.testId.length) {
            error = new Error("No tests matched the testId \"".concat(config.testId, "\"."));
          } else {
            error = new Error('No tests were run.');
          }
          onUncaughtException(error);
        }
        var storage = config.storage;
        this.finished = true;
        var runEnd = globalSuiteReport.end(true);
        emit('runEnd', runEnd);
        runLoggingCallbacks('done', {
          // Use of "details" parameter to QUnit.done() is discouraged
          // since QUnit 2.19 to solve the "assertion counting" gotchas
          // documented at https://qunitjs.com/api/callbacks/QUnit.done/.
          // Use QUnit.on('runEnd') instead.
          //
          // Kept for compatibility with ecosystem integrations
          // such as Testem, which safely use the "runtime" field only.
          passed: config.stats.all - config.stats.bad,
          failed: config.stats.bad,
          total: config.stats.all,
          runtime: runEnd.runtime
        }).then(function () {
          // Clear our storage keys if run passed and there were no "todo" tests left.
          //
          // The check for "todo" is important, because after a passing run,
          // it is useful for re-runs to quickly start with known "todo" tests.
          // In test.js we inform storage about "todo" failures the same as
          // any other failure. Clearing here after merely "passed" would defeat
          // that logic.
          if (storage && runEnd.status === 'passed' && !runEnd.testCounts.todo) {
            for (var i = storage.length - 1; i >= 0; i--) {
              var key = storage.key(i);
              if (key.indexOf('qunit-test-') === 0) {
                storage.removeItem(key);
              }
            }
          }
        });
      }
    }]);
  }();

  var ConsoleReporter = /*#__PURE__*/function () {
    function ConsoleReporter(runner) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, ConsoleReporter);
      // Cache references to console methods to ensure we can report failures
      // from tests tests that mock the console object itself.
      // https://github.com/qunitjs/qunit/issues/1340
      this.log = options.log || console$1.log.bind(console$1);
      runner.on('error', this.onError.bind(this));
      runner.on('runStart', this.onRunStart.bind(this));
      runner.on('testStart', this.onTestStart.bind(this));
      runner.on('testEnd', this.onTestEnd.bind(this));
      runner.on('runEnd', this.onRunEnd.bind(this));
    }
    return _createClass(ConsoleReporter, [{
      key: "onError",
      value: function onError(error) {
        this.log('error', error);
      }
    }, {
      key: "onRunStart",
      value: function onRunStart(runStart) {
        this.log('runStart', runStart);
      }
    }, {
      key: "onTestStart",
      value: function onTestStart(test) {
        this.log('testStart', test);
      }
    }, {
      key: "onTestEnd",
      value: function onTestEnd(test) {
        this.log('testEnd', test);
      }
    }, {
      key: "onRunEnd",
      value: function onRunEnd(runEnd) {
        this.log('runEnd', runEnd);
      }
    }], [{
      key: "init",
      value: function init(runner, options) {
        return new ConsoleReporter(runner, options);
      }
    }]);
  }();

  // Support: SpiderMonkey (mozjs 68+)
  // The console object has a log method, but no warn method.

  var Logger = {
    warn: console$1 ? (console$1.warn || console$1.log).bind(console$1) : function () {}
  };

  // TODO: Change from window to globalThis in QUnit 3.0, so that the reporter
  // works for Node.js as well. As this can add overhead, we should keep
  // this opt-in on the CLI.
  var nativePerf = window$1 && typeof window$1.performance !== 'undefined'
  // eslint-disable-next-line compat/compat -- Checked
  && typeof window$1.performance.mark === 'function'
  // eslint-disable-next-line compat/compat -- Checked
  && typeof window$1.performance.measure === 'function' ? window$1.performance : undefined;
  var perf = {
    measure: nativePerf ? function (comment, startMark, endMark) {
      // `performance.measure` may fail if the mark could not be found.
      // reasons a specific mark could not be found include: outside code invoking `performance.clearMarks()`
      try {
        nativePerf.measure(comment, startMark, endMark);
      } catch (ex) {
        Logger.warn('performance.measure could not be executed because of ', ex.message);
      }
    } : function () {},
    mark: nativePerf ? nativePerf.mark.bind(nativePerf) : function () {}
  };
  var PerfReporter = /*#__PURE__*/function () {
    function PerfReporter(runner) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, PerfReporter);
      this.perf = options.perf || perf;
      runner.on('runStart', this.onRunStart.bind(this), prioritySymbol);
      runner.on('runEnd', this.onRunEnd.bind(this));
      runner.on('suiteStart', this.onSuiteStart.bind(this), prioritySymbol);
      runner.on('suiteEnd', this.onSuiteEnd.bind(this));
      runner.on('testStart', this.onTestStart.bind(this), prioritySymbol);
      runner.on('testEnd', this.onTestEnd.bind(this));
    }
    return _createClass(PerfReporter, [{
      key: "onRunStart",
      value: function onRunStart() {
        this.perf.mark('qunit_suite_0_start');
      }
    }, {
      key: "onSuiteStart",
      value: function onSuiteStart(suiteStart) {
        var suiteLevel = suiteStart.fullName.length;
        this.perf.mark("qunit_suite_".concat(suiteLevel, "_start"));
      }
    }, {
      key: "onSuiteEnd",
      value: function onSuiteEnd(suiteEnd) {
        var suiteLevel = suiteEnd.fullName.length;
        var suiteName = suiteEnd.fullName.join(' – ');
        this.perf.mark("qunit_suite_".concat(suiteLevel, "_end"));
        this.perf.measure("QUnit Test Suite: ".concat(suiteName), "qunit_suite_".concat(suiteLevel, "_start"), "qunit_suite_".concat(suiteLevel, "_end"));
      }
    }, {
      key: "onTestStart",
      value: function onTestStart() {
        this.perf.mark('qunit_test_start');
      }
    }, {
      key: "onTestEnd",
      value: function onTestEnd(testEnd) {
        this.perf.mark('qunit_test_end');
        var testName = testEnd.fullName.join(' – ');
        this.perf.measure("QUnit Test: ".concat(testName), 'qunit_test_start', 'qunit_test_end');
      }
    }, {
      key: "onRunEnd",
      value: function onRunEnd() {
        this.perf.mark('qunit_suite_0_end');
        this.perf.measure('QUnit Test Run', 'qunit_suite_0_start', 'qunit_suite_0_end');
      }
    }], [{
      key: "init",
      value: function init(runner, options) {
        return new PerfReporter(runner, options);
      }
    }]);
  }();

  var FORCE_COLOR,
    NODE_DISABLE_COLORS,
    NO_COLOR,
    TERM,
    isTTY = true;
  if (typeof process !== 'undefined') {
    var _ref = process.env || {};
    FORCE_COLOR = _ref.FORCE_COLOR;
    NODE_DISABLE_COLORS = _ref.NODE_DISABLE_COLORS;
    NO_COLOR = _ref.NO_COLOR;
    TERM = _ref.TERM;
    isTTY = process.stdout && process.stdout.isTTY;
  }
  var $ = {
    enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && (FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY),
    // modifiers
    reset: init(0, 0),
    bold: init(1, 22),
    dim: init(2, 22),
    italic: init(3, 23),
    underline: init(4, 24),
    inverse: init(7, 27),
    hidden: init(8, 28),
    strikethrough: init(9, 29),
    // colors
    black: init(30, 39),
    red: init(31, 39),
    green: init(32, 39),
    yellow: init(33, 39),
    blue: init(34, 39),
    magenta: init(35, 39),
    cyan: init(36, 39),
    white: init(37, 39),
    gray: init(90, 39),
    grey: init(90, 39),
    // background colors
    bgBlack: init(40, 49),
    bgRed: init(41, 49),
    bgGreen: init(42, 49),
    bgYellow: init(43, 49),
    bgBlue: init(44, 49),
    bgMagenta: init(45, 49),
    bgCyan: init(46, 49),
    bgWhite: init(47, 49)
  };
  function run(arr, str) {
    var i = 0,
      tmp,
      beg = '',
      end = '';
    for (; i < arr.length; i++) {
      tmp = arr[i];
      beg += tmp.open;
      end += tmp.close;
      if (!!~str.indexOf(tmp.close)) {
        str = str.replace(tmp.rgx, tmp.close + tmp.open);
      }
    }
    return beg + str + end;
  }
  function chain(has, keys) {
    var ctx = {
      has: has,
      keys: keys
    };
    ctx.reset = $.reset.bind(ctx);
    ctx.bold = $.bold.bind(ctx);
    ctx.dim = $.dim.bind(ctx);
    ctx.italic = $.italic.bind(ctx);
    ctx.underline = $.underline.bind(ctx);
    ctx.inverse = $.inverse.bind(ctx);
    ctx.hidden = $.hidden.bind(ctx);
    ctx.strikethrough = $.strikethrough.bind(ctx);
    ctx.black = $.black.bind(ctx);
    ctx.red = $.red.bind(ctx);
    ctx.green = $.green.bind(ctx);
    ctx.yellow = $.yellow.bind(ctx);
    ctx.blue = $.blue.bind(ctx);
    ctx.magenta = $.magenta.bind(ctx);
    ctx.cyan = $.cyan.bind(ctx);
    ctx.white = $.white.bind(ctx);
    ctx.gray = $.gray.bind(ctx);
    ctx.grey = $.grey.bind(ctx);
    ctx.bgBlack = $.bgBlack.bind(ctx);
    ctx.bgRed = $.bgRed.bind(ctx);
    ctx.bgGreen = $.bgGreen.bind(ctx);
    ctx.bgYellow = $.bgYellow.bind(ctx);
    ctx.bgBlue = $.bgBlue.bind(ctx);
    ctx.bgMagenta = $.bgMagenta.bind(ctx);
    ctx.bgCyan = $.bgCyan.bind(ctx);
    ctx.bgWhite = $.bgWhite.bind(ctx);
    return ctx;
  }
  function init(open, close) {
    var blk = {
      open: "\x1B[".concat(open, "m"),
      close: "\x1B[".concat(close, "m"),
      rgx: new RegExp("\\x1b\\[".concat(close, "m"), 'g')
    };
    return function (txt) {
      if (this !== void 0 && this.has !== void 0) {
        !!~this.has.indexOf(open) || (this.has.push(open), this.keys.push(blk));
        return txt === void 0 ? this : $.enabled ? run(this.keys, txt + '') : txt + '';
      }
      return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt + '') : txt + '';
    };
  }

  /**
   * Format a given value into YAML.
   *
   * YAML is a superset of JSON that supports all the same data
   * types and syntax, and more. As such, it is always possible
   * to fallback to JSON.stringfify, but we generally avoid
   * that to make output easier to read for humans.
   *
   * Supported data types:
   *
   * - null
   * - boolean
   * - number
   * - string
   * - array
   * - object
   *
   * Anything else (including NaN, Infinity, and undefined)
   * must be described in strings, for display purposes.
   *
   * Note that quotes are optional in YAML strings if the
   * strings are "simple", and as such we generally prefer
   * that for improved readability. We output strings in
   * one of three ways:
   *
   * - bare unquoted text, for simple one-line strings.
   * - JSON (quoted text), for complex one-line strings.
   * - YAML Block, for complex multi-line strings.
   *
   * Objects with cyclical references will be stringifed as
   * "[Circular]" as they cannot otherwise be represented.
   */
  function prettyYamlValue(value) {
    var indent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
    if (value === undefined) {
      // Not supported in JSON/YAML, turn into string
      // and let the below output it as bare string.
      value = String(value);
    }

    // Support IE 11: Use isFinite instead of ES6 Number.isFinite
    if (typeof value === 'number' && !isFinite(value)) {
      // Turn NaN and Infinity into simple strings.
      // Paranoia: Don't return directly just in case there's
      // a way to add special characters here.
      value = String(value);
    }
    if (typeof value === 'number') {
      // Simple numbers
      return JSON.stringify(value);
    }
    if (typeof value === 'string') {
      // If any of these match, then we can't output it
      // as bare unquoted text, because that would either
      // cause data loss or invalid YAML syntax.
      //
      // - Quotes, escapes, line breaks, or JSON-like stuff.
      var rSpecialJson = /['"\\/[{}\]\r\n]/;

      // - Characters that are special at the start of a YAML value
      var rSpecialYaml = /[-?:,[\]{}#&*!|=>'"%@`]/;

      // - Leading or trailing whitespace.
      var rUntrimmed = /(^\s|\s$)/;

      // - Ambiguous as YAML number, e.g. '2', '-1.2', '.2', or '2_000'
      var rNumerical = /^[\d._-]+$/;

      // - Ambiguous as YAML bool.
      //   Use case-insensitive match, although technically only
      //   fully-lower, fully-upper, or uppercase-first would be ambiguous.
      //   e.g. true/True/TRUE, but not tRUe.
      var rBool = /^(true|false|y|n|yes|no|on|off)$/i;

      // Is this a complex string?
      if (value === '' || rSpecialJson.test(value) || rSpecialYaml.test(value[0]) || rUntrimmed.test(value) || rNumerical.test(value) || rBool.test(value)) {
        if (!/\n/.test(value)) {
          // Complex one-line string, use JSON (quoted string)
          return JSON.stringify(value);
        }

        // See also <https://yaml-multiline.info/>
        // Support IE 11: Avoid ES6 String#repeat
        var prefix = new Array(indent + 1).join(' ');
        var trailingLinebreakMatch = value.match(/\n+$/);
        var trailingLinebreaks = trailingLinebreakMatch ? trailingLinebreakMatch[0].length : 0;
        if (trailingLinebreaks === 1) {
          // Use the most straight-forward "Block" string in YAML
          // without any "Chomping" indicators.
          var lines = value

          // Ignore the last new line, since we'll get that one for free
          // with the straight-forward Block syntax.
          .replace(/\n$/, '').split('\n').map(function (line) {
            return prefix + line;
          });
          return '|\n' + lines.join('\n');
        } else {
          // This has either no trailing new lines, or more than 1.
          // Use |+ so that YAML parsers will preserve it exactly.
          var _lines = value.split('\n').map(function (line) {
            return prefix + line;
          });
          return '|+\n' + _lines.join('\n');
        }
      } else {
        // Simple string, use bare unquoted text
        return value;
      }
    }

    // Handle null, boolean, array, and object
    return JSON.stringify(decycledShallowClone(value), null, 2);
  }

  /**
   * Creates a shallow clone of an object where cycles have
   * been replaced with "[Circular]".
   */
  function decycledShallowClone(object) {
    var ancestors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    if (ancestors.indexOf(object) !== -1) {
      return '[Circular]';
    }
    var type = Object.prototype.toString.call(object).replace(/^\[.+\s(.+?)]$/, '$1').toLowerCase();
    var clone;
    switch (type) {
      case 'array':
        ancestors.push(object);
        clone = object.map(function (element) {
          return decycledShallowClone(element, ancestors);
        });
        ancestors.pop();
        break;
      case 'object':
        ancestors.push(object);
        clone = {};
        Object.keys(object).forEach(function (key) {
          clone[key] = decycledShallowClone(object[key], ancestors);
        });
        ancestors.pop();
        break;
      default:
        clone = object;
    }
    return clone;
  }
  var TapReporter = /*#__PURE__*/function () {
    function TapReporter(runner) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, TapReporter);
      // Cache references to console methods to ensure we can report failures
      // from tests tests that mock the console object itself.
      // https://github.com/qunitjs/qunit/issues/1340
      this.log = options.log || console$1.log.bind(console$1);
      this.testCount = 0;
      this.started = false;
      this.ended = false;
      this.bailed = false;
      runner.on('error', this.onError.bind(this));
      runner.on('runStart', this.onRunStart.bind(this));
      runner.on('testEnd', this.onTestEnd.bind(this));
      runner.on('runEnd', this.onRunEnd.bind(this));
    }
    return _createClass(TapReporter, [{
      key: "onRunStart",
      value: function onRunStart() {
        if (!this.started) {
          this.log('TAP version 13');
          this.started = true;
        }
      }
    }, {
      key: "onError",
      value: function onError(error) {
        if (this.bailed) {
          return;
        }
        this.bailed = true;

        // Imitate onTestEnd
        // Skip this if we're past "runEnd" as it would look odd
        if (!this.ended) {
          this.onRunStart();
          this.testCount = this.testCount + 1;
          this.log("not ok ".concat(this.testCount, " ").concat($.red('global failure')));
          this.logError(error);
        }
        this.log('Bail out! ' + errorString(error).split('\n')[0]);
        if (this.ended) {
          this.logError(error);
        }
      }
    }, {
      key: "onTestEnd",
      value: function onTestEnd(test) {
        var _this = this;
        this.testCount = this.testCount + 1;
        if (test.status === 'passed') {
          this.log("ok ".concat(this.testCount, " ").concat(test.fullName.join(' > ')));
        } else if (test.status === 'skipped') {
          this.log("ok ".concat(this.testCount, " ").concat($.yellow("# SKIP ".concat(test.fullName.join(' > ')))));
        } else if (test.status === 'todo') {
          this.log("not ok ".concat(this.testCount, " ").concat($.cyan("# TODO ".concat(test.fullName.join(' > ')))));
          test.errors.forEach(function (error) {
            return _this.logAssertion(error, 'todo');
          });
        } else {
          this.log("not ok ".concat(this.testCount, " ").concat($.red(test.fullName.join(' > '))));
          test.errors.forEach(function (error) {
            return _this.logAssertion(error);
          });
        }
      }
    }, {
      key: "onRunEnd",
      value: function onRunEnd(runEnd) {
        this.ended = true;
        this.log("1..".concat(runEnd.testCounts.total));
        this.log("# pass ".concat(runEnd.testCounts.passed));
        this.log("# ".concat($.yellow("skip ".concat(runEnd.testCounts.skipped))));
        this.log("# ".concat($.cyan("todo ".concat(runEnd.testCounts.todo))));
        this.log("# ".concat($.red("fail ".concat(runEnd.testCounts.failed))));
      }
    }, {
      key: "logAssertion",
      value: function logAssertion(error, severity) {
        var out = '  ---';
        out += "\n  message: ".concat(prettyYamlValue(error.message || 'failed'));
        out += "\n  severity: ".concat(prettyYamlValue(severity || 'failed'));

        // When pushFailure() is used, actual/expected are initially unset but
        // eventually in Test#logAssertion, for testReport#pushAssertion, these are
        // forged into existence as undefined.
        var hasAny = error.expected !== undefined || error.actual !== undefined;
        if (hasAny) {
          out += "\n  actual  : ".concat(prettyYamlValue(error.actual));
          out += "\n  expected: ".concat(prettyYamlValue(error.expected));
        }
        if (error.stack) {
          // Since stacks aren't user generated, take a bit of liberty by
          // adding a trailing new line to allow a straight-forward YAML Blocks.
          var fmtStack = annotateStacktrace(error.stack, $.grey);
          if (fmtStack.length) {
            out += "\n  stack: ".concat(prettyYamlValue(fmtStack + '\n'));
          }
        }
        out += '\n  ...';
        this.log(out);
      }
    }, {
      key: "logError",
      value: function logError(error) {
        var out = '  ---';
        out += "\n  message: ".concat(prettyYamlValue(errorString(error)));
        out += "\n  severity: ".concat(prettyYamlValue('failed'));
        if (error && error.stack) {
          var fmtStack = annotateStacktrace(error.stack, $.grey, error.toString());
          if (fmtStack.length) {
            out += "\n  stack: ".concat(prettyYamlValue(fmtStack + '\n'));
          }
        }
        out += '\n  ...';
        this.log(out);
      }
    }], [{
      key: "init",
      value: function init(runner, options) {
        return new TapReporter(runner, options);
      }
    }]);
  }();

  // Expose the current QUnit version
  // Replaced by /rollup.config.js using /build/dist-replace.js
  var version = '3.0.0-alpha.4';

  function commonjsRequire(path) {
  	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }

  var fuzzysort$1 = {exports: {}};

  (function (module) {
    (function (root, UMD) {
      if (module.exports) module.exports = UMD();else root.fuzzysort = UMD();
    })(commonjsGlobal, function UMD() {
      function fuzzysortNew(instanceOptions) {
        var fuzzysort = {
          single: function single(search, target, options) {
            if (search == 'farzher') return {
              target: "farzher was here (^-^*)/",
              score: 0,
              indexes: [0, 1, 2, 3, 4, 5, 6]
            };
            if (!search) return null;
            if (!isObj(search)) search = fuzzysort.getPreparedSearch(search);
            if (!target) return null;
            if (!isObj(target)) target = fuzzysort.getPrepared(target);
            var allowTypo = options && options.allowTypo !== undefined ? options.allowTypo : instanceOptions && instanceOptions.allowTypo !== undefined ? instanceOptions.allowTypo : true;
            var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo;
            return algorithm(search, target, search[0]);
          },
          go: function go(search, targets, options) {
            if (search == 'farzher') return [{
              target: "farzher was here (^-^*)/",
              score: 0,
              indexes: [0, 1, 2, 3, 4, 5, 6],
              obj: targets ? targets[0] : null
            }];
            if (!search) return noResults;
            search = fuzzysort.prepareSearch(search);
            var searchLowerCode = search[0];
            var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991;
            var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991;
            var allowTypo = options && options.allowTypo !== undefined ? options.allowTypo : instanceOptions && instanceOptions.allowTypo !== undefined ? instanceOptions.allowTypo : true;
            var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo;
            var resultsLen = 0;
            var limitedCount = 0;
            var targetsLen = targets.length;

            // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]

            // options.keys
            if (options && options.keys) {
              var scoreFn = options.scoreFn || defaultScoreFn;
              var keys = options.keys;
              var keysLen = keys.length;
              for (var i = targetsLen - 1; i >= 0; --i) {
                var obj = targets[i];
                var objResults = new Array(keysLen);
                for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
                  var key = keys[keyI];
                  var target = getValue(obj, key);
                  if (!target) {
                    objResults[keyI] = null;
                    continue;
                  }
                  if (!isObj(target)) target = fuzzysort.getPrepared(target);
                  objResults[keyI] = algorithm(search, target, searchLowerCode);
                }
                objResults.obj = obj; // before scoreFn so scoreFn can use it
                var score = scoreFn(objResults);
                if (score === null) continue;
                if (score < threshold) continue;
                objResults.score = score;
                if (resultsLen < limit) {
                  q.add(objResults);
                  ++resultsLen;
                } else {
                  ++limitedCount;
                  if (score > q.peek().score) q.replaceTop(objResults);
                }
              }

              // options.key
            } else if (options && options.key) {
              var key = options.key;
              for (var i = targetsLen - 1; i >= 0; --i) {
                var obj = targets[i];
                var target = getValue(obj, key);
                if (!target) continue;
                if (!isObj(target)) target = fuzzysort.getPrepared(target);
                var result = algorithm(search, target, searchLowerCode);
                if (result === null) continue;
                if (result.score < threshold) continue;

                // have to clone result so duplicate targets from different obj can each reference the correct obj
                result = {
                  target: result.target,
                  _targetLowerCodes: null,
                  _nextBeginningIndexes: null,
                  score: result.score,
                  indexes: result.indexes,
                  obj: obj
                }; // hidden

                if (resultsLen < limit) {
                  q.add(result);
                  ++resultsLen;
                } else {
                  ++limitedCount;
                  if (result.score > q.peek().score) q.replaceTop(result);
                }
              }

              // no keys
            } else {
              for (var i = targetsLen - 1; i >= 0; --i) {
                var target = targets[i];
                if (!target) continue;
                if (!isObj(target)) target = fuzzysort.getPrepared(target);
                var result = algorithm(search, target, searchLowerCode);
                if (result === null) continue;
                if (result.score < threshold) continue;
                if (resultsLen < limit) {
                  q.add(result);
                  ++resultsLen;
                } else {
                  ++limitedCount;
                  if (result.score > q.peek().score) q.replaceTop(result);
                }
              }
            }
            if (resultsLen === 0) return noResults;
            var results = new Array(resultsLen);
            for (var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll();
            results.total = resultsLen + limitedCount;
            return results;
          },
          goAsync: function goAsync(search, targets, options) {
            var canceled = false;
            var p = new Promise(function (resolve, reject) {
              if (search == 'farzher') return resolve([{
                target: "farzher was here (^-^*)/",
                score: 0,
                indexes: [0, 1, 2, 3, 4, 5, 6],
                obj: targets ? targets[0] : null
              }]);
              if (!search) return resolve(noResults);
              search = fuzzysort.prepareSearch(search);
              var searchLowerCode = search[0];
              var q = fastpriorityqueue();
              var iCurrent = targets.length - 1;
              var threshold = options && options.threshold || instanceOptions && instanceOptions.threshold || -9007199254740991;
              var limit = options && options.limit || instanceOptions && instanceOptions.limit || 9007199254740991;
              var allowTypo = options && options.allowTypo !== undefined ? options.allowTypo : instanceOptions && instanceOptions.allowTypo !== undefined ? instanceOptions.allowTypo : true;
              var algorithm = allowTypo ? fuzzysort.algorithm : fuzzysort.algorithmNoTypo;
              var resultsLen = 0;
              var limitedCount = 0;
              function step() {
                if (canceled) return reject('canceled');
                var startMs = Date.now();

                // This code is copy/pasted 3 times for performance reasons [options.keys, options.key, no keys]

                // options.keys
                if (options && options.keys) {
                  var scoreFn = options.scoreFn || defaultScoreFn;
                  var keys = options.keys;
                  var keysLen = keys.length;
                  for (; iCurrent >= 0; --iCurrent) {
                    if (iCurrent % 1000 /*itemsPerCheck*/ === 0) {
                      if (Date.now() - startMs >= 10 /*asyncInterval*/) {
                        isNode ? setImmediate(step) : setTimeout(step);
                        return;
                      }
                    }
                    var obj = targets[iCurrent];
                    var objResults = new Array(keysLen);
                    for (var keyI = keysLen - 1; keyI >= 0; --keyI) {
                      var key = keys[keyI];
                      var target = getValue(obj, key);
                      if (!target) {
                        objResults[keyI] = null;
                        continue;
                      }
                      if (!isObj(target)) target = fuzzysort.getPrepared(target);
                      objResults[keyI] = algorithm(search, target, searchLowerCode);
                    }
                    objResults.obj = obj; // before scoreFn so scoreFn can use it
                    var score = scoreFn(objResults);
                    if (score === null) continue;
                    if (score < threshold) continue;
                    objResults.score = score;
                    if (resultsLen < limit) {
                      q.add(objResults);
                      ++resultsLen;
                    } else {
                      ++limitedCount;
                      if (score > q.peek().score) q.replaceTop(objResults);
                    }
                  }

                  // options.key
                } else if (options && options.key) {
                  var key = options.key;
                  for (; iCurrent >= 0; --iCurrent) {
                    if (iCurrent % 1000 /*itemsPerCheck*/ === 0) {
                      if (Date.now() - startMs >= 10 /*asyncInterval*/) {
                        isNode ? setImmediate(step) : setTimeout(step);
                        return;
                      }
                    }
                    var obj = targets[iCurrent];
                    var target = getValue(obj, key);
                    if (!target) continue;
                    if (!isObj(target)) target = fuzzysort.getPrepared(target);
                    var result = algorithm(search, target, searchLowerCode);
                    if (result === null) continue;
                    if (result.score < threshold) continue;

                    // have to clone result so duplicate targets from different obj can each reference the correct obj
                    result = {
                      target: result.target,
                      _targetLowerCodes: null,
                      _nextBeginningIndexes: null,
                      score: result.score,
                      indexes: result.indexes,
                      obj: obj
                    }; // hidden

                    if (resultsLen < limit) {
                      q.add(result);
                      ++resultsLen;
                    } else {
                      ++limitedCount;
                      if (result.score > q.peek().score) q.replaceTop(result);
                    }
                  }

                  // no keys
                } else {
                  for (; iCurrent >= 0; --iCurrent) {
                    if (iCurrent % 1000 /*itemsPerCheck*/ === 0) {
                      if (Date.now() - startMs >= 10 /*asyncInterval*/) {
                        isNode ? setImmediate(step) : setTimeout(step);
                        return;
                      }
                    }
                    var target = targets[iCurrent];
                    if (!target) continue;
                    if (!isObj(target)) target = fuzzysort.getPrepared(target);
                    var result = algorithm(search, target, searchLowerCode);
                    if (result === null) continue;
                    if (result.score < threshold) continue;
                    if (resultsLen < limit) {
                      q.add(result);
                      ++resultsLen;
                    } else {
                      ++limitedCount;
                      if (result.score > q.peek().score) q.replaceTop(result);
                    }
                  }
                }
                if (resultsLen === 0) return resolve(noResults);
                var results = new Array(resultsLen);
                for (var i = resultsLen - 1; i >= 0; --i) results[i] = q.poll();
                results.total = resultsLen + limitedCount;
                resolve(results);
              }
              isNode ? setImmediate(step) : step(); //setTimeout here is too slow
            });
            p.cancel = function () {
              canceled = true;
            };
            return p;
          },
          highlight: function highlight(result, hOpen, hClose) {
            if (typeof hOpen == 'function') return fuzzysort.highlightCallback(result, hOpen);
            if (result === null) return null;
            if (hOpen === undefined) hOpen = '<b>';
            if (hClose === undefined) hClose = '</b>';
            var highlighted = '';
            var matchesIndex = 0;
            var opened = false;
            var target = result.target;
            var targetLen = target.length;
            var matchesBest = result.indexes;
            for (var i = 0; i < targetLen; ++i) {
              var char = target[i];
              if (matchesBest[matchesIndex] === i) {
                ++matchesIndex;
                if (!opened) {
                  opened = true;
                  highlighted += hOpen;
                }
                if (matchesIndex === matchesBest.length) {
                  highlighted += char + hClose + target.substr(i + 1);
                  break;
                }
              } else {
                if (opened) {
                  opened = false;
                  highlighted += hClose;
                }
              }
              highlighted += char;
            }
            return highlighted;
          },
          highlightCallback: function highlightCallback(result, cb) {
            if (result === null) return null;
            var target = result.target;
            var targetLen = target.length;
            var indexes = result.indexes;
            var highlighted = '';
            var matchI = 0;
            var indexesI = 0;
            var opened = false;
            var result = [];
            for (var i = 0; i < targetLen; ++i) {
              var char = target[i];
              if (indexes[indexesI] === i) {
                ++indexesI;
                if (!opened) {
                  opened = true;
                  result.push(highlighted);
                  highlighted = '';
                }
                if (indexesI === indexes.length) {
                  highlighted += char;
                  result.push(cb(highlighted, matchI++));
                  highlighted = '';
                  result.push(target.substr(i + 1));
                  break;
                }
              } else {
                if (opened) {
                  opened = false;
                  result.push(cb(highlighted, matchI++));
                  highlighted = '';
                }
              }
              highlighted += char;
            }
            return result;
          },
          prepare: function prepare(target) {
            if (!target) return {
              target: '',
              _targetLowerCodes: [0 /*this 0 doesn't make sense. here because an empty array causes the algorithm to deoptimize and run 50% slower!*/],
              _nextBeginningIndexes: null,
              score: null,
              indexes: null,
              obj: null
            }; // hidden
            return {
              target: target,
              _targetLowerCodes: fuzzysort.prepareLowerCodes(target),
              _nextBeginningIndexes: null,
              score: null,
              indexes: null,
              obj: null
            }; // hidden
          },
          prepareSlow: function prepareSlow(target) {
            if (!target) return {
              target: '',
              _targetLowerCodes: [0 /*this 0 doesn't make sense. here because an empty array causes the algorithm to deoptimize and run 50% slower!*/],
              _nextBeginningIndexes: null,
              score: null,
              indexes: null,
              obj: null
            }; // hidden
            return {
              target: target,
              _targetLowerCodes: fuzzysort.prepareLowerCodes(target),
              _nextBeginningIndexes: fuzzysort.prepareNextBeginningIndexes(target),
              score: null,
              indexes: null,
              obj: null
            }; // hidden
          },
          prepareSearch: function prepareSearch(search) {
            if (!search) search = '';
            return fuzzysort.prepareLowerCodes(search);
          },
          // Below this point is only internal code
          // Below this point is only internal code
          // Below this point is only internal code
          // Below this point is only internal code

          getPrepared: function getPrepared(target) {
            if (target.length > 999) return fuzzysort.prepare(target); // don't cache huge targets
            var targetPrepared = preparedCache.get(target);
            if (targetPrepared !== undefined) return targetPrepared;
            targetPrepared = fuzzysort.prepare(target);
            preparedCache.set(target, targetPrepared);
            return targetPrepared;
          },
          getPreparedSearch: function getPreparedSearch(search) {
            if (search.length > 999) return fuzzysort.prepareSearch(search); // don't cache huge searches
            var searchPrepared = preparedSearchCache.get(search);
            if (searchPrepared !== undefined) return searchPrepared;
            searchPrepared = fuzzysort.prepareSearch(search);
            preparedSearchCache.set(search, searchPrepared);
            return searchPrepared;
          },
          algorithm: function algorithm(searchLowerCodes, prepared, searchLowerCode) {
            var targetLowerCodes = prepared._targetLowerCodes;
            var searchLen = searchLowerCodes.length;
            var targetLen = targetLowerCodes.length;
            var searchI = 0; // where we at
            var targetI = 0; // where you at
            var typoSimpleI = 0;
            var matchesSimpleLen = 0;

            // very basic fuzzy match; to remove non-matching targets ASAP!
            // walk through target. find sequential matches.
            // if all chars aren't found then exit
            for (;;) {
              var isMatch = searchLowerCode === targetLowerCodes[targetI];
              if (isMatch) {
                matchesSimple[matchesSimpleLen++] = targetI;
                ++searchI;
                if (searchI === searchLen) break;
                searchLowerCode = searchLowerCodes[typoSimpleI === 0 ? searchI : typoSimpleI === searchI ? searchI + 1 : typoSimpleI === searchI - 1 ? searchI - 1 : searchI];
              }
              ++targetI;
              if (targetI >= targetLen) {
                // Failed to find searchI
                // Check for typo or exit
                // we go as far as possible before trying to transpose
                // then we transpose backwards until we reach the beginning
                for (;;) {
                  if (searchI <= 1) return null; // not allowed to transpose first char
                  if (typoSimpleI === 0) {
                    // we haven't tried to transpose yet
                    --searchI;
                    var searchLowerCodeNew = searchLowerCodes[searchI];
                    if (searchLowerCode === searchLowerCodeNew) continue; // doesn't make sense to transpose a repeat char
                    typoSimpleI = searchI;
                  } else {
                    if (typoSimpleI === 1) return null; // reached the end of the line for transposing
                    --typoSimpleI;
                    searchI = typoSimpleI;
                    searchLowerCode = searchLowerCodes[searchI + 1];
                    var searchLowerCodeNew = searchLowerCodes[searchI];
                    if (searchLowerCode === searchLowerCodeNew) continue; // doesn't make sense to transpose a repeat char
                  }
                  matchesSimpleLen = searchI;
                  targetI = matchesSimple[matchesSimpleLen - 1] + 1;
                  break;
                }
              }
            }
            var searchI = 0;
            var typoStrictI = 0;
            var successStrict = false;
            var matchesStrictLen = 0;
            var nextBeginningIndexes = prepared._nextBeginningIndexes;
            if (nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target);
            var firstPossibleI = targetI = matchesSimple[0] === 0 ? 0 : nextBeginningIndexes[matchesSimple[0] - 1];

            // Our target string successfully matched all characters in sequence!
            // Let's try a more advanced and strict test to improve the score
            // only count it as a match if it's consecutive or a beginning character!
            if (targetI !== targetLen) for (;;) {
              if (targetI >= targetLen) {
                // We failed to find a good spot for this search char, go back to the previous search char and force it forward
                if (searchI <= 0) {
                  // We failed to push chars forward for a better match
                  // transpose, starting from the beginning
                  ++typoStrictI;
                  if (typoStrictI > searchLen - 2) break;
                  if (searchLowerCodes[typoStrictI] === searchLowerCodes[typoStrictI + 1]) continue; // doesn't make sense to transpose a repeat char
                  targetI = firstPossibleI;
                  continue;
                }
                --searchI;
                var lastMatch = matchesStrict[--matchesStrictLen];
                targetI = nextBeginningIndexes[lastMatch];
              } else {
                var isMatch = searchLowerCodes[typoStrictI === 0 ? searchI : typoStrictI === searchI ? searchI + 1 : typoStrictI === searchI - 1 ? searchI - 1 : searchI] === targetLowerCodes[targetI];
                if (isMatch) {
                  matchesStrict[matchesStrictLen++] = targetI;
                  ++searchI;
                  if (searchI === searchLen) {
                    successStrict = true;
                    break;
                  }
                  ++targetI;
                } else {
                  targetI = nextBeginningIndexes[targetI];
                }
              }
            }
            {
              // tally up the score & keep track of matches for highlighting later
              if (successStrict) {
                var matchesBest = matchesStrict;
                var matchesBestLen = matchesStrictLen;
              } else {
                var matchesBest = matchesSimple;
                var matchesBestLen = matchesSimpleLen;
              }
              var score = 0;
              var lastTargetI = -1;
              for (var i = 0; i < searchLen; ++i) {
                var targetI = matchesBest[i];
                // score only goes down if they're not consecutive
                if (lastTargetI !== targetI - 1) score -= targetI;
                lastTargetI = targetI;
              }
              if (!successStrict) {
                score *= 1000;
                if (typoSimpleI !== 0) score += -20; /*typoPenalty*/
              } else {
                if (typoStrictI !== 0) score += -20; /*typoPenalty*/
              }
              score -= targetLen - searchLen;
              prepared.score = score;
              prepared.indexes = new Array(matchesBestLen);
              for (var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i];
              return prepared;
            }
          },
          algorithmNoTypo: function algorithmNoTypo(searchLowerCodes, prepared, searchLowerCode) {
            var targetLowerCodes = prepared._targetLowerCodes;
            var searchLen = searchLowerCodes.length;
            var targetLen = targetLowerCodes.length;
            var searchI = 0; // where we at
            var targetI = 0; // where you at
            var matchesSimpleLen = 0;

            // very basic fuzzy match; to remove non-matching targets ASAP!
            // walk through target. find sequential matches.
            // if all chars aren't found then exit
            for (;;) {
              var isMatch = searchLowerCode === targetLowerCodes[targetI];
              if (isMatch) {
                matchesSimple[matchesSimpleLen++] = targetI;
                ++searchI;
                if (searchI === searchLen) break;
                searchLowerCode = searchLowerCodes[searchI];
              }
              ++targetI;
              if (targetI >= targetLen) return null; // Failed to find searchI
            }
            var searchI = 0;
            var successStrict = false;
            var matchesStrictLen = 0;
            var nextBeginningIndexes = prepared._nextBeginningIndexes;
            if (nextBeginningIndexes === null) nextBeginningIndexes = prepared._nextBeginningIndexes = fuzzysort.prepareNextBeginningIndexes(prepared.target);
            targetI = matchesSimple[0] === 0 ? 0 : nextBeginningIndexes[matchesSimple[0] - 1];

            // Our target string successfully matched all characters in sequence!
            // Let's try a more advanced and strict test to improve the score
            // only count it as a match if it's consecutive or a beginning character!
            if (targetI !== targetLen) for (;;) {
              if (targetI >= targetLen) {
                // We failed to find a good spot for this search char, go back to the previous search char and force it forward
                if (searchI <= 0) break; // We failed to push chars forward for a better match

                --searchI;
                var lastMatch = matchesStrict[--matchesStrictLen];
                targetI = nextBeginningIndexes[lastMatch];
              } else {
                var isMatch = searchLowerCodes[searchI] === targetLowerCodes[targetI];
                if (isMatch) {
                  matchesStrict[matchesStrictLen++] = targetI;
                  ++searchI;
                  if (searchI === searchLen) {
                    successStrict = true;
                    break;
                  }
                  ++targetI;
                } else {
                  targetI = nextBeginningIndexes[targetI];
                }
              }
            }
            {
              // tally up the score & keep track of matches for highlighting later
              if (successStrict) {
                var matchesBest = matchesStrict;
                var matchesBestLen = matchesStrictLen;
              } else {
                var matchesBest = matchesSimple;
                var matchesBestLen = matchesSimpleLen;
              }
              var score = 0;
              var lastTargetI = -1;
              for (var i = 0; i < searchLen; ++i) {
                var targetI = matchesBest[i];
                // score only goes down if they're not consecutive
                if (lastTargetI !== targetI - 1) score -= targetI;
                lastTargetI = targetI;
              }
              if (!successStrict) score *= 1000;
              score -= targetLen - searchLen;
              prepared.score = score;
              prepared.indexes = new Array(matchesBestLen);
              for (var i = matchesBestLen - 1; i >= 0; --i) prepared.indexes[i] = matchesBest[i];
              return prepared;
            }
          },
          prepareLowerCodes: function prepareLowerCodes(str) {
            var strLen = str.length;
            var lowerCodes = []; // new Array(strLen)    sparse array is too slow
            var lower = str.toLowerCase();
            for (var i = 0; i < strLen; ++i) lowerCodes[i] = lower.charCodeAt(i);
            return lowerCodes;
          },
          prepareBeginningIndexes: function prepareBeginningIndexes(target) {
            var targetLen = target.length;
            var beginningIndexes = [];
            var beginningIndexesLen = 0;
            var wasUpper = false;
            var wasAlphanum = false;
            for (var i = 0; i < targetLen; ++i) {
              var targetCode = target.charCodeAt(i);
              var isUpper = targetCode >= 65 && targetCode <= 90;
              var isAlphanum = isUpper || targetCode >= 97 && targetCode <= 122 || targetCode >= 48 && targetCode <= 57;
              var isBeginning = isUpper && !wasUpper || !wasAlphanum || !isAlphanum;
              wasUpper = isUpper;
              wasAlphanum = isAlphanum;
              if (isBeginning) beginningIndexes[beginningIndexesLen++] = i;
            }
            return beginningIndexes;
          },
          prepareNextBeginningIndexes: function prepareNextBeginningIndexes(target) {
            var targetLen = target.length;
            var beginningIndexes = fuzzysort.prepareBeginningIndexes(target);
            var nextBeginningIndexes = []; // new Array(targetLen)     sparse array is too slow
            var lastIsBeginning = beginningIndexes[0];
            var lastIsBeginningI = 0;
            for (var i = 0; i < targetLen; ++i) {
              if (lastIsBeginning > i) {
                nextBeginningIndexes[i] = lastIsBeginning;
              } else {
                lastIsBeginning = beginningIndexes[++lastIsBeginningI];
                nextBeginningIndexes[i] = lastIsBeginning === undefined ? targetLen : lastIsBeginning;
              }
            }
            return nextBeginningIndexes;
          },
          cleanup: cleanup,
          new: fuzzysortNew
        };
        return fuzzysort;
      } // fuzzysortNew

      // This stuff is outside fuzzysortNew, because it's shared with instances of fuzzysort.new()
      var isNode = typeof commonjsRequire !== 'undefined' && typeof window === 'undefined';
      var MyMap = typeof Map === 'function' ? Map : function () {
        var s = Object.create(null);
        this.get = function (k) {
          return s[k];
        };
        this.set = function (k, val) {
          s[k] = val;
          return this;
        };
        this.clear = function () {
          s = Object.create(null);
        };
      };
      var preparedCache = new MyMap();
      var preparedSearchCache = new MyMap();
      var noResults = [];
      noResults.total = 0;
      var matchesSimple = [];
      var matchesStrict = [];
      function cleanup() {
        preparedCache.clear();
        preparedSearchCache.clear();
        matchesSimple = [];
        matchesStrict = [];
      }
      function defaultScoreFn(a) {
        var max = -9007199254740991;
        for (var i = a.length - 1; i >= 0; --i) {
          var result = a[i];
          if (result === null) continue;
          var score = result.score;
          if (score > max) max = score;
        }
        if (max === -9007199254740991) return null;
        return max;
      }

      // prop = 'key'              2.5ms optimized for this case, seems to be about as fast as direct obj[prop]
      // prop = 'key1.key2'        10ms
      // prop = ['key1', 'key2']   27ms
      function getValue(obj, prop) {
        var tmp = obj[prop];
        if (tmp !== undefined) return tmp;
        var segs = prop;
        if (!Array.isArray(prop)) segs = prop.split('.');
        var len = segs.length;
        var i = -1;
        while (obj && ++i < len) obj = obj[segs[i]];
        return obj;
      }
      function isObj(x) {
        return _typeof(x) === 'object';
      } // faster as a function

      // Hacked version of https://github.com/lemire/FastPriorityQueue.js
      var fastpriorityqueue = function fastpriorityqueue() {
        var r = [],
          o = 0,
          e = {};
        function n() {
          for (var e = 0, n = r[e], c = 1; c < o;) {
            var f = c + 1;
            e = c, f < o && r[f].score < r[c].score && (e = f), r[e - 1 >> 1] = r[e], c = 1 + (e << 1);
          }
          for (var a = e - 1 >> 1; e > 0 && n.score < r[a].score; a = (e = a) - 1 >> 1) r[e] = r[a];
          r[e] = n;
        }
        return e.add = function (e) {
          var n = o;
          r[o++] = e;
          for (var c = n - 1 >> 1; n > 0 && e.score < r[c].score; c = (n = c) - 1 >> 1) r[n] = r[c];
          r[n] = e;
        }, e.poll = function () {
          if (0 !== o) {
            var e = r[0];
            return r[0] = r[--o], n(), e;
          }
        }, e.peek = function (e) {
          if (0 !== o) return r[0];
        }, e.replaceTop = function (o) {
          r[0] = o, n();
        }, e;
      };
      var q = fastpriorityqueue(); // reuse this, except for async, it needs to make its own

      return fuzzysortNew();
    }); // UMD

    // TODO: (performance) wasm version!?
    // TODO: (performance) threads?
    // TODO: (performance) avoid cache misses
    // TODO: (performance) preparedCache is a memory leak
    // TODO: (like sublime) backslash === forwardslash
    // TODO: (like sublime) spaces: "a b" should do 2 searches 1 for a and 1 for b
    // TODO: (scoring) garbage in targets that allows most searches to strict match need a penality
    // TODO: (performance) idk if allowTypo is optimized 
  })(fuzzysort$1);
  var fuzzysortExports = fuzzysort$1.exports;
  var fuzzysort = /*@__PURE__*/getDefaultExportFromCjs(fuzzysortExports);

  var hasOwn$1 = Object.prototype.hasOwnProperty;
  var DOM = {
    on: function on(elem, type, fn) {
      elem.addEventListener(type, fn, false);
    },
    off: function off(elem, type, fn) {
      elem.removeEventListener(type, fn, false);
    },
    onEach: function onEach(elems, type, fn) {
      var i = elems.length;
      while (i--) {
        DOM.on(elems[i], type, fn);
      }
    },
    // TODO: Use HTMLElement.classList. IE11+, except toggle(x,y), add(x,y), or remove(x,y).
    // TODO: Verify that eslint-plugin-compat catches those exceptions.
    hasClass: function hasClass(elem, name) {
      return (' ' + elem.className + ' ').indexOf(' ' + name + ' ') >= 0;
    },
    addClass: function addClass(elem, name) {
      if (!DOM.hasClass(elem, name)) {
        elem.className += (elem.className ? ' ' : '') + name;
      }
    },
    toggleClass: function toggleClass(elem, name, force) {
      if (force || typeof force === 'undefined' && !DOM.hasClass(elem, name)) {
        DOM.addClass(elem, name);
      } else {
        DOM.removeClass(elem, name);
      }
    },
    removeClass: function removeClass(elem, name) {
      var set = ' ' + elem.className + ' ';

      // Class name may appear multiple times
      while (set.indexOf(' ' + name + ' ') >= 0) {
        set = set.replace(' ' + name + ' ', ' ');
      }

      // Trim for prettiness
      elem.className = set.trim();
    }
  };
  function stripHtml(string) {
    // Strip tags, html entity and whitespaces
    return string.replace(/<\/?[^>]+(>|$)/g, '').replace(/&quot;/g, '').replace(/\s+/g, '');
  }
  var HtmlReporter = /*#__PURE__*/function () {
    /**
     * @internal Use QUnit.reporters.html.init() instead.
     *
     * @param {QUnit} QUnit
     * @param {Object} options
     * @param {Object} options.urlParams
     * @param {Object} options.config
     * - `boolean` options.config.hidepassed
     * - `boolean` options.config.collapse For test result
     * - `string` options.config.filter
     * - `?string` options.config.moduleId For module selector
     * - `?string` options.config.testId For test result, rerun link
     * - `number` options.config.maxDepth For test result, error message
     * @param {Function} options.abort
     * @param {HTMLElement|undefined|null} options.element Output element
     * If set to HTMLElement, the report will be written to this element.
     * If set to undefined, then at `QUnit.on('runStart')` we look for `#qunit`
     * and use that if it exists.
     * If set to null, the reporter is disabled.
     */
    function HtmlReporter(QUnit, options) {
      _classCallCheck(this, HtmlReporter);
      // Don't init the HTML Reporter in non-browser environments
      if (!window$1 || !document || !document.querySelector || options.element === null) {
        return;
      }
      this.stats = {
        failedTests: [],
        defined: 0,
        completed: 0
      };
      this.urlParams = options.urlParams;
      this.config = options.config;
      this.abort = options.abort;
      this.hiddenTests = [];
      // Keep state for our hidepassed toggle, which can change without a reload.
      // null indicates we use the config/urlParams. Otherwise this will be
      // true/undefined based on checkbox changes. We don't use false here since
      // that would serialize in makeUrl() as "false".
      this.hidepassed = null;
      this.collapseNext = false;
      this.unfilteredUrl = this.makeUrl({
        filter: undefined,
        module: undefined,
        moduleId: undefined,
        testId: undefined
      });
      this.dropdownData = null;

      // We must not fallback to creating `<div id="qunit">` ourselves if it
      // does not exist, because not having `<div id="qunit">` is how projects
      // indicate that they wish to run QUnit headless, and do their own reporter.
      //
      // If options.element was set to HTMLElement, or if `<div id="qunit">` already
      // exists (i.e. qunit.js script is placed at end of `<body>`), then we render
      // an initial layout now (which is mostly inert).
      // Otherwise, we wait until QUnit.start and the onRunStart event, which by
      // default is called from window.onload.
      //
      // If no element is found now, leave this.element as undefined (unchanged).
      // We will try again at onRunStart().
      this.element = options.element || document.querySelector('#qunit') || undefined;
      this.elementBanner = null;
      this.elementDisplay = null;
      this.elementTests = null;
      if (this.element) {
        this.appendInterface();
      }

      // NOTE: Only listen for "runStart" now.
      // Other event handlers are added via listen() from onRunStart,
      // after we know that the element exists. This reduces overhead and avoids
      // potential internal errors when the HTML Reporter is disabled.
      this.listen = function () {
        this.listen = null;
        // It's important that we're in the callback queue before any user-defined
        // "QUnit.begin()", because, if those may throw, ours wouldn't run and
        // the UI would remain blank or incomplete.
        // https://github.com/qunitjs/qunit/issues/1792
        QUnit.begin(this.onBegin.bind(this), prioritySymbol);
        // Use prioritySignal for testStart() to increase availability
        // of the HTML API for TESTID elements toward other event listeners.
        QUnit.testStart(this.onTestStart.bind(this), prioritySymbol);
        QUnit.log(this.onLog.bind(this), prioritySymbol);
        QUnit.testDone(this.onTestDone.bind(this));
        QUnit.on('runEnd', this.onRunEnd.bind(this));

        // It's important that we don't listen for onError until after
        // this.element is found and populated by appendInterface(), as
        // otherwise it will fail in appendTest() to display error details.
        // We've given on() a memory for "error" events to accomodate
        // late listening.
        QUnit.on('error', this.onError.bind(this), prioritySymbol);
      };
      QUnit.on('runStart', this.onRunStart.bind(this), prioritySymbol);
    }

    // Handle "submit" event from "filter" or "moduleFilter" field.
    return _createClass(HtmlReporter, [{
      key: "onFilterSubmit",
      value: function onFilterSubmit(ev) {
        // Trim potential accidental whitespace so that QUnit doesn't throw an error about no tests matching the filter.
        var filterInputElem = this.element.querySelector('#qunit-filter-input');
        filterInputElem.value = filterInputElem.value.trim();
        this.applyUrlParams();
        if (ev) {
          ev.preventDefault();
        }
        return false;
      }

      // Handle "click" events on toolbar checkboxes and "change" for select menus.
      // Updates the URL with the new state of `config.urlConfig` values.
    }, {
      key: "onToolbarChanged",
      value: function onToolbarChanged(ev) {
        var field = ev.currentTarget;

        // Detect if field is a select menu or a checkbox
        var value;
        if ('selectedIndex' in field) {
          value = field.options[field.selectedIndex].value || undefined;
        } else {
          value = field.checked ? field.defaultValue || true : undefined;
        }
        var updatedUrl = this.makeUrl(_defineProperty({}, field.name, value));

        // Check if we can apply the change without a page refresh
        if (field.name === 'hidepassed' && 'replaceState' in window$1.history) {
          // Set either true or undefined, which will now take precedence over
          // the original QUnit.urlParams in makeUrl()
          this.hidepassed = value;
          var tests = this.elementTests;
          if (field.checked) {
            var length = tests.children.length;
            var children = tests.children;
            for (var i = 0; i < length; i++) {
              var test = children[i];
              var className = test ? test.className : '';
              var classNameHasPass = className.indexOf('pass') > -1;
              var classNameHasSkipped = className.indexOf('skipped') > -1;
              if (classNameHasPass || classNameHasSkipped) {
                this.hiddenTests.push(test);
              }
            }

            // Optimization: Avoid for-of iterator overhead.
            for (var _i = 0; _i < this.hiddenTests.length; _i++) {
              tests.removeChild(this.hiddenTests[_i]);
            }
          } else {
            // Optimization: Avoid Array.shift() which would mutate the array many times.
            // As of Chrome 126, HTMLElement.append(...hiddenTests) is still slower than
            // calling appendChild in a loop.
            for (var _i2 = 0; _i2 < this.hiddenTests.length; _i2++) {
              tests.appendChild(this.hiddenTests[_i2]);
            }
            this.hiddenTests.length = 0;
          }
          window$1.history.replaceState(null, '', updatedUrl);
        } else {
          window$1.location = updatedUrl;
        }
      }

      /**
       * @param {Object.<string,boolean|string|string[]>} linkParams
       * @return string
       */
    }, {
      key: "makeUrl",
      value: function makeUrl(linkParams) {
        var params = extend({}, this.urlParams);
        if (this.hidepassed !== null) {
          params.hidepassed = this.hidepassed;
        }
        extend(params, linkParams);
        var querystring = '?';
        for (var key in params) {
          // Skip inherited or undefined properties
          if (hasOwn$1.call(params, key) && params[key] !== undefined) {
            // Output a parameter for each value of this key
            // (but usually just one)
            var arrValue = [].concat(params[key]);
            for (var i = 0; i < arrValue.length; i++) {
              querystring += encodeURIComponent(key);
              if (arrValue[i] !== true) {
                querystring += '=' + encodeURIComponent(arrValue[i]);
              }
              querystring += '&';
            }
          }
        }
        return window$1.location.pathname + querystring.slice(0, -1);
      }
    }, {
      key: "applyUrlParams",
      value: function applyUrlParams() {
        var filter = this.element.querySelector('#qunit-filter-input').value;
        window$1.location = this.makeUrl({
          filter: filter === '' ? undefined : filter,
          moduleId: _toConsumableArray(this.dropdownData.selectedMap.keys()),
          // Remove module and testId filter
          module: undefined,
          testId: undefined
        });
      }
    }, {
      key: "abortTestsButton",
      value: function abortTestsButton() {
        var _this = this;
        var button = document.createElement('button');
        button.id = 'qunit-abort-tests-button';
        button.textContent = 'Abort';
        DOM.on(button, 'click', function () {
          button.disabled = true;
          button.textContent = 'Aborting...';
          _this.abort();
          return false;
        });
        return button;
      }
    }, {
      key: "toolbarLooseFilter",
      value: function toolbarLooseFilter() {
        var filter = document.createElement('form');
        filter.className = 'qunit-filter';
        var label = document.createElement('label');
        label.textContent = 'Filter: ';
        var input = document.createElement('input');
        input.type = 'text';
        input.value = this.config.filter || '';
        input.name = 'filter';
        input.id = 'qunit-filter-input';
        label.appendChild(input);
        var button = document.createElement('button');
        button.textContent = 'Go';
        filter.appendChild(label);
        filter.appendChild(document.createTextNode(' '));
        filter.appendChild(button);
        DOM.on(filter, 'submit', this.onFilterSubmit.bind(this));
        return filter;
      }
    }, {
      key: "toolbarModuleFilter",
      value: function toolbarModuleFilter(beginDetails) {
        var initialSelected = null;
        var dropdownData = this.dropdownData = {
          options: beginDetails.modules.slice(),
          selectedMap: new StringMap(),
          isDirty: function isDirty() {
            return _toConsumableArray(dropdownData.selectedMap.keys()).sort().join(',') !== _toConsumableArray(initialSelected.keys()).sort().join(',');
          }
        };
        if (this.config.moduleId && this.config.moduleId.length) {
          // The module dropdown is seeded with the runtime configuration of the last run.
          //
          // We don't reference `config.moduleId` directly after this and keep our own
          // copy because:
          // 1. This naturally filters out unknown moduleIds.
          // 2. Gives us a place to manage and remember unsubmitted checkbox changes.
          // 3. Gives us an efficient way to map a selected moduleId to module name
          //    during rendering.
          for (var i = 0; i < beginDetails.modules.length; i++) {
            var mod = beginDetails.modules[i];
            if (this.config.moduleId.indexOf(mod.moduleId) !== -1) {
              dropdownData.selectedMap.set(mod.moduleId, mod.name);
            }
          }
        }
        initialSelected = new StringMap(dropdownData.selectedMap);
        function createModuleListItem(moduleId, name, checked) {
          return '<li><label class="clickable' + (checked ? ' checked' : '') + '"><input type="checkbox" ' + 'value="' + escapeText(moduleId) + '"' + (checked ? ' checked="checked"' : '') + ' />' + escapeText(name) + '</label></li>';
        }

        /**
         * @param {Array} Results from fuzzysort
         * @return {string} HTML
         */
        function moduleListHtml(results) {
          var html = '';

          // Hoist the already selected items, and show them always
          // even if not matched by the current search.
          dropdownData.selectedMap.forEach(function (name, moduleId) {
            html += createModuleListItem(moduleId, name, true);
          });
          for (var _i3 = 0; _i3 < results.length; _i3++) {
            var _mod = results[_i3].obj;
            if (!dropdownData.selectedMap.has(_mod.moduleId)) {
              html += createModuleListItem(_mod.moduleId, _mod.name, false);
            }
          }
          return html;
        }
        var label = document.createElement('label');
        label.htmlFor = 'qunit-modulefilter-search';
        label.textContent = "Module:\xA0 ";
        var searchContainer = document.createElement('span');
        searchContainer.id = 'qunit-modulefilter-search-container';
        label.appendChild(searchContainer);
        var moduleSearch = document.createElement('input');
        // Set type=text explicitly for ease of styling
        moduleSearch.setAttribute('type', 'text');
        moduleSearch.id = 'qunit-modulefilter-search';
        moduleSearch.autocomplete = 'off';
        DOM.on(moduleSearch, 'input', searchInput);
        DOM.on(moduleSearch, 'input', searchFocus);
        DOM.on(moduleSearch, 'focus', searchFocus);
        DOM.on(moduleSearch, 'click', searchFocus);
        searchContainer.appendChild(moduleSearch);
        var applyButton = document.createElement('button');
        applyButton.textContent = 'Apply';
        applyButton.title = 'Re-run the selected test modules';
        DOM.on(applyButton, 'click', this.applyUrlParams.bind(this));
        var resetButton = document.createElement('button');
        resetButton.textContent = 'Reset';
        resetButton.type = 'reset';
        resetButton.title = 'Restore the previous module selection';
        var clearButton = document.createElement('button');
        clearButton.textContent = 'Select none';
        clearButton.type = 'button';
        clearButton.title = 'Clear the current module selection';
        DOM.on(clearButton, 'click', function () {
          dropdownData.selectedMap.clear();
          selectionChange();
          searchInput();
        });
        var actions = document.createElement('span');
        actions.id = 'qunit-modulefilter-actions';
        actions.appendChild(applyButton);
        actions.appendChild(resetButton);
        if (initialSelected.size) {
          // Only show clear button if functionally different from reset
          actions.appendChild(clearButton);
        }
        var dropDownList = document.createElement('ul');
        dropDownList.id = 'qunit-modulefilter-dropdown-list';
        var dropDown = document.createElement('div');
        dropDown.id = 'qunit-modulefilter-dropdown';
        dropDown.style.display = 'none';
        dropDown.appendChild(actions);
        dropDown.appendChild(dropDownList);
        DOM.on(dropDown, 'change', selectionChange);
        searchContainer.appendChild(dropDown);
        // Set initial moduleSearch.placeholder and clearButton/resetButton.
        selectionChange();
        var moduleFilter = document.createElement('form');
        moduleFilter.id = 'qunit-modulefilter';
        moduleFilter.appendChild(label);
        DOM.on(moduleFilter, 'submit', this.onFilterSubmit.bind(this));
        DOM.on(moduleFilter, 'reset', function () {
          dropdownData.selectedMap = new StringMap(initialSelected);
          // Set moduleSearch.placeholder and reflect non-dirty state
          selectionChange();
          searchInput();
        });

        // Enables show/hide for the dropdown
        function searchFocus() {
          if (dropDown.style.display !== 'none') {
            return;
          }

          // Optimization: Defer rendering options until focussed.
          // https://github.com/qunitjs/qunit/issues/1664
          // To test or benchmark, use /demos/q4000-qunit.html.
          searchInput();
          dropDown.style.display = 'block';

          // Hide on Escape keydown or on click outside the container
          DOM.on(document, 'click', hideHandler);
          DOM.on(document, 'keydown', hideHandler);
          function hideHandler(e) {
            var inContainer = moduleFilter.contains(e.target);
            if (e.keyCode === 27 || !inContainer) {
              if (e.keyCode === 27 && inContainer) {
                moduleSearch.focus();
              }
              dropDown.style.display = 'none';
              DOM.off(document, 'click', hideHandler);
              DOM.off(document, 'keydown', hideHandler);
              moduleSearch.value = '';
              searchInput();
            }
          }
        }

        /**
         * @param {string} searchText
         * @return {string} HTML
         */
        function filterModules(searchText) {
          var results;
          // Optimization: Limit number of results to ensure UI is responsive.
          // To benchmark typeahead responsiveness, use /demos/q4000-qunit.html.
          if (searchText === '') {
            // Improve on-boarding experience by having an immediate display of
            // module names, indicating how the interface works. This also makes
            // for a quicker interaction in the common case of small projects.
            // Don't mandate typing just to get the menu.
            results = dropdownData.options.slice(0, 100).map(function (obj) {
              // Fake empty results. https://github.com/farzher/fuzzysort/issues/41
              return {
                obj: obj
              };
            });
          } else {
            results = fuzzysort.go(searchText, dropdownData.options, {
              limit: 100,
              key: 'name',
              allowTypo: true
            });
          }
          return moduleListHtml(results);
        }

        // Processes module search box input
        var searchInputTimeout;
        function searchInput() {
          // Use a debounce with a ~0ms timeout. This is effectively instantaneous,
          // but is better than undebounced because it avoids an ever-growing
          // backlog of unprocessed now-outdated input events if fuzzysearch or
          // drodown DOM is slow (e.g. very large test suite).
          window$1.clearTimeout(searchInputTimeout);
          searchInputTimeout = window$1.setTimeout(function () {
            dropDownList.innerHTML = filterModules(moduleSearch.value);
          });
        }

        // Processes checkbox change, or a generic render (initial render, or after reset event)
        // Avoid any dropdown rendering here as this is used by toolbarModuleFilter()
        // during the initial render, which should not delay test execution.
        function selectionChange(evt) {
          var checkbox = evt && evt.target || null;
          if (checkbox) {
            // Update internal state
            if (checkbox.checked) {
              dropdownData.selectedMap.set(checkbox.value, checkbox.parentNode.textContent);
            } else {
              dropdownData.selectedMap.delete(checkbox.value);
            }

            // Update UI state
            DOM.toggleClass(checkbox.parentNode, 'checked', checkbox.checked);
          }
          var textForm = dropdownData.selectedMap.size ? dropdownData.selectedMap.size + ' ' + (dropdownData.selectedMap.size === 1 ? 'module' : 'modules') : 'All modules';
          moduleSearch.placeholder = textForm;
          moduleSearch.title = 'Type to search through and reduce the list.';
          resetButton.disabled = !dropdownData.isDirty();
          clearButton.style.display = dropdownData.selectedMap.size ? '' : 'none';
        }
        return moduleFilter;
      }
    }, {
      key: "getUrlConfigHtml",
      value: function getUrlConfigHtml() {
        var urlConfig = this.config.urlConfig;
        var urlConfigHtml = '';
        for (var i = 0; i < urlConfig.length; i++) {
          // Options can be either strings or objects with nonempty "id" properties
          var val = urlConfig[i];
          if (typeof val === 'string') {
            val = {
              id: val,
              label: val
            };
          }

          // https://github.com/qunitjs/qunit/issues/1792
          var currentVal = this.config[val.id] !== undefined ? this.config[val.id] : this.urlParams[val.id];
          var escaped = escapeText(val.id);
          var escapedTooltip = escapeText(val.tooltip);
          if (!val.value || typeof val.value === 'string') {
            urlConfigHtml += '<label for="qunit-urlconfig-' + escaped + '" title="' + escapedTooltip + '"><input id="qunit-urlconfig-' + escaped + '" name="' + escaped + '" type="checkbox"' + (val.value ? ' value="' + escapeText(val.value) + '"' : '') + (currentVal ? ' checked="checked"' : '') + ' title="' + escapedTooltip + '" />' + escapeText(val.label) + '</label>';
          } else {
            var selection = false;
            urlConfigHtml += '<label for="qunit-urlconfig-' + escaped + '" title="' + escapedTooltip + '">' + escapeText(val.label) + ': <select id="qunit-urlconfig-' + escaped + '" name="' + escaped + '" title="' + escapedTooltip + '"><option></option>';
            if (Array.isArray(val.value)) {
              for (var j = 0; j < val.value.length; j++) {
                escaped = escapeText(val.value[j]);
                urlConfigHtml += '<option value="' + escaped + '"' + (currentVal === val.value[j] ? (selection = true) && ' selected="selected"' : '') + '>' + escaped + '</option>';
              }
            } else {
              for (var _j in val.value) {
                if (hasOwn$1.call(val.value, _j)) {
                  urlConfigHtml += '<option value="' + escapeText(_j) + '"' + (currentVal === _j ? (selection = true) && ' selected="selected"' : '') + '>' + escapeText(val.value[_j]) + '</option>';
                }
              }
            }
            if (currentVal && !selection) {
              escaped = escapeText(currentVal);
              urlConfigHtml += '<option value="' + escaped + '" selected="selected" disabled="disabled">' + escaped + '</option>';
            }
            urlConfigHtml += '</select></label>';
          }
        }
        return urlConfigHtml;
      }
    }, {
      key: "appendToolbarControls",
      value: function appendToolbarControls(beginDetails) {
        var toolbarControls = this.element.querySelector('#qunit-testrunner-toolbar');
        if (toolbarControls) {
          var urlConfigContainer = document.createElement('span');
          urlConfigContainer.id = 'qunit-toolbar-urlconfig';
          urlConfigContainer.className = 'qunit-url-config';
          urlConfigContainer.innerHTML = this.getUrlConfigHtml();
          DOM.onEach(urlConfigContainer.getElementsByTagName('input'), 'change', this.onToolbarChanged.bind(this));
          DOM.onEach(urlConfigContainer.getElementsByTagName('select'), 'change', this.onToolbarChanged.bind(this));
          var toolbarFilters = document.createElement('span');
          toolbarFilters.id = 'qunit-toolbar-filters';
          toolbarFilters.appendChild(this.toolbarLooseFilter());
          toolbarFilters.appendChild(this.toolbarModuleFilter(beginDetails));
          toolbarControls.appendChild(urlConfigContainer);
          toolbarControls.appendChild(toolbarFilters);
        }
      }
    }, {
      key: "appendTestResultControls",
      value: function appendTestResultControls() {
        var controls = this.element.querySelector('#qunit-testresult-controls');
        if (controls) {
          controls.appendChild(this.abortTestsButton());
        }
      }
    }, {
      key: "appendFilteredTest",
      value: function appendFilteredTest() {
        var testId = this.config.testId;
        if (!testId || testId.length <= 0) {
          return '';
        }
        return '<div id="qunit-filteredTest">Rerunning selected tests: ' + escapeText(testId.join(', ')) + ' <a id="qunit-clearFilter" href="' + escapeText(this.unfilteredUrl) + '">Run all tests</a></div>';
      }
    }, {
      key: "appendInterface",
      value: function appendInterface() {
        // Since QUnit 1.3, these are created automatically.
        this.element.setAttribute('role', 'main');
        this.element.innerHTML = '<div id="qunit-header">' + '<h1><a href="' + escapeText(this.unfilteredUrl) + '">' + escapeText(document.title) + '</a></h1> ' + '<div id="qunit-userAgent" data-version="' + escapeText(version) + '" data-useragent="' + escapeText(navigator.userAgent) + '">' + escapeText('QUnit ' + version) + '</div>' + '</div>' + '<div id="qunit-toolbar" role="navigation">' + '<div id="qunit-banner"></div>' + '<div id="qunit-testrunner-toolbar"></div>' + '<div id="qunit-testresult" class="result">' + '<div id="qunit-testresult-controls"></div>' + '<div id="qunit-testresult-display">Running...<br />&#160;</div>' + '</div>' + this.appendFilteredTest() + '</div>' + '<ol id="qunit-tests"></ol>';
        this.elementBanner = this.element.querySelector('#qunit-banner');
        this.elementDisplay = this.element.querySelector('#qunit-testresult-display');
        this.elementTests = this.element.querySelector('#qunit-tests');
      }
    }, {
      key: "appendTest",
      value: function appendTest(name, testId, moduleName) {
        var title = document.createElement('strong');
        title.className = 'qunit-test-name';
        title.innerHTML = getNameHtml(name, moduleName);
        var testBlock = document.createElement('li');
        testBlock.className = 'qunit-test running';
        testBlock.appendChild(title);

        // No ID or rerun link for "global failure" blocks
        if (testId !== undefined) {
          var rerunTrigger = document.createElement('a');
          rerunTrigger.textContent = 'Rerun';
          rerunTrigger.href = this.makeUrl({
            testId: testId
          });
          testBlock.id = 'qunit-test-output-' + testId;
          testBlock.appendChild(rerunTrigger);
        }
        var assertList = document.createElement('ol');
        assertList.className = 'qunit-assert-list';
        testBlock.appendChild(assertList);
        this.elementTests.appendChild(testBlock);
        return testBlock;
      }

      // HTML Reporter initialization and load
    }, {
      key: "onRunStart",
      value: function onRunStart(runStart) {
        if (this.config.reporters && this.config.reporters.html === false) {
          // If QUnit.config.reporters.html was set to false after loading QUnit,
          // then undo the initial layout (created from browser-runnner.js)
          if (this.element) {
            this.element.innerHTML = '';
            this.element = null;
          }
          return;
        }
        if (!this.element) {
          this.element = document.querySelector('#qunit') || null;
          if (!this.element) {
            return;
          }
          this.appendInterface();
        }
        this.stats.defined = runStart.testCounts.total;

        // Element exists, now it is safe to attach other event listeners
        this.listen();
      }

      // Display the HTML Reporter interface
      //
      // This is done from begin() instead of runStart, because urlparams.js uses begin(),
      // which we need to wait for. urlparams.js in turn uses begin() to allow plugins to
      // add entries to QUnit.config.urlConfig, which may be done asynchronously.
      // https://github.com/qunitjs/qunit/issues/1657
    }, {
      key: "onBegin",
      value: function onBegin(beginDetails) {
        this.appendToolbarControls(beginDetails);
        this.appendTestResultControls();
        this.elementDisplay.className = 'running';
      }
    }, {
      key: "getRerunFailedHtml",
      value: function getRerunFailedHtml(failedTests) {
        if (failedTests.length === 0) {
          return '';
        }
        var href = this.makeUrl({
          testId: failedTests
        });
        return ['<br /><a href="' + escapeText(href) + '">', failedTests.length === 1 ? 'Rerun 1 failed test' : 'Rerun ' + failedTests.length + ' failed tests', '</a>'].join('');
      }
    }, {
      key: "onRunEnd",
      value: function onRunEnd(runEnd) {
        function msToSec(milliseconds) {
          // Will return a whole number of seconds,
          // or e.g. "0.2", "0.03" or "0.004".
          var sec = milliseconds > 1000 ? '' + Math.round(milliseconds / 1000) : (milliseconds / 1000).toPrecision(1);
          return sec + (sec === '1' ? ' second' : ' seconds');
        }
        var abortButton = this.element.querySelector('#qunit-abort-tests-button');
        var html = ['<span class="total">', runEnd.testCounts.total, '</span> tests completed in ', msToSec(runEnd.runtime), '.<br/>', '<span class="passed">', runEnd.testCounts.passed, '</span> passed, ', '<span class="skipped">', runEnd.testCounts.skipped, '</span> skipped, ', '<span class="failed">', runEnd.testCounts.failed, '</span> failed, ', 'and <span class="todo">', runEnd.testCounts.todo, '</span> todo.', this.getRerunFailedHtml(this.stats.failedTests)].join('');

        // Update remaining tests to aborted
        if (abortButton && abortButton.disabled) {
          html = 'Tests aborted after ' + msToSec(runEnd.runtime) + '.';
          for (var i = 0; i < this.elementTests.children.length; i++) {
            var test = this.elementTests.children[i];
            if (DOM.hasClass(test.className, 'running')) {
              test.className = 'aborted';
              var assertList = test.getElementsByTagName('ol')[0];
              var assertLi = document.createElement('li');
              assertLi.className = 'fail';
              assertLi.textContent = 'Test aborted.';
              assertList.appendChild(assertLi);
            }
          }
        }
        if (!abortButton || abortButton.disabled === false) {
          this.elementBanner.className = runEnd.status === 'failed' ? 'qunit-fail' : 'qunit-pass';
        }
        if (abortButton) {
          abortButton.parentNode.removeChild(abortButton);
        }
        this.elementDisplay.innerHTML = html;
      }
    }, {
      key: "onTestStart",
      value: function onTestStart(details) {
        this.appendTest(details.name, details.testId, details.module);
        this.elementDisplay.innerHTML = [details.previousFailure ? 'Rerunning previously failed test: <br />' : "Running test ".concat(this.stats.completed, " of ").concat(this.stats.defined, ": <br />"), getNameHtml(details.name, details.module), this.getRerunFailedHtml(this.stats.failedTests)].join('');
        if (this.elementBanner.style.setProperty) {
          this.elementBanner.style.setProperty('--qunit-progress', Math.ceil((this.stats.completed + 1) / this.stats.defined * 100) + '%');
        }
      }
    }, {
      key: "onLog",
      value: function onLog(details) {
        var testItem = this.element.querySelector('#qunit-test-output-' + details.testId);
        if (!testItem) {
          return;
        }
        var message = escapeText(details.message) || (details.result ? 'okay' : 'failed');
        message = '<span class="test-message">' + message + '</span>';
        message += '<span class="runtime">@ ' + details.runtime + ' ms</span>';
        var expected;
        var actual;

        // When pushFailure() is called, it is implied that no expected value
        // or diff should be shown, because both expected and actual as undefined.
        //
        // This must check details.expected existence. If it exists as undefined,
        // that's a regular assertion for which to render actual/expected and a diff.
        var showAnyValues = !details.result && (details.expected !== undefined || details.actual !== undefined);
        if (showAnyValues) {
          if (details.negative) {
            expected = 'NOT ' + dump.parse(details.expected);
          } else {
            expected = dump.parse(details.expected);
          }
          actual = dump.parse(details.actual);
          message += '<table><tr class="test-expected"><th>Expected: </th><td><pre>' + escapeText(expected) + '</pre></td></tr>';
          if (actual !== expected) {
            message += '<tr class="test-actual"><th>Result: </th><td><pre>' + escapeText(actual) + '</pre></td></tr>';
            var showDiff = false;
            var diffHtml;
            if (typeof details.actual === 'number' && typeof details.expected === 'number') {
              if (!isNaN(details.actual) && !isNaN(details.expected)) {
                showDiff = true;
                var numDiff = details.actual - details.expected;
                diffHtml = (numDiff > 0 ? '+' : '') + numDiff;
              }
            } else if (typeof details.actual !== 'boolean' && typeof details.expected !== 'boolean') {
              diffHtml = diff(expected, actual);

              // don't show diff if there is zero overlap
              showDiff = stripHtml(diffHtml).length !== stripHtml(expected).length + stripHtml(actual).length;
            }
            if (showDiff) {
              message += '<tr class="test-diff"><th>Diff: </th><td><pre>' + diffHtml + '</pre></td></tr>';
            }
          } else if (expected.indexOf('[object Array]') !== -1 || expected.indexOf('[object Object]') !== -1) {
            message += '<tr class="test-message"><th>Message: </th><td>' + 'Diff suppressed as the depth of object is more than current max depth (' + this.config.maxDepth + ').<p>Hint: Use <code>QUnit.dump.maxDepth</code> to ' + ' run with a higher max depth or <a href="' + escapeText(this.makeUrl({
              maxDepth: 0
            })) + "'>" + 'Rerun</a> without max depth.</p></td></tr>';
          } else {
            message += '<tr class="test-message"><th>Message: </th><td>' + 'Diff suppressed as the expected and actual results have an equivalent' + ' serialization</td></tr>';
          }
          if (details.source) {
            message += '<tr class="test-source"><th>Source: </th><td><pre>' + escapeText(details.source) + '</pre></td></tr>';
          }
          message += '</table>';

          // This occurs when pushFailure is called and we have an extracted stack trace
        } else if (!details.result && details.source) {
          message += '<table>' + '<tr class="test-source"><th>Source: </th><td><pre>' + escapeText(details.source) + '</pre></td></tr>' + '</table>';
        }
        var assertList = testItem.getElementsByTagName('ol')[0];
        var assertLi = document.createElement('li');
        assertLi.className = details.result ? 'pass' : 'fail';
        assertLi.innerHTML = message;
        assertList.appendChild(assertLi);
      }
    }, {
      key: "onTestDone",
      value: function onTestDone(details) {
        var testItem = this.elementTests.querySelector('#qunit-test-output-' + details.testId);
        if (!testItem) {
          return;
        }

        // This test passed if it has no unexpected failed assertions
        // TODO: Add "status" from TestReport#getStatus() to testDone() and use that.
        var status;
        if (details.skipped) {
          status = 'skipped';
        } else {
          var passed = details.failed > 0 ? details.todo : !details.todo;
          status = !passed ? 'failed' : details.todo ? 'todo' : 'passed';
        }
        var testPassed = status !== 'failed';
        this.stats.completed++;
        if (!testPassed) {
          this.stats.failedTests.push(details.testId);
        }

        // The testItem.firstChild is the test name
        var testTitle = testItem.firstChild;
        var assertList = testItem.getElementsByTagName('ol')[0];
        // Collapse passing tests by default
        if (testPassed) {
          DOM.addClass(assertList, 'qunit-collapsed');
        } else {
          if (this.config.collapse) {
            if (!this.collapseNext) {
              // Skip collapsing the first failing test
              this.collapseNext = true;
            } else {
              // Collapse subsequent failing tests
              DOM.addClass(assertList, 'qunit-collapsed');
            }
          }
        }
        if (status !== 'skipped') {
          DOM.on(testTitle, 'click', function () {
            DOM.toggleClass(assertList, 'qunit-collapsed');
          });
        }
        var good = details.passed;
        var bad = details.failed;
        var badGoodCounts = bad ? '<span class="failed">' + bad + '</span>, ' + '<span class="passed">' + good + '</span>, ' : '';
        testTitle.innerHTML += ' <span class="counts">(' + badGoodCounts + details.total + ')</span>';
        DOM.removeClass(testItem, 'running');
        if (status === 'skipped') {
          DOM.addClass(testItem, 'skipped');
          var skipped = document.createElement('em');
          skipped.className = 'qunit-skipped-label';
          skipped.textContent = 'skipped';
          testItem.insertBefore(skipped, testTitle);
          testItem.insertBefore(document.createTextNode(' '), testTitle);
        } else {
          DOM.addClass(testItem, testPassed ? 'pass' : 'fail');
          if (details.todo) {
            // Add label both for status=todo (passing) and for status=failed on a todo test.
            DOM.addClass(testItem, 'todo');
            var todoLabel = document.createElement('em');
            todoLabel.className = 'qunit-todo-label';
            todoLabel.textContent = 'todo';
            testItem.insertBefore(todoLabel, testTitle);
            testItem.insertBefore(document.createTextNode(' '), testTitle);
          }
          var time = document.createElement('span');
          time.className = 'runtime';
          time.textContent = details.runtime + ' ms';
          testItem.insertBefore(time, assertList);
        }

        // Show the source of the test when showing assertions
        if (details.source) {
          var sourceName = document.createElement('p');
          sourceName.innerHTML = '<strong>Source: </strong>' + escapeText(details.source);
          DOM.addClass(sourceName, 'qunit-source');
          if (testPassed) {
            DOM.addClass(sourceName, 'qunit-collapsed');
          }
          DOM.on(testTitle, 'click', function () {
            DOM.toggleClass(sourceName, 'qunit-collapsed');
          });
          testItem.appendChild(sourceName);
        }
        var hidepassed = this.hidepassed !== null ? this.hidepassed : this.config.hidepassed;
        if (hidepassed && (status === 'passed' || details.skipped)) {
          this.hiddenTests.push(testItem);
          // use removeChild() instead of remove() for wider browser support
          this.elementTests.removeChild(testItem);
        }
      }
    }, {
      key: "onError",
      value: function onError(error) {
        var testItem = this.appendTest('global failure');

        // Render similar to a failed assertion (see above QUnit.log callback)
        var message = escapeText(errorString(error));
        message = '<span class="test-message">' + message + '</span>';
        if (error && error.stack) {
          message += '<table>' + '<tr class="test-source"><th>Source: </th><td><pre>' + escapeText(error.stack) + '</pre></td></tr>' + '</table>';
        }
        var assertList = testItem.getElementsByTagName('ol')[0];
        var assertLi = document.createElement('li');
        assertLi.className = 'fail';
        assertLi.innerHTML = message;
        assertList.appendChild(assertLi);

        // Make it visible
        DOM.removeClass(testItem, 'running');
        DOM.addClass(testItem, 'fail');
      }
    }], [{
      key: "init",
      value:
      /**
       * @param {QUnit} QUnit
       * @param {Object} [options] For internal usage
       */
      function init(QUnit) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return new HtmlReporter(QUnit, extend(options, {
          urlParams: QUnit.urlParams,
          // This must use a live reference (i.e. not store a copy), because
          // users may apply their settings to QUnit.config anywhere between
          // loading qunit.js and the last QUnit.begin() listener finishing.
          config: QUnit.config,
          abort: function abort() {
            QUnit.config._pq.abort();
          }
        }));
      }
    }]);
  }();
  function getNameHtml(name, module) {
    var nameHtml = '';
    if (module) {
      nameHtml = '<span class="module-name">' + escapeText(module) + '</span>: ';
    }
    nameHtml += '<span class="test-name">' + escapeText(name) + '</span>';
    return nameHtml;
  }

  var reporters = {
    console: ConsoleReporter,
    perf: PerfReporter,
    tap: TapReporter,
    html: HtmlReporter
  };

  var TestReport = /*#__PURE__*/function () {
    function TestReport(name, suite, options) {
      _classCallCheck(this, TestReport);
      this.name = name;
      this.suiteName = suite.name;
      this.fullName = suite.fullName.concat(name);
      this.runtime = 0;
      this.assertions = [];
      this.skipped = !!options.skip;
      this.todo = !!options.todo;
      this.valid = options.valid;
      this._startTime = 0;
      this._endTime = 0;
      suite.pushTest(this);
    }
    return _createClass(TestReport, [{
      key: "start",
      value: function start(recordTime) {
        if (recordTime) {
          this._startTime = performance.now();
        }
        return {
          name: this.name,
          suiteName: this.suiteName,
          fullName: this.fullName.slice()
        };
      }
    }, {
      key: "end",
      value: function end(recordTime) {
        if (recordTime) {
          this._endTime = performance.now();
        }
        return extend(this.start(), {
          runtime: this.getRuntime(),
          status: this.getStatus(),
          errors: this.getFailedAssertions(),
          assertions: this.getAssertions()
        });
      }
    }, {
      key: "pushAssertion",
      value: function pushAssertion(assertion) {
        this.assertions.push(assertion);
      }
    }, {
      key: "getRuntime",
      value: function getRuntime() {
        return Math.round(this._endTime - this._startTime);
      }
    }, {
      key: "getStatus",
      value: function getStatus() {
        if (this.skipped) {
          return 'skipped';
        }
        var testPassed = this.getFailedAssertions().length > 0 ? this.todo : !this.todo;
        if (!testPassed) {
          return 'failed';
        } else if (this.todo) {
          return 'todo';
        } else {
          return 'passed';
        }
      }
    }, {
      key: "getFailedAssertions",
      value: function getFailedAssertions() {
        return this.assertions.filter(function (assertion) {
          return !assertion.passed;
        });
      }
    }, {
      key: "getAssertions",
      value: function getAssertions() {
        return this.assertions.slice();
      }

      // Remove actual and expected values from assertions. This is to prevent
      // leaking memory throughout a test suite.
    }, {
      key: "slimAssertions",
      value: function slimAssertions() {
        this.assertions = this.assertions.map(function (assertion) {
          delete assertion.actual;
          delete assertion.expected;
          return assertion;
        });
      }
    }]);
  }();

  function Test(settings) {
    this.expected = null;
    this.assertions = [];
    this.module = config.currentModule;
    this.steps = [];
    // Track count in order to detect likely issue when upgrading.
    // https://github.com/qunitjs/qunit/pull/1775
    this.stepsCount = 0;
    this.timeout = undefined;
    this.data = undefined;
    this.withData = false;
    this.pauses = new StringMap();
    this.nextPauseId = 1;

    // For the most common case, we have:
    // - 0: new Test
    // - 1: addTest
    // - 2: QUnit.test
    // - 3: user file
    //
    // A notable exception is test.each(), which overrides this.
    this.stackOffset = 3;
    extend(this, settings);

    // If a module is skipped, all its tests and the tests of the child suites
    // should be treated as skipped even if they are defined as `only` or `todo`.
    // As for `todo` module, all its tests will be treated as `todo` except for
    // tests defined as `skip` which will be left intact.
    //
    // So, if a test is defined as `todo` and is inside a skipped module, we should
    // then treat that test as if was defined as `skip`.
    if (this.module.skip) {
      this.skip = true;
      this.todo = false;

      // Skipped tests should be left intact
    } else if (this.module.todo && !this.skip) {
      this.todo = true;
    }

    // Queuing a late test after the run has ended is not allowed.
    // This was once supported for internal use by QUnit.onUncaughtException(),
    // to render a "global error" if the uncaught error happened outside a test
    // and after the runEnd event. This was unstable and could be missed by CI.
    // (Meaning the CI would pass despite the late-failing test).
    // Ref https://github.com/qunitjs/qunit/issues/1377
    if (config._pq.finished) {
      throw new Error('Unexpected test after runEnd. https://qunitjs.com/api/QUnit/module/#E0001');
    }
    if (!this.skip && typeof this.callback !== 'function') {
      var method = this.todo ? 'QUnit.todo' : 'QUnit.test';
      throw new TypeError("You must provide a callback to ".concat(method, "(\"").concat(this.testName, "\")"));
    }

    // Register unique strings
    for (var i = 0, l = this.module.tests; i < l.length; i++) {
      if (this.module.tests[i].name === this.testName) {
        this.testName += ' ';
      }
    }
    this.testId = generateHash(this.module.name, this.testName);

    // No validation after this. Beyond this point, failures must be recorded as
    // a completed test with errors, instead of early bail out.
    // Otherwise, internals may be left in an inconsistent state.
    // Ref https://github.com/qunitjs/qunit/issues/1514

    ++Test.count;
    this.errorForStack = new Error();
    this.testReport = new TestReport(this.testName, this.module.suiteReport, {
      todo: this.todo,
      skip: this.skip,
      valid: this.valid()
    });
    this.module.tests.push({
      name: this.testName,
      testId: this.testId,
      skip: !!this.skip
    });
    if (this.skip) {
      // Skipped tests will fully ignore (and dereference for garbage collect) any sent callback
      this.callback = function () {};
      this.async = false;
      this.expected = 0;
    } else {
      this.assert = new Assert(this);
    }
  }
  Test.count = 0;
  function getModulesForStartEvent(startingModule) {
    var module = startingModule;
    var modules = [];
    while (module && module.testsRun === 0) {
      modules.push(module);
      module = module.parentModule;
    }

    // The above starts from the child and moves up to the parent.
    // Return this in reversed order, such that we start with top-most parent.
    return modules.reverse();
  }
  Test.prototype = {
    // Use a getter to avoid computing a stack trace (which can be expensive),
    // This is displayed by the HTML Reporter, but most other integrations do
    // not access it.
    get stack() {
      return extractStacktrace(this.errorForStack, this.stackOffset);
    },
    before: function before() {
      var _this = this;
      var module = this.module;
      var notStartedModules = getModulesForStartEvent(module);

      // ensure the callbacks are executed serially for each module
      var moduleStartChain = _Promise.resolve();
      notStartedModules.forEach(function (startModule) {
        moduleStartChain = moduleStartChain.then(function () {
          startModule.stats = {
            all: 0,
            bad: 0,
            started: performance.now()
          };
          emit('suiteStart', startModule.suiteReport.start(true));
          return runLoggingCallbacks('moduleStart', {
            name: startModule.name,
            tests: startModule.tests
          });
        });
      });
      return moduleStartChain.then(function () {
        config.current = _this;
        _this.started = performance.now();
        emit('testStart', _this.testReport.start(true));
        return runLoggingCallbacks('testStart', {
          name: _this.testName,
          module: module.name,
          testId: _this.testId,
          previousFailure: _this.previousFailure
        }).then(function () {
          if (!config.pollution) {
            saveGlobal();
          }
        });
      });
    },
    run: function run() {
      config.current = this;
      var promise;
      if (config.notrycatch) {
        promise = this.withData ? this.callback.call(this.testEnvironment, this.assert, this.data) : this.callback.call(this.testEnvironment, this.assert);
      } else {
        try {
          promise = this.withData ? this.callback.call(this.testEnvironment, this.assert, this.data) : this.callback.call(this.testEnvironment, this.assert);
        } catch (e) {
          this.pushFailure('Died on test #' + (this.assertions.length + 1) + ': ' + (e.message || e) + '\n' + this.stack, extractStacktrace(e, 0));

          // Else next test will carry the responsibility
          saveGlobal();

          // Restart the tests if they're blocking
          if (config.blocking) {
            internalRecover(this);
          }
        }
      }
      this.resolvePromise(promise);

      // If the test has an async "pause" on it, but the timeout is 0, then we push a
      // failure as the test should be synchronous.
      if (this.timeout === 0 && this.pauses.size > 0) {
        pushFailure('Test did not finish synchronously even though assert.timeout( 0 ) was used.', sourceFromStacktrace(2));
      }
    },
    after: function after() {
      checkPollution();
    },
    queueGlobalHook: function queueGlobalHook(hook, hookName) {
      var _this2 = this;
      var runGlobalHook = function runGlobalHook() {
        config.current = _this2;
        var promise;
        if (config.notrycatch) {
          promise = hook.call(_this2.testEnvironment, _this2.assert);
        } else {
          try {
            promise = hook.call(_this2.testEnvironment, _this2.assert);
          } catch (error) {
            _this2.pushFailure('Global ' + hookName + ' failed on ' + _this2.testName + ': ' + errorString(error), extractStacktrace(error, 0));
            return;
          }
        }
        _this2.resolvePromise(promise, hookName);
      };
      return runGlobalHook;
    },
    queueHook: function queueHook(hook, hookName, hookOwner) {
      var _this3 = this;
      var runHook = function runHook() {
        if (hookName === 'before' && hookOwner.testsRun !== 0) {
          return;
        }

        // The 'after' hook should only execute when there are no tests left and
        // when the 'after' and 'finish' tasks are the only tasks left to process
        if (hookName === 'after' && !lastTestWithinModuleExecuted(hookOwner) && (config.queue.length > 0 || config._pq.taskCount() > 2)) {
          return;
        }
        config.current = _this3;

        // before and after hooks are called with the owning module's testEnvironment
        var testEnvironment = hookName === 'before' || hookName === 'after' ? hookOwner.testEnvironment : _this3.testEnvironment;
        var promise;
        if (config.notrycatch) {
          promise = hook.call(testEnvironment, _this3.assert);
        } else {
          try {
            promise = hook.call(testEnvironment, _this3.assert);
          } catch (error) {
            _this3.pushFailure(hookName + ' failed on ' + _this3.testName + ': ' + (error.message || error), extractStacktrace(error, 0));
            return;
          }
        }
        _this3.resolvePromise(promise, hookName);
      };
      return runHook;
    },
    // Currently only used for module level hooks, can be used to add global level ones
    hooks: function hooks(handler) {
      var hooks = [];
      function processGlobalhooks(test) {
        if ((handler === 'beforeEach' || handler === 'afterEach') && config._globalHooks[handler]) {
          for (var i = 0; i < config._globalHooks[handler].length; i++) {
            hooks.push(test.queueGlobalHook(config._globalHooks[handler][i], handler));
          }
        }
      }
      function processHooks(test, module) {
        if (module.parentModule) {
          processHooks(test, module.parentModule);
        }
        if (module.hooks[handler].length) {
          for (var i = 0; i < module.hooks[handler].length; i++) {
            hooks.push(test.queueHook(module.hooks[handler][i], handler, module));
          }
        }
      }

      // Hooks are ignored on skipped tests
      if (!this.skip) {
        processGlobalhooks(this);
        processHooks(this, this.module);
      }
      return hooks;
    },
    finish: function finish() {
      config.current = this;

      // Release the timeout and timeout callback references to be garbage collected.
      // https://github.com/qunitjs/qunit/pull/1708
      if (setTimeout$1) {
        clearTimeout(this.timeout);
        config.timeoutHandler = null;
      }

      // Release the test callback to ensure that anything referenced has been
      // released to be garbage collected.
      this.callback = undefined;
      if (this.steps.length) {
        var stepsList = this.steps.join(', ');
        this.pushFailure("Expected assert.verifySteps() to be called before end of test after using assert.step(). Unverified steps: ".concat(stepsList), this.stack);
      }
      if (config.requireExpects && this.expected === null) {
        this.pushFailure('Expected number of assertions to be defined, but expect() was not called.', this.stack);
      } else if (this.expected !== null && this.stepsCount && this.expected === this.assertions.length + this.stepsCount) {
        this.pushFailure('Expected ' + this.expected + ' assertions, but ' + this.assertions.length + ' were run.\nIt looks like you are upgrading from QUnit 2. Steps no longer count as separate assertions. https://qunitjs.com/api/assert/expect/', this.stack);
      } else if (this.expected !== null && this.expected !== this.assertions.length) {
        this.pushFailure('Expected ' + this.expected + ' assertions, but ' + this.assertions.length + ' were run', this.stack);
      } else if (this.expected === null && !this.assertions.length) {
        this.pushFailure('Expected at least one assertion, but none were run - call expect(0) to accept zero assertions.', this.stack);
      }
      var module = this.module;
      var moduleName = module.name;
      var testName = this.testName;
      var skipped = !!this.skip;
      var todo = !!this.todo;
      var bad = 0;
      var storage = config.storage;
      this.runtime = Math.round(performance.now() - this.started);
      config.stats.all += this.assertions.length;
      config.stats.testCount += 1;
      module.stats.all += this.assertions.length;
      for (var i = 0; i < this.assertions.length; i++) {
        // For legacy reasons, `config.stats` reflects raw assertion counts.
        // This means all failures add to the "bad" count, even an expected
        // failure inside a passing "todo" test.
        // See also https://qunitjs.com/api/callbacks/QUnit.done/
        if (!this.assertions[i].result) {
          bad++;
          config.stats.bad++;
          module.stats.bad++;
        }
      }
      if (skipped) {
        incrementTestsIgnored(module);
      } else {
        incrementTestsRun(module);
      }

      // Store result when possible.
      // Note that this also marks todo tests as bad, thus they get hoisted,
      // and always run first on refresh.
      if (storage) {
        if (bad) {
          storage.setItem('qunit-test-' + moduleName + '-' + testName, bad);
        } else {
          storage.removeItem('qunit-test-' + moduleName + '-' + testName);
        }
      }

      // After emitting the event, we trim the assertion data to
      // avoid leaking it. It is not used by the legacy testDone callbacks.
      emit('testEnd', this.testReport.end(true));
      this.testReport.slimAssertions();
      var test = this;
      return runLoggingCallbacks('testDone', {
        name: testName,
        module: moduleName,
        skipped: skipped,
        todo: todo,
        failed: bad,
        passed: this.assertions.length - bad,
        total: this.assertions.length,
        runtime: skipped ? 0 : this.runtime,
        // HTML Reporter use
        // TODO: Remove "assertions". It is no longer used as of QUnit 3.0.
        // It was only used to calculate assertions.length which is identical to "total".
        assertions: this.assertions,
        testId: this.testId,
        // Source of Test
        // generating stack trace is expensive, so using a getter will help defer this until we need it
        get source() {
          return test.stack;
        }
      }).then(function () {
        // Emit the `suiteEnd` event and `moduleDone` callbacks for modules
        // that are completed as of now.
        var completedModules = [];
        var parent = module;
        while (parent && allTestsExecuted(parent)) {
          completedModules.push(parent);
          parent = parent.parentModule;
        }
        var moduleDoneChain = _Promise.resolve();
        completedModules.forEach(function (completedModule) {
          moduleDoneChain = moduleDoneChain.then(function () {
            return logSuiteEnd(completedModule);
          });
        });
        return moduleDoneChain;
      }).then(function () {
        config.current = undefined;
      });
      function logSuiteEnd(module) {
        // Empty `module.hooks` to ensure that anything referenced in these hooks
        // has been released to be garbage collected. Descendant modules that were
        // entirely skipped, e.g. due to filtering, will never have this method
        // called for them, but might have hooks with references that hold data in
        // memory (even if the hooks were never executed), so we empty the
        // hooks on all descendant modules here as well. This is safe because we
        // will never call this as long as any descendant modules still have tests
        // to run. This also means that for deeply nested modules, we might empty
        // the hooks on completed child modules multiple times. That's harmless.
        var modules = [module];
        while (modules.length) {
          var nextModule = modules.shift();
          nextModule.hooks = {};
          modules.push.apply(modules, _toConsumableArray(nextModule.childModules));
        }
        emit('suiteEnd', module.suiteReport.end(true));
        return runLoggingCallbacks('moduleDone', {
          name: module.name,
          tests: module.tests,
          failed: module.stats.bad,
          passed: module.stats.all - module.stats.bad,
          total: module.stats.all,
          runtime: Math.round(performance.now() - module.stats.started)
        });
      }
    },
    queue: function queue() {
      var test = this;
      if (!this.valid()) {
        incrementTestsIgnored(this.module);
        return;
      }
      function runTest() {
        return [function () {
          return test.before();
        }].concat(_toConsumableArray(test.hooks('before')), [function () {
          test.testEnvironment = extend({}, test.module.testEnvironment, false, true);
        }], _toConsumableArray(test.hooks('beforeEach')), [function () {
          test.run();
        }], _toConsumableArray(test.hooks('afterEach').reverse()), _toConsumableArray(test.hooks('after').reverse()), [function () {
          test.after();
        }, function () {
          return test.finish();
        }]);
      }
      var previousFailCount = config.storage && +config.storage.getItem('qunit-test-' + this.module.name + '-' + this.testName);

      // Prioritize previously failed tests, detected from storage
      var prioritize = config.reorder && !!previousFailCount;
      this.previousFailure = !!previousFailCount;
      config._pq.add(runTest, prioritize);
    },
    pushResult: function pushResult(resultInfo) {
      if (this !== config.current) {
        var message = resultInfo && resultInfo.message || '';
        var testName = this && this.testName || '';
        var error = 'Assertion occurred after test finished.\n' + '> Test: ' + testName + '\n' + '> Message: ' + message + '\n';
        throw new Error(error);
      }

      // Destructure of resultInfo = { result, actual, expected, message, negative }
      var details = {
        module: this.module.name,
        name: this.testName,
        result: resultInfo.result,
        message: resultInfo.message,
        actual: resultInfo.actual,
        testId: this.testId,
        negative: resultInfo.negative || false,
        runtime: Math.round(performance.now() - this.started),
        todo: !!this.todo
      };
      if (hasOwn$3.call(resultInfo, 'expected')) {
        details.expected = resultInfo.expected;
      }
      if (!resultInfo.result) {
        var source = resultInfo.source || sourceFromStacktrace();
        if (source) {
          details.source = source;
        }
      }
      this.logAssertion(details);
      this.assertions.push({
        result: !!resultInfo.result,
        message: resultInfo.message
      });
    },
    pushFailure: function pushFailure(message, source) {
      if (!(this instanceof Test)) {
        throw new Error('pushFailure() assertion outside test context, was ' + sourceFromStacktrace(2));
      }
      this.pushResult({
        result: false,
        message: message || 'error',
        source: source
      });
    },
    /**
     * Log assertion details using both the old QUnit.log interface and
     * QUnit.on( "assertion" ) interface.
     *
     * @private
     */
    logAssertion: function logAssertion(details) {
      runLoggingCallbacks('log', details);
      var assertion = {
        passed: details.result,
        actual: details.actual,
        expected: details.expected,
        message: details.message,
        stack: details.source,
        todo: details.todo
      };
      this.testReport.pushAssertion(assertion);
      emit('assertion', assertion);
    },
    /**
     * Reset config.timeout with a new timeout duration.
     *
     * @param {number} timeoutDuration
     */
    internalResetTimeout: function internalResetTimeout(timeoutDuration) {
      clearTimeout(config.timeout);
      config.timeout = setTimeout$1(config.timeoutHandler(timeoutDuration), timeoutDuration);
    },
    /**
     * Create a new async pause and return a new function that can release the pause.
     *
     * This mechanism is internally used by:
     *
     * - explicit async pauses, created by calling `assert.async()`,
     * - implicit async pauses, created when `QUnit.test()` or module hook callbacks
     *   use async-await or otherwise return a Promise.
     *
     * Happy scenario:
     *
     * - Pause is created by calling internalStop().
     *
     *   Pause is released normally by invoking release() during the same test.
     *
     *   The release() callback lets internal processing resume.
     *
     * Failure scenarios:
     *
     * - The test fails due to an uncaught exception.
     *
     *   In this case, Test.run() will call internalRecover() which empties the clears all
     *   async pauses and sets the cancelled flag, which means we silently ignore any
     *   late calls to the resume() callback, as we will have moved on to a different
     *   test by then, and we don't want to cause an extra "release during a different test"
     *   errors that the developer isn't really responsible for. This can happen when a test
     *   correctly schedules a call to release(), but also causes an uncaught error. The
     *   uncaught error means we will no longer wait for the release (as it might not arrive).
     *
     * - Pause is never released, or called an insufficient number of times.
     *
     *   Our timeout handler will kill the pause and resume test processing, basically
     *   like internalRecover(), but for one pause instead of any/all.
     *
     *   Here, too, any late calls to resume() will be silently ignored to avoid
     *   extra errors. We tolerate this since the original test will have already been
     *   marked as failure.
     *
     * - Pause is spontaneously released during a different test,
     *   or when no test is currently running.
     *
     *   This is close to impossible because this error only happens if the original test
     *   succesfully finished first (since other failure scenarios kill pauses and ignore
     *   late calls). It can happen if a test ended exactly as expected, but has some
     *   external or shared state continuing to hold a reference to the release callback,
     *   and either the same test scheduled another call to it in the future, or a later test
     *   causes it to be called through some shared state.
     *
     * - Pause release() is called too often, during the same test.
     *
     *   This simply throws an error, after which uncaught error handling picks it up
     *   and processing resumes.
     *
     * @param {number} [requiredCalls=1]
     */
    internalStop: function internalStop() {
      var requiredCalls = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      config.blocking = true;
      var test = this;
      var pauseId = this.nextPauseId++;
      var pause = {
        cancelled: false,
        remaining: requiredCalls
      };
      test.pauses.set(pauseId, pause);
      function release() {
        if (pause.cancelled) {
          return;
        }
        if (config.current === undefined) {
          throw new Error('Unexpected release of async pause after tests finished.\n' + "> Test: ".concat(test.testName, " [async #").concat(pauseId, "]"));
        }
        if (config.current !== test) {
          throw new Error('Unexpected release of async pause during a different test.\n' + "> Test: ".concat(test.testName, " [async #").concat(pauseId, "]"));
        }
        if (pause.remaining <= 0) {
          throw new Error('Tried to release async pause that was already released.\n' + "> Test: ".concat(test.testName, " [async #").concat(pauseId, "]"));
        }

        // The `requiredCalls` parameter exists to support `assert.async(count)`
        pause.remaining--;
        if (pause.remaining === 0) {
          test.pauses.delete(pauseId);
        }
        internalStart(test);
      }

      // Set a recovery timeout, if so configured.
      if (setTimeout$1) {
        var timeoutDuration;
        if (typeof test.timeout === 'number') {
          timeoutDuration = test.timeout;
        } else if (typeof config.testTimeout === 'number') {
          timeoutDuration = config.testTimeout;
        } else {
          Logger.warn("QUnit.config.testTimeout was set to an an invalid value (".concat(dump.typeOf(config.testTimeout), "). Using default. https://qunitjs.com/api/config/testTimeout/"));
          timeoutDuration = 3000;
        }
        if (timeoutDuration > 0) {
          config.timeoutHandler = function (timeout) {
            return function () {
              config.timeout = null;
              pause.cancelled = true;
              test.pauses.delete(pauseId);
              test.pushFailure("Test took longer than ".concat(timeout, "ms; test timed out."), sourceFromStacktrace(2));
              internalRecover(test);
            };
          };
          clearTimeout(config.timeout);
          config.timeout = setTimeout$1(config.timeoutHandler(timeoutDuration), timeoutDuration);
        }
      }
      return release;
    },
    resolvePromise: function resolvePromise(promise, phase) {
      if (promise !== undefined && promise !== null) {
        var _test = this;
        if (typeof promise.then === 'function') {
          var resume = _test.internalStop();
          var resolve = function resolve() {
            resume();
          };
          if (config.notrycatch) {
            promise.then(resolve);
          } else {
            var reject = function reject(error) {
              var message = 'Promise rejected ' + (!phase ? 'during' : phase.replace(/Each$/, '')) + ' "' + _test.testName + '": ' + (error && error.message || error);
              _test.pushFailure(message, extractStacktrace(error, 0));

              // Else next test will carry the responsibility
              saveGlobal();

              // Unblock
              internalRecover(_test);
            };
            // Note that `promise` is a user-supplied thenable, not per-se a standard Promise.
            // This means it can be a "bad thenable" where calling then() can also throw.
            // This is not about a rejected Promise or throwing async function.
            // In those cases, `ret.then(, cb)` will not throw, but inform you via cb(err).
            // Instead, this is testing a bad Thenable implementation, where then() itself
            // throws an error. This is not possible with native Promise, but is possible with
            // custom Promise-compatible libraries.
            // We must catch this to avoid breaking the ProcessingQueue.
            // Promise.resolve() normalizes and catches even these internal errors and
            // sends them to reject.
            _Promise.resolve(promise).then(resolve, reject);
          }
        }
      }
    },
    valid: function valid() {
      function moduleChainIdMatch(testModule, selectedId) {
        return (
          // undefined or empty array
          !selectedId || !selectedId.length || inArray(testModule.moduleId, selectedId) || testModule.parentModule && moduleChainIdMatch(testModule.parentModule, selectedId)
        );
      }
      if (!moduleChainIdMatch(this.module, config.moduleId)) {
        return false;
      }
      if (config.testId && config.testId.length && !inArray(this.testId, config.testId)) {
        return false;
      }
      function moduleChainNameMatch(testModule, selectedModule) {
        if (!selectedModule) {
          // undefined or empty string
          return true;
        }
        var testModuleName = testModule.name ? testModule.name.toLowerCase() : null;
        if (testModuleName === selectedModule) {
          return true;
        } else if (testModule.parentModule) {
          return moduleChainNameMatch(testModule.parentModule, selectedModule);
        } else {
          return false;
        }
      }
      var selectedModule = config.module && config.module.toLowerCase();
      if (!moduleChainNameMatch(this.module, selectedModule)) {
        return false;
      }
      var filter = config.filter;
      if (!filter) {
        return true;
      }
      var regexFilter = /^(!?)\/([\w\W]*)\/(i?$)/.exec(filter);
      var fullName = this.module.name + ': ' + this.testName;
      return regexFilter ? this.regexFilter(!!regexFilter[1], regexFilter[2], regexFilter[3], fullName) : this.stringFilter(filter, fullName);
    },
    regexFilter: function regexFilter(exclude, pattern, flags, fullName) {
      var regex = new RegExp(pattern, flags);
      var match = regex.test(fullName);
      return match !== exclude;
    },
    stringFilter: function stringFilter(filter, fullName) {
      filter = filter.toLowerCase();
      fullName = fullName.toLowerCase();
      var include = filter.charAt(0) !== '!';
      if (!include) {
        filter = filter.slice(1);
      }

      // If the filter matches, we need to honour include
      if (fullName.indexOf(filter) !== -1) {
        return include;
      }

      // Otherwise, do the opposite
      return !include;
    }
  };
  function pushFailure() {
    if (!config.current) {
      throw new Error('pushFailure() assertion outside test context, in ' + sourceFromStacktrace(2));
    }

    // Gets current test obj
    var currentTest = config.current;
    return currentTest.pushFailure.apply(currentTest, arguments);
  }
  function saveGlobal() {
    config.pollution = [];
    if (config.noglobals) {
      for (var key in g) {
        if (hasOwn$3.call(g, key)) {
          // In Opera sometimes DOM element ids show up here, ignore them
          if (/^qunit-test-output/.test(key)) {
            continue;
          }
          config.pollution.push(key);
        }
      }
    }
  }
  function checkPollution() {
    var old = config.pollution;
    saveGlobal();
    var newGlobals = diff$1(config.pollution, old);
    if (newGlobals.length > 0) {
      pushFailure('Introduced global variable(s): ' + newGlobals.join(', '));
    }
    var deletedGlobals = diff$1(old, config.pollution);
    if (deletedGlobals.length > 0) {
      pushFailure('Deleted global variable(s): ' + deletedGlobals.join(', '));
    }
  }
  var focused = false; // indicates that the "only" filter was used

  function addTest(settings) {
    if (focused || config.currentModule.ignored) {
      return;
    }
    var newTest = new Test(settings);
    newTest.queue();
  }
  function addOnlyTest(settings) {
    if (config.currentModule.ignored) {
      return;
    }
    if (!focused) {
      config.queue.length = 0;
      focused = true;
    }
    var newTest = new Test(settings);
    newTest.queue();
  }

  // Will be exposed as QUnit.test
  function test(testName, callback) {
    addTest({
      testName: testName,
      callback: callback
    });
  }
  function makeEachTestName(testName, argument) {
    return "".concat(testName, " [").concat(argument, "]");
  }

  // Characters to avoid in test names especially CLI/AP output:
  // * x00-1F: e.g. NULL, backspace (\b), line breaks (\r\n), ESC.
  // * x74: DEL.
  // * xA0: non-breaking space.
  //
  // See https://en.wikipedia.org/wiki/ASCII#Character_order
  //
  // eslint-disable-next-line no-control-regex
  var rNonObviousStr = /[\x00-\x1F\x7F\xA0]/;
  function runEach(data, eachFn) {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        var value = data[i];

        // Create automatic labels for primitive data in arrays passed to test.each().
        // We want to avoid the default "example [0], example [1]" where possible since
        // these are not self-explanatory in results, and are also tedious to locate
        // the source of since the numerical key of an array isn't literally in the
        // code (you have to count).
        //
        // Design requirements:
        // * Unique. Each label must be unique and correspond 1:1 with a data value.
        //   This way each test name will hash to a unique testId with Rerun link,
        //   without having to rely on Test class enforcing uniqueness with invisible
        //   space hack.
        // * Unambigious. While technical uniqueness is a hard requirement above,
        //   we also want the labels to be obvious and unambiguous to humans.
        //   For example, abbrebating "foobar" and "foobaz" to "f" and "fo" is
        //   technically unique, but ambigious to humans which one is which.
        // * Short and readable. Where possible we omit the array index numbers
        //   so that in most cases, the value is simply shown as-is.
        //   We prefer "example [foo], example [bar]"
        //   over "example [0: foo], example [2: bar]".
        //   This also has the benefit of being stable and robust against e.g.
        //   re-ordering data or adding new items during development, without
        //   invalidating a previous filter or rerun link immediately.
        var valueType = _typeof(value);
        var testKey = i;
        if (valueType === 'string' && value.length <= 40 && !rNonObviousStr.test(value) && !/\s*\d+: /.test(value)) {
          testKey = value;
        } else if (valueType === 'string' || valueType === 'number' || valueType === 'boolean' || valueType === 'undefined' || value === null) {
          var valueForName = String(value);
          if (!rNonObviousStr.test(valueForName)) {
            testKey = i + ': ' + (valueForName.length <= 30 ? valueForName : valueForName.slice(0, 29) + '…');
          }
        }
        eachFn(value, testKey);
      }
    } else if (_typeof(data) === 'object' && data !== null) {
      for (var key in data) {
        eachFn(data[key], key);
      }
    } else {
      throw new TypeError("test.each() expects an array or object as input, but\nfound ".concat(_typeof(data), " instead."));
    }
  }
  extend(test, {
    todo: function todo(testName, callback) {
      addTest({
        testName: testName,
        callback: callback,
        todo: true
      });
    },
    skip: function skip(testName) {
      addTest({
        testName: testName,
        skip: true
      });
    },
    if: function _if(testName, condition, callback) {
      addTest({
        testName: testName,
        callback: callback,
        skip: !condition
      });
    },
    only: function only(testName, callback) {
      addOnlyTest({
        testName: testName,
        callback: callback
      });
    },
    each: function each(testName, dataset, callback) {
      runEach(dataset, function (data, testKey) {
        addTest({
          testName: makeEachTestName(testName, testKey),
          callback: callback,
          withData: true,
          stackOffset: 5,
          data: data
        });
      });
    }
  });
  test.todo.each = function (testName, dataset, callback) {
    runEach(dataset, function (data, testKey) {
      addTest({
        testName: makeEachTestName(testName, testKey),
        callback: callback,
        todo: true,
        withData: true,
        stackOffset: 5,
        data: data
      });
    });
  };
  test.skip.each = function (testName, dataset) {
    runEach(dataset, function (_, testKey) {
      addTest({
        testName: makeEachTestName(testName, testKey),
        stackOffset: 5,
        skip: true
      });
    });
  };
  test.if.each = function (testName, condition, dataset, callback) {
    runEach(dataset, function (data, testKey) {
      addTest({
        testName: makeEachTestName(testName, testKey),
        callback: callback,
        withData: true,
        stackOffset: 5,
        skip: !condition,
        data: condition ? data : undefined
      });
    });
  };
  test.only.each = function (testName, dataset, callback) {
    runEach(dataset, function (data, testKey) {
      addOnlyTest({
        testName: makeEachTestName(testName, testKey),
        callback: callback,
        withData: true,
        stackOffset: 5,
        data: data
      });
    });
  };

  // Forcefully release all processing holds.
  function internalRecover(test) {
    test.pauses.forEach(function (pause) {
      pause.cancelled = true;
    });
    test.pauses.clear();
    internalStart(test);
  }

  // Release a processing hold, scheduling a resumption attempt if no holds remain.
  function internalStart(test) {
    // Ignore if other async pauses still exist.
    if (test.pauses.size > 0) {
      return;
    }

    // Add a slight delay to allow more assertions etc.
    if (setTimeout$1) {
      clearTimeout(config.timeout);
      config.timeout = setTimeout$1(function () {
        if (test.pauses.size > 0) {
          return;
        }
        clearTimeout(config.timeout);
        config.timeout = null;
        config.blocking = false;
        config._pq.advance();
      });
    } else {
      config.blocking = false;
      config._pq.advance();
    }
  }
  function collectTests(module) {
    var tests = [].concat(module.tests);
    var modules = _toConsumableArray(module.childModules);

    // Do a breadth-first traversal of the child modules
    while (modules.length) {
      var nextModule = modules.shift();
      tests.push.apply(tests, nextModule.tests);
      modules.push.apply(modules, _toConsumableArray(nextModule.childModules));
    }
    return tests;
  }

  // This returns true after all executable and skippable tests
  // in a module have been proccessed, and informs 'suiteEnd'
  // and moduleDone().
  function allTestsExecuted(module) {
    return module.testsRun + module.testsIgnored === collectTests(module).length;
  }

  // This returns true during the last executable non-skipped test
  // within a module, and informs the running of the 'after' hook
  // for a given module. This runs only once for a given module,
  // but must run during the last non-skipped test. When it runs,
  // there may be non-zero skipped tests left.
  function lastTestWithinModuleExecuted(module) {
    return module.testsRun === collectTests(module).filter(function (test) {
      return !test.skip;
    }).length - 1;
  }
  function incrementTestsRun(module) {
    module.testsRun++;
    while (module = module.parentModule) {
      module.testsRun++;
    }
  }
  function incrementTestsIgnored(module) {
    module.testsIgnored++;
    while (module = module.parentModule) {
      module.testsIgnored++;
    }
  }

  function unblockAndAdvanceQueue() {
    config.blocking = false;
    config._pq.advance();
  }
  function doStart() {
    if (config.started) {
      unblockAndAdvanceQueue();
      return;
    }

    // QUnit.config.reporters is considered writable between qunit.js and QUnit.start().
    // Now that QUnit.start() has been called, it is time to decide which built-in reporters
    // to load.
    // For config.reporters.html, refer to browser-runner.js and HtmlReporter#onRunStart.

    /* istanbul ignore if: internal guard */
    if (!config._QUnit) {
      throw new ReferenceError('QUnit is undefined. Cannot call start() before qunit.js exports QUnit.');
    }
    if (config.reporters.console) {
      reporters.console.init(config._QUnit);
    }
    if (config.reporters.perf || config.reporters.perf === undefined && window$1 && document) {
      reporters.perf.init(config._QUnit);
    }
    if (config.reporters.tap) {
      reporters.tap.init(config._QUnit);
    }

    // The test run hasn't officially begun yet
    // Record the time of the test run's beginning
    config.started = performance.now();

    // Delete the unnamed module if no global tests were defined (see config.js)
    if (config.modules[0].name === '' && config.modules[0].tests.length === 0) {
      config.modules.shift();
    }

    // Create a list of simplified and independent module descriptor objects for
    // the QUnit.begin callbacks. This prevents plugins from relying on reading
    // from (or writing!) to internal state.
    var modulesLog = [];
    for (var i = 0; i < config.modules.length; i++) {
      // Always omit the unnamed module from the list of module names
      // for UI plugins, even if there were glboal tests defined.
      if (config.modules[i].name !== '') {
        modulesLog.push({
          name: config.modules[i].name,
          moduleId: config.modules[i].moduleId
        });
      }
    }

    // The test run is officially beginning now
    emit('runStart', globalSuiteReport.start(true));
    runLoggingCallbacks('begin', {
      totalTests: Test.count,
      modules: modulesLog
    }).then(unblockAndAdvanceQueue);
  }
  function start() {
    if (config.current) {
      throw new Error('QUnit.start cannot be called inside a test.');
    }
    if (config._runStarted) {
      if (document && config.autostart) {
        throw new Error('QUnit.start() called too many times. Did you call QUnit.start() in browser context when autostart is also enabled? https://qunitjs.com/api/QUnit/start/');
      }
      throw new Error('QUnit.start() called too many times.');
    }
    config._runStarted = true;

    // Add a slight delay to allow definition of more modules and tests.
    if (document && document.readyState !== 'complete' && setTimeout$1) {
      // In browser environments, if QUnit.start() is called very early,
      // still wait for DOM ready to ensure reliable integration of reporters.
      window$1.addEventListener('load', function () {
        setTimeout$1(function () {
          doStart();
        });
      });
    } else if (setTimeout$1) {
      setTimeout$1(function () {
        doStart();
      });
    } else {
      doStart();
    }
  }

  function initFixture(QUnit, document) {
    var config = QUnit.config;

    // Stores fixture HTML for resetting later
    function storeFixture() {
      // Avoid overwriting user-defined values
      if (config.fixture !== undefined) {
        // If set to null, do nothing as the fixture feature is disabled.
        //
        // If set to string or HTMLElement, also do nothing because in that case
        // we will restore the fixture to the configured value after each test,
        // instead of using the initial DOM value of #qunit-fixture as the
        // configured value to restore (default behaviour).
        return;
      }
      var fixture = document.getElementById('qunit-fixture');
      if (fixture) {
        config.fixture = fixture.cloneNode(true);
      }
    }
    QUnit.begin(storeFixture);

    // Resets the fixture DOM element if available.
    function resetFixture() {
      if (config.fixture === undefined || config.fixture === null) {
        return;
      }
      var fixture = document.getElementById('qunit-fixture');
      var resetFixtureType = _typeof(config.fixture);
      if (resetFixtureType === 'string') {
        // support user defined values for `config.fixture`
        var newFixture = document.createElement('div');
        newFixture.setAttribute('id', 'qunit-fixture');
        newFixture.innerHTML = config.fixture;
        fixture.parentNode.replaceChild(newFixture, fixture);
      } else {
        var clonedFixture = config.fixture.cloneNode(true);
        fixture.parentNode.replaceChild(clonedFixture, fixture);
      }
    }
    QUnit.testStart(resetFixture);
  }

  var hasOwn = Object.prototype.hasOwnProperty;
  function initUrlConfig(QUnit) {
    // Wait until QUnit.begin() so that users can add their keys to urlConfig
    // any time during test loading, including during `QUnit.on('runStart')`.
    QUnit.begin(function () {
      var urlConfig = QUnit.config.urlConfig;
      for (var i = 0; i < urlConfig.length; i++) {
        // Options can be either strings or objects with nonempty "id" properties
        var option = QUnit.config.urlConfig[i];
        if (typeof option !== 'string') {
          option = option.id;
        }

        // only create new property for user-defined QUnit.config.urlConfig keys
        // that don't conflict with a built-in QUnit.config option or are otherwise
        // already set. This prevents internal TypeError from bad urls where keys
        // could otherwise unexpectedly be set to type string or array.
        //
        // Given that HTML Reporter sets checkbox state based on QUnit.config,
        // instead of QUnit.urlParams, this also helps make sure that checkboxes
        // for built-in keys are correctly shown as off if a urlParams value exists
        // but was invalid and discarded by config.js.
        if (!hasOwn.call(QUnit.config, option)) {
          QUnit.config[option] = QUnit.urlParams[option];
        }
      }
    });
  }

  function initBrowser(QUnit, window, document) {
    // Report uncaught exceptions to QUnit.
    //
    // Wrap and preserve any pre-existing window.onerror.
    // An existing handller can "accepts" the erorr by returning true.
    //
    // Returning true from window.onerror suppresses the browser's default error
    // reporting. Likewise, we will also not report it in that case.
    var originalWindowOnError = window.onerror;
    window.onerror = function (message, fileName, lineNumber, columnNumber, errorObj) {
      var ret = false;
      if (originalWindowOnError) {
        for (var _len = arguments.length, args = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
          args[_key - 5] = arguments[_key];
        }
        ret = originalWindowOnError.call.apply(originalWindowOnError, [this, message, fileName, lineNumber, columnNumber, errorObj].concat(args));
      }

      // Treat return value as window.onerror itself does,
      // Only do our handling if not suppressed.
      if (ret !== true) {
        // If there is a current test that sets the internal `ignoreGlobalErrors` field
        // (such as during `assert.throws()`), then the error is ignored and native
        // error reporting is suppressed as well. This is because in browsers, an error
        // can sometimes end up in `window.onerror` instead of in the local try/catch.
        // This ignoring of errors does not apply to our general onUncaughtException
        // method, nor to our `unhandledRejection` handlers, as those are not meant
        // to receive an "expected" error during `assert.throws()`.
        if (QUnit.config.current && QUnit.config.current.ignoreGlobalErrors) {
          return true;
        }

        // According to
        // https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror,
        // most modern browsers support an errorObj argument; use that to
        // get a full stack trace if it's available.
        var error = errorObj || new Error(message);
        if (!error.stack && fileName && lineNumber) {
          error.stack = "".concat(fileName, ":").concat(lineNumber);
        }
        QUnit.onUncaughtException(error);
      }
      return ret;
    };
    window.addEventListener('unhandledrejection', function (event) {
      QUnit.onUncaughtException(event.reason);
    });
    QUnit.on('runEnd', function (runEnd) {
      if (QUnit.config.altertitle && document.title) {
        // Show ✖ for good, ✔ for bad suite result in title
        // use escape sequences in case file gets loaded with non-utf-8
        // charset
        document.title = [runEnd.status === 'failed' ? "\u2716" : "\u2714", document.title.replace(/^[\u2714\u2716] /i, '')].join(' ');
      }

      // Scroll back to top to show results
      if (QUnit.config.scrolltop && window.scrollTo) {
        window.scrollTo(0, 0);
      }
    });
    initFixture(QUnit, document);
    initUrlConfig(QUnit);

    // Unless explicitly disabled via preconfig, initialize HtmlReporter now
    // (i.e. QUnit.config.reporters.html is undefined or true).
    //
    // This allows the UI to render instantly (since QUnit 3.0) for cases where the
    // qunit.js script is after `<div id="qunit">`, which is recommended.
    //
    // Otherwise, we'll fallback to waiting with a blank page until window.onload,
    // which is how it's always been in QUnit 1 and QUnit 2.
    //
    // Note that HtmlReporter constructor will only render an initial layout and
    // listen to 1 event. The final decision on whether to attach event handlers
    // and render the interactive UI is made from HtmlReporter#onRunStart, which
    // is also where it will honor QUnit.config.reporters.html if it was set to
    // false between qunit.js (here) and onRunStart.
    //
    // If someone explicitly sets QUnit.config.reporters.html to false via preconfig,
    // but then changes it at runtime to true, that is unsupported and the reporter
    // will remain disabled.
    if (QUnit.config.reporters.html !== false) {
      QUnit.reporters.html.init(QUnit);
    }

    // NOTE:
    // * It is important to attach error handlers (above) before setting up reporters,
    //   to ensure reliable reporting of error events.
    // * Is is important to set up HTML Reporter (if enabled) before calling QUnit.start(),
    //   as otherwise it will miss the first few or even all synchronous events.
    //
    // Priot to QUnit 3.0, the reporter was initialised here, between error handler (above),
    // and start (below). As of QUnit 3.0, reporters are initialized by doStart() within
    // QUnit.start(), which is logically the same place, but decoupled from initBrowser().

    function autostart() {
      // Check as late as possible because if projects set autostart=false,
      // they generally do so in their own scripts, after qunit.js.
      if (QUnit.config.autostart) {
        QUnit.start();
      }
    }
    if (document.readyState === 'complete') {
      autostart();
    } else {
      window.addEventListener('load', autostart, false);
    }
  }

  // Imports that define the QUnit API

  // Finalise internal state and exports before we export the API
  config.currentModule = unnamedModule;
  config._pq = new ProcessingQueue();
  var assert = Assert.prototype;
  var isLocal = window$1 && window$1.location && window$1.location.protocol === 'file:';
  var begin = createRegisterCallbackFunction('begin');
  var done = createRegisterCallbackFunction('done');
  var log = createRegisterCallbackFunction('log');
  var moduleDone = createRegisterCallbackFunction('moduleDone');
  var moduleStart = createRegisterCallbackFunction('moduleStart');
  var testDone = createRegisterCallbackFunction('testDone');
  var testStart = createRegisterCallbackFunction('testStart');
  var only = test.only;
  var skip = test.skip;
  var todo = test.todo;
  var QUnit = {
    assert: assert,
    begin: begin,
    config: config,
    diff: diff,
    done: done,
    dump: dump,
    equiv: equiv,
    hooks: hooks,
    is: is,
    isLocal: isLocal,
    log: log,
    module: module$1,
    moduleDone: moduleDone,
    moduleStart: moduleStart,
    objectType: objectType,
    on: on,
    only: only,
    onUncaughtException: onUncaughtException,
    pushFailure: pushFailure,
    reporters: reporters,
    skip: skip,
    stack: stack,
    start: start,
    test: test,
    testDone: testDone,
    testStart: testStart,
    todo: todo,
    urlParams: urlParams,
    version: version
  };

  // Inject the exported QUnit API for use by reporters in start()
  config._QUnit = QUnit;

  // Support: require('qunit').QUnit
  //
  // For interop and consistency between Node.js `module.exports = QUnit`
  // and CommonJS environments `exports.QUnit = QUnit`, the below will
  // effectively assign `module.exports.QUnit = QUnit` as well.
  QUnit.QUnit = QUnit;
  if (window$1 && document) {
    // In browsers, throw if QUnit is loaded a second time.
    // This must not throw if a global called "QUnit" exists for preconfigurion,
    // in that case we simply upgrade/replace it with the proper export.
    // Such preconfig global would only have QUnit.config set, not e.g. QUnit.version.
    if (g.QUnit && g.QUnit.version) {
      throw new Error('QUnit has already been defined.');
    }
  }

  // Ensure the global is available in all environments.
  //
  // For backward compatibility, we only enforce load-once in browsers above.
  // In other environments QUnit is accessible via import/require() and may
  // load multiple times, including different versions from different sources.
  // Callers decide whether to make their secondary instance global or not.
  if (!g.QUnit || !g.QUnit.version) {
    g.QUnit = QUnit;
  }
  if (window$1 && document) {
    initBrowser(QUnit, window$1, document);
  }

  /* global module, exports */

  // For Node.js
  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = QUnit;
  }

  // For CommonJS with exports, but without module.exports, like Rhino
  if (typeof exports !== 'undefined' && exports) {
    exports.QUnit = QUnit;
  }

})();
