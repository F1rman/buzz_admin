import { useEffect, useState } from "react";
import DashboardHeader from "./components/dashboardHeader";
import { mainApiService } from "services/api.service";
import { IEventFilters } from "models/IFiltersModel";
import { Pagination, Stack } from '@mui/material';
import Button from "common/components/button/button";
import EventItem from "./components/dashboardItem";
import { CpuCharge, Setting3 } from "iconsax-react";
import Filters from "./components/filters";

interface DashboardState {
    events: any[];
    filters: IEventFilters;
    pages?: number;
    page?: number;
}

export default function Dashboard() {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [state, setState] = useState<DashboardState>({
        events: [],
        filters: {
            is_event: false,
            is_error: false,
            is_message: false,
            is_timeout: false,
            is_other: false
        },
        pages: 0,
        page: 1
    });

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const response = await mainApiService.getAllEvents({
                ...state.filters,
                pageNumber: state.page,
                pageSize: 20
            });

            setState((prev) => ({
                ...prev,
                events: response.items.data || [],
                pages: response.items?.last_page || 0
            }));
        } catch (error) {
            console.error("Error upload events", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [state.page, state.filters]);


    return (
        <div className="flex flex-col">
            <Filters
                open={open}
                setOpen={setOpen}
                filters={state.filters}
                setFilters={(filters: IEventFilters) => {
                    setState((prev) => ({ ...prev, filters }));
                }}
            />
            <div className="flex w-full gap-4 items-center">
                <Button
                    variant="auth"
                    className="!w-[175px] !p-0 flex items-center justify-center mb-3"
                    onClick={() => setOpen(true)}
                >
                    <Setting3 size={22} color="#fff" />
                    <p className='text-center flex items-center text-[14px] text-white !leading-0 pl-3'>Filters</p>
                </Button>
            </div>
            <div className='flex flex-col overflow-x-auto w-[1500px] border-[1px] border-[#dbe0e5a6]  rounded-t-[12px]'>
                <DashboardHeader
                    state={state}
                    setState={setState}
                />
                <div className='flex flex-col max-w-[1500px] overflow-auto h-[540px] gap-3'>
                    {loading ? (
                        <div className="justify-center items-center flex h-[540px]">
                            <div className={`loader !border-t-[4px] w-[50px] h-[50px]`}></div>
                        </div>
                    ) : (
                        state.events.map((event, index) => (
                            <EventItem
                                key={index}
                                event={event}
                            />
                        ))
                    )}
                </div>
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
