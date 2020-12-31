"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var createStore = function (initialState, actions) {
    var state = __assign({}, initialState);
    var callbackWorkQueue = [];
    var dispatchers = {};
    Object.keys(actions).forEach(function (actionName) {
        dispatchers[actionName] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return replaceState(actions[actionName].apply(actions, __spreadArrays([getState()], args)));
        };
    });
    var getState = function () { return state; };
    var getDispatchers = function () { return dispatchers; };
    var replaceState = function (nextState) {
        state = __assign({}, nextState);
        performCallbacks();
    };
    var performCallbacks = function () {
        var queue = __spreadArrays(callbackWorkQueue);
        queue.forEach(function (work) {
            work.callback();
        });
    };
    var unsubscribe = function (targetWork) {
        callbackWorkQueue = callbackWorkQueue.filter(function (work) { return work !== targetWork; });
    };
    var subscribe = function (callback) {
        var work = {
            callback: callback,
            createTime: Number(new Date())
        };
        callbackWorkQueue.push(work);
        return function () { return unsubscribe(work); };
    };
    return {
        getState: getState,
        replaceState: replaceState,
        subscribe: subscribe,
        getDispatchers: getDispatchers
    };
};
exports.default = createStore;
//# sourceMappingURL=createStore.js.map