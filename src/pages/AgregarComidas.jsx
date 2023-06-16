import { useContext, useEffect, useState } from 'react'
import * as TratamientoService from '../services/tratamientos.service.js'
import { useNavigate, useParams } from 'react-router-dom'
import FormComida from '../components/FormComida'
import { UsuarioContext } from '../context/UsuarioContext.jsx'
import { Card, Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap'

function AgregarComidas() {
    const [comidas, setComidas] = useState([])
    const {usuarioLogueado} = useContext(UsuarioContext)
    const { id } = useParams()
    const [loadingButton, setLoadingButton] = useState(false)
    let navigate = useNavigate();

    useEffect(
        () => {
            if(!usuarioLogueado?.matricula) { navigate('/', { replace: true }) }
            if(!usuarioLogueado?.verificado) { navigate('/falta-verificacion', {replace: true}) }
          // eslint-disable-next-line
        }, [])

        function handleSubmit(ev) {
            ev.preventDefault()
            setLoadingButton(true)
            TratamientoService.agregarComida(id, {comidas})
            .then(() => {
                setLoadingButton(false)
                navigate(-1, { replace: true })
            })
            setComidas([])
        }

        function guardarComidas(listaComidas) {
            setComidas(listaComidas)
        }

    return (
        <main className="fondo-generico">
            <section>
                <Container className="py-5">
                    <Row>
                        <Col>
                            <Card body className='shadow px-2 pt-2'>
                                <h1 className="titulo">Agregar comidas</h1>
                                <Form onSubmit={handleSubmit}>
                                    <FormComida guardarComidas={guardarComidas} />

                                    <div className='mt-5 mb-3 d-flex justify-content-center'>
                                    <Button type="submit" variant='crear-tratamiento'>
                                        {loadingButton &&
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                        }
                                        {!loadingButton &&
                                            <span>Guardar comidas</span>
                                        }
                                    </Button>
                                </div>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
}

export default AgregarComidas