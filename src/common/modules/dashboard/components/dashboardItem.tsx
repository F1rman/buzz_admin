import { DocumentFilter } from 'iconsax-react';
import React from 'react';

interface IProps {
    event: any;
}

const EventItem: React.FC<IProps> = ({ event }) => {
    console.log(event)
    return (
        <div className="px-8 py-3 bg-[#f8f9fa] h-[69px] w-full gap-3 max-w-[1500px] grid grid-cols-[1.5fr_2fr_2fr_1fr_1.5fr_1fr] border-b-[#dbe0e5a6] border-b">
            <div className='flex flex-col text-[12px] text-[#1D2630]'>
                <p>{event.users.length !== 0 ? event.users[0].name : ""}</p>
                <span className='underline text-[#4680ff]'>{event.users.length !== 0 ? event.users[0].phone : ""}</span>
            </div>
            {event.is_error ? <div className='bg-[#dc2626e6] w-[120px] h-[35px] rounded-lg flex justify-center items-center text-[13px]'><span className='text-white font-light'>Error</span></div> : <span className='text-[14px] text-[#1D2630]'>{event.event}</span>}
            <span className='text-[14px] text-[#1D2630]'>{event.dialog}</span>
            <span className='text-[14px] text-[#1D2630]'>290</span>
            <span className='text-[14px] text-[#1D2630]'>{event.created}</span>
            <div className='flex w-full justify-start items-center'> <DocumentFilter variant="Bold" size={19} color='#4680ff'/></div>
        </div>
    );
}

export default EventItem;
