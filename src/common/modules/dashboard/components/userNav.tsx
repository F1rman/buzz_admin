import OutsideModal from "common/components/modals/outside_modal";
import useRipple from "use-ripple-hook";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { authService } from "services/auth.service";

interface IProps {
    showSetting: boolean;
    setShowSetting: Dispatch<SetStateAction<boolean>>;
}

const useCreateRipple = (color = "#b9d7d430") => {
    return useRipple({
        duration: 600,
        color: color,
        cancelAutomatically: false,
        timingFunction: "cubic-bezier(.42,.36,.28,.88)",
    });
};

export default function UserNav({ showSetting, setShowSetting }: IProps) {
    const navigate = useNavigate();
    const { setLogined, setUserData } = useAuth();

    const [ripple1, event1] = useCreateRipple();
    const [ripple2, event2] = useCreateRipple();
    const [ripple3, event3] = useCreateRipple();

    const handleLogout = async () => {
        localStorage.removeItem("user");
        authService.deleteToken();

        setShowSetting(false);
        setLogined(false);
        setUserData(null);

        navigate("/auth/login");
    };

    return (
        <OutsideModal
            openModal={showSetting}
            setOpenModal={setShowSetting}
            contentClassName="!bottom-[120px] left-[60px]"
        >
            <div className="bg-white user_nav flex flex-col py-2">
                <span
                    className="px-4 py-[6px] cursor-pointer transition-all duration-300 hover:bg-[#0000000a] text-[14px] text-[#1D2630]"
                    ref={ripple1}
                    onMouseDown={event1}
                    onClick={handleLogout}
                >
                    Logout
                </span>
                <span
                    className="px-4 py-[6px] cursor-pointer transition-all duration-300 hover:bg-[#0000000a] text-[14px] text-[#1D2630]"
                    ref={ripple2}
                    onMouseDown={event2}
                >
                    Profile
                </span>
                <span
                    className="px-4 py-[6px] cursor-pointer transition-all duration-300 hover:bg-[#0000000a] text-[14px] text-[#1D2630]"
                    ref={ripple3}
                    onMouseDown={event3}
                >
                    My account
                </span>
            </div>
        </OutsideModal>
    );
}
