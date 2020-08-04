import * as React from "react";
import './NotFound.css'
export default class NotFound extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <div className={"bg404"}>
                    <h1 className={"NotFound"}>404 Page Not Found</h1>
                    <div className={"smallIcon"}><img src={require("../assets/trippin-logo.png")}></img></div>
                </div>
            </div>
        );
    }
}