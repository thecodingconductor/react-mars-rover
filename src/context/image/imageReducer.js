import {
    GET_IMAGE,
    SET_LOADING
} from '../types';


// eslint-disable-next-line
export default (state, action) => {
    switch (action.type) {

        case GET_IMAGE:
            return {
                ...state,
                currentImage: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                currentImage: null,
                loading: true
            }
        default:
            return state;
    }
}