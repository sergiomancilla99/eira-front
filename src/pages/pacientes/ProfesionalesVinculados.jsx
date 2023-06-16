import { useContext, useEffect, useState } from 'react'
import * as ProfesionalesService from '../../services/profesionales.service.js'
import * as PacientesService from '../../services/pacientes.service.js'
import * as SolicitudesService from '../../services/solicitudes.service.js'
import { UsuarioContext } from '../../context/UsuarioContext.jsx'
import { Alert , Container, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap'

function ProfesionalesVinculados(){
    const [profesionales, setProfesionales] = useState([])
    const [paciente, setPaciente] = useState({})
    const [solicitudes, setSolicitudes] = useState([])
    const {usuarioLogueado} = useContext(UsuarioContext)
    const [loadingButton, setLoadingButton] = useState(false)
    const [loadingButtonAgregar, setLoadingButtonAgregar] = useState(false)

    useEffect(() => {
        ProfesionalesService.traer()
        .then(resp => setProfesionales(resp))

        PacientesService.traerPorId(usuarioLogueado?._id)
        .then(resp => setPaciente(resp))

        SolicitudesService.traerPorUsuario(usuarioLogueado?._id)
        .then( resp => setSolicitudes(resp))
        // eslint-disable-next-line
    }, [])

    function enviarSolicitud(profesional, ev) {
        setLoadingButtonAgregar(true)
        SolicitudesService.enviarSolicitud(paciente, profesional)
        .then(resp => setLoadingButtonAgregar(false))
        ev.target.innerText = 'Agregado'
    }

    function aceptarSolicitud(emisor, receptor) {
        setLoadingButton(true)
        SolicitudesService.agregarUsuario(emisor, receptor)
        .then(resp => {
            SolicitudesService.traerPorUsuario(usuarioLogueado?._id)
            .then(resp => setSolicitudes(resp))
            setLoadingButton(false)
        })
    }

    function buscarSolicitud(idProfesional) {
        const recibido = solicitudes.some((solicitud) => solicitud.emisor._id === idProfesional)
        return recibido
    }

    return (
        <main className="fondo-generico">
            <section>
                <Container>
                    <Row>
                        <Col>
                            <Card className='shadow my-5'>
                                <Card.Body className='mx-3'>
                                    <h1 className="titulo pt-2">Buscar profesionales</h1>
                                    <Alert key="info" variant='info' className='shadow py-5 my-4'>
                                        <h2 className='fs-4 mb-3'>Solicitudes</h2>
                                        <ul className="list-unstyled">
                                        {solicitudes.map((solicitud, i) =>
                                            <li key={i} className="d-flex align-items-center justify-content-between pb-2 mb-3 border-bottom border-dark">
                                                {!solicitud.aceptado && <>
                                                    <span><strong>{solicitud.emisor?.nombre} {solicitud.emisor?.apellido} - {solicitud.emisor?.especialidad}</strong> te envió una solicitud.</span>
                                                    <Button variant="verde" disabled={loadingButton} onClick={() => aceptarSolicitud(solicitud.emisor, solicitud.receptor)}>
                                                        {loadingButton &&
                                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                                        }
                                                        {!loadingButton && <span>✓</span>}
                                                    </Button>
                                                </>
                                                }
                                            </li>
                                        )}
                                        </ul>
                                    </Alert>
                                    <Table hover responsive className="mt-4">
                                        <thead>
                                            <tr>
                                                <th>Profesional</th>
                                                <th>Especialidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {profesionales.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado profesionales</td></tr>}
                                        {profesionales.map((profesional, i) =>
                                            <tr key={i}>
                                                <td>{profesional.nombre} {profesional.apellido}</td>
                                                <td>{profesional.especialidad}</td>
                                                <td>{buscarSolicitud(profesional._id) ? <Button variant="verde" disabled>Agregado</Button> : <Button variant="verde" disabled={loadingButtonAgregar} onClick={(ev) => enviarSolicitud(profesional,ev)}>
                                                    {loadingButtonAgregar &&
                                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                                    }
                                                    {!loadingButtonAgregar && <span>Agregar</span>}
                                                </Button>}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default ProfesionalesVinculados