import ListItemIcon from '@mui/material/ListItemIcon';
import useRipple from 'use-ripple-hook';

interface IProps {
    Icon: React.ElementType;
    title: string;
    active?: boolean;
    navOpen?: boolean;
    onClick?: () => void;
}

export default function NavItem({ Icon, title, active = true, navOpen = false, onClick }: IProps) {
    const [ripple, event] = useRipple({
        duration: 600,
        color: "#4680ff12",
        cancelAutomatically: false,
        timingFunction: "cubic-bezier(.42,.36,.28,.88)",
    });

    return (
        <div
            className={`nav-item ${active && "active"} ${navOpen && "!max-w-max"}`}
            ref={ripple}
            onMouseDown={event}
            onClick={onClick}
        >
            <div className={`content flex w-full items-center justify-start overflow-hidden my-[3px] ${navOpen && "!py-0 !px-0 min-w-[46px] min-h-[46px] justify-center"}`}>
                <ListItemIcon
                    sx={{
                        minWidth: !navOpen ? 38 : 22,
                        color: active ? 'primary.main' : 'secondary.200',
                        ...(!navOpen && {
                            borderRadius: 1,
                            alignItems: !navOpen ? 'center' : 'start',
                            justifyContent: 'start',
                            '&:hover': { bgcolor: 'secondary.200' }
                        }),
                        ...(!navOpen &&
                            active && {
                            bgcolor: 'primary.lighter',
                            '&:hover': {
                                bgcolor: 'primary.lighter'
                            }
                        })
                    }}
                >
                    <Icon
                        variant="Bulk"
                        size={!navOpen ? 20 : 22}
                    />
                </ListItemIcon>
                <span
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${!navOpen ? "opacity-100 max-w-max" : "opacity-0 max-w-0"
                        }`}
                >
                    {title}
                </span>
            </div>
        </div>
    );
}