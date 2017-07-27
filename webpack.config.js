const path = require('path');
const webpack = require('webpack');

const plugins = [];

plugins.push(
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  })
);

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      },
      output: {
        comments: false
      }
    })
  );
}

module.exports = {
  entry: ['babel-polyfill', './src/index'],
  devtool: 'source-map',
  target: 'web',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/',
  },

  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1, modules: true } },
          'postcss-loader'
        ]
      }, {
        test: /\.txt$/,
        loader: 'raw-loader'
      },
    ]
  },

  resolve: {
    modules: [
      'node_modules'
    ],

    extensions: ['.js']
  }
};
