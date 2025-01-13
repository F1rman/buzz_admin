import Header from "common/modules/dashboard/components/header";
import Navigation from "common/modules/dashboard/components/navigation";
import { useState } from "react";
import { Outlet } from "react-router-dom";

interface State {
    hide: boolean;
    active: string;
}

export default function DashboardLayout() {
    const [state, setState] = useState<State>({
        hide: true,
        active: "chart"
    });

    return (
        <div className="flex w-full h-full gap-3 min-h-screen dashboard bg-[#f8f9fa]">
            <Navigation state={state} setState={setState} />
            <div className={`flex flex-col page ${!state.hide ? "show" : "hide"}`}>
                <Header state={state} setState={setState} />
                <div className={`content flex flex-col h-screen w-full overflow-auto pt-[90px] ${!state.hide ? "show" : "hide"} pr-4`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}