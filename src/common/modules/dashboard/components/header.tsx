import React from "react";
import Hamberger from "common/components/button/hamberger_menu";
import Input from "common/components/inputs/input";
import avatar from "common/assets/images/avatar.png";
import FullScreen from "./fullScreen";
import { useAppDispatch, useAppSelector } from "redux/store";
import { navigationrActions } from "redux/slices/navigationSlice";


interface state {
    hide: boolean;
    active: string;
}
interface IProps {
    state: state;
    setState: React.Dispatch<React.SetStateAction<state>>;
}

const Header: React.FC<IProps> = ({ state, setState }) => {
    //test
    const dispatch = useAppDispatch();
    const { darkMode } = useAppSelector((state) => state.navigation);

    console.log(darkMode,'!!!!!!');
    //test
    return (
        <header className={`flex justify-between header ${!state.hide ? "show" : "hide"}`}>
            <div className="flex items-center">
                <Hamberger
                    onClick={() => setState((prev) => ({ ...prev, hide: !prev.hide }))}
                    active={!state.hide}
                />
                <Input
                    name="search"
                    search={true}
                    wrapperClassName="!w-full max-w-[230px] ml-6"
                    className="!bg-transparent !h-[44px]"
                    placeholder="Ctrl + K"
                />
            </div>
            <div className="flex items-center">
                <FullScreen />
                <img
                    src={avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full ml-3"
                    //test
                    onClick={() => dispatch(navigationrActions.setDarkMode(!darkMode))}
                    //test
                />
            </div>
        </header>
    );
};

export default Header;