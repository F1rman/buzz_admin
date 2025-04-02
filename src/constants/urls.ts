const baseUrl: string = 'https://admin-api.buuz24.app/api/v1';

const urls = {
    auth: {
        login: '/login'
    },

    offers: {
        allOffers: (page: number, size: number): string => `offers?page%5Bnumber%5D=${page}&page%5Bsize%5D=${size}`,
        create: 'offers'
    },

    orders: {
        allOrders: (page: number, size: number): string => `orders?page%5Bnumber%5D=${page}&page%5Bsize%5D=${size}`,
        create: 'orders'
    },

    regions: {
        list: 'regions/list'
    },

    categories: {
        list: 'categories/list'
    },

    brands: {
        list: 'brands/list'
    },

    projects: {
        list: 'projects/list'
    },

    currency_list: {
        list: 'currencies/list'
    },

    prices: {
        byCategoryId: (categoryId: number): string => `categories/${categoryId}/edit_prices`
    }
}

export {
    baseUrl,
    urls
}
