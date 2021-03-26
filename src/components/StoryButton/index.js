
import React, { useEffect,useState,useRef } from "react";

import {useSelector, useDispatch} from 'react-redux'
import {sendSubscribe} from '../../redux/actions';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { Modal } from 'antd';

const StoryButton = (username) => {
        const [disabled, setDisabled] = useState(false);
        const user = useSelector(state => state.user)
        const story = useSelector(state => state.story)
        const dispatch = useDispatch()
        const firstUpdate = useRef(true);
        const subscribe = (toUser) => {
            const from = user.username
            const to = toUser.username
            if (to != "anonymose") {
              // this.props.sendMsg({ from, to, content })
              // this.setState({ content: '' })
              dispatch(sendSubscribe({from:from, to:to}))
            }
            setDisabled(!disabled);
          }
          useEffect(() => {
            if (firstUpdate.current) {
              firstUpdate.current = false;
              return;
            } else {
              countDown(user.msg)
            }
          }, [user]);

          const countDown=(msg)=> {
            let secondsToGo = 5;
            const modal = Modal.success({
              title: msg,
              content: `This modal will be destroyed after ${secondsToGo} second.`,
            });
            const timer = setInterval(() => {
              secondsToGo -= 1;
              modal.update({
                content: `This modal will be destroyed after ${secondsToGo} second.`,
              });
            }, 1000);
            setTimeout(() => {
              clearInterval(timer);
              modal.destroy();
            }, secondsToGo * 1000);
          }

        return disabled?(
            <Button disabled variant="contained" color="secondary" key='list-vertical-star-o' onClick={(e) => subscribe(username)}><AddIcon className="fa fa-plus-circle"/>subscribed successfully</Button>

        ):(
            <Button variant="contained" color="secondary" key='list-vertical-star-o' onClick={(e) => subscribe(username)}><AddIcon className="fa fa-plus-circle"/>subscribe</Button>

        )
        

 };

export default StoryButton;
