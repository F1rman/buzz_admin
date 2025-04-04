interface BreadCrumbLink {
    title: string;
    url: string;
}

interface BreadCrumbPage {
    title: string;
    links: BreadCrumbLink[];
}

interface BreadCrumbNode {
    title: string;
    url: string;
    children: Record<string, BreadCrumbPage>;
}

export const breadrumbs_links: Record<string, BreadCrumbNode> = {
    dashboard: {
        title: "Dashboard",
        url: "/dashboard",
        children: {
            "/dashboard/offers": {
                title: "Offers",
                links: [
                    {
                        title: "Offers",
                        url: "/dashboard/offers",
                    }
                ],
            },

            "/dashboard/offers/create": {
                title: "Create offer",
                links: [
                    {
                        title: "Offers",
                        url: "/dashboard/offers",
                    },
                    {
                        title: "Create",
                        url: "/dashboard/offers/create",
                    },
                ],
            },


            "/dashboard/orders/create": {
                title: "Create order",
                links: [
                    {
                        title: "Orders",
                        url: "/dashboard/orders",
                    },
                    {
                        title: "Create",
                        url: "/dashboard/orders/create",
                    },
                ],
            },


            "/dashboard/orders": {
                title: "Orders",
                links: [
                    {
                        title: "Orders",
                        url: "/dashboard/orders",
                    },
                ],
            },

            "/dashboard/messages": {
                title: "Messages",
                links: [
                    {
                        title: "Messages",
                        url: "/dashboard/messages",
                    },
                ],
            },

            "/dashboard/broadcast": {
                title: "Broadcast",
                links: [
                    {
                        title: "Broadcast",
                        url: "/dashboard/broadcast",
                    },
                ],
            },
        },
    },
};
