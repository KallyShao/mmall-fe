/*
 * @Author: Administrator
 * @Date:   2018-04-12 21:40:03
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-16 22:21:40
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _addr = require('service/addr-service.js');
var _order = require('service/order-service.js');
var templateProduct = require('./product-list.string');
var templateAddr = require('./address-list.string');

var page = {
    data: {
        selectedAddrId: null
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.loadAddrList();
        this.loadProductList();
    },
    bindEvent: function() {
        var _this = this;
        //地址的选择
        $(document).on('click', '.address-item', function() {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddrId = $(this).data('id');
        });
        //订单提交
        $(document).on('click', '.order-submit', function() {
            var shippingId = _this.data.selectedAddrId;
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function(res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            } else {
                _mm.errorTips('请选择地址后再提交');
            }
        });
    },
    loadAddrList: function() {
        _addr.getAddrList(function(res) {
            var addrListHtml = _mm.renderHtml(templateAddr, res);
            $('.address-con').html(addrListHtml);
        }, function(errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        });
    },
    loadProductList: function() {
        _order.getProductList(function(res) {
            var proListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(proListHtml);
        }, function(errMsg) {
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        });
    }
};


module.exports = page.init();