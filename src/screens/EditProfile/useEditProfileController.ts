import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useModal } from "../../contexts/ModalContext";
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
        // submit({ ...data, ...params }) 
        showOkModal({
            type: "success",
            title: "Successfully",
            message: "User Profile Has Been Updated Successfully"
        }, () => goBack(), () => goBack())
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
            isLoading: false,
            languages: LANGUAGES
        },
        functions: {
            onSubmit,
            onPressLogin
        }
    }

}

export default useEditProfileController