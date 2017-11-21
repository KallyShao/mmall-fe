/*
* @Author: Administrator
* @Date:   2017-11-20 21:16:00
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-21 11:24:29
*/

'use strict';

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
    //统一登录
    doLogin: function(){
    	window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};
module.exports = _mm;