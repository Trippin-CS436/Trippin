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
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


class Dates extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            openDialog: false,
            errorMessage: "",
        };
    }

    handleDateDelete(index){
        this.props.deleteDate(this.props.place,this.props.type,index)
    }
    renderDatesPopup(){
        let dates = [];
        dates.push(<h1>{this.props.place.name} Dates</h1>)
        this.props.place.dateRanges.forEach((item,index) => {
            dates.push(
                <div style={{fontSize: 20}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ul style={{paddingLeft: 15}}>
                            <li>
                                Date #{index+1}
                                <div className={"DatePicker"}>
                                    <DatePicker
                                        label={"Start Date"}
                                        value={new Date(item.start)}
                                        onChange={(date)=>{this.handleChangeStartDate(date,index)}}
                                        animateYearScrolling                                    />
                                </div>
                                <div className={"DatePicker"}>
                                    <DatePicker
                                        label={"End Date"}
                                        value={new Date(item.end)}
                                        onChange={(date)=>{this.handleChangeEndDate(date,index)}}
                                        animateYearScrolling
                                    />
                                </div>
                                <div style={{marginTop:10,display:"inline-block"}}>
                                    <IconButton  key={index}aria-label="Delete"  name="Delete">
                                        <DeleteForeverIcon color={"secondary"} onClick={this.handleDateDelete.bind(this,index)}/>
                                    </IconButton>
                                </div>

                            </li>
                        </ul>
                    </MuiPickersUtilsProvider>
                </div>
            )
        });
        dates.push(
            <Button variant="contained" color="primary" autoFocus onClick={this.addNewDate.bind(this)}>
                NEW DATE
            </Button>)
        return dates;
    }

    addNewDate(){
        let dateString = format(new Date(), 'yyyy/MM/dd');
        console.log(dateString)
        this.props.addNewDate(this.props.place,this.props.type,dateString,dateString)
    }
    render() {
        let datesComponent =(
            <div className={"datesDiv"}>
                <ul className={"zeroPad zeroMarg displayInline"}>
                {this.props.place.dateRanges.map((date,index) => (
                    <li key={index}>{date.start + " - " + date.end}</li>
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

                <Popup contentStyle={{width: "600px"}}trigger={datesComponent} modal>
                    {close => (
                        <div className="modal" style={{color: "black"}}>
                            <a className="close" onClick={close}>
                                &times;
                            </a>
                            {this.renderDatesPopup()}
                        </div>
                    )}
                </Popup>
                <Snackbar open={this.state.openDialog} autoHideDuration={5000} onClose={this.handleClose.bind(this)}>
                    <Alert onClose={this.handleClose.bind(this)} severity="error">
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
            </div>

        );
    }
    handleClose(){
        this.setState({openDialog: false});
    }
    handleChangeStartDate = (date,index) => {
        let dateString = format(date, 'yyyy/MM/dd');
        let endDateString = format(new Date(this.props.place.dateRanges[index].end), 'yyyy/MM/dd');
        //All date validation here
        if (Date.parse(dateString) <= Date.parse(endDateString)){
            this.props.startDateChange(this.props.place,this.props.type,dateString,index)
        }
        else{
            this.setState({openDialog: true, errorMessage:"Start date cannot be after end date"});
        }
    };
    handleChangeEndDate = (date,index) => {
        let dateString = format(date, 'yyyy/MM/dd');
        let startDateString = format(new Date(this.props.place.dateRanges[index].start), 'yyyy/MM/dd');
        //All date validation here
        if (Date.parse(startDateString) <= Date.parse(dateString)){
            this.props.endDateChange(this.props.place,this.props.type,dateString,index)
        }
        else{
            this.setState({openDialog: true, errorMessage:"End date cannot be before start date"});
        }
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

export default connect(mapStateToProps,{addNewDate,deleteDate,startDateChange,endDateChange})(Dates);