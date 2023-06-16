import { Alert , Container, Row, Col } from 'react-bootstrap'

function MensajeFaltaVerificacion() {
    return (
        <main className="fondo-generico">
            <section>
                <Container className='mt-5'>
                    <Row>
                        <Col>
                            <Alert key="info"variant='info' className='shadow py-5'>
                                <h1 className='fs-4 text-center mb-3'>Tu matrícula todavía no fue verificada.</h1>
                                <p className='text-center px-5'>Estamos en el proceso de verificar tu matrícula para que puedas acceder a las funciones de profesionales de la salud. Este proceso puede llevar hasta 48hs.</p>
                                <p className='text-center px-5 mb-2'>Si tenés alguna duda sobre el proceso podés contactarnos por mail: <a href="mailto:eirainformacion@gmail.com">eirainformacion@gmail.com</a></p>
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default MensajeFaltaVerificacion