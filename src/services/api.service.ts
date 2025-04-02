import { AxiosResponse } from "axios";
import { urls } from "../constants/urls";
import { IAuthModel } from "models/IAuthModel";
import { IFilter, IOfferDataForm, IOfferItem, IOffersResponse, IPrice } from "models/IOfferModel";
import { axiosService } from "./axios.service";
import { IOrder, IOrderResponse } from "models/IOrder";

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
