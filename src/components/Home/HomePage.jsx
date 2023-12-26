import UserInfoRenderer from "./UserInfoRenderer";
import { useUserDetails } from "../hooks/useUserDetails";

export default function HomePage() {

    const { userDetails, loading } = useUserDetails();

    return (
        <div className="card w-full h-screen">
            <div className="flex flex-col gap-5 h-screen w-full  items-center justify-center">
                {(userDetails || loading) ? <UserInfoRenderer userDetails={userDetails} loadingUser={loading} /> :
                    <div className="card flex flex-col min-w-[50%] h-1/2  rounded-md shadow-md  items-center justify-center">
                        <h1 className="text-2xl flex font-medium text-[#b3b5b6]">{'No Data to display :('}</h1>
                    </div>
                }
            </div>
        </div >
    );
}