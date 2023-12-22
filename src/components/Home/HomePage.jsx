import UserInfoSkeleton from "../common/loading/UserInfoSkeleton";
import UserInfoRenderer from "./UserInfoRenderer";
import { useUserDetails } from "../hooks/useUserDetails";

export default function HomePage() {

    const { userDetails, loading } = useUserDetails();

    return (
        <div className="w-full h-screen">
            <div className="flex flex-col gap-5 h-screen w-full  bg-[#F2F4F3] items-center justify-center">
                {loading ? <UserInfoSkeleton /> : userDetails ? <UserInfoRenderer userDetails={userDetails} /> :
                    <div className="flex flex-col min-w-[50%] h-1/2 bg-white rounded-md shadow-md  items-center justify-center">
                        <h1 className="text-2xl flex font-medium text-[#2D3B48]">{'No Data to display :('}</h1>
                    </div>
                }
            </div>
        </div >
    );
}