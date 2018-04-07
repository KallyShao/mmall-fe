/*
 * @Author: Administrator
 * @Date:   2018-01-04 22:55:21
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-07 21:23:07
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var _cart = require('service/cart-service.js');
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
        //如果没有传produtId,自动跳回首页
        if (!this.data.productId) {
            _mm.goHome();
            return;
        }
        var _this = this,
            html = '';
        _product.getProductDetail({
            productId: _this.data.productId
        }, function(res) {
            _this.dataFilter(res);
            html = _mm.renderHtml(templateIndex, res);
            $('.page-wrap').html(html);
        }, function(err) {
            $('.page-wrap').html('<p class="err-tip">该商品去火星了~</p>');
        });
    },
    bindEvent: function() {
        var _this = this;
        //图片预览
        $(document).on('mouseenter', '.p-img-item', function() {
            var imgSrc = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src', imgSrc);
        });
        //修改数量
        $(document).on('click', '.p-count-btn', function() {
            var type = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount = $('.p-count'),
                currCount = parseInt($pCount.val()),
                minCount = 1,
                maxCount = parseInt($('.stock').text()) || 1;
            if (type === 'plus') {
                $pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
            } else if (type === 'minus') {
                $pCount.val(currCount > minCount ? currCount - 1 : minCount);
            }
        });
        //加入购物车
        $(document).on('click', '.cart-add', function() {
            var stock = parseInt($('.stock').text());
            if (stock <= 0) {
                _mm.errorTips('该商品库存为0！');
                return;
            }
            _cart.addToCart({
                productId: _this.data.productId,
                count: $('.p-count').val()
            }, function(res) {
                _mm.successTips('商品添加成功！');
            }, function(errMsg) {
                _mm.errorTips(errMsg);
            });
        });
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
        $.each(data.subImages, function(index, value) {
            // data.subImages[index] = '/mm/' + data.subImages[index];
            value = '/mm/' + value;
        })
    }
};

$(function() {
    page.init();
});