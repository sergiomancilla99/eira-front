import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import * as authService from "../services/auth.service.js"
import { Container, Row, Col, Button, Form, Alert, FloatingLabel, Card, Spinner } from 'react-bootstrap';

function LoginForm({onLogin}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [mostrarPassword, setMostrarPassword] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setLoadingButton(true)
        authService.login(email, password)
        .then(({usuario, token}) => {
            setLoadingButton(false)
            return onLogin({usuario, token})
        })
        .catch(err=>{
            setLoadingButton(false)
            setError(err.message)
        })
    }

    return (
        <main id="login">
            <section>
                <Container>
                    <Row>
                        <Col lg={6} className="mx-auto mt-5">
                            <Card className="my-5">
                                <Card.Body>
                                    <h1 className="text-center mb-4 pt-4">Iniciar Sesión</h1>
                                    {error && <Alert variant="danger" className="mx-4"><p className="mb-0">{error}</p></Alert>}
                                    <Form onSubmit={handleSubmit} className="mx-4">
                                        <FloatingLabel controlId="email" label="Email" className="mb-4 floating-distance-2">
                                            <Form.Control type="email" placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                                        </FloatingLabel>
                                        <div className="d-flex align-items-center mb-4">
                                            <FloatingLabel controlId="password" label="Contraseña" className="floating-distance-2 w-100">
                                                <Form.Control type={mostrarPassword ? "text" : "password"} placeholder="Contraseña" name="password" autoComplete="on" value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
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
                                        <div className="d-flex justify-content-center mb-3">
                                            <Button type="submit" variant="login" disabled={loadingButton}>
                                                {loadingButton &&
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                                }
                                                {!loadingButton &&
                                                    <span>Ingresar</span>
                                                }
                                            </Button>
                                        </div>
                                        <div className="text-center mb-4">
                                            <Link to="/olvideContrasena">¿Olvidaste tu contraseña?</Link>
                                        </div>
                                    </Form>
                                    <p className="text-center pb-4">¿No tenés cuenta? <Link to="/registro">Registrate acá</Link></p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default LoginForm