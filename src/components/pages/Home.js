import React, { Fragment, useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ImageContext from '../../context/image/imageContext';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Spinner from '../layout/Spinner';
import WelcomeModal from '../layout/WelcomeModal'


const Home = () => {

    const alertContext = useContext(AlertContext);
    const imageContext = useContext(ImageContext);
    const authContext = useContext(AuthContext);
    const { setAlert } = alertContext;
    const { loadUser, addToFavorites, user, createUser } = authContext;
    const { currentImage, generatePhoto, loading } = imageContext;

    const [modalShow, setModalShow] = useState(false)


    useEffect(() => {
        createUser();
        loadUser();

        // if(!user){
        //     setModalShow(true)
        // }

        // eslint-disable-next-line
    }, [])

    const onClick = () => {
        addToFavorites(currentImage);
        setAlert('Added to Favorites', 'success');
    }

    if (currentImage !== null && !loading) {

        return (
            <Fragment>

                <div className="main-content-container d-flex flex-column align-items-center justify-content-center">
                    <div className="main-image-container">
                        {user && 
                       
                             <i className="far fa-heart fa-2x add-to-favorites-icon" onClick={onClick} style={{ cursor: "pointer" }}></i>
                    
                        }

                        <img src={currentImage.img_src} className="main-image" alt="Mars Landscape" />
                    </div>
                    <Button onClick={generatePhoto} className="generate-photo-button">Generate Photo</Button>
                </div>



            </Fragment>
        )
    } else if (loading) {
        return (

            <div className="main-content-container d-flex flex-column align-items-center justify-content-center">
                <Spinner />
            </div>



        )
    }

    return (
        <div className="main-content-container d-flex flex-column align-items-center justify-content-center">
            <h1 className="generate-photo-message">View photos from the Mars Rovers</h1>
            <Button onClick={generatePhoto} className="generate-photo-button">Generate Photo</Button>
            {modalShow && <WelcomeModal show={modalShow} onHide={() => setModalShow(false)}/>}
        </div>
    )
}

export default Home;