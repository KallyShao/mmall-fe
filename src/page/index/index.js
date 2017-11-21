/*
* @Author: Administrator
* @Date:   2017-11-15 11:15:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-21 13:20:00
*/

'use strict';
var _mm = require('util/mm.js');

_mm.request({
	url: '/product/list.do?keyword=1',
	success: function(res){
		console.log(res);
	},
	error: function(err){
		console.log(err);
	}
});