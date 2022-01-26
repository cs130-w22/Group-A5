import axios from 'axios';
import { setAuthHeader } from './functions';
//import 'regenerator-runtime/runtime';
export const get = (url, params) => {
  setAuthHeader();
  const result = axios.get(url, params);
  return result.data;
};
export const post = (url, params) => {
  setAuthHeader();
  const result = axios.post(url, params);
  return result.data;
};
