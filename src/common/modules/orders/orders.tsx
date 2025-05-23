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
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [state, setState] = useState<OrdersState>({
    selectAll: false,
    filters: [],
    pages: 0,
    page: 1
  });

  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, [state.page]);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersApiService.getAllOrders(state.page, 20);
      setOrders(response.items.data || []);
      setState((prev) => ({
        ...prev,
        pages: response.items?.last_page || 0
      }));
    } catch (error) {
      console.error('Error upload orders', error);
    } finally {
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
      <div className='flex flex-col overflow-x-auto w-full max-w-[1500px] border-[1px] border-[#dbe0e5a6] rounded-t-[12px]'>
        <OrderHeader
          state={state}
          setState={setState}
        />
        {!loading ? <div className='flex flex-col min-w-[2800px] overflow-auto h-[540px] gap-3'>
          {orders.map((order, index) => (<Order
            key={index}
            order={order}
            active={state.filters.includes(order.id)}
            setState={setState}
            filters={state.filters}
          />))}
        </div> : <div className='flex w-full justify-center items-center h-[540px]'>
          <div className={`loader !border-t-[4px] w-[50px] h-[50px]`}></div>
        </div>
        }
      </div>
      {state.pages !== 0 && <div className='flex w-full max-w-[1500px] justify-center mt-6'>
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
