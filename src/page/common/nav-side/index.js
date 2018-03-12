/*
 * @Author: Administrator
 * @Date:   2017-11-25 17:13:53
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-02-04 12:10:14
 */

require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

//侧边导航
var navSide = {
    option: {
        name: '',
        navList: [
            //下面的name是为了匹配选中状态，与外面传进来的name进行对比，如果是一致的，就将该项置为active
            {
                name: 'user-center',
                href: './user-center.html',
                desc: '个人中心'
            }, {
                name: 'order-list',
                href: './order-list.html',
                desc: '我的订单'
            }, {
                name: 'user-pass-update',
                href: './user-pass-update.html',
                desc: '修改密码'
            }, {
                name: 'about',
                href: './about.html',
                desc: '关于MMall'
            }
        ]
    },
    init: function(option) {
        $.extend(this.option, option); //合并选项
        this.renderNav();
    },
    //渲染导航菜单
    renderNav: function() {
        //计算active数据
        var iLength = this.option.navList.length;
        for (var i = 0; i < iLength; i++) {
            if (this.option.name === this.option.navList[i].name) {
                this.option.navList[i].isActive = true;
            }
        };
        //渲染list数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        });
        //将渲染好的模板放入容器中
        $('.nav-side').html(navHtml);
    }
}

module.exports = navSide;