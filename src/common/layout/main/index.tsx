import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
    className?: string;
}

export default function MainLayout({ className = "" }: MainLayoutProps) {
    return (
        <div className={`flex flex-col w-full min-h-screen ${className}`}>
            <Outlet />
        </div>
    );
}