import React, {useEffect, useState} from 'react';
import {Form, Button, Table, Modal} from 'react-bootstrap'
import {useHistory, useLocation, useParams} from "react-router-dom";
import deviceApi from "../../services/api/device";
import roomApi from "../../services/api/room";

export const Device = () => {
    let history = useHistory();
    const location = useLocation();
    let { idRoom } = useParams();
    const [devices, setDevice] = useState();
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [item, setItem] = useState();
    const [newItem, setNewItem] = useState();

    const getDevices = async () => {
        const response = await deviceApi.get(idRoom)
        if (response) setDevice(response?.data)
        else alert(response)
    }

    useEffect(() => {
        getDevices()
    },[])

    const handleOpenModalEdit = (item) => {
        setItem(item)
        setShow(true)
    }

    const handleDelete = async (id) => {
        const response = await deviceApi.delete(id)
        if (response) setDevice(response?.data)
        else alert(response)
    }

    const handleClose = async () => {
        const response = await deviceApi.update(item?._id, item)
        if (response) {
            setDevice(response?.data)
            setShow(false)
        }
    };

    const handleCloseAdd = async () => {
        const response = await deviceApi.add(newItem)
        if (response) setDevice(response?.data)
        setShowAdd(false)
    }

    return(
        <div className="container">
            <h1>Apartment: {location.state?.nameApartment}</h1>
            <div className="ctn-search">
                <Form className="ctn-box-search"/>
                <Button variant="success" onClick={() => setShowAdd(true)}>Add</Button>
            </div>
            {
                devices ? (
                    <Table striped bordered hover style={{marginTop:30}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name device</th>
                            <th>Id Chip</th>
                            <th>Label</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            devices?.map((item, index) =>
                                <tr key={item?._id}>
                                    <td>{index+1}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.input?.esp_id}</td>
                                    <td>{item?.input?.gpio_id}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleOpenModalEdit(item)}>Edit</Button>
                                        <Button variant="danger" style={{marginLeft:10}} onClick={() => handleDelete(item?._id)}>Delete</Button>
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
                            <p>Name</p>
                            <Form.Control
                                placeholder={`Name: ${item?.name}`}
                                value={item?.name}
                                onChange={e => setItem({...item, name: e.target.value})}
                            />
                        </div>
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
                            <p>Name</p>
                            <Form.Control
                                placeholder={`Name`}
                                value={newItem?.name}
                                onChange={e => setNewItem({...newItem, name: e.target.value, id_room: idRoom})}
                            />
                        </div>
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
