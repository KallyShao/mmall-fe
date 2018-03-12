/*
 * @Author: Administrator
 * @Date:   2017-12-19 17:02:36
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-02-04 17:05:18
 */

var _mm = require('util/mm.js');
var _product = {
    //加载产品列表
    getProductList: function(productInfo, resolve, reject) {
        _mm.request({
            url: '/product/list.do',
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    //产品详情
    getProductDetail: function(productId, resolve, reject) {
        _mm.request({
            url: '/product/detail.do',
            data: productId,
            success: resolve,
            error: reject
        });
    }
};

module.exports = _product;