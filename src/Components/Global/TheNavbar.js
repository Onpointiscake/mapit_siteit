import React, { Component } from 'react'
import { Auth } from 'aws-amplify';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import './styles.css'

export default class TheNavbar extends Component {

    state = {
        session: false
    }

    async componentDidMount(){
        
        const session = await Auth.currentSession();
        if(session){
            this.setState({
                session: true
            })
        }
    }

    handleLogOut = (event) => {
        
        event.preventDefault()
        try{
            Auth.signOut()
            this.props.authentication.setAuthStatus(false)
            this.props.authentication.setUser(null)
            this.setState({ session: false })
            
        } catch (err) {
          console.log(err);
        }
        setTimeout(() =>  this.props.history.push('/'), 300);
    }
    render() {
        if(!this.state.session){
            return (
                <div>
                    <Navbar className="navbar-cont" collapseOnSelect expand="lg" bg="primary" variant="dark">
                        <Navbar.Brand className="logo" href="/">Mapit</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="about">Funcionalidades</Nav.Link>
                                <Nav.Link href="#pricing">Precios</Nav.Link>
                                <NavDropdown title="Mas" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/contact">Contacto</NavDropdown.Item>
                                    <NavDropdown.Item href="/profile">Sobre el autor</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Button className="login-btn" variant="warning" href="/login">Login</Button>
                                <Button className="register-btn" variant="light" href="/register">Register</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        } else {
            return (
                
                <div>
                    
                   <Navbar className="navbar-cont" collapseOnSelect expand="lg" bg="primary" variant="dark">
                        <Navbar.Brand className="logo" href="/news">Mapit</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                           
                                <Nav.Link href="/addsite">Sitios</Nav.Link>
                                <Nav.Link href="/usergallery">Mi Galeria</Nav.Link>
                                <NavDropdown title="Mas" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/contact">Contacto</NavDropdown.Item>
                                    <NavDropdown.Item href="/profile">Sobre el autor</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Button className="login-btn" variant="warning">Mi cuenta</Button>
                                <Button onClick={this.handleLogOut} className="register-btn" variant="light">Salir</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
            )
        }
        
    }
}
