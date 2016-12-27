var wilddog = require('wilddog-weapp-all')
//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var config = {
       syncURL: 'https://chenshouteng.wilddogio.com'
    }
    wilddog.initializeApp(config)
    this.ref = wilddog.sync().ref('/')
    this.dianZiRef = this.ref.child('dianZi')//获取library节点
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)//相当于if，因为a&&b，只有a为真才会去执行b
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})