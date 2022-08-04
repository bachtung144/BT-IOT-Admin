import React, {useEffect, useState} from 'react';
import {Form, Button, Table, Modal, Dropdown, DropdownButton} from 'react-bootstrap'
import { useLocation, useParams} from "react-router-dom";
import deviceApi from "../../services/api/device";
import chipApi from "../../services/api/chip";

export const Device = () => {
    const location = useLocation();
    let { roomId } = useParams();
    const [devices, setDevice] = useState();
    const [chips, setChips] = useState([]);
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [item, setItem] = useState();
    const [newItem, setNewItem] = useState();
    const [selectedType, setSelectedType] = useState();
    const [selectedLabel, setSelectedlLabe] = useState();
    const [listGpio, setListGpio] = useState([]);

    const getDevices = async () => {
        const response = await deviceApi.get(roomId)
        if (response) setDevice(response?.data)
        else alert(response)
    }

    const getChips = async () => {
        const response = await chipApi.getAll()
        if (response) setChips(response?.data)
        else alert(response)
    }

    useEffect(() => {
        getDevices()
        getChips()
    },[])

    const handleOpenModalEdit = (item) => {
        setItem(item)
        setShow(true)
    }

    const handleDelete = async (id) => {
        const response = await deviceApi.delete(id)
        if (response) {
            setDevice(response?.data)
            window.location.reload();
        }
        else alert(response)
    }

    const handleClose = async () => {
        const response = await deviceApi.update(item?._id, item)
        if (response) {
            setDevice(response?.data)
            setShow(false)
            window.location.reload();
        }
    };

    const handleCloseAdd = async () => {
        const response = await deviceApi.add(newItem)
        if (response) {
            setDevice(response?.data)
            window.location.reload();
        }
        setShowAdd(false)
    }

    const handleSelectChip = (key) => {
        let tmp = chips.find(item => item.esp_id === key).list_gpio
        let arrTmp = tmp?.filter(item => !item?.used)

        setListGpio(arrTmp)
        setSelectedType({ key});
        setNewItem({...newItem, input: {esp_id: key, gpio_id: selectedLabel?.key}})
    };

    const handleSelectChipEdit = (key) => {
        let tmp = chips.find(item => item.esp_id === key).list_gpio
        let arrTmp = tmp?.filter(item => !item?.used)

        setListGpio(arrTmp)
        setSelectedType({ key});
        setItem({...item, input: {esp_id: key, gpio_id: selectedLabel?.key}})
    };

    const handleSelectLabel = (key) => {
        let tmp = item?.input
        setSelectedlLabe({ key});
        setNewItem({...newItem, input: {...tmp, gpio_id: key, esp_id: selectedType?.key}})
    };

    const handleSelectLabelEdit = (key) => {
        let tmp = item?.input
        setSelectedlLabe({ key});
        setItem({...item, input: {...tmp, gpio_id: key, esp_id: selectedType?.key}})
    };

    return(
        <div className="container">
            <h1>Room: {location.state?.roomName}</h1>
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
                        <p>ESP</p>
                        <DropdownButton
                            variant={'secondary'}
                            alignRight
                            title={selectedType?.key || chips[0]?.esp_id}
                            onSelect={handleSelectChipEdit}
                        >
                            {chips?.map((item, index) => {
                                return (

                                    <Dropdown.Item key={index} eventKey={item.esp_id}>
                                        {item.esp_id}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                        {
                            selectedType ?
                                <div style={{marginTop:15}}>
                                    <p>GPIO</p>
                                    <DropdownButton
                                        variant={'secondary'}
                                        alignRight
                                        title={selectedLabel?.key || chips[0]?.list_gpio[0]?.id}
                                        onSelect={handleSelectLabelEdit}
                                    >
                                        {listGpio.map((item, index) => {
                                            return (
                                                <Dropdown.Item key={index} eventKey={item.id}>
                                                    {item.id}
                                                </Dropdown.Item>
                                            );
                                        })}
                                    </DropdownButton>
                                </div>
                                : null
                        }
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShow(false)}>
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
                                onChange={e => setNewItem({...newItem, name: e.target.value, room_id: roomId})}
                            />
                        </div>
                        <p>ESP</p>
                        <DropdownButton
                            variant={'secondary'}
                            alignRight
                            title={selectedType?.key || chips[0]?.esp_id}
                            onSelect={handleSelectChip}
                        >
                            {chips?.map((item, index) => {
                                return (

                                    <Dropdown.Item key={index} eventKey={item.esp_id}>
                                        {item.esp_id}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                        {
                            selectedType ?
                                <div style={{marginTop:15}}>
                                    <p >GPIO</p>
                                    <DropdownButton
                                        variant={'secondary'}
                                        alignRight
                                        title={selectedLabel?.key || chips[0]?.list_gpio[0]?.id}
                                        onSelect={handleSelectLabel}
                                        >
                                        {listGpio.map((item, index) => {
                                            return (
                                                <Dropdown.Item key={index} eventKey={item.id}>
                                                    {item.id}
                                                </Dropdown.Item>
                                            );
                                        })}
                                    </DropdownButton>
                                </div>
                                : null
                        }
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
