/*
* @Author: Administrator
* @Date:   2017-11-25 23:13:40
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-26 19:07:35
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formError = {
    show: function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        //点击登录按钮提交
        $('#submit').click(function(){
            _this.loginSubmit();
        });
        //按回车键提交
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                 _this.loginSubmit();
            }
        })
    },
    //表单信息的验证
    formValidate: function(data){
       var result = {
            status: false,
            msg: ''
       };
        if(!_mm.validate(data.username, 'require')){
            result.msg = '用户名不能为空!';
            return result;  //注意这里必须要return，否则会继续往下执行
        }
        if(!_mm.validate(data.password, 'require')){
             result.msg = '密码不能为空!';
             return result;
        }
        result = {
            status: true,
            msg: '验证通过！'
        }
        return result;
    },
    //表单提交
    loginSubmit: function(){
        var data = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        var result = this.formValidate(data);
        console.log(result.msg);

        if(result.status){
            _user.login(data, function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            })
        }
        //验证失败
        else{
            // 错误提示
            formError.show(result.msg);
        }
    }
};
$(function(){
    page.init();
})