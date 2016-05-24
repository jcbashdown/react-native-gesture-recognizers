'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _recognizersPannable = require('./recognizers/pannable');

var _recognizersPannable2 = _interopRequireDefault(_recognizersPannable);

exports.pannable = _recognizersPannable2['default'];

var _recognizersSwipeable = require('./recognizers/swipeable');

var _recognizersSwipeable2 = _interopRequireDefault(_recognizersSwipeable);

exports.swipeable = _recognizersSwipeable2['default'];