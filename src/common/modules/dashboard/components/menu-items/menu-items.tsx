import { Story, Fatrows, PresentionChart, HomeTrendUp, Bill } from 'iconsax-react';

const icons = {
    widgets: Story,
    statistics: Story,
    data: Fatrows,
    chart: PresentionChart,
    dashboard: HomeTrendUp,
    offers: Bill
};

interface MenuItem {
    id: string;
    title: string;
    type: 'item';
    url: string;
    icon: React.ElementType;
    superAdmin: boolean;
}

interface MenuItems {
    id: string;
    title: string;
    children: MenuItem[];
}

const menuItems: MenuItems = {
    id: 'dashboard',
    title: 'Dashboard',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.dashboard,
            superAdmin: false
        },
        {
            id: 'offers',
            title: 'Offers',
            type: 'item',
            url: '/dashboard/offers',
            icon: icons.offers,
            superAdmin: false
        },
        {
            id: 'orders',
            title: 'Orders',
            type: 'item',
            url: '/dashboard/orders',
            icon: icons.statistics,
            superAdmin: false
        },
        {
            id: 'statistics',
            title: "Statistics",
            type: 'item',
            url: '/dashboard/statistics',
            icon: icons.chart,
            superAdmin: false
        },
        {
            id: 'data',
            title: 'Data',
            type: 'item',
            url: '/dashboard/data',
            icon: icons.data,
            superAdmin: false
        }]
}

export default menuItems;
