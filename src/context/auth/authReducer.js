import {
    REGISTER_USER,
    LOGOUT_USER,
    LOGIN_USER,
    AUTH_USER,
    LOAD_USER
} from '../types';

export default (state, action) => {
    switch (action.type) {

        case REGISTER_USER:

            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case LOAD_USER:

            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: JSON.parse(localStorage.getItem('user'))
            }
        case AUTH_USER:
            return {
                ...state
            }
        default:
            return state;
    }
}