async function traer(nombre) {
    return fetch(`https://cima.aemps.es/cima/rest/medicamentos?nombre=${nombre}`)
    .then(response => response.json())
}

export {
    traer
}