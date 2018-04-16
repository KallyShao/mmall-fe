/*
 * @Author: Administrator
 * @Date:   2018-04-16 21:45:28
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-16 21:55:55
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
};

module.exports = _addr;