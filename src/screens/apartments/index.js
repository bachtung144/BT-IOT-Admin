import React, {useEffect, useState} from 'react';
import {Form, Button, Table, Modal} from 'react-bootstrap'
import {useHistory, useParams, useLocation} from "react-router-dom";
import apartmentApi from "../../services/api/apartment";

export const Apartment = () => {
    let history = useHistory();
    const location = useLocation();
    let { buildingId } = useParams();
    const [apartment, setApartment] = useState();
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [item, setItem] = useState();
    const [newItem, setNewItem] = useState();
    const [validated, setValidated] = useState();
    const [validatedEdit, setValidatedEdit] = useState();

    const getInfoApartment = async () => {
        const response = await apartmentApi.get(buildingId)
        if (response) setApartment(response?.data)
        else alert(response)
    }

    const handleOpenModalEdit = (item) => {
        setItem(item)
        setShow(true)
    }

    const handleCloseEdit = async () => {
        if (!item?.address || !item ) setValidatedEdit(true)
        else {
            const response = await apartmentApi.update(item?._id, item)
            if (response) {
                setApartment(response?.data)
                setShow(false)
                setValidatedEdit(false)
            }
        }
    };

    const handleDelete = async (id) => {
        const response = await apartmentApi.delete(id)
        if (response) setApartment(response?.data)
        else alert(response)
    }

    const handleCloseAdd = async () => {
        if (!newItem?.address || !newItem) setValidated(true)
        else {
            const response = await apartmentApi.add(newItem)
            if (response) setApartment(response?.data)
            setShowAdd(false)
            setValidated(false)
        }
    }


    useEffect(() => {
        getInfoApartment()
    },[])

    return(
        <div className="container">
            <h1>Building: {location.state?.nameBuilding}</h1>
            <div className="ctn-search">
                <Button variant="success" onClick={() => setShowAdd(true)}>Add</Button>
            </div>
            {
                apartment ? (
                    <Table striped bordered hover style={{marginTop:30}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name Apartment</th>
                            <th>Manage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            apartment?.map((item, index) =>
                                <tr key={item?._id}>
                                    <td>{index+1}</td>
                                    <td>{item?.address}</td>
                                    <td>
                                        <Button
                                            variant="info"
                                            onClick={() => history.push({
                                                pathname: `/buildings/${buildingId}/${item?._id}/room`,
                                                state: {nameApartment: item?.address}})}
                                            style={{marginRight:10}}
                                        >
                                            Rooms
                                        </Button>
                                        <Button variant="secondary"
                                                onClick={() => history.push({
                                                    pathname: `/buildings/${buildingId}/${item?._id}/user`,
                                                    state: {nameApartment: item?.address}})}
                                        >Users</Button>
                                    </td>
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
                            <p>Name Apartment</p>
                            <Form.Control
                                placeholder={`Address: ${item?.address}`}
                                value={item?.address}
                                onChange={e => setItem({...item, address: e.target.value})}
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
                            <p>Name Apartment</p>
                            <Form.Control
                                placeholder={`Address`}
                                value={newItem?.address}
                                onChange={e => setNewItem({...newItem, address: e.target.value, building_id: buildingId})}
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
