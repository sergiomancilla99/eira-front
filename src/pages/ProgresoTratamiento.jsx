import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Table, Form, Spinner } from 'react-bootstrap'
import { UsuarioContext } from '../context/UsuarioContext'
import * as Progresos from '../services/progresos.service.js'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { InputMask } from 'primereact/inputmask'
import IconoEditar from '../imgs/icono-editar.png'
import { toast } from "react-hot-toast"

function ProgresoTratamiento() {
    const [progreso, setProgreso] = useState([])
    const { usuarioLogueado } = useContext(UsuarioContext)
    const [hora, setHora] = useState("")
    const [confirmado, setConfirmado] = useState(false)
    const [actividad, setActividad] = useState({})
    const [idProgreso, setIdProgreso] = useState("")
    const [loading, setLoading] = useState(true)
    const [loadingButton, setLoadingButton] = useState(false)
    const [horariosOrdenados, setHorariosOrdenados] = useState([])

    function convertirHoraAMinutos(hora) {
        const [horas, minutos] = hora.split(":");
        return parseInt(horas, 10) * 60 + parseInt(minutos, 10);
    }
    useEffect(() => {
        Progresos.traerPorIdUsuario(usuarioLogueado?._id)
            .then(resp => {
                const horariosOrdenados = resp.map(progreso => {
                    return {
                        ...progreso,
                        actividades: progreso.actividades.sort((a, b) => convertirHoraAMinutos(b.hora) - convertirHoraAMinutos(a.hora))
                    }
                })
                setProgreso(horariosOrdenados)
                // console.log("aa", resp)
                // console.log("bb", horariosOrdenados)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])

    function handleSubmit(ev) {
        ev.preventDefault()
        setLoadingButton(true)
        const nuevaHora = {
            ...actividad,
            confirmado: confirmado,
            hora
        }
        Progresos.editarHora(idProgreso, nuevaHora)
            .then(resp => {
                setLoadingButton(false)
                Progresos.traerPorIdUsuario(usuarioLogueado._id)
                    .then(resp => {
                        const horariosOrdenados = resp.map(progreso => {
                            return {
                                ...progreso,
                                actividades: progreso.actividades.sort((a, b) => convertirHoraAMinutos(b.hora) - convertirHoraAMinutos(a.hora))
                            }
                        })
                        setProgreso(horariosOrdenados)
                        toast.success("Se edito correctamente")
                    })
            })
    }


    return (
        <main className="fondo-generico">
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                                <h1 className="titulo">Progreso del tratamiento</h1>
                                {loading &&
                                    <div className='text-center'>
                                        <Spinner animation="border" className='color-spinner' />
                                    </div>
                                }

                                {!loading &&
                                    <>
                                        <Row className='mt-4 mb-3'>
                                            <Col lg={6}>
                                                <p><span className="fw-bold">Paciente:</span> {usuarioLogueado?.nombre} {usuarioLogueado?.apellido}</p>
                                            </Col>
                                            <Col lg={6}>
                                                <p><span className="fw-bold">N° de Documento: </span> {usuarioLogueado?.dni}</p>
                                            </Col>
                                            <Col lg={12}>
                                                {!progreso.length && <p>Todavía no tenés progreso de tratamientos.</p>}
                                            </Col>
                                        </Row>

                                        {progreso.map((progreso, i) =>
                                            <Card body className='shadow mb-5 border-0 px-3' key={i}>
                                                <p className='fw-bold mt-4'>Profesional: {progreso.profesional.nombre} {progreso.profesional.apellido}</p>
                                                <p><span className="fw-bold">Diagnóstico:</span> {progreso.diagnostico}</p>
                                                <p className='fw-bold mt-4'><Link to={`/ver-tratamiento/${progreso.idTratamiento}`} state={{ idTratamiento: progreso.idTratamiento }} className="link-historia">Ver tratamiento</Link></p>

                                                <Table>
                                                    <tbody>
                                                        {progreso?.actividades.map((actividad, i) =>
                                                            <tr key={i}>
                                                                <td className='table-td-progreso'>
                                                                    <p className='fw-bold'>{DateTime.fromISO(actividad.fecha).toFormat('dd/MM/yyyy')}</p>
                                                                    <div className='d-flex align-items-center justify-content-between'>
                                                                        <div>
                                                                            <span className={actividad.confirmado ? 'confirmado' : 'no-confirmado'}>{actividad.confirmado ? "✓" : "X"}</span>&nbsp;&nbsp;&nbsp;{actividad.nombre} - <br className='d-block d-md-none' /><span className='fw-bold'>Horario de toma:</span> {actividad.hora}hs
                                                                        </div>
                                                                        <div>
                                                                            <Button type="button" variant='azul' data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => {
                                                                                setActividad(actividad)
                                                                                setIdProgreso(progreso._id)
                                                                                setConfirmado(actividad.confirmado)
                                                                                setHora(actividad.hora)
                                                                            }}><img src={IconoEditar} alt='Icono editar' /></Button>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </Table>
                                            </Card>
                                        )}
                                    </>
                                }
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Editar actividad</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Hora</Form.Label>
                                    <InputMask value={hora} onChange={(e) => setHora(e.target.value)} mask="99:99" id='horaForm' />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>¿Hiciste la actividad?</Form.Label>
                                    <Form.Select aria-label="¿Hiciste la actividad?" value={confirmado} onChange={(ev) => setConfirmado(ev.target.value)} id='confirmado'>
                                        <option value="true">Sí</option>
                                        <option value="false">No</option>
                                    </Form.Select>
                                </Form.Group>

                                <div className='mb-3 d-flex justify-content-center'>
                                    <Button type="submit" variant='crear-tratamiento' data-bs-dismiss="modal" disabled={loadingButton}>
                                        {loadingButton &&
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        }
                                        {!loadingButton &&
                                            <span>Guardar</span>
                                        }
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProgresoTratamiento