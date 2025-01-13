import { Story, Fatrows, PresentionChart } from 'iconsax-react';

const icons = {
    widgets: Story,
    statistics: Story,
    data: Fatrows,
    chart: PresentionChart
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
            id: 'chart',
            title: 'Chart',
            type: 'item',
            url: '/dashboard/chart',
            icon: icons.chart,
            superAdmin: false
        },
        {
            id: 'statistics',
            title: "Statistics",
            type: 'item',
            url: '/dashboard/statistics',
            icon: icons.statistics,
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
