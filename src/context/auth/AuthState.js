import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtSecret from '../../config/secret';
import { v4 } from 'uuid'



import {
    REGISTER_USER,
    REGISTER_FAIL,
    LOGOUT_USER,
    LOGIN_SUCCESS,
    LOAD_USER,
    LOGIN_FAIL,
    // AUTH_USER,
    ADD_TO_FAVORITES,
    DELETE_FAVORITE,
    AUTH_USER_FAIL,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {

    const initialState = {
        token: JSON.parse(localStorage.getItem('token')),
        isAuthenticated: null,
        user: null,
        loading: true,
        error: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);


    const createUser = async () => {

        const salt = await bcryptjs.genSalt(10);

        const user = {
            name: "test",
            email: "test@test.com",
            password: "TestAccount"
        }

        user.password = await bcryptjs.hash(user.password, salt);

        user.id = v4();


       
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

                dispatch({
                    type: REGISTER_USER,
                    payload: user
                })

                // loadUser();
            }
        );
    }

    const loadUser = () => {

        if (!localStorage.getItem('token')) {


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

    const deleteFavorite = favorite => {
        const currentUser = JSON.parse(localStorage.getItem('user'));

        // find matching item
        const item = currentUser.favorites.map(storageFave => {
            return storageFave.id
        }).indexOf(favorite.id);

        // remove from array
        currentUser.favorites.splice(item, 1);

        //commit change to local storage
        localStorage.setItem('user', JSON.stringify(currentUser));

        //send to reducer
        dispatch({
            type: DELETE_FAVORITE,
            payload: favorite
        })
    }

    const register = async formData => {



        const salt = await bcryptjs.genSalt(10);

        formData.password = await bcryptjs.hash(formData.password, salt);

        formData.id = v4();


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

                dispatch({
                    type: REGISTER_USER,
                    payload: user
                })

                // loadUser();
            }
        );






    }

    const login = async formData => {

        const loginUser = formData;

        if (localStorage.getItem('user')) {
            const storageUser = JSON.parse(localStorage.getItem('user'));
            const isMatch = await bcryptjs.compare(loginUser.password, storageUser.password);

            if (!isMatch || loginUser.email !== storageUser.email) {

                dispatch({
                    type: LOGIN_FAIL,
                    payload: "Invalid Credentials"
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
            dispatch({
                type: LOGIN_FAIL,
                payload: "Please create a user"
            });
        }
    }

    const logout = () => {
        dispatch({ type: LOGOUT_USER });
    }

    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS })
    }

    const checkEmail = (input) => {
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(input.trim())) {
            dispatch({
                type: REGISTER_FAIL,
                error: "Invalid Email"
            });
            return false;
        } else {
            return true
        }
    }




    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            name: state.name,
            email: state.email,
            password: state.password,
            favorites: state.favorites,
            loading: state.loading,
            user: state.user,
            error: state.error,
            addToFavorites,
            register,
            loadUser,
            login,
            logout,
            clearErrors,
            checkEmail,
            deleteFavorite,
            createUser
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthState;