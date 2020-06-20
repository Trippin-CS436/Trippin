import React from "react";
import Location from "./Location";
import './Iteneraries.css';
import Notes from "./Notes";
import {deleteLocation} from "../actions";
import {connect} from 'react-redux';


class City extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            notes: new Notes()
        };
    }
    render() {
        let locationsToRenderID = this.props.currentView.byID.locations;
        let locationsToRender = this.props.locations.filter(function(loc){
            return locationsToRenderID.includes(loc.id);
        });
        let cityToRenderID = this.props.currentView.byID.city;
        let cityToRender = this.props.cities.filter(function(city){
            return city.id == cityToRenderID;
        });
        cityToRender = cityToRender[0];
        return(
            <div className={"cityDiv"}>
                <h2>{cityToRender.name}</h2>
                <div className={"datesDiv"}>
                    <ul className={"zeroPad zeroMarg"}>
                        {cityToRender.dateRanges.map((date,index) => (
                            <li key={index}>{date}</li>
                        ))}
                    </ul>
                </div>
                <div className={"locationsDiv"}>
                    <ul className={"zeroPad zeroMarg"}>
                        {locationsToRender.map((loc,index) => (
                            <li key={index}> <Location idx={index} name={loc.location} address={loc.address}/></li>
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
        cities: state.cities
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