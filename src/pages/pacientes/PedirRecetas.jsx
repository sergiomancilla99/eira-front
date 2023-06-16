import { Alert, Container, Row, Col, Card, Form, Button, Table, Badge, Spinner } from 'react-bootstrap'
import Select from 'react-select'
import { useState, useEffect, useContext } from 'react'
import { UsuarioContext } from "../../context/UsuarioContext";
import * as PacientesService from '../../services/pacientes.service.js'
import * as apiMedicamentos from '../../services/apiMedicamentos.service.js'
import { saveAs } from 'file-saver'

function PedirRecetas() {
    const [medicos, setMedicos] = useState([])
    const [profesional, setProfesional] = useState("")
    const [medicamento, setMedicamento] = useState("")
    const [busqueda, setBusqueda] = useState("")
    const [listaMedicamentos, setListaMedicamentos] = useState([])
    const [busquedaMedicamentos, setBusquedaMedicamentos] = useState("")
    const [misPedidos, setMisPedidos] = useState([])
    const {usuarioLogueado} = useContext(UsuarioContext)
    const [loading, setLoading] = useState(true)
    const [loadingButton, setLoadingButton] = useState(false)

    let [success, setSuccess] = useState(false)
    let [error, setError] = useState(false)

    useEffect(() => {
        PacientesService.traerMisMedicos(usuarioLogueado?._id)
        .then((resp) => setMedicos(resp))
        // eslint-disable-next-line
    }, [busqueda])

    useEffect(() => {
        apiMedicamentos.traer(busquedaMedicamentos)
        .then((resp) => setListaMedicamentos(resp.resultados))
    }, [busquedaMedicamentos])

    useEffect(() => {
        PacientesService.traerRecetasPorId(usuarioLogueado?._id)
        .then((resp) => {
            setMisPedidos(resp)
            setLoading(false)
        })
    // eslint-disable-next-line
    }, [success])

    function handleSubmit(ev) {
        ev.preventDefault()
        setLoadingButton(true)
        PacientesService.pedidoReceta({profesional, medicamento, usuarioLogueado})
        .then(resp => {
            if(resp === 'creado') {
                setLoadingButton(false)
                setSuccess(true)
            } else {
                setLoadingButton(false)
                setError(true)
            }
        })
    }

    function downloadFile(urlFile) {
        saveAs(urlFile, `descarga`)
    }

    return(
        <main className="fondo-generico">
            <section>
                <Container className='my-5'>
                    <Row>
                        <Col sm={12}>
                            <Alert key="info" variant='info' className='shadow py-5'>
                                <h1 className='fs-4 text-center mb-3'>Pedido de Recetas</h1>
                                <p className='px-4'>Los pasos que tenés que seguir para poder pedir recetas son:</p>
                                <ol className='px-5'>
                                    <li>Seleccioná al médico al que querés pedirle la receta</li>
                                    <li>Seleccioná el medicamento por el cual estás haciendo el pedido de receta.</li>
                                </ol>
                            </Alert>
                        </Col>
                        <Col sm={12}>
                            <Card className='shadow mb-2 border-0'>
                                {success &&
                                    <Alert key="success" variant='success'  onClose={() => setSuccess(false)} dismissible>
                                        <p className='px-4 mb-0'>Se envío el pedido de receta. Te enviaremos un mail cuando esté lista para ser descargada.</p>
                                    </Alert>
                                }
                                {error &&
                                    <Alert key="danger" variant='danger'  onClose={() => setError(false)} dismissible>
                                        <p className='px-4 mb-0'>Ocurrió un problema. Por favor intenta de nuevo más tarde.</p>
                                    </Alert>
                                }
                                <Card.Body className='px-5 py-5'>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="profesional">
                                            <Form.Label>Elegí el médico</Form.Label>
                                            <Select
                                                defaultValue={ {label:"Buscar médico por nombre y apellido", value:""} }
                                                options={medicos.map(info => ({label: info.nombre + ' ' + info.apellido, value: info._id}))}
                                                onChange={(ev) => ev ? setProfesional(ev.value):""}
                                                onInputChange={(ev) => setBusqueda(ev)}
                                                noOptionsMessage={() => "No se encuentra el médico que buscás..."}
                                                isSearchable
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-4" controlId="medicamento">
                                            <Form.Label>Elegí el medicamento</Form.Label>
                                            <Select
                                                defaultValue={ {label:"Nombre medicamento", value:""} }
                                                options={listaMedicamentos?.map(medi => ({ label: medi.nombre, value: medi.nombre}))}
                                                onChange={(ev) => ev ? setMedicamento(ev.value):""}
                                                onInputChange={(ev) => setBusquedaMedicamentos(ev)}
                                                noOptionsMessage={() => "No se encuentra el medicamento que busca..."}
                                                isSearchable
                                            />
                                        </Form.Group>

                                        <div className="d-flex justify-content-center">
                                            <Button type="submit" variant="agregar" disabled={loadingButton}>
                                                {loadingButton &&
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                                }
                                                {!loadingButton &&
                                                    <span>Pedir Receta</span>
                                                }
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col sm={12} className="mt-3">
                            <Card body className='shadow mb-2 border-0'>
                                <h2 className="titulo">Mis Pedidos</h2>
                                <Table hover responsive className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>Medicamento</th>
                                            <th>Médico</th>
                                            <th>Estado</th>
                                            <th>Link</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading &&
                                            <tr>
                                                <td className='text-center' colSpan={4}>
                                                    <Spinner animation="border" className='color-spinner' />
                                                </td>
                                            </tr>
                                        }
                                        {!loading && misPedidos.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado pedidos.</td></tr>}
                                        {!loading && misPedidos.map((pedido, i) =>
                                            <tr key={i}>
                                                <td>{pedido.medicamento}</td>
                                                <td>{pedido.medico}</td>
                                                <td>{pedido.enviado ? <Badge className='fw-semibold bg-verde'>Lista para descargar</Badge> : <Badge className='fw-semibold bg-naranja'>En proceso</Badge>}</td>
                                                {pedido.enviado && <td className='d-lg-table-cell'><Button onClick={() => downloadFile(pedido.imagen)} variant="verde">Descargar</Button></td>}
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default PedirRecetas