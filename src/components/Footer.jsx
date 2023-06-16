import { HashLink as Link } from 'react-router-hash-link';
import { Container, Row, Col} from 'react-bootstrap';

function Footer() {
    return (
        <footer>
            <Container fluid>
                <Row>
                    <Col lg={6} className="order-1 order-lg-0">
                        <p className="text-center text-lg-start">EIRA 2022 © Todos los derechos reservados</p>
                    </Col>
                    <Col lg={6} className="order-0 order-lg-1 mb-3 mb-lg-0">
                        <ul className="d-lg-flex justify-content-end text-center ps-0">
                            <Link to='/#contacto' className="nav-link me-lg-3">Contacto</Link>
                            <Link to='/politicas-de-privacidad' className="nav-link me-lg-3">Políticas de Privacidad</Link>
                            <Link to='/terminos-y-condiciones' className="nav-link">Términos y Condiciones</Link>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer