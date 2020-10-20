// pages/order_list/order_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: [
      {
        value:{},
        text: '全部订单'
      },
      {
      value: 0,
      text: '待核销'
    },
    {
      value: 1,
      text: '已完成'
    }
    ],
    where: {
      status: 0
    },
    limit: 5,
    page: 1,
    list: []
  },
  get_list() {
    wx.showLoading()
    const db = wx.cloud.database();
    db.collection('order').where(this.data.where).count().then(res => {
      this.setData({
        total: res.total
      })
    });
    db.collection('order').where(this.data.where)
      .skip((this.data.page - 1) * this.data.limit)
      .limit(this.data.limit)
      .get().then(res => {
        wx.hideLoading();
        this.setData({
          list: this.data.list.concat(res.data)
        })
      })
  },
  update(e){
    wx.showLoading();
    let _id=e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name:'eval',
      data:{
        fn:'update_order',
        _id:_id,
        data:{
          status:0
        }
      }
    }).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '上架成功',
      })
      let list=this.data.list;
      list=list.filter(v=>v._id!==_id)
      this.setData({
        list
      })
      // this.get_list();
    })
   
  },
  off(e){
    wx.showLoading();
    let _id=e.currentTarget.dataset.id
    wx.cloud.callFunction({
      name:'eval',
      data:{
        fn:'update_order',
        _id:_id,
        data:{
          status:1
        }
      }
    }).then(res=>{
      wx.hideLoading()
      wx.showToast({
        title: '核销成功',
      })
      let list=this.data.list;
      list=list.filter(v=>v._id!==_id)
      this.setData({
        list
      })
      // this.get_list();
    })
   
  },
  set_current(e){
    let value=e.currentTarget.dataset.value;
    this.setData({
      list:[],
      nomore:false,
      where:{
        status:value
      },
    })
    this.get_list();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_list();
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