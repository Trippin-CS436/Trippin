import { combineReducers } from 'redux';

/*** Handles all changes to current Itinerary
 * params
 *   action: addLocation, deleteLocation ***/
const itineraryReducer = (itinerary = {}) => {
    if (action.type === "ADD_LOCATION")
    return itinerary
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

export default combineReducers( {
    currentLocation: currentLocationReducer
});
