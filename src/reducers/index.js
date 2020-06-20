import {combineReducers} from 'redux';

const currentLocation = {
    Name: "",
    Address: "",
    PlacesId: "ChIJK7VbnXxxhlQRCbKQyeRwBJ4"
}

/*** Handles all changes to current Itinerary
 * params
 *   action: addLocation, deleteLocation ***/
const itineraryReducer = (itinerary = {}, action) => {
    if (action.type === "ADD_LOCATION") {
        itinerary.push(action.add);
        return itinerary;
    }
    return itinerary;
}

/*** Handles all changes to current location  
 * params = 
 *      currentLocation - currentLocation selected in the itinerary list for editting 
 *       action - valid actions are addNotes 
 *              - (should also be able to have a setCurrentLocation that changes current location when selected) ***/
const currentLocationReducer = (currentLocation = {name: "", address: "", info: {}, notes: ""}, action) => {
    if (action.type === 'ADD_NOTES') {
        // change the notes of current location to the action.text
        console.log(action.text + "hereherehhere");
        currentLocation.notes = action.text;
        console.log(JSON.stringify(currentLocation));
        return currentLocation;
    } return currentLocation;
}



const mapLocationReducer = (state = currentLocation, action) => {
    switch(action.type) {
        case 'GET_LOCATION':
            return {
                ...state,
                Name: action.payload.placeName,
                Address: action.payload.fulladdress,
                PlacesId: action.payload.placeId
            }

        default:
            return state;
    }
}


export default combineReducers({
    mapLocation: mapLocationReducer,
    currentLocation: currentLocationReducer,
    itinerary: itineraryReducer
})
