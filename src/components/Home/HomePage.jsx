// import UserInfoRenderer from "./UserInfoRenderer";
// import { useUserDetails } from "../hooks/useUserDetails";
import { Reports } from "./Reports.jsx";
import Logout from "../Logout.jsx";
import { OzonetelBlue } from "../../assets/icons/OzonetelBlue.jsx";

export default function HomePage() {

    return (
        <div className='flex flex-col w-full items-center justify-center flow-report-container'>
            <div className={'w-full h-[74px] flex items-center justify-between px-6 shadow-ozonetel'}>
                <div className={'mb-2'}>
                    <OzonetelBlue />
                </div>
                <Logout />
            </div>
            <div className={'w-full mt-2 px-4 overflow-auto'} style={{
                height: "calc(100vh - 96px)"
            }}>
                <Reports />
            </div>
        </div>
    );
}