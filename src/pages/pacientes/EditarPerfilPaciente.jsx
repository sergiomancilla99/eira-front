import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import * as PacienteService from "../../services/pacientes.service.js"
import * as UsuariosService from "../../services/usuarios.service.js"
import * as authService from "../../services/auth.service.js"
import * as PrepagasService from "../../services/prepagas.service.js"
import {Card, Container, Row, Col, Form, Button, FloatingLabel, Alert, Spinner } from 'react-bootstrap'
import { useForm } from "react-hook-form"
import Select from 'react-select'

function EditarPerfilPaciente(props) {
    const location = useLocation()
    const [nombre, setNombre] = useState(location.state.paciente?.nombre || "")
    const [apellido, setApellido] = useState(location.state.paciente?.apellido || "")
    const [telefono, setTelefono] = useState(location.state.paciente?.telefono || "")
    const [email, setEmail] = useState(location.state.paciente?.email || "")
    const [dni, setDni] = useState(location.state.paciente?.dni || "")
    const [obraSocial, setObraSocial] = useState(location.state.paciente?.obraSocial || "")
    const [afiliado, setAfiliado] = useState(location.state.paciente?.afiliado || "")
    const [password, setPassword] = useState("")
    const [mostrarPassword, setMostrarPassword] = useState(false)
    const { register, formState: { errors }, handleSubmitPswd } = useForm()
    const { id } = useParams()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loadingButton, setLoadingButton] = useState(false)
    const [loadingButtonPswd, setLoadingButtonPswd] = useState(false)
    const [listaObraSocial, setListaObraSocial] = useState([])
    const [busqueda, setBusqueda] = useState("")

    function handleSubmit(ev) {
        ev.preventDefault()
        setLoadingButton(true)
        PacienteService.editar(id, {nombre, apellido, telefono, email, dni, obraSocial, afiliado})
        .then(() => {
            authService.actualizarToken(email)
            .then(({usuario, token}) => {
                setLoadingButton(false)
                props.onLogin({usuario, token})
            })
        })
    }

    function handlePassword(ev) {
        ev.preventDefault()
        setLoadingButtonPswd(true)
        const tipo = 'paciente'
        UsuariosService.cambiarConstrasena(id,tipo, email, password)
        .then(() => {
            setSuccess('La contraseña se actualizó correctamente')
            authService.login(email, password)
            .then(({usuario, token}) => {
                setLoadingButtonPswd(false)
                props.onLogin({usuario, token})
            })
            .catch(err=>{
                setLoadingButtonPswd(false)
                setError(err.message)
            })
        })
    }

	useEffect(()=> {
		PrepagasService.traer()
		.then(listaObraSocial => {
            setListaObraSocial(listaObraSocial.nombres)
		})
	}, [])

    return (
        <main id="perfil">
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                            <h1 className="titulo mb-3">Editar mi perfil</h1>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col lg={6}>
                                            <FloatingLabel className="my-3 floating-distance-2" controlId="nombre" label="Nombre">
                                                <Form.Control type="text" placeholder="Nombre" name="nombre" value={nombre} onChange={(ev) => setNombre(ev.target.value)}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col lg={6}>
                                            <FloatingLabel className="my-3 floating-distance-2" controlId="apellido" label="Aellido">
                                                <Form.Control type="text" placeholder="Apellido" name="apellido" value={apellido} onChange={(ev) => setApellido(ev.target.value)}/>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <FloatingLabel className="my-3 floating-distance-2" controlId="telefono" label="Teléfono">
                                                <Form.Control type="text" placeholder="Teléfono" name="telefono" value={telefono} onChange={(ev) => setTelefono(ev.target.value)}/>
                                            </FloatingLabel>
                                        </Col>
                                        <Col lg={6}>
                                            <FloatingLabel className="my-3 floating-distance-2" controlId="email" label="Email">
                                                <Form.Control type="text" placeholder="Email" name="email" value={email} onChange={(ev) => setEmail(ev.target.value)} disabled/>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>

                                    <FloatingLabel className="my-3 floating-distance-2" controlId="dni" label="N° de documento">
                                        <Form.Control type="text" placeholder="N° de documento" name="dni" value={dni} onChange={(ev) => setDni(ev.target.value)} disabled/>
                                    </FloatingLabel>

                                    <Row>
                                        <FloatingLabel className="my-3 floating-distance" as={Col} controlId="obraSocial" label="Obra Social" md={6}>
                                            <Form.Control type="text" placeholder="Obra Social*" name="obraSocial" value={obraSocial} onChange={(ev) => setObraSocial(ev.target.value)}/>
                                        </FloatingLabel>
                                        {/* <div className="mb-4 col-md-6">
                                            <label htmlFor="aa">Obra social</label>
                                            <Select
                                                defaultValue={ {label: obraSocial, value: obraSocial} }
                                                options={ listaObraSocial.map(prepaga => ({ label: prepaga, value: prepaga}))}
                                                onChange={(ev) => ev ? setObraSocial(ev.value):""}
                                                onInputChange={(ev) => setBusqueda(ev)}
                                                noOptionsMessage={() => "No se encuentra la obra social que busca..."}
                                                isSearchable
                                            />
                                        </div> */}
                                        <FloatingLabel className="my-3 floating-distance" as={Col} controlId="afiliado" label="N° de afiliado" md={6}>
                                            <Form.Control type="text" placeholder="N° de afiliado" name="afiliado" value={afiliado}  onChange={(ev) => setAfiliado(ev.target.value)}/>
                                        </FloatingLabel>
                                    </Row>

                                    <div className="d-flex justify-content-center my-3">
                                        <Button type="submit" variant="editar" disabled={loadingButton}>
                                            {loadingButton &&
                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                            }
                                            {!loadingButton && <span>Actualizar perfil</span>}
                                        </Button>
                                    </div>
                                </Form>
                            </Card>
                            <Card body className='shadow mt-4 px-2 pt-2'>
                                <p className="fs-5 fw-bold">Cambiar contraseña</p>
                                <Form id="form-cambiar-pswd" onSubmit={handlePassword}>
                                    {success && <Alert variant="success"><p className="mb-0">{success}</p></Alert>}
                                    <small>Ingresá la nueva contraseña</small>
                                    <div className="d-flex align-items-center mb-4">
                                        <FloatingLabel className="floating-distance-2" as={Col} controlId="password" label="Contraseña*">
                                            <Form.Control type={mostrarPassword ? "text" : "password"} placeholder="Contraseña*" name="password" {...register('password', {required: true, minLength: 3})} value={password} onChange={(ev) => setPassword(ev.target.value)}/>
                                            {errors.password?.type === 'required' && <span className="text-danger">Campo obligatorio</span>}
                                            {errors.password?.type === 'minLength' && <span className="text-danger">La contraseña debe tener almenos 3 caracteres</span>}
                                        </FloatingLabel>
                                        <span className="btn btn-ver-pswd" onClick={() => setMostrarPassword(!mostrarPassword)}>  {mostrarPassword ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                            </svg> :  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                            </svg>}
                                        </span>
                                    </div>

                                    <div className="d-flex justify-content-center my-3">
                                        <Button type="submit" variant="editar" disabled={loadingButtonPswd}>
                                            {loadingButtonPswd &&
                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                            }
                                            {!loadingButtonPswd && <span>Actualizar contraseña</span>}
                                        </Button>
                                    </div>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default EditarPerfilPaciente