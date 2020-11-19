const app = getApp()
var openid = wx.getStorageSync("openid");
Page({
  data: {
    hasUserInfo: openid == "",
    nickname: '',
    http: '',
    stat: false,
    starts:1,
    page:0,
    limit:10
  },
  onLoad: function (options) {
    this.data.http = wx.getStorageSync('http')

  },
  doAuthorization: function (e) {
    var that = this;
    var http = that.data.http
    console.log(http);
    if (e.detail.userInfo == null) {
      console.log("用户拒绝授权");
    } else {
      //授权
      wx.login({
        success: function (res) {
          //发送请求
          wx.request({
            url: http + '/api/wxlogin', //接口地址
            method: 'POST',
            data: {
              code: res.code,
              nickName: e.detail.userInfo.nickName,
              gender: e.detail.userInfo.gender,
              avatarUrl: e.detail.userInfo.avatarUrl
            },
            success: function (res) {
              var res = res.data;
              console.log(res)
              wx.setStorageSync('token', res.userinfo.api_token)
              wx.setStorageSync('session_key', res.userinfo.session_key)
              that.setData({
                hasUserInfo: false,
                stat: true,
                nickname: res.userinfo.nickname,
                portrait: res.userinfo.portrait,
                session_key: res.userinfo.session_key,
              });
            },
            fail: function (err) {
              console.log("record  失败", err);
            }
          })
        }
      })
    }
  },
  getPhoneNumber(e) {
    var that = this;
    var http = that.data.http;
    var token = wx.getStorageSync('token');
    console.log(e)
    var all = 'Bearer ' + token
    var ency = e.detail.encryptedData;
    var iv = e.detail.iv;
    var sessionk = this.data.session_key;
    /*  console.log(http+'/api/getphone') */
    wx.request({
      method: "POST",
      url: http + '/api/getphone',
      data: {
        session_key: sessionk,
        encryptedData: ency,
        iv: iv
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        console.log("请求成功", res)
        that.setData({
          stat: false
        })
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },
  move(e) {
    var that = this;
    var http = that.data.http;
    var token = wx.getStorageSync('token');
    console.log(e)
    var all = 'Bearer ' + token
    
    wx.request({
      method: "POST",
      url: http + '/api/bmlist',
      data: {
        starts:this.data.starts,
        page:this.data.page,
        limit:this.data.limit
      },
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      dataType: "json",
      success: function (res) {
        /* console.log("请求成功", res)
        var res=res.data
        console.log(res) */
        wx.navigateTo({
          url: '../baomingjilu/baomingjilu?res='+res,
        })
       
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },
  go(){
    wx.navigateTo({
      url: '../wsmessage/wsmessage'
    })
  },
  onReady: function () {
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})