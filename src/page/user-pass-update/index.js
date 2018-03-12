/*
 * @Author: Administrator
 * @Date:   2017-12-30 14:59:30
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-02-04 12:14:35
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page = {
    init: function() {
        _navSide.init({
            name: 'user-pass-update'
        });
        this.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        $('#submit').click(function() {
            var passInfo = {
                passwordOld: $.trim($('#password').val()),
                passwordNew: $.trim($('#new-password').val()),
                passwordConfirm: $.trim($('#confirm-password').val())
            };
            var validateRes = _this.formDataValidate(passInfo);
            if (validateRes.status) {
                _user.userPassUpdate({
                    passwordOld: passInfo.passwordOld,
                    passwordNew: passInfo.passwordNew
                }, function(res) {
                    console.log(res);
                    _mm.successTips('密码修改成功!');
                    window.location.href = './user-center.html';
                }, function(errMsg) {
                    console.log(errMsg);
                    _mm.errorTips(errMsg);
                })
            } else {
                _mm.errorTips(validateRes.msg);
            }
        })
    },
    formDataValidate: function(data) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(data.passwordOld, 'require')) {
            result.msg = '原密码不能为空！'
            return result;
        }
        //防止passwordNew为undefind或null的时候，passwordNew.length报错；这样写的话
        //只有在passwordNew有值的时候才会去判断后面的长度
        if (!data.passwordNew || data.passwordNew.length < 6) {
            result.msg = '新密码的长度不能少于6位！'
            return result;
        }
        if (data.passwordNew !== data.passwordConfirm) {
            result.msg = '两次输入的密码不一致！'
            return result;
        }
        result = {
            status: true,
            msg: '验证通过'
        }
        return result;
    }
};

$(function() {
    page.init();
})