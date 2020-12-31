"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServerWebpackConfig = exports.createClientWebpackConfig = void 0;
var path_1 = __importDefault(require("path"));
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var webpack_manifest_plugin_1 = require("webpack-manifest-plugin");
exports.createClientWebpackConfig = function (matchaConfig, isDevServer) {
    if (isDevServer === void 0) { isDevServer = false; }
    var webpackConfig = {};
    var routes = path_1.default.resolve(matchaConfig.root, matchaConfig.src);
    var target = 'web';
    var mode = matchaConfig.mode;
    var entry = path_1.default.resolve(__dirname, './client/start.js');
    var output = {
        libraryTarget: 'window',
        path: path_1.default.join(matchaConfig.root, matchaConfig.out, matchaConfig.staticPath),
        filename: 'js/index.js',
        chunkFilename: 'js/[name].[contenthash].js',
        publicPath: matchaConfig.staticPath
    };
    var rules = [
        { parser: { requireEnsure: false } },
        {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                    [
                        '@babel/preset-typescript',
                        { isTSX: true, allExtensions: true }
                    ]
                ],
                plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
            }
        }
    ];
    var resolve = {
        extensions: ['.js', '.jsx', '.json', '.mjs', '.ts', '.tsx'],
        alias: {
            '@routes': routes
        }
    };
    var module = { rules: rules };
    var plugins = [
        new clean_webpack_plugin_1.CleanWebpackPlugin(),
        new webpack_manifest_plugin_1.WebpackManifestPlugin({ useEntryKeys: true, publicPath: '' })
    ];
    var devtool = 'source-map';
    var devServer = {
        stats: 'verbose'
    };
    var optimization = {
        // Automatically split vendor and commons
        // https://twitter.com/wSokra/status/969633336732905474
        // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
        splitChunks: {
            chunks: 'all',
            name: 'vendor'
        },
        minimize: true
    };
    Object.assign(webpackConfig, {
        target: target,
        mode: mode,
        entry: entry,
        output: output,
        module: module,
        resolve: resolve,
        plugins: plugins,
        devServer: devServer,
        optimization: optimization,
        devtool: devtool,
        watch: !!isDevServer
    });
    return webpackConfig;
};
exports.createServerWebpackConfig = function (matchaConfig, isDevServer) {
    if (isDevServer === void 0) { isDevServer = false; }
    var webpackConfig = {};
    var routes = path_1.default.resolve(matchaConfig.root, matchaConfig.src);
    var target = 'node';
    var mode = matchaConfig.mode;
    var entry = routes;
    var output = {
        path: path_1.default.join(matchaConfig.root, matchaConfig.out, 'routes'),
        libraryTarget: 'commonjs2',
        filename: 'index.js',
        chunkFilename: '[name].[contenthash].js'
    };
    var rules = [
        { parser: { requireEnsure: false } },
        {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-react',
                    [
                        '@babel/preset-typescript',
                        { isTSX: true, allExtensions: true }
                    ]
                ],
                plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime']
            }
        }
    ];
    var resolve = {
        extensions: ['.js', '.jsx', '.json', '.mjs', '.ts', '.tsx'],
        alias: {
            '@routes': routes
        }
    };
    var module = { rules: rules };
    var plugins = [
        new clean_webpack_plugin_1.CleanWebpackPlugin(),
        new webpack_manifest_plugin_1.WebpackManifestPlugin({ useEntryKeys: true, publicPath: '' })
    ];
    var devServer = {
        stats: 'verbose'
    };
    var devtool = 'source-map';
    var optimization = {
        // Automatically split vendor and commons
        // https://twitter.com/wSokra/status/969633336732905474
        // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
        splitChunks: {
            chunks: 'all',
            name: 'vendor'
        },
        minimize: true
    };
    Object.assign(webpackConfig, {
        target: target,
        mode: mode,
        entry: entry,
        output: output,
        module: module,
        resolve: resolve,
        plugins: plugins,
        devServer: devServer,
        optimization: optimization,
        devtool: devtool,
        watch: !!isDevServer
    });
    return webpackConfig;
};
//# sourceMappingURL=webpack.js.map