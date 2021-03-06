// 包含多个action creator 异步action 同步action
import io from 'socket.io-client'
import {
  reqRegister,
  reqLogin,
  reqUpdataUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg,
  reqSearchPeo,
  reqStoryList,
  reqSubscribe,
  reqButter,
  reqfindPassword
} from '../api/index'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_MSG,
  RESET_USER,
  RECEIVE_USERLIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG_ONE,
  READ_MSG,
  RECEIVE_STORYLIST,
  RECEIVE_SUBSCRIPTION,
  RECEIVE_MATCH,
  RECEIVE_PRODUCTLIST
} from './action-types'


// 每一个action_types都对应一个同步action
/**
 * 单例对象
 * 1、创建对象之前，判断对象是否已经创建，只有没创建才会创建
 * 2、创建对象之后，保存对象
 */
// 把socket封装成函数
function initIO (dispatch,userId) {
  if (!io.socket) {
    //连接服务器,得到代表连接的socket对象
    io.socket = io('ws://localhost:3000')
    //绑定'receiveMessage'的监听,来接收服务器发送的消息
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log('浏览器端接收到消息:', chatMsg)
      // 只有当chatMsg是当前用户相关的消息，才去dispatch concurrent action保存消息
      if (userId === chatMsg.from || userId === chatMsg.to) {
        dispatch(receiveMsgOne({chatMsg,userId}))
      }
    })
  }
}

// 异步获取消息列表数据
async function getMsgList (dispatch,userId) {
  initIO(dispatch,userId)
  const responsent = await reqChatMsgList()
  const res = responsent.data
  if (res.code === 0) {
    const { users, chatMsgs } = res.data
    // dispatch concurrent action
    dispatch(chat({ users, chatMsgs,userId }))
  }
}

// 授权成功的action
const authSuccess = user => ({
  type: AUTH_SUCCESS,
  data: user
})

// 授权失败的action
const errorMsg = msg => ({
  type: ERROR_MSG,
  data: msg
})
// 接收用户的同步action
const receiveMsg = user => ({
  type: RECEIVE_MSG,
  data: user
})
// 重置用户的同步action
export const reserMsg = msg => ({
  type: RESET_USER,
  data: msg
})
// 接收用户列表的同步action
export const receiveUserList = userlist => ({
  type: RECEIVE_USERLIST,
  data: userlist
})
// 接收消息列表的同步action
const chat = ({ users, chatMsgs ,userId}) => ({
  type: RECEIVE_MSG_LIST,
  data: { users, chatMsgs,userId }
})
// 接收一个消息同步action
const receiveMsgOne = ({chatMsg,userId}) => ({
  type: RECEIVE_MSG_ONE,
  data: {chatMsg,userId}
})
// 
const readMsgs = ({count,from,to}) => ({
  type: READ_MSG,
  data: {count,from,to}
})
//collect story
const receiveStoryList = storylist => ({
  type: RECEIVE_STORYLIST,
  data: storylist
})
// collect subscribe
const receivSubscription = msg => ({
  type: RECEIVE_SUBSCRIPTION,
  data: msg
})
// collect match
const receivMatch = (msg,from,to) => ({
  type: RECEIVE_MATCH,
  data: {msg,to}
})
//collect products
const receiveProductList = productlist => ({
  type: RECEIVE_PRODUCTLIST,
  data: productlist
})

// 注册异步action
export const register = ({username, email, password, password2, type }) => {
  console.log("开始注册")
  // 进行前台表单验证, 如果不合法返回一个同步 action 对象, 显示提示信息
  const rep = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!username || !email || !password || !type) {
    window.alert('you have to enter username, email and password')
    return errorMsg('you have to enter username, email and password')
  }
  if (password !== password2) {
    window.alert('confirm_password incorrect')
    return errorMsg('confirm_password incorrect')

  }
  if(!password.match(rep)){
    window.alert(' password weak, at 6 digits with numbers and alphabet')
    return errorMsg('password weak, at 6 digits with numbers and alphabet')

  }
  
  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await reqRegister({ username, email, password, type })
    const res = response.data
    if (res.code === 0) {
      console.log('注册成功')
      //dispatch successful concurrent action
      getMsgList(dispatch,res.data._id) // 注册成功即登录成功的时候获取消息列表
      dispatch(authSuccess(res.data))
    } else {
      console.log('注册失败')

      //dispatch unsuccessful concurrent action
      window.alert(res.msg)
      dispatch(errorMsg(res.msg))
    }
  }
}

// 登录异步action
export const login = ({email, password }) => {
  if (!email || !password) {
    return errorMsg('you have to input email and password')
  }
  return async dispatch => {
    // 发送注册的异步ajax请求
    const response = await reqLogin({email, password })
    const res = response.data
    if (res.code === 0) {
      //dispatch successful concurrent action
      getMsgList(dispatch,res.data._id) // 登录成功的时候获取消息列表
      // reqfindPassword(res.data.email);
      // console.log(res.data)
      dispatch(authSuccess(res.data))
    } else {
      //dispatch unsuccessful concurrent action
      dispatch(errorMsg(res.msg))
    }
  }
}

// 更新用户action
export const updateUser = user => {
  return async dispatch => {
    const response = await reqUpdataUser(user)
    const res = response.data
    if (res.code === 0) {
      // dispatch successful concurrent action
      dispatch(receiveMsg(res.data))
    } else {
      // dispatch unsuccessful concurrent action
      dispatch(reserMsg(res.msg))
    }
  }
}

// 获取用户的action
export const getUser = () => {
  return async dispatch => {
    const response = await reqUser()
    const res = response.data
    if (res.code === 0) {
      // dispatch successful concurrent action
      getMsgList(dispatch,res.data._id) // 获取用户列表说明已经登录成功的时候获取消息列表
      dispatch(receiveMsg(res.data))
    } else {
      dispatch(reserMsg(res.msg))
    }
  }
}
// 获取用户列表的action
export const getUserList = type => {
  return async dispatch => {
    const response = await reqUserList(type)
    const res = response.data
    if (res.code === 0) {
      // dispatch successful concurrent action
      dispatch(receiveUserList(res.data))
    }
  }
}
// async send message action
export const sendMsg = ({ from, to, content }) => {
    io.socket.emit('sendMsg', { from, to, content })
 
}
// async read action
export const readMsg = (from,to) => {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const res = response.data
    if (res.code === 0) {
      // dispatch successful concurrent action
      const count = res.data
      dispatch(readMsgs({count,from,to}))
    }
  }
}

// fetch user list
export const getXueLiPeo=({type,xueliArrays})=>{
  return async dispatch=>{
    const response=await reqSearchPeo({type,xueliArrays})
    const res=response.data
    if (res.code===0) {
      // dispatch successful concurrent action
      dispatch(receiveUserList(res.data))
    }
  }
}

//fetch nearby story
export const getStory= ({username,location}) =>{
  return async dispatch=>{
    const response=await reqStoryList({username:username,location:location})
    // console.log(response.data)
    const res=response.data
    if (res.code===0) {
      // dispatch successful concurrent action
      dispatch(receiveStoryList(res.data))
    }
  }
}

// SEND SUBSCRIBTION
export const sendSubscribe = ({from,to}) => {
  return async dispatch => {
    const response = await reqSubscribe({from:from,to:to})
    const res = response.data
    console.log(res)
    if (res.code === 0) {
      // dispatch successful concurrent action
      dispatch(receivMatch(res.msg,res.from,res.to));
    } else if(res.code === 1) {
      // dispatch unsuccessful concurrent action
      dispatch(receivSubscription(res.msg))


    };
  }
}

// async get products
export const getProductList =()=> {
  return async dispatch=>{

  const Butter = await reqButter();
  const res =Butter.data.data
  console.log(res)
    // dispatch successful concurrent action
    dispatch(receiveProductList(res))
  
}
}