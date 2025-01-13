import ListItemIcon from '@mui/material/ListItemIcon';
import useRipple from 'use-ripple-hook';
import { ReactNode, MouseEventHandler } from 'react';

interface IconButtonProps {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLDivElement>;
}

export default function IconButton({ children, onClick }: IconButtonProps) {
    const [ripple, event] = useRipple({
        duration: 600,
        color: "#f3ecec24",
        cancelAutomatically: false,
        timingFunction: "cubic-bezier(.42,.36,.28,.88)",
    });

    return (
        <div
            className="transition-all duration-300 ease-in-out hover:bg-[#DBE0E5] cursor-pointer p-[10px] rounded-lg"
            ref={ripple}
            onMouseDown={event}
            onClick={onClick}
        >
            <div className="flex w-full items-center justify-start">
                <ListItemIcon
                    sx={{
                        minWidth: 24,
                        color: 'secondary.200',
                    }}
                >
                    {children}
                </ListItemIcon>
            </div>
        </div>
    );
}