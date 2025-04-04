import HeaderItem from 'common/modules/offers/components/headerItem';
import React from 'react'

interface IProps {
    state: {
        selectAll: boolean;
        filters: number[];
        pages: number;
    };
    setState: React.Dispatch<React.SetStateAction<{ selectAll: boolean; filters: number[], pages: number, page: number }>>;
}
const MessageHeader: React.FC<IProps> = ({ state, setState }) => {
    return (
        
        <div className="items-center px-4 py-3 bg-[#fafbfc] w-full gap-3 min-w-[2800px] grid grid-cols-[50px,220px,220px,220px,220px,repeat(4,minmax(80px,1fr)),120px]  border-b-[#dbe0e5a6] border-b">
            <HeaderItem
                title="Offer"
                onClick={() => console.log('ID')}
            />
            <HeaderItem
                title="Order"
                onClick={() => console.log('Address')}
            />
            <HeaderItem
                title="Customer"
                onClick={() => console.log('Price')}
            />
            <HeaderItem
                title="Customer's phone number"
                onClick={() => console.log('Description')}
            />
            <HeaderItem
                title="Performer"
                onClick={() => console.log('Date from')}
            />
            <HeaderItem
                title="Artist's phone number"
                onClick={() => console.log('Date to')}
            />
            <HeaderItem
                title="№Messages"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Created"
                onClick={() => console.log('Project')}
            />
            <HeaderItem
                title="Updated"
                onClick={() => console.log('Client')}
            />
            <HeaderItem
                title="Actions"
                onClick={() => console.log('Region')}
            />
        </div>
    )
}

export default MessageHeader;
