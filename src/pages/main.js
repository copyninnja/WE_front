// 注册主界面m组件
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Personalinfo from './personalinfo'
// import MeiNvInfo from '../meinv_info/meinv_info'
// import MeiNv from '../meinv/meinv'
// import ShuaiGe from '../shuaige/shuaige'

// import Message from '../message/message'
import NotFound from '../components/not-found/not-found'
// import NavFooter from '../../components/nav-footer/nav-footer'
// import Chat from '../chat/chat'
// import Search from '../search/search'
import Cookies from 'js-cookie' // 可以操作前端cookie的对象set()/get()/remove()
import { setPath } from '../utils/index'
import { getUser } from '../redux/actions'
import ShopList from '../pages/ShopPage';
import StoryPage from '../pages/StoryPage'
import personalinfo from '../pages/personalinfo'
import organizationinfo from '../pages/organizationinfo';
import ChatPage from './ChatPage';
import Chat from '../components/CHAT/Messenger';
import MAP from './MAP'
import WriteStory from './WriteStoryPage';
import {getStory} from '../redux/actions'
class Main extends Component {
  constructor () {
    super()
    this.state = {
      props:{longti:'',lat:''}
    }
  }

  // 生命周期函数
  componentWillMount () {
    // 曾经登录过（cookie中有userId），但是现在还没登录（reducer中有userId的数据），如果cookie中有userId，发送请求获取对应的user
    const userId = Cookies.get('userId')

    if (userId && !this.props.user._id) {
      // 发送异步请求，获取user
      this.props.getUser()
      
    }

  }
  // componentDidMount(){
  //   if (navigator.geolocation&&this.props.user.username!='') {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       var pos = [
  //         Math.floor(position.coords.longitude*10000000)/10000000,
  //         Math.floor(position.coords.latitude*10000000)/10000000
  //       ];
  //       this.setState({longti:pos[0],lat:pos[1]})
  //       this.props.getStory({username:this.props.user.username,location:pos});
  //       console.log(this.props.user)
  //     });
  // }
  // }


  render () {
    /**
     * 实现自动登录的条件
     * 1、componentDidMount：曾经登录过（cookie中有userId），但是现在还没登录（reducer中有userId的数据），如果cookie中有userId，发送请求获取对应的user
     * 2、render ：如果cookie中没有userid，跳转到登录页面
     * 2.1判断redux管理的user中是否有_id,如果没有，暂时不做处理
     * 2.2如果有_id 说明当前已经登录，显示对应的界面
     * 3、如果已经登录，如果请求的时根目录
     * 根据user的type和header来计算出一个重定向的路由路径，并自动重定向
     *
     */
    //  路由跳转情况1：没有userId，直接跳转到login页面

    const userId = Cookies.get('userId')

    if (!userId) {

      return <Redirect to={'/login'} />
    }
    // 路由跳转情况2：如果没有_id通过生命周期函数去请求用户信息获取用户信息实现自登陆
    // 如果有_id进根据url的地址进行跳转
    if (!this.props.user._id) {
      return null
    } else {
      
      let path = this.props.location.pathname
      if (path == '/'){
        console.log(this.props.user)
      //   if (navigator.geolocation&&this.props.user.username!='') {
      //     navigator.geolocation.getCurrentPosition((position) => {
      //       var pos = [
      //         Math.floor(position.coords.longitude*10000000)/10000000,
      //         Math.floor(position.coords.latitude*10000000)/10000000
      //       ];
      //       this.props.getStory({username:this.props.user.username,location:pos});
      //       console.log(this.props.user)
      //     });
      // }
      path = setPath(this.props.user.type, this.props.user.header)

      }
    //   const { navList } = this
    //   const routePath = this.props.location.pathname
    //   const currentNav = navList.find(nav => nav.path === routePath) //得到当前的nav，可能没有
    //   // 处理底部导航的显示和隐藏
    //   if (currentNav) {
    //     if (this.props.user.type == 'meinv') {
    //       this.navList[0].hide = true
    //     } else {
    //       this.navList[1].hide = true
    //     }
    //   }

      return (
        <div>
          <Switch>
          <Route  path="/personalinfo" component={personalinfo} />
          <Route  path="/organizationinfo" component={organizationinfo} />
          <Route  path="/shop" component={ShopList} />
          <Route  path="/story" component={StoryPage} />
          <Route exact path="/writestory" component={WriteStory} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/MAP" component={MAP} />
          <Route path='/chat/:userId' component={ChatPage}>

          </Route>
        <Redirect to={path} />
          </Switch>

        </div>
      )
    }
  }
}

export default connect(
  state => ({ user: state.user, unReadCount: state.chatMsgList.unReadCount,story:state.story }),
  { getUser,getStory }
)(Main)
