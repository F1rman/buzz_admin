import Button from "common/components/button/button";
import Input from "common/components/inputs/input";
import Form from "common/layout/auth/form";
import { authValidator } from "validators";
import { useState } from "react";

interface StateType {
    email: string;
    activeTab: number;
    password: string;
    error: boolean;
    remember: boolean;
}

interface ForgotPasswordProps {
    active: boolean;
    state: StateType;
    setState: React.Dispatch<React.SetStateAction<StateType>>;
}

export default function ForgotPassword({ active, state, setState }: ForgotPasswordProps) {
    const [error, setError] = useState<string | null>(null);

    return (
        <div className={`form-wrapper ${active ? "show" : "hide"}`}>
            <Form className="flex flex-col gap-6">
                <div className="flex w-full justify-between items-center">
                    <h3 className="mb-2 font-semibold text-[#1D2630]">Forgot Password</h3>
                    <span
                        className="cursor-pointer text-[14px] text-[#4680FF]"
                        onClick={() => setState((prev) => ({ ...prev, activeTab: 0 }))}
                    >
                        Back to Login
                    </span>
                </div>
                <Input
                    label="Email Address"
                    name="email"
                    placeholder="Enter email address"
                    value={state.email}
                    error={error}
                    onChange={(e) => {
                        setError(null);
                        setState((prev) => ({ ...prev, email: e.target.value }));
                    }}
                    onBlur={(e) => {
                        const { error } = authValidator.extract("email").validate(e.target.value);
                        if (error) setError(error.message);
                    }}
                />
                <div className="flex flex-col w-full">
                    <span className="font-normal text-[#1D2630] text-[12px] mb-4">
                        Do not forget to check SPAM box.
                    </span>
                    <Button
                        variant="auth"
                        onClick={async () => {
                            // const error = await authService.forgotPassword(state.email, setError);
                            // if (!error) setState((prev) => ({ ...prev, activeTab: 2 }));
                        }}
                    >
                        <span className={"text-white text-[15px] font-normal"}>
                            Send Password Reset Email
                        </span>
                    </Button>
                </div>
            </Form>
        </div>
    );
}