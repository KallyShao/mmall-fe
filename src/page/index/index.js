/*
* @Author: Administrator
* @Date:   2017-11-15 11:15:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-22 15:32:20
*/

'use strict';
var _mm = require('util/mm.js');

var html = '<h1>{{data}}</h1>';
var data = {
    data: 'kally'
};
console.log(_mm.renderHtml(html, data));
