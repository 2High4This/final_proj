import axios from 'axios';
const baseUrl = 'http://localhost:5000';

export default axios.create({
    baseURL: baseUrl
});

export const axiosWithJWT = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});