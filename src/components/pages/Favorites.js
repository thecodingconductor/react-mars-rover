import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import FavoritesItem from '../favorites/FavoritesItem';
import Spinner from '../layout/Spinner';
import { uuid } from 'uuidv4';
import { Container } from 'react-bootstrap';


const Favorites = () => {

    const authContext = useContext(AuthContext);

    const { loadUser, user, deleteFavorite } = authContext;
    // const { favorites } = user;

    useEffect(() => {

        loadUser();
        // eslint-disable-next-line
    }, [])


    return (
        <div>

            <Container className="favorites-container">
                {user === null ? <Spinner /> : user.favorites.map(favorite => (
                    <div key={uuid()} className="favorite-item">

                        <FavoritesItem favorite={favorite} />
                        <i className="fas fa-trash" onClick={() => deleteFavorite(favorite)}></i>
                    </div>

                ))}
            </Container>

        </div>
    )
}

export default Favorites;