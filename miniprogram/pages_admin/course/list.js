// pages/course_list/course_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    where:{
      status:1
    },
    nomore:false,
    page:1,
    limit:10,
    total:0,
    course:'course',
    list:[]
  },
  titleClick: function (e) {
    let index = e.currentTarget.dataset.idx
    this.setData({
      //拿到当前索引并动态改变
      'where.status': Number(index),
      list: [],
      page: 1,
      nomore: false
    })
    this.get_list();
  },
  down(event){
    wx.hideLoading();
    let _id=event.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name:'eval',
      data:{
        fn:'update_course',
        _id:_id,
        data:{
          status:0
        }
      }
    }).then(res=>{
      wx.showToast({
        title: '下架成功',
      })
      let list = this.data.list;
      list = list.filter(v => v._id !== _id);
      this.setData({
        list: list
      })
    })
  },
  //up
  up(event){
    wx.showLoading();
    let _id=event.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name:'eval',
      data:{
        fn:'update_course',
        _id:_id,
        data:{
          status:1
        }
      }
    }).then(res=>{
      wx.hideLoading();
      wx.showToast({
        title: '上架成功',
      })
      let list=this.data.list;
      list=list.filter(v=>v._id !== _id)
      this.setData({
        list:list
      })
    })
  },
  get_list(){
    wx.hideLoading();
   const db=wx.cloud.database();
   db.collection(this.data.course).where(this.data.where).count().then(res=>{
     this.setData({
       total:res.total
     })
   });
   db.collection(this.data.course).where(this.data.where)
   .skip((this.data.page-1)*this.data.limit)
   .limit(this.data.limit)
   .get().then(res=>{
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