import React, { Fragment, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Nav, Navbar } from 'react-bootstrap';


const NavBar = () => {

    const authContext = useContext(AuthContext);

    const { logout, isAuthenticated } = authContext;

    const guestLinks = (
        <Fragment>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
        </Fragment>

    )

    const authLinks = (
        <Fragment>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
        </Fragment>
    )

    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Mars Rover Photos</Navbar.Brand>

                {isAuthenticated ? authLinks : guestLinks}
            </Navbar>
        </Fragment>
    )
}

export default NavBar
