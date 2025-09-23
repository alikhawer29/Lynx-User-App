import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../contexts/ModalContext";
import { useEditProfileMutation } from "../../redux/Apis/User";
import { selectUser } from "../../redux/Slices/AuthSlice";
import { LANGUAGES } from "../../utils/data";
import { goBack, navigateAndSimpleReset } from "../../utils/navigation";
import { ROUTES } from "../../utils/routes";
import { EDIT_PROFILE_SCHEMA } from "../../utils/validators";

const useEditProfileController = () => {

    const user = useSelector(selectUser)
    const formik_ref = useRef(null)
    const { showOkModal } = useModal()

    const initial = {
        first_name: user?.first_name,
        last_name: user?.last_name,
        dialing_code: user?.dialing_code,
        country_code: user?.country_code,
        phone: user?.phone,
        language: user?.language
    }

    const [submit, { isSuccess, isLoading }] = useEditProfileMutation()

    useEffect(() => {
        if (isSuccess) {
            showOkModal({
                type: "success",
                title: "Successfully",
                message: "User Profile Has Been Updated Successfully"
            }, () => goBack(), () => goBack())
        }
    }, [isSuccess])

    const onSubmit = useCallback((data: any) => {
        submit(data)
    }, [])

    const onPressLogin = useCallback(() => {
        navigateAndSimpleReset(ROUTES.LOGIN)
    }, [])

    return {
        refs: {
            formik_ref
        },
        schema: EDIT_PROFILE_SCHEMA,
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

export default useEditProfileController