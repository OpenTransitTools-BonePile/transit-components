"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TrimetIcon =
/*#__PURE__*/
function (_Component) {
  _inherits(TrimetIcon, _Component);

  function TrimetIcon() {
    _classCallCheck(this, TrimetIcon);

    return _possibleConstructorReturn(this, _getPrototypeOf(TrimetIcon).apply(this, arguments));
  }

  _createClass(TrimetIcon, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("svg", {
        viewBox: "0 0 100.3 100.29",
        height: "100%",
        width: "100%"
      }, _react.default.createElement("path", {
        id: "path15",
        d: "M100.3,50.15A50.15,50.15,0,1,1,50.15,0,50.15,50.15,0,0,1,100.3,50.15",
        style: {
          fill: '#e0651f'
        }
      }), _react.default.createElement("path", {
        id: "path17",
        d: "M61.62,58.06A22.49,22.49,0,1,1,72.83,38.59",
        style: {
          fill: 'none',
          stroke: '#fff',
          strokeWidth: '6.08px'
        }
      }), _react.default.createElement("path", {
        id: "path19",
        d: "M50.88,37.61a22.49,22.49,0,1,1-22.32.1",
        style: {
          fill: 'none',
          stroke: '#fff',
          strokeWidth: '6.08px'
        }
      }), _react.default.createElement("path", {
        id: "path21",
        d: "M38.17,57.17A22.49,22.49,0,1,1,49.41,76.73",
        style: {
          fill: 'none',
          stroke: '#fff',
          strokeWidth: '6.08px'
        }
      }));
    }
  }]);

  return TrimetIcon;
}(_react.Component);

exports.default = TrimetIcon;
module.exports = exports.default;

//# sourceMappingURL=trimet-icon.js