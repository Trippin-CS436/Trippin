import React from "react";
import {connect} from "react-redux";
import axios from 'axios'; 
import {saveItinerary, getCurrentItineraryID, updateUserItinerary} from "../actions"
import {reset} from "../actions/reset";
const { uuid } = require('uuidv4');

class SaveButton extends React.Component {

    saveItinerary = () => {
        let Itinerary = {};
        if (this.props.currentItinerary == null) {
            console.log("Current Itinerary has not been saved yet");
            Itinerary = {
                id: uuid(),
                locations: this.props.locations,
                cities: this.props.cities,
                countries: this.props.countries,
                itinerary: this.props.itinerary,
            }
            this.props.saveItinerary(Itinerary);
        } else {
            Itinerary = {
                id: this.props.currentItinerary.id,
                locations: this.props.locations,
                cities: this.props.cities,
                countries: this.props.countries,
                itinerary: this.props.itinerary,
            };
            this.props.saveItinerary(Itinerary);
        }
        let itineraries = this.props.authentication.itineraries;
        itineraries.push(Itinerary.id);

        //console.log(Itinerary.id);
        this.props.getCurrentItineraryID(Itinerary.id);
        axios.get("/itinerary/exist/"+ Itinerary.id)
            .then(res => {
                console.log("exist worked");
                console.log(res.data);
                if(res.data) {
                    console.log("Going to call patch");
                    console.log(Itinerary);
                    console.log(this.props.currentItineraryID)
                    axios.patch("/itinerary/save/" + this.props.currentItineraryID, Itinerary)
                    .then(res=> {
                        console.log(res.data);
                    })
                    .catch(err=> {
                        console.log(err);
                    })
                } else {
                console.log("Going to call post");
                axios.post("/itinerary/save", Itinerary)
                    .then(res => {
                        console.log("saved new itinerary")
                        axios.patch("/user/save/itineraries/" + this.props.authentication.id, {itineraries:itineraries})
                            .then((res) => {
                                console.log("updating reducers")
                                this.props.updateUserItinerary(itineraries)
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            })
    }

    render() {
        return (
            <button className={"submit-button save-button"} onClick={() => this.saveItinerary()}>Save Itinerary</button>
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
    };
};

export default connect(mapStateToProps, {updateUserItinerary,reset, saveItinerary,getCurrentItineraryID})(SaveButton);