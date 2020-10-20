// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    where:{
      
    },
    page:1,
    limit:8,
    current:[
      {
        text:'全部订单'
      },
      {
      value:0,
      text:'待核销'
    },
  {
    value:1,
    text:'已完成'
  }
  ],
  list:[],
  nomore:false
  },
  get_list(){
    let limit =this.data.limit 
    let page =this.data.page 
    let where =this.data.where 
    console.log(where);
    
    wx.cloud.callFunction({
      name:'api',
      data:{
        fn:'get_order',
        data:{
        limit,
        page,
        where
      }
      }
    }).then(res=>{
      this.setData({
        list:this.data.list.concat(res.result.order),
        total:res.result.total
      })
      
    })
  },
  set_current(e){
    let value=e.currentTarget.dataset.value;
    value=null?'{}':value
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
    let value=options.value
    console.log(value);
    
    if(!value){
      console.log(1);
      this.setData({
        where:{
        }
      })
    }else{
      this.setData({
        current:{
          where:{
            status:Number(value)
          }
        }
      })
    }
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
    if(this.data.list.length==this.data.total){
      this.setData({
        nomore:true
      })
      return;
    }
    this.setData({
      page:this.data.page+1
    })
    this.get_list();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})