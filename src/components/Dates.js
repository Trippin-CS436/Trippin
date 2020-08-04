import React from "react";
import {connect} from 'react-redux';
import Popup from "reactjs-popup";
import format from 'date-fns/format'
import {addNewDate, changeDate, deleteDate} from "../actions";
import DateRangeIcon from '@material-ui/icons/DateRange';
import IconButton from "@material-ui/core/IconButton";
import './Dates.css';
import { green } from '@material-ui/core/colors';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import {DateRangePicker} from "rsuite";
import 'rsuite/dist/styles/rsuite-default.css';


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
                        <ul style={{paddingLeft: 15,listStyleType:"none"}}>
                            <li>
                                Date #{index+1}
                                <React.Fragment>
                                <div className={"DatePicker"}>
                                    <DateRangePicker
                                        value={item.value}
                                        size="lg"
                                        cleanable={false}
                                        onChange={value => {
                                            this.handleDateChange(value,index);
                                        }}
                                        ranges={[]}
                                    />
                                </div>
                                </React.Fragment>
                                    <div style={{marginTop:10,display:"inline-block"}}>
                                    <IconButton  key={index}aria-label="Delete"  name="Delete">
                                        <DeleteForeverIcon color={"secondary"} onClick={this.handleDateDelete.bind(this,index)}/>
                                    </IconButton>
                                </div>

                            </li>
                        </ul>
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
        let value = [new Date(), new Date()];
        console.log(value)
        if (this.props.place.dateRanges.length > 0){
            let length = this.props.place.dateRanges.length;
            let endDatePrevious = this.props.place.dateRanges[length - 1].value[1];
            value = [endDatePrevious,endDatePrevious];
        }
        this.props.addNewDate(this.props.place,this.props.type,value)
    }
    handleClose(){
        this.setState({openDialog: false});
    }

    handleDateChange(dateRange,index){
        let datesCopy = this.props.place.dateRanges;
        let oldValue = datesCopy[index].value;
        datesCopy[index].value = dateRange;
        if(this.checkOverlappingDates(datesCopy)){
            console.log("DATES DON'T OVERLAP")
            this.props.changeDate(this.props.place,this.props.type,dateRange,index)
        }
        else{
            datesCopy[index].value = oldValue;
            this.setState({openDialog: true, errorMessage:"Cannot have overlapping dates!"});
        }
    }

    checkOverlappingDates(dates){
        for (let i = 0; i < dates.length; i++){
            for (let j = 0; j < dates.length; j++){
                if (i !== j){
                    let startDate = new Date(dates[i].value[0]);
                    let endDate = new Date(dates[i].value[1]);
                    let startDate2 = new Date(dates[j].value[0]);
                    let endDate2 = new Date(dates[j].value[1]);
                    console.log(startDate)
                    console.log(startDate2)
                    if ((startDate > startDate2 && startDate < endDate2) || (endDate > startDate2 && endDate < endDate2)){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    render() {

        let datesComponent = null;
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

export default connect(mapStateToProps,{addNewDate,changeDate,deleteDate})(Dates);