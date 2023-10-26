import { useState, useEffect } from 'react'
import { Card, Container, Row, Col, Form, Table, Tooltip, OverlayTrigger, Badge, Button, Spinner } from 'react-bootstrap'
import Paginador from '../../components/Paginador.jsx'
import { useNavigate } from 'react-router-dom'
import * as ProfesionalesService from '../../services/profesionales.service.js'

function ListadoMedicos() {
    const [medicos, setMedicos] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [paginaActual, setPaginaActual] = useState(1)
    // eslint-disable-next-line no-unused-vars
    const [medicosPorPagina, setMedicosPorPagina] = useState(5)
    const [loading, setLoading] = useState(true)

    let navigate = useNavigate();

    const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))

    useEffect(
        () => {
            if(!usuarioLogueado?.admin) { navigate('/', { replace: true }) }
          // eslint-disable-next-line
        }, [])

    useEffect(() => {
        ProfesionalesService.traer()
        .then( (resp) => {
            setMedicos(resp)
            setLoading(false)
        })
            // eslint-disable-next-line no-unused-vars
    }, [medicos])

    const indexUltimoPaciente = paginaActual * medicosPorPagina
    const indexPrimerPaciente = indexUltimoPaciente - medicosPorPagina
    let medicosActuales = []
    if(medicos.length > 0) {
        medicosActuales = medicos.slice(indexPrimerPaciente, indexUltimoPaciente)
    }

    const resultados = !busqueda ? medicosActuales : medicos.filter( (medico) => medico.nombre.toLowerCase().includes(busqueda.toLowerCase()) || medico.matricula.includes(busqueda) || medico.dni.includes(busqueda))

    function verificacion(id) {
        ProfesionalesService.verificar(id)
        .then(resp => {})
    }

    return (
        <main id="listadoPacientes">
            <section>
                <Container>
                    <Row>
                        <Col>
                            <Card body className='shadow'>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1 className="titulo">Médicos</h1>
                                    <Form>
                                        <Form.Group controlId="buscador">
                                            <Form.Control type="search" placeholder="Buscar médico" value={busqueda} onChange={(ev) => setBusqueda(ev.target.value)}/>
                                        </Form.Group>
                                    </Form>
                                </div>
                                <Table hover responsive className="mt-4">
                                    <thead>
                                        <tr>
                                            <th>DNI</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Matrícula</th>
                                            <th className='d-none d-lg-table-cell'>Email</th>
                                            <th>Verificado</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {loading &&
                                        <tr>
                                            <td className='text-center' colSpan={5}>
                                                <Spinner animation="border" className='color-spinner' />
                                            </td>
                                        </tr>
                                    }
                                    {!loading && resultados.length === 0 && <tr><td colSpan={5} className="text-center">No se han encontrado médicos</td></tr>}
                                    {!loading && resultados.map((medico, i) =>
                                        <tr key={i}>
                                            <td>{medico.dni}</td>
                                            <td>{medico.nombre}</td>
                                            <td>{medico.apellido}</td>
                                            <td>{medico.matricula}</td>
                                            <td className='d-none d-lg-table-cell'>{medico.email}</td>
                                            <td>{medico.verificado ? <Badge className='fw-semibold bg-verde'>Verificado</Badge> : <Badge className='fw-semibold bg-naranja'>Falta Verificar</Badge>}</td>
                                            <td className='d-flex'>
                                                {!medico.verificado &&
                                                <OverlayTrigger placement="top" overlay={
                                                    <Tooltip id="tooltip-top1">
                                                        Verificar médico
                                                    </Tooltip>
                                                }>
                                                <Button variant="crear" className="me-2 text-white fw-bold" onClick={() => verificacion(medico._id)}>✓</Button>
                                                </OverlayTrigger>
                                                }
                                                {medico.verificado &&
                                                <OverlayTrigger placement="top" overlay={
                                                    <Tooltip id="tooltip-top2">
                                                        Quitar verificación
                                                    </Tooltip>
                                                }>
                                                <Button variant="eliminar" className="text-white fw-bold" onClick={() => verificacion(medico._id)}>X</Button>
                                                </OverlayTrigger>
                                                }
                                            </td>
                                        </tr>
                                    ).reverse()}
                                    </tbody>
                                </Table>

                                {resultados.length !== 0 &&
                                    <Paginador
                                    elementosPorPagina={medicosPorPagina}
                                    totalElementos={medicos.length}
                                    setPaginaActual={setPaginaActual}
                                    paginaActual={paginaActual} />
                                }
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default ListadoMedicos