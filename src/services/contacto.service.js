async function contactoWeb(contacto) {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/contacto`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contacto)
    })
    .then(response => response.json())
}

export {
    contactoWeb
}