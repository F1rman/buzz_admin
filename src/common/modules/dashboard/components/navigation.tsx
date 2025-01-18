import { useState } from "react";
import avatar from "common/assets/images/avatar.png";
import logo from "common/assets/images/logo.png";
import UserNav from "./userNav";
import menuItems from "./menu-items/menu-items";
import NavItem from "./navItem";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
    state: {
        hide: boolean;
    };
    setState: React.Dispatch<React.SetStateAction<{
        hide: boolean;
    }>>;
}

export default function Navigation({ state, setState }: IProps) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const [showSetting, setShowSetting] = useState(false);
    return (
        <div
            className={`${!state.hide ? "w-[280px]" : "w-[90px] show"
                } flex flex-col justify-between h-full min-h-screen relative navigation`}
        >
            <div className={`flex w-full gap-4 pt-[24px] pl-6`}>
                <div className="cursor-pointer flex  flex-none  items-center justify-center">
                    <div className={`relative ${state.hide ? "w-[35px] h-[35px]" : "w-[37px] h-[37px]"}`}>
                        <img
                            src={logo}
                            alt="logo"
                            className="rounded-full"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
            </div>
            <div className={`flex flex-col mt-7 w-full flex-grow h-full`}>
                <h5 className={`text-[#3E4853] uppercase font-semibold text-[11.008px] -tracking-wide pl-6 mb-4 transition-all duration-300 ease-in-out
                   ${state.hide ? "opacity-0 ml-0 w-0 overflow-hidden" : "opacity-100 w-auto"}
                `}>{menuItems.title}</h5>
                <div className="flex flex-col items-center w-full px-[10px] py-1">
                    {menuItems.children.map((item) => {
                        return (
                            <NavItem
                                key={item.id}
                                Icon={item.icon}
                                title={item.title}
                                active={pathname === item.url}
                                navOpen={state.hide}
                                onClick={() => navigate(item.url)}
                            />)
                    })}
                </div>

            </div>
            <div className="flex w-full py-[10px] border-t-2 border-solid border-[#dbe0e5a6] pl-6">
                <div className={`relative ${state.hide ? "w-[40px] h-[40px] cursor-pointer" : "w-[46px] h-[46px]"}`}
                    onClick={() => {
                        if (state.hide) setShowSetting(true);
                    }}
                >
                    <img
                        src={avatar}
                        alt="avatar"
                        className="rounded-full"
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                <UserNav
                    setShowSetting={setShowSetting}
                    showSetting={showSetting}
                />
            </div>
        </div>
    );
}
