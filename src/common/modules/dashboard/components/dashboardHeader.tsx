import CheckboxTile from 'common/components/filters/checkbox_tile';
import React from 'react'
import HeaderItem from './headerItem';
import { IEventFilters } from 'models/IFiltersModel';

interface IProps {
   state: {
      filters: IEventFilters;
      pages?: number;
      page?: number;
      events: any[];
   };
   setState: React.Dispatch<React.SetStateAction<{ filters: IEventFilters, pages?: number, page?: number, events: any[] }>>;
}
const DashboardHeader: React.FC<IProps> = ({ state, setState }) => {
   return (
      <div className="items-center px-8 py-3 bg-[#f8f9fa] h-[69px] w-full gap-3 max-w-[1500px] grid grid-cols-[1.5fr_2fr_2fr_1fr_1.5fr_1fr] border-b-[#dbe0e5a6] border-b">
         <HeaderItem
            title="User"
            onSortChange={(newSort) => {
               console.log('Нове сортування:', newSort);
               // Наприклад: fetchData({ sort: newSort })
            }}
         />
         <HeaderItem
            title="Event"
            onSortChange={(newSort) => {
               console.log('Нове сортування:', newSort);
               // Наприклад: fetchData({ sort: newSort })
            }}
         />
         <HeaderItem
            title="Dialog"
            onSortChange={(newSort) => {
               console.log('Нове сортування:', newSort);
               // Наприклад: fetchData({ sort: newSort })
            }}
         />
         <HeaderItem
            title="Ms"
            onSortChange={(newSort) => {
               console.log('Нове сортування:', newSort);
               // Наприклад: fetchData({ sort: newSort })
            }}
         />
         <HeaderItem
            title="Date"
            onSortChange={(newSort) => {
               console.log('Нове сортування:', newSort);
               // Наприклад: fetchData({ sort: newSort })
            }}
         />
         <HeaderItem
            title="Actions"
            onSortChange={(newSort) => {
               console.log('Нове сортування:', newSort);
               // Наприклад: fetchData({ sort: newSort })
            }}
         />
      </div>
   )
}

export default DashboardHeader;
