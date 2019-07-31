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

require("leaflet");

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

var _MyWithLeaflet = _interopRequireDefault(require("../map/MyWithLeaflet"));

var _VehicleMarker = _interopRequireDefault(require("./VehicleMarker"));

var _VehicleGeometry = _interopRequireDefault(require("./VehicleGeometry"));

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

function catchFetchErrors(response) {
  // :see: https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}

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
      selectedRoutes: [],
      selectedStop: null,
      routeData: [],
      // TBD Array of <RouteData > components, which comprise route and stop geo data
      mapZoom: 0,
      trackedVehicle: null,
      vehicles: []
    }, _this.closeZoom = 15, _this.midZoom = 13, _this.farZoom = 10, _temp));
  }

  _createClass(SelectVehicles, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.visible) {
        this._startRefreshing();
      }

      this.enableCallBacks();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._stopRefreshing();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.setAnimationClass(true);
      this.trackVehicle();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!this.props.visible && nextProps.visible) {
        this._startRefreshing();
      } else if (this.props.visible && !nextProps.visible) {
        this._stopRefreshing();
      }

      this.enableCallBacks();
    }
    /**
     * this method is used for backporting to React 15
     * v16:  return this.props.leaflet;
     * v15:  return this.context;
     */

  }, {
    key: "getLeafletContext",
    value: function getLeafletContext() {
      return this.props.leaflet;
    }
  }, {
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
    key: "trackVehicle",
    value: function trackVehicle() {
      if (this.state.trackedVehicle != null && this.state.trackedVehicle.id != null) {
        var v = this.findVehicle(this.state.trackedVehicle.id);

        if (v != null) {
          var ll = [v.lat, v.lon];
          this.getLeafletContext().map.setView(ll);
          this.state.trackedVehicle = v; // update the state with newest vehicle
        }
      }
    }
  }, {
    key: "setAnimationClass",
    value: function setAnimationClass(doAnimate) {
      var animateClass = 'vehicle-animate';
      var markers = document.getElementsByClassName("vehicle-marker");

      for (var i = 0; i < markers.length; i++) {
        if (doAnimate) markers[i].classList.add(animateClass);else markers[i].classList.remove(animateClass);
      }

      var z = 1;
    }
  }, {
    key: "startZoomCB",
    value: function startZoomCB() {
      if (this.props.visible) {
        this.setAnimationClass(false);
      }
    }
  }, {
    key: "endZoomCB",
    value: function endZoomCB() {
      if (this.props.visible) {
        // set state, so that markers will redraw on zoom
        // TODO: if calling setState here is perf-problematic, could call setState only on this.closeZoom = (zoom / zoom-1)
        var zoom = this.getLeafletContext().map.getZoom();
        this.setState({
          mapZoom: zoom
        });
        this.setAnimationClass(true);
      }
    }
  }, {
    key: "enableCallBacks",
    value: function enableCallBacks() {
      var _this3 = this;

      this.getLeafletContext().map.on('zoomstart', function () {
        _this3.startZoomCB('start');
      });
      this.getLeafletContext().map.on('zoomend', function () {
        _this3.endZoomCB('end');
      });
    }
  }, {
    key: "isNewer",
    value: function isNewer(res) {
      /** compares datestamp header of the data to last load's datestamp */
      var retVal = true;
      var lm = res.headers.get('Last-Modified');
      var lmd = new Date(lm);

      if (this.lastModified === null) {
        this.lastModified == lmd; // last modified is empty, so set it and say data is new

        retVal = true;
      } else {
        if (this.lastTimeStamp > lmd) retVal = false;else this.lastTimeStamp = lmd;
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
    key: "findVehicle",
    value: function findVehicle(id) {
      var retVal = null;

      try {
        for (var i = 0; i < this.state.vehicles.length; i++) {
          var v = this.state.vehicles[i];

          if (v.id == id) {
            retVal = v;
            break;
          }
        }
      } catch (e) {
        console.log("ERROR findVehicle " + id + " " + e);
      }

      return retVal;
    }
  }, {
    key: "getVehicles",
    value: function getVehicles() {
      var _this4 = this;

      var d = Date.now();
      var r = this.props.routeId || this.props.default; // (might have to strip off TriMet, etc...
      // wrap the fetch with

      if (!this.isBusy()) {
        this.setBusy(true); // eg: https://maps.trimet.org/gtfs/rt/vehicles/routes/100

        fetch("".concat(this.props.api, "/routes/").concat(r, "?time=").concat(d)).then(catchFetchErrors).then(function (res) {
          var retVal = null;
          if (_this4.isNewer(res)) retVal = res.json();
          return retVal;
        }).then(function (json) {
          _this4.setBusy(false);

          if (json != null) _this4.setState({
            vehicles: json
          });
        }).catch(function (error) {
          _this4.setBusy(false); // unlock the busy flag on errors


          console.log("VEH fetch() error: " + error);
        });
      }
    } // need to implement create interface (and update interface for older React-Leaflet versions)

  }, {
    key: "createLeafletElement",
    value: function createLeafletElement(props) {}
  }, {
    key: "updateLeafletElement",
    value: function updateLeafletElement(props) {} // TODO: turn off animate css
    // this.context.map.on('moveend', () => {
    // { /* see below: https://react-leaflet.js.org/docs/en/context.html */ }
    // <LeafletConsumer>{context => console.log(context)}</LeafletConsumer>

  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var vehicles = this.state.vehicles;
      console.log(vehicles.length);
      if (!vehicles || vehicles.length === 0) return _react.default.createElement(_reactLeaflet.FeatureGroup, {
        id: "vehicles fg"
      });else return _react.default.createElement(_reactLeaflet.FeatureGroup, {
        id: "vehicles fg"
      }, vehicles.map(function (v) {
        return _react.default.createElement(_VehicleMarker.default, {
          key: v.id,
          vehicle: v,
          controller: _this5,
          closeZoom: _this5.closeZoom,
          midZoom: _this5.midZoom,
          farZoom: _this5.farZoom
        });
      }), _react.default.createElement(_VehicleGeometry.default, {
        trackedVehicle: this.state.trackedVehicle
      }));
    }
  }]);

  return SelectVehicles;
}(_reactLeaflet.MapLayer);

var _default = (0, _MyWithLeaflet.default)(SelectVehicles);

exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=SelectVehicles.js