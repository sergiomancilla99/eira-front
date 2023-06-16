import React, { useContext } from "react";
import { Container, Nav, Navbar } from 'react-bootstrap';
import LogoEiraBlanco from '../imgs/logo-eira-blanco.png';
import { HashLink as Link } from 'react-router-hash-link';
import { UsuarioContext } from '../context/UsuarioContext'

function NavbarEira() {
    const {usuarioLogueado} = useContext(UsuarioContext)

    return (
        <header>
            <Navbar className="bgNavbarGreen fw-bold" expand="lg" variant="dark">
                <Container fluid>
                    <Link to='/' ><img src={LogoEiraBlanco} alt="Logo de Eira" /></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Link to='/' className="nav-link">Inicio</Link>
                            <Link to='/#funciones' className="nav-link">Beneficios</Link>
                            <Link to='/#pacientes' className="nav-link">Pacientes</Link>
                            <Link to='/#profesionales' className="nav-link">Profesionales</Link>
                            <Link to='/#contacto' className="nav-link">Contacto</Link>
                            {!usuarioLogueado && <Link to='/login' className="nav-link">Iniciar sesión</Link>}
                            {!usuarioLogueado && <Link to='/registro' className="nav-link">Registrarse</Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavbarEira