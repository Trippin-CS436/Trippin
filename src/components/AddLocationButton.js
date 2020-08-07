import React from "react";
import { connect }  from 'react-redux';
import './AddLocationButton.css';
import {addLocation, changeView, insertNewCity, insertNewCountry} from "../actions";

const { uuid } = require('uuidv4');



class AddLocationButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            mapLocation: this.props.mapLocation,
            class: "submit-button state-0"
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mapLocation !== this.props.mapLocation) {
            this.setState({
                mapLocation: this.props.mapLocation,
            })
        }
    }

    handleButtonClick = () => {
        this.addLocationToItinerary();
        this.updateButtonMsg();
        this.props.handleDialogClose();
    }


    addLocationToItinerary = () => {
        let isCitiesEmpty = (this.props.cities.length === 0) ? true : false
        let newCityAdded = false;
        let currentMapLocation = this.props.mapLocation;

        let city = currentMapLocation.Area;
        let cityID = uuid();

        let address = currentMapLocation.Address;
        let country = currentMapLocation.Country;
        let location = currentMapLocation.Name;
        let info = currentMapLocation.Info;
        let lat = currentMapLocation.lat;
        let lon = currentMapLocation.lon;
        // get the Url Photos;


        if (info === undefined) {
            info = {placeWebsite: 'NOT AVAILABLE',
        placeReviews: [],
    placePhotos: [],
    placePhoneNumber: 'NOT AVAILABLE',
    placeRating: null,
    placeTypes: [],
    placeStatus: '',
    placePhotoUrls: []
    };
        }

        if (country === "" || (country !== "" && city === "" && address !== country)){
            alert("Unable to add that location to your itinerary!")
            return;
        }

        if(this.props.countries.map(item => item.name).includes(country)){
            if(this.props.cities.map(item => item.name).includes(city)){
                //Country and City exist in itinerary
                let cityID = this.props.cities.filter((item) => {return item.name === city})[0].id;
                if(!this.props.locations.map(item => item.location).includes(location)){
                    let locationID = uuid();
                    let newLocation = {
                        id: locationID,
                        location: location,
                        address: address,
                        info: info,
                        notes: '',
                        userPhotos: [],
                        cityID: cityID,
                        lat: lat,
                        lon: lon,
                    }
                    newCityAdded = true;
                    this.props.addLocation(newLocation);
                }
            }
            // Country exists but city doesn't
            //New city to add
            else {
                let countryID = this.props.countries.filter((item) => {return item.name === country})[0].id;
                //New City to add
                if (city !== ""){
                    newCityAdded = true;
                    this.props.insertNewCity(cityID,city,countryID)
                    //New Location to add
                    if (city !== location){
                        let locationID = uuid();
                        let newLocation = {
                            id: locationID,
                            location: location,
                            address: address,
                            info: info,
                            notes: '',
                            userPhotos: [],
                            cityID: cityID,
                            lat: lat,
                            lon: lon,
                        }
                        this.props.addLocation(newLocation);
                    }
                }
            }
        }
        else {
            // No country and no city found
            //New Country to add
            let countryID = uuid();
            //New City to add
            if (city !== ""){
                newCityAdded = true
                this.props.insertNewCity(cityID,city,countryID);
                //New Location to add
                if (city !== location){
                    let locationID = uuid(); 
                    let newLocation = {
                        id: locationID,
                        location: location,
                        address: address,
                        info: info,
                        notes: '',
                        userPhotos: [],
                        cityID: cityID,
                        lat: lat,
                        lon: lon,
                    };
                    this.props.addLocation(newLocation);
                }
            }
            this.props.insertNewCountry(countryID,country);
        }
        if (isCitiesEmpty && newCityAdded){
            this.props.changeView(cityID);
        }
    }



     
    updateButtonMsg = () => {
    this.setState({
        ...this.state,
        class: this.state.class + ' state-1 animated'});
    
    setTimeout(this.finalButtonMsg, 2000);
  };
  
    finalButtonMsg = () => {
        this.setState({
            ...this.state,
            class: this.state.class + ' state-2'});
    
    setTimeout(this.setInitialButtonState, 2000);
  };
  
    setInitialButtonState = () => {
        this.setState({
            ...this.state,
            class: "submit-button state-0" });
    
  };
  

    render() {

       return(
            <div>
                {
                    React.createElement('div', { className: this.state.class,  onClick: this.handleButtonClick },  
                    React.createElement('span', {className: "pre-state-msg" }, "Add"), 
                    React.createElement('span', {className: "current-state-msg hide" }, "......."),
                    React.createElement('span', {className: "done-state-msg hide" }, "Added") ) 
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        mapLocation: state.mapLocation,
        cities: state.cities,
        countries: state.countries,
        locations: state.locations,
    }
}

export default connect(mapStateToProps, {changeView,addLocation,insertNewCountry,insertNewCity})(AddLocationButton); 



