import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { GiCalendar, GiDesk, GiChecklist } from "react-icons/gi";
import "./Home.css"

import { connect } from "react-redux";

class Home extends React.Component {
    render = () => {
        return (
            <React.Fragment>
                <div className="bg">
                <Grid container className="container" spacing={2}>
                    <Grid className="item" item xs={12} md={4}>
                        <Button href="/itineraries" className="button_home">
                            <div>
                                <GiCalendar className="icon" />
                                <div className="buttonText">Future Trip Itineraries</div>
                            </div>
                        </Button>
                    </Grid>
                    <Grid className="item" item xs={12} md={4}>
                        <Button href="/archive" className="button_home">
                            <div>
                                <GiDesk className="icon" />
                                <div className="buttonText">Archived Itineraries</div>
                            </div>
                        </Button>
                    </Grid>
                    <Grid className="item" item xs={12} md={4}>
                        <Button href="/lists" className="button_home">
                            <div>
                                <GiChecklist className="icon" />
                                <div className="buttonText">Your lists</div>
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

const mapStateToProps = (state) => { //name is by convention
    return {
        authentication: state.authentication
    }; //now it will appear as props
};
export default connect(mapStateToProps)(Home);