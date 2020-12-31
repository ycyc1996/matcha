"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsController = exports.RouterController = exports.BaseResourceController = void 0;
var createRouter_1 = __importDefault(require("./isomorphic/createRouter"));
var path_1 = __importDefault(require("path"));
var BaseResourceController = /** @class */ (function () {
    function BaseResourceController(matchaConfig) {
        var _this = this;
        this.instance = null;
        this.loadInstance = function () { };
        this.getInstance = function () { return _this.instance; };
        this.clearRequireCache = function (requirePath) {
            try {
                delete require.cache[require.resolve(requirePath)];
                console.log("delete cache success: " + requirePath);
            }
            catch (e) {
                console.log(e);
            }
        };
        this.matchaConfig = matchaConfig;
    }
    return BaseResourceController;
}());
exports.BaseResourceController = BaseResourceController;
var RouterController = /** @class */ (function (_super) {
    __extends(RouterController, _super);
    function RouterController(matchaConfig) {
        var _this = _super.call(this, matchaConfig) || this;
        _this.loadInstance = function () {
            _this.instance = createRouter_1.default(_this.getRoutes());
        };
        _this.getRoutes = function () {
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
        _this.instance = createRouter_1.default([]);
        return _this;
    }
    return RouterController;
}(BaseResourceController));
exports.RouterController = RouterController;
var AssetsController = /** @class */ (function (_super) {
    __extends(AssetsController, _super);
    function AssetsController(matchaConfig) {
        var _this = _super.call(this, matchaConfig) || this;
        _this.loadInstance = function () {
            _this.instance = _this.getAssetsManifest();
        };
        _this.getAssetsManifest = function () {
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
        _this.instance = {};
        return _this;
    }
    return AssetsController;
}(BaseResourceController));
exports.AssetsController = AssetsController;
//# sourceMappingURL=resource.js.map