async function traerPorIdUsuario(idUsuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/progresos/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function traerPorIdPacienteYIdProfesional(idUsuario, idProfesional) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/progresos/${idUsuario}/${idProfesional}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function confirmarActividad(paciente, profesional, frecuenciaHoraria, actividad, idTratamiento, diagnostico) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/progresos/confirmar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({paciente, profesional, frecuenciaHoraria, actividad, idTratamiento, diagnostico})
    })
    .then(response => response.json())
}

async function negarActividad(paciente, profesional, actividad, idTratamiento, diagnostico) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/progresos/confirmar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({paciente, profesional, actividad, idTratamiento, diagnostico})
    })
    .then(response => response.json())
}

async function editarHora(idProgreso, nuevaHora) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/progresos/editar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify({idProgreso, nuevaHora})
    })
    .then(response => response.json())
}

export {
    traerPorIdUsuario,
    confirmarActividad,
    traerPorIdPacienteYIdProfesional,
    editarHora,
    negarActividad
}