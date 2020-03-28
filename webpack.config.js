const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpackMerge = require("webpack-merge");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const loadModeConfig = env => require(`./build-utils/${env.mode}.config`)(env);

module.exports = env =>
  webpackMerge(
    {
      context: path.resolve(__dirname, "src"),
      mode: env.mode,
      entry: "./index.js",
      output: {
        filename: "index_bundle.js",
        path: path.resolve(__dirname, "dist")
      },

      module: {
        rules: [
          {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[path]/[name].[ext]",
                  limit: 5000
                }
              },
              {
                loader: "image-webpack-loader",
                options: {
                  mozjpeg: {
                    progressive: true,
                    quality: 80
                  },
                  optipng: {
                    enabled: false
                  },
                  pngquant: {
                    quality: [0.65, 0.9],
                    speed: 4
                  },
                  gifsicle: {
                    interlaced: false
                  },
                  webp: {
                    quality: 75
                  }
                }
              }
            ]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"]
          },
          {
            test: /\.html$/i,
            loader: ["html-loader"]
          },
          { test: /\.hbs$/, loader: "handlebars-loader" }
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new ProgressBarPlugin()
      ]
    },
    loadModeConfig(env)
  );
