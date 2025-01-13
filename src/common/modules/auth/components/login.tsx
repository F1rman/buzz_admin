import Button from "common/components/button/button";
import CheckboxTile from "common/components/filters/checkbox_tile";
import Input from "common/components/inputs/input";
import { authValidate } from "common/functions/utils";
import Form from "common/layout/auth/form";
import useAuth from "hooks/useAuth";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApiService } from "services/api.service";

interface StateType {
    email: string;
    password: string;
    remember: boolean;
    activeTab: number;
    error: boolean;
}

interface ErrorState {
    email: string | null;
    password: string | null;
    auth: string | null;
}

interface IProps {
    active: boolean;
    state: StateType;
    setState: React.Dispatch<React.SetStateAction<StateType>>;
}

export default function Login({ active, state, setState }: IProps) {
    const { setLogined } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState<ErrorState>({
        email: null,
        password: null,
        auth: null
    });

    const login = useCallback(async () => {
        try {
            const { token, user } = await authApiService.login(state.email, state.password);
           
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setLogined(true);
            navigate("/dashboard/offers");
        } catch (error) {
            setError((prev) => ({ ...prev, auth: 'email or password is incorrect' }));
            setTimeout(() => {
                setError((prev) => ({ ...prev, auth: null }));
            }, 5000);
        }
    }, [state.email, state.password]);

    return (
        <div className={`form-wrapper ${active ? "show" : "hide"}`}>
            <Form className="flex flex-col gap-6">
                <h3 className="mb-2">Login</h3>
                <Input
                    label="Email Address"
                    name="email"
                    placeholder="Enter email address"
                    value={state.email}
                    onChange={(e) => {
                        setError((prev) => ({ ...prev, email: null }));
                        setState((prev) => ({ ...prev, email: e.target.value }));
                    }}
                    onBlur={(e) => authValidate("email", e.target.value, (error: any) => setError(error))}
                    error={error.auth || error.email}
                />
                <Input
                    label="Password"
                    name="password"
                    placeholder="Enter password"
                    type="password"
                    value={state.password}
                    onChange={(e) => {
                        setError((prev) => ({ ...prev, password: null }));
                        setState((prev) => ({ ...prev, password: e.target.value }));
                    }}
                    onBlur={(e) => authValidate("password", e.target.value, (error: any) => setError(error))}
                    error={error.auth || error.password}
                />
                <div className="flex flex-row items-center justify-between w-full">
                    <CheckboxTile
                        active={state.remember}
                        text="Keep me sign in"
                        classNameWrapper="!pl-0 sm:!px-2"
                        onClick={() => setState((prev) => ({ ...prev, remember: !state.remember }))}
                    />
                    <span
                        className="underline text-[14px] cursor-pointer"
                        onClick={() => setState((prev) => ({ ...prev, activeTab: 1 }))}
                    >
                        Forgot password?
                    </span>
                </div>
                <Button
                    variant="auth"
                    disabled={!!error.email || !!error.password}
                    onClick={login}
                >
                    <span className={"text-white text-[15px] font-normal"}>
                        Login
                    </span>
                </Button>
            </Form>
        </div>
    );
}