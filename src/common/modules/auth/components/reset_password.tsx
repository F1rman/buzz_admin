import React, { useEffect } from "react";
import main from "common/assets/images/mail.svg";
import Form from "common/layout/auth/form";

interface IProps {
    active: boolean;
    setState: React.Dispatch<React.SetStateAction<any>>;
}

const ResetPassword: React.FC<IProps> = ({ active, setState }) => {
    useEffect(() => {
        if (active) {
            setTimeout(() => {
                setState((prev: any) => ({ ...prev, activeTab: 0 }));
            }, 7000);
        }
    }, [active, setState]);

    return (
        <div className={`form-wrapper ${active ? "show" : "hide"}`}>
            <Form className="flex flex-col items-center py-5">
                <img src={main} alt="Mail" />
                <h3 className="font-semibold mt-[30px] mb-[10px] text-[#4680ffe6]">Incoming!</h3>
                <span className="text-[#222] text-[18px] mb-8">We just sent you an email</span>
                <span className="text-[#a0a0a0] text-[14px] text-center">
                    Please follow the instructions in the email to recover <br /> your account.
                </span>
            </Form>
        </div>
    );
};

export default ResetPassword;