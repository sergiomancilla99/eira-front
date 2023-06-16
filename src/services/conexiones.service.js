async function traerSeguidores (idUsuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/conexiones/${idUsuario}`, {
        headers: {
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

async function seguir(seguir) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/seguir`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'autenticacion': localStorage.getItem('token')
        },
        body: JSON.stringify(seguir)
    })
    .then(response => response.json())
}

async function traerTodos() {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/seguidores`, {
        headers:{
            'autenticacion': localStorage.getItem('token')
        }
    })
    .then(response => response.json())
}

export {
    traerSeguidores,
    seguir,
    traerTodos
}