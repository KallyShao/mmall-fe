/*
 * @Author: Administrator
 * @Date:   2018-01-04 22:55:21
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-02-04 17:56:44
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        productId: _mm.getUrlParam('productId') || ''
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        var _this = this,
            html = '';
        _product.getProductDetail({
            productId: _this.data.productId
        }, function(res) {
            console.log(res);
            _this.dataFilter(res);
            console.log(res);
            html = _mm.renderHtml(templateIndex, res);
            $('.page-wrap').html(html);
        }, function(err) {
            console.log(err);
        });
    },
    bindEvent: function() {

    },
    dataFilter: function(data) {
        //方式一
        // var subImages = data.subImages.split(',');
        // $.each(subImages, function(index, value) {
        //     // value = '/mm/' + value;
        //     subImages[index] = '/mm/' + subImages[index];
        // });
        // data.subImages = subImages;

        //方式二
        data.subImages = data.subImages.split(',');
        // console.log(data.subImages);

        $.each(data.subImages, function(index, value) {
            // data.subImages[index] = '/mm/' + data.subImages[index];
            console.log(value);
            value = '/mm/' + value;
        })
    }
};

$(function() {
    page.init();
});