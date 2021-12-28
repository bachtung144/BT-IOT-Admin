import React, {useEffect, useRef, useState} from 'react';
import {Form, Button,Table} from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import "./style.css"

export const Apartment = () => {
    let history = useHistory();
    return(
        <div className="container">

            <h1>
                Căn hộ số 12
            </h1>

            <div className="ctn-search">
                <Form className="ctn-box-search">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Search here" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-search">
                        Search
                    </Button>
                </Form>

                <Button variant="success">Add</Button>
            </div>

            <Table striped bordered hover style={{marginTop:30}}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                <tr onClick={() => history.push('apartments/rooms')}>
                    <td>1</td>
                    <td>Phong ngu</td>
                    <td>
                        <Button variant="warning">Edit</Button>
                        <Button variant="danger">Delete</Button>
                    </td>
                </tr>
                </tbody>
            </Table>
        </div>
    )
}
