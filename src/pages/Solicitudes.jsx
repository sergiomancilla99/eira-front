import { useContext, useEffect, useState } from "react"
import { UsuarioContext } from "../context/UsuarioContext.jsx"
import * as SolicitudesService from '../services/solicitudes.service.js'
import * as PacientesService from '../services/pacientes.service.js'
import * as ProfesionalesService from '../services/profesionales.service.js'
import { Alert, Container, Row, Col, Card, Button, Table, Form, Spinner } from 'react-bootstrap'
import * as ChatService from "../services/chat.service.js"
import { useNavigate } from 'react-router-dom'

function Solicitudes() {
    const [solicitudes, setSolicitudes] = useState([])
    const [solicitudesEnviadas, setSolicitudesEnviadas] = useState([])
    const [solicitudesRecibidas, setSolicitudesRecibidas] = useState([])
    const [usuariosPacientes, setUsuariosPacientes] = useState([])
    const [profesional, setProfesional] = useState({})
    const [busqueda, setBusqueda] = useState("")
    const {usuarioLogueado} = useContext(UsuarioContext)
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [loadingButton, setLoadingButton] = useState(false)
    const [loadingButtonAgregar, setLoadingButtonAgregar] = useState(false)

    useEffect(
        () => {
            if(!usuarioLogueado?.matricula) { navigate('/', { replace: true }) }
            if(!usuarioLogueado?.verificado) { navigate('/falta-verificacion', {replace: true}) }
          // eslint-disable-next-line
        }, [])

    useEffect(() => {
        SolicitudesService.traerPorUsuario(usuarioLogueado?._id)
        .then(resp => {
            const soliEnviadas = resp.filter(solicitud => solicitud.emisor._id === usuarioLogueado?._id)
            const soliRecibidas = resp.filter(solicitud => solicitud.receptor._id === usuarioLogueado?._id)
            setSolicitudes(resp)
            setSolicitudesEnviadas(soliEnviadas)
            setSolicitudesRecibidas(soliRecibidas)
            setLoading(false)
        })

        PacientesService.traer()
        .then(resp => setUsuariosPacientes(resp))

        ProfesionalesService.traerPorId(usuarioLogueado?._id)
        .then(resp => setProfesional(resp))
        // eslint-disable-next-line
    }, [solicitudes])

    function aceptarSolicitud(emisor, receptor) {
        setLoadingButton(true)
        SolicitudesService.agregarUsuario(emisor, receptor)
        .then(resp => {
            SolicitudesService.traerPorUsuario(usuarioLogueado?._id)
            .then(resp => setSolicitudes(resp))
            setLoadingButton(false)
        })

        const usuarios = {
            emisor: emisor._id,
            receptor: receptor._id
        }
        ChatService.crear(usuarios)
        .then(resp => console.log(resp))
    }

    function enviarSolicitud(paciente, ev) {
        setLoadingButtonAgregar(true)
        SolicitudesService.enviarSolicitud(profesional, paciente)
        .then(resp => setLoadingButtonAgregar(false))
        ev.target.innerText = 'Agregado'
    }

    function buscarVinculacion(idPaciente) {
        const recibidasAceptado = solicitudesRecibidas.some((solicitud) => solicitud.emisor._id === idPaciente && solicitud.aceptado === true)
        const enviadasAceptado = solicitudesEnviadas.some((solicitud) => solicitud.receptor._id === idPaciente &&  solicitud.aceptado === true)
        if(recibidasAceptado || enviadasAceptado) {
            return 'aceptado'
        } else {
            const recibidas = solicitudesRecibidas.some((solicitud) => solicitud.emisor._id === idPaciente)
            const enviadas = solicitudesEnviadas.some((solicitud) => solicitud.receptor._id === idPaciente)

            if(recibidas || enviadas) {
                return 'pendiente'
            } else {
                return 'habilitado'
            }
        }
    }

    const resultado = usuariosPacientes.filter(paciente => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.apellido.toLowerCase().includes(busqueda.toLowerCase()))

    return (
        <main className="fondo-generico">
            <Container>
                <Row>
                    <Col>
                        <Card className='shadow my-5'>
                            <Card.Body className='mx-3'>
                                <h1 className="titulo pt-2">Buscar pacientes</h1>
                                {loading &&
                                    <div className='text-center'>
                                        <Spinner animation="border" className='color-spinner' />
                                    </div>
                                }

                                {!loading &&
                                <>
                                    <Form>
                                        <Form.Group controlId="buscador">
                                            <Form.Control type="search" placeholder="DNI/correo/nombre del paciente" value={busqueda} onChange={(ev) => setBusqueda(ev.target.value)}/>
                                        </Form.Group>
                                    </Form>
                                    <Alert key="info" variant='info' className='shadow py-5 my-4'>
                                        <h2 className='fs-4 mb-3'>Solicitudes</h2>
                                        <ul className="list-unstyled">
                                        {solicitudesRecibidas.map((solicitud, i) =>
                                            <li key={i}>
                                                <span className="pb-2 mb-3 border-bottom border-dark d-flex align-items-center justify-content-between">
                                                    {!solicitud.aceptado && <>
                                                        <span><strong>{solicitud.emisor?.nombre} {solicitud.emisor?.apellido}</strong> te envió una solicitud.</span>
                                                        <Button variant="verde" disabled={loadingButton} onClick={() => aceptarSolicitud(solicitud.emisor, solicitud.receptor)}>
                                                            {loadingButton &&
                                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                                            }
                                                            {!loadingButton && <span>✓</span>}
                                                        </Button>
                                                    </>
                                                    }
                                                </span>
                                            </li>
                                        )}
                                        </ul>
                                        {solicitudesRecibidas.length === 0 && <p> No tenés solicitudes.</p>}
                                    </Alert>

                                    {busqueda &&
                                        <Table hover responsive className="mt-4">
                                            <thead>
                                                <tr>
                                                    <th>Paciente</th>
                                                    <th>Email</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {resultado.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado pacientes</td></tr>}
                                            {resultado.map((paciente, i) =>
                                                <tr key={i}>
                                                    <td>{paciente.nombre} {paciente.apellido}</td>
                                                    <td>{paciente.email}</td>
                                                    <td className="text-center">{buscarVinculacion(paciente._id) === 'aceptado' ? <Button variant="verde" disabled>Agregado</Button> : buscarVinculacion(paciente._id) === 'pendiente' ? <Button variant="verde" disabled>Pendiente</Button> : <Button variant="verde" disabled={loadingButtonAgregar} onClick={(ev) => enviarSolicitud(paciente,ev)}>
                                                        {loadingButtonAgregar &&
                                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                                        }
                                                        {!loadingButtonAgregar && <span>Agregar</span>}
                                                    </Button>}</td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </Table>
                                    }
                                </>
                                }
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

export default Solicitudes