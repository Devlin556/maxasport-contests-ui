import axios from 'axios'
import { CONFIG } from '../CONFIG';

interface MakeRequestConfig {
  path: string;
  method: 'GET' | 'POST';
  body?: any;
  secret?: string;
}

export const makeRequest = (config: MakeRequestConfig) => {
 const { path, method, body, secret } = config;

 const requestConfig: any = { method, url: `${CONFIG.baseUrl}${path}`, headers: {} }

  if (body) {
    requestConfig.data = body;
    requestConfig.headers['Content-Type'] = 'application/json'
  }

  if (secret) {
    requestConfig.headers.token = secret;
  }

 return axios.request(requestConfig)
}