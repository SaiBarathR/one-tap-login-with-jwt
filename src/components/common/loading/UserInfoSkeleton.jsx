import { Skeleton } from "@mui/material";

export default function UserInfoSkeleton() {
    return <>
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton variant="rounded" width={"40%"} height={40} />
        <Skeleton variant="rounded" width={"40%"} height={40} />
        <Skeleton variant="rounded" width={"40%"} height={40} />
        <Skeleton variant="rounded" width={"40%"} height={40} />
    </>
}