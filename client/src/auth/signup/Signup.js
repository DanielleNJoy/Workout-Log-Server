/* eslint-disable no-whitespace-before-property */
import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
    const [email, setEmail] = useState(' ');
    const [password, setPassword] = useState(' ');

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/register', {
            method:'POST',
            body:JSON.stringify({user:{email:email, password:password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }) .then((response) => response.json()
        ) .then((data) => {
            props.updateToken(data.sessionToken)
        })
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">E-mail</Label>
                    <Input onChange={(e) => setEmail(e.target.value)} name='email' value={email} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} name='password' value={password} />
                </FormGroup>
                <Button type='submit'>Sign Up</Button>
            </Form>
        </div>
    )
}

export default Signup;