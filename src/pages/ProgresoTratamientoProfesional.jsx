import { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Spinner } from 'react-bootstrap'
import { UsuarioContext } from '../context/UsuarioContext'
import * as Progresos from '../services/progresos.service.js'
import * as Pacientes from '../services/pacientes.service.js'
import { DateTime } from 'luxon'
import { Link, useParams } from 'react-router-dom'

function ProgresoTratamiento() {
    const [progreso, setProgreso] = useState([])
    const [paciente, setPaciente] = useState({})
    const {usuarioLogueado} = useContext(UsuarioContext)
    const { id } = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Progresos.traerPorIdPacienteYIdProfesional(id, usuarioLogueado?._id)
        .then(resp => setProgreso(resp))

        Pacientes.traerPorId(id)
        .then(resp => {
            setPaciente(resp)
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [])

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
                                            <p><span className="fw-bold">Paciente:</span> {paciente.nombre} {paciente.apellido}</p>
                                        </Col>
                                        <Col lg={6}>
                                            <p><span className="fw-bold">N° de Documento: </span> {paciente.dni}</p>
                                        </Col>
                                        <Col lg={12}>
                                            {!progreso.length && <p>Todavía no hay progreso de tratamientos.</p>}
                                        </Col>
                                    </Row>


                                    {progreso.map((progreso, i) =>
                                    <Card body className='shadow mb-5 border-0 px-3' key={i}>
                                        <p><span className="fw-bold">Diagnóstico:</span> {progreso.diagnostico}</p>
                                        
                                        <Table>
                                            <tbody>
                                            {progreso?.actividades.map((actividad, i) =>
                                                <tr key={i}>
                                                    <td className='table-td-progreso'>
                                                        <p className='fw-bold'>{DateTime.fromISO(actividad.fecha).toFormat('dd/MM/yyyy')}</p>
                                                        <span className={actividad.confirmado ? 'confirmado' : 'no-confirmado'}>{actividad.confirmado ? "✓" : "X"}</span>&nbsp;&nbsp;&nbsp;{actividad.nombre} - <br className='d-block d-md-none'/><span className='fw-bold'>Horario de toma:</span> {actividad.hora}hs
                                                    </td>
                                                </tr>
                                                ).reverse()}
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
        </main>
    )
}

export default ProgresoTratamiento