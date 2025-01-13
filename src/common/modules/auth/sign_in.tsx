import { useState } from "react";
import ForgotPassword from "./components/forgot_password";
import Login from "./components/login";
import ResetPassword from "./components/reset_password";

interface State {
    email: string;
    password: string;
    error: boolean;
    activeTab: number;
    remember: boolean;
}

export default function SignIn() {
    const [state, setState] = useState<State>({
        email: "",
        password: "",
        error: false,
        activeTab: 0,
        remember: false,
    });


    return (
        <div className="flex justify-center items-center h-full px-3">
            <div className="graffiti">
                <div className="graffiti1"></div>
                <div className="graffiti2"></div>
            </div>
            <div className="form-container">
                <Login state={state} setState={setState} active={state.activeTab === 0} />
                <ForgotPassword active={state.activeTab === 1} state={state} setState={setState} />
                <ResetPassword active={state.activeTab === 2} setState={setState} />
            </div>
        </div>
    );
}