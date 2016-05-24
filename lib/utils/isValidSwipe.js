'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (velocity, directionalChange, velocityThreshold, changeThreshold) {
  return Math.abs(velocity) > velocityThreshold && Math.abs(directionalChange) < changeThreshold;
};

module.exports = exports['default'];