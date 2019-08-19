import axios from 'axios';

import getEnvVars from '../environment';


const { apiUrl } = getEnvVars();
const api = axios.create({
  baseURL: apiUrl
});

// api.interceptors.request.use(config => {
//   const token = window.localStorage.getItem("jwt");
//   if (token) {
//     config.headers = Object.assign({
//       Authorization: `Token ${token}`
//     }, config.headers)
//   }

//   return config;
// });

export default api;