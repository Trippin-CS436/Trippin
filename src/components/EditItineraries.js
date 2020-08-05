import React from "react";
import { withStyles } from "@material-ui/core";
import City from "./City";
import './Itinerary.css';
import Map from "./Map";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {addMsg, deleteMsg, selectMsg} from "../actions";
import { Redirect } from "react-router-dom"
import Collapsible from "react-collapsible";
import {
    changeView,
    renderLocation,
    getCurrentItineraryID,
    saveItinerary,
    itineraryNameChange,
    deleteCountry, deleteCity, deleteLocation, renderCity, renderCountry, setItineraryFromDB
} from '../actions';
import './Itinerary.css';
import './Iteneraries.css';
import Dates from "./Dates";
import axios from "axios";
import { withRouter } from "react-router";
import Itinerary from "./Itinerary";
import LocationButton from "./LocationButton";
import SaveButton from "./SaveButton";
import "./Lists.css";
import "./Expandable.css"
import {useParams} from "react-router-dom";
import { resetMap } from '../actions/resetMap';

class Itineraries extends React.Component {
    constructor(props){
        super(props);
        this.props.changeView(-1);
        this.state = {
            id: this.props.match.params.id,
            invalidID: false,
            itineraryID: this.props.editItineraryID
        };
       // console.log(this.props.authentication.loginStatus );
        console.log(this.props.match.params.id);
    }

    componentDidMount(){
        this.props.resetMap();
        // get the itinerary id
        console.log(this.state.id);
        if (!this.props.authentication.itineraries.includes(this.state.id)){
            this.setState({invalidID:true});
            return;
        }
        axios.get("http://localhost:9000/itinerary/" + this.state.id)
            .then(response => {
                if(response.data.length > 0){
                    console.log(response.data);
                    this.props.renderLocation(response.data[0].locations);
                    this.props.renderCity(response.data[0].cities);
                    this.props.renderCountry(response.data[0].countries);
                    this.props.getCurrentItineraryID(response.data[0]._id);
                    this.props.saveItinerary({id: response.data[0].id});
                    this.props.setItineraryFromDB(response.data[0].itinerary);
                    if(response.data[0].cities.length >= 1){
                        this.props.changeView(response.data[0].cities[0].id)
                    }
                    else{
                        this.props.changeView(-1)
                    }
                } else {
                    this.props.renderLocation([]);
                }
        })
            .catch(err => console.log("Err" + err));
        console.log("GOT HERE!!!!");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("Component did update");
    }



    render() {
        if (this.state.invalidID){
            return (<Redirect to="/userprofile"/>)
        }
        const { classes } = this.props;
        console.log(this.props.locations);
        return(
            <div className={classes.bg + " bgScroll"} >
                <React.Fragment>
                    <div><Navbar/></div>
                    <div>
                        <div className={classes.leftPanel}>
                            <div className= {"top-panel"}>
                                <Itinerary />
                                <div className={classes.bottomPanel}>
                                    <div style={{marginTop: 5}}>
                                        <SaveButton/>
                                    </div>
                                    <Map/>
                                </div>
                            </div>
                        </div>
                        <div className={`${classes.rightPanel} ${classes.table}`}>
                            <City />
                        </div>
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

const dispatch = {
    changeView,
    renderLocation,
    renderCity,
    renderCountry,
    getCurrentItineraryID,
    saveItinerary,
    itineraryNameChange,
    deleteCity,
    deleteCountry,
    deleteLocation,
    setItineraryFromDB,
    resetMap
};
export default connect(mapStateToProps, dispatch)(withStyles(muiStyles)(Itineraries));
