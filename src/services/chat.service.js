
async function crear(usuarios) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify(usuarios)
    })
}

async function traer(idUsuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/chat/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function traerMensajes(chatId) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/mensajes/${chatId}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function enviarMensaje(mensaje){
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/mensajes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify(mensaje)
    })
    .then(response => response.json())

}

async function traerUno(usuarioId1, usuarioId2) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/chat/${usuarioId1}/${usuarioId2}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

export {
    crear,
    traer,
    traerMensajes,
    enviarMensaje,
    traerUno
}