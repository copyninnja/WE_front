import{faUser} from'@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useContext} from "react";
import { Link } from "react-router-dom";

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { AuthContext } from '../../contexts/authContext';


const HeaderUser = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const context = useContext(AuthContext);

        const open = Boolean(anchorEl);

        const handleMenu = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };
        const handleSignOut = () => {
            context.signout();
            setAnchorEl(null);
        };

        // return console.log(context.isAuthenticated === true);
        return !context.isAuthenticated ?(
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
                <MenuItem data-cy="SignOut" onClick={handleSignOut}>SignOut</MenuItem>
                        </Menu>
            </div>
      );
        

};

export default HeaderUser; 