/*
 * @Author: candyxli 
 * @Date: 2019-01-25 13:42:56 
 * @Last Modified by: candyxli
 * @Last Modified time: 2019-01-28 17:49:50
 */
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const utils = require('./utils')

const rootDir = path.resolve(__dirname, '..')
module.exports = {
	entry: {
    background: path.join(__dirname, './src/background/index.js'),
    index: path.join(__dirname, './src/frontEnd/main-page/main-page.js'),
    popup: path.join(__dirname, './src/frontEnd/popup/popup.js')
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
      '@component': path.join(__dirname, './src/frontEnd/components')
    }
  },
	module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)(\?.*)?$/,
        use: ['file-loader?name=img/[sha512:hash:base64:8]_[name].[ext]']
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?.*)?$/,
        use: ['file-loader?name=font/[name].[hash:8].[ext]']
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: ['file-loader?name=media/[name].[hash:8].[ext]']
      },
      {
        test: /\.less$/,
        use: ['style-loader','css-loader','less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.js$/,
        use: ['eslint-loader']
      }
    ]
	},
	plugins: [
    new CleanWebpackPlugin(['*'], {
      root: path.join(rootDir, 'dist')
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, './src/asset'),
        to: path.join(__dirname, './dist/asset')
      },
      {
        from: path.join(__dirname, './src/manifest.json'),
        to: path.join(__dirname, './dist/manifest.json')
      }
    ]),
    new VueLoaderPlugin(),
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

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}