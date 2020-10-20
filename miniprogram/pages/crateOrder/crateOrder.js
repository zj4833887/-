// pages/crateOrder/crateOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //提交订单
  submit(){
   wx.showLoading();
   wx.cloud.callFunction({
     name:'api',
     data:{
       fn:'add_order',
       data:this.data.order
     }
   }).then(res=>{
     wx.hideLoading()
     wx.navigateTo({
       url: '../paySuccess/paySuccess',
     })
   })
  },
  //设置备注
  set_desc(e){
    this.setData({
      'order.desc':e.detail.value
    })
  },
  go(){
    wx.navigateTo({
      url: '/pages/address/address',
      events:{
        go:data=>{
          console.log(data);
          this.setData({
            'order.addressData':data
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.event=this.getOpenerEventChannel();
    this.event.on('go',data=>{
      console.log(data);
      let total=data[0].tuan_price||data[0].price;
      this.setData({
        'order.products':data,
        'order.total':total
      })
    })
    wx.cloud.callFunction({
      name:'api',
      data:{
        fn:'get_address'
      }
    }).then(res=>{
      let data=res.result.data;
      data=data.filter(v=>v.defaule)
      this.setData({
        'order.addressData':data[0]
      })
      
    })
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