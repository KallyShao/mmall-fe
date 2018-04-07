/*
 * @Author: Administrator
 * @Date:   2017-11-23 14:09:53
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-07 21:05:58
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
    }
};

module.exports = _cart;