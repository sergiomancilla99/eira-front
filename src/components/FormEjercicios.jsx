import { useEffect, useState } from "react"
import ObjectId from "bson-objectid"
import { Form, Button, FloatingLabel } from 'react-bootstrap'

function FormEjercicios(props) {
    const [ejercicio, setEjercicio] = useState("")
    const [video, setVideo] = useState("")
    const [ejercicios, setEjercicios] = useState([])
    const [repeticiones, setRepeticiones] = useState("")

    function agregarEjercicio(ev) {
        setEjercicios(prev =>
            [
                ...prev,
                {
                    id: ObjectId(),
                    ejercicio,
                    video,
                    repeticiones
                }
            ]);
        setEjercicio("");
        setVideo("");
        setRepeticiones("");
    }

    useEffect(() => {
        props.guardarEjercicios(ejercicios)
        // eslint-disable-next-line
    }, [ejercicios])

    return(
        <div className="mt-3">
            <FloatingLabel className="mb-4" controlId="ejercicio" label="Nombre del ejercicio">
                <Form.Control type="text" placeholder="Nombre del ejercicio" name="ejercicio" value={ejercicio} onChange={(ev) => setEjercicio(ev.target.value)}/>
            </FloatingLabel>
            <FloatingLabel className="mb-4" controlId="repeticiones" label="Indicar cantidad de repeticiones">
                <Form.Control type="text" placeholder="Indicar cantidad de repeticiones" name="repeticiones" value={repeticiones} onChange={e => setRepeticiones(e.target.value)}/>
            </FloatingLabel>
            <FloatingLabel className="mb-4" controlId="video" label="URL de video">
                <Form.Control type="text" placeholder="URL de video" name="video" value={video} onChange={e => setVideo(e.target.value)}/>
            </FloatingLabel>
            <div className="d-flex justify-content-center">
                <Button onClick={agregarEjercicio} variant="agregar">
                    Agregar
                </Button>
            </div>
            <p className="fw-bold text-center mt-4">Lista de ejercicios agregados:</p>
            <ul className="lista-agregada-meds">
                {ejercicios.map((ejercicio, i) =>
                <li key={i} className="shadow mb-3">
                    <span className="fw-bold">{ejercicio.ejercicio}</span><br/>
                    <span className="me-5">
                        <span className="fw-bold">Cantidad de repeticiones:</span> {ejercicio.repeticiones}
                    </span>
                    <span className="me-5">
                        <span className="fw-bold">Video:</span> {ejercicio.video}
                    </span>
                </li>
                )}
            </ul>
        </div>
    )
}

export default FormEjercicios