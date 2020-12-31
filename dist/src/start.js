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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var webpack_dev_middleware_1 = __importDefault(require("webpack-dev-middleware"));
var webpack_2 = require("./webpack");
var createApp_1 = __importDefault(require("./isomorphic/createApp"));
var server_1 = require("react-dom/server");
var resource_1 = require("./resource");
var process_1 = __importDefault(require("process"));
process_1.default.on('exit', function (code) {
    console.log("\u9000\u51FA\u7801: " + code);
});
var getModuleAsync = function (loader) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loader()];
            case 1: return [2 /*return*/, (_a.sent()).default];
        }
    });
}); };
var getDevAssets = function (assetsByChunkName) {
    return Object.keys(assetsByChunkName).reduce(function (assets, chunkName) {
        var _a;
        return __assign(__assign({}, assets), (_a = {}, _a[chunkName] = Array.isArray(assetsByChunkName[chunkName]) ? assetsByChunkName[chunkName][0] : assetsByChunkName[chunkName], _a));
    }, {});
};
var startApp = function (matchaConfig) {
    var startMatchaConfig = __assign(__assign({}, matchaConfig), { out: matchaConfig.temp });
    var port = startMatchaConfig.port, mode = startMatchaConfig.mode, root = startMatchaConfig.root, src = startMatchaConfig.src, publicPath = startMatchaConfig.publicPath, staticPath = startMatchaConfig.staticPath, out = startMatchaConfig.out;
    var isProd = mode === 'production';
    var isDev = mode === 'development';
    var app = express_1.default();
    app.listen(port, function () {
        console.info("\n    app start, listening port " + port + "\n    mode: " + mode + "\n    ---------------\n    code:\n         -- root: " + root + "\n         -- src: " + src + "\n         -- out: " + out + "\n         -- isProd: " + isProd + "\n    app:\n         -- publicPath: " + publicPath + "\n         -- staticPath: " + staticPath + "\n         -- assets: assets\n  ");
    });
    var routerCtrl = new resource_1.RouterController(startMatchaConfig);
    var assetsCtrl = new resource_1.AssetsController(startMatchaConfig);
    if (isDev) {
        webpack_1.default(webpack_2.createServerWebpackConfig(startMatchaConfig, true), function (err, stats) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(err);
                console.log(stats.toString({ colors: true }));
                routerCtrl.loadInstance();
                return [2 /*return*/];
            });
        }); });
    }
    else {
        routerCtrl.loadInstance();
    }
    if (isDev) {
        var staticDevMiddleware = webpack_dev_middleware_1.default(webpack_1.default(webpack_2.createClientWebpackConfig(startMatchaConfig, true)), {
            publicPath: staticPath,
            serverSideRender: true,
            writeToDisk: true
        });
        app.use(staticDevMiddleware);
    }
    else {
        assetsCtrl.loadInstance();
        app.use(staticPath, express_1.default.static(path_1.default.join(root, out, 'static')));
    }
    app.use(publicPath, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var assets, serverRouter, route, AppCtrlClass, context, app, ctrl, content, main, vendor;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    assets = isDev ? getDevAssets(res.locals.webpackStats.toJson().assetsByChunkName) : assetsCtrl.getInstance();
                    console.log(assets);
                    serverRouter = routerCtrl.getInstance();
                    route = serverRouter(req.path);
                    if (!route) {
                        res.end('404');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getModuleAsync(route.loader)];
                case 1:
                    AppCtrlClass = _b.sent();
                    context = {
                        isServer: true,
                        isClient: false,
                        location: {
                            protocol: req.protocol,
                            hostname: req.hostname,
                            baseUrl: req.baseUrl,
                            path: req.path,
                            query: req.query
                        },
                        prefetch: { state: {} },
                        req: req
                    };
                    return [4 /*yield*/, createApp_1.default(AppCtrlClass, context)];
                case 2:
                    app = _b.sent();
                    ctrl = app.getCtrl();
                    context.prefetch.state = ((_a = ctrl.store) === null || _a === void 0 ? void 0 : _a.getState()) || {};
                    content = ctrl.ssr ? server_1.renderToString(app.renderView()) : '';
                    main = assets.main;
                    vendor = assets.vendor;
                    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                    res.end("\n      <html>\n        <head>\n            <title>matcha</title>\n        </head>\n         <script>\n            window.__LOCATION__ = '" + encodeURIComponent(JSON.stringify(context.location)) + "'\n            window.__PREFETCH__ = '" + encodeURIComponent(JSON.stringify(context.prefetch)) + "'       \n            window.__XSS__ = '" + encodeURIComponent('alert(123)') + "'\n          </script>\n        <body>\n          <div id=\"matcha-app-root\">" + content + "</div>\n           <script src=\"" + staticPath + main + "\"></script>\n           <script src=\"" + staticPath + vendor + "\"></script>\n        </body>\n       </html>\n      ");
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.default = startApp;
//# sourceMappingURL=start.js.map