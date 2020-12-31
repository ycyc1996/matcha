"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createRouter = function (routes) {
    return function (path) {
        return routes.find(function (route) {
            return route.patterns.some(function (parttern) { return path.endsWith(parttern); });
        }) || null;
    };
};
exports.default = createRouter;
//# sourceMappingURL=createRouter.js.map