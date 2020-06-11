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
            city: "Vancouver",
            dateRanges : ["2020/08/20 - 2020/08/22"],
            notes: new Notes()
        };
    }
    render() {
        return(
            <div className={"cityDiv"}>
                <h2>{this.props.cityName}</h2>
                <div className={"datesDiv"}>
                    <ul className={"zeroPad zeroMarg"}>
                        {this.state.dateRanges.map((date,index) => (
                            <li key={index}>{date}</li>
                        ))}
                    </ul>
                </div>
                <div className={"locationsDiv"}>
                    <ul className={"zeroPad zeroMarg"}>
                        {this.props.locations.map((loc,index) => (
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