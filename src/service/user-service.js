/*
* @Author: Administrator
* @Date:   2017-11-23 13:23:44
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-23 14:20:02
*/

var _mm = require('util/mm.js');
var _user = {
	//登出
	logout: function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	//检查登录状态
	checkLogin: function(resolve, reject){
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	}
}
module.exports = _user;