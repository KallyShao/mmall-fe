/*
 * @Author: Administrator
 * @Date:   2018-04-07 22:43:14
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-21 23:54:33
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js');
var _navSide = require('page/common/nav-side/index.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
    data: {
        listParam: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function() {

        this.onLoad();
    },
    onLoad: function() {
        this.loadOrderList();
        _navSide.init({
            name: 'order-list'
        });
    },
    loadOrderList: function() {
        var _this = this,
            html = '',
            $listCon = $('.order-list-con');
        _order.getOrderList(_this.data.listParam, function(res) {
            html = _mm.renderHtml(templateIndex, res);
            $listCon.html(html);
            //分页
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                hasNextPage: res.hasNextPage,
                nextPage: res.nextPage,
                pageNum: res.pageNum,
                pages: res.pages
            });
        }, function(errMsg) {
            console.log(errMsg);
            $listCon.html('<p class="err-tip">订单加载失败，请刷新后重试</p>');

        });
    },
    //加载分页信息
    loadPagination: function(pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    },
    bindEvent: function() {
        var _this = this;

    },

};

$(function() {
    page.init();
});