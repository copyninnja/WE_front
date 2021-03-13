// 封装了很多接口请求的函数模块
// 注册接口
import ajax from './ajax'
export const reqRegister=(user)=>ajax('/api/users/register',user,'POST')

// 登录接口
export const reqLogin=({email,password})=>ajax('/api/users/login',{email,password},"POST")

// 更新用户接口
export const reqUpdataUser=(user)=>ajax('/api/users/update',user,'POST')

// 获取用户信息
export const reqUser=()=>ajax('/api/users')

// 获取用户列表
export const reqUserList=(type)=>ajax('/api/users/userlist',{type:type},"POST")

// 获取当前用户的聊天消息列表
export const reqChatMsgList=()=>ajax('/api/msglist')

// 修改指定消息为已读
export const reqReadMsg=(from)=>ajax('/api/msglist/readmsg',{from},"POST")

// 按需搜索用户
export const reqSearchPeo=({type,xueliArrays})=>ajax('/api/searchPeopel',{type,xueliArrays},"POST")


export const reqWriteStory=(props)=>ajax('/api/nearby',{props},"POST")

export const reqStoryList=(props)=>ajax('/api/nearby/story',{props},"POST")


