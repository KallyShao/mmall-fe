/*
 * @Author: Administrator
 * @Date:   2018-04-12 21:56:00
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-21 23:26:13
 */

var _mm = require('util/mm.js');
var _order = {
    //商品信息
    getProductList: function(resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        })
    },
    createOrder: function(shippingId, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/create.do'),
            data: shippingId,
            success: resolve,
            error: reject
        })
    },
    //订单列表
    getOrderList: function(listParam, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/order/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        })
    },
}
module.exports = _order;