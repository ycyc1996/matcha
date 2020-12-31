"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAgent = exports.getTimestamp = void 0;
exports.getTimestamp = function () { return Number(new Date()); };
exports.getUserAgent = function (context) {
    var _a, _b;
    if (context.isServer) {
        return (_b = (_a = context === null || context === void 0 ? void 0 : context.req) === null || _a === void 0 ? void 0 : _a.headers['user-agent']) !== null && _b !== void 0 ? _b : '';
    }
    if (window) {
        return window.navigator.userAgent;
    }
    return '';
};
//# sourceMappingURL=util.js.map