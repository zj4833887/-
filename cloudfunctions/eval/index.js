// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  switch (event.fn) {
    //删除文件
    case 'del_file':
     return del_file(event);
    //获取openid
    case 'get_openid':
      return wxContext.OPENID
    //抽奖
    case 'get_lottery':
      return get_lottery();
    case 'add_lottery_sub':
      return add_lottery_sub(event);
    case 'add_lottery':
      return add_lottery(event);
    case 'update_lottery':
        return update_lottery(event);
    //课程
    case 'add_course':
      return add_course(event);
    case 'update_course':
      return update_course(event);
    //分类
    case 'add_category':
      return add_category(event);
    case 'update_category':
      return update_category(event);
      //轮播图管理
    case 'update_rotation':
      return update_rotation(event)
      case 'shenfenzheng':
      return shenfenzheng(event)
    case 'update_order':
      return update_order(event)
      case 'set_admin':
        return set_admin(event)
    default:
      break;
  }
}
async function set_admin(event){
  return await db.collection('user')
  .doc(event.data._id)
  .update({
    data:{
      is_admin:event.data.is_admin
    }
  })
}
async function update_order(event){
  return await db.collection('order')
  .doc(event._id).update({
    data:event.data
  })
}
//身份证照片
async function shenfenzheng(event) {
  try {
    const result = await cloud.openapi.ocr.idcard({
      type: 'photo',
      imgUrl: event.data
    })
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
async function update_rotation(event){
  return await db.collection('rotation').doc(event._id)
  .update({
    data:event.data
  })
}
async function update_category(event){
  return await db.collection('category').doc(event._id)
  .update({
    data:event.data
  })
}
async function add_category(event){
  return await db.collection('category').add({
    data:event.data
  })
}
async function del_file(event){
  const fileIDs = [event.url]
  const result = await cloud.deleteFile({
    fileList: fileIDs,
  })
  return result.fileList
}
async function add_course(event){
  return await db.collection('course')
  .add({
    data:event.data
  })
}
async function update_course(event){
  return await db.collection('course')
  .doc(event._id).update({
    data:event.data
  })
}
async function update_lottery(event){
  return await db.collection('lottery')
  .doc(event._id).update({
    data:event.data
  })
}
async function add_lottery(event) {
  return await db.collection('lottery').add({
    data: event.data
  })
}
async function add_lottery_sub(event) {
  return await db.collection('lottery_sub').add({
    data: event.data
  })
}
async function get_lottery() {
  return await db.collection('lottery').where({
    status: 1
  }).get()
}
