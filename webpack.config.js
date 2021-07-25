const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  //  mode: 'production',
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",           
    path: path.resolve(__dirname, "./static")
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html"
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    contentBase: "./static",
    hot: true,
  },
  stats: {
    children: true,
  },
};