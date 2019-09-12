"use strict";

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

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.number.constructor");

var _react = _interopRequireDefault(require("react"));

var _reactLeaflet = require("react-leaflet");

var _polyline = _interopRequireDefault(require("@mapbox/polyline"));

var turf = _interopRequireWildcard(require("@turf/turf"));

var utils = _interopRequireWildcard(require("../utils"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

// const tiUrl = "https://maps.trimet.org/otp_mod/index";
// const tiUrl = "http://localhost:54445/ti";
//const tiUrl = "https://maps7.trimet.org/ti/index";
var tiUrl = "https://betaplanner.trimet.org/ws/ti/v0/index"; //const geojson = "";  // use this setting if want to use encoded vs. geojson

var geojson = "/geojson";

Number.prototype.round = function (places) {
  return +(Math.round(this + "e+" + places) + "e-" + places);
};

var VehicleGeometry =
/*#__PURE__*/
function (_MapLayer) {
  _inherits(VehicleGeometry, _MapLayer);

  function VehicleGeometry() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, VehicleGeometry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(VehicleGeometry)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.patterns = [], _temp));
  }

  _createClass(VehicleGeometry, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {}
  }, {
    key: "createLeafletElement",
    value: function createLeafletElement() {}
  }, {
    key: "updateLeafletElement",
    value: function updateLeafletElement() {}
  }, {
    key: "cachePatternEncoded",
    value: function cachePatternEncoded(pat, key) {
      var geom = pat.points;

      var pts = _polyline.default.decode(geom);

      this.patterns[key] = pts;
    }
  }, {
    key: "cachePatternGeojson",
    value: function cachePatternGeojson(pat, key) {
      /**
       * will cache the [[lat,lon], [lat,lon], etc...] coords
       * note: geojson uses [lon,lat] (e.g., [X, Y], so must reverse that to match encoded coords
       */
      var revCoords = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = pat.coordinates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var c = _step.value;
          revCoords.push(c.reverse());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.patterns[key] = revCoords;
    }
  }, {
    key: "getAgencyPattern",
    value: function getAgencyPattern(vehicle) {
      var a = vehicle.agencyId || "TriMet";
      var p = vehicle.shapeId;
      return "".concat(a, ":").concat(p);
    }
  }, {
    key: "getUrl",
    value: function getUrl(vehicle, ap) {
      var d = Date.now();
      if (!ap) ap = this.getAgencyPattern(vehicle);
      var retVal = "".concat(tiUrl, "/patterns/").concat(ap, "/geometry").concat(geojson, "?date=").concat(d);
      return retVal;
    }
  }, {
    key: "isNorthbound",
    value: function isNorthbound(vehicle) {
      return vehicle.heading <= 45.0 || vehicle.heading >= 315.0;
    }
  }, {
    key: "isSouthbound",
    value: function isSouthbound(vehicle) {
      return vehicle.heading >= 135.0 && vehicle.heading <= 225.0;
    }
  }, {
    key: "isEastbound",
    value: function isEastbound(vehicle) {
      return vehicle.heading > 45.0 && vehicle.heading < 135.0;
    }
  }, {
    key: "isWestbound",
    value: function isWestbound(vehicle) {
      return vehicle.heading > 225.0 && vehicle.heading < 315.0;
    }
  }, {
    key: "callGeometryWS",
    value: function callGeometryWS(vehicle) {
      var _this2 = this;

      // https://maps.trimet.org/otp_mod/index/patterns/TriMet:190:0:04/geometry
      var retVal = null;
      var ap = this.getAgencyPattern(vehicle);
      var geomWsUrl = this.getUrl(vehicle, ap);
      utils.log("Calling GEO URL: " + geomWsUrl, true);
      fetch(geomWsUrl).then(function (res) {
        retVal = res.json();
        return retVal;
      }).then(function (json) {
        if (geomWsUrl.indexOf('geojson') >= 0) _this2.cachePatternGeojson(json, ap);else _this2.cachePatternEncoded(json, ap);
      }).catch(function (error) {
        utils.log("VEH GEOMETRY fetch() error: " + error, true);
      });
      return retVal;
    }
  }, {
    key: "findPointOnLine",
    value: function findPointOnLine(vehicle, geom) {
      utils.start();
      var retVal = 0;
      var pt = turf.point([vehicle.lat, vehicle.lon]);
      var line = turf.lineString(geom);
      var snapped = turf.nearestPointOnLine(line, pt, {
        units: 'miles'
      });

      if (snapped && snapped.properties.index) {
        retVal = snapped.properties.index;
      }

      utils.end();
      return retVal;
    }
  }, {
    key: "getGeometry",
    value: function getGeometry(vehicle) {
      /**
       * find the vehicle's pattern, either in cache or via the pattern service (which is not request/
       * /response, thus might not come back in this call)
       */
      var retVal = null; // step 1: get the geometry (either from cache or by calling the pattern service)

      var key = this.getAgencyPattern(vehicle);
      var geom = this.patterns[key];

      if (!geom) {
        this.callGeometryWS(vehicle);
        geom = this.patterns[key];
      } // step 2: if we have a line geometry, let's break it in 2 at the vehicle location


      if (geom) {
        var geomGray = [];
        var geomColor = [];
        var mid = 0;
        if (vehicle.stopSequence === 1) mid = 0;else mid = this.findPointOnLine(vehicle, geom);

        for (var i = 0; i < geom.length; i++) {
          if (i <= mid) geomGray.push(geom[i]);
          if (i >= mid) geomColor.push(geom[i]);
        }

        retVal = [{
          key: key + "-PAST",
          geometry: geomGray
        }, {
          key: key + "-FUTURE",
          geometry: geomColor
        }];
      }

      return retVal;
    }
  }, {
    key: "render",
    value: function render() {
      var vehicle = this.props.trackedVehicle;
      if (!vehicle) return _react.default.createElement(_reactLeaflet.FeatureGroup, null);
      var pattern = this.getGeometry(vehicle);
      if (!pattern) return _react.default.createElement(_reactLeaflet.FeatureGroup, null);
      utils.log("drawing geometry for pattern ".concat(this.getAgencyPattern(vehicle)));
      var gray = '#555555';
      var color = '#00bfff';
      var segments = [];
      segments.push(_react.default.createElement(_reactLeaflet.Polyline, {
        key: pattern[0].key,
        positions: pattern[0].geometry,
        weight: 4,
        color: gray,
        opacity: 0.8
      }));
      segments.push(_react.default.createElement(_reactLeaflet.Polyline, {
        key: pattern[1].key,
        positions: pattern[1].geometry,
        weight: 4,
        color: color,
        opacity: 0.8
      }));
      return segments.length > 0 ? _react.default.createElement(_reactLeaflet.FeatureGroup, null, _react.default.createElement("div", null, segments)) : _react.default.createElement(_reactLeaflet.FeatureGroup, null);
    }
  }]);

  return VehicleGeometry;
}(_reactLeaflet.MapLayer);

var _default = VehicleGeometry;
exports.default = _default;
module.exports = exports.default;

//# sourceMappingURL=VehicleGeometry.js