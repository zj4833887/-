// pages/category_list/category_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    where:{},
    limit:5,
    page:1,
    total:0,
    nomore:false,
    category:'category',
    list:[]
  },
  //编辑
  edit(e){
    let data=e.target.dataset
      wx.navigateTo({
        url: '../category_add/category_add?id='+data.id,
      })
  },
  get_list(){
    wx.hideLoading();
    const db=wx.cloud.database();
    db.collection(this.data.category).where(this.data.where).count().then(res=>{
      this.setData({
        total:res.total
      })
    });
    db.collection(this.data.category).where(this.data.where)
    .skip((this.data.page-1)*this.data.limit)
    .limit(this.data.limit)
    .get()
    .then(res=>{
      wx.hideLoading()
     this.setData({
       list:this.data.list.concat(res.data)
     })
    })
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
    if (this.data.list.length == this.data.total) {
      this.setData({
        nomore: true
      })
      return;
    }
    let page=this.data.page;
    this.setData({
      page:page+1
    })
    this.get_list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})