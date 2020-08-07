import React from "react";
import {connect} from "react-redux";
import axios from 'axios'; 
import {saveItinerary, getCurrentItineraryID, updateUserItinerary} from "../actions"
import {reset} from "../actions/reset";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
const { uuid } = require('uuidv4');

class SaveButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            openSaveSuccess: false,
            openSaveError: false,
        };
    }

    handleClose(){
        this.setState({openSaveSuccess: false,openSaveError:false});
    }

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

            };
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
        let itineraries = this.props.authentication.itineraries.slice();
        itineraries.push(Itinerary.id);

        console.log("SAVING NEW ITINERARY")
        console.log(Itinerary);
        this.props.getCurrentItineraryID(Itinerary.id);
        axios.get("/itinerary/exist/"+ Itinerary.id)
            .then(res => {
                console.log("exist worked");
                console.log(res.data);
                if(res.data) {
                    console.log("Going to call patch");
                    console.log(Itinerary);
                    console.log(this.props.currentItineraryID);
                    axios.patch("/itinerary/save/" + this.props.currentItineraryID, Itinerary)
                    .then(res=> {
                        console.log(res.data);
                        this.setState({openSaveSuccess:true});
                    })
                    .catch(err=> {
                        console.log(err);
                        this.setState({openSaveError:true});
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
                                this.setState({openSaveSuccess:true});
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        this.setState({openSaveError:true});
                    })
                }
            })
    }

    render() {
        return (
            <div>
            <button className={"submit-button save-button"} onClick={() => this.saveItinerary()}>Save Itinerary</button>
            <Snackbar open={this.state.openSaveSuccess} autoHideDuration={5000} onClose={this.handleClose.bind(this)}>
                <Alert onClose={this.handleClose.bind(this)} severity="success">
                    {this.props.itinerary.name} has been saved!
                </Alert>
            </Snackbar>
            <Snackbar open={this.state.openSaveError} autoHideDuration={5000} onClose={this.handleClose.bind(this)}>
                <Alert onClose={this.handleClose.bind(this)} severity="error">
                    {this.props.itinerary.name} could not be saved!
                </Alert>
            </Snackbar>
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
    };
};

export default connect(mapStateToProps, {updateUserItinerary,reset, saveItinerary,getCurrentItineraryID})(SaveButton);