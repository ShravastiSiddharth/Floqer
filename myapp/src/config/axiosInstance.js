import axios from 'axios';




const axiosInstance = axios.create({
  baseURL: 'https://floqer.onrender.com/api',
});

export default axiosInstance;
