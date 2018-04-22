/*
 * @Author: Administrator
 * @Date:   2017-11-15 15:37:16
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-22 22:33:55
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量的配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取HtmlWebpackPlugin参数的方法
var getHtmlPlugin = function(name, title) {
    return {
        template: './src/view/' + name + '.html', //html原始的模板
        filename: 'view/' + name + '.html', //目标文件的位置，以output中的path作为相对路径,也就是打包之后存放的路径和文件名
        favicon: './favicon.ico',
        title: title,
        inject: true, //自动添加js和css
        hash: true, //给css加版本号
        chunks: ['common', name] //需要打包的模块，对应的是entry中的js模块，也就是将对应的js文件引入页面中
    };
};

//webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'product-list': ['./src/page/product-list/index.js'],
        'product-detail': ['./src/page/product-detail/index.js'],
        'user-login': ['./src/page/user-login/index.js'],
        'user-register': ['./src/page/user-register/index.js'],
        'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
        'user-pass-update': ['./src/page/user-pass-update/index.js'], //修改密码
        'user-center': ['./src/page/user-center/index.js'], //用户中心
        'user-center-update': ['./src/page/user-center-update/index.js'], //修改资料
        'result': ['./src/page/result/index.js'],
        'cart-list': ['./src/page/cart-list/index.js'],
        'order-confirm': ['./src/page/order-confirm/index.js'],
        'order-list': ['./src/page/order-list/index.js'],
        'order-detail': ['./src/page/order-detail/index.js'],
        'payment': ['./src/page/payment/index.js']
    },
    output: {
        // path: './dist', //存放文件的路径，最终生成文件的目录
        path: __dirname + '/dist/', //webpack从2.x开始强制使用绝对路径
        // publicPath: '/dist/', //访问文件所用的路径
        publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.happymmall.com/mmall-fe/dist/', //如果是线上环境，将/dist/替换为存放静态资源的域名
        filename: 'js/[name].js'
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    plugins: [
        //独立通用模块到dist/js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', //对应入口中的common
            filename: 'js/base.js' //输出的name
        }),
        //打包css到单独文件
        new ExtractTextPlugin("css/[name].css"),
        //处理html模板
        new HtmlWebpackPlugin(getHtmlPlugin('index', '首页')),
        new HtmlWebpackPlugin(getHtmlPlugin('product-list', '产品列表')),
        new HtmlWebpackPlugin(getHtmlPlugin('product-detail', '产品详情')),
        new HtmlWebpackPlugin(getHtmlPlugin('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlPlugin('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlPlugin('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlPlugin('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHtmlPlugin('user-center', '用户中心')),
        new HtmlWebpackPlugin(getHtmlPlugin('user-center-update', '修改资料')),
        new HtmlWebpackPlugin(getHtmlPlugin('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlPlugin('cart-list', '购物车列表')),
        new HtmlWebpackPlugin(getHtmlPlugin('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlPlugin('order-list', '订单列表')),
        new HtmlWebpackPlugin(getHtmlPlugin('order-detail', '订单详情')),
        new HtmlWebpackPlugin(getHtmlPlugin('payment', '订单支付'))
    ],
    module: {
        loaders: [{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader") //样式的处理
            },
            //图片和字体文件的处理，字体文件放在node_modules中
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader?limit=100&name=resource/[name].[ext]"
            },
            //html模板
            {
                test: /\.string$/,
                loader: 'html-loader',
                query: {
                    minimize: true,
                    removeAttributeQuotes: false
                }
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

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;