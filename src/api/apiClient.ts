import axios, {AxiosInstance} from 'axios';
import {ENV} from '../config/env';

/**
 * Crea una instancia única de Axios configurada con la base URL y parámetros comunes.
 * Principio de Responsabilidad Única (SRP): este módulo solo se encarga de configurar Axios.
 */
const createApiClient = (): AxiosInstance => {
  return axios.create({
    baseURL: ENV.apiBaseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      apikey: ENV.cmfApiKey,
      formato: 'json',
    },
  });
};

/**
 * Instancia de Axios que debe ser utilizada por los repositorios o servicios.
 * Permite centralizar la configuración y facilita mantener e interceptar peticiones si se requiere.
 */
export const apiClient = createApiClient();
