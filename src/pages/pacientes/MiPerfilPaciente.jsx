import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as PacienteService from "../../services/pacientes.service.js"
import { Card, Container, Row, Col, Spinner, Button } from 'react-bootstrap'
import IconoUsuario from '../../imgs/icono-usuario-perfil.png'
import IconoEmail from '../../imgs/icono-email.png'
import IconoTelefono from '../../imgs/icono-telefono.png'
import IconoIdentificacion from '../../imgs/icono-identificacion.png'
import { UsuarioContext } from '../../context/UsuarioContext'
import Swal from 'sweetalert2'

function MiPerfilPaciente () {
    const [paciente, setPaciente] = useState({})
    const { id } = useParams()
    const {usuarioLogueado} = useContext(UsuarioContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        PacienteService.traerPorId(id)
        .then( resp => {
            setPaciente(resp)
            setLoading(false)
        })
    }, [id])

    function handleSubmit(ev) {
        ev.preventDefault()
        Swal.fire({
            title: '¿Seguro que quiere eliminar su usuario?',
            text: "Al eliminar tu perfil se borrarán tus datos de forma definitiva y no podrán recuperarse.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
            input: 'text',
            inputLabel: `Para eliminar el perfil ingresa tu email: ${paciente.email}`,
            didOpen: () =>{
                Swal.getConfirmButton().disabled = true
                Swal.getInput().addEventListener('input', function(e) {
                    if(e.target.value === paciente.email) {
                        Swal.getConfirmButton().disabled = false
                    } else {
                        Swal.getConfirmButton().disabled = true
                    }
                })
            }
        })
        .then((result) => {
            if (result.isConfirmed) {
                PacienteService.eliminar(usuarioLogueado?._id)
                .then(() =>   Swal.fire(
                    'Se borró correctamente',
                    '',
                    'success'
                ))
                localStorage.removeItem('usuario')
            }
        })
    }

    return(
        <main id="perfil">
            <section>
                <Container className="py-5">
                    <Row>
                        <Col lg='10' className="mx-auto">
                            <Card body className='shadow px-2 pt-2 bt-azul'>
                                <Container>
                                    <Row>
                                        {loading &&
                                            <div className='text-center'>
                                                <Spinner animation="border" className='color-spinner' />
                                            </div>
                                        }

                                        {!loading &&
                                        <>
                                            <Col lg="8" className="order-1 order-lg-0">
                                                <h1 className="titulo mb-3">{paciente.nombre} {paciente.apellido}</h1>
                                                <p className="mb-2"><img src={IconoEmail} alt="Icono de email"/> {paciente.email}</p>
                                                <p className="mb-2"><img src={IconoTelefono} alt="Icono de email"/> {paciente.telefono}</p>
                                                <p className="mb-2"><img src={IconoIdentificacion} alt="Icono de email"/> {paciente.dni}</p>
                                                <p className="mb-2">Obra Social: <br/> <strong>{paciente.obraSocial}</strong></p>
                                                <p>N° Afiliado: <br/> <strong>{paciente.afiliado}</strong></p>
                                            </Col>
                                            <Col lg="4" className="order-0 order-lg-1 text-center">
                                                <img src={IconoUsuario} alt="Icono de usuario" className="img-fluid"/>
                                            </Col>
                                            <Col className="order-3">
                                                <div className="d-flex justify-content-center align-items-center mt-2 mb-5 flex-column flex-md-row">
                                                    <Link to={`/paciente/editar-perfil/${id}`} state={{paciente}} className="btn me-md-3 btn-editar-perfil mb-4 mb-md-0">Editar información</Link>
                                                    <form onSubmit={handleSubmit}>
                                                        <Button type="submit" variant="eliminar-perfil">Eliminar perfil</Button>
                                                    </form>
                                                </div>
                                            </Col>
                                        </>
                                        }
                                    </Row>
                                </Container>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default MiPerfilPaciente