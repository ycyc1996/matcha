"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var ResourceController = /** @class */ (function () {
    function ResourceController(matchaConfig) {
        var _this = this;
        this.routes = [];
        this.assets = {};
        this.getAssetsManifest = function () {
            var _a = _this.matchaConfig, root = _a.root, out = _a.out;
            var staticManifestPath = path_1.default.join(root, out, 'static', 'manifest');
            var assetsManifest = {};
            try {
                _this.clearRequireCache(staticManifestPath);
                assetsManifest = require(staticManifestPath);
            }
            catch (e) {
                console.log(e);
            }
            return assetsManifest;
        };
        this.getRoutesManifest = function () {
            var _a = _this.matchaConfig, root = _a.root, out = _a.out;
            var routesManifestPath = path_1.default.join(root, out, 'static', 'manifest');
            var routesManifest = {};
            try {
                _this.clearRequireCache(routesManifestPath);
                routesManifest = require(routesManifestPath);
            }
            catch (e) {
                console.log(e);
            }
            return routesManifest;
        };
        this.getAssets = function () {
            return _this.getAssetsManifest();
        };
        this.getRoutes = function () {
            var _a = _this.matchaConfig, root = _a.root, out = _a.out;
            var routes = [];
            try {
                var entryPath = path_1.default.join(root, out, 'routes', 'index');
                _this.clearRequireCache(entryPath);
                routes = require(entryPath).default;
            }
            catch (e) {
                console.log(e);
            }
            return routes;
        };
        this.clearRequireCache = function (requirePath) {
            try {
                delete require.cache[require.resolve(requirePath)];
                console.log("delete cache success: " + requirePath);
            }
            catch (e) {
                console.log(e);
            }
        };
        this.requireAssets = function () {
            _this.assets = _this.getAssets();
        };
        this.requireRoutes = function () {
            _this.routes = _this.getRoutes();
        };
        this.requireModule = function () {
            _this.requireAssets();
            _this.requireRoutes();
        };
        this.matchaConfig = matchaConfig;
    }
    return ResourceController;
}());
exports.default = ResourceController;
//# sourceMappingURL=resourceController.js.map