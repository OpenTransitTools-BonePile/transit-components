"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _react = _interopRequireDefault(require("react"));

require("leaflet");

require("leaflet-rotatedmarker");

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

var VehicleTracker =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VehicleTracker, _React$Component);

  function VehicleTracker() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, VehicleTracker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(VehicleTracker)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.state = {
      buttonText: "Track Vehicle"
    }, _temp));
  }

  _createClass(VehicleTracker, [{
    key: "handleClick",
    value: function handleClick() {
      if (this.state.isTracking) {
        this.setState({
          isTracking: false,
          buttonText: "Track Vehicle"
        });
        this.props.controller.setState({
          trackedVehicle: null
        });
      } else {
        this.setState({
          isTracking: true,
          buttonText: "Stop Tracking"
        });
        this.props.controller.setState({
          trackedVehicle: this.props.vehicle
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // This syntax ensures `this` is bound within handleClick
      return _react.default.createElement("button", {
        onClick: function onClick(e) {
          return _this2.handleClick(e);
        }
      }, this.state.buttonText);
    }
  }]);

  return VehicleTracker;
}(_react.default.Component);

var _default = VehicleTracker;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=VehicleTracker.js