import { IOfferItem } from 'models/IOfferModel';
import React, { useEffect, useState } from 'react';
import { offersApiService } from 'services/api.service';
import OfferHeader from './components/offerHeader';
import Offer from './components/offer';
import Button from 'common/components/button/button';
import plus from 'common/assets/images/plus.svg';
import { useNavigate } from 'react-router-dom';
import { Pagination, Stack } from '@mui/material';

interface FiltersState {
    selectAll: boolean;
    filters: number[];
    pages: number;
    page: number;
}

const Offers: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [offers, setOffers] = useState<IOfferItem[]>([]);
    const [state, setState] = useState<FiltersState>({
        selectAll: false,
        filters: [],
        pages: 0,
        page: 1
    });

    const navigate = useNavigate();

    useEffect(() => {
        getOffers();
    }, [state.page]);

    const getOffers = async () => {
        try {
            setLoading(true);
            const response = await offersApiService.getAllOffers(state.page, 20);
            setOffers(response.items.data || []);
            setState((prev) => ({
                ...prev,
                pages: response.items?.last_page || 0
            }));
        } catch (error) {
            console.error("Error upload offers", error);
        } finally {
            console.log('first')
            setLoading(false);
        }
    }
    return (
        <div className='flex flex-col w-full'>
            <div className='flex w-full justify-start items-center'>
                <Button
                    variant="auth"
                    className="!w-[175px] !p-0 flex items-center justify-center mb-3"
                    onClick={() => navigate('create')}
                >
                    <img
                        src={plus}
                        alt="plus"
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                    <p className='text-center flex items-center text-[14px] text-white !leading-0'>Add New</p>
                </Button>
            </div>
            <div className='flex flex-col overflow-x-auto w-full max-w-[1400px] border-[1px] border-[#dbe0e5a6] rounded-t-[12px]'>
                <OfferHeader
                    state={state}
                    setState={setState}
                />
                {!loading ? <div className='flex flex-col min-w-[2800px] overflow-auto h-[540px] gap-3'>
                    {offers.map((offer, index) => (<Offer
                        key={index}
                        offer={offer}
                        active={state.filters.includes(offer.id)}
                        setState={setState}
                        filters={state.filters}
                    />))}
                </div>
                    : <div className='flex w-full h-[540px] justify-center items-center'>
                        <div className={`loader !border-t-[4px] w-[50px] h-[50px]`}></div>
                    </div>
                }
            </div>
            {state.pages !== 0 && <div className='flex w-full max-w-[1400px] justify-center mt-6'>
                <Stack spacing={40}>
                    <Pagination count={state.pages} variant="outlined" color="primary"
                        onChange={(event, value) => {
                            setState((prev) => ({ ...prev, page: value }));
                        }}
                    />
                </Stack>
            </div>}
        </div>
    );
}

export default Offers;
