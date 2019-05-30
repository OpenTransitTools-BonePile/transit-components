"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.regexp.replace");

var _react = _interopRequireDefault(require("react"));

require("leaflet");

require("leaflet-rotatedmarker");

var _reactLeaflet = require("react-leaflet");

var _RotatedMarker = _interopRequireDefault(require("../map/RotatedMarker"));

var _icons = _interopRequireDefault(require("./icons"));

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

var VehicleMarker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VehicleMarker, _React$Component);

  function VehicleMarker() {
    _classCallCheck(this, VehicleMarker);

    return _possibleConstructorReturn(this, _getPrototypeOf(VehicleMarker).apply(this, arguments));
  }

  _createClass(VehicleMarker, [{
    key: "render",
    value: function render() {
      var v = this.props.vehicle;
      var position = [v.lat, v.lon];
      var status = "unknown";
      if (v.status == "IN_TRANSIT_TO") status = "en-route to stop ";else if (v.status == "STOPPED_AT") if (v.stopSequence == 1) status = "beginning route from stop ";else status = "stopped at ";
      var lastReport = "";

      if (v.seconds > 60) {
        var min = Math.floor(v.seconds / 60);
        var sec = v.seconds - min * 60;
        var minStr = min == 1 ? "minute" : "minutes";
        if (sec > 0) lastReport = "".concat(min, " ").concat(minStr, " & ").concat(sec, " seconds ago");else lastReport = "".concat(min, " ").concat(minStr, " ago");
      } else {
        lastReport = "".concat(v.seconds, " seconds ago");
      }

      var vehicle = "";
      if (v.vehicleId.indexOf('+') > 0) vehicle = "Vehicles: " + v.vehicleId.replace(/\+/g, ", ");else vehicle = "Vehicle: " + v.vehicleId;
      var stopLink = "https://trimet.org/ride/stop.html?stop_id=".concat(v.stopId);
      var icon = (0, _icons.default)(v.routeType, v.routeShortName); // todo: put this valid 360 deg in service

      var heading = v.heading;
      if (heading == null || heading < 0 || heading >= 360) heading = 1;
      return _react.default.createElement(_RotatedMarker.default, {
        rotationAngle: heading,
        rotationOrigin: 'center center',
        icon: icon,
        key: v.id,
        position: position
      }, _react.default.createElement(_reactLeaflet.Popup, null, _react.default.createElement("span", null, _react.default.createElement("b", null, v.routeLongName)), _react.default.createElement("br", null), _react.default.createElement("span", null, "Last reported: ", lastReport), _react.default.createElement("br", null), _react.default.createElement("span", null, "Report date: ", v.reportDate), _react.default.createElement("br", null), _react.default.createElement("span", null, "Status: ", status, " ", _react.default.createElement("a", {
        target: "#",
        href: stopLink
      }, v.stopId)), _react.default.createElement("br", null), _react.default.createElement("span", null, vehicle), _react.default.createElement("br", null)), L.Browser.mobile !== true && _react.default.createElement(_reactLeaflet.Tooltip, null, _react.default.createElement("span", null, _react.default.createElement("b", null, v.routeShortName), ": ", lastReport)));
    }
  }]);

  return VehicleMarker;
}(_react.default.Component);

var _default = VehicleMarker;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=VehicleMarker.js