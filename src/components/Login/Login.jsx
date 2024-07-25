import TextActionRenderer from "../common/TextActionRenderer";
import ButtonRenderer from "../common/ButtonRenderer.jsx";
import { useEffect, useState } from "react";
import { Tooltip, Button } from "@nextui-org/react";
import InputRenderer from "../common/InputRenderer";
import SignInService from "../../service/signIn.service";
import { useNavigate } from "react-router";
import useFormValidation from "../hooks/useFormValidation";
import { Ozonetel } from "../../assets/icons/Ozonetel.jsx";
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {

  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({ account: null, password: null })
  // change password type to text or password if user wants to see password
  const [passwordType, setPasswordType] = useState({ password: "password", confirmPassword: "password" });
  const { isPasswordValid, isConfirmPasswordValid, isAccountValid, isFormValid } = useFormValidation(userInfo, isNewUser);
  const navigateTo = useNavigate();
  const alert = (message) => toast.error(message, { position: "top-right", autoClose: 5000, hideProgressBar: true, closeButton: false, closeOnClick: true, pauseOnHover: false, draggable: false, progress: undefined, });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigateTo('/home');
    } else {
      localStorage.clear();
    }
  }, [])

  // reset password field when switching between sign in and sign up
  useEffect(() => isNewUser ? setUserInfo((prev) => ({ account: prev.account || null, password: null, confirmPassword: null, name: '', age: 0, gender: '' })) : setUserInfo((prev) => ({ account: prev.account || null, password: null })), [isNewUser]);


  // handle change in input fields and update state
  const handleChangeInputItems = ({ target: { name, value } }) => setUserInfo((prev) => ({ ...prev, [name]: value }))

  const handleShowPassword = (name) => setPasswordType((prev) => ({ ...prev, [name]: prev[name] === "password" ? "text" : "password" }))

  // handle submit of form and call register or login user function
  const handleSubmit = (event) => {
    event.preventDefault();
    isFormValid ? SignInService.registerOrLoginUser(isNewUser, userInfo, navigateTo, setLoading, alert) : alert("Please enter valid details");
  }



  return (
    <div className="card flex flex-col gap-5 h-screen w-full items-center justify-center">
      <Ozonetel />
      <div className={'m-1'}>
        <form id="signIn/signUpForm" className="bg-white text-black flex flex-col gap-3 shadow-2xl  md:w-[400px] w-[300px] w-[280px]   rounded-2xl py-4 px-4 overflow-y-auto m-6" onSubmit={handleSubmit}>
          <h1 className="text-2xl pl-1 font-medium  self-start">{isNewUser ? 'Sign Up' : 'Login'}</h1>
          <InputRenderer onChange={handleChangeInputItems} type="text" name='account' placeholder="Account" value={userInfo.account} required={true} error={!isAccountValid}
            helperText={isAccountValid ? "" : "Please enter a value greater than 3 characters"}
          />
          <div className="flex gap-2 items-center w-full">
            <InputRenderer onChange={handleChangeInputItems} onClickShowPassword={() => handleShowPassword("password")} type={passwordType.password} name='password' placeholder="Password" value={userInfo.password} required={true} error={!isPasswordValid}
              helperText={isPasswordValid ? "" : "Password requirements are : At least 8 characters, At least 1 uppercase letter, At least 1 lowercase letter, At least 1 number, At least 1 special character"}
            />
            {
              isNewUser && <Tooltip content="Password requirements are : At least 8 characters, At least 1 uppercase letter, At least 1 lowercase letter, At least 1 number, At least 1 special character" showArrow placement="top">
                <Button isIconOnly className="rounded-full" size="sm">?</Button>
              </Tooltip>
            }
          </div>
          {isNewUser && <InputRenderer onChange={handleChangeInputItems} onClickShowPassword={() => handleShowPassword("confirmPassword")} type={passwordType.confirmPassword} name='confirmPassword' placeholder="Confirm Password" value={userInfo.confirmPassword} required={true} error={!isConfirmPasswordValid}
            helperText={isConfirmPasswordValid ? "" : "Passwords do not match"}
          />}
          <ButtonRenderer loading={loading} type="submit" text={`Sign ${isNewUser ? `up` : `in`}`} />
        </form>
      </div>
      <ToastContainer />
    </div >
  );
}