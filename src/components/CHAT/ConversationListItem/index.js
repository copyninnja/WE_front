import React, {useEffect} from 'react';
import shave from 'shave';
import { Badge } from 'antd';
import { Link } from "react-router-dom";
import {Component }from 'react';
import './ConversationListItem.css';
import { connect } from 'react-redux'

class ConversationListItem extends Component {


render(){
  console.log(this.props)
  shave('.conversation-snippet', 20);
    const  photo = require(`../../../assets/images/${this.props.header}.png`)
    return (
      <div className="conversation-list-item"  onClick={() => this.props.history.push(`/chat/${this.props.targetId}`)}
      >
       <Badge count={this.props.count}>
        <img className="conversation-photo" src={photo} alt="conversation" />
        </Badge>
          <div className="conversation-info">
          <h1 className="conversation-title">{ this.props.name }</h1>
          <p className="conversation-snippet">{ this.props.data }</p>
        </div>
        <p className="conversation-time">{this.props.time}</p>
        
      </div>
    );
}
}

export default connect(
  state => ({ user: state.user, chat: state.chatMsgList }),
  {}
)(ConversationListItem)