export const addMsg = msg => {
    return {
        type: 'ADD_MSG',
        addMsg: msg
    };
};

export const selectMsg = msgId => {
    return {
        type: 'SELECT_MSG',
        selectMsg: msgId
    }
};

export const deleteMsg = msgId => {
    return {
        type: 'DELETE_MSG',
        deleteMsg: msgId
    }
};

export const chooseUser = userName => {
    return {
        type: 'CHOOSE_USER',
        chooseUser: userName
    }
};

export const logOut = () => {
    return {
        type: 'LOGOUT'
    }
};

export const logIn = nameEmailObj => {
    return {
        type: 'LOGIN',
        logIn: nameEmailObj
    }
}

export const deleteLocation = (id) => {
    return {
        type: 'DEL_LOCATION',
        location_id: id,
    };
};
export const deleteCity = (id) => {
    return {
        type: 'DEL_CITY',
        location_id: id,
    };
};
export const deleteCountry = (id) => {
    return {
        type: 'DEL_COUNTRY',
        location_id: id,
    };
};

export const addLocation = (newLocation) => {
    return {
        type: 'NEW_LOCATION',
        payload: newLocation
    };
};


export const renderLocation = (locations) => {
    return{
        type: "RENDER_LOCATION",
        payload: locations
    }
}
export const renderCountry = (locations) => {
    return{
        type: "RENDER_COUNTRY",
        payload: locations
    }
}
export const renderCity = (locations) => {
    return{
        type: "RENDER_CITY",
        payload: locations
    }
}
export const deleteDate = (place,type,dateIndex) => {
    if (type === 'city'){
        return{
            type: "DELETE_DATE_CITY",
            place: place,
            dateIndex: dateIndex,
        }
    }
    else if (type ==='country'){
        return{
            type: "DELETE_DATE_COUNTRY",
            place: place,
            dateIndex: dateIndex,
        }
    }
    else if (type ==='itinerary'){
        return{
            type: "DELETE_DATE_ITINERARY",
            place: place,
            dateIndex: dateIndex,
        }
    }
    return {}
};
export const changeDate = (place,type,date,dateIndex) => {
    if (type === 'city'){
        return{
            type: "CHANGE_DATE_CITY",
            place: place,
            date: date,
            dateIndex: dateIndex,
        }
    }
    else if (type ==='country'){
        return{
            type: "CHANGE_DATE_COUNTRY",
            place: place,
            date: date,
            dateIndex: dateIndex,
        }
    }
    else if (type ==='itinerary'){
        return{
            type: "CHANGE_DATE_ITINERARY",
            place: place,
            date: date,
            dateIndex: dateIndex,
        }
    }
    return {}
};
export const addNewDate = (place,type,value) => {
    if (type === 'city'){
        return{
            type: "NEW_DATE_CITY",
            place: place,
            value: value,
        }
    }
    else if (type ==='country'){
        return{
            type: "NEW_DATE_COUNTRY",
            place: place,
            value: value,
        }
    }
    else if (type ==='itinerary'){
        return{
            type: "NEW_DATE_ITINERARY",
            place: place,
            value: value,
        }
    }
    return {}
};

export const changeView = (id) => {
    let view = {
        byID: {
            city: id,
        }
    };
    return {
        type: 'CHANGE_VIEW',
        newView: view,
    };
};

export const itineraryNameChange = (name) => {
    return {
        type: 'NAME_CHANGE',
        name: name,
    };
};

export const saveItinerary= (itinerary) => {
    return {
        type: 'SAVE_ITINERARY',
        payload: itinerary
    }
}

export const getCurrentItineraryID = (id) => {
    return {
        type: "GET_CURRENT_ITINERARY_ID",
        payload: id
    }
}

export const insertNewCountry = (id, name) => {
    return{
        type: "NEW_COUNTRY",
        id: id,
        name: name,
    }
}
export const insertNewCity = (id, name,countryID) => {
    return{
        type: "NEW_CITY",
        id: id,
        name: name,
        countryID: countryID,
    }
}
export const setItineraryFromDB = (itinerary) => {
    return{
        type: "SET_ITINERARY",
        payload:itinerary,
    }
}
