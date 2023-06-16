import SocketIO from 'socket.io-client'
import { createContext } from "react"

export const socket = SocketIO(`${process.env.REACT_APP_EIRA_API}`, {
    transport: ['websocket']
})

export const SocketContext = createContext(socket)