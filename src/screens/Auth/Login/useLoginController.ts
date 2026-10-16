import { FormikProps } from "formik";
import { useCallback, useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import images from "../../../assets/images";
import useKeychain from "../../../hooks/useKeychain";
import { useLoginMutation } from "../../../redux/Apis/Auth";
import { navigate, navigateAndSimpleReset } from "../../../utils/navigation";
import { NAVIGATORS, ROUTES } from "../../../utils/routes";
import { LOGIN_SCHEMA } from "../../../utils/validators";
import { getDeviceTimezone, getDeviceId } from "../../../utils/helper";

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

    const [submit, { isSuccess, isLoading, isError, error }] = useLoginMutation()

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
            // Leave auth stack once session is stored in Redux
            navigateAndSimpleReset(NAVIGATORS.DRAWER)
        }
    }, [isSuccess, formik_ref, remember])

    useEffect(() => {
        if (isError) {
            console.log('🔴 Login failed:', JSON.stringify(error, null, 2))
        }
    }, [isError, error])

    useEffect(() => {
        if (credentials) {
            setRemember(true)
            formik_ref?.current?.setFieldValue("email", credentials?.email)
            formik_ref?.current?.setFieldValue("password", credentials?.password)
        }
    }, [credentials, formik_ref])

    const onSubmit = useCallback(async (data: any) => {
        const device_id = await getDeviceId();
        
        const payload = {
            ...data,
            device_type: Platform.OS, // 'android' or 'ios'
            timezone: getDeviceTimezone(),
            device_id: device_id, // Unique device ID
        };
        
        submit(payload);
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