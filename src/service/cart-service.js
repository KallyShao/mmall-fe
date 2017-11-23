/*
* @Author: Administrator
* @Date:   2017-11-23 14:09:53
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-23 14:22:20
*/

var _mm = require('util/mm.js');
var _cart = {
	//获取购物车物品数量
	getCartCount: function(resolve, reject){
		_mm.request({
			url: '/cart/get_cart_product_count.do',
			success: resolve,
			error: reject
		});
	}
};

module.exports = _cart;