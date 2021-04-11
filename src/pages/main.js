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
import {getStory} from '../redux/actions';
import NewspaperPage from'./NewsPaperPage';
import MinePage from './MinePage';
class Main extends Component {
  constructor () {
    super()
    this.state = {
      props:{longti:'',lat:''}
    }
  }

  componentWillMount () {
    const userId = Cookies.get('userId')
    if (userId && !this.props.user._id) {
      this.props.getUser()
      
    }

  }



  render () {


    const userId = Cookies.get('userId')

    if (!userId) {

      return <Redirect to={'/login'} />
    }

    if (!this.props.user._id) {
      return null
    } else {
      
      let path = this.props.location.pathname
      if (path == '/'){
        console.log(this.props.user)
    
      path = setPath(this.props.user.type, this.props.user.header)

      }


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
          <Route path='/chat/:userId' component={ChatPage}/>
          <Route path="/news" component={NewspaperPage}/>
          <Route path="/profile" component={MinePage}/>

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
