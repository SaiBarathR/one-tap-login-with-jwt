import { Avatar } from "@nextui-org/react";
import Logout from "../Logout"
import UserService from "../../service/user.service"
import { AuthServices } from "../../service/auth.service"
import { useNavigate } from "react-router";
import ButtonRenderer from "../common/ButtonRenderer";

export default function UserInfoRenderer({ userDetails }) {
    const navigateTo = useNavigate();
    const signInType = sessionStorage.getItem('signInType');

    async function deleteAccount() {
        const resp = window.confirm('Are you sure you want to delete your account?')
        if (resp) {
            const response = await UserService.deleteAccount(userDetails.email)
            console.log("deleteAccount ~ response:", response)
            if (response.status === 'success') {
                alert('Account deleted successfully')
                AuthServices.removeAuthToken();
                localStorage.clear();
                navigateTo('/login');
                window.location.reload();
            } else {
                alert('Error deleting account')
            }
        }
    }

    function InfoRenderer({ name, value }) {
        return (
            <div className="flex flex-row gap-5 rounded-xl shadow-md p-2 w-full bg-slate-200">
                <h1 className={"text-xl font-medium text-[#2D3B48] self-start "}>{name}</h1>
                <h1 className={`text-xl text-[#2D3B48] self-start ${name === 'Name:' && 'capitalize'}`}>{value}</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5 min-w-[50%]  bg-white rounded-md shadow-md p-5">
            <h1 className="text-4xl font-medium text-[#2D3B48] ">User Profile</h1>
            <div className="flex flex-col gap-5 justify-center w-full items-center">
                <Avatar className="flex rounded-full w-20 h-20" src={userDetails.photo || userDetails.picture} />
                {userDetails.name && <InfoRenderer name="Name:" value={userDetails.name} />}
                {userDetails.age && <InfoRenderer name="Age:" value={userDetails.age || '-'} />}
                {userDetails.gender && <InfoRenderer name="Gender:" value={userDetails.gender} />}
                {userDetails.email && <InfoRenderer name="Email:" value={userDetails.email} />}
            </div>
            <div className={`w-full flex ${(signInType === 'manual' || signInType === 'google') ? 'justify-between' : 'justify-end'}`}>
                {(signInType === 'manual' || signInType === 'google') && <ButtonRenderer text={'Delete Account'} onClick={deleteAccount} />}
                <Logout />
            </div>
        </div>
    )
}