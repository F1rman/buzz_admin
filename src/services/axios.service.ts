import axios from "axios";
import { baseUrl } from "constants/urls";
import { authService } from "./auth.service";

const axiosService = axios.create({
    baseURL: baseUrl,
    headers: { "Content-Type": "application/json" },
});

axiosService.interceptors.request.use((config) => {
    const token = authService.getAccessToken();

    if (token) config.headers.set('Authorization', 'Bearer ' + token);

    return config;
});

axiosService.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log(error);
        const page = window.location.pathname;
        if (error.response?.status === 401 && page !== "/auth/login") {
            try {
                authService.deleteToken();
                window.location.href = `/auth/login?expired=true`;
            } catch (redirectError) {
                return Promise.reject(redirectError);
            }
        }

        return Promise.reject(error);
    }
);

export { axiosService };