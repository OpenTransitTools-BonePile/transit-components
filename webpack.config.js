const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    './map/index.js',
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: 'localhost',
    contentBase: "./dist"
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Simple Map',
      template: './common/templates/simple.html',
      filename: './index.html',
      inject: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              retainLines: true,
              presets: ['env', 'react']
            }
          }
        ]
      },
      {
        test: /\.(html|htm)?$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};
