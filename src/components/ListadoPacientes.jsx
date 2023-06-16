import { useState, useEffect } from 'react'
import * as ProfesionalesService from '../services/profesionales.service.js'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Container, Row, Col, Form, Table, Tooltip, Dropdown, Spinner, Button } from 'react-bootstrap'
import IconoCrear from '../imgs/icono-crear.png'
import IconoVer from '../imgs/icono-ver.png'
import IconoEliminar from '../imgs/icono-eliminar.png'
import IconoHistoriaClinica from '../imgs/icono-historia-clinica.png'
import IconoProgreso from '../imgs/icono-progress.png'
import Paginador from './Paginador.jsx'
import Swal from 'sweetalert2'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function ListadoPacientes() {
    const [pacientes, setPacientes] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [pacientesPorPagina, setPacientesPorPagina] = useState(5)
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [loadingButton, setLoadingButton] = useState(false)

    useEffect(
        () => {
            if(!usuarioLogueado?.matricula) { navigate('/', { replace: true }) }
            if(!usuarioLogueado?.verificado) { navigate('/falta-verificacion', {replace: true}) }
          // eslint-disable-next-line
        }, [])

    useEffect(() => {
            ProfesionalesService.traerPacientes(usuarioLogueado?._id)
            .then((resp) => {
                setPacientes(resp)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])
    console.log("Pacientes vinculados", pacientes)

    const indexUltimoPaciente = paginaActual * pacientesPorPagina
    const indexPrimerPaciente = indexUltimoPaciente - pacientesPorPagina
    let pacientesActuales = []
    if(pacientes.length > 0) {
        pacientesActuales = pacientes.slice(indexPrimerPaciente, indexUltimoPaciente)
    }

    const resultados = !busqueda ? pacientesActuales : pacientes.filter( (paciente) => paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) || paciente.dni.includes(busqueda))

    function handleSubmitEliminarPaciente(ev) {
        ev.preventDefault()
        setLoadingButton(true)
        Swal.fire({
            title: '¿Seguro que quiere eliminar el paciente de su lista?',
            text: "No podrás volver atrás",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4971B7',
            cancelButtonColor: '#F3944D',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
            grow: 'row'
        })
        .then((result) => {
            if (result.isConfirmed) {
                ProfesionalesService.eliminarPaciente(usuarioLogueado?._id,ev.target.idPaciente.value)
                .then((resp) => {
                    ProfesionalesService.traerPacientes(usuarioLogueado?._id)
                    .then( (resp) => setPacientes(resp))
                })
            Swal.fire(
                'Se borró correctamente',
                '',
                'success'
            )}
            setLoadingButton(true)
        })
    }

    return (
        <section id="listadoPacientes">
            <Container>
                <Row>
                    <Col>
                        <Card body className='shadow'>
                            <div className="d-flex justify-content-between align-items-center">
                                <h1 className="titulo">Pacientes</h1>
                                <Form>
                                    <Form.Group controlId="buscador">
                                        <Form.Control type="search" placeholder="Buscar paciente" value={busqueda} onChange={(ev) => setBusqueda(ev.target.value)}/>
                                    </Form.Group>
                                </Form>
                            </div>
                            <Table hover responsive className="mt-4">
                                <thead>
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th className='d-none d-lg-table-cell'>Email</th>
                                        <th className='d-none d-md-table-cell'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {loading &&
                                    <tr>
                                        <td className='text-center' colSpan={5}>
                                            <Spinner animation="border" className='color-spinner' />
                                        </td>
                                    </tr>
                                }
                                {!loading && resultados.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado pacientes</td></tr>}
                                {!loading && resultados.map((paciente, i) =>
                                    <tr key={i}>
                                        <td>{paciente.dni}</td>
                                        <td>{paciente.nombre}</td>
                                        <td>{paciente.apellido}</td>
                                        <td className='d-none d-lg-table-cell'>{paciente.email}</td>
                                        <td className='d-none d-md-flex'>
                                            <OverlayTrigger placement="top" overlay={
                                                <Tooltip id="tooltip-top1">
                                                    Crear tratamiento
                                                </Tooltip>
                                            }>
                                            <Link to={`/tratamiento/${paciente._id}`} className="btn btn-crear me-2"><img src={IconoCrear} alt="Icono crear"/></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={
                                                <Tooltip id="tooltip-top2">
                                                    Ver tratamiento
                                                </Tooltip>
                                            }>
                                            <Link to={`/ver-tratamiento/${paciente._id}`} className="btn btn-ver me-2"><img src={IconoVer} alt="Icono ver"/></Link>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement="top" overlay={
                                                <Tooltip id="tooltip-top2">
                                                    Ver progreso
                                                </Tooltip>
                                            }>
                                            <Link to={`/progreso-paciente/${paciente._id}`} className="btn btn-ver-progreso me-2"><img src={IconoProgreso} alt="Icono progreso"/></Link>
                                            </OverlayTrigger>

                                            <OverlayTrigger placement="top" overlay={
                                                <Tooltip id="tooltip-top3">
                                                    Ver historia clínica
                                                </Tooltip>
                                            }>
                                            <Link to={`/historia-clinica/${paciente._id}`} className="btn btn-ver-historia me-2"><img src={IconoHistoriaClinica} alt="Icono crear"/></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={
                                                <Tooltip id="tooltip-top4">
                                                    Eliminar paciente
                                                </Tooltip>
                                            }>
                                            <form onSubmit={handleSubmitEliminarPaciente} >
                                                <Button type="submit" variant='eliminar' disabled={loadingButton}>
                                                    {loadingButton &&
                                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                                    }
                                                    {!loadingButton &&
                                                        <img src={IconoEliminar} alt="Icono eliminar"/>
                                                    }
                                                </Button>
                                                <input type="hidden" name="idPaciente" value={paciente._id}/>
                                            </form>
                                            </OverlayTrigger>
                                        </td>
                                        <td className='d-md-none'>
                                            <Dropdown className="acciones">
                                                <Dropdown.Toggle id="dropdown-basic">
                                                    Acciones
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        <Link to={`/tratamiento/${paciente._id}`} className="link-crear">Crear tratamiento</Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item>
                                                        <Link to={`/ver-tratamiento/${paciente._id}`} className="link-ver">Ver tratamiento</Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item>
                                                        <Link to={`/progreso-paciente/${paciente._id}`} className="link-ver">Ver progreso</Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item>
                                                        <Link to={`/historia-clinica/${paciente._id}`} className="link-historia">Ver historia clínica</Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <form onSubmit={handleSubmitEliminarPaciente} >
                                                        <Button type="submit" className="link-eliminar" disabled={loadingButton}>
                                                            {loadingButton &&
                                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                                            }
                                                            {!loadingButton &&
                                                                <span>Eliminar paciente</span>
                                                            }
                                                        </Button>
                                                        <input type="hidden" name="idPaciente" value={paciente._id}/>
                                                    </form>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>

                            {resultados.length !== 0 &&
                                <Paginador
                                elementosPorPagina={pacientesPorPagina}
                                totalElementos={pacientes.length}
                                setPaginaActual={setPaginaActual}
                                paginaActual={paginaActual} />
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default ListadoPacientes