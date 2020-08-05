import * as React from "react";
import './NotFound.css'
import {Link} from "react-router-dom";
export default class NotFound extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div className={"bg404"}>
                    <h1 className={"NotFound"}>404 Page Not Found</h1>
                    <div className={"smallIcon404"}>
                        <Link to={"/userprofile"}>
                            <img src={require("../assets/trippin-logo.png")}></img>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}