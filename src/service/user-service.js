/*
 * @Author: Administrator
 * @Date:   2017-11-23 13:23:44
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-02-04 12:20:54
 */

var _mm = require('util/mm.js');
var _user = {
	//登录
	login: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/login.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		})
	},
	//登出
	logout: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/logout.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	//检查登录状态
	checkLogin: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/get_user_info.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	//注册时检查用户名是否已存在
	checkRegister: function(username, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/check_valid.do'),
			method: 'POST',
			data: {
				type: 'username',
				str: username
			},
			success: resolve,
			error: reject
		})
	},
	//注册
	register: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/register.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		})
	},
	//获取密码提示问题
	getPassTipQuestion: function(username, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_get_question.do'),
			method: 'POST',
			data: {
				username: username
			},
			success: resolve,
			error: reject
		})
	},
	//验证密码提示问题的答案
	forgetCheckAnswer: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_check_answer.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		})
	},
	//忘记密码的重设密码 /user/forget_reset_password.do
	forgetResetPass: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/forget_reset_password.do'),
			method: 'POST',
			data: userInfo,
			success: resolve,
			error: reject
		})
	},
	//获取登录用户信息,status 0 & 10
	getInformation: function(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/get_information.do'),
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	//登录状态下修改密码
	userPassUpdate: function(passInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/reset_password.do'),
			data: passInfo,
			method: 'POST',
			success: resolve,
			error: reject
		})
	},
	//修改用户资料
	updateUserInfo: function(userInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/user/update_information.do'),
			data: userInfo,
			method: 'POST',
			success: resolve,
			error: reject
		})
	}

}
module.exports = _user;