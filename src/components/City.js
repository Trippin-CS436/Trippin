import React from "react";
import { withStyles } from "@material-ui/core";
import Location from "./Location";

export default class City extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dateRanges : ["2020/08/20 - 2020/08/22"],
            locations : [{location: "Roger's Arena", address: "800 Griffiths Way, Vancouver, BC V6B 6G1"},
                {location: "Playland", address: "2901 E Hastings St, Vancouver, BC V5K 5J1"},
                {location: "Science World", address: "1455 Quebec St, Vancouver, BC V6A 3Z7"},
                {location: "Stanley Park", address: " Vancouver, BC V6G 1Z4"},
                {location: "Capilano Suspension Bridge", address: "3735 Capilano Rd, North Vancouver, BC V7R 4J1"},
                ],
        };
    }
    render() {
        return(
            <div>
                <h3>{this.props.cityName}</h3>
                <div className={"datesDiv"}>
                    <ul>
                        {this.state.dateRanges.map((date,index) => (
                            <li key={index}>{date}</li>
                        ))}
                    </ul>
                </div>
                <div className={"locationsDiv"}>
                    <ul>
                        {this.state.locations.map((loc,index) => (
                            <li key={index}> <Location name={loc.location} address={loc.address}/></li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
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