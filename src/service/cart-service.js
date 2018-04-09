/*
 * @Author: Administrator
 * @Date:   2017-11-23 14:09:53
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-09 22:43:39
 */

var _mm = require('util/mm.js');
var _cart = {
    //获取购物车物品数量
    getCartCount: function(resolve, reject) {
        _mm.request({
            url: '/cart/get_cart_product_count.do',
            success: resolve,
            error: reject
        });
    },
    addToCart: function(prodcutInfo, resolve, reject) {
        _mm.request({
            url: '/cart/add.do',
            data: prodcutInfo,
            success: resolve,
            error: reject
        });
    },
    getCartList: function(resolve, reject) {
        _mm.request({
            url: '/cart/list.do',
            success: resolve,
            error: reject
        });
    },
    // 选择购物车商品
    selectProduct: function(productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 取消选择购物车商品
    unselectProduct: function(productId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 选中全部商品
    selectAllProduct: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 取消选中全部商品
    unselectAllProduct: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
};

module.exports = _cart;