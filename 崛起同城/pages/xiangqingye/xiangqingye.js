const time = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xiangqing: [],
    is_show: false,
    star_time: '',
    itemid: 0
  },
  onLoad: function (options) {
    var that = this
    wx.getStorageSync('http')
    console.log(wx.getStorageSync('http'))
    var url = wx.getStorageSync('http')
    that.setData({
      http: url
    })
    console.log(that.data.http + '/api/gethospitalxq')
    wx.request({
      url: url + '/api/gethospitalxq/' + options.itemid,
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        var xiangqing = res.data
        var time1 = res.data.star_time
        var star_time = time.formatTimeTwo(time1, 'Y-M-D h:m:s')
        var stat = res.data.is_show
        var hid = res.data.id
        app.globalData.starts = res.data.starts
        that.setData({
          xiangqing: xiangqing,
          star_time: star_time,
          stat: stat,
          hid: hid
        })
      }
    })
  },
  lijibaoming() {

    var that = this;
    var url = wx.getStorageSync('http')
    var http = that.data.http;
    var token = wx.getStorageSync('token');
    var hid = that.data.hid
    var all = 'Bearer ' + token
    that.setData({
      http: url
    })
    wx.request({
      url: url + '/api/baoming',
      method: "POST",
      header: {
        Authorization: all,
        Accept: 'application/json'
      },
      data: {
        hid: hid
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 200) {
          wx.navigateTo({
            url: '../baomingjilu/baomingjilu',
          })
        }
      }
    })

  }

})