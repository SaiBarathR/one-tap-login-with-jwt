import { Skeleton } from "@nextui-org/react";

export default function UserInfoSkeleton() {
    return <>
        <Skeleton className="flex rounded-full w-20 h-20" />
        <Skeleton className="flex rounded-lg h-10 w-1/2" />
        <Skeleton className="flex rounded-lg h-10 w-1/2" />
        <Skeleton className="flex rounded-lg h-10 w-1/2" />
        <Skeleton className="flex rounded-lg h-10 w-1/2" />
    </>
}