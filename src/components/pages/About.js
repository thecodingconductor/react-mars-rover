import React, { Fragment, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';

const About = () => {

    const authContext = useContext(AuthContext);
    const { loadUser, user } = authContext

    useEffect(() => {
        loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            {user ? <h1>Thre is a user</h1> : <h2>no user</h2>}
        </Fragment>
    )
}

export default About
