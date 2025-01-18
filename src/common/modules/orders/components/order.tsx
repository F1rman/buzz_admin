import CheckboxTile from 'common/components/filters/checkbox_tile';
import { IOrder } from 'models/IOrder';
import React from 'react';

interface IProps {
    order: IOrder;
    active: boolean;
    filters: number[];
    setState: React.Dispatch<React.SetStateAction<{ selectAll: boolean, filters: number[], pages: number, page: number }>>;
}

const Order: React.FC<IProps> = ({ order, setState, active, filters }) => {
    return (
        <div className="px-4 min-w-[2800px] w-full py-3 bg-[#fafbfc] items-center gap-3 grid grid-cols-[50px,50px,150px,220px,repeat(4,minmax(160px,1fr)),120px,repeat(10,minmax(120px,1fr))] border-b-[1px] pb-2">
            <CheckboxTile
                active={active}
                classNameWrapper="!pl-0 sm:!px-2"
                onClick={() =>
                    setState((prev) => ({
                        ...prev,
                        filters: filters.includes(order.id)
                            ? prev.filters.filter((filter) => filter !== order.id)
                            : [...filters, order.id],
                    }))
                }
            />
            {Object.entries(order).map(([key, value], index) => {
                if (key === 'photo') {
                    return <span key={index} className='text-center'>-</span>;
                } else {
                    return <span key={index} className="text-center text-[#1D2630] text-[12px] font-normal">{value}</span>;
                }
            })}

            <span className='text-center'>!</span>
        </div>
    );
}

export default Order;
