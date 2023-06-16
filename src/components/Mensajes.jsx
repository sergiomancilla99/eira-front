import React from 'react'
import { DateTime } from 'luxon'

function Mensajes({mensaje, own}) {
  return (
    <div className={own ? "mensaje-own wrap shadow my-3 p-3 w-75 ms-auto rounded" : "wrap mensaje-other shadow my-3 p-3 w-75 rounded"}>
        <p className="chat-fondo mb-2">{mensaje.mensaje}</p>
        {<small id="fecha">{ DateTime.fromISO(mensaje.created_at).toFormat('ff') === "Invalid DateTime" ? DateTime.fromMillis(mensaje.created_at).toFormat('ff') : DateTime.fromISO(mensaje.created_at).toFormat('ff')}</small>}
    </div>
  )
}

export default Mensajes