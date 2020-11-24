import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import FavoritesItem from '../favorites/FavoritesItem';
import Spinner from '../layout/Spinner';
import { uuid } from 'uuidv4';
import { Container } from 'react-bootstrap';


const Favorites = () => {

    const authContext = useContext(AuthContext);

    const { loadUser, user } = authContext;
    // const { favorites } = user;

    useEffect(() => {
        // console.log('favorites page fail');
        loadUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>Favorites Page</h1>
            <Container className="favorites-container">
                {user === null ? <Spinner /> : user.favorites.map(favorite => (
                    <FavoritesItem key={uuid()} favorite={favorite} />
                ))}
            </Container>

        </div>
    )
}

export default Favorites;