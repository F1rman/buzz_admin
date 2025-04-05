import React, { useState } from 'react';
import HeaderSort, { SortType } from './headerSort';

interface IProps {
  title: string;
  onSortChange?: (sort: SortType) => void; 
}

export default function HeaderItem({ title, onSortChange }: IProps) {
  const [sort, setSort] = useState<SortType | undefined>();

  const toggleSort = () => {
    const nextSort =
      sort === SortType.ASC ? SortType.DESC : SortType.ASC;

    setSort(nextSort);
    onSortChange?.(nextSort); 
  };

  const column = {
    getToggleSortingHandler: () => toggleSort,
    getIsSorted: () => sort || false
  };

  return (
    <div className="flex items-center justify-start gap-3 select-none">
      <span onClick={toggleSort} className="text-center text-[#1D2630] text-[14px] font-medium cursor-pointer">
        {title}
      </span>
      <HeaderSort column={column} sort={true} />
    </div>
  );
}
