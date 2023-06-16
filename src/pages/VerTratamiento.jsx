import * as TratamientosService from '../services/tratamientos.service.js'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { Card, Container, Row, Col, Accordion, Button, Spinner } from 'react-bootstrap'
import * as PacientesService from '../services/pacientes.service.js'
import IconoEliminar from '../imgs/eliminar-25.png'
import IconoEditar from '../imgs/editar-25.png'
import { UsuarioContext } from '../context/UsuarioContext.jsx'
import Swal from 'sweetalert2'

function VerTratamiento() {
    const { id } = useParams()
    const [tratamientos, setTratamientos] = useState([])
    const [tratamientosDelProfesional, setTratamientosDelProfesional] = useState([])
    const [paciente, setPaciente] = useState({})
    const {usuarioLogueado} = useContext(UsuarioContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        TratamientosService.traerPorIdPaciente(usuarioLogueado?._id)
        .then(resp => {
            setTratamientos(resp)
            setLoading(false)
        })
        PacientesService.traerPorId(id)
        .then(resp => {
            setPaciente(resp)
        })
        TratamientosService.traerPorIdProfesional(id, usuarioLogueado?._id)
        .then( resp => {
            setTratamientosDelProfesional(resp)
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [])

    function handleSubmitBorrarTratamiento(ev) {
        ev.preventDefault()
        Swal.fire({
            title: '¿Seguro que quiere eliminar el tratamiento?',
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
                    TratamientosService.eliminar(ev.target.idTratamiento.value)
                        .then(() => {
                            TratamientosService.traerPorIdPaciente(id)
                                .then(resp => { setTratamientos(resp) })
                    TratamientosService.traerPorIdProfesional(id, usuarioLogueado?._id)
                    .then( resp => setTratamientosDelProfesional(resp) )
                })
                Swal.fire(
                    'Se borró correctamente',
                    '',
                    'success'
                )
            }
        })
    }

    function hanldeEliminarComida(ev) {
        ev.preventDefault()
        Swal.fire({
            title: '¿Seguro que quiere eliminar la comida del tratamiento?',
            text: "No podrás volver atrás",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4971B7',
            cancelButtonColor: '#F3944D',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            grow: 'row'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    TratamientosService.eliminarComida(ev.target.idTratamientoComida.value, ev.target.comidaTratamiento.value)
                        .then(() => {
                            TratamientosService.traerPorIdPaciente(id)
                                .then(resp => { setTratamientos(resp) })

                    TratamientosService.traerPorIdProfesional(id, usuarioLogueado?._id)
                    .then( resp => setTratamientosDelProfesional(resp) )
                })
                Swal.fire(
                    'Se borró correctamente',
                    '',
                    'success'
                )
            }
        })
    }

    function hanldeEliminarMedicamento(ev) {
        ev.preventDefault()
        const tipo = "medicamentos"
        Swal.fire({
            title: '¿Seguro que quiere eliminar el medicamento del tratamiento?',
            text: "No podrás volver atrás",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4971B7',
            cancelButtonColor: '#F3944D',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            grow: 'row'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    TratamientosService.eliminarMedicamento(ev.target.idTratamientomedicamento.value, ev.target.medicamentoTratamiento.value, tipo)
                        .then(() => {
                            TratamientosService.traerPorIdPaciente(id)
                                .then(resp => { setTratamientos(resp) })

                    TratamientosService.traerPorIdProfesional(id, usuarioLogueado?._id)
                    .then( resp => setTratamientosDelProfesional(resp) )
                })
                Swal.fire(
                    'Se borró correctamente',
                    '',
                    'success'
                )
            }
        })
    }

    function hanldeEliminarEjercicio(ev) {
        ev.preventDefault()
        const tipo = "ejercicios"
        Swal.fire({
            title: '¿Seguro que quiere eliminar el ejercicio del tratamiento?',
            text: "No podrás volver atrás",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4971B7',
            cancelButtonColor: '#F3944D',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            grow: 'row'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    TratamientosService.eliminarMedicamento(ev.target.idTratamientoejercicio.value, ev.target.ejercicioTratamiento.value, tipo)
                        .then(() => {
                            TratamientosService.traerPorIdPaciente(id)
                                .then(resp => { setTratamientos(resp) })

                            TratamientosService.traerPorIdProfesional(id, usuarioLogueado?._id)
                                .then(resp => setTratamientosDelProfesional(resp))
                        })
                    Swal.fire(
                        'Se borró correctamente',
                        '',
                        'success'
                    )
                }
            })
    }

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
                                    <Col lg={12} >
                                        {!tratamientosDelProfesional.length && usuarioLogueado?.matricula && <p className="h4 my-3"><span className="fw-bold">{paciente.nombre} {paciente.apellido}</span> no tiene un tratamiento asignado, si desea crear uno, <Link to={`/tratamiento/${id}`}>entrá acá</Link></p>}
                                        {!tratamientos.length && !usuarioLogueado?.matricula && <p className="h4 my-3"><span className="fw-bold">{paciente.nombre} {paciente.apellido}</span> todavía no le asignaron tratamientos...</p>}
                                    </Col>
                                </Row>

                                {usuarioLogueado?.matricula && tratamientosDelProfesional.map((tratamiento, j) =>
                                    <Accordion defaultActiveKey={tratamiento._id} className='shadow my-3' key={j}>
                                        <Accordion.Item eventKey={tratamiento._id}>
                                            <Accordion.Header>Diagnóstico:&nbsp;<b>{tratamiento.diagnostico}</b></Accordion.Header>
                                            <Accordion.Body>
                                                {tratamiento.tratamiento.comidas?.length > 0 &&
                                                    <Card className="border-0 shadow my-4">
                                                        <Card.Header className="tratamiento-header-paciente">Comidas Restringidas</Card.Header>
                                                        <Card.Body className="px-4">
                                                            <ul className="lista-agregada d-md-flex justify-content-start">
                                                                {tratamiento.tratamiento.comidas?.map((comida, k) =>
                                                                    <li className="shadow mx-2 px-0 mb-3 mb-md-0 px-md-5" key={k}>
                                                                        {usuarioLogueado?.matricula && <div className='d-flex align-items-center justify-content-end'> <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{comida,idTratamiento: tratamiento._id, idPaciente: id}} className="btn-editar-trat mt-2"><img src={IconoEditar} alt="Icono editar"/></Link>
                                                                        <form onSubmit={hanldeEliminarComida}>
                                                                            <input type="hidden" name="comidaTratamiento" value={comida} />
                                                                            <input type="hidden" name="idTratamientoComida" value={tratamiento._id}/>
                                                                            <Button type="submit" variant="eliminar-trat" className="mt-2 py-0 px-1"><img src={IconoEliminar} alt="Icono eliminar"/></Button>
                                                                        </form>
                                                                        </div> }
                                                                    <span>{comida}</span>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                            {usuarioLogueado?.matricula && <div className='d-flex justify-content-center text-center'>
                                                                <Link to={`/tratamiento/${tratamiento._id}/agregar-comida`} className="btn-agregar-trat">+ Agregar comidas</Link>
                                                            </div>}
                                                        </Card.Body>
                                                    </Card>
                                                }

                                                {tratamiento.tratamiento.medicamentos?.length > 0 &&
                                                    <Card className="border-0 shadow my-4">
                                                        <Card.Header className="tratamiento-header-paciente">Medicamentos</Card.Header>
                                                        <Card.Body className="px-4">
                                                            <ul className="lista-agregada-meds">
                                                                {tratamiento.tratamiento.medicamentos?.map((medicamento, i) =>
                                                                    <li className="shadow mb-3" key={i}>
                                                                        {usuarioLogueado?.matricula && <div className='d-flex align-items-center justify-content-end'> <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{medicamento, idTratamiento: tratamiento._id, idPaciente: id}}className="btn-editar-trat mt-2"><img src={IconoEditar} alt="Icono editar"/></Link>
                                                                        <form onSubmit={hanldeEliminarMedicamento}>
                                                                            <input type="hidden" name="medicamentoTratamiento" value=       {medicamento.id} />
                                                                            <input type="hidden" name="idTratamientomedicamento" value={tratamiento._id}/>
                                                                            <Button type="submit" variant="eliminar-trat"
                                                                            className="mt-2 py-0 px-1"><img src={IconoEliminar} alt="Icono eliminar"/></Button>
                                                                        </form>
                                                                        </div> }

                                                                            <span className="fw-bold">{medicamento.nombre}</span><br />
                                                                            <span className="me-5">
                                                                                <span className="fw-bold">Frecuencia:</span>  <br className="d-block d-sm-none" />{medicamento.horas} hs
                                                                            </span><br />
                                                                            <span>
                                                                                <span className="fw-bold">Finaliza el:</span>  <br className="d-block d-sm-none" />{medicamento.fecha}
                                                                            </span>
                                                                        </li>
                                                                    )}
                                                            </ul>
                                                            {usuarioLogueado?.matricula && <div className='d-flex justify-content-center text-center'>
                                                                <Link to={`/tratamiento/${tratamiento._id}/agregar-medicamento`} className="btn-agregar-trat">+ Agregar medicamentos</Link>
                                                            </div>}
                                                        </Card.Body>
                                                    </Card>
                                                }

                                                {tratamiento.tratamiento.ejercicios?.length > 0 &&
                                                    <Card className="border-0 shadow my-4">
                                                        <Card.Header className="tratamiento-header-paciente">Ejercicios</Card.Header>
                                                        <Card.Body className="px-4">
                                                            <ul className="lista-agregada-meds">
                                                                {tratamiento.tratamiento.ejercicios?.map((ejercicio, l) =>
                                                                <li className="shadow mb-3" key={l}>
                                                                    {usuarioLogueado?.matricula && <div className='d-flex align-items-center justify-content-end'> <Link to={`/editar-tratamiento/${tratamiento._id}`} state={{ejercicio, idTratamiento: tratamiento._id, idPaciente: id}}className="btn-editar-trat mt-2"><img src={IconoEditar} alt="Icono editar"/></Link>
                                                                    <form onSubmit={hanldeEliminarEjercicio}>
                                                                        <input type="hidden" name="ejercicioTratamiento" value={ejercicio.id} />
                                                                        <input type="hidden" name="idTratamientoejercicio" value={tratamiento._id}/>
                                                                        <Button type="submit" variant='eliminar-trat' className="mt-2 py-0 px-1"><img src={IconoEliminar} alt="Icono eliminar"/></Button>
                                                                    </form>
                                                                    </div> }

                                                                            <span className="fw-bold">{ejercicio.ejercicio}</span><br />
                                                                            <span className="me-5">
                                                                                <span className="fw-bold">Cantidad de repeticiones:</span>  <br className="d-block d-sm-none" />{ejercicio.repeticiones}
                                                                            </span><br />
                                                                            <span className="me-5">
                                                                                <span className="fw-bold">Video:</span>  <br className="d-block d-sm-none" />{ejercicio.video}
                                                                            </span>
                                                                        </li>
                                                                    )}
                                                            </ul>
                                                            {usuarioLogueado?.matricula && <div className='d-flex justify-content-center text-center'>
                                                                <Link to={`/tratamiento/${tratamiento._id}/agregar-ejercicio`} className="btn-agregar-trat">+ Agregar ejercicios</Link>
                                                            </div>}
                                                        </Card.Body>
                                                    </Card>
                                                }

                                                <Card.Footer className="bg-transparent border-0">
                                                    {usuarioLogueado?.matricula && <form onSubmit={handleSubmitBorrarTratamiento}>
                                                        <div className='d-flex justify-content-center'>
                                                            <Button type="submit" className="border-0 link-eliminar">Eliminar tratamiento</Button>
                                                            <input type="hidden" name="idTratamiento" value={tratamiento._id}/>
                                                        </div>
                                                    </form>}
                                                </Card.Footer>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    )}

                                    {!usuarioLogueado?.matricula && tratamientos.map((tratamiento, j) =>
                                    <Accordion defaultActiveKey={tratamiento._id} className='shadow my-3' key={j}>
                                        <Accordion.Item eventKey={tratamiento._id}>
                                            <Accordion.Header><p>Diagnóstico:&nbsp;<b>{tratamiento.diagnostico}</b></p></Accordion.Header>
                                            <Accordion.Body>
                                                <p><b>Profesional:</b> {tratamiento.profesional.nombre} {tratamiento.profesional.apellido}</p>
                                                {tratamiento.tratamiento.comidas?.length > 0 &&
                                                    <Card className="border-0 shadow my-4">
                                                        <Card.Header className="tratamiento-header-paciente">Comidas Restringidas</Card.Header>
                                                        <Card.Body className="px-4">
                                                            <ul className="lista-agregada d-lg-flex justify-content-center">
                                                                {tratamiento.tratamiento.comidas?.map((comida, k) =>
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
                                                                        <span className="fw-bold">{medicamento.nombre}</span><br />
                                                                        <span>
                                                                            <span className="fw-bold">Frecuencia:</span> <br className="d-block d-sm-none" />{medicamento.horas} hs
                                                                        </span><br />
                                                                        <span>
                                                                            <span className="fw-bold">Finaliza el:</span> <br className="d-block d-sm-none" />{medicamento.fecha}
                                                                        </span><br />
                                                                        <Link to={`/paciente/confirmacion`} state={{ medicamento, profesional: tratamiento.profesional, idTratamiento: tratamiento._id, diagnostico: tratamiento.diagnostico }} className="link-historia">¿Tomaste el medicamento?</Link>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </Card.Body>
                                                    </Card>
                                                }

                                                {tratamiento.tratamiento.ejercicios?.length > 0 &&
                                                    <Card className="border-0 shadow my-4">
                                                        <Card.Header className="tratamiento-header-paciente">Ejercicios</Card.Header>
                                                        <Card.Body className="px-4">
                                                            <ul className="lista-agregada-meds">
                                                                {tratamiento.tratamiento.ejercicios?.map((ejercicio, l) =>
                                                                    <li className="shadow mb-3" key={l}>
                                                                        <span className="fw-bold">{ejercicio.ejercicio}</span><br />
                                                                        <span>
                                                                            <span className="fw-bold">Repeticiones:</span> <br className="d-block d-sm-none" />{ejercicio.repeticiones}
                                                                        </span><br />
                                                                        <span>
                                                                            <span className="fw-bold">Video:</span><br className="d-block d-sm-none" /> {ejercicio.video}
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
                                )}
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

export default VerTratamiento