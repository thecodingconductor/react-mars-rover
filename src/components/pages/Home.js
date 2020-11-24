import React, { Fragment, useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import ImageContext from '../../context/image/imageContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Spinner from '../layout/Spinner';


const Home = () => {

    const alertContext = useContext(AlertContext);
    const imageContext = useContext(ImageContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { loadUser, addToFavorites, user } = authContext;
    const { currentImage, generatePhoto, loading } = imageContext;



    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])

    const onClick = () => {
        addToFavorites(currentImage);
        setAlert('Added to Favorites', 'success');

    }

    if (currentImage !== null && !loading) {

        return (
            <Fragment>
                <Button onClick={generatePhoto}>Generate Photo</Button>
                <div className="main-image-container">
                    <img src={currentImage.img_src} onClick={onClick} style={{ cursor: "pointer" }} className="main-image" />
                </div>

            </Fragment>
        )
    } else if (loading) {
        return (
            <Fragment>
                <Spinner />
            </Fragment>
        )
    }

    return (
        <div>
            <h1>Home</h1>
            <Button onClick={generatePhoto}>Generate Photo</Button>
        </div>
    )
}

export default Home;