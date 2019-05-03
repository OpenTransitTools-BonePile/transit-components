const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// NOTE: nice webpack tutorial at https://madewithlove.be/webpack-your-bags/

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    './lib/map/index.js',
  ],
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
      template: './lib/common/templates/simple.html',
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
              presets: ['env', 'react', 'stage-2']
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
      },
      {
        test: /\.png$/,
        use: 'url-loader?limit=100000'
      },
      {
        test: /\.jpg$/,
        use: 'file-loader'
      },
      {
        test: /\.gif$/,
        use: 'url-loader'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=webpack-assets/[name]/[hash].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=webpack-assets/[name]/[hash].[ext]'
      },
      {
        test: /\.(ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=webpack-assets/[name]/[hash].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff&name=webpack-assets/[name]/[hash].[ext]'
      }
    ]
  }
};
