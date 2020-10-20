// pages/product_list/product_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    where:{
    },
    order:{
      key:'update_time',
      value:'desc'
    },
    list:[],
    page:1,
    limit:6,
    course:'course',
    nomore:false,
    show:false,
    cate_list:[1,2,5,9]
  },
  set(e){
    let key=e.currentTarget.dataset.key;
    this.setData({
      order:{
        key:key,
        value:'desc'
      }
    })
    this.setData({
      list:[],
      page:1,
      limit:6
    })
    this.get_list()
    
  },
  set_price(e){
    let v=this.data.order.value
    if(v=='desc'){
      v='asc'
    }else{
      v='desc'
    }
 
    this.setData({
      list:[],
      page:1,
      limit:6,
      order:{
        key:'price',
        value:v
      }
    })
    this.get_list()
  },
  get_list(){
    wx.showLoading({
      title: '加载中',
    })
    const db=wx.cloud.database();
    db.collection(this.data.course).where(this.data.where).count().then(res=>{
      this.setData({
        total:res.total
      })
    });
    db.collection('course').where(this.data.where)
    .skip((this.data.page-1)*this.data.limit)
    .limit(this.data.limit)
    .orderBy(this.data.order.key,this.data.order.value)
    .field({
      main_image:true,
      name:true,
      price:true,
      update_time:true,
      sales:true
    })
    .get()
    .then(res=>{
      wx.hideLoading()
      this.setData({
        list:this.data.list.concat(res.data)
      })
    })
  },
  show(){
    this.setData({
      show:true
    })
  },
  hide_box(){
    this.setData({
      show:false
    })
  },
  setcate(e){
    let cate_id=e.currentTarget.dataset.cate_id;
    if(cate_id){
      this.setData({
        where:{
          category:cate_id
        }
      }) 
    }
    else{
      this.setData({
        where:{}
      }) 
    }
    
    this.setData({
      list:[],
      page:1,
      limit:6,
      nomore:false,
      show:false
    })
    this.get_list();
    
  },
  go(e){
    let _id=e.currentTarget.dataset.id    
    wx.navigateTo({
      url: '../product/product?_id='+_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db=wx.cloud.database();
    db.collection('category').get()
    .then(res=>{
      this.setData({
        cate_list:res.data
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
    this.setData({
      list:[],
      page:1,
      limit:6,
    })
    this.get_list();
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