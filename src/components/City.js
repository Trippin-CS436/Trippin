import React from "react";
import Location from "./Location";
import './Iteneraries.css';
import {connect} from 'react-redux';
import Dates from "./Dates";
import Collapsible from "react-collapsible";
import SaveButton from "./SaveButton";


class City extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            locations: this.props.locations
        };
    }


    componentWillUpdate(prevProps) {
        if (prevProps.locations !== this.props.locations) {
            this.setState({
                ...this.state,
                locations: this.props.locations
            })
        }
    }


    render() {
        //Empty locations/cities. render a 'guide' on how to add to itinerary
        if (this.props.currentView.byID.city === -1 || this.props.currentView.byID.city === 0) {
            return (
                <div className={"cityDiv"}>
                    <h3>START ADDING TO THE ITINERARY BY SEARCHING A LOCATION AND HITTING
                    THE 'ADD LOCATION' BUTTON</h3>
                </div>
            );
        }
        console.log('City to Render ID', this.props.currentView);
        let cityToRenderID = this.props.currentView.byID.city;
        let cityToRender = this.props.cities.filter(function(city){
            return city.id == cityToRenderID;
        });
        cityToRender = cityToRender[0];
        console.log('City to Render: ', cityToRender);
        let countryToRenderID = cityToRender.countryID;
        let countryToRender = this.props.countries.filter(function(country){
            return country.id == countryToRenderID;
        });
        countryToRender = countryToRender[0];

        let locationsToRender = this.props.locations.filter(function(loc){
            return loc.cityID === cityToRenderID;
        });

        

        return (
            <div className={"cityDiv"}>
            <SaveButton />
                <h2>{cityToRender.name}, {countryToRender.name}</h2>
                <div className={"bottomBorder"}>
                    <Dates place={cityToRender} class={"datesDiv"} type={"city"}/>
                </div>
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
        locations: state.locations,
        itinerary: state.itinerary,
        currentView: state.currentView,
        cities: state.cities,
        countries: state.countries,
        lists: state.lists,
        msgId: state.msgId,
    };
};

export default connect(mapStateToProps)(City);