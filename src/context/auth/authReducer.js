import {
    REGISTER_USER,
    LOGOUT_USER,
    LOGIN_USER,
    AUTH_USER
} from '../types';

export default (state, action) => {
    switch (action.type) {

        case REGISTER_USER:
            return {
                ...state
            }
        case LOGOUT_USER:
            return {
                ...state
            }
        case LOGIN_USER:
            return {
                ...state
            }
        case AUTH_USER:
            return {
                ...state
            }
        default:
            return state;
    }
}