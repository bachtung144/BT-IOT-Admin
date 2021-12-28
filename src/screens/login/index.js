import React, {useEffect, useRef, useState} from 'react';
import {Form, Button} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import "./style.css"

export const Login = () => {
    let history = useHistory();

    return(
        <div className="container">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={() => history.push('buildings')}>
                    Login
                </Button>
            </Form>
        </div>
    )
}
