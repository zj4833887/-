// pages/my/my.js
const chooseLocation = requirePlugin('chooseLocation');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  chose(){
  const key = 'DFXBZ-Z23R6-VEWSW-MH4GT-CG336-5MBFE'; //使用在腾讯位置服务申请的key
  const referer = '星空'; //调用插件的app的名称
  const location = JSON.stringify({
    latitude: 39.89631551,
    longitude: 116.323459711
  });
  const category = '生活服务,娱乐休闲';

  wx.navigateTo({
    url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`
  });
  },
  shenfenzheng() {
    this.photo("shenfenzheng")
  },
  photo(type) {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let imgUrl = res.tempFilePaths[0];
        that.uploadImg(type, imgUrl)
      }
    })
  },
  // 上传图片到云存储
  uploadImg(type, imgUrl) {
    let that = this
    wx.cloud.uploadFile({
      cloudPath: 'ocr/' + type + '.png',
      filePath: imgUrl, // 文件路径
      success: res => {
        console.log("上传成功", res.fileID)
        that.getImgUrl(type, res.fileID)
      },
      fail: err => {
        console.log("上传失败", err)
      }
    })
  },
  //获取云存储里的图片url
  getImgUrl(type, imgUrl) {
    let that = this
    wx.cloud.getTempFileURL({
      fileList: [imgUrl],
      success: res => {
        let imgUrl = res.fileList[0].tempFileURL
        console.log("获取图片url成功", imgUrl)
        that.shibie(type, imgUrl)
      },
      fail: err => {
        console.log("获取图片url失败", err)
      }
    })
  },

  //调用云函数，实现OCR识别
  shibie(type,imgUrl) {
    wx.cloud.callFunction({
      name:'eval',
      data:{
        fn:'shenfenzheng',
        data:imgUrl
      },
      success(res) {
        console.log("识别成功", res)
      },
      fail(res) {
        console.log("识别失败", res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const location = chooseLocation.getLocation();

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