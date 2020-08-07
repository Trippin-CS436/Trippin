import React, { Component } from 'react'
import ItineraryReadOnly from './ItineraryReadOnly';
import CityReadOnly from './CityReadOnly';
import axios from "axios";
import {
    changeView,
    renderLocation,
    getCurrentItineraryID,
    saveItinerary,
    itineraryNameChange,
    deleteCountry, deleteCity, deleteLocation, renderCity, renderCountry, setItineraryFromDB
} from '../actions';
import {connect} from "react-redux";
import {Redirect, Route} from "react-router";
import {Grid} from "@material-ui/core";
import Navbar from "./Navbar";

class SharePage extends Component {
        constructor(props){
            super(props);
            this.props.changeView(-1);
            this.state = {
                id: this.props.match.params.id,
                invalidID: false,
            };
            // console.log(this.props.authentication.loginStatus );
            //console.log(this.props.match.params.id);
        }

        componentDidMount(){
            console.log("Component is mounted");
            console.log(this.state.id);
            axios.get("/itinerary/share/" + this.state.id)
                .then(response => {
                    if(response.data){
                        this.props.renderLocation(response.data.locations);
                        this.props.renderCity(response.data.cities);
                        this.props.renderCountry(response.data.countries);
                        this.props.getCurrentItineraryID(response.data._id);
                        this.props.saveItinerary({id: response.data.id});
                        this.props.setItineraryFromDB(response.data.itinerary);
                        if(response.data.cities.length >= 1){
                            this.props.changeView(response.data.cities[0].id)
                        }
                        else{
                            this.props.changeView(-1)
                        }
                    } else {
                        this.props.renderLocation([]);
                    }
                })
                .catch(err => {
                    console.log("invalid ID given");
                    this.setState({invalidID: true});
                });
        }

    render() {
        if (this.state.invalidID){
            return (
                <Redirect to="/404-Page-Not-Found"/>
            );
        }
        return (
            <React.Fragment>
            <Navbar />
            <div  style={{marginTop:"40px",height:"100%"}}>
            <Grid container spacing={0} style={{height:'100%'}} >
                <Grid item xs={12} md={4} >
                    <div>
                        <ItineraryReadOnly {...this.props}/>
                    </div>
                </Grid>
                <Grid item xs={12} md={8}>
                    <CityReadOnly {...this.props}/>
                </Grid>
            </Grid>
            </div>
            </React.Fragment>
        )
    }
}
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
};

export default connect(mapStateToProps, dispatch )(SharePage);
