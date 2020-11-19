const app = getApp()
var openid = wx.getStorageSync("openid");
Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },
  data: {
    http: '',
    hasUserInfo: openid == "",
    nickname: '',
    /*   background: [{
        url: '../../static/01.png'
      }, {
        url: '../../static/01.png'
      }, {
        url: '../../static/01.png'
      }], */
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    indicatorColor: "white",
    indicatorActiveColor: '#1C7AF2',
    /* 假数据 */
    banner: [],
    hospital:[],
  },
  onLoad: function (options) {
    this.getindex()
  },
  getindex(){
    var that = this
    var url = wx.getStorageSync('http')
    that.setData({
      http: url
    })
    wx.request({
      url: url + '/api/index',
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        var banner = res.data.banner
        var hospital=res.data.hospital
        that.setData({
          banner: banner,
          hospital:hospital
        })
      }
    })
  },
  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
  /* 下拉刷新 */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  /* 上滑刷新 */

  /* 报名记录 */
  baomingjilu() {
    wx.navigateTo({
      url: '../baomingjilu/baomingjilu',
    })
  },
  /* 邀请好友 */
  yaoqingjilu() {
    wx.navigateTo({
      url: '../yaoqingjilu',
    })
  },
  /* 扫码记录 */
  saomajilu() {
    wx.navigateTo({
      url: '../saomajilu/saomajilu',
    })
  },
  /* 详情 */
  go(e) {
    var itemid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../xiangqingye/xiangqingye?itemid='+itemid,
    })
  }
})