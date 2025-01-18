import React, { ReactNode, ChangeEvent } from 'react';

interface SelectProps {
  label?: string;
  name: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  children: ReactNode;
  defaultValue?: string | number;
  disabled?: boolean;
  value?: string | number;
  variant?: string;
  className?: string;
  classNameSelect?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  onChange,
  children,
  defaultValue,
  disabled,
  value,
  variant = "outlined",
  className = "",
  classNameSelect = "",
}) => {
  return (
    <div
      className={
        "input_wrapper w-full justify-start items-start flex-col " + className
      }
    >
      {label && <div className="label">{label}</div>}
      <div className="arr_wrapper ">
        <select
          disabled={disabled}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            onChange && onChange(e);
          }}
          className={variant + "  " + classNameSelect}
        >
          {children}
        </select>
        <div className="arr"></div>
      </div>
    </div>
  );
}

export default Select;
