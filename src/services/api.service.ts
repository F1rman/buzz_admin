import { AxiosResponse } from "axios";
import { urls } from "../constants/urls";
import { IAuthModel } from "models/IAuthModel";
import { IOfferItem, IOffersResponse } from "models/IOfferModel";
import { axiosService } from "./axios.service";

const authApiService = {
    login: async (email: string, password: string): Promise<IAuthModel> => {
        const response = await axiosService.post<IAuthModel>(urls.auth.login, { email, password });
        return response.data;
    }
}

const offersApiService = {
    getAllOffers: async (page: number, size: number): Promise<IOfferItem[]> => {
        const { data } = await axiosService.get<IOffersResponse>(urls.offers.allOffers(page, size))
        return data.items.data
    }
}


export {
    offersApiService,
    authApiService
}
