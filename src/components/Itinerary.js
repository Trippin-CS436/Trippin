import React from "react";
import { connect } from 'react-redux';
import { changeView } from '../actions';
import "./Lists.css";
import './Itinerary.css';
import Collapsible from "react-collapsible";
import "./Expandable.css"
import City from "./City";
import Map from "./Map";
import LocationButton from "./LocationButton";


class Itinerary extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    renderItinerary() {
        const content = [];
        const locations = this.props.locations;
        for (const country of this.props.countries) {
            content.push(
                <Collapsible trigger={
                    <div>
                    <h1>{country.name}</h1>
                    <div className={"dates"}>
                        <ul className={"zeroPad zeroMarg"}>
                            {country.dateRanges.map((date,index) => (
                                <li key={index}>{date}</li>
                            ))}
                        </ul>
                    </div>
                    </div>
                }>

                {this.props.cities.filter(function(city){
                    return city.countryID == country.id;
                }).map(function(city,index){
                    return (<div className="stripe item-font" onClick={() => this.props.changeView(country,city,locations)}>{city.name}</div>)
                },this)
                }
            </Collapsible>
            )
        }
        return content;
    }

    render() {
        return (
            <React.Fragment>
                <h1>{this.props.itinerary.name}</h1>
                {this.renderItinerary()}
                <City/>
                <LocationButton/>
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


export default connect(mapStateToProps, {changeView })(Itinerary);
