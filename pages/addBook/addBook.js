//var util = require('../../utils/util');
//获取应用实例
var app = getApp();
Page({
  data: {
    name: '',
    phone: '',
    company: '',
    index: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    this.ref = app.dianZiRef
  },
  /*
  addBook:function(){
    var that=this;
    //因为小程序暂时没有提供扫描二维码API，所以先hard code ISBN13，随机返回一个，模拟扫描效果
    this.data.isbn13=util.getISBN13();

    wx.navigateTo({
      url: "../detail/detail?id=" + that.data.isbn13+"&addBook=Y"
    });
  },
  //根据扫码录入控制手动输入的form是否显示
  screenInput:function(e){
    this.setData({
      isShowInputForm:!e.detail.value
    })
  },
*/


  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log('form发生了submit事件，携带数据为：', e)
    this.data.name = e.detail.value.inputName
    this.data.phone = e.detail.value.inputPhone
    this.data.company = e.detail.value.inputCompany
    this.data.inputIndex = e.detail.value.inputIndex
    console.log(this.data.name, this.data.phone, this.data.company, this.data.inputIndex)
    var value = { "name": this.data.name, "phone": this.data.phone, "company": this.data.company, "index": this.data.inputIndex }
    if (e.detail.value.inputName != null && e.detail.value.inputName.trim() !== '') {
      this.ref.push(e.detail.value.inputName)
      this.ref.update({this.data.name:value})
        .then(function () {
          console.info('tim add **this.data.temp**set data success.')
        })
        .catch(function (err) {
          console.info('tim add ****set data failed', err.code, err);
        });
    }
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },

  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})