import { IOfferItem } from 'models/IOfferModel';
import React, { useEffect, useState } from 'react';
import Button from 'common/components/button/button';
import plus from 'common/assets/images/plus.svg';
import { useNavigate } from 'react-router-dom';
import OrderHeader from './components/orderHeader';
import { IOrder } from 'models/IOrder';
import { ordersApiService } from 'services/api.service';
import Order from './components/order';
import { Pagination, Stack } from '@mui/material';

interface OrdersState {
  selectAll: boolean;
  filters: number[];
  pages: number;
  page: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [state, setState] = useState<OrdersState>({
    selectAll: false,
    filters: [],
    pages: 0,
    page: 1
  });

  const navigate = useNavigate();

  useEffect(() => {
    ordersApiService.getAllOrders(state.page, 20).then((res) => {
      setOrders(res.items.data);
      setState((prev) => ({ ...prev, pages: res.items.last_page }));
    });
  }, [state.page]);
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
        <OrderHeader
          state={state}
          setState={setState}
        />
        <div className='flex flex-col min-w-[2800px] overflow-auto h-[560px] gap-3'>
          {orders.map((order, index) => (<Order
            key={index}
            order={order}
            active={state.filters.includes(order.id)}
            setState={setState}
            filters={state.filters}
          />))}
        </div>
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

export default Orders;
