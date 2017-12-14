'use strict';

const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin  = require('webpack-livereload-plugin');
const CopyWebpackPlugin  = require('copy-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('styles/bundle.css');


module.exports = (options) => {
  const dest = Path.join(__dirname, 'dist');

  let webpackConfig = {
    devtool: options.devtool,
    entry: [
      './src/scripts/index'
    ],
    output: {
      path: dest,
      filename: 'bundle.js'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: options.isProduction && {
          collapseWhitespace: true,
          conservativeCollapse: true,
          decodeEntities: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true
        }
      }),
      new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' }
      ])
    ],
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      }],
      loaders: [
        {
          test: /imagesloaded/,
          loader: 'imports?define=>false&this=>window'
        },
        {
          test: /\.jpeg$/,
          loader: "file-loader"
        }
      ]
    }
    };

  if (options.isProduction) {
    webpackConfig.entry = ['./src/scripts/index'];

    webpackConfig.plugins.push(
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      ExtractSASS
    );

    webpackConfig.module.rules.push({
      test: /\.s?css/i,
      use: ExtractSASS.extract(['css-loader?sourceMap=true&minimize=true', 'sass-loader'])
    });

  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );
    webpackConfig.plugins.push(
      new LiveReloadPlugin({appendScriptTag: true})
    );

    webpackConfig.module.rules.push({
      test: /\.s?css$/i,
      use: ['style-loader', 'css-loader?sourceMap=true', 'sass-loader']
    }, {
      test: /\.js$/,
      use: 'eslint-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }
    );

    webpackConfig.devServer = {
      contentBase: dest,
      hot: true,
      port: options.port,
      inline: true
    };
  }

  return webpackConfig;

};
