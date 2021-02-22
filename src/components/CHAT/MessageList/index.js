import React, {Component} from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import { sendMsg, readMsg } from '../../../redux/actions'
import { connect } from 'react-redux';
import './MessageList.css';

const MY_USER_ID='1'
class  MessageList extends Component{

  state = {
    content: '',
    isShow: false //是否显示表情列表
  }
  // 第一次render之前的回调
  componentWillMount () {
    this.emojis = [
      '😶',      '😪',      '😔',      '😎',      '😲',      '😳',      '❤',      '😰',      '😈',      '👿',      '💀',      '💋',      '👋',
      '👌',      '👆',      '👈',      '👉',      '👇',      '👍',      '👊',      '👀',      '💪',      '👦',      '👧',
      '🎅',      '🏃',      '🌂',      '👣',      '👙',      '👠',      '💄',      '🎒',      '👓',      '☂️',      '👯',
      '👕',      '👰',      '👮',      '🙋',      '👴',      '🙌',      '👏'    ]
    this.emojis = this.emojis.map(value => ({ text: value }))
    console.log(this.props);

    // console.log(this.emojis)
  }

  // 保证列表自动滑动到底部
  componentDidMount () {
    // 初始化显示列表
    window.scrollTo(0, 1000)
    // 发送请求更新消息的未读状态
  }
  componentWillUnmount () {
    const readId = this.props.match.params.userId //接收消息的用户id
    const userId = this.props.user._id // 自己的id
    this.props.readMsg(readId, userId)
  }

  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, 1000000)
  }
    // 点击发送消息
    send = () => {
      const from = this.props.user._id
      const to = this.props.match.params.userId
      const content = this.state.content.trim()
      if (content) {
        this.props.sendMsg({ from, to, content })
        this.setState({ content: '' })
      }
    }
    // 点击显示表情列表
    toggleShow = () => {
      const isShow = !this.state.isShow
      this.setState({ isShow })
      if (isShow) {
        // 异步手动触发resize事件，解决表情列表显示的bug
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, 0)
      }
    }
 
   getMessages = {
     id: 1,
     author: 'apple',
     message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
     timestamp: new Date().getTime()
   }
   
 

   renderMessages = (messages) => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === MY_USER_ID;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;
        
        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }
    return tempMessages;
  }

render () {
  const { user } = this.props
    // 我自己的头像
    const myIcon = user.header
      ? require(`../../../assets/images/${user.header}.png`).default
      : null
    const { users, chatMsgs } = this.props.chat
    // 计算当期聊天的chatId
    const meId = user._id
    if (!users[meId]) {
      //如果没有获取到数据，直接什么显示都不展示
      return null
    }
    const targetId = this.props.match.params.userId
    const chatId = [meId, targetId].sort().join('_') //生成当前聊天的chat_id  然后和后台保存的chat_id进行比较，过滤用户
    // 展示当前用户的消息 需要对chatMsgs进行过滤
    // console.log('this.props.chat',this.props.chat);
    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)
    console.log('msgs',msgs);

    // 得到目标对象的头像
    const { header, username } = users[targetId]
    const targetIcon = header
      ? require(`../../../assets/images/${header}.png`).default
      : null

    return(
      <div className="message-list">
        <Toolbar
          title={username}
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">{this.renderMessages(msgs)}</div>

        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      </div>
    );
}
}
export default connect(state => ({ user: state.user, chat: state.chatMsgList }, { sendMsg, readMsg })) (MessageList)