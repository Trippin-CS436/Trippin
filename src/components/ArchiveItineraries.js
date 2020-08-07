import React from "react";
import './Iteneraries.css';
import {connect} from 'react-redux';
import axios from "axios";
import {ItineraryCard} from './ItineraryCard';
import './ArchiveItinerary.scss';
import CityReadOnly from './CityReadOnly.js';
import KeyboardArrowLeftRoundedIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import IconButton from "@material-ui/core/IconButton";
import {setItineraryFromDB, renderCity, renderCountry, renderLocation, changeView} from '../actions';
import {Grid} from "@material-ui/core";
import ItineraryReadOnly from "./ItineraryReadOnly";
import Navbar from "./Navbar";
import CopyItinerary from "./CopyItinerary";

const { uuid } = require('uuidv4');


class ArchiveItineraries extends React.Component {
    constructor(props){
        super(props);
        this.props.changeView(-1);
        this.state = {
            // locations: this.props.itineraries.locations;
            currentIndex: 0,
            archivedItineraries: [],
            currentItineraryView: null
        };
    }

     componentDidMount() {
        console.log('Getting archive itinerary from database!');
        let currentArchive = [];
        this.props.authentication.archived.map((id, index) => {
                console.log(id);
                console.log(index);
            // request all the archived data here
            axios.get("/itinerary/" + id)
            .then(response => {
                console.log("Data: ", response.data);
                if(response.data.length > 0 && response.data !== undefined){
                    let newItinerary = response.data[0];
                    currentArchive.push(newItinerary);
                    console.log('Archive Itinerary: ', currentArchive);
                     console.log('CurrentArchiveItinerary: ', currentArchive[0]);
                     this.setState({
                         archivedItineraries: currentArchive,
                         currentItineraryView: currentArchive[0]
                     });
                     if (currentArchive.length > 0){
                     this.props.setItineraryFromDB(this.state.archivedItineraries[0].itinerary);
                     this.props.renderCountry(this.state.archivedItineraries[0].countries);
                     this.props.renderCity(this.state.archivedItineraries[0].cities);
                     this.props.renderLocation(this.state.archivedItineraries[0].locations);
                     this.props.changeView(-1);
                     }
                } 
            })
            .catch(err => {
                console.log('Error fetching archive itinerary: ', err);
            })
        })
        console.log('Archive Itinerary: ', currentArchive);
        console.log('CurrentArchiveItinerary: ', currentArchive[0]);
    }

    nextItinerary = () => {
        const newIndex = this.state.currentIndex+1;

        this.setState({
            currentIndex: newIndex,
            currentItineraryView: this.state.archivedItineraries[newIndex]
        });
        console.log("========================")
        console.log(this.state.archivedItineraries[this.state.currentIndex]);
        this.props.setItineraryFromDB(this.state.archivedItineraries[newIndex].itinerary);
        this.props.renderCountry(this.state.archivedItineraries[newIndex].countries);
        this.props.renderCity(this.state.archivedItineraries[newIndex].cities);
        this.props.renderLocation(this.state.archivedItineraries[newIndex].locations);
        this.props.changeView(-1);

    }

    prevItinerary = () => {
        const newIndex = this.state.currentIndex-1;
        this.setState({
            currentIndex: newIndex,
            currentItineraryView: this.state.archivedItineraries[newIndex]
        })
        this.props.setItineraryFromDB(this.state.archivedItineraries[newIndex].itinerary);
        this.props.renderCountry(this.state.archivedItineraries[newIndex].countries);
        this.props.renderCity(this.state.archivedItineraries[newIndex].cities);
        this.props.renderLocation(this.state.archivedItineraries[newIndex].locations);
        this.props.changeView(-1);
    }



/**
 * Itinerary = {
 * locations, id, countries, cities, itinerary}
 */

 // set Carousel of Card Itinerary

    render() {

        const {archivedItineraries, currentItineraryView, currentIndex} = this.state;
        let itineraries = this.state.archivedItineraries;
        return (
            <React.Fragment>
            <Navbar/>
            <div className={"noHorizontalScroll"}>
            <div className="headerArchive">YOUR ARCHIVED ITINERARIES</div>

                <div className="carousel">
                <div className={`cards-slider active-slide-${currentIndex}`}>
                <div className="cards-slider-wrapper" style={{'transform': `translateX(-${currentIndex*(100/archivedItineraries.length)}%)`}}>
                {
                itineraries.map((itinerary, index) => <ItineraryCard archived={true} key={uuid()} itineraryData={itinerary} index={index} />)
                }

                </div>
                </div>
                </div>
                <div className={"carousel-btn-div"}>

                <IconButton className={"carousel-btn-prev"} onClick={() => this.prevItinerary()} disabled={this.state.currentIndex === 0} aria-label='PREV' >
                      <KeyboardArrowLeftRoundedIcon style={{width: 60, height: 60}} />
                </IconButton>

            <IconButton className={"carousel-btn-next"} onClick={() => this.nextItinerary()} disabled={currentIndex === itineraries.length - 1 || itineraries.length === 0} aria-label='NEXT' >
                  <KeyboardArrowRightRoundedIcon style={{width: 60, height: 60}} />
            </IconButton>
            </div>
                <Grid container className="display-itinerary" spacing={0}>
                    <Grid item xs={12} lg={4} style={{marginBottom: '25px'}}>
                        <div>
                            <ItineraryReadOnly />
                        </div>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <CityReadOnly />
                        <CopyItinerary buttonTitle="Repeat This Itinerary"/>
                    </Grid>
                </Grid>
            </div>
            </React.Fragment>

        )
    }
}
const mapStateToProps = (state) =>{
    return {
        itinerary: state.itinerary,
        authentication: state.authentication,
    };
};

export default connect(mapStateToProps, {setItineraryFromDB, renderLocation, renderCountry, renderCity, changeView})(ArchiveItineraries);
