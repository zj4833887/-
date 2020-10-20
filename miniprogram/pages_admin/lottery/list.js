Page({

  /**
   * 页面的初始数据
   */
  data: {
    where: {
      status: 1
    },
    limit: 5,
    page: 1,
    total: 0,
    list: []
  },
  //下架
  down(e) {
    wx.showLoading({
      title: '加载中',
    })
    let _id = e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name: 'eval',
      data: {
        fn: 'update_lottery',
        _id: _id,
        data: {
          status: 0
        }
      }
    }).then(res => {
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
  up(e) {
    let _id = e.currentTarget.dataset.id;
    wx.cloud.callFunction({
      name: 'eval',
      data: {
        fn: 'update_lottery',
        _id: _id,
        data: {
          status: 1
        }
      }
    }).then(res => {
      wx.showToast({
        title: '上架成功',
      })
      let list = this.data.list;
      list = list.filter(v => v._id !== _id);
      this.setData({
        list: list
      })
    })
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let index = e.currentTarget.dataset.idx
    this.setData({
      //拿到当前索引并动态改变
      'where.status': Number(index),
      list: [],
      page: 1,
      nomore: false
    })

    // index=parseInt(index);
    this.get_list();
  },
  /**
 * 生命周期函数--监听页面加载
 */
  get_list() {
    const db = wx.cloud.database();
    db.collection('lottery').where(this.data.where)
      .count()
      .then(res => {
        console.log(res);
        this.setData({
          total: res.total
        })
      })
    db.collection('lottery').where(this.data.where).limit(this.data.limit)
      .skip((this.data.page - 1) * this.data.limit).get().then(res => {
        this.setData({
          list: this.data.list.concat(res.data)
        })
      })
  },
  onLoad: function (options) {
    // this.get_list();
  },
  onShow: function () {
    this.data.list = [];

    this.get_list();
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onReachBottom: function () {
    if (this.data.list.length == this.data.total) {
      this.setData({
        nomore: true
      })
      return;
    }
    let page = this.data.page;
    this.setData({
      page: page + 1
    })
    this.get_list()
  },
})