/*
 * @Author: Administrator
 * @Date:   2018-04-07 22:42:26
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-09 22:51:41
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/nav-simple/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {},
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadCart();
    },
    bindEvent: function() {
        var _this = this;
        //商品的选择和取消选择
        $(document).on('click', '.cart-select', function() {
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            //切换选中状态
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function(res) {
                    _this.renderCart();
                }, function(errMsg) {
                    _this.showError();
                });
            } else {
                _cart.unselectProduct(productId, function(res) {
                    _this.renderCart();
                }, function(errMsg) {
                    _this.showError();
                });
            }
        });
        //商品的全选和取消全选
        $(document).on('click', '.cart-select-all', function() {
            var $this = $(this);
            //切换选中状态
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function(res) {
                    _this.renderCart();
                }, function(errMsg) {
                    _this.showError();
                });
            } else {
                _cart.unselectAllProduct(function(res) {
                    _this.renderCart();
                }, function(errMsg) {
                    _this.showError();
                });
            }
        });
    },
    loadCart: function() {
        var _this = this;
        _cart.getCartList(function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showError();
        });
    },
    renderCart: function(data) {
        this.dataFilter(data);
        this.data.cartInfo = data;
        var cartHtml = _mm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
    },
    dataFilter: function(data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showError: function() {
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新试试吧~</p>');
    }
};

$(function() {
    page.init();
});