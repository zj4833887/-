// pages/addressManage/addressManage.js
const chooseLocation = requirePlugin('chooseLocation');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData:{
      defaule:false,
    }
  },
    //设置名字
    set(e){
      let key=e.currentTarget.dataset.key
      let addressData=this.data.addressData;
      addressData[key]=e.detail.value;
      this.setData({
        addressData
      })
    },
  //设置地址
    set_address(){
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
    //设置默认
    set_defaule(){
      this.setData({
        'addressData.defaule':!this.data.addressData.defaule
      })
    },
    //修改
    update_add(){
      let check=this.check();
      if(check){
        wx.showLoading()
        let addressData=this.data.addressData
        let _id=addressData._id;
        delete addressData._id
        let data=addressData;
        wx.cloud.callFunction({
          name:'api',
          data:{
            fn:'update_address',
            _id,
            data:data
          }
        })
        .then(res=>{
          wx.hideLoading();
          wx.showToast({
            title: '修改成功',
          })
          wx.navigateBack({
            delta: 0,
          })
        })
      }
    },
    //添加
    get_add(){
      let check=this.check();
      if(check){
        wx.showLoading()
      wx.cloud.callFunction({
        name:'api',
        data:{
          fn:'add_address',
          data:this.data.addressData
        }
      })
      .then(res=>{
        wx.hideLoading();
        wx.showToast({
          title: '添加成功',
        })
        wx.navigateBack({
          delta: 0,
        })
      })
      }
      
    },
    //判空
    check(){
      let addressData=this.data.addressData;
      if(!addressData.name){
        wx.showToast({
          title: '请填写收货人姓名',
        })
        return false;
      }
      if(!addressData.mobile){
        wx.showToast({
          title: '请请填写收货人手机号',
        })
        return false;
      }
      if(!addressData.addressName){
        wx.showToast({
          title: '请填写收货人地址',
        })
        return false;
      }
      return true;
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _id=options.id;
    if(_id){
      const db=wx.cloud.database();
      db.collection('address').doc(_id).get()
      .then(res=>{  
        this.setData({
          addressData:res.data
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
    const location = chooseLocation.getLocation();
    if(location){
      let address=location.address;
      this.setData({
        'addressData.addressName':address
      })
    }
      
    
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