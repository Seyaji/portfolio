// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin")

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : "style-loader";

const config = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "public"),
    },
    // devtool:'source-map',
    devServer: {
        open: true,
        host: "localhost",
        port: 6060,
    },
    plugins: [
        // new CopyWebpackPlugin({
        //     patterns: [{ from: "src/img", to: path.resolve(__dirname, "/public/img") }],
        // }),
        new HtmlWebpackInlineSVGPlugin(),
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader"],
            },
            {
              test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
              type: "asset",
            },
            {
              test: /\.svg$/,
              loader: 'ts-loader',
            }
            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";

        config.plugins.push(new MiniCssExtractPlugin());

        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    } else {
        config.mode = "development";
    }
    return config;
};
