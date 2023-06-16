async function crear(tratamiento) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify(tratamiento)
    })
    .then(response => response.json())
}

async function agregarMedicamento(id, tratamiento, tipo) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos/${id}/medicamento-ejercicio/agregar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({tratamiento, tipo})
    })
    .then(response => response.json())
}


async function editarMedicamento(id, tratamiento, tipo) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({tratamiento, tipo})
    })
    .then(response => response.json())
}

async function eliminarMedicamento(id, idObj, tipo) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos/medicamento-ejercicio/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({idObj, tipo})
    })
    .then(response => response.json())
}

async function agregarComida(id, comida) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos/${id}/comida/agregar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({comida})
    })
    .then(response => response.json())
}

async function editarComida(id, comidaAntigua, comidaNueva) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos/comida/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({comidaAntigua, comidaNueva})
    })
    .then(response => response.json())
}

async function eliminarComida(id, comida) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos/comida/eliminar/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({comida})
    })
    .then(response => response.json())
}

async function traerPorIdPaciente(idPaciente) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos/paciente/${idPaciente}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function traerPorIdProfesional(idPaciente, idProfesional) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos/profesional/${idProfesional}/paciente/${idPaciente}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function traerPorId(id) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos/${id}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function traerPorIdTratamiento(id) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos-traer/${id}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function eliminar(id) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/tratamientos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

export {
    crear,
    traerPorIdPaciente,
    editarMedicamento,
    traerPorId,
    editarComida,
    eliminarComida,
    eliminarMedicamento,
    eliminar,
    traerPorIdProfesional,
    agregarMedicamento,
    agregarComida,
    traerPorIdTratamiento
}