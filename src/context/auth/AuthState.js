import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_USER,
    LOGOUT_USER,
    LOGIN_USER,
    AUTH_USER
} from '../types';

const AuthState = props => {

    const initialState = {
        isAuthenticated: null,
        name: null,
        email: null,
        password: null,
        loading: true,
        favorites: [],
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = async () => {
        console.log('loaduser')
    }

    const register = async formData => {
        console.log('register')
    }

    const login = async formData => {
        console.log('login');
    }

    const logout = () => {
        console.log('logout')
    }

    const clearErrors = () => {
        console.log('clear errors');
    }




    return (
        <AuthContext.Provider value={{
            isAuthenticated: state.isAuthenticated,
            name: state.name,
            email: state.email,
            password: state.password,
            favorites: state.favorites,
            loading: state.loading,
            user: state.user,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthState;