async function traer() {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/profesionales`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())

}

async function traerPorId(idProfesional) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/profesionales/${idProfesional}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())

}

async function traerPacientes(idProfesional) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/profesionales/${idProfesional}/pacientes`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())
}


async function editar (idUsuario, usuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/profesionales/${idUsuario}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
}

async function eliminar(idUsuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/profesionales/${idUsuario}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => {
        window.location.replace('/')
        return response.json()
    })
}

async function eliminarPaciente(idProfesional, idPaciente) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/profesionales/${idProfesional}/pacientes/${idPaciente}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => {
        return response.json()
    })
}

async function verificar(idUsuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/profesionales/verificacion/${idUsuario}`, {
        method: 'PATCH',
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())
}

async function traerPedidosRecetas(id) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/recetas/${id}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
    })
    .then(response => response.json())

}

async function enviarReceta(receta) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/recetas`, {
        method: 'POST',
        headers: {
            'autenticacion': localStorage.getItem('token')
        },
        body: receta
    })
    .then(response => response.json())
}

async function guardarUrlFile(urlFile, posicion, idMedico, idPaciente) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/recetas/urlFile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token'),
        },
        body: JSON.stringify({urlFile, posicion, idMedico, idPaciente})
    })
    .then(response => response.json())
}

export {
    traer,
    traerPorId,
    editar,
    eliminar,
    traerPacientes,
    eliminarPaciente,
    verificar,
    traerPedidosRecetas,
    enviarReceta,
    guardarUrlFile
}