// pages/course_add/course_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record:{
      category:[],
      swipter:{videos:[],images:[]},
      detail:{videos:[],images:[]}
    }
  },
  //详情图
  detail(){
    wx.navigateTo({
      url: '../upload/upload',
      events:{
        come:data=>{
          console.log(data);
        }
      },
      success:res=>{
        res.eventChannel.emit('go',this.data.record.detail)
      }
    })
  },
  //轮播图
  swipter(){
    wx.navigateTo({
      url: '../upload/upload',
      events:{
        come:data=>{
          
        }
      },
      success:res=>{
        res.eventChannel.emit('go',this.data.record.swipter)
      }
    })
  },
  go(){
    wx.navigateTo({
      url: './category',
      events:{
        back:data=>{
          this.setData({
            'record.category':data
          })
        }
      },
      success:(res)=>{
        res.eventChannel.emit('go',this.data.record.category)
      }
    })
    
  },
  //修改
  update(){
    wx.showLoading()
    let record=this.data.record
    record.price=Number(record.price)
    let _id=record._id;
    delete record._id
    let data=record;
    data.main_image=data.swipter.images[0].url;
    data.update_time=new Date().getTime();
    wx.cloud.callFunction({
      name:'eval',
      data:{
        fn:'update_course',
        _id:_id,
        data:data
      }
    }).then(res=>{
      wx.hideLoading();
      wx.showToast({
        title: '更新成功',
      })
      setTimeout(()=>{
        wx.navigateBack();
      },1000)
    })
  },
  //提交
  submit(){
    wx.showLoading();
    let data=this.data.record
    data.price=Number(data.price)
    data.main_image=data.swipter.images[0].url;
    data.update_time=new Date().getTime();
    wx.cloud.callFunction({
      name:'eval',
      data:{
        fn:'add_course',
        data:data
      }
    }).then(res=>{
      wx.hideLoading();
      wx.showToast({
        title: '添加成功',
      })
      setTimeout((res)=>{
        wx.navigateBack({
          delta: 1,
        })
      },1000)
      // console.log(res);
    })
  },
  //课程状态
  set_status(){
    let status=this.data.record.status
    this.setData({
      'record.status':status?0:1
    })
  },
  set_tuan(){
    this.setData({
      'record.tuan':!this.data.record.tuan
    })
  },
  //设置字段value
  set(e){
    let key=e.currentTarget.dataset.key;
    this.data.record[key]=e.detail.value;
    this.setData({
      record:this.data.record
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id=options.id;
    if(id){
      const db=wx.cloud.database();
      db.collection('course').doc(id).get()
      .then(res=>{  
        this.setData({
          record:res.data
        })
      })
    }
    
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