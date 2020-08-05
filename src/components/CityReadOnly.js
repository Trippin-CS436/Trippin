import React from "react";
import './Iteneraries.css';
import {connect} from 'react-redux';
import Collapsible from "react-collapsible";
import LocationReadOnly from "./LocationReadOnly";
import DatesReadOnly from "./DatesReadOnly";


class CityReadOnly extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            locations: this.props.locations
        };
    }


    componentDidUpdate(prevProps) {
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
                        <DatesReadOnly place={country} class={"date"} type={"country"} {...this.props}/>
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
        //Empty locations/cities. render a 'guide' on how to add to itinerary
        if (this.props.currentView.byID.city === -1 ) {
            return (
                <div className={"cityDiv"}>
                    <h3>SELECT A COUNTRY AND CITY TO BROWSE</h3>
                </div>
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
            console.log("REnder CITY",loc.location);
            return loc.cityID === cityToRenderID;
        });

        

        return (
            <div className={"cityDiv"}>
                <h2>{cityToRender.name}, {countryToRender.name}</h2>
                <DatesReadOnly place={cityToRender} class={"datesDiv bottomBorder"} type={"city"} {...this.props}/>
                <div className={"locationsDiv"}>
                    <ul className={"zeroPad zeroMarg"}>
                        {locationsToRender.map((loc,index) => (
                            <li key={index}> <LocationReadOnly idx={index} name={loc.location} address={loc.address} id={loc.id}/></li>
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

export default connect(mapStateToProps)(CityReadOnly);
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