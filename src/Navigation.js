import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavigationBar() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/buildings">
                        <Nav.Link>List Building</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/test">
                        <Nav.Link>List User</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <Button>Logout</Button>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default NavigationBar;
