// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"react-dom/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderComponent = renderComponent;
exports.default = void 0;

var _Component = _interopRequireDefault(require("../react/Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ReactDOM = {
  render: render
};

function render(vnode, container) {
  return container.append(_render(vnode));
} // 返回要渲染


function _render(vnode) {
  // console.log(vnode)
  // vnode为空、为undefined、为boolean
  if (vnode === null || vnode === undefined || typeof vnode === 'boolean') return; // vnode为数字

  if (typeof vnode === 'number') {
    vnode = String(vnode);
  } // vnode为字符串


  if (typeof vnode === 'string') {
    var textNode = document.createTextNode(vnode);
    return textNode;
  } // 组件
  // 创建组件
  // 设置属性
  // 渲染组件


  if (typeof vnode.tag === 'function') {
    var comp = createComponent(vnode.tag, vnode.attrs);
    setComponentProps(comp, vnode.attrs);
    return comp.base;
  } // vnode为object
  // 创建一个元素
  // 遍历加上属性
  // append到container上


  if (_typeof(vnode) === 'object') {
    var _vnode = vnode,
        tag = _vnode.tag,
        attrs = _vnode.attrs;
    var dom = document.createElement(tag);

    if (attrs) {
      Object.keys(attrs).map(function (key) {
        setAttribute(dom, key, attrs[key]);
      });
    }

    vnode.children && vnode.children.forEach(function (child) {
      return render(child, dom);
    });
    return dom;
  }
} // 创建组件


function createComponent(comp, props) {
  // 类组件直接创建返回
  // 函数组件就要构造成类组件
  var instance;

  if (comp.prototype && comp.prototype.render) {
    instance = new comp(props);
  } else {
    instance = new _Component.default(props);
    instance.constructor = comp;

    instance.render = function () {
      return this.constructor(props);
    };
  }

  return instance;
} // 设置组件


function setComponentProps(comp, props) {
  // 属性处理
  // comp.base是否已经出现
  // 否则是初始化数据
  // 是则componentWillReceiveProps则接受新的props
  if (!comp.base) {
    if (comp.componentWillMount) {
      comp.componentWillMount();
    }
  } else if (comp.componentWillReceiveProps) {
    comp.componentWillReceiveProps();
  }

  comp.attrs = props;
  renderComponent(comp);
} // 渲染组件


function renderComponent(comp) {
  console.log('comp', comp);
  var renderer = comp.render();

  var base = _render(renderer);

  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate();
  }

  if (comp.base) {
    if (comp.componentDidUpdate) {
      comp.componentDidUpdate();
    }
  } else if (comp.componentDidMount) {
    comp.componentDidMount();
  } // 节点替换


  if (comp.base && comp.base.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base);
  }

  comp.base = base;
} // 设置属性


function setAttribute(dom, key, value) {
  // className => class
  if (key === 'className') {
    key = 'class';
  } else if (/on\w+/.test(key)) {
    // onCLick => click
    key = key.toLowerCase();
    dom[key] = value || '';
  } else if (key === 'style') {
    // style
    // style="color: 'red'"
    // style={{color: 'red'}}
    if (!value && typeof value === 'string') {
      dom.style.cssText = value;
    } else if (_typeof(value) === 'object') {
      for (var _key in value) {
        if (typeof value[_key] === 'number') {
          dom.style[_key] = value[_key] + 'px';
        } else {
          dom.style[_key] = value[_key];
        }
      }
    }
  } else {
    // 其他的dom[key] = value， 更新
    if (key in dom) {
      dom[key] = value || '';
    }

    if (value) {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  }
}

var _default = ReactDOM;
exports.default = _default;
},{"../react/Component":"react/Component.js"}],"react/Component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactDom = require("./../react-dom");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component = /*#__PURE__*/function () {
  function Component(props) {
    _classCallCheck(this, Component);

    this.props = props;
    this.state = {};
  }

  _createClass(Component, [{
    key: "setState",
    value: function setState(newState) {
      // 对象拷贝
      Object.assign(this.state, newState); // 重新渲染组件

      (0, _reactDom.renderComponent)(this);
    }
  }]);

  return Component;
}();

var _default = Component;
exports.default = _default;
},{"./../react-dom":"react-dom/index.js"}],"react/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component = _interopRequireDefault(require("./Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = {
  createElement: createElement,
  Component: _Component.default
};

function createElement(tag, attrs) {
  attrs = attrs || {};

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return {
    tag: tag,
    attrs: attrs,
    children: children,
    key: attrs.key || null
  };
}

var _default = React;
exports.default = _default;
},{"./Component":"react/Component.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _react = _interopRequireDefault(require("./react"));

var _reactDom = _interopRequireDefault(require("./react-dom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// const ele = (
//   <div style={{color: 'red'}}>
//     hello, <span>react</span>
//   </div>
// )
// 函数组件
// function Home(){
//   return (
//       <div className="active" title="tan">
//           hello,<span>react</span>
//           <Tan />
//       </div>
//   )
// }
// function Tan(){
//   return (
//       <h1>
//           我是嵌套函数--
//       </h1>
//   )
// }
// function Home(){
//   return (
//       <div className="active" title="tan">
//           hello,<span>react</span>
//           <Tan tan="我是传进来的参数" />
//       </div>
//   )
// }
// class Tan extends React.Component {
//   constructor(props){
//       super( props )
//       this.state = {
//           num: 0
//       }
//   }
//   componentWillMount(){
//       console.log( "组件将要加载--" )
//   }
//   componentWillReceiveProps( props ){
//       console.log( "componentWillReceiveProps", props )
//   }
//   componentDidMount(){
//       console.log( "组件加载完成--" )
//   }
//   componentWillUpdate(){
//       console.log( "组件将要更新" )
//   }
//   componentDidUpdate(){
//       console.log( "组件更新完成" )
//   }
//   handleClick(){
//       // 修改状态的方法是调用 setState
//       console.log( "数据改变了--" )
//       this.setState({
//           num: this.state.num + 1
//       })
//   }
//   render(){
//       return (
//           <div>
//               <h1>我是类组件-----{ this.state.num }</h1>
//               <button onClick={ this.handleClick.bind( this ) } >点击</button>
//           </div>
//       )
//   }
// }
// 函数组件
var Tan = /*#__PURE__*/function (_React$Component) {
  _inherits(Tan, _React$Component);

  var _super = _createSuper(Tan);

  function Tan(props) {
    var _this;

    _classCallCheck(this, Tan);

    _this = _super.call(this, props);
    _this.state = {
      num: 0,
      list: [1, 2, 3, 4, 5]
    };
    return _this;
  }

  _createClass(Tan, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      console.log("组件将要加载--");
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props) {
      console.log("componentWillReceiveProps", props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("组件加载完成--");
      console.log(this.state.list);

      for (var i = 0; i < 10; i++) {
        this.setState(function (preState, preProps) {
          console.log("之前的状态：", preState);
          return {
            num: preState.num + 1
          };
        });
      }
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate() {
      console.log("组件将要更新");
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      console.log("组件更新完成");
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      // 修改状态的方法是调用 setState
      console.log("数据改变了--");
      this.setState({
        num: this.state.num + 1
      });
    }
  }, {
    key: "render",
    value: function render() {
      console.log("render---", this.state.list);
      return _react.default.createElement("div", {
        className: "active"
      }, _react.default.createElement("h1", null, "\u6211\u662F\u7C7B\u7EC4\u4EF6-----", this.state.num), _react.default.createElement("button", {
        onClick: this.handleClick.bind(this)
      }, "\u70B9\u51FB"), this.state.list.map(function (item) {
        return _react.default.createElement("p", null, item);
      }));
    }
  }]);

  return Tan;
}(_react.default.Component);

_reactDom.default.render(_react.default.createElement(Tan, null), document.querySelector("#root"));
},{"./react":"react/index.js","./react-dom":"react-dom/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "3542" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/myreact.e31bb0bc.js.map