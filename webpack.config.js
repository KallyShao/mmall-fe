/*
* @Author: Administrator
* @Date:   2017-11-15 15:37:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-25 23:23:14
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置，dev / online
var WEBPACK_ENV        = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取HtmlWebpackPlugin参数的方法
var getHtmlPlugin = function(name, title){
    return {
        template: './src/view/'+ name +'.html',    //html原始的模板
        filename: 'view/'+ name +'.html',    //目标文件的位置，以output中的path作为相对路径,也就是打包之后存放的路径和文件名
        title: title,
        inject: true,   //自动添加js和css
        hash: true, //给css加版本号
        chunks: ['common', name] //需要打包的模块，对应的是entry中的js模块，也就是将对应的js文件引入页面中
    };
};

//webpack config
var config =  {
     entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'list': ['./src/page/list/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'result': ['./src/page/result/index.js'],
     },
     output: {
         path: './dist',    //存放文件的路径，最终生成文件的目录
         publicPath: '/dist',    //访问文件所用的路径
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
        new HtmlWebpackPlugin(getHtmlPlugin('index', '首页')),
        new HtmlWebpackPlugin(getHtmlPlugin('list', '产品列表')),
        new HtmlWebpackPlugin(getHtmlPlugin('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlPlugin('result', '操作结果'))
     ],
    module: {  
        loaders: [  
            {  
                test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader")  //样式的处理
            },  
            {  
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: "url-loader?limit=100&name=resource/[name].[ext]"  
                //图片和字体文件的处理，字体文件放在node_modules中
            },
            {
                test: /\.string$/, loader: 'html-loader'
            }
        ]  
    },
    resolve: {
        alias: {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    } 
 };

 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 }
 module.exports = config;