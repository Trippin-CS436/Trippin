import React from "react";

export default class Info extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            locName: "",
            locAddress: "",
            locHours: [new Date(),  new Date()],
            locPhoneNum: "",
            locWebsite: "",
            locReviews: [],
        };
    }

    componentDidMount() {
        this.setState({
            locName: this.props.location.name, 
            locAddress: this.props.location.address,
            locHours: this.props.location.hours,
            locPhoneNum: this.props.location.phn,
            locWebsite: this.props.location.website,
            locReviews: this.props.location.Reviews
          });
    }
    

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
          this.setState({
            locName: this.props.location.name, 
            locAddress: this.props.location.address,
            locHours: this.props.location.hours,
            locPhoneNum: this.props.location.phn,
            locWebsite: this.props.location.website,
            locReviews: this.props.location.Reviews
          });
        }
      }

    render() {
        return(
            <div className={"mainInfo"}>
                <h2>Location Information</h2>
                <ul>
                    <li>Name: {this.state.locName}</li>
                    <li>Address: {this.state.locAddress}</li>
                    <li>Hours Open: {this.state.locHours}</li>
                    <li>Phone number: {this.state.locPhoneNum}</li>
                </ul>
            </div>
        )
    }
}

