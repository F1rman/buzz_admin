export interface IOrder {
    id: number;
    address: string;
    price: number | null;
    description: string;
    date_from: string;
    date_to: string;
    category: string;
    project: string;
    client: string;
    region: string;
    currency: string;
    status: string;
    photo: {
        original: string | null;
        preview: string | null;
    } | null;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
    last_page: number;
}

export interface IOrderResponse {
    items: {
        data: IOrder[];
        last_page: number;
        total: number;
    };
    headers: {
        value: string;
        text: string;
    }[];
}