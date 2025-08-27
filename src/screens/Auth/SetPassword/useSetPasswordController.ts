import { RouteProp, useRoute } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { useModal } from "../../../contexts/ModalContext";
import { AuthStackParamList } from "../../../interfaces";
import { navigateAndSimpleReset } from "../../../utils/navigation";
import { ROUTES } from "../../../utils/routes";
import { SET_PASSWORD_SCHEMA } from "../../../utils/validators";
// import { useModal } from "../../../contexts/ModalContext";

type SetPasswordRouteProp = RouteProp<AuthStackParamList, 'SetPassword'>

const initial = {
    password: "",
    password_confirmation: "",
}

const useSetPasswordController = () => {

    const formik_ref = useRef(null)
    const { params } = useRoute<SetPasswordRouteProp>()

    const { showOkModal } = useModal()

    // const [submit, { isSuccess, isLoading }] = useSetPasswordMutation()

    // useEffect(() => {
    //     if (isSuccess) {
    //         showOkModal({
    //             type: "success",
    //             title: "Successfully",
    //             message: "Password has been updated successfully."
    //         }, () => navigateAndSimpleReset(ROUTES.LOGIN))
    //     }
    // }, [isSuccess])

    const onSubmit = useCallback((data: any) => {
        showOkModal({
            type: "success",
            title: "Successfully",
            message: "Password has been updated."
        }, () => navigateAndSimpleReset(ROUTES.LOGIN))
        // submit({ ...data, ...params }) 
    }, [])

    const onPressBackToLogin = useCallback(() => {
        navigateAndSimpleReset(ROUTES.LOGIN)
    }, [])

    return {
        refs: {
            formik_ref
        },
        schema: SET_PASSWORD_SCHEMA,
        values: {
            initial,
            isLoading: false,
        },
        functions: {
            onSubmit,
            onPressBackToLogin
        }
    }

}

export default useSetPasswordController