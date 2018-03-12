/*
* @Author: Administrator
* @Date:   2017-11-15 11:15:47
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-30 14:37:51
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');

var _mm = require('util/mm.js');
var navSide = require('page/common/nav-side/index.js');

var templateIndex = require('./banner.string');


//初始化slider
$(function() {
  //渲染banner的html
	var html = _mm.renderHtml(templateIndex);
	$('.banner-con').html(html);
  //初始化banner
    var $slider = $('.banner').unslider({
    	dots: true
    });
    // var unslider = $('.banner').unslider();

  $('.banner-con .banner-arrow').click(function() {
    var forward = $(this).hasClass('prev') ? 'prev' : 'next'; //判断方向，下面的方法是一样的
    $slider.data('unslider')[forward]();
  });

});
