import React ,{Component} from 'react';
import './Compose.css';
import { sendMsg, readMsg } from '../../../redux/actions'
import { connect } from 'react-redux';
import {Row,Col} from 'antd';
import { Popover, Button } from 'antd';


class Compose extends Component{
  state = {
    content: '',
    isShow: true //是否显示表情列表
  }
  componentWillMount () {
    this.emojis = [
      '😶',      '😪',      '😔',      '😎',      '😲',      '😳',      '❤',      '😰',      '😈',      '👿',      '💀',      '💋',      '👋',
      '👌',      '👆',      '👈',      '👉',      '👇',      '👍',      '👊',      '👀',      '💪',      '👦',      '👧',
      '🎅',      '🏃',      '🌂',      '👣',      '👙',      '👠',      '💄',      '🎒',      '👓',      '☂️',      '👯',
      '👕',      '👰',      '👮',      '🙋',      '👴',      '🙌',      '👏'    ]
    this.emojis = this.emojis.map(value => ({ text: value }))
  }
      // 点击发送消息
      send = () => {
        const from = this.props.props.props.props.user._id
        const to = this.props.props.props.props.match.params.userId
        const content = this.state.content.trim()
        if (content) {
          sendMsg({ from, to, content })
          this.setState({ content: '' })
        }
      }
  render(){

    let headerList=[]
    let row;
    for (let i = 0; i < 4; i++) {
      row=[];
      for(let j = 0; j < 8; j++){
      row.push((this.emojis[i*8+j]))    
    }
     headerList.push(row) 
  }
  console.log(headerList)
    return (   
      <div className="compose">
                   <Popover content={headerList.map((row, ri) => (
                  <Row key={ri} className="emoji" >
                  {row.map(cellId => <Col span={6} key={cellId.text} id={cellId.text}  onClick={()=>
                this.setState({ content:  this.state.content + cellId.text })
              }>{cellId.text}</Col>)}
                   </Row>
                  ))} title="emojis" trigger="click" >
                  <span>😉</span>
                
               </Popover>
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message"
          value={this.state.content}
          onChange={val => {
            this.setState({ content: val.target.value })
          }}
        />             
              <span onClick={() => this.send()}>send</span>


      </div>
    );
}

}
export default connect(state => ({ user: state.user, chat: state.chatMsgList }, { sendMsg, readMsg })) (Compose)