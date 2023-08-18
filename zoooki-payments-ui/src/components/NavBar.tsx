// import { Link } from "react-router-dom"
import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import wLogo from '../assets/icons/n-logo-b.png'

const NavBar = () =>
{   
    return <>
        <Navbar expand="lg" className="bg-body-tertiary ">
            <Container className="justify-content-between">
                <Navbar.Brand href="/home"><img height={'42px'} src={wLogo}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto ">
                        <Nav.Link as={Link} to="/home">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            About
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contacts">
                            Contacts
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}

export default NavBar