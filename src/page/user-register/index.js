/*
* @Author: Administrator
* @Date:   2017-11-28 16:08:22
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-23 17:30:00
*/

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');


var formError = {
	show: function(msg){
		$('.user-con .error-item').show().find('.err-msg').text(msg);
	},
	hide: function(){
		$('.user-con .error-item').hide();
	}
};

var page = {
	init: function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		//用户名输入框失去焦点时检查用户名是否已存在
		$('#username').blur(function(){
			var username = $.trim($(this).val());	//一定要记得去空格！

			if(_mm.validate(username, 'require')){	//只有在username有内容时才做验证
				_user.checkRegister(username, function(res){
						formError.hide();
					}, function(errMsg){
						formError.show(errMsg);
					})
			}

		});
		//提交注册信息
		$('#submit').click(function(){
			var userInfo = {
				username: $('#username').val(),
				password: $('#password').val(),
				passConfirm: $('#password-confirm').val(),
				phoneNum: $('#phone').val(),
				email: $('#email').val(),
				question: $('#question').val(),
				answer: $('#answer').val()
			},
			validateResult = _this.validateFormData(userInfo);
			console.log(_this.validateFormData(userInfo));

			if(validateResult.status){
				_user.register(userInfo, function(res){
					formError.hide();
					window.location.href = './result.html?type=register';
				}, function(errMsg){
					formError.show(errMsg);
				})
			}
		})
	},
	validateFormData: function(data){
		var result = {
			msg: '',
			status: false
		};
		if(!_mm.validate(data.username, 'require')){
			result.msg = '用户名不能为空!'
			return result;
		}
		if(data.password.length <6){
			result.msg = '密码长度不能少于6位!'
			return result;
		}
		if(data.password !== data.passConfirm){
			result.msg = '两次输入的密码必须一致!'
			return result;
		}
		if(!_mm.validate(data.phoneNum, 'phone')){
			result.msg = '手机号码格式不正确!'
			return result;
		}
		if(!_mm.validate(data.email, 'email')){
			result.msg = '邮箱地址格式不正确!'
			return result;
		}
		if(!_mm.validate(data.question, 'require')){
			result.msg = '密码提示问题不能为空!'
			return result;
		}
		if(!_mm.validate(data.answer, 'require')){
			result.msg = '密码提示问题答案不能为空!'
			return result;
		}
		result = {
			msg: '验证通过！',
			status: true
		}
		return result;
	}
};

$(function(){
	page.init();
});