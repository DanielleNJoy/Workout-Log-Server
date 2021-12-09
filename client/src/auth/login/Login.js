/* eslint-disable no-whitespace-before-property */
import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Login = (props) => {
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/login', {
            method:'POST',
            body:JSON.stringify({
                user:{
                email:email, 
                password:password
            }
        }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((response) => response.json()
        ) .then((data) => {
            props.updateToken(data.sessionToken)
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">E-Mail</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} name='username' value={email} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name='password' value={password} />
                </FormGroup>
                <Button type='submit'>Login</Button>
            </Form>
        </div>
    )
}

export default Login;