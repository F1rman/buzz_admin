const baseUrl: string = 'https://admin-api.buuz24.app/api/v1';

const urls = {
    // users: {
    //     allUsers: '/users',
    //     byId: (id: string): string => `${urls.users.allUsers}/${id}`
    // },
    // posts: {
    //     allPosts: '/posts',
    //     byId: (id: string): string => `${urls.posts.allPosts}/${id}`
    // },

    auth: {
        login: '/login'
    },
    offers: {
        allOffers: (page: number, size: number): string => `offers?page%5Bnumber%5D=${page}&page%5Bsize%5D=${size}`
    }
}

export {
    baseUrl,
    urls
}
