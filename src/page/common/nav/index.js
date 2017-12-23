/*
* @Author: Administrator
* @Date:   2017-11-23 11:00:14
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-23 11:53:18
*/

require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

//导航
var nav = {
	init: function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent: function(){
		//登录点击事件
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		//注册点击事件
		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		});
		//登出
		$('.js-logout').click(function(){
			_user.logout(function(res){	//退出成功时根据不同的页面做响应处理，如果是订单页，直接刷新页面
				window.location.reload();
			}, function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	//加载用户信息
	loadUserInfo: function(){
		_user.checkLogin(function(res){
			$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
		}, function(errMsg){
			//do nothing
		})
	},
	//加载购物车数量
	loadCartCount: function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res || 0);
		}, function(errMsg){
			$('.nav .cart-count').text(0);	//如果出错，购物车默认数量为0
		})
	}
};

module.exports = nav.init();