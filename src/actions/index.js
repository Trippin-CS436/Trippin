export const deleteLocation = (idx) => {
    return {
        type: 'DEL_LOCATION',
        index: idx,
    };
};