import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {connect} from "react-redux";
import {Avatar} from "@material-ui/core";
import {Link} from "react-router-dom";
import {logOut} from "../actions";
import './NavBar.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minWidth: 10
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        height: "4px",
        bachgroundColor: "#000000",
        width: "100%"
    },
    toolBar: {
        background: '#121212',
        top: "-5px",
        width: "100%"

    },
    menu: {
        backgroundColor: '#212121',
        color: 'white'

    }
}));

function Navbar(props) {
    const { authentication } = props;
    const classes = useStyles();
    const [auth, setAuth] = React.useState(authentication.loginStatus);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseAndLogOut = () => {
        setAnchorEl(null);
        props.logOut();
    };
    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolBar}>

                    <div className={"smallIcon"}>
                        <Link to={"/userprofile"}><img src={require("../assets/logo_white.png")}/></Link>
                    </div>
                    {/*<Typography variant="h6" className={classes.title}>*/}

                    {/*</Typography>*/}
                    {auth && (
                        <div className={"avatarImg"}>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <Avatar src={authentication.profilePic} />
                            </IconButton>

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
                                <MenuItem onClick={handleClose}><Link to={"/userprofile"}>Profile</Link></MenuItem>
                                <MenuItem onClick={handleCloseAndLogOut}>Log Out</MenuItem>
                            </Menu>

                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => { //name is by convention
    return {
        authentication: state.authentication
    }; //now it will appear as props
};
export default connect(mapStateToProps,{logOut})(Navbar);