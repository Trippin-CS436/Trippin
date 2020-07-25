import React from "react";
import { withStyles } from "@material-ui/core";
import City from "./City";
import './Itinerary.css';
import Map from "./Map";
import Navbar from "./Navbar";
import Itinerary from "./Itinerary";
import LocationButton from "./LocationButton";
import SaveButton from "./SaveButton";

class Itineraries extends React.Component {

    render() {
        const { classes } = this.props;
        return(
            <React.Fragment>
            <div className={classes.bg}>
                <div className={classes.leftPanel}>
                    <div className= {"top-panel"}>
                        <Itinerary />
                        <div className={classes.bottomPanel}>
                            <LocationButton/>
                            <SaveButton/>
                            <Map/>
                        </div>
                    </div>
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
        width: "50vw",
    },
    leftPanel: {
        position: "absolute",
        //height: "100vh",
        width: "50vw",
        top: "6vh"
    },
    bottomPanel: {
        position: "relative",
        //height: "100vh",
        width: "50vw",
    },
    table: {
        top: "5vh"
    }
};

export default withStyles(muiStyles)(Itineraries);