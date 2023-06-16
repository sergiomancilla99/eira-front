async function traerPorUsuario(idUsuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/solicitudes/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())
}

async function agregarUsuario(emisor, receptor) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/solicitudes`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({emisor, receptor})
    })
    .then(response => response.json())
}

async function enviarSolicitud(emisor, receptor) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/solicitud`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({emisor, receptor})
    })
    .then(response => response.json())
}

export {
    traerPorUsuario,
    agregarUsuario,
    enviarSolicitud
}