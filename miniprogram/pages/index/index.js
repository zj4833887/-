// const app=getApp();
//全局变量
// console.log(app.globalData.login);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // carouselList:[{
    //   src:'/static/temp/banner3.jpg'
    // },
    // {
    //   src:'/static/temp/banner2.jpg'
    // },
    // {
    //   src:'/static/temp/banner1.jpg'
    // }],
  },
  goUrl(e){
    let url=e.currentTarget.dataset.url
    console.log(url);
    wx.navigateTo({
      url: url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // init(){
  //   const db=wx.cloud.database();
  //   db.collection('course').get()
  //   .then(res=>{
  //     console.log(res);  
  //   })
  // },

  onLoad: function (options) {
    wx.cloud.callFunction({
      name:'api',
      data:{
        fn:'index'
      }
    }).then(res=>{
      if(res.result){
        this.setData({
          res:res.result
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示,
   */
  onShow: function () {
    
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