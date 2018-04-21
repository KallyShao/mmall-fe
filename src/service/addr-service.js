/*
 * @Author: Administrator
 * @Date:   2018-04-16 21:45:28
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-18 22:30:35
 */

var _mm = require('util/mm.js');
var _addr = {
    //获取地址列表
    getAddrList: function(resolve, reject) {
        _mm.request({
            url: '/shipping/list.do',
            data: {
                pageSize: 50 //最多取50条地址
            },
            success: resolve,
            error: reject
        });
    },
    //保存地址
    saveAddr: function(addrInfo, resolve, reject) {
        _mm.request({
            url: '/shipping/add.do',
            data: addrInfo,
            success: resolve,
            error: reject
        });
    },
    update: function(addrInfo, resolve, reject) {
        _mm.request({
            url: '/shipping/update.do',
            data: addrInfo,
            success: resolve,
            error: reject
        });
    },
    deleteAddr: function(shippingId, resolve, reject) {
        _mm.request({
            url: '/shipping/del.do',
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    getAddress: function(shippingId, resolve, reject) {
        _mm.request({
            url: '/shipping/select.do',
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
};

module.exports = _addr;