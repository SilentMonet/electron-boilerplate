const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const extractSass = new ExtractTextPlugin({
    filename: "[name]__[local].css",
    disable: process.env.NODE_ENV === "development",
});

module.exports = [
    {
        mode: "development",
        entry: "./electron.ts",
        target: "electron-main",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /src/,
                    use: [{ loader: "ts-loader" }],
                },
            ],
        },
        output: {
            path: __dirname + "/dist",
            filename: "electron.js",
        },
    },
    {
        mode: "development",
        entry: "./src/App.tsx",
        target: "electron-renderer",
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    include: /src/,
                    use: [{ loader: "ts-loader" }],
                },
                {
                    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                                name: "[path][name]_[hash:4].[ext]",
                            },
                        },
                    ],
                },
                {
                    test: /\.scss$/,
                    use: extractSass.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                            },
                            {
                                loader: "sass-loader",
                                options: { sourceMap: true },
                            },
                        ],
                    }),
                },
                {
                    test: /\.module.scss$/,
                    use: extractSass.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true,
                                    modules: {
                                        mode: "local",
                                        localIdentName:
                                            "[path][name]__[local]--[hash:base64:4]",
                                        context: path.resolve(__dirname, "src"),
                                    },
                                },
                            },
                            {
                                loader: "sass-loader",
                                options: { sourceMap: true },
                            },
                        ],
                    }),
                },
            ],
        },
        output: {
            path: __dirname + "/dist",
            filename: "app.js",
        },
        resolve: {
            extensions: [".tsx", ".jsx", ".ts", ".js", ".json"],
            alias: {
                "@assets": path.resolve(__dirname, "assets"),
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            extractSass,
        ],
    },
];
