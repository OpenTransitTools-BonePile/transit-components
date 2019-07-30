"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _leaflet = require("leaflet");

var _reactLeaflet = require("react-leaflet");

require("leaflet-rotatedmarker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RotatedMarker =
/*#__PURE__*/
function (_MapLayer) {
  _inherits(RotatedMarker, _MapLayer);

  function RotatedMarker() {
    _classCallCheck(this, RotatedMarker);

    return _possibleConstructorReturn(this, _getPrototypeOf(RotatedMarker).apply(this, arguments));
  }

  _createClass(RotatedMarker, [{
    key: "createLeafletElement",
    value: function createLeafletElement(props) {
      var el = new _leaflet.Marker(props.position, this.getOptions(props));
      this.contextValue = _objectSpread({}, props.leaflet, {
        popupContainer: el
      });
      return el;
    }
  }, {
    key: "updateLeafletElement",
    value: function updateLeafletElement(fromProps, toProps) {
      if (toProps.position !== fromProps.position) {
        this.leafletElement.setLatLng(toProps.position);
      }

      if (toProps.icon !== fromProps.icon) {
        this.leafletElement.setIcon(toProps.icon);
      }

      if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
        this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
      }

      if (toProps.opacity !== fromProps.opacity) {
        this.leafletElement.setOpacity(toProps.opacity);
      }

      if (toProps.draggable !== fromProps.draggable) {
        if (toProps.draggable === true) {
          this.leafletElement.dragging.enable();
        } else {
          this.leafletElement.dragging.disable();
        }
      }

      if (toProps.rotationAngle !== fromProps.rotationAngle) {
        this.leafletElement.setRotationAngle(toProps.rotationAngle);
      }

      if (toProps.rotationOrigin !== fromProps.rotationOrigin) {
        this.leafletElement.setRotationOrigin(toProps.rotationOrigin);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return children == null || this.contextValue == null ? null : _react.default.createElement(_reactLeaflet.LeafletProvider, {
        value: this.contextValue
      }, children);
    }
  }]);

  return RotatedMarker;
}(_reactLeaflet.MapLayer);

RotatedMarker.defaultProps = {
  rotationOrigin: 'center'
};

var _default = (0, _reactLeaflet.withLeaflet)(RotatedMarker);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=RotatedMarker.js