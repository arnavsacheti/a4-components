import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

export const register = (formData: any) => API.post('/auth/register', formData);
export const login = (formData: any) => API.post('/auth/login', formData);

// Add more API calls related to TODOs as you expand the app
