import React from "react";
import { connect } from 'react-redux';
import {
    changeView,
    renderLocation,
    getCurrentItineraryID,
    saveItinerary,
    itineraryNameChange,
    deleteCountry, deleteCity, deleteLocation, renderCity, renderCountry, setItineraryFromDB
} from '../actions';
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/Delete';
import DialogTitle from '@material-ui/core/DialogTitle';

class Itinerary extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            editItinerary: false,
            name: this.props.itinerary.name,
            openDialog: false,
            idToDelete: null,
            deletionIsCountry: false,
            nameOfDeletion: null,
        };
    }

    componentDidMount(){
        axios.get("http://localhost:9000/itinerary/")
            .then(response => {
            if(response.data.length > 0){
                console.log(response.data)
                this.props.renderLocation(response.data[0].locations);
                this.props.renderCity(response.data[0].cities);
                this.props.renderCountry(response.data[0].countries);
                this.props.getCurrentItineraryID(response.data[0]._id);
                this.props.saveItinerary({id: response.data[0].id});
                this.props.setItineraryFromDB(response.data[0].itinerary);
                if(response.data[0].cities.length >= 1){
                    this.props.changeView(response.data[0].cities[0].id)
                }
                else{
                    this.props.changeView(-1)
                }
            } else {
                this.props.renderLocation([]);
            }
        })
            .catch(err => console.log("Err: " + err));
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
                                <DeleteForeverIcon color="secondary"
                                                   onClick={(event) => {this.handleDialogOpen(country,true);event.stopPropagation();}}/>
                            </IconButton>
                        </div>
                            <Dates place={country} class={"dates"} type={"country"}/>
                    </div>
                }>

                {this.props.cities.filter(function(city){
                    return city.countryID === country.id;
                }).map(function(city,index){
                    return (
                        <div key={index} className="stripe item-font relativeDiv" onClick={() => this.props.changeView(city.id)}>
                            {city.name}
                            <div className={"buttonDivDelete"}>
                                <IconButton  aria-label="Delete"  name="Delete">
                                    <DeleteForeverIcon color="secondary"  onClick={(event) => {this.handleDialogOpen(city,false);event.stopPropagation();}}/>
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
                <div className={"itineraryHeader"}>
                    <h1 className={"itinerary_name"}>{this.props.itinerary.name}</h1>
                    <IconButton  className={"edit-btn"} aria-label="Edit" name="Edit" onClick={this.handleEditItineraryName.bind(this)}>
                        <EditOutlinedIcon />
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
    renderDeleteConfirmation() {
        let placeType = this.state.deletionIsCountry ? "country" : "city"

        let deletionMessage = "Are you sure you want to delete the "
            + placeType + " '"+ this.state.nameOfDeletion+"' from '" +
            this.props.itinerary.name + "' ?";
        return (<Dialog
            open={this.state.openDialog}
            onClose={this.handleClose.bind(this)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{deletionMessage}</DialogTitle>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={this.deleteFromItinerary.bind(this)}
                >
                    Delete
                </Button>
                <Button onClick={this.handleClose.bind(this)} variant="contained" color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>)
    }

    handleClose(){
        this.setState({openDialog: false});
    }
    handleDialogOpen(place,isCountry){
        // stopBubbling(this.event);
        this.setState({
            openDialog: true,
            idToDelete: place.id,
            deletionIsCountry: isCountry,
            nameOfDeletion: place.name,});
    }
    deleteFromItinerary(){
        let countries = this.props.countries;
        let cities = this.props.cities;
        let citiesReference = this.props.cities;
        let locations = this.props.locations;
        console.log(this.state.deletionIsCountry)
        if (this.state.deletionIsCountry){
            //cascade deletes to every city and location in delete country
            cities = cities.filter((item) => item.countryID === this.state.idToDelete);
            console.log(cities)
            for (const city of cities){
                //Find a new city to display
                if (city.id === this.props.currentView.byID.city){
                    let cityToDisplayIndex = this.props.cities.findIndex((item) => {
                        return city.id !== item.id;
                    });
                    //No city left to display
                    if(cityToDisplayIndex === -1 || countries.length === 1)
                        this.props.changeView(-1);
                    else
                        this.props.changeView(this.props.cities[cityToDisplayIndex].id);
                }
                this.props.deleteCity(city.id);
                locations = locations.filter((item) => item.cityID === city.id);
                for (const location of locations){
                    this.props.deleteLocation(location.id);
                }
            }
            //Delete the country at the end of deleting cities and locations it contains
            this.props.deleteCountry(this.state.idToDelete);
        }
        //Delete button hit for city, cascade deletions to locations and possibly change view
        else{
            //Find a new city to display
            if (this.state.idToDelete === this.props.currentView.byID.city){
                let cityToDisplayIndex = cities.findIndex((item) => {
                    return this.state.idToDelete !== item.id;
                });
                if(cityToDisplayIndex === -1)
                    this.props.changeView(-1);
                else
                    this.props.changeView(cities[cityToDisplayIndex].id);
            }
            this.props.deleteCity(this.state.idToDelete);
            locations = locations.filter((item) => item.cityID === this.state.idToDelete);
            for (const location of locations){
                this.props.deleteLocation(location.id);
            }

        }
        this.handleClose();
    }

    render() {

        return (
            <React.Fragment>
                {this.renderItineraryName()}
                <div className={"itineraryHeader"}>
                    <Dates place={this.props.itinerary} class={"dates itinerary_dates"} type={"itinerary"}/>
                </div>
                {this.renderItinerary()}
                {/*<City/>*/}
                {/*<LocationButton/>*/}
                {/*<SaveButton/>*/}
                {/*<Map className={"map"}/>*/}
                {this.renderDeleteConfirmation()}
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
        currentView: state.currentView,
    }; //now it will appear as props
};
function stopBubbling(evt){
    evt.stopPropagation();
    evt.cancelBubble = true;
}

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
export default connect(mapStateToProps, dispatch )(Itinerary);
