import React from 'react';
import {Container, Modal, Button} from 'react-bootstrap'

const WelcomeModal = (props) => {
    return (
        <Container fluid className="welcome-modal-container">
            <Modal {...props} size="lg" aria-labelledby="welcome-modal" centered className="welcome-modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Welcome to Mars Rover Photos!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>If you are visiting this site as a demo, please use the following login information:</p>
                    <p>Username: <strong>login</strong></p>
                    <p>Password: <strong>login</strong></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
            
        </Container>
    )
}

export default WelcomeModal
