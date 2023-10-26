import React from 'react'
import { useContext, useState, useEffect, useRef } from 'react'
import { UsuarioContext } from '../context/UsuarioContext'
import * as ChatService from "../services/chat.service"
import ChatUsuarios from '../components/ChatUsuarios'
import Mensajes from '../components/Mensajes'
import { SocketContext } from '../context/SocketContext'
import { Container, Row, Col, Form, FloatingLabel, Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import * as PacientesService from "../services/pacientes.service.js"
import * as ProfesionalesService from "../services/profesionales.service.js"
function Chat() {
    const [chats, setChats] = useState([])
    const [chatActual, setChatActual] = useState(null)
    const [mensajes, setMensajes] = useState([])
    const [nuevoMensaje, setNuevoMensaje] = useState("")
    const [mensajeEntrante, setMensajeEntrante] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const [usuariosOnline, setUsuariosOnline] = useState([])
    const scrollRef = useRef()
    let {usuarioLogueado} = useContext(UsuarioContext)
    const socket = useContext(SocketContext);
    let navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const [loadingMensaje, setLoadingMensaje] = useState(true)
    const [loadingButton, setLoadingButton] = useState(false)
    const [usuario, setUsuario] = useState([])

    useEffect(
        () => {
            if(usuarioLogueado?.matricula && !usuarioLogueado?.verificado) {
                navigate('/falta-verificacion', {replace: true}) 
            }
          // eslint-disable-next-line
        }, [])

    useEffect(() => {
        socket.on("getMensaje", data => {
            setMensajeEntrante({
                emisor: data.emisorId,
                mensaje: data.mensaje,
                created_at: Date.now()
            })
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        mensajeEntrante && chatActual?.usuarios.includes(mensajeEntrante.emisor) &&
        setMensajes((mensajesPrevios) => [...mensajesPrevios, mensajeEntrante])
    }, [mensajeEntrante, chatActual])

    useEffect(() => {
        socket.emit("agregarUsuario", usuarioLogueado?._id)
        socket.on("getUsuarios", (usuarios) => {
            setUsuariosOnline(usuarios)
        })
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        ChatService.traer(usuarioLogueado?._id)
        .then(chats => {
            setChats(chats)
            setLoading(false)
        } )
    }, [usuarioLogueado?._id])

    useEffect(() => {
        if(chatActual !== null){
            ChatService.traerMensajes(chatActual?._id)
            .then((mensajes) => {
                setMensajes(mensajes)
                setLoadingMensaje(false)
            })
        }
    }, [chatActual])

    useEffect(() => {
        socket.on()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [mensajes])

    function handleNuevoMensaje(ev) {
        setNuevoMensaje(ev.target.value)
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        setLoadingButton(true)
        const mensaje = {
            emisor: usuarioLogueado?._id,
            mensaje: nuevoMensaje,
            chat: chatActual._id
        }

        const receptorId = chatActual.usuarios.find(usuario => usuario !== usuarioLogueado?._id)

        socket.emit("enviarMensaje", {
            emisorId: usuarioLogueado?._id,
            receptorId,
            mensaje: nuevoMensaje
        })

        ChatService.enviarMensaje(mensaje)
        .then( () => {
            ChatService.traerMensajes(chatActual?._id)
            .then((mensajes) => {
                setMensajes(mensajes)
                setLoadingButton(false)
            })
            setNuevoMensaje("")
        })
    }

    return (
        <main className='py-5 fondo-generico'>
            <section>
                <Container className='bg-white shadow rounded'>
                    {loading &&
                        <div className='text-center'>
                            <Spinner animation="border" className='color-spinner' />
                        </div>
                    }

                    {!loading && !chats.length &&
                        <Row>
                            <Col md={12}>
                                <p className='text-center h4'>Todavía no tenés chats.</p>
                            </Col>
                        </Row>
                    }

                    {!loading && chats.length > 0 &&
                        <Row>
                            <h1 className='visually-hidden'>Chats</h1>
                            <Col md={4} className="border py-3 ps-3">
                                <p>Chats</p>
                                <ul className="list-unstyled">
                                    {chats.map( (chat, i) =>
                                    <div onClick={ () =>
                                    {
                                        setChatActual(chat)
                                        const receptorId = chat?.usuarios.find((usuario) => usuario !== usuarioLogueado?._id)
                                        !usuarioLogueado?.matricula ?
                                            ProfesionalesService.traerPorId(receptorId)
                                            .then( usuario => setUsuario(usuario) ) :
                                            PacientesService.traerPorId(receptorId)
                                            .then( usuario => setUsuario(usuario) )
                                          // eslint-disable-next-line
                                    } } key={chat._id}>
                                        <ChatUsuarios  chat={chat} usuarioLogueado={usuarioLogueado}  />
                                    </div> )
                                    }
                                </ul>
                            </Col>

                            <Col md={8} className="border py-3">
                                {
                                    chatActual ?
                                    <>
                                        {loadingMensaje &&
                                            <div className='text-center'>
                                                <Spinner animation="border" className='color-spinner' />
                                            </div>
                                        }

                                        {!loadingMensaje &&
                                        <>
                                        <p className='fs-2'>{usuario?.nombre} {usuario?.apellido}</p>
                                        <div className="box-mensajes p-3">
                                            {mensajes.map( (mensaje,i) =>
                                            <div ref={scrollRef} key={i}>
                                                <Mensajes mensaje={mensaje} own={mensaje.emisor === usuarioLogueado?._id} />
                                            </div>
                                            )}
                                        </div>
                                        </>}

                                        <Form onSubmit={handleSubmit} className="mt-5">
                                            <div className='d-flex align-items-stretch my-3'>
                                                <FloatingLabel className="w-100" controlId="mensaje" label="Mensaje">
                                                    <Form.Control as="textarea" rows={2} name="mensaje" placeholder="Mensaje" value={nuevoMensaje} onChange={handleNuevoMensaje}/>
                                                </FloatingLabel>
                                                <Button type="submit" variant="mensaje-chat" disabled={loadingButton}>
                                                    {loadingButton &&
                                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                                                    }
                                                    {!loadingButton &&
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                                                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                                                    </svg>
                                                    }
                                                </Button>
                                            </div>
                                        </Form>
                                    </> : <span>Elija un chat...</span>
                                }
                            </Col>
                        </Row>
                    }
                </Container>
            </section>
        </main>
    )
}

export default Chat
