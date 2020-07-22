import React from "react";
import {connect} from 'react-redux';
import Popup from "reactjs-popup";
import { MuiPickersUtilsProvider,DatePicker  } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import format from 'date-fns/format'
import {startDateChange,endDateChange} from "../actions";

class Dates extends React.Component{

    render() {
        let datesComponent =
            <ul className={"zeroPad zeroMarg"}>
                {this.props.place.dateRanges.map((date,index) => (
                    <li key={index}>{date.start + " - " + date.end}</li>
                ))}
            </ul>;
        return(
            <div className={this.props.class+ ""}>

                <Popup contentStyle={{width: "600px"}}trigger={datesComponent} modal>
                    {close => (
                        <div className="modal" style={{color: "black"}}>
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <div className={"DatePicker"}>
                                    <DatePicker
                                        label={"Start Date"}
                                        value={new Date(this.props.place.dateRanges[0].start)}
                                        onChange={this.handleChangeStartDate}
                                        animateYearScrolling                                    />
                                </div>
                                <div className={"DatePicker"}>
                                    <DatePicker
                                        label={"End Date"}
                                        value={new Date(this.props.place.dateRanges[0].end)}
                                        onChange={this.handleChangeEndDate}
                                        animateYearScrolling
                                    />
                                </div>
                            </MuiPickersUtilsProvider>
                        </div>
                    )}
                </Popup>
            </div>

        );
    }
    handleChangeStartDate = (date) => {
        console.log("CHANGING START DATE: " + format(date, 'yyyy/MM/dd'));
        let dateString = format(date, 'yyyy/MM/dd');
        this.props.startDateChange(this.props.place,this.props.type,dateString,0)
    };
    handleChangeEndDate = (date) => {
        console.log("CHANGING END DATE: " + format(date, 'yyyy/MM/dd'));
        let dateString = format(date, 'yyyy/MM/dd');
        this.props.endDateChange(this.props.place,this.props.type,dateString,0)
    };
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

export default connect(mapStateToProps,{startDateChange,endDateChange})(Dates);