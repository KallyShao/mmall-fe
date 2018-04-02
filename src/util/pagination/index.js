/*
 * @Author: Administrator
 * @Date:   2018-03-12 21:54:31
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-02 22:19:59
 */

require('./index.css');
var templatePagination = require('./index.string');
var _mm = require('util/mm.js');

var Pagination = function() {
    var _this = this;
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    };
    //事件的处理
    $(document).on('click', '.pg-item', function() {
        var $this = $(this);
        //对active和disabled的按钮点击不做处理
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ?
            _this.option.onSelectPage($this.data('value')) : null;
    });
};

Pagination.prototype.render = function(userOption) {
    this.option = $.extend({}, this.defaultOption, userOption);
    //判断容器是否为合法的jq对象
    if (!(this.option.container instanceof jQuery)) {
        return;
    }
    //如果只有1页，不显示分页
    if (this.option.pages <= 1) {
        return;
    }
    this.option.container.html(this.getPaginationHtml());
};
//分页的html
Pagination.prototype.getPaginationHtml = function() {
    var html = '',
        option = this.option,
        pageArray = [],
        start = (option.pageNum - option.pageRange) > 0 ?
        (option.pageNum - option.pageRange) : 1,
        end = (option.pageNum + option.pageRange) > option.pages ?
        option.pages : (option.pageNum + option.pageRange);

    //上一页按钮的数据
    pageArray.push({
        name: '上一页',
        value: this.option.prePage,
        disabled: !this.option.hasPreviousPage
    });
    //数字按钮的处理
    for (var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active: (i === option.pageNum)
        });
    };
    //下一页按钮的数据
    pageArray.push({
        name: '下一页',
        value: this.option.nextPage,
        disabled: !this.option.hasNextPage
    });
    html = _mm.renderHtml(templatePagination, {
        pageArray: pageArray,
        pageNum: option.pageNum,
        pages: option.pages
    });
    return html;
};

module.exports = Pagination;