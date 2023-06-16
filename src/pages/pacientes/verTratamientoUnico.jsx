import * as TratamientosService from '../../services/tratamientos.service.js'
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Card, Container, Row, Col, Accordion, Spinner } from 'react-bootstrap'
import * as PacientesService from '../../services/pacientes.service.js'
import { UsuarioContext } from '../../context/UsuarioContext.jsx'

function VerTratamientoUnico() {
    const [tratamiento, setTratamiento] = useState([])
    const [paciente, setPaciente] = useState({})
    const {usuarioLogueado} = useContext(UsuarioContext)
    const location = useLocation()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        TratamientosService.traerPorIdTratamiento(location.state.idTratamiento)
        .then(resp => {
            setTratamiento(resp)
            setLoading(false)
        })
        PacientesService.traerPorId(usuarioLogueado?._id)
        .then(resp => setPaciente(resp))
        // eslint-disable-next-line
    }, [])

    return (
        <main className="fondo-generico">
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                                <h1 className="titulo">Ver tratamiento</h1>
                                {loading &&
                                    <div className='text-center'>
                                        <Spinner animation="border" className='color-spinner' />
                                    </div>
                                }

                                {!loading &&
                                <>
                                    <Row>
                                        <Col lg={6}>
                                            <p><span className="fw-bold">Paciente:</span> {paciente.nombre} {paciente.apellido}</p>
                                            <p><span className="fw-bold">N° de Documento: </span> {paciente.dni}</p>
                                        </Col>
                                    </Row>

                                    <Accordion defaultActiveKey={tratamiento._id} className='shadow my-3'>
                                        <Accordion.Item eventKey={tratamiento._id}>
                                            <Accordion.Header><p>Diagnóstico:&nbsp;<b>{tratamiento.diagnostico}</b></p></Accordion.Header>
                                            <Accordion.Body>
                                                <p><b>Profesional:</b> {tratamiento?.profesional?.nombre} {tratamiento?.profesional?.apellido}</p>
                                                {tratamiento.tratamiento?.comidas?.length > 0 &&
                                                    <Card className="border-0 shadow my-4">
                                                        <Card.Header className="tratamiento-header-paciente">Comidas Restringidas</Card.Header>
                                                        <Card.Body className="px-4">
                                                            <ul className="lista-agregada d-lg-flex justify-content-center">
                                                                {tratamiento.tratamiento?.comidas?.map((comida, k) =>
                                                                    <li className="shadow mx-2 mb-3 mb-lg-0" key={k}>
                                                                        <span>{comida}</span><br/>
                                                                    </li>
                                                                    )}
                                                                </ul>
                                                        </Card.Body>
                                                    </Card>
                                                }

                                                {tratamiento.tratamiento?.medicamentos?.length > 0 &&
                                                    <Card className="border-0 shadow my-4">
                                                        <Card.Header className="tratamiento-header-paciente">Medicamentos</Card.Header>
                                                        <Card.Body className="px-4">
                                                            <ul className="lista-agregada-meds">
                                                                {tratamiento.tratamiento?.medicamentos?.map((medicamento, i) =>
                                                                    <li className="shadow mb-3" key={i}>
                                                                        <span className="fw-bold">{medicamento.nombre}</span><br/>
                                                                        <span>
                                                                            <span className="fw-bold">Frecuencia:</span> <br className="d-block d-sm-none"/>{medicamento.horas} hs
                                                                        </span><br/>
                                                                        <span>
                                                                            <span className="fw-bold">Finaliza el:</span> <br className="d-block d-sm-none"/>{medicamento.fecha}
                                                                        </span><br />
                                                                    </li>
                                                                )}
                                                                </ul>
                                                            </Card.Body>
                                                    </Card>
                                                }

                                                {tratamiento.tratamiento?.ejercicios?.length > 0 &&
                                                    <Card className="border-0 shadow my-4">
                                                        <Card.Header className="tratamiento-header-paciente">Ejercicios</Card.Header>
                                                        <Card.Body className="px-4">
                                                            <ul className="lista-agregada-meds">
                                                                {tratamiento.tratamiento?.ejercicios?.map((ejercicio, l) =>
                                                                <li className="shadow mb-3" key={l}>
                                                                    <span className="fw-bold">{ejercicio.ejercicio}</span><br/>
                                                                    <span>
                                                                        <span className="fw-bold">Repeticiones:</span> <br className="d-block d-sm-none"/>{ejercicio.repeticiones}
                                                                    </span><br/>
                                                                    <span>
                                                                        <span className="fw-bold">Video:</span><br className="d-block d-sm-none"/> {ejercicio.video}
                                                                    </span>
                                                                </li>
                                                                )}
                                                                </ul>
                                                        </Card.Body>
                                                    </Card>
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </>
                                }
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default VerTratamientoUnico