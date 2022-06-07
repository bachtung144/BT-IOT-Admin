import React, {useEffect, useRef, useState} from 'react';
import {Form, Button, Table, Modal, Dropdown, DropdownButton} from 'react-bootstrap'
import {useHistory, useLocation, useParams} from "react-router-dom";
import roomApi from "../../services/api/room";
import userApi from "../../services/api/user";
import data from "bootstrap/js/src/dom/data";
import apartmentApi from "../../services/api/apartment";

export const User = () => {
    let history = useHistory();
    const location = useLocation();
    let { idBuilding, idApartment } = useParams();
    const [user, setUser] = useState();
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [item, setItem] = useState();
    const [newItem, setNewItem] = useState();
    const [selectedType, setSelectedType] = useState();
    const list = [
        { key: "root"},
        { key: "child" }
    ];

    const getInfoUser = async () => {
        const response = await userApi.get(idApartment)
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
        const response = await userApi.update(item?._id, item)
        if (response) {
            setUser(response?.data)
            setShow(false)
        }
    };

    const handleCloseAdd = async () => {
        const response = await userApi.add(newItem)
        if (response) setUser(response?.data)
        setShowAdd(false)
    }

    const handleSelectType = (key) => {
        setSelectedType({ key});
        setNewItem({...newItem, type: key, id_apartment: idApartment})
    };

    const handleSelectTypeEdit = (key) => {
        setSelectedType({ key});
        setItem({...item, type: key})
    };

    const handleDelete = async (id) => {
        const response = await userApi.delete(id)
        if (response) setUser(response?.data)
        else alert(response)
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
                                placeholder={`Address: ${item?.phone}`}
                                value={item?.phone}
                                onChange={e => setItem({...item, phone: e.target.value})}
                            />
                        </div>
                        <DropdownButton
                            alignRight
                            title={item?.type}
                            onSelect={handleSelectTypeEdit}
                        >
                            {list.map((item, index) => {
                                return (
                                    <Dropdown.Item key={index} eventKey={item.key}>
                                        {item.key}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleClose()}>
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
                                onChange={e => setNewItem({...newItem, phone: e.target.value, id_apartment: idApartment})}
                            />
                        </div>

                        <DropdownButton
                            alignRight
                            title={selectedType?.key || list[0].key}
                            onSelect={handleSelectType}
                        >
                            {list.map((item, index) => {
                                return (
                                    <Dropdown.Item key={index} eventKey={item.key}>
                                        {item.key}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAdd(false)}>
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
