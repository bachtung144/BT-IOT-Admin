import React, {useEffect, useRef, useState} from 'react';
import {Form, Button,Table} from 'react-bootstrap'
import {useHistory, useLocation, useParams} from "react-router-dom";
import roomApi from "../../services/api/room";
import userApi from "../../services/api/user";

export const User = () => {
    let history = useHistory();
    const location = useLocation();
    let { idBuilding, idApartment } = useParams();
    const [user, setUser] = useState();
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [item, setItem] = useState();
    const [newItem, setNewItem] = useState();

    const getInfoUser = async () => {
        const response = await userApi.getByApartment(idApartment)
        console.log(idApartment)
        if (response) setUser(response?.data)
        else alert(response)
    }

    useEffect(() => {
        getInfoUser()
    },[])

    const handleOpenModalEdit = (item) => {
        setItem(item)
        setShow(true)
    }

    const handleClose = async () => {
        const response = await roomApi.updateRoom(item?._id, item)
        if (response) {
            setUser(response?.data)
            setShow(false)
        }
    };

    const handleCloseAdd = async () => {
        const response = await roomApi.addRoom(newItem)
        if (response) setUser(response?.data)
        setShowAdd(false)
    }


    return(
        <div className="container">
            <h1>Apartment: {location.state?.nameApartment}</h1>
            <div className="ctn-search">
                <Form className="ctn-box-search">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Search here" />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-search">
                        Search
                    </Button>
                </Form>

                <Button variant="success" onClick={() => setShowAdd(true)}>Add</Button>
            </div>
            {
                user ? (
                    <Table striped bordered hover style={{marginTop:30}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Phone</th>
                            <th>Type</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            user?.map((item, index) =>
                                <tr key={item?._id}>
                                    <td>{index+1}</td>
                                    <td>{item?.phone}</td>
                                    <td>{item?.type}</td>
                                    <td>
                                        <Button variant="warning" >Edit</Button>
                                        <Button variant="danger" style={{marginLeft:10}}>Delete</Button>
                                    </td>

                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                ) : <div> Loading</div>
            }
        </div>
    )
}
