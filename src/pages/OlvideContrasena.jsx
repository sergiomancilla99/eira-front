import React from "react";
import { useState } from "react";
import * as UsuariosService from '../services/usuarios.service.js'
import { Container, Row, Col, Card, Form, FloatingLabel, Button, Alert, Spinner } from 'react-bootstrap'

function OlvideContrasena() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [loadingButton, setLoadingButton] = useState(false)

    function handleEmail(e) {
        setEmail(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault(e)
        setLoadingButton(true)
        UsuariosService.olvideContrasena({email})
        .then(response => {
            if(response.response === false ) {
                setLoadingButton(false)
                setError(response.message)
            } else {
                setLoadingButton(false)
                setMessage('Ya enviamos el link al email indicado. No te olvidés de revisar en spam')
            }
        })
    }

    return (
        <main className="fondo-generico">
            <section>
                <Container>
                    <Row>
                        <Col lg={8} className="mx-auto mt-5 py-5">
                            <Card body className="px-4 py-3">
                                <h1 className="font-weight-bold text-center h2">Olvidé mi contraseña</h1>
                                {message && <Alert key="success" variant="success">{message}</Alert>}
                                <p className="text-center mb-3">Ingresá tu correo electrónico, y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</p>
                                <Form onSubmit={handleSubmit}>
                                    <FloatingLabel className="mb-4 floating-distance" controlId="email" label="Email*">
                                        <Form.Control type="text" placeholder="Email*" name="email" value={email} onChange={handleEmail}/>
                                    </FloatingLabel>
                                    {error && <p className="text-danger">{error}</p>}
                                    <div className="d-flex justify-content-center">
                                        <Button type="submit" variant="editar" disabled={loadingButton}>
                                            {loadingButton &&
                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                            }
                                            {!loadingButton && <span>Enviar enlace</span>}
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

export default OlvideContrasena