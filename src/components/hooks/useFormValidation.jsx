import { useMemo } from "react";

function useFormValidation(userInfo, isNewUser) {
    const isPasswordValid = useMemo(() => userInfo.password === null ? true : (/^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/).test(userInfo.password), [userInfo.password]);
    const isConfirmPasswordValid = useMemo(() => isNewUser ? userInfo.confirmPassword === null ? true : userInfo.password === userInfo.confirmPassword : true, [userInfo.confirmPassword, userInfo.password, isNewUser]);
    const isAccountValid = useMemo(() => userInfo.account === null ? true : userInfo.account.length > 3, [userInfo.account]);
    const isFormValid = useMemo(() => isAccountValid && isPasswordValid && isConfirmPasswordValid, [isConfirmPasswordValid, isAccountValid, isPasswordValid]);
    return { isPasswordValid, isConfirmPasswordValid, isAccountValid, isFormValid }
}

export default useFormValidation;