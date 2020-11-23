import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtSecret from '../../config/secret';
import { uuid } from 'uuidv4';



import {
    REGISTER_USER,
    LOGOUT_USER,
    LOGIN_SUCCESS,
    LOAD_USER,
    LOGIN_FAIL,
    // AUTH_USER,
    ADD_TO_FAVORITES,
    AUTH_USER_FAIL
} from '../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loadUser = () => {
        console.log(localStorage.getItem('token'));
        if (!localStorage.getItem('token')) {
            console.log('no token');
            dispatch({
                type: AUTH_USER_FAIL
            })
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('user'));
        dispatch({
            type: LOAD_USER,
            payload: currentUser
        })
    }

    const addToFavorites = currentImage => {

        const currentUser = JSON.parse(localStorage.getItem('user'));
        currentUser.favorites.push(currentImage);
        localStorage.setItem('user', JSON.stringify(currentUser));

        dispatch({
            type: ADD_TO_FAVORITES,
            payload: currentImage
        })
    }

    const register = async formData => {

        const salt = await bcryptjs.genSalt(10);

        formData.password = await bcryptjs.hash(formData.password, salt);

        formData.id = uuid();

        const user = formData;
        user.favorites = [];

        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            jwtSecret,
            {
                expiresIn: 3600,
            },
            (err, token) => {
                if (err) throw err;
                localStorage.setItem('token', JSON.stringify(token))
                localStorage.setItem('user', JSON.stringify(user));
            }
        );

        console.log(user);

        dispatch({
            type: REGISTER_USER,
            payload: user
        })
    }

    const login = async formData => {

        const loginUser = formData;

        if (localStorage.getItem('user')) {
            const storageUser = JSON.parse(localStorage.getItem('user'));
            const isMatch = await bcryptjs.compare(loginUser.password, storageUser.password);

            if (!isMatch) {
                console.log('passwords dont match')
                dispatch({
                    type: LOGIN_FAIL,
                    payload: 'error'
                });
                return;
            }

            const payload = {
                user: {
                    id: storageUser.id
                }
            }

            try {
                await jwt.sign(
                    payload,
                    jwtSecret,
                    {
                        expiresIn: 3600,
                    },
                    (err, token) => {
                        if (err) throw err;
                        localStorage.setItem('token', JSON.stringify(token))

                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: storageUser
                        })

                        loadUser();
                    }
                );
            } catch (error) {
                console.error(error.message);
            }



        } else {
            //TODO - ALERT TO CREATE USER FIRST
            console.log('create user');
        }
    }

    const logout = () => {
        dispatch({ type: LOGOUT_USER });
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
            addToFavorites,
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