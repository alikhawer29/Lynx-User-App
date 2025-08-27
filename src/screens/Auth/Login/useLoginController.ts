import { useCallback, useRef } from "react";
import images from "../../../assets/images";
import { useAppDispatch } from "../../../hooks";
import { login } from "../../../redux/Slices/AuthSlice";
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

    const dispatch = useAppDispatch()
    const formik_ref = useRef(null)

    // const [submit, { isSuccess, isLoading }] = useSetPasswordMutation()

    // useEffect(() => {
    //     if (isSuccess) {
    //        
    //     }
    // }, [isSuccess])

    const onSubmit = useCallback((data: any) => {
        // submit({ ...data, ...params }) 
        dispatch(login())
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
            isLoading: false,
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