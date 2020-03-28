const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");


module.exports = env => ({
  devtool: "eval-cheap-source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./index.html",
      filename: "index.html"
    })
   
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    port: 4040,
    noInfo: true,
    quiet: true,
    clientLogLevel: "warning",
    stats: "errors-only",
    open: true
  }
});
