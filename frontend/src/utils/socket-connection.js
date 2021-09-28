import io from 'socket.io-client';
import { config } from './config';

export const socket = io.connect(config.REACT_APP_BACKEND_URL, {
  withCredentials: true,
  extraHeaders: {
    'board-game': 'atp-vital',
  },
});
