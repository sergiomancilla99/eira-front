import {useContext} from "react";
import { useNavigate } from 'react-router-dom'
import { UsuarioContext } from "../context/UsuarioContext";
import { SocketContext } from '../context/SocketContext'
import * as PacientesService from '../services/pacientes.service.js'

function Logout() {
    let navigate = useNavigate();
    const {setUsuarioLogueado, usuarioLogueado} = useContext(UsuarioContext)
    const socket = useContext(SocketContext)

    function handleSubmit(e) {
        e.preventDefault()
        const usuario = {
            nombre: usuarioLogueado?.nombre,
            apellido: usuarioLogueado?.apellido,
            email: usuarioLogueado?.email,
            telefono: usuarioLogueado?.telefono,
            dni: usuarioLogueado?.dni,
            afiliado: usuarioLogueado?.afiliado,
            obraSocial: usuarioLogueado?.obraSocial,
            fbNotification: null
        }
        socket.emit("logout", socket.id)
        if(!usuarioLogueado?.matricula) {
            PacientesService.editar(usuarioLogueado?._id, usuario)
        }
        setUsuarioLogueado(null)
        localStorage.removeItem('usuario')
        localStorage.removeItem('token')
        localStorage.removeItem('tokenFB')
        localStorage.removeItem('misRecordatorios')
        localStorage.removeItem('recordatorios')

        navigator.serviceWorker.ready.then(function(registration) {
            registration.active.postMessage({
                type: "messageType",
                data: "",
                recordatorios: []
            });
        });

        navigate('/login', { replace: true })
    }

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" className="dropdown-item logout">Cerrar Sesión</button>
        </form>
    )
}

export default Logout