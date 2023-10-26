import React, { useContext, useEffect, useState } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import LogoEiraBlanco from '../imgs/logo-eira-blanco.png';
import IconoUsuarioBlanco from '../imgs/icono-usuario-blanco.png';
import IconoUsuarioAzul from '../imgs/icono-usuario-azul.png';
import { Link } from "react-router-dom";
import Logout from './Logout'
import { UsuarioContext } from '../context/UsuarioContext'
import * as RecordatorioService from '../services/recordatorios.service.js'
import { DateTime } from 'luxon'

function NavbarEira() {
    const { usuarioLogueado } = useContext(UsuarioContext)
    const [historial, setHistorial] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        RecordatorioService.traerHistorialPorIdUsuario(usuarioLogueado._id)
            .then(resp => {
                if (resp.ok) {
                    const filter = resp.historial.notificaciones.filter(historial => historial.clicked !== true)
                    const objArmado = { ...resp.historial, notificaciones: filter }
                    setHistorial(objArmado)
                    // console.log("a", resp)
                }
            })
    }, [historial])


    function clickedNoti(notificacion) {
        // console.log(notificacion)
        RecordatorioService.editarHistorial({ idUsuario: usuarioLogueado._id, notificacion })
        .then(resp => {
            RecordatorioService.traerHistorialPorIdUsuario(usuarioLogueado._id)
            .then(resp => {
            setHistorial(resp.historial)
            })
        })
    }

    function pedirHistorial() {
        RecordatorioService.traerHistorialPorIdUsuario(usuarioLogueado._id)
            .then(resp => {
                setHistorial(resp.historial)
            })
    }

    const closeDropdown = () => {
        setShowDropdown(false);
    };
    return (
        <header>
            <Navbar className="bgNavbarGreen fw-bold" expand="lg" variant="dark" id="logueado-navbar">
                <Container fluid>

                    <Link to={`/`} ><img src={LogoEiraBlanco} alt="Logo de Eira" /> </Link>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <div id="div-notificaciones">
                        {!usuarioLogueado?.matricula &&
                            <NavDropdown
                                className="show"
                                id="drop-notificaciones"
                                title={
                                    <><i className="bi bi-bell-fill"></i>
                                        <Badge pill bg="naranja">{historial?.notificaciones?.length}</Badge>
                                    </>
                                }
                                show={showDropdown}
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <div className="padre">
                                    {historial?.notificaciones?.length === 0 &&
                                        <NavDropdown.Item className="quitar-hover">
                                            <span>No tenés notificaciones pendientes</span>
                                        </NavDropdown.Item>
                                    }
                                    {historial?.length === 0 &&
                                        <NavDropdown.Item className="quitar-hover">
                                            <span>No tenés notificaciones pendientes</span>
                                        </NavDropdown.Item>
                                    }
                                    {historial?.notificaciones?.map((noti, i) =>
                                        <div key={i}>
                                            <Link to={noti.link} onClick={() => clickedNoti(noti)} className="dropdown-item  text-wrap pe-5">
                                                <p className="fecha">¿Tomaste el medicamento?</p>
                                                {noti.nombre}
                                                <p className="fecha">{DateTime.fromISO(noti.fecha).toFormat('ff') === "Invalid DateTime" ? DateTime.fromMillis(noti.fecha).toFormat('ff') : DateTime.fromISO(noti.fecha).toFormat('ff')}</p>
                                            </Link>
                                            <NavDropdown.Divider />
                                        </div>
                                    ).reverse()}
                                </div>

                            </NavDropdown>
                        }
                    </div>

                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="ms-auto" onSelect={closeDropdown}>
                            <div className="d-lg-none navbar-mobile">
                                <div className="mt-4">
                                    <img src={IconoUsuarioAzul} alt="Icono de usuario color azul" className="img-fluid" />
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
                                <img src={IconoUsuarioBlanco} alt="Icono de usuario blanco" className="img-fluid" />
                            } id="basic-nav-dropdown">
                                {usuarioLogueado &&
                                    <NavDropdown.Item>
                                        <img src={IconoUsuarioAzul} alt="Icono de usuario color azul" className="img-fluid" />
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
        </header >
    );
}

export default NavbarEira