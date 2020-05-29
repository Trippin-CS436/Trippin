import React from "react";
import { withStyles } from "@material-ui/core";

class Itineraries extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <div className={classes.bg}> Itineraries </div>
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
    }
}

export default withStyles(muiStyles)(Itineraries);