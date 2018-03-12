/*
 * @Author: Administrator
 * @Date:   2017-12-26 22:36:22
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-02-04 12:21:35
 */

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init: function() {
        _navSide.init({
            name: 'user-center'
        });
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        _user.getInformation(function(res) {
            console.log(res);
            var html = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(html);
        }, function(errMsg) {
            // console.log(errMsg);
            _mm.errorTips('哪里出错了，请刷新试试~~');
        })
    },
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.btn-submit', function() {
            var userInfo = {
                phone: $.trim($('.phone').val()),
                email: $.trim($('.email').val()),
                question: $.trim($('.question').val()),
                answer: $.trim($('.answer').val())
            };
            var validateRes = _this.formDataValidate(userInfo);
            if (validateRes.status) {
                _user.updateUserInfo(userInfo, function(res) {
                    console.log(res);
                    // _mm.successTips('个人信息修改成功！');
                    window.location.href = './result.html?type=default';
                }, function(err) {
                    console.log(err);
                })
            } else {
                _mm.errorTips(validateRes.msg);
            }
        });
    },
    formDataValidate: function(data) {
        var result = {
            msg: '',
            status: false
        };
        if (!_mm.validate(data.phone, 'phone')) {
            result.msg = '手机号码格式不正确!'
            return result;
        }
        if (!_mm.validate(data.email, 'email')) {
            result.msg = '邮箱地址格式不正确!'
            return result;
        }
        if (!_mm.validate(data.question, 'require')) {
            result.msg = '密码提示问题不能为空!'
            return result;
        }
        if (!_mm.validate(data.answer, 'require')) {
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

$(function() {
    page.init();
})