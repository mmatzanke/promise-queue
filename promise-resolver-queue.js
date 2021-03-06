(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.promiseResolverQueue = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PromiseQueue = function () {
  function PromiseQueue() {
    _classCallCheck(this, PromiseQueue);

    this._promiseQueue = [];
  }

  _createClass(PromiseQueue, [{
    key: "push",
    value: function push(promise) {
      this._promiseQueue.push(promise);
    }
  }, {
    key: "resolve",
    value: function resolve() {
      var _promiseQueue = this._promiseQueue;

      var results = [];
      var previous = void 0;

      return new Promise(function (resolve, reject) {
        var _loop = function _loop() {
          var promise = _promiseQueue.shift();

          if (!previous) {
            previous = promise;
            return "continue";
          }
          previous = previous.then(function (result) {
            results.push(result);
            return promise;
          }).catch(function (error) {
            reject(error);
          });
        };

        while (_promiseQueue.length) {
          var _ret = _loop();

          if (_ret === "continue") continue;
        }

        return previous.then(function (lastResult) {
          results.push(lastResult);
          resolve(results);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return PromiseQueue;
}();

exports.default = PromiseQueue;

},{}]},{},[1])(1)
});