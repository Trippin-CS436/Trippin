import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import { GiCalendar, GiDesk, GiChecklist } from "react-icons/gi";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.bg}>
                <Grid container classname={classes.container} spacing={2}>
                    <Grid className={classes.item} item xs={4}>
                        <Button href="/itineraries" className={classes.button}>
                            <div>
                                <GiCalendar className={classes.icon} />
                                <div className={classes.buttonText}>Future Trip Itineraries</div>
                            </div>
                        </Button>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <Button href="/archive" className={classes.button}>
                            <div>
                                <GiDesk className={classes.icon} />
                                <div className={classes.buttonText}>Archived Itineraries</div>
                            </div>
                        </Button>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <Button href="/withdraw" className={classes.button}>
                            <div>
                                <GiChecklist className={classes.icon} />
                                <div className={classes.buttonText}>Your lists</div>
                            </div>
                        </Button>
                    </Grid>
                </Grid>
            </div>
            </React.Fragment>
        );
    };
}



const muiStyles = {
    bg: {
        position: "absolute",
        backgroundImage: `url(${require("../assets/vancouver.jpg")})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        top: "0",
        left: "0"
    },
    text: {
        color: "#000000",
        fontSize: "30px"
    },
    container: {
        justifyContent: "center",

        padding: "20% 10%",
        width: "100vw",
        height: "100vh"
    },
    item: {
        textAlign: "center"
    },
    button: {
        top: "20vh",
        height: "50vh",
        width: "80%",
        backgroundColor: "#FFFFFF",
        borderTop: "5px solid #2E3B52",
        transition: "transform 0.5s ease-in-out",
        "&:hover": {
            background: "rgba(0, 0, 0, 0.7)",
            transform: "translateY(-3vh);",
            "-ms-transform": "none",
            color: "white"
        },
        boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.2)",
    },
    icon: {
        fontSize: "6em"
    },
    buttonText: {
        fontSize: "1.45em"
    }
};

export default withStyles(muiStyles)(Home);