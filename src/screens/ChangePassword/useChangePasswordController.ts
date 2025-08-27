import { FormikProps } from "formik";
import { useCallback, useRef } from "react";
import { useModal } from "../../contexts/ModalContext";
import { goBack } from "../../utils/navigation";
import { CHANGE_PASSWORD_SCHEMA } from "../../utils/validators";

interface FormValues {
    old_password: string
    password: string
    password_confirmation: string
}

const initial: FormValues = {
    old_password: "",
    password: "",
    password_confirmation: "",
}

const useChangePasswordController = () => {

    const formik_ref = useRef<FormikProps<FormValues>>(null)

    const { showOkModal } = useModal()

    // const [submit, { isSuccess, isLoading }] = useSetPasswordMutation()

    // useEffect(() => {
    //     if (isSuccess) {
    //     }
    // }, [isSuccess])

    const onSubmit = useCallback((data: any) => {
        // submit({ ...data, ...params }) 
        formik_ref?.current?.resetForm()
        showOkModal({
            type: "success",
            title: "Successfully",
            message: "User Password Has Been Updated Successfully."
        }, () => goBack())
    }, [])

    return {
        refs: {
            formik_ref
        },
        schema: CHANGE_PASSWORD_SCHEMA,
        values: {
            initial,
            isLoading: false,
        },
        functions: {
            onSubmit,
        }
    }

}

export default useChangePasswordController