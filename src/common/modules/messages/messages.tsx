import { useState } from "react";
import MessageHeader from "./components/messageHeader";
interface State {
    selectAll: boolean;
    filters: number[];
    pages: number;
    page: number;
  }

const Messages: React.FC = () => {
    const [state, setState] = useState<State>({
        selectAll: false,
        filters: [],
        pages: 0,
        page: 1
    });
    return (
        <div>
            <div className='flex flex-col overflow-x-auto w-full max-w-[1500px] border-[1px] border-[#dbe0e5a6]  rounded-t-[12px]'>
                <MessageHeader
                    state={state}
                    setState={setState}
                />
                <div className='flex flex-col min-w-[2800px] overflow-auto h-[560px] gap-3'>    
                    <div className="flex w-full max-w-[1500px] h-full items-center justify-center">
                        <span className="text-[#5B6B79] text-[14px] mb-[8px]">No data available</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export { Messages };