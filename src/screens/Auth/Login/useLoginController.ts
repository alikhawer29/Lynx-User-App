import { FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import images from "../../../assets/images";
import useKeychain from "../../../hooks/useKeychain";
import { useLoginMutation } from "../../../redux/Apis/Auth";
import { navigate, navigateAndSimpleReset } from "../../../utils/navigation";
import { NAVIGATORS, ROUTES } from "../../../utils/routes";
import { LOGIN_SCHEMA } from "../../../utils/validators";

interface LoginFormValues {
    email: string;
    password: string;
}

const SOCIAL_LOGINS = [
    {
        icon: images.google
    },
    {
        icon: images.apple
    },
    {
        icon: images.facebook
    },
]

const initial = {
    email: "",
    password: "",
}

const useLoginController = () => {

    const formik_ref = useRef<FormikProps<LoginFormValues>>(null)
    const { credentials, saveCredentials, clearCredentials } = useKeychain()

    const [remember, setRemember] = useState(false)

    const [submit, { isSuccess, isLoading }] = useLoginMutation()

    useEffect(() => {
        if (isSuccess) {
            if (remember) {
                saveCredentials(
                    formik_ref?.current?.values?.email ?? "",
                    formik_ref?.current?.values?.password ?? ""
                )
            } else {
                clearCredentials()
            }
        }
    }, [isSuccess, formik_ref, remember])

    useEffect(() => {
        if (credentials) {
            setRemember(true)
            formik_ref?.current?.setFieldValue("email", credentials?.email)
            formik_ref?.current?.setFieldValue("password", credentials?.password)
        }
    }, [credentials, formik_ref])

    const onSubmit = useCallback((data: any) => {
        submit(data)
    }, [])

    const onPressRegister = useCallback(() => {
        navigateAndSimpleReset(ROUTES.REGISTER)
    }, [])

    const onPressGuest = useCallback(() => {
        navigateAndSimpleReset(NAVIGATORS.DRAWER)
    }, [])

    const onPressForgotPassword = useCallback(() => {
        navigate(ROUTES.AUTH_TYPE)
    }, [])

    return {
        refs: {
            formik_ref
        },
        schema: LOGIN_SCHEMA,
        values: {
            initial,
            isLoading,
            remember,
            SOCIAL_LOGINS
        },
        functions: {
            onSubmit,
            onPressRegister,
            onPressGuest,
            onPressForgotPassword,
            setRemember
        }
    }

}

export default useLoginController