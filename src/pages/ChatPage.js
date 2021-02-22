import Messenger from '../components/CHAT/Messenger';
import React, { Component }   from "react";
import { connect } from 'react-redux'



class ChatPage extends Component{


    render(){
        console.log(this.props)
        return(
            <div className="App">
            <Messenger/>
            </div>
        )

    }
}

export default connect(
    state => ({ user: state.user, unReadCount: state.chatMsgList.unReadCount }),
    {  }
  )(ChatPage)