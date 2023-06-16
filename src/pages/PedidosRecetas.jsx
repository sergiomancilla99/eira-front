import { Card, Container, Row, Col, Table, Form, FloatingLabel, Button, Alert, Badge, Spinner } from 'react-bootstrap'
import * as ProfesionalesService from '../services/profesionales.service.js'
import { useState, useEffect, useContext } from 'react'
import { UsuarioContext } from "../context/UsuarioContext";
import { useNavigate } from 'react-router-dom'

function PedidosRecetas() {
    const [pedidos, setPedidos] = useState({})
    const [imagen, setImagen] = useState("")
    const [posicion, setPosicion] = useState("")
    const [paciente, setPaciente] = useState("")
    const [loading, setLoading] = useState(true)
    const [loadingButton, setLoadingButton] = useState(false)

    const {usuarioLogueado} = useContext(UsuarioContext)
    let navigate = useNavigate();

    let [success, setSuccess] = useState(false)
    let [error, setError] = useState(false)

    useEffect(
        () => {
            if(!usuarioLogueado?.matricula) { navigate('/', { replace: true }) }
            if(!usuarioLogueado?.verificado) { navigate('/falta-verificacion', {replace: true}) }
          // eslint-disable-next-line
        }, [])

    useEffect(() => {
        ProfesionalesService.traerPedidosRecetas(usuarioLogueado?._id)
        .then((resp) => {
            setPedidos(resp)
            setLoading(false)
        })
        // eslint-disable-next-line
    }, [])

    function handleSubmit(ev) {
        ev.preventDefault()
        setLoadingButton(true)
        let data = new FormData()
        data.append('file', imagen)
        data.append('posicion', posicion)
        data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
        data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
        if(imagen.type === "image/jpeg" || imagen.type === "image/png" || imagen.type === "application/pdf") {
            console.log("hag todo el proceso ok")
            fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: data
            })
            .then(resp => resp.json())
            .then(data => {
                const urlFile = data.secure_url
                ProfesionalesService.guardarUrlFile(urlFile, posicion, usuarioLogueado._id, paciente)
                .then(resp => {
                    setSuccess(true)
                    ProfesionalesService.traerPedidosRecetas(usuarioLogueado?._id)
                    .then((resp) => {
                        setPedidos(resp)
                        setLoadingButton(false)
                    })
                })
            })
        } else {
            setLoadingButton(false)
            setError(true)
        }
    }

    return(
        <main className='fondo-generico'>
            <section>
                <Container>
                <h1 className='titulo mt-3'>Recetas médicas</h1>
                    <Row>
                        <Col>
                            <Card className='shadow my-5'>
                                <Card.Body className='mx-3'>
                                    <h2 className='titulo mt-3'>Pedidos</h2>
                                    {success &&
                                    <Alert key="success" variant='success'  onClose={() => setSuccess(false)} dismissible>
                                        <p className='px-4 mb-0'>La receta fue enviada correctamente.</p>
                                    </Alert>
                                    }
                                    {error &&
                                        <Alert key="danger" variant='danger'  onClose={() => setError(false)} dismissible>
                                            <p className='px-4 mb-0'>Ocurrió un problema. Recordá que solo se aceptan archivos del tipo jpg, png o pdf. Si el error persiste, por favor intenta de nuevo más tarde.</p>
                                        </Alert>
                                    }
                                    <Table hover responsive className="mt-4">
                                        <thead>
                                            <tr>
                                                <th>Paciente</th>
                                                <th>Obra Social</th>
                                                <th>N° de Afiliado</th>
                                                <th>Medicamento</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {loading &&
                                            <tr>
                                                <td className='text-center' colSpan={6}>
                                                    <Spinner animation="border" className='color-spinner' />
                                                </td>
                                            </tr>
                                        }
                                        {!loading && pedidos.recetas && pedidos.recetas.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado pedidos de recetas</td></tr>}
                                        {!loading && pedidos.recetas && pedidos.recetas.map((receta, i) =>
                                            <tr key={i}>
                                                <>
                                                    <td>{receta.paciente}</td>
                                                    <td>{receta.obraSocial}</td>
                                                    <td>{receta.afiliado}</td>
                                                    <td>{receta.medicamento}</td>
                                                    <td>{receta.enviado ? <Badge className='fw-semibold bg-verde'>Enviada</Badge> : <Badge className='fw-semibold bg-naranja'>Falta cargar</Badge>}</td>
                                                    <td className='text-center'>
                                                        {!receta.enviado &&
                                                            <Button onClick={() => {setPosicion(i); setPaciente(receta.idPaciente)}} type="button" className="btn btn-azul" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled={loadingButton}>
                                                            {loadingButton &&
                                                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                                            }
                                                            {!loadingButton && <span>Enviar</span>}
                                                            </Button>
                                                        }
                                                        {receta.enviado &&
                                                            <Button type="button" className="btn btn-azul" disabled>Enviar</Button>
                                                        }
                                                    </td>
                                                </>
                                            </tr>
                                        )}
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="modal-title fs-5" id="exampleModalLabel">Enviar receta</h2>
                            <Button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Button>
                        </div>
                        <div className="modal-body">
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={12}>
                                        <FloatingLabel className="my-3 floating-distance-2" controlId="imagen" label="Imagen">
                                            <Form.Control type="file" placeholder="Imagen" name="imagen" onChange={(ev) => setImagen(ev.target.files[0])}/>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-center my-3">
                                    <Button type="submit" className="btn btn-editar" data-bs-dismiss="modal" disabled={loadingButton}>
                                        {loadingButton &&
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                        }
                                        {!loadingButton && <span>Enviar</span>}
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

export default PedidosRecetas