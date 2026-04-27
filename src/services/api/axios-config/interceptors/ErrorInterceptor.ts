import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
    if (error.message === 'Network Error') {
        return Promise.reject(new Error('Erro de conexão.'));
    }

    if (error.response?.status === 401) {
        return Promise.reject(new Error('Erro de autenticação na TMDB. Confira o valor de VITE_API_KEY.'));
    }

    if (error.response?.status === 404) {
        return Promise.reject(new Error('Filme não encontrado.'));
    }

    return Promise.reject(error);
}
