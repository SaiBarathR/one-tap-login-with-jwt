import TextActionRenderer from "../common/TextActionRenderer";
import ButtonRenderer from "../common/ButtonRenderer.jsx";
import { useEffect, useState } from "react";
import { Tooltip, Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import InputRenderer from "../common/InputRenderer";
import SignInService from "../../service/signIn.service";
import { AuthServices } from '../../service/auth.service'
import { useNavigate } from "react-router";
import { genderTypes } from "../../constants";
import { useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import useFormValidation from "../hooks/useFormValidation";

export default function Login() {

  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: null, password: null })
  // change password type to text or password if user wants to see password
  const [passwordType, setPasswordType] = useState({ password: "password", confirmPassword: "password" });
  const { isPasswordValid, isConfirmPasswordValid, isEmailValid, isFormValid } = useFormValidation(userInfo, isNewUser);
  const navigateTo = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
        navigateTo('/home');
    }else {
      localStorage.clear();
    }
  }, [])

  // reset password field when switching between sign in and sign up
  useEffect(() => isNewUser ? setUserInfo((prev) => ({ email: prev.email || null, password: null, confirmPassword: null, name: '', age: 0, gender: '' })) : setUserInfo((prev) => ({ email: prev.email || null, password: null })), [isNewUser]);

  useGoogleOneTapLogin({
    onSuccess: credentialResponse => {
      if (credentialResponse.credential) {
        AuthServices.setAuthToken(credentialResponse.credential, 'googleOneTap');
        navigateTo('/home');
      }
    },
    onError: () => { console.log('Login Failed') },
  });

  // handle change in input fields and update state
  const handleChangeInputItems = ({ target: { name, value } }) => setUserInfo((prev) => ({ ...prev, [name]: value }))

  const handleShowPassword = (name) => setPasswordType((prev) => ({ ...prev, [name]: prev[name] === "password" ? "text" : "password" }))

  // handle submit of form and call register or login user function
  const handleSubmit = (event) => {
    event.preventDefault();
    isFormValid ? SignInService.registerOrLoginUser(isNewUser, userInfo, navigateTo, setLoading) : alert("Please enter valid details");
  }

  const googleLogin = useGoogleLogin({
    onSuccess: ({ code }) => SignInService.handleGoogleSignIn(code, navigateTo, setLoading),
    onError: (error) => {
      console.log('Login Failed:', error)
      setLoading(false)
    }, flow: 'auth-code'
  });

  const facebookLogin = (response) => SignInService.facebookLogin(navigateTo, setLoading)

  return (
    <div className="card flex flex-col gap-5 h-screen w-full items-center justify-center">
      <form id="signIn/signUpForm" className=" card flex flex-col gap-3 shadow-2xl  md:w-[400px] w-[300px]   rounded-2xl py-4 px-4 overflow-y-auto m-6" onSubmit={handleSubmit}>
        <h1 className="text-4xl font-medium  self-start">{`Sign ${isNewUser ? `up` : `in`}`}</h1>
        {isNewUser && <> <InputRenderer onChange={handleChangeInputItems} type="text" name='name' placeholder="Name" value={userInfo.name} required={true} />
          <InputRenderer onChange={handleChangeInputItems} type="number" name='age' placeholder="Age" value={userInfo.age} required={true} />
          <Select
            label={"Select Gender"}
            variant="bordered"
            name="gender"
            color="primary"
            selectedKeys={[userInfo.gender || "Prefer not to Answer"]}
            onChange={handleChangeInputItems}
            classNames={{
              value: "text-white",
              popoverContent: "bg-[#2D3B48] text-white",
              label: "text-[#adafb1] text-sm font-medium",
            }}
          >
            {genderTypes.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
          </Select>
        </>
        }
        <InputRenderer onChange={handleChangeInputItems} type="email" name='email' placeholder="Email Address" value={userInfo.email} required={true} error={!isEmailValid}
          helperText={isEmailValid ? "" : "Please enter a valid email address"}
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
        {/* {!isNewUser && <TextActionRenderer text="Forgot your password?" action="Reset password" onClickAction={() => { }} />} */}
        <TextActionRenderer text={isNewUser ? "Already have an account?" : "Don't have an account?"} action={isNewUser ? "Sign in" : "Sign up"} onClickAction={() => { setIsNewUser((prev) => !prev) }} />
        <ButtonRenderer loading={loading} type="submit" text={`Sign ${isNewUser ? `up` : `in`}`} />
        {loading ?
          <p className="text-[#bfc2c4] text-sm font-medium">Please wait while we {isNewUser ? `sign you up` : `sign you in`}...</p>
          :
          <>
            <div className="flex flex-row gap-2 items-center justify-center">
              <hr className="w-1/4 border-[#bfc2c4] border-1" />
              <p className="text-[#bfc2c4] text-sm font-medium">Or</p>
              <hr className="w-1/4 border-[#bfc2c4] border-1" />
            </div>
            <ButtonRenderer type="button" text="Sign in with Google" imgSrc="https://img.icons8.com/fluency/48/000000/google-logo.png" onClickAction={() => { googleLogin() }} />
            <ButtonRenderer type="button" text="Sign in with Facebook" imgSrc="https://img.icons8.com/fluency/48/000000/facebook-new.png" onClickAction={facebookLogin} />
          </>
        }
      </form>
    </div >
  );
}