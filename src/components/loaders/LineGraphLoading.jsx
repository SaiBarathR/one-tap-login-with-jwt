import { Skeleton } from "@nextui-org/react";
export const LineGraphLoading = () => {
    return <div className='w-full border custom-line-graph-container flex flex-col'>
        <div className='w-full flex border-b-1 h-10 items-center pl-2'>
            <Skeleton className={'w-[80px] h-[20px] rounded-md'} />
        </div>
        <div className='w-[100%] h-[35vh] p-2 mt-4'>
            <Skeleton className={'w-full h-full rounded-md'} />
        </div>
    </div>
}
