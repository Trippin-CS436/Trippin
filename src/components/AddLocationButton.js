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
        this.addNewLocation(this.props.mapLocation);
        this.updateButtonMsg();
    }

    addNewLocation = () => {
        this.props.addLocation({
            id: uuid(),
            location: this.props.mapLocation.Name,
            address: this.props.mapLocation.Address,
            cityID: 0,
            info: this.props.mapLocation.info,
            notes: ""
        });
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
        mapLocation: state.mapLocation
    }
}

export default connect(mapStateToProps, {addLocation})(AddLocationButton); 



