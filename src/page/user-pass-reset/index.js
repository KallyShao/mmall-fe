/*
* @Author: Administrator
* @Date:   2017-11-28 22:02:48
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-24 16:10:09
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
    data: {},
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function(){
        $('.step-con.step-username').show();
    },
    bindEvent: function(){
        var _this = this;
        //输入用户名，获取用户的密码提示问题
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(!_mm.validate(username, 'require')){
                $('.error-item').show().find('.err-msg').text('用户名不能为空！')
                return;
            }
            _user.getPassTipQuestion(username, function(res){
                _this.data.username = username,
                _this.data.question = res;
                $('.error-item').hide();
                $('.step-con.step-username').hide().siblings('.step-question').show()
                .find('.question').text(res);
            }, function(errMsg){
                $('.error-item').show().find('.err-msg').text(errMsg);
            })
        });
        //提交用户密码提示问题的答案
        $('#submit-answer').click(function(){
            var question = $.trim($('.question').val()),
                answer   = $.trim($('#answer').val()),
                userInfo = {
                    username: _this.data.username,
                    question: _this.data.question,
                    answer  : answer
                };
            if(!_mm.validate(answer, 'require')){
                $('.error-item').show().find('.err-msg').text('密码提示问题答案不能为空！')
                return;
            }
            _user.forgetCheckAnswer(userInfo, function(res){
                _this.data.token = res;
                $('.error-item').hide();
                $('.step-con.step-question').hide().siblings('.step-password').show();
            }, function(errMsg){
                $('.error-item').show().find('.err-msg').text(errMsg);
            })
        });
        //输入新密码并提交
        $('#submit-password').click(function(){
            var passwordNew = $.trim($('#password').val()),
                userInfo    = {
                    username: _this.data.username,
                    passwordNew: passwordNew,
                    forgetToken: _this.data.token
                };
            if(passwordNew.length < 6){
                $('.error-item').show().find('.err-msg').text('新密码的长度不能小于6位！')
                return;
            }
            _user.forgetResetPass(userInfo, function(res, msg){
                $('.error-item').hide();
                _mm.successTips(msg);
                // window.location.herf = 
            }, function(errMsg){
                _mm.errorTips(errMsg);
            })
        });
    }
};

$(function(){
    page.init();
})