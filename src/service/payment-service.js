/*
 * @Author: Administrator
 * @Date:   2018-04-22 13:59:05
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-22 15:15:33
 */

var _mm = require('util/mm.js');
var _product = {
    //获取支付二维码
    getPaymentCode: function(orderNo, resolve, reject) {
        _mm.request({
            url: '/order/pay.do',
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    },
    //查询订单支付状态
    checkPaymentStatus: function(orderNo, resolve, reject) {
        _mm.request({
            url: '/order/query_order_pay_status.do',
            data: {
                orderNo: orderNo
            },
            success: resolve,
            error: reject
        });
    },
};

module.exports = _product;