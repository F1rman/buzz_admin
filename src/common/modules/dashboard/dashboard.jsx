import { useState } from "react";
import Navigation from "./components/navigation";
import Header from "./components/header";
import DashboardLayout from "common/layout/dashboard";

export default function Dashboard() {
    const [state, setState] = useState({
        hide: true,
        active: "chart"
    });
    return (<DashboardLayout>
        <Navigation state={state} setState={setState} />
        <Header
            state={state}
            setState={setState}
        />
        <div className="flex flex-col h-screen w-max overflow-auto pt-[45px]">
        </div>
    </DashboardLayout>);
}