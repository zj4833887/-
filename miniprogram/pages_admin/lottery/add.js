// pages/lottery_add/lottery_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:{
      prize:[]
    }
  },
  //更新
  update(){
    let record=this.data.record
    let id=record._id
    delete record._id
    wx.cloud.callFunction({
      name:'eval',
      data:{
        fn:'update_lottery',
        _id:id,
        data:record
      }
    })
    wx.navigateBack();
    // wx.navigateTo({
    //   url: '../lottery_list/lottery_list',
    // })
  },
  //提交
  submit(){
    wx.showLoading()
    wx.cloud.callFunction({
      name: 'eval',
      data: {
        fn: 'add_lottery',
        data:this.data.record
      }
    }).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '添加成功',
      })
      setTimeout(()=>{
        wx.navigateBack({
          data:1
        })
      },1000)
    })
  },
  //跳转路径
  go(){
    wx.navigateTo({
      url: './prize',
      events:{
        back:function(data){
         
        }
      },
      success:(res)=>{
          res.eventChannel.emit('prize',this.data.record.prize)
      }
    })
  },
  //设置抽奖名字
  set_name(e){
    this.setData({
      'record.name':e.detail.value
    })
  },
  //设置抽奖简介
  set_info(e){
    this.setData({
      'record.info':e.detail.value
    })
  },
  //设置抽奖人数
  set_people(e){
    this.setData({
      'record.people':e.detail.value
    })
  },
  //设置抽奖状态
  set_status(){
    let status=this.data.record.status
    this.setData({
      'record.status':status?0:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let id=options.id
      if(id){}
      const db=wx.cloud.database();
      db.collection('lottery').doc(id).get()
      .then(res=>{
        this.setData({
          record:res.data
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