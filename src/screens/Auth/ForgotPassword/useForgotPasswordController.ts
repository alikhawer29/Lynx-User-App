import { RouteProp, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useRef } from "react";
import { AuthStackParamList } from "../../../interfaces";
import { useForgotPasswordMutation } from "../../../redux/Apis/Auth";
import { navigate, navigateAndSimpleReset } from "../../../utils/navigation";
import { ROUTES } from "../../../utils/routes";
import { FORGOT_PASSWORD_SCHEMA } from "../../../utils/validators";

type ForgotPasswordRouteProp = RouteProp<AuthStackParamList, 'ForgotPassword'>;

const useForgotPasswordController = () => {

    const { params } = useRoute<ForgotPasswordRouteProp>()
    const formik_ref = useRef(null)

    const [submit, { data, isSuccess, isLoading }] = useForgotPasswordMutation()

    const initial = {
        via: params?.type,
        email: "",
        phone: "",
        calling_code: "+971"
    }

    useEffect(() => {
        if (isSuccess) {
            console.log("Forgot Password Response: ", data);
            navigate(ROUTES.VERIFY_CODE, { ...data?.data })
        }
    }, [isSuccess, data])

    const onSubmit = useCallback((data: any) => {
        submit(data)
    }, [])

    const onPressBackToLogin = useCallback(() => {
        navigateAndSimpleReset(ROUTES.LOGIN)
    }, [])

    return {
        refs: {
            formik_ref
        },
        schema: FORGOT_PASSWORD_SCHEMA,
        values: {
            initial,
            isLoading,
            is_email: params?.type === "email"
        },
        functions: {
            onSubmit,
            onPressBackToLogin
        }
    }

}

export default useForgotPasswordController