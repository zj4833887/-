// pages/upload_pic/upload_pic.js
const md5 = require("../../style/md5")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:{
      list:[]
    }
  },
  left(e){
    let index=e.currentTarget.dataset.index;
    let images=this.data.list.images;
    let t=images[index];
    images[index]=images[index-1];
    images[index-1]=t;
    this.setData({
      'list.images':images
    }) 
  },
  right(e){
    let index=e.currentTarget.dataset.index;
    let images=this.data.list.images;
    let t=images[index];
    images[index]=images[index+1];
    images[index+1]=t;
    this.setData({
      'list.images':images
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
          let images = this.data.list.images;
          images = images.filter(v => v.url != url);
          this.setData({
            'list.images': images
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
    wx.navigateBack({
      data: 1,
      success: (res) => {
        this.event.emit('back', this.data.list)
      }
    })
  },
  set_nav(e) {
    let index = e.currentTarget.dataset.index;
    let list = this.data.shop.list;
    list[index].nav = e.detail.value;
    this.setData({
      'shop.list': list
    })
  },
  //图片上传
  chooseImage() {
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let pics = res.tempFilePaths;
        wx.showLoading({
          title: '正在上传',
          mask: true
        })
        let num = 0;
        let shop = this.data.shop;
        shop.list=[];
        let images=shop.list
        for (let i = 0; i < pics.length; i++) {
          let t = pics[i].split('.')
          let h = '.' + t[t.length - 1]
          wx.cloud.uploadFile({
            filePath: pics[i],
            cloudPath: md5(pics[i]) + h,
            success: res => {
              num = num + 1
              images.push({
                url: res.fileID,
                type: 'image'
              });

              if (num = images.length) {
                wx.hideLoading();
                wx.showToast({
                  title: '全部上传成功',
                })
                this.setData({
                  'shop.list': images
                })
              }
            }
          })
        }
      }
    })
  },
  //  //设置字段
  //  set(e){
  //   let key=e.currentTarget.dataset.key;
  //   let shop=this.data.shop;
  //   shop[key]=e.detail.value;
  //   this.setData({
  //     shop
  //   })
  // },
  // 修改
  update(){
    wx.showLoading();
    let shop=this.data.shop;
    let _id=this.data.shop._id;
    delete shop._id 
    wx.cloud.callFunction(
      {
        name:'eval',
        data:{
          fn:'update_rotation',
          _id:_id,
          data:shop
        }
      }
    ).then(res=>{
      wx.hideLoading();
      wx.showToast({
        title: '更新成功',
      })
      console.log(res);
        
      // setTimeout(res=>{
      //   wx.navigateBack({
      //     delta: 1,
      //   })
      // },1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database();
    db.collection('rotation').get()
    .then(res => {

      this.setData({
        shop:res.data[0]
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