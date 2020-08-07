import React from "react";
import {connect} from 'react-redux';
import format from 'date-fns/format'
import {startDateChange, endDateChange, deleteDate, addNewDate} from "../actions";
import './Dates.css';



class DatesReadOnly extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            openDialog: false,
            errorMessage: "",
        };
    }

    render() {
        let datesComponent =(
            <div className={"datesDiv"}>
                <ul className={"zeroPad zeroMarg displayInline"}>
                    {this.props.place.dateRanges.map((date,index) => (
                        <li key={index}>{format(new Date(date.value[0]), 'yyyy/MM/dd') + " - " + format(new Date(date.value[1]), 'yyyy/MM/dd')}</li>
                    ))}
                </ul>
            </div>
        );

        return(
            <div className={this.props.class+ ""}>
                {datesComponent}
            </div>

        );
    }
}

const mapStateToProps = (state) =>{
    return {
        locations: state.locations,
        currentView: state.currentView,
        cities: state.cities,
        countries: state.countries,
        itinerary: state.itinerary,
    };
};

export default connect(mapStateToProps,{addNewDate,deleteDate,})(DatesReadOnly);