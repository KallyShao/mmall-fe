/*
* @Author: Administrator
* @Date:   2017-11-25 12:17:08
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-19 17:37:13
*/

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm = require('util/mm.js'); 
var templateIndex = require('./index.string');
var _product = require('service/product-service.js');

var page = {
	data: {
		keyword: _mm.getUrl
	},
	init: function(){
		this.loadProductList();
		this.bindEvent();
	},
	loadProductList: function(){
		var proListHtml = '',
			$pListCon = $('.p-list-con');

		_product.getProductList({
			keyword: _mm.getUrlParam('keyword'),
			categoryId: _mm.getUrlParam('categoryId')
		}, function(res){
			// console.log(res);
			var list = res.list;
			proListHtml = _mm.renderHtml(templateIndex, list);
			$pListCon.html(proListHtml);
		}, function(errMsg){
			console.log(errMsg);
		})
	},
	bindEvent: function(){

	}
};

$(function(){
	page.init();
})