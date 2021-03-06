import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import userApi from "../../services/api/user";

export const Login = () => {
    let history = useHistory();
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleLogin = async () => {
        try {
            let params = {
                email: email,
                password: password,
            };
            const response = await userApi.login(params);
            const {token} = response;
            if (token) {
                history.push('buildings')
            }
        } catch (error) {
            alert(error.response?.data?.msg);
        }
    };

    return(
        <div style = {{height:"100vh", alignItems:'center', justifyContent:'center',
            display: 'flex', backgroundColor:'#212529', flexDirection:'column'}}>
            <h1 style={{color:'#FFFFFF'}}>BT-IOT</h1>
            <div style={{width:'50%', padding:20, backgroundColor:'#FFFFFF', borderRadius:20}}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                <Button variant="primary" onClick={() => handleLogin()}>
                    Login
                </Button>
            </div>
        </div>
    )
}
