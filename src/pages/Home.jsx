import { Container, Row, Col, Button, Card, Form, FloatingLabel, Alert, Spinner } from 'react-bootstrap';
import ImgHeader from '../imgs/img-header.png'
import Flecha from '../imgs/flecha-abajo.png'
import IconoHistorial from '../imgs/icono-historial-home.png'
import IconoNotificacion from '../imgs/icono-notificaciones-home.png'
import IconoCompartir from '../imgs/icono-compartir-home.png'
import MockupCelular from '../imgs/celular-app-mockup.png'
import ImgProfesionales from '../imgs/profesionales-de-la-salud.png'
import IconoChats from '../imgs/icono-chats.png'
import IconoRecetas from '../imgs/icono-recetas.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as ContactoService from '../services/contacto.service.js'
import { toast } from 'react-hot-toast';

function Home() {
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [mensaje, setMensaje] = useState("")

    let [success, setSuccess] = useState(false)
    let [error, setError] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        if(!nombre || !email || !mensaje) {
            toast.error("Hay campos en el formulario vacíos")
        } else {
            setLoadingButton(true)
            ContactoService.contactoWeb({nombre, email, mensaje})
            .then(resp => {
                if(resp === 'enviado') {
                    setLoadingButton(false)
                    setSuccess(true)
                } else {
                    setLoadingButton(false)
                    setError(true)
                }
            })
        }
       
    }

    return (
        <main>
            <header id='header-home'>
                <Container>
                    <Row className='align-items-center'>
                        <Col lg={6}>
                            <h1 className='mb-2'>EIRA TE AYUDA A RECORDAR SIN IMPORTAR DÓNDE ESTÉS</h1>
                            <p className='mb-4'>Ayudamos a los pacientes a recordar sus tratamientos y a los medicos a hacer el seguimiento del mismo.</p>
                            <div className='d-flex justify-content-center d-lg-block mb-4 mb-lg-0'>
                                <Link to={`/registro`} className="nav-link btn btn-primary btn-padding">Registrate</Link>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <img src={ImgHeader} alt="Ilustración representando aplicación de salud" className='img-fluid'/>
                        </Col>
                    </Row>
                </Container>
            </header>
            <div className='text-center down-div'>
                <a href='#funciones' className='down-button'><img src={Flecha} alt="Flecha hacia abajo"/></a>
            </div>

            <section className='py-5' id='funciones'>
                <Container className='py-5'>
                    <Row className="g-5 justify-content-center">
                        <Col md={6} lg={4}>
                            <Card className='border-0 shadow'>
                                <Card.Body className='text-center py-4'>
                                    <img src={IconoHistorial} alt="Icono historia clínica" className='mb-3 img-fluid'/>
                                    <p className='titulo-item mb-1'>Ver tratamientos</p>
                                    <p className='texto-item mb-0'>Los pacientes pueden ver sus tratamientos y recibir recordatorios. Los profesionales de la salud pueden ver la adherencia de sus pacientes.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className='border-0 shadow'>
                                <Card.Body className='text-center py-4'>
                                    <img src={IconoNotificacion} alt="Icono historia clínica" className='mb-3 img-fluid'/>
                                    <p className='titulo-item mb-1'>Recordatorios</p>
                                    <p className='texto-item mb-0'>Los paciente recibem recordatorios sobre medicamentos que deben tomar según lo indicado en cada tratamiento, de manera personalizada.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className='border-0 shadow'>
                                <Card.Body className='text-center py-4'>
                                    <img src={IconoCompartir} alt="Icono historia clínica" className='mb-3 img-fluid'/>
                                    <p className='titulo-item mb-1'>Compartir historia clínica</p>
                                    <p className='texto-item mb-0'>Los pacientes pueden compartir sus historias clínicas con los profesionales de la salud, facilitando las consultas y la asignación de un tratamiento.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className='border-0 shadow'>
                                <Card.Body className='text-center py-4'>
                                    <img src={IconoRecetas} alt="Icono historia clínica" className='mb-3 img-fluid'/>
                                    <p className='titulo-item mb-1'>Recetas médicas</p>
                                    <p className='texto-item mb-0'>Los pacientes pueden pedir y recibir recetas médicas, facilitando el acceso a las mismas para los medicamentos que necesitan.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className='border-0 shadow'>
                                <Card.Body className='text-center py-4'>
                                    <img src={IconoChats} alt="Icono historia clínica" className='mb-3 img-fluid'/>
                                    <p className='titulo-item mb-1'>Chats</p>
                                    <p className='texto-item mb-0'>Los pacientes y profesionales de la salud pueden ponerse en contacto a través de un chat en tiempo real, para facilitar las consultas.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section id='pacientes' className='py-5'>
                <Container className='py-4'>
                    <Row className='align-items-center'>
                        <Col lg={6} className="text-center d-none d-lg-block">
                            <img src={MockupCelular} alt="Pantallas de celular con vistas de la app Eira" className='img-fluid'/>
                        </Col>
                        <Col lg={6}>
                            <h2 className='mb-4 mb-lg-3'><span className='text-verde-claro'>NO</span> TE OLVIDES MÁS</h2>
                            <p>Eira facilita a los pacientes el seguimiento de sus tratamientos médicos prolongados, ayudándoles a recordar qué ejercicios tienen que hacer, qué medicamentos deben tomar y si tienen algún tipo de restricción con respecto a las comidas que pueden ingerir.</p>
                            <img src={MockupCelular} alt="Pantallas de celular con vistas de la app Eira" className='img-fluid d-inline d-lg-none mb-4'/>
                            <p className='mb-4'>Eira permite tener toda esta información en el celular, para poder aceder desde cualquier lugar y en cualquier momento.</p>
                            <div className='d-flex justify-content-center d-lg-block'>
                                <Link to={`/registro`} className="nav-link btn btn-primary">¡Quiero registrarme como paciente!</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section id='profesionales' className='py-5'>
                <Container className='py-4'>
                    <Row className='align-items-center'>
                        <Col lg={6}>
                            <h2 className='mb-3'>SEGUÍ EL <span className='text-verde-claro'>PROGRESO</span> DE TUS PACIENTES</h2>
                            <p className='mb-4'>Con Eira seguí el progreso de tus pacientes en los tratamientos asignados sin que deban asistir al consultorio y alivianando la agenda de turnos.</p>
                            <div className='d-flex justify-content-center d-lg-block mb-4 mb-lg-0'>
                                <Link to={`/registro`} className="nav-link btn btn-primary">¡Quiero registrarme como profesional!</Link>
                            </div>
                        </Col>
                        <Col lg={6} className="text-center">
                            <img src={ImgProfesionales} alt="Profesionales de la salud" className='img-fluid'/>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section id='contacto' className='py-5'>
                <Container className='py-4'>
                    <Row>
                        <Col lg={8} className='mx-auto'>
                            <h2 className='text-center'>CONTACTO</h2>
                            <p className='text-center mb-4'>Si querés recibir más información, no dudes en contactarnos</p>
                            {success &&
                                <Alert key="success" variant='success'  onClose={() => setSuccess(false)} dismissible>
                                    <p className='mb-0'>Tu mensaje se envió correctamente. Pronto nos pondremos en contacto con vos.</p>
                                </Alert>
                            }
                            {error &&
                                <Alert key="danger" variant='danger'  onClose={() => setError(false)} dismissible>
                                    <p className='mb-0'>Ocurrió un problema. Por favor intenta de nuevo más tarde.</p>
                                </Alert>
                            }
                            <Form onSubmit={handleSubmit}>
                                <Row className='mb-0 mb-md-3'>
                                    <FloatingLabel controlId="nombre" label="Nombre" className="mb-4 floating-distance" as={Col} md={6}>
                                        <Form.Control type="text" placeholder="Nombre" name="nombre" value={nombre} onChange={(ev) => setNombre(ev.target.value)}/>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="email" label="Email" className="mb-4 floating-distance" as={Col} md={6}>
                                        <Form.Control type="email" placeholder="Email" name="email" value={email} onChange={(ev) => setEmail(ev.target.value)}/>
                                    </FloatingLabel>
                                </Row>
                                <FloatingLabel controlId="mensajeContacto" label="Tu mensaje" className="mb-4 floating-distance">
                                    <Form.Control as="textarea" placeholder="Tu mensaje" name="mensajeContacto" value={mensaje} onChange={(ev) => setMensaje(ev.target.value)}/>
                                </FloatingLabel>
                                <div className='d-flex justify-content-center'>
                                    <Button type="submit" id='btn-enviar' variant='naranja' disabled={loadingButton}>
                                        {loadingButton &&
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                        }
                                        {!loadingButton && <span>Enviar</span>}
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default Home