/*包含多个用于生成新的state的reducer函数的模块*/
import { combineReducers } from 'redux'

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
import { setPath } from '../utils/index'

const initUser = {
  username: '', //用户名
  type: '', //用户类型
  msg: '', //错误信息提示
  redirectTo: '', //需要自动重定向的路由路径
  friend:[]
}
// 产生user状态的reducer
function user (state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      const { type, header } = action.data
      console.log(type, header)
      return { ...action.data, redirectTo: setPath(type, header) }
    case ERROR_MSG:
      return { ...state, msg: action.data }
    case RECEIVE_MSG: //data是user
      return action.data
    case RESET_USER: // data是msg
      return { ...initUser, msg: action.data }
      case RECEIVE_SUBSCRIPTION:
        return {...state,msg:action.data}
      case RECEIVE_MATCH:
        console.log(action.data)
        let to1=action.data.to
        state.friend.push(to1)
        console.log( {...state,msg:action.data})
        return  {...state,msg:action.data.msg}

    default:
      return state
  }
}

const initUserList = []
// 产生userlist状态的reducer
function userlist (state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USERLIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  users: {}, //所有用户信息的对象
  chatMsgs: [], //当前用户所有相关msg的数组
  unReadCount: 0 //消息未读的总数量
}
//  产生聊天状态的reducer
function chatMsgList (state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST: //data ：{users,chaMsgs}
      const { users, chatMsgs,userId } = action.data  //reduce reduce函数是一个累加器，
      return { users, chatMsgs, unReadCount: chatMsgs.reduce((preTotal,msg)=>preTotal+(!msg.read&&msg.to===userId?1:0),0) }
    case RECEIVE_MSG_ONE: // 返回的data：chatMsg
      const {chatMsg} = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount+(!chatMsg.read&&chatMsg.to===action.data.userId?1:0)
      }
    case READ_MSG:
      const {count,from,to} = action.data
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg=>{
          if (msg.from===from&&msg.to===to&&!msg.read) {  //需要更新read的状态
            return {...msg,read:true}
          }else{ // 不需要更新
            return msg
          }
        }),
        unReadCount: state.unReadCount-count
      }
    default:
      return state
  }
}
const initStory = {
  username: '', 
  type: '',
  content: '', 
  tag: '' ,
  Img:'',
  location:'',
  time:'',
}
// produce a reducer for user
function story(state = initStory, action) {
  switch (action.type) {
    case RECEIVE_STORYLIST: //data is story
      return action.data

    default:
      return state
  }
}
const initProduct = []
function product(state = initProduct, action) {
  switch (action.type) {
    case RECEIVE_PRODUCTLIST: //data is product
      // console.log(action.data)
      return action.data
    default:
      return state
  }
}

//return the combined lambda
export default combineReducers({ user, userlist, chatMsgList,story,product })
