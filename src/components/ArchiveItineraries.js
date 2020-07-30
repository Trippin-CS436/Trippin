import React from "react";
import Location from "./Location";
import './Iteneraries.css';
import {connect} from 'react-redux';
import Dates from "./Dates";
import Collapsible from "react-collapsible";
import axios from "axios";

class Archive extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            // locations: this.props.itineraries.locations;
        };
    }

    componentDidMount() {
        axios.get("http://localhost:6000/archive/")
        .then(response => {
        if(response.data.length > 0){
            this.props.itineraries(response.data);
            this.props.renderLocation(response.data[0].locations);
            this.props.getCurrentItineraryID(response.data[0]._id);
            this.props.saveItinerary({id: response.data[0].id});
        } else {
            this.props.renderLocation([]);
        }
    })
    }


    componentWillUpdate(prevProps) {
        if (prevProps.locations !== this.props.locations) {
            this.setState({
                ...this.state,
                locations: this.props.locations
            })
        }
    }

    renderItinerary = () => {
        const content = [];
        const locations = this.props.locations;
        for (const country of this.props.countries) {
            content.push(
                <Collapsible className="cityDiv" key={country.name} trigger={
                    <div>
                        <h3>{country.name}</h3>
                        <Dates place={country} class={"date"} type={"country"}/>
                    </div>
                }>

                {this.props.cities.filter(function(city){
                    return city.countryID == country.id;
                }).map(function(city,index){
                    return (<div key={index}  onClick={() => this.props.changeView(country,city)}>{city.name}</div>)
                },this)
                }
            </Collapsible>
            )
        }
        return content;
    }

    render() {

        let cityToRenderID = this.props.currentView.byID.city;
        let cityToRender = this.props.cities.filter(function(city){
            return city.id == cityToRenderID;
        });
        cityToRender = cityToRender[0];

        let countryToRenderID = this.props.currentView.byID.country;
        let countryToRender = this.props.countries.filter(function(country){
            return country.id == countryToRenderID;
        });
        countryToRender = countryToRender[0];

        let locationsToRender = this.props.locations.filter(function(loc){
            console.log("REnder CITY",loc.location);
            return loc.cityID === cityToRenderID;
        });

        

        return (
            <div className={"cityDiv"}>
                <h2>{this.props.itinerary.name}</h2>
                <Dates place={cityToRender} class={"datesDiv"} type={"city"}/>
                <div className={"locationsDiv"}>
                    <ul className={"zeroPad zeroMarg"}>
                        {locationsToRender.map((loc,index) => (
                            <li key={index}> <Location idx={index} name={loc.location} address={loc.address} id={loc.id}/></li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) =>{
    return {
        itineraries: state.itineraries,
        itinerary: state.itinerary,
        currentView: state.currentView,
        cities: state.cities,
        countries: state.countries,
        lists: state.lists,
        msgId: state.msgId,
    };
};

export default connect(mapStateToProps)(Archive);
