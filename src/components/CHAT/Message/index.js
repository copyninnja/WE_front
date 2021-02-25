import React from 'react';
import moment from 'moment';
import './Message.css';
import { Badge } from 'antd';

export default function Message(props) {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp,
      targetIcon,
      myIcon
    } = props;
    console.log(props)
    const friendlyTimestamp = moment(data.create_time).format('LLLL');
    const photo=isMine?myIcon:targetIcon;
    return isMine?(
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        } 
        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            { data.content }
          </div>
          <Badge >
        <img className="photo" src={photo} alt="conversation" />
        </Badge>
        </div>
      </div>
    ):(
      <div className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`
      ].join(' ')}>
        {
          showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
        } 
        <div className="bubble-container">
        <Badge >
        <img className="photo" src={photo} alt="conversation" />
        </Badge>
          <div className="bubble" title={friendlyTimestamp}>
            { data.content }
          </div>
        </div>
      </div>
    )
}