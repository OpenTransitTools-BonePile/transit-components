"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = myWithLeaflet;

var _reactLeaflet = require("react-leaflet");

/**
 * this wrapper was created to help easing the code for back-porting to React v15
 * (e.g., this leaflet hook doesn't exist in v15, so for the backport, we comment out withLeaflet)
 */
function myWithLeaflet(clz) {
  return (0, _reactLeaflet.withLeaflet)(clz);
}

module.exports = exports.default;

//# sourceMappingURL=MyWithLeaflet.js