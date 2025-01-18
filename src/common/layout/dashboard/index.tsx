import Header from "common/modules/dashboard/components/header";
import Navigation from "common/modules/dashboard/components/navigation";
import { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import BreadCrumbs from "../breadcrumbs";

interface State {
    hide: boolean;
}

export default function DashboardLayout() {
    const [state, setState] = useState<State>({
        hide: true
    });
    const { pathname } = useLocation();
    return (
        <div className="flex w-full h-full gap-3 min-h-screen dashboard bg-[#f8f9fa]">
            <Navigation state={state} setState={setState} />
            <div className={`flex flex-col page ${!state.hide ? "show" : "hide"}`}>
                <Header state={state} setState={setState} />
                <div className={`content flex flex-col h-screen w-full overflow-auto pt-[90px] ${!state.hide ? "show" : "hide"} pr-4`}>
                    <BreadCrumbs
                        defaultPage="dashboard"
                        className="w-full px-4 py-3"
                        currentPage={pathname}
                    />
                    <Outlet />
                </div>
            </div>
        </div>
    );
}