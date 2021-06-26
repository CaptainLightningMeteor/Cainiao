// pages/test/test.js

let app = getApp();
const db = wx.cloud.database();
const expressage = db.collection('expressage');
let num = null;
let phonenum = null;
let scanCodeMsg = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  inputNum:function(event){
    num = event.detail.value;
    console.log('ing')
  },

  inputPhone:function(event){
    phonenum = event.detail.value
  },

  inputMsg:function(event){
    scanCodeMsg = event.detail.value
  },


  scanCode: function() {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          scanCodeMsg: res.result
        });
        wx.showToast({
          title: '成功',
          duration: 1000
        })
      }
    })
  },

  buttonListen: function(res){
    var that = this;
    db.collection('expressage').add({
      data:{
        num: num,
        phonenum: phonenum,
        scanCodeMsg: scanCodeMsg
      },
      success(res){
        console.log('success')
      },
      fail(res){
        console.log('fail')
      }
      
      
    });
    
    
    this.setData({
      num: null,
      phonenum: null,
      scanCodeMsg:null
    })
    wx.switchTab({
      url: '../list/list?numData='+that.data.num+'&phonenumData='+that.data.phonenum+'&msgData='+that.data.scanCodeMsg+'',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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