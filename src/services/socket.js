import { API_SOCKET, API_SOCKET_LOCAL } from '../../.env.json';

import io  from 'socket.io-client';

socket = io(API_SOCKET)
socket.connect()

export default socket;