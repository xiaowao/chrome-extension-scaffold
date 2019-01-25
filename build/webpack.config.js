/*
 * @Author: candyxli 
 * @Date: 2019-01-25 13:42:56 
 * @Last Modified by: candyxli
 * @Last Modified time: 2019-01-25 18:30:19
 */
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const utils = require('./utils')

const rootDir = path.resolve(__dirname, '..')

module.exports = {
	entry: {
    background: path.join(__dirname, './src/background/index.js'),
    index: path.join(__dirname, './src/frontEnd/mainPage/main.js'),
    popup: path.join(__dirname, './src/frontEnd/popup/main.js')
	},
	output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[name].js?[hash]'
  },
	resolve: {
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['.js', '.vue', '.json'],

    //模块别名定义，方便后续直接引用别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.join(__dirname, './src'),
      '@component': path.join(__dirname, './src/frontEnd/component')
    }
  },
	module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)(\?.*)?$/,
        loader: 'file-loader?name=img/[sha512:hash:base64:8]_[name].[ext]'
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader?name=font/[name].[hash:8].[ext]'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'file-loader?name=media/[name].[hash:8].[ext]'
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader'
      }
    ]
	},
	plugins: [
    new CleanWebpackPlugin(['*'], {
      root: path.join(rootDir, 'dist')
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, './src/static'),
        to: path.join(__dirname, './dist/static')
      },
      {
        from: path.join(__dirname, './src/manifest.json'),
        to: path.join(__dirname, './dist/manifest.json')
      }
    ]),
    utils.htmlPage('popup', 'popup', ['popup']),
    utils.htmlPage('index', 'index', ['index']),
    utils.htmlPage('background', 'background', ['background'])
  ],

  // 提供模式配置选项告诉webpack相应地使用其内置的优化
	mode: process.env.NODE_ENV,
	performance: {
    hints: false
  },
  
  // 控制source map的生成
	devtool: false,
}