async function login(email, password) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body:JSON.stringify({email, password})
    })
    .then(response => {
        if(response.status === 200) {
            return response.json()
        }
        throw new Error('Error de autenticación')
    })
}

async function registro (usuario) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
}

async function actualizarToken(email) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/actualizarToken`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email})
    })
    .then(response => {
        if(response.status === 200) {
            return response.json()
        }
        throw new Error('Error de actualización de token')
    })
}

export {
    registro,
    login,
    actualizarToken
}