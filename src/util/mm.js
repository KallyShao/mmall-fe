/*
* @Author: Administrator
* @Date:   2017-11-20 21:16:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-23 11:33:45
*/

'use strict';

var Hogan = require('hogan');
// var Hogan = require('hogan');
var conf = {
    serverHost : ''
};
var _mm = {
	//网络请求
    request: function(param){
    	var _this = this;
    	$.ajax({
    		type: param.method || 'get',
    		url: param.url || '',
    		dataType: param.type || 'json',
    		data: param.data || '',
    		success: function(res){
    			if(res.status === 0){	//请求成功
    				typeof param.success === 'function' && param.success(res.data, res.msg);
    			}else if(res.status === 10){	//没有登录状态，需要强制登录
	    			_this.doLogin();
    			}else if(res.status === 1){	//请求数据错误
    				typeof param.error === 'function' && param.error(res.msg);
    			}
    		},
    		error: function(err){	//请求失败了，404或503等。。
    			typeof param.error === 'function' && param.error(err.statusText);
    		}
    	});
    },
    //获取服务器地址
    getServerUrl: function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam: function(name){
        //如获取happymmall.com/product/list?keyword=xxx&page=1中的keyword, page的value
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板，之所以做单独封装是因为hogan需要编译和渲染两个步骤，这里将两步封装为一步
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
    //成功提示
    successTips: function(msg){
        alert(msg || '操作成功');
    },
    //错误提示
    errorTips: function(msg){
        alert(msg || '哪里不对了。。');
    },
    //字段的验证，支持否否为非空、手机、邮箱的判断
    validate: function(value, type){
        var value = $.trim(value);
        //非空验证
        if(type === 'require'){
            return !!value;
        }
        //手机验证
        if(type === 'phone'){
            return /^1\d{10}$/.test(value);
        }
         // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin: function(){
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //返回主页
    goHome: function(){
        window.location.href = './index.html';
    }
};
module.exports = _mm;