import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
  const user = useSelector(state => state.loginUserReducer.currentUser);
  return (
    <>
      <Navbar className='navBar-home'>
        <div className=' d-flex align-items-center justify-content-between w-100 px-3'>
          <div>
          <a href="/home" >
          <img src="/logo.png" alt="Carbon Calculator" className="nav-logo" />
          </a>       
          </div>

          <div>
          <button
            onClick={() => { window.location.href = "/login"; }} className="mx-3 btn-small  secondary-btn">login
          </button>
          <button
            onClick={() => { window.location.href = "/signup"; }} className="btn-small">Sign Up
          </button>
        </div>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
