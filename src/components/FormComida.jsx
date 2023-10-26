import { useEffect, useState } from "react"
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import { toast } from "react-hot-toast"

function FormComida(props) {
    const [comida, setComida] = useState("")
    const [comidas, setComidas] = useState([])

    function agregarComida(ev) {
        if(!comida.trim() || comida.length === 0) {
            console.log("NO HAY COMIDA")
            toast.error("El campo no debe estar vacio")
        } else {
            console.log(comida.trim(),"HAY COMIDA")
            setComidas(prev => [...prev, comida])
            setComida("")
        }
    }

    useEffect(() => {
        props.guardarComidas(comidas)
        // eslint-disable-next-line
    }, [comidas])

    return (
        <div>
            <FloatingLabel className="my-3" controlId="comida" label="Nombre de la comida a restringir">
                <Form.Control type="text" placeholder="Nombre comida a restringir" name="comida" value={comida} onChange={(ev) => setComida(ev.target.value)}/>
            </FloatingLabel>
            <div className="d-flex justify-content-center">
                <Button onClick={agregarComida} variant="agregar">
                    Agregar
                </Button>
            </div>

            <p className="fw-bold text-center mt-4">Lista de comidas restringidas:</p>
            <ul className="lista-agregada d-flex justify-content-start">
                {comidas.map((comida, i) =>
                <li key={i} className="shadow mx-2">
                    {comida}
                </li>
                )}
            </ul>
        </div>
    )
}

export default FormComida