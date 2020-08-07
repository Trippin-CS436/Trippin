import React from "react";
import {Grid, withStyles} from "@material-ui/core";
import City from "./City";
import './Itinerary.css';
import Map from "./Map";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {addMsg, deleteMsg, selectMsg} from "../actions";
import { Redirect } from "react-router-dom/es/Redirect";
import Collapsible from "react-collapsible";
import { changeView, renderLocation, getCurrentItineraryID,saveItinerary} from '../actions';
import './Itinerary.css';
import './Iteneraries.css';
import Dates from "./Dates";
import axios from "axios";
import { withRouter} from "react-router";
import Itinerary from "./Itinerary";
import LocationButton from "./LocationButton";
import SaveButton from "./SaveButton";
import {useParams} from "react-router-dom";
import {reset} from '../actions/reset';
import {Resizable, ResizableBox} from "react-resizable";
import DragHandleIcon from '@material-ui/icons/DragHandle';
const { uuid } = require('uuidv4');


class NewItineraries extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
       // console.log(this.props.authentication.loginStatus );
    }

    
    componentDidMount() {
        this.props.reset();
        this.props.saveItinerary({id:uuid()})
    }


    render() {
        const { classes } = this.props;
        console.log(this.props.locations);
        return(
            <div className={classes.bg + " bgScroll"} >
                <React.Fragment>
                    <div><Navbar/></div>
                    <div className={'body-background'}>
                        <Resizable resizeHandles={['s']}>
                            <ResizableBox width="100%" height={400} handle={<div className={`custom-handle`}><DragHandleIcon/> </div>}
                                          minConstraints={[0, 0]} maxConstraints={[1000, 1000]}>
                                <Map/>
                            </ResizableBox>
                        </Resizable>
                        <Grid container spacing={0}>
                            <Grid item sm={12} lg={4} style={{marginBottom: '25px'}}>
                                <div>
                                    <Itinerary editName={true} />
                                </div>
                            </Grid>
                            <Grid item sm={12} lg={8}>
                                <City />
                            </Grid>
                        </Grid>
                    </div>
                </React.Fragment>
            </div>
        );
    }
}

//state has entire state of app!!
const mapStateToProps = (state) => { //name is by convention
    return {
        lists: state.lists,
        msgId: state.msgId,
        countries: state.countries,
        cities: state.cities,
        itinerary: state.itinerary,
        locations: state.locations,
        authentication: state.authentication
    }; //now it will appear as props
};

const muiStyles = {
    bg: {
        position: "absolute",
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


export default connect(mapStateToProps, { reset, addMsg, selectMsg, deleteMsg, changeView, renderLocation, getCurrentItineraryID, saveItinerary })(withStyles(muiStyles)(NewItineraries));