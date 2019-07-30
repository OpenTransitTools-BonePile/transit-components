"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _leaflet = _interopRequireDefault(require("leaflet"));

var _streetcarIcon = _interopRequireDefault(require("./streetcar-icon"));

var _busIcon = _interopRequireDefault(require("./bus-icon"));

var _gondolaIcon = _interopRequireDefault(require("./gondola-icon"));

var _railIcon = _interopRequireDefault(require("./rail-icon"));

var _tramIcon = _interopRequireDefault(require("./tram-icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeVehicleIcon(cls, mode, defStr) {
  var icon = null;

  switch (mode) {
    case "BUS":
      icon = _react.default.createElement(_busIcon.default, null);
      break;

    case "TRAM":
      icon = _react.default.createElement(_tramIcon.default, null);
      break;

    case "SC":
      icon = _react.default.createElement(_streetcarIcon.default, null);
      break;

    case "GONDOLA":
      icon = _react.default.createElement(_gondolaIcon.default, null);
      break;

    case "RAIL":
      icon = _react.default.createElement(_railIcon.default, null);
      break;

    default:
      icon = _react.default.createElement(_busIcon.default, null);
      break;
  }

  var retVal = null;
  if (mode != null) retVal = _leaflet.default.divIcon({
    html: _server.default.renderToString(icon),
    className: cls,
    popupAnchor: [0, -11],
    tooltipAnchor: [0, -11],
    iconSize: [22, 22]
  });else retVal = _leaflet.default.divIcon({
    html: "<span>".concat(defStr || 'fxp', "</span>")
  });
  return retVal;
}

var _default = makeVehicleIcon;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=index.js