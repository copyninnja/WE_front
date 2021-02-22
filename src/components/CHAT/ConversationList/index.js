import React, {Component} from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import axios from 'axios';
import Moment from 'moment'
import { connect } from 'react-redux'

import './ConversationList.css';

// 对chatMsgs根据chat_id进行分组，并得到每个组的lastmsg组成的数组
/**
 * 1、找出每个聊天的lastMsg，并用一个对象勇气来保存{chat_id:lastMsg}
 * 2、得到所有lastMsg的数组
 * 3、对数组进行排序（按create_time降序)
 * @param {*} chatMsgs
 */
function getLastMsgs (chatMsgs, userId) {
  const lastMsgObjs = {}
  chatMsgs.forEach(msg => {
    // 对msg进行个体统计  (别人发给我的，而且还说我没有读的消息)
    if (msg.to === userId && !msg.read) {
      msg.unReadCount = 1
    } else {
      msg.unReadCount = 0
    }
    const chatId = msg.chat_id
    const lastMsg = lastMsgObjs[chatId]
    if (!lastMsg) {
      //当前msg就是所在组的lastMsg
      lastMsgObjs[chatId] = msg
    } else {
      // 累加UnReadCount=已经统计的+当前msg的
      const unReadCount = lastMsg.unReadCount + msg.unReadCount
      //如果msg比lastMsg晚，就将msg保存为lastMsg
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg
      }
      // 将UnReadCount保存最新的lastMsg上
      lastMsgObjs[chatId].unReadCount = unReadCount
    }
  })
  // 得到所有的lastMsg组成的数组
  const lastMsgs = Object.values(lastMsgObjs)
  // 对数组进行排序（按照create_time）
  lastMsgs.sort(function (m1, m2) {
    //如果结果小于0，将m1放在前面，如果结果为0，保持不变，如果大于0，m2放在前面
    return m1.create_time - m2.create_time
  })

  return lastMsgs
}
class ConversationList extends Component{

  render () {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    // 对chatMsgs根据chat_id进行分组
    const lastLists = getLastMsgs(chatMsgs, user._id)

//  const getConversations = () => {
//     axios.get('https://randomuser.me/api/?results=20').then(response => {
//         let newConversations = response.data.results.map(result => {
//           return {
//             photo: result.picture.large,
//             name: `${result.name.first} ${result.name.last}`,
//             text: 'Hello world! This is a long message that needs to be truncated.'
//           };
//         });
//         setConversations([...conversations, ...newConversations])
//     });
//   }

    return (
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[
            <ToolbarButton key="cog" icon="ion-ios-cog" />
          ]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <ConversationSearch />
        {
          lastLists.map(msg => {
            // 得到目标用户的id
            const fromTime = Moment(msg.create_time).format('HH:mm');
            const targetUserId = msg.to === user._id ? msg.from : msg.to;
            // 得到目标用户的信息
          const targetUser = users[targetUserId]
          if (msg.unReadCount > 99) {
            msg.unReadCount = 99 + '+'
          }
          return (
            <ConversationListItem
              time={fromTime}
              key={msg._id}
              targetId={targetUserId}
              name={targetUser.username}
              data={msg.content}
              header={targetUser.header}
              count={msg.unReadCount}
            />
          )
          }
          )
        }
      </div>
    );
}
}
export default connect(
  state => ({ user: state.user, chat: state.chatMsgList }), {})(ConversationList)