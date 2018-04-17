/*
 * @Author: Administrator
 * @Date:   2018-04-17 20:23:13
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-04-17 22:19:22
 */
var _mm = require('util/mm.js');
var _addr = require('service/addr-service.js');
var _cities = require('util/cities/index.js');
var templateAddrModal = require('./address-modal.string');

var addrModal = {
    show: function(option) {
        //将传进来的option绑定到当前对象，这样其他方法也可以用
        this.option = option;
        this.$modalWrap = $('.modal-wrap');
        //渲染页面
        this.loadModal();
        //modal框出来后绑定事件
        this.bindEvent();
    },
    hide: function() {
        this.$modalWrap.empty();
    },
    bindEvent: function() {
        var _this = this;
        this.$modalWrap.find('#receiver-province').change(function() {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        //保存收货地址
        this.$modalWrap.find('.add-btn').click(function() {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            //使用新地址且验证通过
            if (!isUpdate && receiverInfo.status) {
                _addr.saveAddr(receiverInfo.data, function(res) {
                    _mm.successTips('地址保存成功！');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' &&
                        _this.option.onSuccess(res);
                }, function(errMsg) {
                    _mm.errorTips(receiverInfo.errMsg);
                });
            } else if (isUpdate && receiverInfo.status) {

            }
            //验证不通过
            else {
                _mm.errorTips(receiverInfo.errMsg || '好像哪里不对了~');
            }
        });
        //防止点击modal内容区的时候关闭弹窗
        this.$modalWrap.find('.modal-container').click(function(e) {
            e.stopPropagation();
        });
        //点击x或蒙版区域关闭弹窗
        this.$modalWrap.find('.close').click(function() {
            _this.hide();
        });

    },
    //获取表单收件人信息，并验证
    getReceiverInfo: function() {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
        receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
        receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-addr').val());
        receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
        receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

        if (this.option.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
        }
        // 表单验证
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机号';
        }
        // 所有验证都通过
        else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    },
    loadModal: function() {
        var addrModalHtml = _mm.renderHtml(templateAddrModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(addrModalHtml);
        //加载身份
        this.loadProvince();
        //加载城市
        this.loadCities();
    },
    loadProvince: function() {
        var provinces = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
    },
    //获取select框的选项，输入: array, 输出html
    getSelectOption: function(optionArr) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, length = optionArr.length; i < length; i++) {
            html += '<option value="' + optionArr[i] + '">' + optionArr[i] + '</option>'
        }
        return html;
    },
    //加载城市信息
    loadCities: function(selectedProvince) {
        var cityArr = _cities.getCities(selectedProvince) || [],
            $citySelect = this.$modalWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cityArr));
    }
};
module.exports = addrModal;