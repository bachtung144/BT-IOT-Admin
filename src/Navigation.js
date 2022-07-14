import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavigationBar() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto" style={{display:'flex', flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
                    <div style={{marginLeft:20, display:'flex', flexDirection:'row'}}>
                        <LinkContainer to="/buildings">
                            <Nav.Link>List Building</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/chips">
                            <Nav.Link>List Chip</Nav.Link>
                        </LinkContainer>
                    </div>
                    <div style={{marginRight:20}}>
                        <LinkContainer to="/change-password" style={{marginRight:20}}>
                            <Button variant="info">Change Password</Button>
                        </LinkContainer>
                        <LinkContainer to="/">
                            <Button>Logout</Button>
                        </LinkContainer>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default NavigationBar;
