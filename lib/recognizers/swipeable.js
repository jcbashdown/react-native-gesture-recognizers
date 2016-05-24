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

var _utilsIsValidSwipe = require('../utils/isValidSwipe');

var _utilsIsValidSwipe2 = _interopRequireDefault(_utilsIsValidSwipe);

var directions = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT'
};

var propTypes = {
  onSwipeBegin: _react.PropTypes.func,
  onSwipe: _react.PropTypes.func,
  onSwipeEnd: _react.PropTypes.func,
  swipeDecoratorStyle: _react.PropTypes.object
};

var swipeable = function swipeable() {
  var _ref = arguments[0] === undefined ? {} : arguments[0];

  var _ref$horizontal = _ref.horizontal;
  var horizontal = _ref$horizontal === undefined ? false : _ref$horizontal;
  var _ref$vertical = _ref.vertical;
  var vertical = _ref$vertical === undefined ? false : _ref$vertical;
  var _ref$left = _ref.left;
  var left = _ref$left === undefined ? false : _ref$left;
  var _ref$right = _ref.right;
  var right = _ref$right === undefined ? false : _ref$right;
  var _ref$up = _ref.up;
  var up = _ref$up === undefined ? false : _ref$up;
  var _ref$down = _ref.down;
  var down = _ref$down === undefined ? false : _ref$down;
  var _ref$continuous = _ref.continuous;
  var continuous = _ref$continuous === undefined ? true : _ref$continuous;
  var _ref$initialVelocityThreshold = _ref.initialVelocityThreshold;
  var initialVelocityThreshold = _ref$initialVelocityThreshold === undefined ? 0.7 : _ref$initialVelocityThreshold;
  var _ref$verticalThreshold = _ref.verticalThreshold;
  var verticalThreshold = _ref$verticalThreshold === undefined ? 10 : _ref$verticalThreshold;
  var _ref$horizontalThreshold = _ref.horizontalThreshold;
  var horizontalThreshold = _ref$horizontalThreshold === undefined ? 10 : _ref$horizontalThreshold;
  var _ref$setGestureState = _ref.setGestureState;
  var setGestureState = _ref$setGestureState === undefined ? true : _ref$setGestureState;
  return function (BaseComponent) {

    var checkHorizontal = horizontal || (left || right);
    var checkVertical = vertical || (up || down);

    return (function (_Component) {
      var _class = function _class(props, context) {
        var _this = this;

        _classCallCheck(this, _class);

        _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, props, context);

        this.handleTerminationAndRelease = function () {
          if (_this.swipeDetected) {
            var onSwipeEnd = _this.props.onSwipeEnd;

            onSwipeEnd && onSwipeEnd({ // eslint-disable-line no-unused-expressions
              direction: _this.swipeDirection
            });
          }

          _this.swipeDetected = false;
          _this.velocityProp = null;
          _this.distanceProp = null;
          _this.swipeDirection = null;
        };

        this.state = {
          swipe: {
            direction: null,
            distance: 0,
            velocity: 0
          }
        };

        this.swipeDetected = false;
        this.velocityProp = null;
        this.distanceProp = null;
        this.swipeDirection = null;
      };

      _inherits(_class, _Component);

      _createClass(_class, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          this.panResponder = _reactNative.PanResponder.create({

            onStartShouldSetPanResponder: function onStartShouldSetPanResponder(evt) {
              return evt.nativeEvent.touches.length === 1;
            },

            onMoveShouldSetPanResponder: function onMoveShouldSetPanResponder(evt) {
              return evt.nativeEvent.touches.length === 1;
            },

            onPanResponderMove: function onPanResponderMove(evt, gestureState) {
              var dx = gestureState.dx;
              var dy = gestureState.dy;
              var vx = gestureState.vx;
              var vy = gestureState.vy;
              var _props = _this2.props;
              var onSwipeBegin = _props.onSwipeBegin;
              var onSwipe = _props.onSwipe;

              if (!continuous && _this2.swipeDetected) {
                return;
              }

              var initialDetection = false;
              var validHorizontal = false;
              var validVertical = false;

              if (!_this2.swipeDetected) {
                initialDetection = true;

                validHorizontal = checkHorizontal && (0, _utilsIsValidSwipe2['default'])(vx, dy, initialVelocityThreshold, verticalThreshold);
                validVertical = checkVertical && (0, _utilsIsValidSwipe2['default'])(vy, dx, initialVelocityThreshold, horizontalThreshold);

                if (validHorizontal) {
                  _this2.velocityProp = 'vx';
                  _this2.distanceProp = 'dx';

                  if ((horizontal || left) && dx < 0) {
                    _this2.swipeDirection = directions.SWIPE_LEFT;
                  } else if ((horizontal || right) && dx > 0) {
                    _this2.swipeDirection = directions.SWIPE_RIGHT;
                  }
                } else if (validVertical) {
                  _this2.velocityProp = 'vy';
                  _this2.distanceProp = 'dy';

                  if ((vertical || up) && dy < 0) {
                    _this2.swipeDirection = directions.SWIPE_UP;
                  } else if ((vertical || down) && dy > 0) {
                    _this2.swipeDirection = directions.SWIPE_DOWN;
                  }
                }

                if (_this2.swipeDirection) {
                  _this2.swipeDetected = true;
                }
              }

              if (_this2.swipeDetected) {
                var distance = gestureState[_this2.distanceProp];
                var velocity = gestureState[_this2.velocityProp];

                var swipeState = {
                  direction: _this2.swipeDirection,
                  distance: distance,
                  velocity: velocity
                };

                if (initialDetection) {
                  onSwipeBegin && onSwipeBegin(swipeState); // eslint-disable-line no-unused-expressions
                } else {
                  onSwipe && onSwipe(swipeState); // eslint-disable-line no-unused-expressions
                }

                if (setGestureState) {
                  _this2.setState({
                    swipe: swipeState
                  });
                }
              }
            },

            onPanResponderTerminationRequest: function onPanResponderTerminationRequest() {
              return true;
            },
            onPanResponderTerminate: this.handleTerminationAndRelease,
            onPanResponderRelease: this.handleTerminationAndRelease
          });
        }
      }, {
        key: 'render',
        value: function render() {
          var _props2 = this.props;
          var onSwipeBegin = _props2.onSwipeBegin;
          var onSwipe = _props2.onSwipe;
          var onSwipeEnd = _props2.onSwipeEnd;
          var swipeDecoratorStyle = _props2.swipeDecoratorStyle;

          var props = _objectWithoutProperties(_props2, ['onSwipeBegin', 'onSwipe', 'onSwipeEnd', 'swipeDecoratorStyle']);

          var style = _extends({}, swipeDecoratorStyle, {
            alignSelf: 'flex-start'
          });

          var state = setGestureState ? this.state : null;

          return _reactNative2['default'].createElement(
            _reactNative.View,
            _extends({}, this.panResponder.panHandlers, { style: style }),
            _reactNative2['default'].createElement(BaseComponent, _extends({}, props, state))
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

swipeable.directions = directions;

exports['default'] = swipeable;
module.exports = exports['default'];
