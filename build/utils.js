"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;
exports.logTime = logTime;
exports.start = start;
exports.end = end;
exports.DEBUG = void 0;
var DEBUG = false;
exports.DEBUG = DEBUG;

function log(msg, debug) {
  if (typeof debug === "undefined") debug = DEBUG;
  if (debug) console.log(msg);
}

function logTime(name, debug) {
  if (typeof debug === "undefined") debug = DEBUG;
  if (debug) console.log("".concat(name, ": ") + Date.now());
}

function start(debug) {
  logTime("start", debug);
}

function end(debug) {
  logTime("end  ", debug);
}

//# sourceMappingURL=utils.js