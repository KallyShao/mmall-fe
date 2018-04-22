/*
 * @Author: Administrator
 * @Date:   2017-11-25 19:34:58
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-22 15:45:36
 */
require('./index.css');
var _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');

$(function() {
    var type = _mm.getUrlParam('type') || 'default';
    var $ele = $('.' + type + '-success');
    if (type === 'payment') {
        var orderNo = _mm.getUrlParam('orderNumber'),
            $orderNo = $ele.find('.order-number');
        $orderNo.attr('href', $orderNo.attr('href') + orderNo);

    }
    //显示对应的提示元素
    $ele.show();
})