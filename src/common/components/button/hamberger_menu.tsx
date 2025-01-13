import { HambergerMenu } from "iconsax-react";
import useRipple from "use-ripple-hook";
import { MouseEventHandler } from "react";

interface HambergerProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    active: boolean;
}

export default function Hamberger({ onClick, active }: HambergerProps) {
    const [ripple, event] = useRipple({
        duration: 600,
        color: "#c9caccc4",
        cancelAutomatically: false,
        timingFunction: "cubic-bezier(.42,.36,.28,.88)",
    });

    return (
        <button
            ref={ripple}
            onMouseDown={event}
            onClick={onClick}
            className={`w-[44px] h-[44px] flex justify-center items-center rounded-lg ${active ? "bg-[#f3f5f7]" : ""} text-[#5B6B79] hover:bg-[#DBE0E5] transition-all duration-300 ease-in-out`}
        >
            <HambergerMenu />
        </button>
    );
}