import React, { Fragment, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ImageContext from '../../context/image/imageContext';
import AuthContext from '../../context/auth/authContext';

const Home = () => {

    const imageContext = useContext(ImageContext);
    const authContext = useContext(AuthContext);
    const { loadUser, addToFavorites, user } = authContext;
    const { currentImage, generatePhoto, loading } = imageContext;


    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])

    const onClick = e => {
        addToFavorites(currentImage);
    }

    return (
        <div>
            <h1>Home</h1>
            <Button onClick={generatePhoto}>Generate Photo</Button>
            {currentImage !== null ? <img src={currentImage.img_src} onClick={onClick} style={{ cursor: "pointer" }} /> : ''}
        </div>
    )
}

export default Home;