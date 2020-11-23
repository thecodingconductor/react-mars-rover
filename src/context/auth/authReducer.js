import {
    REGISTER_USER,
    LOGOUT_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_USER,
    AUTH_USER_FAIL,
    LOAD_USER,
    ADD_TO_FAVORITES
} from '../types';

export default (state, action) => {
    switch (action.type) {

        case REGISTER_USER:
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            }
        case AUTH_USER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false
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

        case ADD_TO_FAVORITES:
            return {
                ...state,
                user: {
                    ...state,
                    favorites: [...state.user.favorites, action.payload]
                }
            }
        default:
            return state;
    }
}