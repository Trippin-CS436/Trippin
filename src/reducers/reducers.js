import { combineReducers } from 'redux';

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
