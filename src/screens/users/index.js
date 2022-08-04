import React, {useEffect, useState} from 'react';
import {Form, Button, Table, Modal} from 'react-bootstrap'
import {useLocation, useParams} from "react-router-dom";
import userApi from "../../services/api/user";

export const User = () => {
    const location = useLocation();
    let { apartmentId } = useParams();
    const [user, setUser] = useState();
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [item, setItem] = useState();
    const [newItem, setNewItem] = useState();
    const [validated, setValidated] = useState();
    const [validatedEdit, setValidatedEdit] = useState();

    const getInfoUser = async () => {
        const response = await userApi.get(apartmentId)
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

    const handleCloseEdit = async () => {
        if (!item?.phone || !item ) setValidatedEdit(true)
        else {
            const response = await userApi.update(item?._id, item)
            if (response) {
                setUser(response?.data)
                setShow(false)
                setValidatedEdit(false)
            }
        }
    };

    const handleCloseAdd = async () => {
        if (!newItem?.phone || !newItem) setValidated(true)
        else {
            const response = await userApi.add(newItem)
            if (response) setUser(response?.data)
            setShowAdd(false)
            setValidated(false)
        }
    }

    const handleDelete = async (id) => {
        const response = await userApi.delete(id)
        if (response) setUser(response?.data)
        else alert(response)
    }

    return(
        <div className="container">
            <h1>Apartment: {location.state?.nameApartment}</h1>
            <div className="ctn-search">
                <Button variant="success" onClick={() => setShowAdd(true)}>Add</Button>
            </div>
            {
                user ? (
                    <Table striped bordered hover style={{marginTop:30}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            user?.map((item, index) =>
                                <tr key={item?._id}>
                                    <td>{index+1}</td>
                                    <td>{item?.phone}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleOpenModalEdit(item)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDelete(item?._id)} style={{marginLeft:10}}>Delete</Button>
                                    </td>

                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                ) : <div> Loading</div>
            }

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <div style={{marginBottom:10}}>
                            <p>Phone</p>
                            <Form.Control
                                placeholder={`Phone`}
                                value={item?.phone}
                                onChange={e => setItem({...item, phone: e.target.value})}
                            />
                        </div>
                    </Form.Group>
                    {
                        validatedEdit ? <p style={{color:"red"}}>Hãy nhập đủ thông tin</p> : null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCloseEdit()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAdd} onHide={() => setShowAdd(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <div style={{marginBottom:10}}>
                            <p>Phone</p>
                            <Form.Control
                                placeholder={`Phone`}
                                value={newItem?.phone}
                                onChange={e => setNewItem({...newItem, phone: e.target.value, apartment_id: apartmentId})}
                            />
                        </div>
                    </Form.Group>
                    {
                        validated ? <p style={{color:"red"}}>Hãy nhập đủ thông tin</p> : null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowAdd(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleCloseAdd()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
