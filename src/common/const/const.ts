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

            "/dashboard/orders": {
                title: "Orders",
                links: [
                    {
                        title: "Orders",
                        url: "/dashboard/orders",
                    },
                ],
            },

            "/dashboard/data": {
                title: "Data",
                links: [
                    {
                        title: "Data",
                        url: "/dashboard/data",
                    },
                ],
            },

            "/dashboard/statistics": {
                title: "Statistics",
                links: [
                    {
                        title: "Statistics",
                        url: "/dashboard/statistics",
                    },
                ],
            },
        },
    },
};
