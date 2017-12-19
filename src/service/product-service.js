/*
* @Author: Administrator
* @Date:   2017-12-19 17:02:36
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-19 17:24:52
*/

var _mm = require('util/mm.js');
var _product = {
	//加载产品列表
	getProductList: function(productInfo, resolve, reject){
		_mm.request({
			url: '/product/list.do',
			data: productInfo,
			success: resolve,
			error: reject
		});
	}
};

module.exports = _product;