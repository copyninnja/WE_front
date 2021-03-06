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
import { colors } from '@material-ui/core';

const HeaderUser = (props) => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const user = useSelector(state => state.user)
        const dispatch = useDispatch()
        const open = Boolean(anchorEl);
        const handleMenu = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };
        const handleSignOut = () => {
          //清除cookie中的userId
          Cookies.remove('userId')
          //重置redux中的user状态

          dispatch(reserMsg())
          setAnchorEl(null);
        };

        // return console.log(context.isAuthenticated === true);
        return user.username=="" ?(
                <div>
                <FontAwesomeIcon
                className="navbar-text text-light head-user"
                icon={faUser}
                size="3x"
                onClick={handleMenu}
            />     
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                
            >
            <Link to="/login">
                <MenuItem  onClick={handleClose} data-cy="SignIn">SignIn</MenuItem> </Link>             
   {/* <MenuItem onClick={handleClose}>Register</MenuItem> */}
                        </Menu>
            </div>
    )
    
    : (
        <div>
                <FontAwesomeIcon
                className="navbar-text text-light"
                icon={faUser}
                size="3x"
                onClick={handleMenu}
            />     
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >   
                <MenuItem ><Link to="/profile"><p>Profile</p></Link></MenuItem>

                <MenuItem data-cy="SignOut" onClick={handleSignOut}>SignOut</MenuItem>
                        </Menu>
            </div>
      );
        

};

export default HeaderUser;
