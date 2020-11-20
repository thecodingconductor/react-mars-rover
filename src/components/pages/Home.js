import React, { Fragment, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ImageContext from '../../context/image/imageContext';

const Home = () => {

    const imageContext = useContext(ImageContext);
    const { currentImage, generatePhoto, loading } = imageContext;



    return (
        <div>
            <h1>Home</h1>
            <Button onClick={generatePhoto}>Generate Photo</Button>
            {currentImage !== null ? <img src={currentImage.img_src} alt="" /> : ''}
        </div>
    )
}

export default Home;