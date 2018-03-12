/*
 * @Author: Administrator
 * @Date:   2018-03-12 21:54:31
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-03-12 22:00:25
 */

require('./index.css');
var templatePagination = require('./index.string');

var Pagination = function() {
    this.defaultOption = {
        container: null,
        pageNum: 1,
        pageRange: 3,
        onSelectPage: null
    }
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
}