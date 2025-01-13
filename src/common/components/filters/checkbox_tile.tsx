import Checkbox from "common/components/inputs/checkbox";

interface CheckboxTileProps {
  onClick: () => void;
  active: boolean;
  text?: string;
  className?: string;
  classNameWrapper?: string;
}

export default function CheckboxTile({
  onClick,
  active,
  text = "",
  className = "",
  classNameWrapper = "",
}: CheckboxTileProps) {
  return (
    <div
      onClick={onClick}
      className={`flex h-[44px] overflow-hidden items-center w-max px-2 ${classNameWrapper}`}
    >
      <Checkbox active={active} />
      <p
        className={`pl-3 text-[14px] font-normal w-max text-[#1D2630] overflow-hidden text-ellipsis inline ${className}`}
      >
        {text}
      </p>
    </div>
  );
}
