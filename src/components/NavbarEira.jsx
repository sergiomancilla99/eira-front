import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import LogoEiraBlanco from '../imgs/logo-eira-blanco.png';
import IconoUsuarioBlanco from '../imgs/icono-usuario-blanco.png';
import IconoUsuarioAzul from '../imgs/icono-usuario-azul.png';
import { Link } from "react-router-dom";
import Logout from './Logout'
import { UsuarioContext } from '../context/UsuarioContext'

function NavbarEira() {
    const {usuarioLogueado} = useContext(UsuarioContext)

    return (
        <header>
            <Navbar className="bgNavbarGreen fw-bold" expand="lg" variant="dark" id="logueado-navbar">
                <Container fluid>
                    <Link to={`/`} ><img src={LogoEiraBlanco} alt="Logo de Eira" /> </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <div className="d-lg-none navbar-mobile">
                                <div className="mt-4">
                                    <img src={IconoUsuarioAzul} alt="Icono de usuario color azul" className="img-fluid"/>
                                    <span className="nombreNavbar">{usuarioLogueado?.nombre}</span>
                                </div>
                                <Link to={`/`} className="nav-link">Inicio</Link>
                                {!usuarioLogueado?.matricula && <Link to={`/paciente`} className="dropdown-item">Dashboard</Link>}
                                {usuarioLogueado?.matricula && <Link to={`/medico`} className="dropdown-item">Dashboard</Link>}
                                {usuarioLogueado?.matricula && <Link to={`/profesional/pacientes`} className="dropdown-item">Lista mis pacientes</Link>}
                                {usuarioLogueado && <Link to={usuarioLogueado.matricula ? `/mi-perfil/${usuarioLogueado._id}` : `/home/perfil-paciente/${usuarioLogueado._id}`} className="dropdown-item">Mi perfil</Link>}
                                {!usuarioLogueado?.matricula && <Link to={`/paciente/historia-clinica`} className="dropdown-item">Mi historia clínica</Link>}
                                {usuarioLogueado && <Logout />}
                            </div>
                            <NavDropdown className="d-none d-lg-block" title={
                                    <img src={IconoUsuarioBlanco} alt="Icono de usuario blanco" className="img-fluid"/>
                                } id="basic-nav-dropdown">
                                {usuarioLogueado &&
                                    <NavDropdown.Item>
                                        <img src={IconoUsuarioAzul} alt="Icono de usuario color azul" className="img-fluid"/>
                                        <span className="nombreNavbar">{usuarioLogueado.nombre}</span>
                                    </NavDropdown.Item>
                                }

                                <NavDropdown.Divider />

                                <Link to={`/`} className="dropdown-item">Inicio</Link>
                                {usuarioLogueado?.admin && <Link to={`/admin`} className="dropdown-item">Dashboard</Link>}
                                {(!usuarioLogueado?.matricula && !usuarioLogueado?.admin) && <Link to={`/paciente`} className="dropdown-item">Dashboard</Link>}
                                {usuarioLogueado?.matricula && <Link to={`/medico`} className="dropdown-item">Dashboard</Link>}
                                {usuarioLogueado?.matricula && <Link to={`/profesional/pacientes`} className="dropdown-item">Lista mis pacientes</Link>}
                                {usuarioLogueado && <Link to={usuarioLogueado.matricula ? `/mi-perfil/${usuarioLogueado._id}` : `/home/perfil-paciente/${usuarioLogueado._id}`} className="dropdown-item">Mi perfil</Link>}
                                {(!usuarioLogueado?.matricula && !usuarioLogueado?.admin) && <Link to={`/paciente/historia-clinica`} className="dropdown-item">Mi historia clínica</Link>}

                                <NavDropdown.Divider />

                                {usuarioLogueado && <Logout />}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default NavbarEira