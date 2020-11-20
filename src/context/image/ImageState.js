import React, { useReducer } from 'react';
import ImageContext from './imageContext';
import imageReducer from './imageReducer';
import axios from 'axios';
import {
    GET_IMAGE
} from '../types';

const ImageState = props => {
    const initialState = {
        currentImage: null,
        loading: true
    }


    const [state, dispatch] = useReducer(imageReducer, initialState);

    const rovers = ['curiosity', 'opportunity', 'spirit'];
    const cameras = ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM', 'PANCAM', 'MINITES'];

    const generateRandomSol = (roverName) => {
        if (roverName === 'curiosity') {
            return Math.floor(Math.random() * (2817 - 0) + 0)
        } else if (roverName === 'opportunity') {
            return Math.floor(Math.random() * (5851 - 0) + 0)
        } else if (roverName === 'spirit') {
            return Math.floor(Math.random() * (2210 - 0) + 0)
        }
    }

    const generatePhoto = async () => {
        const randomRoverInt = Math.floor(Math.random() * (3 - 0) + 0);

        const res = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rovers[randomRoverInt]}/photos?sol=${generateRandomSol(rovers[randomRoverInt])}&api_key=QFhB5kIgXufSxM17sGgLaiaPocUKkb4vYt8xEqju`);

        try {
            if (res.data.photos.length === 0) {
                generatePhoto();
            } else {
                let item = res.data.photos[Math.floor(Math.random() * (res.data.photos.length - 0) + 0)];
                dispatch({
                    type: GET_IMAGE,
                    payload: item
                })
            }
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <ImageContext.Provider value={{
            currentImage: state.currentImage,
            loading: state.loading,
            generatePhoto

        }}>
            {props.children}
        </ImageContext.Provider>
    )

}

export default ImageState;

