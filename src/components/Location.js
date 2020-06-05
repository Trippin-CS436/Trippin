import React from "react";
import { withStyles } from "@material-ui/core";

export default class Location extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render() {
        return(
            <div>
                {this.props.name} {this.props.address}
                <button>Edit</button>
                <button>Delete</button>
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