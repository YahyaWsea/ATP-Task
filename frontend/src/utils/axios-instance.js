import axios from 'axios';
import { config } from './config';

// https://de-reports.esportal.live
const instance = axios.create({
  baseURL: config.REACT_APP_BACKEND_URL,
  withCredentials: true,
});

export default instance;