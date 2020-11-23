import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import FavoritesItem from '../favorites/FavoritesItem';
import Spinner from '../layout/Spinner';


const Favorites = () => {

    const authContext = useContext(AuthContext);

    const { loadUser, user } = authContext;
    // const { favorites } = user;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>Favorites Page</h1>
            {user === null ? <Spinner /> : user.favorites.map(favorite => (
                <FavoritesItem favorite={favorite} />
            ))}
        </div>
    )
}

export default Favorites;