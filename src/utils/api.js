import axios from 'axios';
import { setAuthHeader } from './functions';
import 'regenerator-runtime/runtime';
export const get = async (url, params) => {
  setAuthHeader();
  const result = await axios.get(url, {params: params});
  return result.data;
};
export const post = async (url, params) => {
  setAuthHeader();
  const result = await axios.post(url, null, {params: params});
  return result.data;
};
