import {addLocation} from "../actions";
import React from "react";
import {connect} from "react-redux";
const { uuid } = require('uuidv4');

class SaveButton extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <button className={"addLocationButton"}>Save Itinerary</button>
        )
    }
}

const mapStateToProps = (state) =>{
    return {

    };
};

export default connect(mapStateToProps)(SaveButton);