async function traerPorIdUsuario(idUsuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/recordatorios/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function traerHistorialPorIdUsuario(idUsuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/historial-notificaciones/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function editarHistorial({idUsuario, notificacion}) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/historial-notificaciones`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({idUsuario, notificacion})
    })
    .then(response => response.json())
}


export {
    traerPorIdUsuario,
    traerHistorialPorIdUsuario,
    editarHistorial
}