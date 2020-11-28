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
            <Navbar variant="dark" className="main-nav-bar-container">
                <div className="nav-bar-left d-flex align-items-center">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>
                <div className="nav-bar-center">
                    <Navbar.Brand href="/" className="site-title-main">Mars Rover Photos</Navbar.Brand>
                </div>
                <div className="nav-bar-right d-flex align-items-center">
                    {isAuthenticated ? authLinks : guestLinks}
                </div>



            </Navbar>
        </Fragment>
    )
}

export default NavBar
