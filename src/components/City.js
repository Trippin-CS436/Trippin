import React from "react";
import Location from "./Location";
import './Iteneraries.css';
import {connect} from 'react-redux';
import Dates from "./Dates";
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
                null
            );
        }

        let cityToRenderID = this.props.currentView.byID.city;
        let cityToRender = this.props.cities.filter(function(city){
            return city.id == cityToRenderID;
        });

        cityToRender = cityToRender[0];

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
                <div>
                        <SaveButton />
                        <h2 className={'h2-name'}>{cityToRender.name}, {countryToRender.name}</h2>

                </div>
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