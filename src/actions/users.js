export const getCurrentItineraryID = (id) => {
    return {
        type: "GET_CURRENT_ITINERARY_ID",
        payload: id
    }
}

export const getCurrentUserProfile = (userProfile) => {
    return {
        type: "GET_CURRENT_USER_PROFILE",
        payload: userProfile
    }
}