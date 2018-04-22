/*
 * @Author: Administrator
 * @Date:   2018-04-22 13:23:38
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-22 15:40:28
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        orderNo: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.loadPaymentInfo();
    },
    loadPaymentInfo: function() {
        var _this = this,
            html = '',
            $con = $('.page-wrap');
        _payment.getPaymentCode(_this.data.orderNo, function(res) {
            console.log(res);
            html = _mm.renderHtml(templateIndex, res);
            $con.html(html);
            //监听订单状态
            _this.listenOrderStatus();
        }, function(errMsg) {
            $con.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    listenOrderStatus: function() {
        var _this = this;
        this.paymentTimer = window.setInterval(function() {
            _payment.checkPaymentStatus(_this.data.orderNumber, function(res) {
                if (res == true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNo;
                }
            });
        }, 5e3);
    }
};

$(function() {
    page.init();
});