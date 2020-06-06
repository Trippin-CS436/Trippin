import React from "react";
import { withStyles } from "@material-ui/core";
import './Iteneraries.css';

export default class Location extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render() {
        return(
            <div>
                <label className={"location"}>{this.props.name} </label>
                <label className={"address"}> {this.props.address}</label>
                <div className={"buttonDiv"}>
                    <button className={"btn"}>Edit</button>
                    <button className={"btn"}>Delete</button>
                </div>
            </div>
        );
    }
}

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
// }

// export default withStyles(muiStyles)(Location);