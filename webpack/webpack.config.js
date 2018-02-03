const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const rootDir = path.resolve(`${__dirname}/..`);

const NODE_ENV = process.env.NODE_ENV || 'development';
const isProd = NODE_ENV === 'production';

const config = {
  cache: true,
  entry: {
    app: `${rootDir}/src/core/app.js`
  },
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  output: {
    filename: '[name].[hash].bundle.js',
    sourceMapFilename: '[file].map',
    path: `${rootDir}/dist`,
    publicPath: '/'
  },
  resolve: {
    modules: [`${rootDir}/src`, `${rootDir}/node_modules`]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader?cacheDirectory=true'
      },
      {
        test: /\.css$/,
        exclude: /(components\/ui\/ui\/src)/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('postcss-import')(), require('postcss-cssnext')()]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        include: /(components\/ui\/ui\/src)/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('postcss-import')(), require('postcss-cssnext')()]
            }
          }
        ]
      },
      { test: /\.(jpg|png|gif)$/, loader: 'file-loader' },
      { test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: getPlugins(),
  devServer: {
    contentBase: `${rootDir}/dist`,
    noInfo: false,
    hot: true,
    inline: true,
    historyApiFallback: true,
    proxy: {}
  }
};

module.exports = config;

function getPlugins() {
  const ret = [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${rootDir}/src/core/index.html`,
      inject: 'body' /* ,
      favicon: `${rootDir}/src/core/favicon.png` */
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ];

  if (isProd) {
    ret.push(
      new UglifyJsPlugin({
        test: /\.js$/,
        sourceMap: true,
        uglifyOptions: {
          ecma: 6,
          ie8: false,
          warnings: false,
          compress: true
        }
      })
    );
    ret.push(
      new ExtractTextPlugin({
        // id: 'styles.css', // looks like a bug
        filename: '[name].[contenthash].css'
      })
    );
  }

  return ret;
}
