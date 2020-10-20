// pages/category/category.js
const md5 = require("../../style/md5")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cat:{}
  },
  // 修改
  update(){
    wx.showLoading();
    let cat=this.data.cat;
    let _id=cat._id;
    delete cat._id;
    let data=cat;
    wx.cloud.callFunction(
      {
        name:'eval',
        data:{
          fn:'update_category',
          _id:_id,
          data:data
        }
      }
    ).then(res=>{
      wx.hideLoading();
      wx.showToast({
        title: '更新成功',
      })  
      setTimeout(res=>{
        wx.navigateBack({
          delta: 1,
        })
      },1000)
    })
  },
  //图片上传
  chooseImage(){
    let images=this.data.cat.images || [];
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        let pics = res.tempFilePaths;
        let t = pics[0].split('.')
        let h = '.' + t[t.length - 1]
        wx.cloud.uploadFile({
          filePath: pics[0],
          cloudPath: md5(pics[0]) + h,
          success: res => {
            images.push({
              url: res.fileID,
              type: 'image'
            });
              // wx.hideLoading();
              wx.showToast({
                title: '上传成功',
              })
              this.setData({
                'cat.bg_images': images
              })
          }
        })
      },
    })
  },
  //设置字段
    set(e){
    let key=e.currentTarget.dataset.key;
    let cat=this.data.cat;
    cat[key]=e.detail.value;
    this.setData({
      cat
    })
  },
  // 设置显示
  set_show(){
    let status=this.data.cat.show
    this.setData({
      'cat.show':status?0:1
    })
  },
   //删除(图片)
   delimage(e) {
    wx.showModal({
      title: '删除',
      content: '真的要删除吗',
      success: res => {
        if (res.confirm) {
          wx.showLoading();
          let url = e.currentTarget.dataset.url;
          let images = this.data.cat.images;
          images = images.filter(v => v.url != url);
          this.setData({
            'cat.images': images
          })
          wx.cloud.callFunction({
            name: 'eval',
            data: {
              fn: 'del_file',
              url: url
            },
          }).then(res => {
            wx.hideLoading();
            wx.showToast({
              title: '删除成功',
            })
          })
        }


      }
    })
  },
  //提交
  submit() {
    wx.showLoading();
    let data=this.data.cat
    wx.cloud.callFunction({
      name:'eval',
      data:{
        fn:'add_category',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    if(options.id){
      let id=options.id;
      const db=wx.cloud.database();
      db.collection('category').doc(id).get()
      .then(res=>{
        this.setData({
          cat:res.data
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