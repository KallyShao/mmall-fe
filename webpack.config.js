/*
* @Author: Administrator
* @Date:   2017-11-15 15:37:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-16 16:45:34
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//获取HtmlWebpackPlugin参数的方法
var getHtmlPlugin = function(name){
    return {
        template: './src/view/'+ name +'.html',    //html原始的模板
        filename: 'view/'+ name +'.html',    //目标文件的位置，以output中的path作为相对路径
        inject: true,
        hash: true,
        chunks: ['common', name] //需要打包的模块，对应的是entry中的js模块
    };
};

//webpack config
var config =  {
     entry: {
        'common': ['./src/page/common/common.js'],
     	'index': ['./src/page/index/index.js'],
     	'login': ['./src/page/login/login.js']
     },
     output: {
         path: './dist',
         filename: 'js/[name].js'
     },
     externals: {
        'jquery': 'window.jQuery'
     },
     plugins: [
        //独立通用模块到dist/js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', //对应入口中的common
            filename: 'js/base.js'   //输出的name
        }),
        //打包css到单独文件
        new ExtractTextPlugin("css/[name].css"),
        //处理html模板
        new HtmlWebpackPlugin(getHtmlPlugin('index')),
        new HtmlWebpackPlugin(getHtmlPlugin('login'))
     ],
    module: {  
        loaders: [  
            {  
                test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader")  
            },  
            {  
                test: /\.(gif|png|jpg)\??.*$/, loader: "url-loader"  
            }
        ]  
    }  
 };
 module.exports = config;