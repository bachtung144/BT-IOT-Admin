import React, {useEffect, useRef, useState} from 'react';
import {Form, Button, Table, Modal} from 'react-bootstrap'
import {useHistory, useLocation, useParams} from "react-router-dom";
import roomApi from "../../services/api/room";
import {AiFillEye} from "react-icons/ai";

export const Room = () => {
    let history = useHistory();
    const location = useLocation();
    let { idBuilding, idApartment } = useParams();
    const [room, setRoom] = useState();
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [item, setItem] = useState();
    const [newItem, setNewItem] = useState();

    const getInfoRoom = async () => {
        const response = await roomApi.get(idApartment)
        if (response) setRoom(response?.data)
        else alert(response)
    }

    useEffect(() => {
        getInfoRoom()
    },[])

    const handleOpenModalEdit = (item) => {
        setItem(item)
        setShow(true)
    }

    const handleClose = async () => {
        const response = await roomApi.update(item?._id, item)
        if (response) {
            setRoom(response?.data)
            setShow(false)
        }
    };

    const handleCloseAdd = async () => {
        const response = await roomApi.add(newItem)
        if (response) setRoom(response?.data)
        setShowAdd(false)
    }

    const handleDelete = async (id) => {
        const response = await roomApi.delete(id)
        if (response) setRoom(response?.data)
        else alert(response)
    }

    return(
        <div className="container">
            <h1>Apartment: {location.state?.nameApartment}</h1>
            <div className="ctn-search">
                <Form className="ctn-box-search"/>
                <Button variant="success" onClick={() => setShowAdd(true)}>Add</Button>
            </div>
            {
                room ? (
                    <Table striped bordered hover style={{marginTop:30}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name Room</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            room?.map((item, index) =>
                                <tr key={item?._id}>
                                    <td>{index+1}</td>
                                    <td>{item?.name}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleOpenModalEdit(item)}>Edit</Button>
                                        <Button variant="danger" style={{marginLeft:10}} onClick={() => handleDelete(item?._id)}>Delete</Button>
                                        <AiFillEye
                                            style={{marginLeft:10, height:30, width:30, color:'blue'}}
                                            onClick={() => history.push(`/buildings/${idBuilding}/${idApartment}/${item?._id}/device`)}
                                        />
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
                                placeholder={`Address: ${item?.name}`}
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
                                onChange={e => setNewItem({...newItem, name: e.target.value, id_apartment: idApartment})}
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
