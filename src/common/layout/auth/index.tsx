import React from 'react';
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps {
    className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ className = "" }) => {
    return (
        <div className={`login flex flex-col w-full min-h-screen ${className}`}>
            <Outlet />
        </div>
    );
};

export { AuthLayout };