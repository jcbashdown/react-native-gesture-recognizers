'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _reactNative = require('react-native');
var _react = require('react');

var _reactNative2 = _interopRequireDefault(_reactNative);
var _react2 = _interopRequireDefault(_react);

var initialState = {
  absoluteChangeX: 0,
  absoluteChangeY: 0,
  changeX: 0,
  changeY: 0
};

var propTypes = {
  onPanBegin: _react.PropTypes.func,
  onPan: _react.PropTypes.func,
  onPanEnd: _react.PropTypes.func,
  resetPan: _react.PropTypes.bool,
  panDecoratorStyle: _react.PropTypes.object
};

exports['default'] = function () {
  var _ref = arguments[0] === undefined ? {} : arguments[0];

  var _ref$setGestureState = _ref.setGestureState;
  var setGestureState = _ref$setGestureState === undefined ? true : _ref$setGestureState;
  return function (BaseComponent) {
    return (function (_Component) {
      var _class = function _class(props, context) {
        var _this = this;

        _classCallCheck(this, _class);

        _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, props, context);

        this.handlePanResponderRelease = function () {
          var onPanEnd = _this.props.onPanEnd;

          _this.lastX = _this.absoluteChangeX;
          _this.lastY = _this.absoluteChangeY;
          onPanEnd && onPanEnd(); // eslint-disable-line no-unused-expressions
        };

        this.lastX = 0;
        this.lastY = 0;
        this.absoluteChangeY = 0;
        this.absoluteChangeX = 0;

        this.state = initialState;
      };

      _inherits(_class, _Component);

      _createClass(_class, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (nextProps.resetPan) {
            this.lastX = 0;
            this.lastY = 0;
            this.absoluteChangeY = 0;
            this.absoluteChangeX = 0;

            if (setGestureState) {
              this.setState(initialState);
            }
          }
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          this.panResponder = _reactNative.PanResponder.create({

            onStartShouldSetPanResponder: function onStartShouldSetPanResponder(_ref2, _ref3) {
              var touches = _ref2.nativeEvent.touches;
              var x0 = _ref3.x0;
              var y0 = _ref3.y0;

              var shouldSet = touches.length === 1;

              if (shouldSet) {
                var onPanBegin = _this2.props.onPanBegin;

                onPanBegin && onPanBegin({ // eslint-disable-line no-unused-expressions
                  originX: x0,
                  originY: y0
                });
              }

              return shouldSet;
            },

            onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(_ref4) {
              var touches = _ref4.nativeEvent.touches;

              return touches.length === 1;
            },

            onPanResponderMove: function onPanResponderMove(evt, _ref5) {
              var dx = _ref5.dx;
              var dy = _ref5.dy;
              var onPan = _this2.props.onPan;

              var panState = {
                absoluteChangeX: _this2.lastX + dx,
                absoluteChangeY: _this2.lastY + dy,
                changeX: dx,
                changeY: dy
              };

              onPan && onPan(panState); // eslint-disable-line no-unused-expressions

              _this2.absoluteChangeX = panState.absoluteChangeX;
              _this2.absoluteChangeY = panState.absoluteChangeY;
              if (setGestureState) {
                _this2.setState(panState);
              }
            },

            onPanResponderTerminationRequest: function onPanResponderTerminationRequest() {
              return true;
            },
            onPanResponderTerminate: this.handlePanResponderRelease,
            onPanResponderRelease: this.handlePanResponderRelease
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var _props = this.props;
          var onPanBegin = _props.onPanBegin;
          var onPan = _props.onPan;
          var onPanEnd = _props.onPanEnd;
          var resetPan = _props.resetPan;
          var panDecoratorStyle = _props.panDecoratorStyle;

          var props = _objectWithoutProperties(_props, ['onPanBegin', 'onPan', 'onPanEnd', 'resetPan', 'panDecoratorStyle']);

          var style = _extends({}, panDecoratorStyle, {
            alignSelf: 'flex-start'
          });

          return _react2['default'].createElement(
            _reactNative.View,
            _extends({}, this.panResponder.panHandlers, { style: style }),
            _react2['default'].createElement(BaseComponent, _extends({}, props, this.state))
          );
        }
      }], [{
        key: 'propTypes',
        value: propTypes,
        enumerable: true
      }]);

      return _class;
    })(_react.Component);
  };
};

module.exports = exports['default'];
