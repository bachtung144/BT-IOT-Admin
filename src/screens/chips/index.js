import React, {useEffect, useState} from 'react';
import {Form, Button, Table, Modal} from 'react-bootstrap'
import chipApi from "../../services/api/chip";

export const Chip = () => {
    const [chips, setChips] = useState();
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [item, setItem] = useState();
    const [newItem, setNewItem] = useState();

    const getAll = async () => {
        const response = await chipApi.getAll()
        if (response) setChips(response?.data)
        else alert(response)
    }

    useEffect(() => {
        getAll()
    },[])

    const handleClose = async () => {
        const response = await chipApi.update(item?._id, item)
        if (response) setChips(response?.data)
        setShow(false)
    };

    const handleOpenModalEdit = (item) => {
        setItem(item)
        setShow(true)
    }

    const handleCloseAdd = async () => {
        const response = await chipApi.add(newItem)
        if (response) setChips(response?.data)
        setShowAdd(false)
    }

    const handleDelete = async (id) => {
        const response = await chipApi.delete(id)
        if (response) setChips(response?.data)
        else alert(response)
    }

    return (
        <div className="container">
            <div className="ctn-search" style={{marginTop:20}}>
                <Form className="ctn-box-search"/>
                <Button variant="success" onClick={() => setShowAdd(true)}>Add</Button>
            </div>
            {
                chips ? (
                    <Table striped bordered hover style={{marginTop:30}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>ESP</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            chips?.map((item, index) =>
                                <tr key={item?._id}>
                                    <td>{index+1}</td>
                                    <td>{item?.esp_id}</td>
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
                            <p>ESP</p>
                            <Form.Control
                                placeholder={`ESP: ${item?.esp_id}`}
                                value={item?.esp_id}
                                onChange={e => setItem({...item, esp_id: e.target.value})}
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
                            <p>ESP</p>
                            <Form.Control
                                placeholder={`ESP`}
                                value={newItem?.esp_id}
                                onChange={e => setNewItem({...newItem, esp_id: e.target.value})}
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
