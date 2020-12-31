"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Layout = function (props) {
    var context = props.context, content = props.content, assets = props.assets;
    return (react_1.default.createElement("html", null,
        react_1.default.createElement("head", null,
            react_1.default.createElement("title", null, "matcha")),
        react_1.default.createElement("script", null,
            "window.__LOCATION__ = '$",
            encodeURIComponent(JSON.stringify(context.location)),
            "' window.__PREFETCH__ = '$",
            encodeURIComponent(JSON.stringify(context.prefetch)),
            "'"),
        react_1.default.createElement("body", null,
            react_1.default.createElement("div", { id: "matcha-app-root" },
                "$",
                content),
            react_1.default.createElement("script", { src: assets.main }),
            react_1.default.createElement("script", { src: assets.vendor }))));
};
exports.default = Layout;
//# sourceMappingURL=layout.js.map