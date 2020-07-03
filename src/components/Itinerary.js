import React from "react";
import { connect } from 'react-redux';
import { addMsg, selectMsg, deleteMsg } from '../actions';
import "./Lists.css";
import './Itinerary.css';
import Collapsible from "react-collapsible";
import "./Expandable.css"
import City from "./City";
class Itinerary extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        };
    }

    renderItinerary() {
        const content = [];
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
                    return (<div className="stripe" onClick={() => console.log(index)}>{city.name}</div>)
                })
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
    }; //now it will appear as props
};


export default connect(mapStateToProps, { addMsg, selectMsg, deleteMsg })(Itinerary);
