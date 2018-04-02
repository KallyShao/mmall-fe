/*
 * @Author: Administrator
 * @Date:   2018-01-04 22:53:30
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-02 22:34:20
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
    data: {
        listParam: {
            categoryId: _mm.getUrlParam('categoryId') || '',
            keyword: _mm.getUrlParam('keyword') || '',
            orderBy: _mm.getUrlParam('orderBy') || 'default',
            pageNum: _mm.getUrlParam('pageNum') || 1,
            pageSize: _mm.getUrlParam('pageSize') || 20
        }
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadProductList();
    },
    loadProductList: function() {
        var _this = this,
            html = '',
            listParam = this.data.listParam,
            $pListCon = $('.p-list-con');

        console.log(999);
        return;

        $pListCon.html('<div class="loading"></div>');
        //删除参数中不必要的字段
        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
        //请求接口
        _product.getProductList(listParam, function(res) {
            html = _mm.renderHtml(templateIndex, {
                list: res.list
            });
            $pListCon.html(html);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(err) {
            console.log(err);
        })
    },
    //加载分页信息
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadProductList();
            }
        }));
    },
    bindEvent: function() {
        var _this = this;
        $('.sort-item').click(function() {
            //将this缓存起来，jq优化方式之一
            var $this = $(this);
            _this.data.listParam.pageNum = 1;

            if ($this.data('type') == 'default') {
                if ($this.hasClass('active')) {
                    return;
                }
                _this.data.orderBy = '';
                //如果没有active,则添加active类，并清除其他sort-item的active类
                $this.addClass('active').siblings().removeClass('active active-asc active-desc');
            } else if ($this.data('type') == 'price') {
                $this.addClass('active').siblings().removeClass('active');
                //这里直接通过是否有相应的class进行判断
                if (!($this.hasClass('active-desc'))) {
                    _this.data.orderBy = 'price_desc';
                    $this.removeClass('active-asc').addClass('active-desc');
                } else {
                    _this.data.orderBy = 'price_asc';
                    $this.removeClass('active-desc').addClass('active-asc');
                }
                // if (flag) {
                //     _this.data.orderBy = 'price_asc';
                //     $this.removeClass('active-desc').addClass('active-asc').siblings().removeClass('active');
                //     flag = false;
                // } else {
                //     _this.data.orderBy = 'price_desc';
                //     $this.removeClass('active-asc').addClass('active-desc').siblings().removeClass('active');
                //     flag = true;
                // }
            }
            _this.loadProductList(_this.data);
        });
    },

};

$(function() {
    page.init();
});