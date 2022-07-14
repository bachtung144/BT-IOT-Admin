import React, {useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import userApi from "../../services/api/user";

export const ChangePass = () => {
    let history = useHistory();
    const [oldPass, setOldPass] = useState()
    const [newPass, setNewPass] = useState()
    const [show, setShow] = useState(true)

    const handleChangePass = async () => {
        try {
            let params = {
                oldPassword: oldPass,
                newPassword: newPass,
            };
            const response = await userApi.changePass(params)
            if (response) {
                alert(response?.msg)
                history.replace('/')
            }
        }catch (error) {
            console.log(error)
            alert(error?.response?.data?.msg)
        }
    };

    return(
        <div style = {{ display: 'flex', flexDirection:'column', padding:10}}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter old password"
                            value={oldPass}
                            onChange={e => setOldPass(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            value={newPass}
                            onChange={e => setNewPass(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={() => handleChangePass()}>
                    Submit
                </Button>
        </div>
    )
}
