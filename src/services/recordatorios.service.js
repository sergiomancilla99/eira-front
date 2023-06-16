async function traerPorIdUsuario(idUsuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/recordatorios/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

export {
    traerPorIdUsuario
}