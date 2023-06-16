import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Pacientes from '../imgs/pacientes.png'
import Recetas from '../imgs/medicamentos.png'
import ImgPerfil from '../imgs/perfil.png'
import { UsuarioContext } from "../context/UsuarioContext";
import BuscarPaciente from '../imgs/icono-buscar-azul.png'
import Chat from '../imgs/icono-chat-verde.png'

function Dashboard() {
    const {usuarioLogueado} = useContext(UsuarioContext)
    let navigate = useNavigate()

    useEffect(
        () => {
            if(!usuarioLogueado?.matricula) { navigate('/paciente', { replace: true }) }
          // eslint-disable-next-line
        }, [])

    return (
        <main id="dashboard" className="py-5">
            <section className="py-5">
                <h1 className="visually-hidden">Dashboard Médicos</h1>
                <Container fluid className="py-5 px-5">
                    <Row className="g-5">
                        <Col md={6} lg={3}>
                            <Link to={`/profesional/pacientes`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Pacientes} alt="icono mis pacientes" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-verde">Mis pacientes</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to="/medico/pedidos-recetas" className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Recetas} alt="icono recetas" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-amarillo">Recetas médicas</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to={`/solicitudes`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={BuscarPaciente} alt="icono pacientes" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-azul">Agregar pacientes</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to={`/mi-perfil/${usuarioLogueado?._id}`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={ImgPerfil} alt="icono perfil" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-naranja">Mi perfil</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to='/chat' className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Chat} alt="icono chat" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-verde-oscuro">Chats</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Dashboard