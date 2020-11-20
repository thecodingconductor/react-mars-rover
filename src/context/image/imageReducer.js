import {
    GET_IMAGE
} from '../types';

export default (state, action) => {
    switch (action.type) {

        case GET_IMAGE:
            return {
                ...state,
                currentImage: action.payload
            }
        default:
            return state;
    }
}