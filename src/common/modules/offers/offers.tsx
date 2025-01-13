import CheckboxTile from 'common/components/filters/checkbox_tile';
import { IOfferItem } from 'models/IOfferModel';
import React, { useEffect, useState } from 'react';
import { offersApiService } from 'services/api.service';
import OfferHeader from './components/offerHeader';
import Offer from './components/offer';

const Offers: React.FC = () => {
    const [offers, setOffers] = useState<IOfferItem[]>([]);
    const [state, setState] = useState({
        selectAll: false
    });
    useEffect(() => {
        offersApiService.getAllOffers(1, 20).then((res) => {
            setOffers(res);
        });
    }, [setOffers]);

    return (
        <div className='flex flex-col w-full'>
            <div className='flex flex-col w-full overflow-auto border-[1px] border-[#dbe0e5a6] rounded-t-[12px]'>
                <OfferHeader
                    state={state}
                    setState={setState}
                />
                <div className='flex flex-col h-[650px] pt-4 gap-3'>
                    {offers.map((offer, index) => (<Offer
                        key={index}
                        offer={offer}
                        active={state.selectAll}
                        setState={setState}
                    />))}
                </div>
            </div>
        </div>
    );
}

export default Offers;
