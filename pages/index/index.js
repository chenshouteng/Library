//index.js
//获取应用实例
var app = getApp();
//var config = require('../../utils/config');
//var url = config.url;
//var util = require('../../utils/util');
//var db = require('../../utils/db');

Page({
  data: {
    //addressBook: {},//存放通讯录的地方
    name: '',
    phone: '',
    company: '',
    index: '',
    loginUrl: '../login/login',
    hasLogin: app.globalData.hasLogin,
    hasUserInfo: false,
    todo: [],//test for bindAsArray
    showMessage: false,
    count:0,
    tipMessage:[],
    preInputValue:'',//存放上一次查询输入的数据
    inputValue: ''//存放输入查询的数据
  },
  inputChange: function (e) {
    this.data.inputValue = e.detail.value;
    console.log(this.data.inputValue.length)
  },
  //事件处理函数
  /*
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },*/
  onLoad: function () {
    console.log('onload --tim add')
    //console.log(addressBook)
    var that = this;
    this.ref = app.dianZiRef
    //this.todoRef = wilddog.sync().ref('todo').orderByPriority().limitToFirst(20)
    //app.todoRef.bindAsArray(this,'todo')//test bindAsArray
    this.ref.bindAsArray(this, 'todo')//test bindAsArray
    //1.获取用户的基本信息，查询数据库获取用户的工号，并使用缓存存在本机
    //var openid = wx.getStorageSync('openid');

    /*如何获取工号
    var options={
      url:config.clubApi.get,
      data:{
        appkey: config.appKey,
        key: openid,
        type:'userMapping'
      }
    }
    util.request(options).then(res=>{
      //获取到工号
      console.log(res.data.result.value);
    })*/

    //以下这段都是有用的，不要删除。以后做个界面，用户第一次使用的时候就要输入自己的工号，然后把工号和openid存到mapping表里
    // if (openid) {
    //   wx.checkSession({
    //     success: function (e) {
    //       //登录态未过期
    //     },
    //     fail: function () {
    //       //登录态过期
    //       wx.login({
    //         success: function (res) {
    //           if (res.code) {
    //             db.getOpenId(res.code).then(res => {
    //               console.log(res);
    //               var openid = res.data.openid;
    //               var expires_in = res.data.expires_in;
    //               var session_key = res.data.session_key;

    //               for (var key in res.data) {
    //                 // console.log(key);
    //                 // console.log(res.data[key]);
    //                 wx.setStorage({
    //                   key: key,
    //                   data: res.data[key]
    //                 });
    //               };
    //             });
    //           }
    //         },
    //         fail: function () {
    //           console.log('login fail')
    //         },
    //         complete: function () {
    //           // complete
    //         }
    //       });
    //     }
    //   })

    // } else {

    //   wx.login({
    //     success: function (res) {
    //       if (res.code) {
    //         db.getOpenId(res.code).then(res => {
    //           console.log(res);
    //           var openid = res.data.openid;
    //           var expires_in = res.data.expires_in;
    //           var session_key = res.data.session_key;

    //           for (var key in res.data) {
    //             // console.log(key);
    //             // console.log(res.data[key]);
    //             wx.setStorage({
    //               key: key,
    //               data: res.data[key]
    //             });
    //           };
    //         });
    //       }
    //     },
    //     fail: function () {
    //       console.log('login fail')
    //     },
    //     complete: function () {
    //       // complete
    //     }
    //   });

    // };


    //2.从数据库获取所有书本的信息
    // var options = {
    //   url: config.clubApi.list,
    //   data: {
    //     appkey: config.appKey,
    //     type: 'bookLibrary'
    //     //columns: ['id', 'isbn13', 'title']
    //   }
    // };

    // util.request(options, function (res) {
    //   var books = [];
    //   for (var i = 0; i < res.data.result.length; i++) {
    //     books.push(res.data.result[i].value);
    //   }
    //   that.setData({
    //     bookList: books
    //   })
    // });

    //this.queryAllBooks();
    // var timestamp3 = new Date().getTime();

    // var newDate = new Date();
    // newDate.setTime(timestamp3);
    // console.log(newDate.toLocaleString());




  },

  login: function () {
    var that = this
    wx.login({
      success: function (res) {
        app.globalData.hasLogin = true
        console.log(res)
        that.setData({
          hasLogin: true
        })
        wx.getUserInfo({
          success: function (res) {
            // success
            that.setData({
              hasUserInfo: true,
              userInfo: res.userInfo
            })
          },
          fail: function () {
            // fail
            console.log("tim add -------fail")
          },
          complete: function () {
            // complete
          }
        })
        // that.update()
      }
    })
  },
  userLogin: function (e) {
    // var that = this;
    // wx.navigateTo({ url: that.data.loginUrl })
  },
  queryBooks: function (e) {
    var that = this;

    var inputMsg = that.data.inputValue;//用户输入的数据

    //console.log(inputMsg)

    //console.log(this.ref)
    this.ref.on("value", function (snapshot) {
      //console.log(snapshot.val());
    })
    this.queryNameRef = this.ref.child(" '+inputMsg+ ' ")//获取inputMsg节点
    //console.log(this.queryNameRef)
    // that.setData({
    //   addressBook: this.queryNameRef
    // });
    if(that.data.preInputValue != that.data.inputValue)
    {
      that.data.tipMessage.length = 0;//每次点击后查询后，先把显示提示的数组清零
        this.ref.orderByKey().startAt(inputMsg).limitToFirst(4).on("child_added",function(snapshot){
        console.log("test for tim");
        var tmp = snapshot.key();
        var tmpMessage;

        if(that.data.tipMessage.length == 4)
        {
          that.data.tipMessage.length = 0;
        }
        that.data.tipMessage.push(tmp);
        that.setData({

        })
        console.log(that.data.tipMessage.length)
        console.log(snapshot.key());
        });
        that.data.preInputValue = that.data.inputValue;
        
    }

   // this.ref.orderByKey().endAt('陈扬').on("child_added",function(snapshot){
    //  console.log(snapshot.key());
   // });
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
  /* goToDetailPage: function (e) {
 
     var isbn13 = e.currentTarget.id;
     var qty = e.currentTarget.dataset.qty;
     wx.navigateTo({
       url: '../detail/detail?id=' + isbn13 + '&qty=' + qty
     });
 
   },*/
  onShow: function () {
    // 页面显示
    console.log('onshow');
    //this.queryAllBooks();
    //this.queryBooks();
  },
  queryAllBooks: function () {

    var that = this;
    var options = {
      url: config.clubApi.list,//'https://api.wxappclub.com/list'
      data: {
        appkey: config.appKey,
        type: 'bookLibrary'
      }
    };

    util.request(options, function (res) {
      var books = [];
      for (var i = 0; i < res.data.result.length; i++) {
        books.push(res.data.result[i].value);
        //books.push(JSON.parse(res.data.result[i].value));
        //console.log(typeof(res.data.result[i].value));
      }
      that.setData({
        bookList: books
      })
    });



  }

})
