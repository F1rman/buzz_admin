import React, { ReactNode, MouseEventHandler } from "react";
import useRipple from "use-ripple-hook";

interface ButtonProps {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    className?: string;
    variant?: "auth" | "default" | "signup";
    disabled?: boolean;
    disabledRipple?: boolean;
}

export default function Button({
    children,
    onClick,
    type = "button",
    className = "",
    variant = "default",
    disabled = false,
    disabledRipple = false,
}: ButtonProps) {
    const rippleConfig = {
        disabled: disabledRipple,
        duration: 450,
        cancelAutomatically: false,
        timingFunction: "cubic-bezier(.42,.36,.28,.88)",
    };

    const getRippleColor = (variant: string) => {
        switch (variant) {
            case "auth":
                return "#b9d7d430";
            case "default":
                return "#f3ecec24";
            case "signup":
                return "#b9d7d430";
            default:
                return "#b9d7d430";
        }
    };

    const [ripple, event] = useRipple({
        ...rippleConfig,
        color: getRippleColor(variant),
    });

    const buttonStyles: { [key: string]: string } = {
        auth: "bg-[#4680FF] auth_btn rounded-[8px] flex items-center justify-center w-full pl-6 pr-4 h-[42px]",
        signup: "flex justify-center items-center bg-[#04AA00] border-[1px] border-solid border-[#0000001A] rounded-[24px] h-[42px] w-[114px]",
        default: "flex justify-center items-center bg-transparent rounded-[8px] w-max h-max hover:bg-[#DBE0E5] transition-all duration-300 ease-in-out p-2",
    };

    return (
        <button
            type={type}
            ref={ripple}
            onMouseDown={event}
            className={`${buttonStyles[variant] || buttonStyles.default} ${disabled && "disabled"} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
