import React from "react";
import { connect }  from 'react-redux';
import './AddLocationButton.css';
import { addLocation } from "../actions/addLocation";

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
    }



    addLocationToItinerary = () =>{
        console.log('Adding Location to Itinerary');
        let currentMapLocation = this.props.mapLocation;

        let city = currentMapLocation.Area;
        let country = currentMapLocation.Country;
        let location = currentMapLocation.Name;

        if(this.props.countries.map(item => item.name).includes(country)){
            if(this.props.cities.map(item => item.name).includes(city)){
                let cityID = this.props.cities.filter((item) => {return item.name == city})[0].id;
                console.log(cityID);
                if(!this.props.locations.map(item => item.location).includes(location)){
                    this.props.addLocation({
                        id: uuid(),
                        location: this.props.mapLocation.Name,
                        address: this.props.mapLocation.Address,
                        cityID: 0,
                        info: this.props.mapLocation.Info,
                        notes: ""
                    });
                    console.log("valid location");
                    console.log(this.props.locations);
                }
            }
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

export default connect(mapStateToProps, {addLocation})(AddLocationButton); 



