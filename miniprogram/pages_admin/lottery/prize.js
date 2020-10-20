// pages/lottery_prize_add/lottery_prize_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    back: [1, 2, 3, 4, 5, 6]
  },
  add(){
    let price=this.data.price;
    price.push({
      name:'',
      item:'',
      number:'',
      probabil:''
    })
    this.setData({
      price:price
    })
  },
  del(e){
    let index=e.currentTarget.dataset.index
    let price=this.data.price;
    wx.showModal({
      title:'删除',
      content: '确定要删除该奖项吗？',
      success:(res)=> {
        if (res.cancel) {
           //点击取消,默认隐藏弹框
        } else {
           //点击确定
           price.splice(index,1);
           this.setData({
             price:price
           })
        }
     },
    })
  },
  set(e){
    let index=e.currentTarget.dataset.index
    let key=e.currentTarget.dataset.key
    let price=this.data.price
    let arr=price[index];
    arr[key]=e.detail.value;
    this.setData({
      price:price
    })
  },
  sumbit() {
    let price=this.data.price;
    // price.forEach((element,index) => {
    //   console.log(price[index].name);
    //   if(!element.name&&!element.number){
    //     wx.showToast({
    //       title: '请把奖项填写完整',
    //     })
    //     return "请把奖项填写完整"
    //   }else(
       
    //   )
    // })
    wx.navigateBack({
      data:1,
      success: (res) => {
        this.event.emit('back', this.data.price)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.event = this.getOpenerEventChannel();
    this.event.on('prize', (data) => {
      console.log(data);
      this.setData({
        'price': data
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