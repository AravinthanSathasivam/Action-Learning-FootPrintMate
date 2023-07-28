
import React, { useState } from 'react'
import axios from "axios";
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import Sign_img from '../Sign_img'
import { NavLink } from "react-router-dom";
import Header from './Header';
import Card from '@mui/material/Card';

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [date_of_birth, setDob] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const url = "http://localhost:8000/api/signup"
    const submit = () => {
        axios.post(url, {
            name,
            email,
            date_of_birth,
            password
        }).then(console.log("done"))
            .catch((e) => console.log(e))
        setIsSubmit(true)
    }

    return (
        <>
            <Header />
            <Card className="card-main mt-5" variant="outlined">
                <div className='row signup-card'>
                    <div className='col-5 sign-left'>
                        <h3 className='text-left mb-2'>Sign Up</h3>
                        <Form className='mt-3'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" name='name' value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control onChange={e => setDob(e.target.value)} value={date_of_birth} name='date' type="date" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" name='password' value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                            </Form.Group>
                            <div style={{ display: 'grid', placeItems: 'center' }}>
                                <Button variant="primary" className='mb-3 btn-medium w-100' onClick={submit}  type="submit">
                                    Submit
                                </Button>

                            </div>
                        </Form>
                        <p className='mt-3 text-center'>Already Have an Account ?  <span> <NavLink className={'text-green'} to="/login">Login</NavLink></span>  </p>
                    </div>
                    <div className='col-7 sign-right'>
                        <img src="./login-img.png" alt="signup-img" className='signup-img' />
                    </div>

                </div>
            </Card>
        </>
    )
}

export default SignUp;