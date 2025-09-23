import { useCallback, useEffect, useRef } from "react";
import images from "../../../assets/images";
import { useLoginMutation } from "../../../redux/Apis/Auth";
import { navigateAndSimpleReset } from "../../../utils/navigation";
import { NAVIGATORS, ROUTES } from "../../../utils/routes";
import { LOGIN_SCHEMA } from "../../../utils/validators";

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

    const formik_ref = useRef(null)

    const [submit, { isSuccess, isLoading }] = useLoginMutation()

    useEffect(() => {
        if (isSuccess) {
        }
    }, [isSuccess])

    const onSubmit = useCallback((data: any) => {
        submit(data)
    }, [])

    const onPressRegister = useCallback(() => {
        navigateAndSimpleReset(ROUTES.REGISTER)
    }, [])

    const onPressGuest = useCallback(() => {
        navigateAndSimpleReset(NAVIGATORS.DRAWER)
    }, [])

    return {
        refs: {
            formik_ref
        },
        schema: LOGIN_SCHEMA,
        values: {
            initial,
            isLoading,
            SOCIAL_LOGINS
        },
        functions: {
            onSubmit,
            onPressRegister,
            onPressGuest
        }
    }

}

export default useLoginController