import useRipple from "use-ripple-hook";
import React, { FC } from "react";

interface CheckboxProps {
  active?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ active = false }) => {
  const [ripple, event] = useRipple({
    duration: 450,
    color: "#4680ff1c",
    cancelAutomatically: false,
    timingFunction: "cubic-bezier(.42,.36,.28,.88)",
  });

  return (
    <div
      ref={ripple}
      onMouseDown={event}
      className={`w-[22px] h-[22px] bg-white flex-none flex justify-center items-center rounded-[8px]  ${
        !active ? "border border-[#d3dbde]" : ""
      }  cursor-pointer`}
    >
      <div
        className={`flex w-full h-full origin-center  justify-center items-center transition-all rounded-[8px] relative ${
          active ? "scale-100 bg-[#4680ff]" : "scale-0"
        }`}
      >
        <div className="absolute w-[2px] h-[13px] left-[13px] top-[5px]  bg-white rounded-md rotate-[40deg]"></div>
        <div className="absolute w-[7px] h-[2px] left-[4px]  top-[12px]  bg-white rounded-md rotate-[40deg]"></div>
      </div>
    </div>
  );
};

export default Checkbox;
