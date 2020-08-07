import React from 'react';
import LocationOnSharpIcon from '@material-ui/icons/LocationOnSharp';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import LandscapeIcon from '@material-ui/icons/Landscape';
import { Rating } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Tooltip from "@material-ui/core/Tooltip";

const RatingDisplay = ({rating}) => {

    if (rating === undefined || rating === ''){
        rating = 0;
    }
        return (
            <Box borderColor="transparent" mb={1} p={2} fontWeight="fontWeightLight">
            <Typography variant="h5">Rating</Typography>
            <Rating name="half-rating-read" defaultValue={0} value={rating} precision={1} readOnly />
            </Box>
        )
}



export const ItineraryCard = ({itineraryData, index,hideRatings}) => {
    console.log(itineraryData);
    const {locations, id, countries, cities, itinerary} = itineraryData;


        let startDate = "dd/mm/yyy"
        if (itinerary.dateRanges.length > 0 && itinerary.dateRanges[0] !== undefined){
        var start = new Date(itinerary.dateRanges[0].value[0]);
        var dd = String(start.getDate()+2).padStart(2, '0');
        var mm = String(start.getMonth() + 1).padStart(2, '0');
        var yyyy = start.getFullYear();
        startDate = mm + '/' + dd + '/' + yyyy;
        }

        let endDate = "dd/mm/yyy"
        if (itinerary.dateRanges.length > 0 && itinerary.dateRanges[0] !== undefined){
        var end = new Date(itinerary.dateRanges[0].value[1]);
        var dd_end = String(start.getDate()+2).padStart(2, '0');
        var mm_end = String(start.getMonth() + 1).padStart(2, '0');
        var yyyy_end = start.getFullYear();
        endDate = mm_end + '/' + dd_end + '/' + yyyy_end;
        }

    let ratings = null;
    if (!hideRatings){
        ratings = (<RatingDisplay rating={itinerary.rating} />
        )
    }
    return (
        <div id={`card-${id}`} className="card">

        <div className="details">
        <p className="itinerary-title">
            {itinerary.name}
            <br />
            <span style={{font: "20px Roboto"}}>{startDate} - {endDate}</span>
            <br />
            {ratings}
            <br />
        </p>
        <ul className="info" style={{zIndex:999,}}>
            <li style={{zIndex:999,}}><Tooltip title="Number of Countries" aria-label="Number of Countries" ><LandscapeIcon style={{width: 40, height: 40, color: "black"}}/></Tooltip><span>{countries.length}</span></li>
            <li style={{zIndex:999,}}><Tooltip title="Number of Cities"><LocationCityRoundedIcon aria-label="Number of Cities" style={{width: 40, height: 40, color: "black"}} /></Tooltip><span>{cities.length}</span></li>
            <li style={{zIndex:999,}}><Tooltip title="Number of Locations"><LocationOnSharpIcon aria-label="Number of Locations" style={{width: 40, height: 40, color: "black"}}/></Tooltip><span>{locations.length}</span></li>
        </ul>


        </div>

        </div>
    )
}