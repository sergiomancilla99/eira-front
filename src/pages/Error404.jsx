import React from "react";
import {Container, Row, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Img404 from '../imgs/404.png'

function Error404() {
    return (
        <main id="error-404">
            <section>
                <Container fluid>
                    <Row>
                        <Col className="px-0">
                            <h1 className="titulo text-center mt-5">Error 404</h1>
                            <p className="text-center mb-4">¡Oops! No encontramos la página que estás buscando...</p>
                            <div className="d-flex justify-content-center">
                                <Link to={'/'} className="btn btn-azul">Volver al incio</Link>
                            </div>
                            <img src={Img404} className="img-fluid" alt="ilustración de cable desenchufado"/>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Error404