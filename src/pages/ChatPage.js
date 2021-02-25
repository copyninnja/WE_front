import MessengerCompose from '../components/CHAT/MessengerCompose';
import React, { Component }   from "react";
import { connect } from 'react-redux'



class ChatPage extends Component{


    render(){
        return(
            <div className="App">
            <MessengerCompose props={this.props}/>
            </div>
        )

    }
}

export default connect(
    state => ({ user: state.user, chat: state.chatMsgList }),
    {}
  )(ChatPage)