/*
 * @Author: Administrator
 * @Date:   2018-04-12 21:40:03
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-21 22:29:12
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _addr = require('service/addr-service.js');
var _order = require('service/order-service.js');
var templateProduct = require('./product-list.string');
var templateAddr = require('./address-list.string');
var addrModal = require('./address-modal.js');

var page = {
    data: {
        selectedAddrId: null
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
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
        //地址的添加
        $(document).on('click', '.address-add', function() {
            addrModal.show({
                isUpdate: false,
                onSuccess: function() {
                    _this.loadAddrList();
                }
            });
        });
        //地址的编辑
        $(document).on('click', '.address-update', function(e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _addr.getAddress(shippingId, function(res) {
                addrModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function() {
                        _this.loadAddrList();
                    }
                });
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            });
        });
        //地址的删除
        $(document).on('click', '.address-delete', function(e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if (window.confirm('确定要删除该地址？')) {
                _addr.deleteAddr(shippingId, function(res) {
                    _this.loadAddrList();
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    loadAddrList: function() {
        var _this = this;
        _addr.getAddrList(function(res) {
            _this.addrFilter(res);
            var addrListHtml = _mm.renderHtml(templateAddr, res);
            $('.address-con').html(addrListHtml);
        }, function(errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        });
    },
    addrFilter: function(data) {
        var _this = this;
        if (_this.data.selectedAddrId) {
            var selectedAddrIdFlag = false; //这个标记位是为了看在重新加载地址列表的时候，之前选中的地址是否还在地址列表中
            $.each(data.list, function(index, value) {
                if (data.list[index].id === _this.data.selectedAddrId) {
                    data.list[index].addrActive = true;
                    selectedAddrIdFlag = true;
                }
            });
            //如果之前选中的地址不在列表中，将data中保存的id删除
            if (!selectedAddrIdFlag) {
                _this.data.selectedAddrId = null;
            }
        }
    },
    loadProductList: function() {
        $('.product-con').html('<div class="loading"></div>');
        _order.getProductList(function(res) {
            var proListHtml = _mm.renderHtml(templateProduct, res);
            $('.product-con').html(proListHtml);
        }, function(errMsg) {
            $('.product-con').html('<p class="err-tip">商品信息加载失败，请刷新后重试</p>');
        });
    }
};


module.exports = page.init();