/*
* @Author: Administrator
* @Date:   2017-11-25 19:34:58
* @Last Modified by:   Administrator
* @Last Modified time: 2017-11-25 21:40:57
*/
require('./index.css');
var _mm = require('util/mm.js');
require('page/common/nav-simple/index.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default';
    var $ele = $('.' + type + '-success');
    //显示对应的提示元素
    $ele.show();
    
})