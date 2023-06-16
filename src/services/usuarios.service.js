async function olvideContrasena(email) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/usuarios/olvideContrasena`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
    })
    .then(response => response.json())
}

async function recuperarContrasena(token, email, password) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/usuarios/${token}/${email}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(password)
    })
    .then(response => response.json())
}

async function agregarProfesional(idProfesional, paciente) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/usuarios/profesional`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({idProfesional, paciente})
    })
    .then(response => response.json())
}

async function cambiarConstrasena(id, tipo, email, password) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/usuarios/${id}/cambiarConstrasena`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({tipo, email, password})
    })
    .then(response => response.json())
}

export {
    olvideContrasena,
    recuperarContrasena,
    agregarProfesional,
    cambiarConstrasena
}