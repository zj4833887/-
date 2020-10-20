// 云函数入口文件
const cloud = require('wx-server-sdk')
var nodemailer = require('nodemailer')
cloud.init()

const db=cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  let openid=wxContext.OPENID;
  switch (event.fn) {
    case 'get_openid':
      return wxContext.OPENID
    case 'index':
     return index();  
    case 'get_product':
      return get_product(event);
    //设置地址
    case 'add_address':
      return add_address(event,openid);
    case 'update_address':
      return  update_address(event,openid)
    case 'get_address':
      return get_address(openid);
    case 'one_address':
      return one_address(event,openid)
      //创建订单    //发送邮件
    case 'add_order':
        return add_order(event,openid)
    case 'get_order':
      return get_order(event,openid)
      //注册
    case 'add_user':
      return add_user(event,openid)
    case 'get_user':
      return get_user(openid)
    default:
      break;
  }
}
async function get_user(openid){
  let user=await db.collection('user').where({
    openid
  }).get();
  if(user.data.length){
    return {
      user:user.data[0]
    }
  }else{
    return -1;
  }
}

async function add_user(event,openid){
  let user=event.user;
  user.openid=openid;
  user.create_time=new Date().valueOf();
  user.is_admin=1;
  return await db.collection('user').add({
    data:user
  })
}
async function get_order(event,openid){
  let data=event.data;
  let where=data.where
  where.openid=openid
  let reoder_order=await db.collection('order').
  limit(data.limit)
  .skip((data.page-1)*data.limit)
  .where(where).get()
  let order=reoder_order.data;
  let reoder_total=await db.collection('order')
  .where(
    where
  ).count()
  let total=reoder_total.total;
  order.map(v=>{
    let time=v.create_time
    let d=new Date(time);
    let year=d.getFullYear();
    let month=d.getMonth()+1;
    let day=d.getDate();
    let hour=d.getHours();
    let min=d.getMinutes();
    hour=hour<10?'0'+hour:hour;
    min =min<10?'0'+min:min;
    v.create_time=[year,month,day].join('/')+'  '+[hour,min].join(':');
    return v;
  })
  return {
    order,
    total
  }
}
async function add_order(event,openid){
  let data=event.data;
  for(let i=0; i<data.products.length;i++){
     var arr=`<b>商品名称:${data.products[i].name}</b>`
  }
  data.openid=openid;
  data.status=0;
  data.create_time=new Date().valueOf();
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '1093915383@qq.com', // generated ethereal user
      pass: 'flgkddulpdhnghfj', // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: '1093915383@qq.com', // sender address
    to: "1093915383@qq.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html:`<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fff; padding-top: 20px; color: #434245; width: 80%; margin: 60px auto; max-width: 600px; border-radius:8px; border:1px solid lightgray; box-shadow: 2px 2px 5px 1px lightgray; ">
    <tbody><tr>
        <td valign="top" class="sm_full_width" style="margin: 60px auto; width: 600px; display: block;">
            <div class="sm_no_padding">
                <table style="width: 100%; color: #434245;" border="0" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td style="box-sizing: border-box;">
                                <table border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h1 style="font-size: 30px; padding-right: 30px; padding-left: 230px; color: black; font-family: PingFangSC-Medium; ">新订单通知</h1>
                                                <p style="font-size: 17px; padding-right: 30px; padding-left: 60px;"><br class="Apple-interchange-newline">
                                                    <span style="color: rgb(34, 34, 34); font-family: PingFangSC-Light; font-size: 19px; text-align: center;">Hi, 管理员</span>
                                                </p>
                                                <p style="font-size: 17px; padding-right: 30px; padding-left: 60px;">
                                                    <span style="color: rgb(34, 34, 34); font-family: PingFangSC-Light; font-size: 19px;">
                                                    ${data.addressData.name}
                                                    </span>
                                                </p>
                                                <p style="font-size: 17px; padding-right: 30px; padding-left: 60px;">
                                                    <span style="color: rgb(34, 34, 34); font-family: PingFangSC-Light; font-size: 19px;"><span onmouseover="QMReadMail.showLocationTip(this)" class="readmail_locationTip" onmouseout="QMReadMail.hideLocationTip(this)" over="0" style="z-index: auto;">
                                                    ${arr}
                                                    ${data.addressData.addressName}</span></span>
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </td>
        </tr>
        <tr>
            <td class="email_footer" style="padding: 0 30px 15px; border-top: 1px solid #E1E1E4; line-height: 24px; font-size: 15px; color: #A0A0A2; text-align: center; width: 100%;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" align="center" style="margin-top: 20px; background-color: white; color: #989EA6;">
                    <tbody>
                        <tr>
                            <td>
                                <span style="display: block;text-align: center;"><a href="#" style="box-sizing: border-box; color: #888888; text-decoration-line: none; font-family: PingFangSC-Regular; font-size: 14px; line-height: 14px; text-align: center;" rel="noopener" target="_blank">订单管理</a><span style="font-size: 15px; text-align: center;">&nbsp;</span></span>
                            </td>
                        </tr>
                        <tr>
                            <td><a href="#" style="text-decoration-line: none" rel="noopener" target="_blank"><span style="display: block;text-align: center;box-sizing: border-box; color:lightgray; text-decoration-line: none; font-family: PingFangSC-Regular; font-size: 12px; line-height: 14px; text-align: center; margin-top: 8px;">问题反馈</span></a></td>
                        </tr>
                        <tr>
                            <td style="text-align:center;font-size:12px; color:lightgray;padding-top:8px">建议在电脑端打开此页面</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td style="overflow:hidden;">
                <div style="-moz-border-radius: 50px 50px 0 0;-webkit-border-radius: 50px 50px 0 0;border-radius: 70px 70px 0 0; width: 140px; height: 70px; background: #86d4ff; float:left; margin:0 0 -50px 10px; "></div>
                <div style="-moz-border-radius: 50px 50px 0 0;-webkit-border-radius: 50px 50px 0 0;border-radius: 70px 70px 0 0; width: 140px; height: 70px; background: #86d4ff; float:left; margin:0 0 -50px -30px; "></div>
                <div style="-moz-border-radius: 50px 50px 0 0;-webkit-border-radius: 50px 50px 0 0;border-radius: 70px 70px 0 0; width: 140px; height: 70px; background: #86d4ff; float:left; margin:0 0 -50px -30px; "></div>
                <div style="-moz-border-radius: 50px 50px 0 0;-webkit-border-radius: 50px 50px 0 0;border-radius: 70px 70px 0 0; width: 140px; height: 70px; background: #86d4ff; float:left; margin:0 0 -50px -30px; "></div>
                <div style="-moz-border-radius: 50px 50px 0 0;-webkit-border-radius: 50px 50px 0 0;border-radius: 70px 70px 0 0; width: 140px; height: 70px; background: #86d4ff; float:left; margin:0 0 -50px -30px; "></div>
            </td>
        </tr>
    </tbody>
</table>`
  });
  return await db.collection('order').add({
    data
  })
}
async function one_address(event,openid){
  return await db.collection('address').where({
    data:event.data,
    openid
  }).get()
}
async function get_address(openid){
  return await db.collection('address').where({
    openid
  }).limit(100).get()
}
async function update_address(event,openid){
  if(event.data.defaule){
    await db.collection('address').where({
      openid,
      defaule: true
    }).update({
      data: {
        defaule: false
      }
    })
  }
  return await db.collection('address')
  .doc(event._id)
  .update({
    data:event.data
  })
}
async function add_address(event){
  const wxContext = cloud.getWXContext();
  let openid=wxContext.OPENID;
  event.data.openid=openid
  if(event.data.defaule){
    await db.collection('address').where({
      openid,
      defaule: true
    }).update({
      data: {
        defaule: false
      }
    })
  }
  return await db.collection('address').add({
    data:event.data
  })
}
async function get_product(event){
  let product=await db.collection('course').doc(event._id).get();
  return{
    product:product.data
  }
}
async function index(){
 // 分类精选
  let reode_group=await db.collection('course').where({
    status: 1,
    tuan:true
  }).get();
  let category=await db.collection('category').where({
    show:1
  }).get();
  // 精品团购
  let hot_floor=[]
  category=category.data
  for(let i=0;i<category.length;i++){
    let v=category[i];
    let reode_arr=await db.collection('course').where({
      category:v._id
    }).get();
    v.course=reode_arr.data
     hot_floor.push(v)
  }
  let group=reode_group.data;
  //轮播图
  let reode_rotation=await db.collection('rotation').get()
  let rotation=reode_rotation.data
  return {
    carousel:[],
    cate:[],
    lottery:[],
    seckill:[],
    group:group,
    hot_floor:hot_floor,
    guess:[],
    rotation:rotation
  }
}