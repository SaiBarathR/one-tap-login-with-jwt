import { useMemo } from "react";

function useFormValidation(userInfo, isNewUser) {
    const isPasswordValid = useMemo(() => userInfo.password === null ? true : (/^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(userInfo.password), [userInfo.password]);
    const isConfirmPasswordValid = useMemo(() => isNewUser ? userInfo.confirmPassword === null ? true : userInfo.password === userInfo.confirmPassword : true, [userInfo.confirmPassword, userInfo.password, isNewUser]);
    const isEmailValid = useMemo(() => userInfo.email === null ? true : (/\S+@\S+\.\S+/).test(userInfo.email), [userInfo.email]);
    const isFormValid = useMemo(() => isEmailValid && isPasswordValid && isConfirmPasswordValid, [isConfirmPasswordValid, isEmailValid, isPasswordValid]);
    return { isPasswordValid, isConfirmPasswordValid, isEmailValid, isFormValid }
}

export default useFormValidation;