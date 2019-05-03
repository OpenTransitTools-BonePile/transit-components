"use strict";

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _config = _interopRequireDefault(require("json-loader!yaml-loader!../common/config.yml"));

var _TransitMap = _interopRequireDefault(require("./TransitMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var urlParams = new URLSearchParams(window.location.search);
/**
 *  note: this is a simple test script that's an entry into the TransitMap component
 *        further, we see it's the only thing loading the config.yml (important, since the real
 *        config.yml file(s) ewon't be sourced out of this Component Library).
 */

var zoom = urlParams.get("zoom") || _config.default.map.initZoom;

var ll = urlParams.get("center");
var rte = urlParams.get("routeId");
var ctr = ll ? ll.split(",") : [_config.default.map.initLat, _config.default.map.initLon];
(0, _reactDom.render)(_react.default.createElement(_TransitMap.default, {
  config: _config.default.map,
  center: ctr,
  zoom: zoom,
  routeId: rte
}), document.getElementById('map'));

//# sourceMappingURL=index.js