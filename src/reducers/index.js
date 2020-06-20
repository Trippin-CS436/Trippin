import {combineReducers} from 'redux';

const currentLocation = {
    Name: "",
    Address: "",
}

const LocationReducer = (state = currentLocation, action) => {
    switch(action.type) {
        case 'GET_LOCATION':
            return {
                ...state,
                Name: action.payload.placeName,
                Address: action.payload.fulladdress,
            }

        default:
            return state;
    }
}

export default combineReducers({
    location: LocationReducer
})
