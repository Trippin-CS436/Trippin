export const copyArchived = payload => {
    return {
        type: 'COPY_ITINERARY',
        copyArchived: payload
    };
};

export const resetCopyItinerary = payload => {
    return {
        type: 'RESET_COPY_ITINERARY',
        resetCopyItinerary: payload
    };
};
