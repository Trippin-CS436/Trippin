import React from "react";
import {connect} from 'react-redux';
import Popup from "reactjs-popup";


class Dates extends React.Component{

    render() {
        let datesComponent = <ul className={"zeroPad zeroMarg"}>
            {this.props.place.dateRanges.map((date,index) => (
                <li key={index}>{date.start + " - " + date.end}</li>
            ))}
        </ul>
        return(
            <div className={this.props.class}>

                <Popup className="widthFix" trigger={datesComponent} modal>
                    {close => (
                        <div className="modal" style={{color: "black"}}>
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            Hello World!
                        </div>
                    )}
                </Popup>
            </div>

        );
    }
}

const mapStateToProps = (state) =>{
    return {
        locations: state.locations,
        currentView: state.currentView,
        cities: state.cities,
        countries: state.countries
    };
};

export default connect(mapStateToProps)(Dates);