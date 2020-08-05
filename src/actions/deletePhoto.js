export const deletePhoto = payload => {
    return {
        type: 'DELETE_PHOTO',
        delete: payload
    };
};