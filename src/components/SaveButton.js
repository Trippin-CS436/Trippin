import React from "react";
import {connect} from "react-redux";
import axios from 'axios'; 
import {saveItinerary} from "../actions"
const { uuid } = require('uuidv4');

class SaveButton extends React.Component {
    constructor(props){
        super(props);

    }

    saveItinerary = () => {
        let Itinerary = {};
        if (this.props.currentItinerary === null) {
            console.log("Current Itinerary has not been saved yet");
            Itinerary = {
                id: uuid(),
                locations: this.props.locations,
                city: this.props.city,
                country: this.props.country,
            }
            this.props.saveItinerary(Itinerary);
        } else {
            Itinerary = {
                id: this.props.currentItinerary.id,
                locations: this.props.locations,
                city: this.props.city,
                country: this.props.country,
            }
            this.props.saveItinerary(Itinerary);
        }

        console.log(Itinerary.id);

        axios.get("http://localhost:9000/itinerary/exist/"+ Itinerary.id)
            .then(res => {
                console.log("exist worked");
                console.log(res.data);
                if(res.data) {
                    console.log("Going to call patch");
                    axios.patch("http://localhost:9000/itinerary/save/" + this.props.currentItineraryID, Itinerary)
                    .then(res=> {
                        console.log(res.data)
                    })
                    .catch(err=> {
                        console.log(err);
                    })
                } else {
                console.log("Going to call post");
                axios.post("http://localhost:9000/itinerary/save", Itinerary)
                    .then(res => {
                        console.log("Itinerary added to db and the Object id is "  + res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    })

                }
            })
        





    }

    render() {
        return (
            <button className={"addLocationButton"} onClick={() => this.saveItinerary()}>Save Itinerary</button>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        currentItinerary: state.currentItinerary,
        locations: state.locations,
        city: state.city,
        country: state.country,
        currentItineraryID: state.currentItineraryID,
    };
};

export default connect(mapStateToProps, {saveItinerary})(SaveButton);