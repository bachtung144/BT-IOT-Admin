import React, {useEffect, useState} from 'react';
import {Form, Button, Table, Modal} from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import buildingApi from "../../services/api/building";
import { AiFillEye } from 'react-icons/ai';

export const Building = () => {
    let history = useHistory();
    const [buildings, setBuildings] = useState();
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [item, setItem] = useState();
    const [newItem, setNewItem] = useState();

    const getList = async () => {
        const response = await buildingApi.getAll()
        if (response) setBuildings(response?.data)
        else alert(response)
    }

    const handleDelete = async (id) => {
        const response = await buildingApi.delete(id)
        if (response) setBuildings(response?.data)
        else alert(response)
    }

    useEffect(() => {
        getList()
    },[])

    const handleCloseEdit = async () => {
        const response = await buildingApi.update(item?._id, item)
        if (response) setBuildings(response?.data)
        setShowEdit(false)
    };

    const handleOpenEdit = (item) => {
        setItem(item)
        setShowEdit(true)
    }

    const handleCloseAdd = async () => {
        const response = await buildingApi.add(newItem)
        if (response) setBuildings(response?.data)
        setShowAdd(false)
    }

    return(
        <div className="container">
            <h1>Buildings</h1>
            <div className="ctn-search">
                <Form className="ctn-box-search"/>
                <Button variant="success" onClick={() => setShowAdd(true)}>Add</Button>
            </div>
            {
                buildings ? (
                    <Table striped bordered hover style={{marginTop:30}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name Building</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>District</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            buildings?.map((item, index) =>
                                <tr key={item?._id}>
                                    <td>{index+1}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.address}</td>
                                    <td>{item?.city}</td>
                                    <td>{item?.district}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => handleOpenEdit(item)}>Edit</Button>
                                        <Button variant="danger" onClick={() => handleDelete(item?._id)} style={{marginLeft:10}}>Delete</Button>
                                        <AiFillEye
                                            style={{marginLeft:10, height:30, width:30, color:'blue'}}
                                            onClick={() => history.push({
                                                pathname: `buildings/${item?._id}`,
                                                state: {nameBuilding: item?.name}
                                            })}
                                        />
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </Table>
                ) : <div> Loading</div>
            }
            <Modal show={showEdit} onHide={() => setShowEdit(false)}>
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

                        <div style={{marginBottom:10}}>
                            <p>Address</p>
                            <Form.Control
                                placeholder={`Address: ${item?.address}`}
                                value={item?.address}
                                onChange={e => setItem({...item, address: e.target.value})}
                            />
                        </div>

                        <div style={{marginBottom:10}}>
                            <p>District</p>
                            <Form.Control
                                placeholder={`District: ${item?.district}`}
                                value={item?.district}
                                onChange={e => setItem({...item, district: e.target.value})}
                            />
                        </div>

                        <div style={{marginBottom:10}}>
                            <p>City</p>
                            <Form.Control
                                placeholder={`City: ${item?.city}`}
                                value={item?.city}
                                onChange={e => setItem({...item, city: e.target.value})}
                            />
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowEdit(false)}>
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
                            <p>Name</p>
                            <Form.Control
                                placeholder={`Name`}
                                value={newItem?.name}
                                onChange={e => setNewItem({...newItem, name: e.target.value})}
                            />
                        </div>

                        <div style={{marginBottom:10}}>
                            <p>Address</p>
                            <Form.Control
                                placeholder={`Address`}
                                value={newItem?.address}
                                onChange={e => setNewItem({...newItem, address: e.target.value})}
                            />
                        </div>

                        <div style={{marginBottom:10}}>
                            <p>District</p>
                            <Form.Control
                                placeholder={`District`}
                                value={newItem?.district}
                                onChange={e => setNewItem({...newItem, district: e.target.value})}
                            />
                        </div>

                        <div style={{marginBottom:10}}>
                            <p>City</p>
                            <Form.Control
                                placeholder={`City`}
                                value={newItem?.city}
                                onChange={e => setNewItem({...newItem, city: e.target.value})}
                            />
                        </div>
                    </Form.Group>
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
