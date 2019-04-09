const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// NOTE: nice webpack tutorial at https://madewithlove.be/webpack-your-bags/

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    './map/index.js',
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
      template: './common/templates/simple.html',
      filename: './index.html',
      inject: true
    }),
  ],
  resolve: {
    extensions: ['.html', '.js', '.json', '.scss', '.css'],
    alias: {
      leaflet_fullscreen_css: path.join(__dirname, "/node_modules/leaflet-fullscreen/dist/leaflet.fullscreen.css"),
      leaflet_measure_css: path.join(__dirname, "/node_modules/leaflet.polylinemeasure/Leaflet.PolylineMeasure.css"),
      leaflet_locate_css: path.join(__dirname, "/node_modules/leaflet.locatecontrol/dist/L.Control.Locate.min.css"),

      leaflet_css: path.join(__dirname, "/node_modules/leaflet/dist/leaflet.css"),
      leaflet_marker: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-icon.png"),
      leaflet_marker_2x: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-icon-2x.png"),
      leaflet_marker_shadow: path.join(__dirname, "/node_modules/leaflet/dist/images/marker-shadow.png")
    }
  },
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
