import React from "react";
import './Iteneraries.css';
import Notes from "./Notes";
import {connect} from "react-redux";
import {deleteLocation} from "../actions";
import './Location.css';

class Location extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showNotes: false
        };
        this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
    }

    handleEditBtnClick() {
        this.setState({
            showNotes: !this.state.showNotes
        })
    }

    renderSubComp(){
       if (this.state.showNotes) {
           const currLoc = this.props.locations[this.props.idx];
           console.log(currLoc);
         return <Notes location={this.props.locations} idx={this.props.idx}/>
        }
       else{
           return null;
       }
    }

    render() {

        return(
            <div>
            <div className="location-bar">
                <label className={"location"}>{this.props.name} </label>
                <label className={"address"}> {this.props.address}</label>
                <div className={"buttonDiv"}>
                    <button className={"btn"} name="Edit" onClick={this.handleEditBtnClick}>Edit</button>
                    <button className={"btn"} onClick={() => this.props.deleteLocation(this.props.id)}>Delete</button>
                </div>
            </div>
            <div className="display-notes">
            {this.renderSubComp()}
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

export default connect(mapStateToProps, {deleteLocation})(Location);
