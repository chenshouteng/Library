//index.js
//获取应用实例
var app = getApp();
//var config = require('../../utils/config');
//var url = config.url;
//var util = require('../../utils/util');
//var db = require('../../utils/db');
Page({
  data: {
    inputShowed: false,
    test: '',
    tipMessage: [],
    preInputVal: '',//存放上一次查询输入的数据
    inputVal: ""  //存放输入查询的数据
  },
  onLoad: function () {
    console.log("tim add onload")
    this.ref = app.dianZiRef
  },
  onShow: function () {
    console.log("tim add onshow")
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputChange: function (e) {
    this.setData({
      inputVal: e.detail.value,
      // tipMessage:tmpMessage
    });
    var that = this;
    var tmpMessage = [];
    //that.data.tipMessage.length = 0;//每次点击后查询后，先把显示提示的数组清零
    this.ref.orderByKey().startAt(e.detail.value).limitToFirst(4).on("child_added", function (snapshot) {
      console.log("test for tim");
      var tmp = snapshot.key();
      // var tmpMessage;
      tmpMessage.push(tmp);
      console.log(tmpMessage.length);
      console.log(snapshot.key());
      that.setData({
        tipMessage: tmpMessage
      });
    });

    console.log("tim add end");
    console.log(this.data.tipMessage.length);
  },
  queryName: function (e) {
    var that = this;
    var inputMsg = that.data.inputVal;//用户输入的数据
    //this.queryNameRef = this.ref.child(" '+inputMsg+ ' ")//获取inputMsg节点
    this.ref.orderByKey().equalTo(inputMsg).on("child_added", function (snapshot) {
      console.log(snapshot);
      console.log(snapshot.key());
      console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().company);
      console.log(snapshot.val().phone);
      that.setData({
        showMessage: true,
        name: snapshot.val().name,
        company: snapshot.val().company,
        phone: snapshot.val().phone,
        index: snapshot.val().index
        // addressBook:snapshot.val()
        //console.log(addressBook)
      })
      //that.data.addressBook = snapshot.val()
      console.log("tim add ----");
    })
  },
});