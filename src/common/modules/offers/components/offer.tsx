import CheckboxTile from 'common/components/filters/checkbox_tile';
import { IOfferItem } from 'models/IOfferModel';
import React from 'react';

interface OfferProps {
    offer: IOfferItem;
    active: boolean;
    setState: React.Dispatch<React.SetStateAction<{ selectAll: boolean }>>;
}

const Offer: React.FC<OfferProps> = ({ offer, setState, active }) => {
    return (
        <div className="px-4 min-w-[2800px] w-full items-center gap-3 grid grid-cols-[50px,50px,150px,repeat(5,minmax(120px,1fr)),350px,repeat(10,minmax(120px,1fr))] border-b-[1px] pb-2">
            <CheckboxTile
                active={active}
                classNameWrapper="!pl-0 sm:!px-2"
                onClick={() => setState((prev) => ({ ...prev, selectAll: !prev.selectAll }))}
            />
            {Object.entries(offer).map(([key, value], index) => {
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

export default Offer;
