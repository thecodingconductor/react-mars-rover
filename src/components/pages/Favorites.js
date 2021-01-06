import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import FavoritesItem from '../favorites/FavoritesItem';
import Spinner from '../layout/Spinner';
import Container from 'react-bootstrap/Container';


const Favorites = () => {

    const authContext = useContext(AuthContext);

    const { loadUser, user, deleteFavorite } = authContext;


    useEffect(() => {

        loadUser();
        // eslint-disable-next-line
    }, [])


    return (
        <div>

            <Container className="favorites-container">
                {user === null ? <Spinner /> : user.favorites.map((favorite, index) => (
                    <div key={index} className="favorite-item">

                        <FavoritesItem favorite={favorite} />
                        <i className="fas fa-trash delete-favorite" onClick={() => deleteFavorite(favorite)}></i>
                    </div>

                ))}
            </Container>

        </div>
    )
}

export default Favorites;