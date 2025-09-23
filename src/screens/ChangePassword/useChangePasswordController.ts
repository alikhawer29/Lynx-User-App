import { FormikProps } from "formik";
import { useCallback, useEffect, useRef } from "react";
import { useModal } from "../../contexts/ModalContext";
import { useChangePasswordMutation } from "../../redux/Apis/User";
import { goBack } from "../../utils/navigation";
import { CHANGE_PASSWORD_SCHEMA } from "../../utils/validators";

interface FormValues {
    current_password: string
    new_password: string
    password_confirmation: string
}

const initial: FormValues = {
    current_password: "",
    new_password: "",
    password_confirmation: "",
}

const useChangePasswordController = () => {

    const formik_ref = useRef<FormikProps<FormValues>>(null)

    const { showOkModal } = useModal()

    const [submit, { isSuccess, isLoading }] = useChangePasswordMutation()

    useEffect(() => {
        if (isSuccess) {
            formik_ref?.current?.resetForm()
            showOkModal({
                type: "success",
                title: "Successfully",
                message: "User Password Has Been Updated Successfully."
            }, () => goBack())
        }
    }, [isSuccess])

    const onSubmit = useCallback((data: any) => {
        submit(data)
    }, [])

    return {
        refs: {
            formik_ref
        },
        schema: CHANGE_PASSWORD_SCHEMA,
        values: {
            initial,
            isLoading,
        },
        functions: {
            onSubmit,
        }
    }

}

export default useChangePasswordController