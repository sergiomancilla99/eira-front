import { useContext, useState } from 'react'
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { UsuarioContext } from '../context/UsuarioContext.jsx'
import * as Progresos from '../services/progresos.service.js'
import { DateTime } from 'luxon'

function ConfirmacionTratamiento() {
    const location = useLocation()
    let navigate = useNavigate()
    const { usuarioLogueado } = useContext(UsuarioContext)
    const [loadingButton, setLoadingButton] = useState(false)

    function confirmarActividad() {
        setLoadingButton(true)
        const hora = DateTime.now().toFormat("HH':'mm")
        const fecha = DateTime.now()
        const paciente = {
        _id: usuarioLogueado?._id,
        nombre: usuarioLogueado?.nombre,
        apellido: usuarioLogueado?.apellido
        }
        const profesional = {
        _id: location.state?.profesional.id_medico,
        nombre: location.state?.profesional.nombre,
        apellido: location.state?.profesional.apellido
        }

        const frecuenciaHoraria = location.state?.medicamento.horas

        const diagnostico = location.state?.diagnostico
        const idTratamiento = location.state?.idTratamiento


        if (location.state?.medicamento.horas) {
        Progresos.confirmarActividad(paciente, profesional, frecuenciaHoraria, { nombre: location.state?.medicamento.nombre, hora: hora, confirmado: true, fecha }, idTratamiento, diagnostico)
            .then(resp => {
                setLoadingButton(false)
                navigate(`/ver-tratamiento/${usuarioLogueado._id}`, { replace: true })
            })
        } else {
        const profesional = {
            _id: location.state?.profesional._id,
            nombre: location.state?.profesional.nombre,
            apellido: location.state?.profesional.apellido
        }

        Progresos.confirmarActividad(paciente, profesional, 0, { nombre: location.state?.medicamento.nombre, hora: hora, confirmado: true, fecha }, idTratamiento, diagnostico)
            .then(resp => {
                setLoadingButton(false)
                navigate(`/ver-tratamiento/${usuarioLogueado._id}`, { replace: true })
            })
        }
    }

    function negarActividad() {
        setLoadingButton(true)
        const hora = DateTime.now().toFormat("HH':'mm")
        const fecha = DateTime.now()
        const paciente = {
        _id: usuarioLogueado._id,
        nombre: usuarioLogueado.nombre,
        apellido: usuarioLogueado.apellido
        }
        const profesional = {
        _id: location.state?.profesional.id_medico || location.state?.profesional._id,
        nombre: location.state?.profesional.nombre,
        apellido: location.state?.profesional.apellido
        }

        const diagnostico = location.state?.diagnostico
        const idTratamiento = location.state?.idTratamiento
        Progresos.negarActividad(paciente, profesional, { nombre: location.state?.medicamento.nombre, hora: hora, confirmado: false, fecha }, idTratamiento, diagnostico)
        .then(resp => {
            setLoadingButton(false)
            navigate(`/ver-tratamiento/${usuarioLogueado._id}`, { replace: true })
        })
    }

    return (
        <main className="fondo-generico">
        <section>
            <Container className='mt-5'>
            <Row>
                <Col sm={12}>

                <Card body className='shadow mb-2 border-0'>
                    {/* {!location.state &&
                        <div className='text-center'>
                            <Spinner animation="border" className='color-spinner' />
                        </div>
                    } */}

                    {/* {location.state && <> */}
                        <h1 className='visually-hidden'>Confirmación de tratamiento</h1>
                        <p className='text-center fw-bold fs-5 mt-4'>¿Ya tomaste el medicamento? {location.state?.medicamento.nombre}</p>
                        <p className='text-center'>Indicanos si ya tomaste el medicamento para poder actualizar el progreso de tu tratamiento.</p>
                        <div className='mb-4 d-flex justify-content-center align-items-center flex-column flex-md-row'>
                        <Button className="btn-azul btn-confirmacion-trat mb-3 mb-md-0 me-md-4" onClick={() => confirmarActividad()} disabled={loadingButton}>
                            {loadingButton &&
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                            }
                            {!loadingButton && <span>Sí</span>}
                        </Button>
                        <Button disabled={loadingButton} className="btn-naranja btn-confirmacion-trat" onClick={() => negarActividad()}>
                            {loadingButton &&
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                            }
                            {!loadingButton && <span>No</span>}
                        </Button>
                        </div>
                    {/* </>} */}
                </Card>
                </Col>
            </Row>
            </Container>
        </section>
        </main>
    )
}

export default ConfirmacionTratamiento