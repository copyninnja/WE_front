import React , {Component}from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
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
          <MessageList />
        </div>
      </div>
      </div>
    );
}
  }
  export default (MessengerCompose)