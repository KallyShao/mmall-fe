/*
 * @Author: Administrator
 * @Date:   2017-11-23 17:22:38
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-03 21:17:57
 */

require('./index.css');
var _mm = require('util/mm.js');

//通用页面头部
var header = {
    init: function() {
        this.bindEvent();
    },
    //搜索关键字的回填
    onLoad: function() { //??什么时候调用？
        var keyword = _mm.getUrlParam('keyword');
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },
    bindEvent: function() {
        var _this = this;
        //点击搜索按钮，做搜索提交
        $('#search-btn').click(function() {
            _this.searchSubmit();
        });
        //按回车键，做搜索提交
        $('#search-input').keyup(function(e) {
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    //搜索的提交
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        //如果提交的时候有keyword，正常跳转到list页
        if (keyword) {
            window.location.href = './product-list.html?keyword=' + keyword;
        }
        //如果提交的时候没有keyword,返回首页
        else {
            _mm.goHome();
        }
    }
}
header.init();