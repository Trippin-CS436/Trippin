export const deleteLocation = (idx) => {
    return {
        type: 'DEL_LOCATION',
        location_index: idx,
    };
};

export const itineraryNameChange = (name) => {
    return {
        type: 'NAME_CHANGE',
        name: name,
    };
};