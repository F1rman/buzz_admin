import { Story, Fatrows, PresentionChart, HomeTrendUp, Bill, Messages2, Airplane } from 'iconsax-react';

const icons = {
    widgets: Story,
    statistics: Story,
    data: Fatrows,
    chart: PresentionChart,
    dashboard: HomeTrendUp,
    offers: Bill,
    messages: Messages2,
    mailing: Airplane
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
            id: 'messages',
            title: 'Messages',
            type: 'item',
            url: '/dashboard/messages',
            icon: icons.messages,
            superAdmin: false
        },
        {
            id: 'broadcast',
            title: "Broadcast",
            type: 'item',
            url: '/dashboard/broadcast',
            icon: icons.mailing,
            superAdmin: false
        }
    ]
}

export default menuItems;
