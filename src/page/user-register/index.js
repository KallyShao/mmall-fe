/*
* @Author: Administrator
* @Date:   2017-11-28 16:08:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-28 17:06:24
*/

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		$('#username').blur(function(){
			var username = $.trim($(this).val());	//一定要记得去空格！
			_mm.validate(val, 'require');
		});
	}
};

$(function(){
	page.init();
});