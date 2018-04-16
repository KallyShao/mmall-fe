/*
 * @Author: Administrator
 * @Date:   2018-04-07 22:42:26
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-12 21:36:48
 */

require('./index.css');
require('page/common/nav-simple/index.js');
require('page/common/header/index.js');

var nav = require('page/common/nav/index.js');
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
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showError();
                });
            } else {
                _cart.unselectProduct(productId, function(res) {
                    _this.renderCart(res);
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
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showError();
                });
            } else {
                _cart.unselectAllProduct(function(res) {
                    _this.renderCart(res);
                }, function(errMsg) {
                    _this.showError();
                });
            }
        });
        //商品数量的变化
        $(document).on('click', '.count-btn', function() {
            var $this = $(this),
                $pCount = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount = 1,
                maxCount = parseInt($pCount.data('max')),
                newCount = 0;

            if (type === 'plus') {
                if (currCount >= maxCount) {
                    _mm.errorTips('该商品数量已达上限');
                    return;
                }
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if (currCount <= minCount) {
                    return;
                }
                newCount = currCount - 1;
            }

            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function(res) {
                _this.renderCart(res);
            }, function(errMsg) {
                _this.showError();
            });
        });
        //删除单个商品
        $(document).on('click', '.cart-delete', function() {
            if (window.confirm('确认要删除该商品？')) {
                var productId = $(this).parents('.cart-table')
                    .data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        //删除选中
        $(document).on('click', '.delete-con', function() {
            if (window.confirm('确认要删除选中商品？')) {
                var productIds = [],
                    $selectedItems = $('.cart-select:checked');
                for (var i = 0, iLen = $selectedItems.length; i < iLen; i++) {
                    productIds.push($($selectedItems[i]).parents('.cart-table').data('product-id'));
                }
                if (productIds.length) {
                    _this.deleteCartProduct(productIds.join(','));
                } else {
                    _mm.errorTips('您还没有选中商品');
                }
            }
        });
        //提交购物车
        $(document).on('click', '.btn-submit', function() {
            if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
                window.location.href = './order-confirm.html';
            } else {
                _mm.errorTips('请选择商品后再提交！');
            }
        });
    },
    loadCart: function() {
        var _this = this;
        _cart.getCartList(function(res) {
            _this.data.cartInfo = res;
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
        //通知导航的购物车更新数量
        nav.loadCartCount();
    },
    dataFilter: function(data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    showError: function() {
        $('.page-wrap').html('<p class="err-tip">哪里不对了，刷新试试吧~</p>');
    },
    //删除指定商品，支持批量，productId用,分割
    deleteCartProduct: function(productIds) {
        var _this = this;

        _cart.deleteProduct(productIds, function(res) {
            _this.renderCart(res);
        }, function(errMsg) {
            _this.showError();
        });
    }
};

$(function() {
    page.init();
});