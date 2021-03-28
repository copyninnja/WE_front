import React , {Component}from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import { sendMsg } from '../../../redux/actions'
import { connect } from 'react-redux';
  class  MessengerCompose extends Component{
    render(){
    return (
      <div className="App">

    <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList />
        </div>

        <div className="scrollable content">
          <MessageList props={this.props}/>
        </div>
      </div>
      </div>
    );
}
  }   
  export default connect(state => ({ user: state.user, chat: state.chatMsgList }, { sendMsg })) (MessengerCompose)