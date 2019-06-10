"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("leaflet");

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

var _VehicleMarker = _interopRequireDefault(require("./VehicleMarker"));

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

var SelectVehicles =
/*#__PURE__*/
function (_MapLayer) {
  _inherits(SelectVehicles, _MapLayer);

  function SelectVehicles() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, SelectVehicles);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectVehicles)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.state = {
      selected_routes: [],
      selected_stop: null,
      vehicles: [],
      route_data: [] // TBD Array of <RouteData > components, which comprise route and stop geo data

    }, _temp));
  }

  _createClass(SelectVehicles, [{
    key: "_startRefreshing",
    value: function _startRefreshing() {
      var _this2 = this;

      // initial vehicle refresh
      this.getVehicles(); // get refresh values (default 10 seconds), and convert from secs to millisecs

      var refresh = 10000;

      if (this.props.refresh) {
        var r = this.props.refresh;
        if (r > 0 && r <= 100) r = r * 1000;
        if (r >= 1000 && r < 100000) refresh = r;
      } // do the recurring refresh of the get vehicles AJAX call


      this._refreshTimer = setInterval(function () {
        _this2.getVehicles();
      }, refresh);
    }
  }, {
    key: "_stopRefreshing",
    value: function _stopRefreshing() {
      if (this._refreshTimer) {
        clearInterval(this._refreshTimer);
        this.setBusy(false);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.visible) {
        this._startRefreshing();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._stopRefreshing();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.visible && nextProps.visible) {
        this._startRefreshing();
      } else if (this.props.visible && !nextProps.visible) {
        this._stopRefreshing();
      }
    }
  }, {
    key: "isNewer",
    value: function isNewer(res) {
      /** compares datestamp header of the data to last load's datestamp */
      var retVal = true;

      try {
        var lm = res.headers.get('Last-Modified');
        var lmd = new Date(lm);

        if (this.lastModified === null) {
          this.lastModified == lmd; // last modified is empty, so set it and say data is new

          retVal = true;
        } else {
          if (this.lastTimeStamp > lmd) retVal = false;else this.lastTimeStamp = lmd;
        }
      } catch (e) {
        console.log(e);
      }

      return retVal;
    }
  }, {
    key: "isBusy",
    value: function isBusy() {
      return this._isBusy;
    }
  }, {
    key: "setBusy",
    value: function setBusy(val) {
      this._isBusy = val;
    }
  }, {
    key: "getVehicles",
    value: function getVehicles() {
      var _this3 = this;

      var d = Date.now();
      var r = this.props.routeId || this.props.default; // (might have to strip off TriMet, etc...
      // wrap the fetch with

      if (!this.isBusy()) {
        this.setBusy(true);
        fetch("".concat(this.props.api, "/routes/").concat(r, "?time=").concat(d)).then(function (res) {
          var retVal = null;
          if (_this3.isNewer(res)) retVal = res.json();
          return retVal;
        }).then(function (json) {
          _this3.setBusy(false);

          if (json != null) _this3.setState({
            vehicles: json
          });
        });
      } else {
        console.log("note: previous vehicle /q still running...will skip this update and wait (to avoid race-condition)");
      }
    } // need to implement create interface (and update interface for older React-Leaflet versions)

  }, {
    key: "createLeafletElement",
    value: function createLeafletElement(props) {}
  }, {
    key: "updateLeafletElement",
    value: function updateLeafletElement(props) {}
  }, {
    key: "render",
    value: function render() {
      var vehicles = this.state.vehicles;
      console.log(vehicles.length);
      if (!vehicles || vehicles.length === 0) return _react.default.createElement(_reactLeaflet.FeatureGroup, {
        id: "vehicles fg"
      });else return _react.default.createElement(_reactLeaflet.FeatureGroup, {
        id: "vehicles fg"
      }, vehicles.map(function (v, i) {
        return _react.default.createElement(_VehicleMarker.default, {
          key: "vm" + i,
          vehicle: v
        });
      }));
    }
  }]);

  return SelectVehicles;
}(_reactLeaflet.MapLayer);

var _default = SelectVehicles;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=SelectVehicles.js