import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent, FocusEvent } from "react";
import eye from "common/assets/images/eye.svg";
import closed_eye from "common/assets/images/close_eye.svg";
import loop from "common/assets/images/loop.svg";
import useRipple from "use-ripple-hook";

interface InputProps {
    name: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    className?: string;
    children?: React.ReactNode;
    onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
    type?: string;
    wrapperClassName?: string;
    src?: string;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    onClick?: (e: MouseEvent<HTMLInputElement>) => void;
    label?: string;
    counter?: boolean;
    length?: number;
    disabled?: boolean;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    maxLength?: number;
    error?: string | boolean | null;
    disabledRipple?: boolean;
    search?: boolean;
}

const Input: React.FC<InputProps> = ({
    name,
    value,
    onChange,
    placeholder,
    className = "",
    children,
    onKeyUp,
    type = "text",
    wrapperClassName = "",
    src,
    onBlur,
    onClick,
    label,
    counter = false,
    length = 1,
    disabled,
    onKeyDown,
    maxLength = 10000,
    error = false,
    disabledRipple = false,
    search = false,
}) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [show, setShow] = useState(true);

    const [ripple, event] = useRipple({
        disabled: disabledRipple,
        duration: 450,
        color: "#5b6b7912",
        cancelAutomatically: false,
        timingFunction: "cubic-bezier(.42,.36,.28,.88)",
    });

    return (
        <div className={`input_wrapper ${wrapperClassName}`}>
            {label && (
                <div className="label flex justify-between w-full ">
                    {label}{" "}
                </div>
            )}
            <div className="flex w-full relative">
                <input
                    value={value !== undefined ? value : inputValue}
                    maxLength={maxLength}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    disabled={disabled}
                    onBlur={onBlur}
                    onClick={onClick}
                    onWheel={(e) => {
                        if ((e.target as HTMLInputElement).type === "number") (e.target as HTMLInputElement).blur();
                    }}
                    name={name}
                    type={!show ? "password" : "text"}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        onChange && onChange(e);
                    }}
                    placeholder={placeholder}
                    className={`outline_input ${className} ${src || search ? "!pl-[40px]" : ""} ${error ? "error" : ""}`}
                />
                {type === 'password' && <button
                    onClick={() => setShow(!show)}
                    className="button_eye"
                    ref={ripple}
                    onMouseDown={event}
                >
                    <span className={`icon ${show ? 'show' : ''}`}>
                        <img
                            src={eye}
                            alt="eye"
                            width={20}
                            height={20}
                        />
                    </span>
                    <span className={`icon ${!show ? 'show' : ''}`}>
                        <img
                            src={closed_eye}
                            alt="closed eye"
                            width={20}
                            height={20}
                        />
                    </span>
                </button>}
                {search && <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <img
                        src={loop}
                        alt="loop"
                        width={16}
                        height={16}
                    />
                </span>
                }
            </div>
            {error && <span className={`text-left w-full text-[#dc2626] text-[12px] mt-1 font-normal`}>{error}</span>}
            {children}
        </div>
    );
}

export default Input;
