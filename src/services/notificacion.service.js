async function guardarNotificacion({tokenFB, finalizacion}) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/notificacionFB`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({tokenFB, finalizacion})
    })
    .then(response => response.json())
}

export {
    guardarNotificacion
}