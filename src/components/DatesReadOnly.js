import React from "react";
import {connect} from 'react-redux';
import Popup from "reactjs-popup";
import { MuiPickersUtilsProvider,DatePicker  } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import format from 'date-fns/format'
import {startDateChange, endDateChange, deleteDate, addNewDate} from "../actions";
import DateRangeIcon from '@material-ui/icons/DateRange';
import IconButton from "@material-ui/core/IconButton";
import './Dates.css';
import { green } from '@material-ui/core/colors';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from "@material-ui/core/Button";


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
                <div className={"buttonCalendar"}>
                    <IconButton  aria-label="Edit" name="Edit" >
                        <DateRangeIcon className={"edit-btn"} style={{ color: green[500] }}/>
                    </IconButton>
                </div>
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