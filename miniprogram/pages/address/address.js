// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  chose(e){
    let item=e.currentTarget.dataset.item;
    wx.navigateBack({
      delta: 0,
      success:res=>{
        this.event.emit('go',item)
      }
    })
    
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.event=this.getOpenerEventChannel();
    
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
    wx.showLoading()
    wx.cloud.callFunction({
      name:'api',
      data:{
        fn:'get_address'
      }
    })
    .then(res=>{
     wx.hideLoading();
     this.setData({
      addressList:res.result.data
     })
    })
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