
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const getProducts = () => API.get('/products');
export const saveInvoice = (data: any) => API.post('/invoices', data);
export const addDefaultProducts = () => API.post('/products/default');