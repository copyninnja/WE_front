import React , {Component}from 'react';
import ConversationList from '../ConversationList';
import './Messenger.css';
  class  Messenger extends Component{

    render(){  
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <ConversationList />
        </div>

        <div className="scrollable content">
        </div>
      </div>
    )
}
  }
  export default  (Messenger)