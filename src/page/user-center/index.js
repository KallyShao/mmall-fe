/*
* @Author: Administrator
* @Date:   2017-12-26 21:21:52
* @Last Modified by:   Administrator
* @Last Modified time: 2017-12-26 22:35:04
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    init: function(){
        _navSide.init({name: 'user-center'});
        this.onLoad();
    },
    onLoad: function(){
        _user.getInformation(function(res){
            console.log(res);
            var html = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(html);
        }, function(errMsg){

        })
    }
};

$(function(){
    page.init();
})