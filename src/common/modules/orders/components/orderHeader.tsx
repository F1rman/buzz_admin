import CheckboxTile from 'common/components/filters/checkbox_tile';
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
const OrderHeader: React.FC<IProps> = ({ state, setState }) => {
    return (
        
        <div className="items-center px-4 py-3 bg-[#fafbfc] w-full gap-3 min-w-[2800px] grid grid-cols-[50px,50px,150px,220px,repeat(4,minmax(160px,1fr)),120px,repeat(10,minmax(120px,1fr))]  border-b-[#dbe0e5a6] border-b">
            <CheckboxTile
                active={state.selectAll}
                classNameWrapper="!pl-0 sm:!px-2"
                onClick={() => setState((prev) => ({ ...prev, selectAll: !state.selectAll }))}
            />
            <HeaderItem
                title="ID"
                onClick={() => console.log('ID')}
            />
            <HeaderItem
                title="Address"
                onClick={() => console.log('Address')}
            />
            <HeaderItem
                title="Price"
                onClick={() => console.log('Price')}
            />
            <HeaderItem
                title="Description"
                onClick={() => console.log('Description')}
            />
            <HeaderItem
                title="Date from"
                onClick={() => console.log('Date from')}
            />
            <HeaderItem
                title="Date to"
                onClick={() => console.log('Date to')}
            />
            <HeaderItem
                title="Category"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Project"
                onClick={() => console.log('Project')}
            />
            <HeaderItem
                title="Client"
                onClick={() => console.log('Client')}
            />
            <HeaderItem
                title="Region"
                onClick={() => console.log('Region')}
            />
            <HeaderItem
                title="Currency"
                onClick={() => console.log('Currency')}
            />
            <HeaderItem
                title="Status"
                onClick={() => console.log('Status')}
            />
            <HeaderItem
                title="Photo"
                onClick={() => console.log('Photo')}
            />
            <HeaderItem
                title="Created At"
                onClick={() => console.log('Created At')}
            />
            <HeaderItem
                title="Updated At"
                onClick={() => console.log('Updated At')}
            />
            <HeaderItem
                title="Created By"
                onClick={() => console.log('Created By')}
            />
            <HeaderItem
                title="Updated By"
                onClick={() => console.log('Updated By')}
            />
            <HeaderItem
                title="Actions"
                onClick={() => console.log('Actions')}
            />
        </div>
    )
}

export default OrderHeader;
