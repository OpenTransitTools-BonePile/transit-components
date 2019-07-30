"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _leaflet = require("leaflet");

var _reactLeaflet = require("react-leaflet");

require("promise-polyfill/src/polyfill");

require("whatwg-fetch");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AllVehicles =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AllVehicles, _React$Component);

  function AllVehicles() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, AllVehicles);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AllVehicles)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.state = {
      vehicles: []
    }, _temp));
  }

  _createClass(AllVehicles, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.getVehicles();
      this.interval = setInterval(function () {
        _this2.getVehicles();
      }, 5000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
    }
  }, {
    key: "getVehicles",
    value: function getVehicles() {
      var _this3 = this;

      fetch("https://pdxlivebus.now.sh").then(function (res) {
        return res.json();
      }).then(function (res) {
        _this3.setState({
          vehicles: res
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react.default.createElement("div", {
        class: "vehicles"
      }, this.state.vehicles.map(function (vehicle, idx) {
        console.log(_this4.state.vehicles.length);
        var icon = (0, _leaflet.divIcon)({
          html: "<span>".concat(vehicle.routeNumber, "</span>")
        });
        var key = vehicle.vehicleID;
        var position = [vehicle.latitude, vehicle.longitude];
        return _react.default.createElement(_reactLeaflet.Marker, {
          class: "marker",
          icon: icon,
          key: key,
          position: position
        }, _react.default.createElement(_reactLeaflet.Popup, null, _react.default.createElement("span", null, "VEH: ", key)));
      }));
    }
  }]);

  return AllVehicles;
}(_react.default.Component);

var _default = AllVehicles;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=AllVehicles.js