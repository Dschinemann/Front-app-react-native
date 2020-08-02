import { API_SOCKET } from '../../.env.json'
import io  from 'socket.io-client'
const socket = io(API_SOCKET)
socket.connect()
export default socket