import React, { Fragment, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ImageContext from '../../context/image/imageContext';
import AuthContext from '../../context/auth/authContext';

const Home = () => {

    const imageContext = useContext(ImageContext);
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    const { currentImage, generatePhoto, loading } = imageContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <Button onClick={generatePhoto}>Generate Photo</Button>
            {currentImage !== null ? <img src={currentImage.img_src} alt="" /> : ''}
        </div>
    )
}

export default Home;