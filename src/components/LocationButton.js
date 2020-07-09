import {addLocation} from "../actions";
import React from "react";
import {connect} from "react-redux";
const { uuid } = require('uuidv4');

class LocationButton extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <button className={"addLocationButton"} onClick={this.addLocationToItinerary.bind(this)}>Add Location</button>
        )
    }
    addLocationToItinerary() {
        let currentMapLocation = this.props.mapLocation;

        let city = currentMapLocation.Area;
        let address = currentMapLocation.Address;
        let country = currentMapLocation.Country;
        let location = currentMapLocation.Name;

        if(this.props.countries.map(item => item.name).includes(country)){
            if(this.props.cities.map(item => item.name).includes(city)){
                let cityID = this.props.cities.filter((item) => {return item.name == city})[0].id;
                console.log(cityID);
                if(!this.props.locations.map(item => item.location).includes(location)){
                    let locationID = uuid();
                    this.props.addLocation(locationID,location,address,cityID);
                    console.log("valid location");
                    console.log(this.props.locations);
                }
            }
        }
    }
}

const mapStateToProps = (state) =>{
    return {
        mapLocation: state.mapLocation,
        cities: state.cities,
        countries: state.countries,
        locations: state.locations,
    };
};

export default connect(mapStateToProps,{addLocation})(LocationButton);