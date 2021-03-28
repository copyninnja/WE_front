import React, {useEffect} from 'react';
import shave from 'shave';
import { Badge } from 'antd';
import { Link } from "react-router-dom";
import {Component }from 'react';
import './ConversationListItem.css';
import { connect } from 'react-redux'
import { readMsg } from '../../../redux/actions'

class ConversationListItem extends Component {
  // onClick={readMsg(this.props.targetId, this.props.userId)}
  constructor () {
    super()
  }
  read(){
    this.props.readMsg(this.props.targetId,this.props.userId )
    this.setState({count:0})
  }
render(){
  shave('.conversation-snippet', 20);
    const  photo = require(`../../../assets/images/${this.props.header}`)
    return (
      <Link to={`/chat/${this.props.targetId}`} onClick={() =>this.read() }>
      <div className="conversation-list-item" >
       <Badge count={this.props.count}>
        <img className="conversation-photo" src={photo} alt="conversation" />
        </Badge>
          <div className="conversation-info">
          <h1 className="conversation-title">{ this.props.name }</h1>
          <p className="conversation-snippet">{ this.props.data }</p>
        </div>
        <p className="conversation-time">{this.props.time}</p>       
      </div>
      </Link>
    );
}
}

export default connect(
  state => ({ user: state.user, chat: state.chatMsgList }),
  {readMsg}
)(ConversationListItem)