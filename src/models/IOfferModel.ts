export interface IOfferItem {
    id: number;
    name: string;
    alias: string;
    address: string;
    geo_lat: number;
    geo_long: number;
    code: string;
    content: string;
    status: string;
    category: string;
    brand: string;
    region: string;
    photo: {
        original: string | null;
        preview: string | null;
    } | null;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
}

export interface IOffersResponse {
    items: {
        data: IOfferItem[];
        last_page: number;
        total: number;
    };
    header: any;
}

export interface IFilter {
        value: number;
        text: string;
}


export interface IPriceTemplate {
    hours_from: number;
}

export interface IPrice {
    id: number;
    min_hour_price: number;
    currency_id: number;
    price_templates: IPriceTemplate[];
    price_templates_default: IPriceTemplate[];
}