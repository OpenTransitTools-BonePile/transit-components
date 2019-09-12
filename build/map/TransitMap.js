"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

var _react = _interopRequireWildcard(require("react"));

var _reactLeaflet = require("react-leaflet");

var _reactLeafletControl = _interopRequireDefault(require("react-leaflet-control"));

var _BaseLayerControl = _interopRequireDefault(require("./BaseLayerControl"));

var _LocateControl = _interopRequireDefault(require("./LocateControl"));

var _SelectVehicles = _interopRequireDefault(require("../vehicles/SelectVehicles"));

var _ErrorBoundary = _interopRequireDefault(require("../common/ErrorBoundary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TransitMap =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TransitMap, _React$Component);

  function TransitMap() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, TransitMap);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TransitMap)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.state = {
      leafletMap: null,
      baseLayer: _this.props.config.baseLayers[_this.props.config.baseLayersInitial || 0]
    }, _temp));
  }

  _createClass(TransitMap, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        leafletMap: this.leafletMap.leafletElement
      });
    } // TODO: using a single TileLayer, which we change URLs on, is a bit strange ... do multiple
    // layers, and find a way to not render them in the layer switcher (e.g., config that as an
    // option -- buttons or layer switcher).
    // TODO: maxZoom on the map should be N (20 / 22); layers should then not zoom beyond their max

  }, {
    key: "currentLocation",
    value: function currentLocation() {
      var locateOptions = {
        position: 'topright',
        strings: {
          title: 'Show me where I am, yo!'
        },
        onActivate: function onActivate() {} // callback before engine starts retrieving locations

      };
      return locateOptions;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", null, _react.default.createElement(_reactLeaflet.Map, {
        ref: function ref(m) {
          _this2.leafletMap = m;
        },
        center: this.props.center,
        zoom: this.props.zoom,
        maxZoom: this.props.config.maxZoom || "20"
      }, _react.default.createElement(_reactLeaflet.TileLayer, {
        url: this.state.baseLayer.url,
        maxZoom: this.state.baseLayer.maxZoom,
        attribution: this.state.baseLayer.attribution
      }), _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_reactLeafletControl.default, {
        position: "topright"
      }, _react.default.createElement(_BaseLayerControl.default, {
        map: this,
        baseLayers: this.props.config.baseLayers
      }), _react.default.createElement(_LocateControl.default, {
        options: this.currentLocation()
      }))), _react.default.createElement(_reactLeaflet.LayersControl, {
        position: "topright"
      }, _react.default.createElement(_reactLeaflet.LayersControl.Overlay, {
        name: "Real-Time Buses and Trains"
      }, this.props.config.overlays && this.props.config.overlays.map(function (overlayConfig, k) {
        switch (overlayConfig.type) {
          case 'vehicles':
            return _react.default.createElement(_ErrorBoundary.default, null, _react.default.createElement(_SelectVehicles.default, _extends({
              visible: true,
              key: k
            }, overlayConfig)));

          default:
            return null;
        }
      })))));
    }
  }]);

  return TransitMap;
}(_react.default.Component);

var _default = TransitMap;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=TransitMap.js