import React from "react";
import { withStyles } from "@material-ui/core";
import City from "./City";
import './Iteneraries.css';
import Map from "./Map";
import Navbar from "./Navbar";

class Itineraries extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const { classes } = this.props;
        return(
            <React.Fragment>
            <div className={classes.bg}>
                <div className={classes.leftPanel}>
                    <Map />
                </div>
                <div className={`${classes.rightPanel} ${classes.table}`}>
                    <City/>
                </div>
            </div>
                <div><Navbar/></div>
            </React.Fragment>

        );
    }
}

const muiStyles = {
    bg: {
        position: "absolute",
        backgroundImage: `url(${require("../assets/vancouver.jpg")})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        top: "0",
        left: "0",
        color: "#000000",
        fontSize: "30px"
    },
    rightPanel: {
        position: "absolute",
        // height: "100vh",
        left: "50vw",
        width: "50vw"
    },
    leftPanel: {
        position: "absolute",
        //height: "100vh",
        width: "50vw",
        top: "6vh"
    },
    table: {
        top: "14vh"
    }
};

export default withStyles(muiStyles)(Itineraries);