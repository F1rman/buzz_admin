import arrow from "common/assets/images/arrow_right.svg";
import { breadrumbs_links } from "common/const/const";
import { Link } from "react-router-dom";

interface IProps {
    defaultPage?: string;
    className?: string;
    currentPage?: string;
}

export default function BreadCrumbs({ defaultPage = "", className = "", currentPage = "" }: IProps) {
    const page = breadrumbs_links[defaultPage]?.children?.[currentPage];

    if (!page) return null;

    return (
        <div className={`flex flex-col w-max breacrums ${className}`}>
            <div className="flex items-center">
                <Link to={breadrumbs_links[defaultPage]?.url}>
                    {breadrumbs_links[defaultPage]?.title}
                </Link>
                {page.links?.map((link: { url: string; title: string }, index: number) => (
                    <Link key={index} to={link.url} className="flex items-center">
                        <img
                            src={arrow}
                            width={12}
                            height={12}
                            className="mx-2 cursor-default"
                            alt="arrow"
                        />
                        {link.title}
                    </Link>
                ))}
            </div>
            <h3 className="text-[#1D2630] text-[30px] font-bold pt-1">{page.title}</h3>
        </div>
    );
}
