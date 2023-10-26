async function traer() {
    return fetch(`${process.env.REACT_APP_EIRA_API}/api/prepagas`)
    .then(response => response.json())
}

export {
    traer
}