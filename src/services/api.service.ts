import axios from "axios";
import { urls } from "../constants/urls";
import { IAuthModel } from "models/IAuthModel";
import { IFilter, IOfferItem, IOffersResponse, IPrice } from "models/IOfferModel";
import { axiosService } from "./axios.service";
import { IOrder, IOrderResponse } from "models/IOrder";
import { IEventFilters } from "models/IFiltersModel";

const authApiService = {
    login: async (email: string, password: string): Promise<IAuthModel> => {
        const response = await axiosService.post<IAuthModel>(urls.auth.login, { email, password });
        return response.data;
    }
}

const mainApiService = {
    getAllRegions: async (): Promise<IFilter[]> => {
        const { data } = await axiosService.get<IFilter[]>(urls.regions.list);
        return data;
    },

    getAllCategories: async (): Promise<IFilter[]> => {
        const { data } = await axiosService.get<IFilter[]>(urls.categories.list);
        return data;
    },

    getAllBrands: async (): Promise<IFilter[]> => {
        const { data } = await axiosService.get<IFilter[]>(urls.brands.list);
        return data;
    },

    getAllProjects: async (): Promise<IFilter[]> => {
        const { data } = await axiosService.get<IFilter[]>(urls.projects.list);
        return data;
    },

    getAllCurrencies: async (): Promise<IFilter[]> => {
        const { data } = await axiosService.get<IFilter[]>(urls.currency_list.list);
        return data;
    },

    getPricesByCategoryId: async (categoryId: number): Promise<IPrice> => {
        const { data } = await axiosService.get<IPrice>(urls.prices.byCategoryId(categoryId));
        return data;
    },

    uploadFile: async (file: File, access_type = 'public') => {
        const formData = new FormData();

        formData.append("file", file);
        formData.append("access_type", access_type);

        try {
            const res = await axios.post('https://files.buuz24.app/api/files', formData, {
                headers: {
                    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNWM3MTQxYTQ0ZjIxOGE3NzYzNzZiOWQ0YjNmMjI3NDdhYzkyZmIxMmRhNDFlZGYyZTMzYjNlZDMwOWU4YjZhMzQ2N2M1MDFiZWI0YWM4YTciLCJpYXQiOjE2OTE4MTA1NzAuOTUwNjg3LCJuYmYiOjE2OTE4MTA1NzAuOTUwNjkzLCJleHAiOjE3MjM0MzI5NzAuOTQyNjgxLCJzdWIiOiI0NCIsInNjb3BlcyI6W119.OVc5FbY2ZfxS_MAYncoawRXYgjQM9wEPaTSkWlX5IFKacPg5xJ068JlpyhfDhBc3QCVlI_WD08gAKTec7KrR-goS4nnqybrwtVjvaznWGdIcG-numZw5J56CqI_nvtvCfkApmiJm2JPTFi6JwshVgKQSaVf8pe4LuY6Pe4MMnekd_TQKmkYg_h6fzTbcqucG5wQrDql8v24POmTMRPIR-4bbmP5q30g1nmCOcWIYjf_xiWUY7WonyRmPNHJ4G1Z8VoS_WMk-l5DoCY6zCo0B2TMBtzzoV0vhzxgx5-a_dWn4x-8SKOLOXwJY2Ngv-xl8djYgZnu11MG3OYvuch4ICUIbKXKYEhVoyqNhYqzDMXeoKGpMFY01TGe8hFgwO-kuj-Gs9AtBaRgwq7204HUORFnuxutLce0s88kmZHrRQJQU9F8MKvLfYNaYkKB81YOD88s9ncRN-jBA8bYNTvW2giAPnA30aGA7w_nNcUL2-vNYpWZ1JomPc2UsVGtPCe5ipyLYXvE93EzqCCAEDnQuS4gwz4G4WMd_fILI_BorVotHx_rYQV7_dK4zMMFhWUakZs7ZR5BH8zLbh_nOYXz9_R17Zfb5wVZuNt-Ql3Qcw-nMHcU2MKuQwlr7CyVqehlht4zPX5WF8DxqcNxecQm7W0clspc31i84VuoP-sXoH1o`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            return res.data;
        } catch (error) {
            console.error("Помилка при завантаженні файлу:", error);
            throw error;
        }
    },

    sendMessageToAll: async (message: object) => {
        await axiosService.post(urls.broadcast.sendMessage, message)
    },

    getAllEvents: async (filters: IEventFilters = {}) => {
        const map: Record<string, any> = {
            'filter[is_event]': filters.is_event,
            'filter[is_error]': filters.is_error,
            'filter[is_message]': filters.is_message,
            'filter[is_timeout]': filters.is_timeout,
            'filter[is_other]': filters.is_other,
            'page[number]': filters.pageNumber,
            'page[size]': filters.pageSize,
        };

        const params = Object.fromEntries(
            Object.entries(map).filter(([, value]) => value !== undefined)
        );

        const { data } = await axiosService.get(urls.events.list, { params });
        return data;
    }
}

const offersApiService = {
    getAllOffers: async (page: number, size: number): Promise<IOffersResponse> => {
        const { data } = await axiosService.get<IOffersResponse>(urls.offers.allOffers(page, size))
        return data;
    },

    createOffer: async (offer: FormData): Promise<IOfferItem> => {
        const { data } = await axiosService.post<IOfferItem>(urls.offers.create, offer, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return data;
    }
}

const ordersApiService = {
    getAllOrders: async (page: number, size: number): Promise<IOrderResponse> => {
        const { data } = await axiosService.get<IOrderResponse>(urls.orders.allOrders(page, size));
        return data;
    },

    createOrder: async (order: FormData): Promise<IOrder> => {
        const { data } = await axiosService.post<IOrder>(urls.orders.create, order, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return data;
    }

}


export {
    offersApiService,
    authApiService,
    ordersApiService,
    mainApiService
}
