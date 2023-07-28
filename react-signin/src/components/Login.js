import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import Login_img from '../Login_img';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../actions/userActions';
import Header from './Header';
import Card from '@mui/material/Card';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem('currentUser')) {
      navigate('/');
    }
  }, [navigate]);

  function login() {
    debugger
    const user = {
      email: email,
      password: password
    };
    dispatch(loginUser(user, navigate));
  }



  return (
    <>

      <Header />
      <Card className="card-main mt-5" variant="outlined">
        <div className='row signup-card'>
          <div className='col-5 sign-left'>
            <h3 className='text-left mb-2'>Login</h3>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <div style={{ display: 'grid', placeItems: 'center' }}>
                <Button variant="primary" className='mb-3 btn-medium w-100' onClick={login} type="button"> Submit </Button>
              </div>
            </Form>
            <p className='mt-3 text-center'>Create an account  <span> <NavLink className={'text-green'} to="/signup">Signup</NavLink></span>  </p>
          </div>
          <div className='col-7 sign-right'>
            <img src="./login-img.png" alt="login-img" className='login-img' />
          </div>

        </div>
      </Card>
    </>
  );
};

export default Login;
