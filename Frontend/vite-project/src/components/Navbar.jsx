import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaRegCompass } from "react-icons/fa";

function Header() {
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
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  )
}

export default Header