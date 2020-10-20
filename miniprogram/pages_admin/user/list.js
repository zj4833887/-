// pages/user_list/user_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      limit:5,
      page:1,
      list:[],
      total:0
  },
  set_admin(e){
    let item=e.currentTarget.dataset.item;
    let _id=item._id;
    wx.showLoading();
    wx.cloud.callFunction({
      name:'eval',
      data:{
        fn:'set_admin',
        data:{
          _id,
          is_admin:item.is_admin==1?0:1
        }
      }
    }).then(res=>{
      wx.hideLoading();
      let list=this.data.list;
      list=list.map(v=>{v.is_admin==item.is_admin
       return v;
      })
      this.setData({
        list
      })
      console.log(list);
      
    })
    
  },
  get_user(){
    const db=wx.cloud.database();
    db.collection('user').count()
    .then(res=>{
      this.setData({
        total:res.total
      })
    })
    db.collection('user').limit(this.data.limit)
    .skip((this.data.page-1)*this.data.limit)
    .get().then(res=>{
      this.setData({
        list:res.data,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.get_user();
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