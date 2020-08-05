import React from 'react'; 
import PropTypes from 'prop-types';
import LocationOnSharpIcon from '@material-ui/icons/LocationOnSharp';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';

export const ItineraryCard = ({itineraryData, index}) => {
    console.log(itineraryData);
    const {locations, id, countries, cities, itinerary} = itineraryData;

    return (
        <div id={`card-${id}`} className="card">

        <div className="details">
        <p className="itinerary-title">
            {itinerary.name}
            <br />
        </p>
        <ul className="info">
            <li><LocationOnSharpIcon style={{width: 40, height: 40, color: "white"}}/><span>{locations.length}</span></li>
            <li><FlagOutlinedIcon style={{width: 40, height: 40, color: "white"}}/><span>{countries.length}</span></li>
            <li><LocationCityRoundedIcon style={{width: 40, height: 40, color: "white"}} /><span>{cities.length}</span></li>
        </ul>


        </div>

        </div>
    )
}