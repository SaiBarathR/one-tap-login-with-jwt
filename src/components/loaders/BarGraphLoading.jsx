import {Skeleton} from "@nextui-org/react";

export const BarGraphLoading = () => {

    return <div className=' w-full md:w-1/2  border custom-bar-graph-container flex flex-col'>
        <div className='w-full flex'>
            <div className='flex flex-col gap-2 flex-grow'>
                <Skeleton className={'w-[80px] h-[20px] rounded-md'} />
                <Skeleton className={'w-[40px] h-[15px] rounded-md'} />
            </div>
        </div>
        <div className='w-[100%] h-[40vh] mt-4'>
            <Skeleton className={'w-full h-full rounded-md'} />
        </div>
    </div>

}