import React from "react";
import { withStyles } from "@material-ui/core";
import City from "./City";
import './Itinerary.css';
import Map from "./Map";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {addMsg, deleteMsg, selectMsg} from "../actions";
import Redirect from "react-router-dom/es/Redirect";
import Collapsible from "react-collapsible";
import { changeView, renderLocation, getCurrentItineraryID,saveItinerary} from '../actions';
import './Itinerary.css';
import './Iteneraries.css';
import Dates from "./Dates";
import axios from "axios";


class Itineraries extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
        console.log(this.props.authentication.loginStatus );
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
                <Collapsible className="cityDiv" key={country.name} trigger={
                    <div>
                        <h1>{country.name}</h1>
                        <Dates place={country} class={"dates"} type={"country"}/>
                    </div>
                }>

                {this.props.cities.filter(function(city){
                    return city.countryID == country.id;
                }).map(function(city,index){
                    return (<div key={index} className="stripe item-font" onClick={() => this.props.changeView(country,city)}>{city.name}</div>)
                },this)
                }
            </Collapsible>
            )
        }
        return content;
    }

    render() {
        const { classes } = this.props;
        console.log(this.props.locations);
        return(
            <React.Fragment>
            <div className={classes.bg}>
                <div className={classes.leftPanel}>
                    <div className= {"top-panel"}>
                    <Map />
                    </div>
                </div>
                <div className={`${classes.rightPanel} ${classes.table}`}>
                {//this.renderItinerary()}
                }
                    <City />
                </div>
            </div>
                <div><Navbar/></div>
            </React.Fragment>

        );
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
        authentication: state.authentication
    }; //now it will appear as props
};

const muiStyles = {
    bg: {
        position: "absolute",
        backgroundImage: `url(${require("../assets/vancouver.jpg")})`,
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        top: "0",
        left: "0",
        color: "#000000",
        fontSize: "30px"
    },
    rightPanel: {
        position: "absolute",
        // height: "100vh",
        left: "50vw",
        width: "50vw"
    },
    leftPanel: {
        position: "absolute",
        //height: "100vh",
        width: "50vw",
        top: "6vh"
    },
    table: {
        top: "14vh"
    }
};


export default connect(mapStateToProps, { addMsg, selectMsg, deleteMsg, changeView, renderLocation, getCurrentItineraryID, saveItinerary })(withStyles(muiStyles)(Itineraries));