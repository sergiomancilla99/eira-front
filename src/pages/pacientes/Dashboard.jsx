import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Tratamiento from '../../imgs/tratamiento.png'
import Historia from '../../imgs/historia-clinica.png'
import Recetas from '../../imgs/medicamentos.png'
import ImgPerfil from '../../imgs/perfil.png'
import BuscarProf from '../../imgs/icono-buscar-verde.png'
import Chat from '../../imgs/icono-chat-azul.png'
import Progreso from '../../imgs/icono-progreso.png'
import { UsuarioContext } from "../../context/UsuarioContext";

function Dashboard() {
    const {usuarioLogueado} = useContext(UsuarioContext)
    let navigate = useNavigate()
    useEffect(
        () => {
            if(usuarioLogueado?.matricula) {
                navigate('/medico', { replace: true })
            }
          // eslint-disable-next-line
        }, [])

    return (
        <main id="dashboard" className="py-lg-5 pb-5">
            <section className="py-lg-5">
                <h1 className="visually-hidden">Dashboard Pacientes</h1>
                <Container fluid className="py-5 px-5">
                    <Row className="g-5">
                        <Col md={6} lg={3}>
                            <Link to={`/ver-tratamiento/${usuarioLogueado?._id}`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Tratamiento} alt="icono tratamiento médico" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-azul">Mis tratamientos</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to={`/paciente/historia-clinica`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Historia} alt="icono historia clínica" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-verde">Mis historia clínica</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to={`/progreso-tratamiento`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Progreso} alt="icono progreso" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-naranja">Mi progreso</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to="/paciente/pedir-recetas"className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Recetas} alt="icono recetas" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-amarillo">Recetas médicas</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to="/paciente/solicitudes"className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={BuscarProf} alt="icono profesionales" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-verde-oscuro">Agregar profesionales</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={6} lg={3}>
                            <Link to={`/home/perfil-paciente/${usuarioLogueado?._id}`} className="text-decoration-none">
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
                                        <p className="mb-0 title-dashboard text-azul">Chats</p>
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