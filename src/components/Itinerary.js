import React from "react";
import { connect } from 'react-redux';
import { changeView, renderLocation, getCurrentItineraryID,saveItinerary,itineraryNameChange} from '../actions';
import './Itinerary.css';
import './Iteneraries.css';
import Collapsible from "react-collapsible";
import City from "./City";
import Map from "./Map";
import SaveButton from "./SaveButton";
import LocationButton from "./LocationButton";
import Dates from "./Dates";
import axios from "axios";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from '@material-ui/icons/Save';
import { TextField } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

class Itinerary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            editItinerary: false,
            name: this.props.itinerary.name,
        };
    }

    componentDidMount(){
        axios.get("http://localhost:9000/itinerary/")
            .then(response => {
            if(response.data.length > 0){
                this.props.renderLocation(response.data[0].locations);
                this.props.getCurrentItineraryID(response.data[0]._id);
                this.props.saveItinerary({id: response.data[0].id});
            } else {
                this.props.renderLocation([]);
            }
        })
            .catch(err => console.log("Err" + err));
        console.log("GOT HERE!!!!");
    }


    renderItinerary() {
        const content = [];
        const locations = this.props.locations;
        for (const country of this.props.countries) {
            content.push(
                <Collapsible key={country.name} trigger={
                    <div>
                        <div>
                            <h1 className={"itinerary_name"}>{country.name}</h1>
                            <IconButton className={"edit-btn"} aria-label="Delete"  name="Delete">
                                <DeleteForeverIcon color="secondary"  onClick={() => console.log("DELETE")}/>
                            </IconButton>
                        </div>
                        <Dates place={country} class={"dates"} type={"country"}/>
                    </div>
                }>

                {this.props.cities.filter(function(city){
                    return city.countryID === country.id;
                }).map(function(city,index){
                    return (
                        <div key={index} className="stripe item-font relativeDiv" onClick={() => this.props.changeView(country,city)}>
                            {city.name}
                            <div className={"buttonDivDelete"}>
                                <IconButton  aria-label="Delete"  name="Delete">
                                    <DeleteForeverIcon color="secondary"  onClick={() => console.log("DELETE")}/>
                                </IconButton>
                            </div>

                        </div>
                    )
                },this)
                }
            </Collapsible>
            )
        }
        return content;
    }
    handleEditItineraryName(){
        if (!this.state.editItinerary){
            this.setState({editItinerary: !this.state.editItinerary});
        }
        else{
            //Do other stuff  first
            if (this.state.name.length > 0){
                this.props.itineraryNameChange(this.state.name);
                this.setState({editItinerary: !this.state.editItinerary});
            }
        }
    }
    renderItineraryName(){
        //Itinerary is not being edited
        if (!this.state.editItinerary){
            return (
                <div>
                    <h1 className={"itinerary_name"}>{this.props.itinerary.name}</h1>
                    <IconButton  aria-label="Edit" name="Edit" onClick={this.handleEditItineraryName.bind(this)}>
                        <EditOutlinedIcon className={"edit-btn"}/>
                    </IconButton>
                </div>
            );
        }
        else{
            return(
                <div id={"itinerary-div"}>
                    <TextField id="filled-basic"
                               label="New Itinerary Name"
                               variant="outlined"
                               error ={this.state.name.length === 0 ? true : false }
                               helperText={this.state.name.length === 0 ? "Itinerary name cannot be empty!" : "" }
                               defaultValue={this.props.itinerary.name}
                               inputProps={{
                                   style: {
                                       fontSize: "2.5em",
                                       fontWeight: "bold",
                                   }}} // font styling of input text
                               onChange={this.handleNameChange.bind(this)}/>
                    <IconButton  aria-label="Edit" name="Edit" onClick={this.handleEditItineraryName.bind(this)}>
                        <SaveIcon className={"edit-btn"}/>
                    </IconButton>
                </div>
            );
        }
    }
    handleNameChange(event){
        this.setState({
            name: event.target.value,
        });
    }
    render() {

        return (
            <React.Fragment>
                {this.renderItineraryName()}

                <Dates place={this.props.itinerary} class={"dates itinerary_dates"} type={"itinerary"}/>
                {this.renderItinerary()}
                <City/>
                <LocationButton/>
                <SaveButton/>
                <Map className={"map"}/>
            </React.Fragment>
        )
    }

}

//state has entire state of app!!
const mapStateToProps = (state) => { //name is by convention
    return {
        lists: state.lists,
        msgId: state.msgId,
        countries: state.countries,
        cities: state.cities,
        itinerary: state.itinerary,
        locations: state.locations,
    }; //now it will appear as props
};


export default connect(mapStateToProps, {changeView, renderLocation, getCurrentItineraryID,saveItinerary,itineraryNameChange})(Itinerary);
