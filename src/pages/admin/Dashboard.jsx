import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap';
import Medicos from '../../imgs/medicos.png'
import Pacientes from '../../imgs/pacientes.png'
import { UsuarioContext } from "../../context/UsuarioContext";

function Dashboard() {
    const {usuarioLogueado} = useContext(UsuarioContext)

    let navigate = useNavigate();

    useEffect(
        () => {
            if(!usuarioLogueado?.admin) { navigate('/', { replace: true }) }
          // eslint-disable-next-line
        }, [])

    return (
        <main id="dashboard" className="pt-5">
            <section className="pt-5">
                <h1 className="visually-hidden">Dashboard Administrador</h1>
                <Container fluid className="pt-5 px-5">
                    <Row className="g-5 justify-content-center">
                        <Col lg={4}>
                            <Link to={`/admin/medicos`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Medicos} alt="icono médicos" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-azul">Médicos</p>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col lg={4}>
                            <Link to={`/admin/pacientes`} className="text-decoration-none">
                                <Card className="shadow border-0 py-3">
                                    <Card.Body className="text-center">
                                        <img src={Pacientes} alt="icono pacientes" className="img-fluid mb-2"/>
                                        <p className="mb-0 title-dashboard text-verde">Pacientes</p>
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