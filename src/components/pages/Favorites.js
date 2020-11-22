import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Favorites = () => {

    const authContext = useContext(AuthContext);

    const { loadUser } = authContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>Favorites Page</h1>
        </div>
    )
}

export default Favorites;