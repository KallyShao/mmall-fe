/*
 * @Author: Administrator
 * @Date:   2018-04-07 22:44:30
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-22 13:32:33
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _navSide = require('page/common/nav-side/index.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        orderNo: _mm.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        _navSide.init({
            name: 'order-list'
        });
        this.loadOrderDetail();
    },
    loadOrderDetail: function() {
        var _this = this,
            html = '',
            $detailCon = $('.content');
        _order.getOrderDetail({
            orderNo: _this.data.orderNo
        }, function(res) {
            _this.dataFilter(res);
            html = _mm.renderHtml(templateIndex, res);
            $detailCon.html(html);
        }, function(errMsg) {
            console.log(errMsg);
            $detailCon.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    dataFilter: function(data) {
        data.needPay = data.status == 10; //订单状态，提交了订单，但是未支付
        data.isCancelable = data.status == 10;
    },
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.order-cancel', function() {
            if (window.confirm('确定要取消该订单？')) {
                _order.orderCancel({
                    orderNo: _this.data.orderNo
                }, function(res) {
                    _mm.successTips('订单取消成功');
                    _this.loadOrderDetail();
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
        });
    }
};

$(function() {
    page.init();
});