// pages/index2/index2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuTapCurrent:0,
    showModal: false,
    resa:'',
    starts:1,
    page:0,
    limit:10,
  },
  onLoad: function (options) {
    this.data.http = wx.getStorageSync('http')
    var that = this;
    var http = that.data.http;
    var token = wx.getStorageSync('token');
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
        console.log("请求成功", res)
        var res=res.data
        console.log(res)
        that.setData({
         res:res
        })
      },
      fail: function (res) {
        console.log("请求失败", res)
      }
    })
  },
  menuTap: function (e) {
    var current = e.currentTarget.dataset.current;
    this.setData({
      menuTapCurrent: current
    });
  
  },
  preventTouchMove: function () {},
  btn: function () {
    this.setData({
      showModal: true
    })
  },

  // 弹出层里面的弹窗
  ok: function () {
    this.setData({
      showModal: false,
    })
  },
})