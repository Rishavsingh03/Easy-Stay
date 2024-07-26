import React, { useState,useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegCompass } from "react-icons/fa";
import {logout} from '../store/index'
import { useLocation } from 'react-router-dom';
import  {serverUrl} from '../assets/assets'

function Header() {
  let isAuth=useSelector((state)=>state.auth.isloggedIn);
  const dispatch=useDispatch();
  const [isauth,setIsauth]=useState(false);
  const location=useLocation();
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token=localStorage.getItem("token");
        const response = await fetch(`${serverUrl}/checkAuth`, {
          method:"POST",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });
        if (response.ok) {
          setIsauth(true);
        }
        else{
          console.log("not logged in");
        }
      } catch (error) {
        console.log(error);
         dispatch(logout);
         setIsauth(false);
      }
    };
    checkAuthStatus();
  }, [isAuth]);
  return (
    <>
        <Navbar  bg="light" collapseOnSelect expand="md" className='min-h-20 border-bottom sticky-top' data-bs-theme="light">
        <Container className='m-0 mr-2 '>
          <Navbar.Brand href="/Listings"><FaRegCompass className='text-[#fe424d] text-[32px]' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto text-[#222222]">
            <Nav.Link href="/Listings" className='remove-style'>Explore</Nav.Link>
            <Nav.Link href="/Listings/new">Add Your Place</Nav.Link>
          </Nav>
          <Nav>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2 rounded-full" type="search" placeholder="Search Destination" aria-label="Search"/>
                <button className="btn rounded-full  my-2 my-sm-0 text-white opacity-85 hover:opacity-100 bg-[#fe424d]" type="submit">Search</button>
            </form>
          </Nav>
          <Nav className="ms-auto text-[#222222]">
        
            {
              isauth?(<Nav.Link href="/logout"><b>Logout</b></Nav.Link>):(<Nav><Nav.Link href="/login" state={{ from: location.pathname }}><b>Login</b></Nav.Link>
                <Nav.Link href="/signup" className='remove-style'><b>SignUp</b></Nav.Link></Nav>)
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