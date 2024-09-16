import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://desafio-tecnico-yzpm.onrender.com',
})