import{faUser} from'@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useContext} from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { reserMsg } from '../../redux/actions'
import { connect } from 'react-redux'
import {useSelector, useDispatch} from 'react-redux'
import { Badge } from 'antd';
import{faComments} from'@fortawesome/free-regular-svg-icons'

  const MessageNav =(props)=>  {
    const chatMsgList = useSelector(state => state.chatMsgList)

    const { unReadCount } = chatMsgList
        return (
                <div>
                    <Badge count={unReadCount}>
                    <Link to="/chat">
                    <FontAwesomeIcon
                className="navbar-text text-light head-user"
                icon={faComments}
                size="4x"
            /> 
                     </Link>
                     </Badge>
                    
                     </div>     
           )
        

        };
    

export default MessageNav;