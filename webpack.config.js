/*
* @Author: Administrator
* @Date:   2017-11-15 15:37:16
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-15 15:45:27
*/

var config =  {
     entry: {
     	'index': ['./src/page/index/index.js'],
     	'login': ['./src/page/login/login.js']
     },
     output: {
         path: './dist',
         filename: 'js/[name].js'
     }
 };
 module.exports = config;