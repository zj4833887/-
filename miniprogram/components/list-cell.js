// components/list-cell.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String,
      value: ''
    },

    title: {
      type: String,
      value: '标题'
    },

    tips: {
      type: String,
      value: ''
    },

    navigateType: {
      type: String,
      value: 'right'
    },

    border: {
      type: String,
      value: 'b-b'
    },

    hoverClass: {
      type: String,
      value: 'cell-hover'
    },

    iconColor: {
      type: String,
      value: '#333'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
