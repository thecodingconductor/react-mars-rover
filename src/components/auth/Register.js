import React, { useContext, useState, useEffect, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = props => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    // clearErrors TODO
    const { register, error, clearErrors, isAuthenticated, checkEmail } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        } else if (error === "Invalid Email") {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = user;


    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        // console.log(email);

        if (name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else if (!checkEmail(email)) {

            setAlert('Enter valid email address', 'danger');
        } else {
            register({
                name,
                email,
                password
            })
        }
    }

    return (
        <Fragment>
            <Container className="register-form-container">
                <Form onSubmit={onSubmit} noValidate>
                    <Form.Group>
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control type="name" name="name" value={name} onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={onChange} noValidate />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" name="password" value={password} onChange={onChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="password2">Confirm Password</Form.Label>
                        <Form.Control type="password" name="password2" value={password2} onChange={onChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" value="Register" className="register-button" block>Register</Button>
                    <Container className="form-info-bottom">
                        <p>Already have an account?</p>
                        <a href="/login">Log In</a>
                    </Container>
                </Form>
            </Container>
        </Fragment>
    )
}

export default Register;