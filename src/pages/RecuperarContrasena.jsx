import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import * as UsuariosService from '../services/usuarios.service.js'
import { Container, Row, Col, Card, Form, FloatingLabel, Button, Spinner } from 'react-bootstrap'

function RecuperarContrasena() {
    const {token, email} = useParams()
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loadingButton, setLoadingButton] = useState(false)
    let navigate = useNavigate()

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault(e)
        setLoadingButton(true)
        UsuariosService.recuperarContrasena(token, email, {password})
        .then(response => {
            if(response.response === false ) {
                setLoadingButton(false)
                setError(response.message)
            } else {
                setLoadingButton(false)
                navigate('/login', { replace: true })
            }
        })
    }

    return (
        <main className="fondo-generico">
            <section>
                <Container>
                    <Row>
                        <Col lg={8} className="mt-5 pt-5 mx-auto">
                            <Card body className="px-4 py-3">
                                <h1 className="font-weight-bold text-center h3">Recuperar Contraseña</h1>
                                <p className="text-center">Ingresá tu nueva contraseña</p>
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel className="mb-4 floating-distance" controlId="email" label="Email*">
                                        <Form.Control type="text" placeholder="Email*" name="email" value={email} disabled/>
                                    </FloatingLabel>
                                    <FloatingLabel className="mb-4 floating-distance" controlId="password" label="Contraseña*">
                                        <Form.Control type="password" placeholder="Contraseña*" name="password" value={password}  onChange={handlePassword} required/>
                                    </FloatingLabel>
                                    {error && <p className="text-danger">{error}</p>}
                                    <div className="d-flex justify-content-center">
                                        <Button type="submit" variant="editar">
                                            {loadingButton &&
                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                            }
                                            {!loadingButton && <span>Cambiar contraseña</span>}
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

export default RecuperarContrasena