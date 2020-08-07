import React from "react";
import {connect} from "react-redux";
import axios from 'axios'; 
import {saveItinerary, getCurrentItineraryID, updateUserItinerary} from "../actions"
import { copyArchived } from "../actions/copyArchived";
import {reset} from "../actions/reset";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {Redirect} from "react-router";
import { withRouter } from "react-router";
const { uuid } = require('uuidv4');

class CopyItinerary extends React.Component {

    constructor(props){
        super(props);
    }


    copyItinerary = () => {
        let copiedLocations = [];
        for (const location of this.props.locations) {
            let copiedLocation = {
                ...location,
                id: uuid(),
                userPhotos: []
            };
            copiedLocations.push(copiedLocation);
        }
        console.log(this.props.countries);
        console.log(this.props.cities);
        this.props.copyArchived({
            cities: this.props.cities,
            countries: this.props.countries,
            locations: copiedLocations
        });
        this.props.history.push('/itineraries');
    };


    render() {
        return (
            <div>
            <button className={"submit-button save-button"} onClick={() => this.copyItinerary()}>{this.props.buttonTitle}</button>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        currentItinerary: state.currentItinerary,
        locations: state.locations,
        cities: state.cities,
        countries: state.countries,
        currentItineraryID: state.currentItineraryID,
        itinerary: state.itinerary,
        authentication: state.authentication,
        copyItinerary: state.copyItinerary
    };
};

export default connect(mapStateToProps, {updateUserItinerary,reset, saveItinerary,getCurrentItineraryID, copyArchived})(withRouter(CopyItinerary));