import { useCallback, useEffect, useRef } from "react";
import { useModal } from "../../../contexts/ModalContext";
import { useSignupMutation } from "../../../redux/Apis/Auth";
import { LANGUAGES } from "../../../utils/data";
import { formHandler } from "../../../utils/helper";
import { navigateAndSimpleReset } from "../../../utils/navigation";
import { ROUTES } from "../../../utils/routes";
import { SIGNUP_SCHEMA } from "../../../utils/validators";

const initial = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    dialing_code: "+971",
    country_code: "AE",
    phone: "",
    language: ""
}

const useRegisterController = () => {

    const formik_ref = useRef(null)
    const { showOkModal } = useModal()

    const [submit, { isSuccess, isLoading }] = useSignupMutation()

    useEffect(() => {
        if (isSuccess) {
            showOkModal({
                type: "success",
                title: "Successfully",
                message: "Account registered successfully."
            }, () => navigateAndSimpleReset(ROUTES.LOGIN))
        }
    }, [isSuccess])

    const onSubmit = useCallback((data: any) => {
        let payload = formHandler(data)
        submit(payload)
    }, [])

    const onPressLogin = useCallback(() => {
        navigateAndSimpleReset(ROUTES.LOGIN)
    }, [])

    return {
        refs: {
            formik_ref
        },
        schema: SIGNUP_SCHEMA,
        values: {
            initial,
            isLoading,
            languages: LANGUAGES
        },
        functions: {
            onSubmit,
            onPressLogin
        }
    }

}

export default useRegisterController