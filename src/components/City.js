import React from "react";
import Location from "./Location";
import './Iteneraries.css';
import {connect} from 'react-redux';
import Dates from "./Dates";


class City extends React.Component {
    constructor(props){
        super(props);
        this.state = {
        };
    }
    render() {
        //Empty locations/cities. render a 'guide' on how to add to itinerary
        if (this.props.currentView.byID.city === -1) {
            return (
                <h1>START ADDING TO THE ITINERARY BY SEARCHING A LOCATION AND HITTING
                THE 'ADD LOCATION' BUTTON</h1>);
        }
        let cityToRenderID = this.props.currentView.byID.city;
        let cityToRender = this.props.cities.filter(function(city){
            return city.id === cityToRenderID;
        });
        cityToRender = cityToRender[0];

        let countryToRenderID = cityToRender.countryID;
        let countryToRender = this.props.countries.filter(function(country){
            return country.id === countryToRenderID;
        });
        countryToRender = countryToRender[0];

        let locationsToRender = this.props.locations.filter(function(loc){
            return loc.cityID === cityToRenderID;
        });
        return(
            <div className={"cityDiv"}>
                <h2>{cityToRender.name}, {countryToRender.name}</h2>
                <Dates place={cityToRender} class={"datesDiv bottomBorder"} type={"city"}/>
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
        currentView: state.currentView,
        cities: state.cities,
        countries: state.countries
    };
};

export default connect(mapStateToProps)(City);
//
// const muiStyles = {
//     bg: {
//         position: "absolute",
//         backgroundImage: `url(${require("../assets/vancouver.jpg")})`,
//         backgroundSize: "cover",
//         height: "100vh",
//         width: "100vw",
//         top: "0",
//         left: "0",
//         color: "#000000",
//         fontSize: "30px"
//     }
// };

// export default withStyles(muiStyles)(City);