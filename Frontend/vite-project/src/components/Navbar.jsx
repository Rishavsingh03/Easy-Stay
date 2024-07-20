import React, { useState,useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCompass } from "react-icons/fa";
import {logout} from '../store/index'
import { useLocation } from 'react-router-dom';


function Header() {
  let isAuth=useSelector((state)=>state.auth.isloggedIn);
  const dispatch=useDispatch();
  const [isauth,setIsauth]=useState(false);
  const location=useLocation();
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("http://localhost:8080/checkAuth", { credentials: 'include' });
        console.log(response);
        if (response.ok) {
          setIsauth(true);
        }
      } catch (error) {
         dispatch(logout);
         setIsauth(false);
      }
    };
    checkAuthStatus();
  }, [isAuth]);
  return (
    <>
        <Navbar  bg="light" collapseOnSelect expand="md" className='h-20 border-bottom sticky-top' data-bs-theme="light">
        <Container className='m-0 '>
          <Navbar.Brand href="/"><FaRegCompass className='text-[#fe424d] text-[32px]' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto text-[#222222]">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Listings" className='remove-style'>All Listings</Nav.Link>
            <Nav.Link href="/Listings/new">Add Listings</Nav.Link>
          </Nav>
          <Nav className="ms-auto text-[#222222]">
            {
              isauth?(<Nav.Link href="/logout">Logout</Nav.Link>):(<Nav><Nav.Link href="/login" state={{ from: location.pathname }}>Login</Nav.Link>
                <Nav.Link href="/signup" className='remove-style'>SignUp</Nav.Link></Nav>)
            }
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  )
}

export default Header