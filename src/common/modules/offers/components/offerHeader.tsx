import CheckboxTile from 'common/components/filters/checkbox_tile';
import React from 'react'
import HeaderItem from './headerItem';

interface IProps {
    state: {
        selectAll: boolean;
        filters: number[];
    };
    setState: React.Dispatch<React.SetStateAction<{ selectAll: boolean; filters: number[], pages: number, page: number }>>;
}
const OfferHeader: React.FC<IProps> = ({ state, setState }) => {
    return (
       
        <div className="items-center px-4 py-3  bg-[#fafbfc] w-full gap-3 min-w-[2800px] grid grid-cols-[50px,50px,150px,repeat(5,minmax(120px,1fr)),350px,repeat(10,minmax(120px,1fr))]  border-b-[#dbe0e5a6] border-b">
            <CheckboxTile
                active={state.selectAll}
                classNameWrapper="!pl-0 sm:!px-2"
                onClick={() => setState((prev) => ({ ...prev, selectAll: !state.selectAll }))}
            />
            <HeaderItem
                title="ID"
                onClick={() => console.log('Offer Name')}
            />
            <HeaderItem
                title="Name"
                onClick={() => console.log('Offer Name')}
            />
            <HeaderItem
                title="Alias"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Address"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Latitude"
                onClick={() => console.log('Offer Name')}
            />
            <HeaderItem
                title="Longitude"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Code"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Content"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Category"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Brand"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Region"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Status"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Photo"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Created At"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Updated At"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Created By"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Updated By"
                onClick={() => console.log('Category')}
            />
            <HeaderItem
                title="Actions"
                onClick={() => console.log('Category')}
            />
        </div>
    )
}

export default OfferHeader;
