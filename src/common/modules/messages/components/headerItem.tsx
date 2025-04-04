
interface IProps {
    title: string;
    onClick: () => void;
}

export default function HeaderItem({ title, onClick }: IProps) {
    return (
        <span onClick={onClick} className="text-center text-[#1D2630] text-[12px] font-medium">{title}</span>
    );
}
