import { FormikProps } from "formik";
import { useCallback, useEffect, useRef } from "react";
import { useCreateFeedbackMutation } from "../../redux/Apis/Feedback";
import { CONTACT_SCHEMA } from "../../utils/validators";
import { useModal } from "../../contexts/ModalContext";
import { goBack } from "../../utils/navigation";

interface FormValues {
    name: string
    email: string
    subject: string
    message: string
}

const initial: FormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
}

const useContactUsController = () => {

    const formik_ref = useRef<FormikProps<FormValues>>(null)

    const { showOkModal } = useModal()

    const [submit, { isSuccess, isLoading }] = useCreateFeedbackMutation()

    useEffect(() => {
        if (isSuccess) {
            formik_ref?.current?.resetForm()
            showOkModal({
                type: "success",
                title: "Successfully",
                message: "Your Message Has Been Submitted Successfully."
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
        schema: CONTACT_SCHEMA,
        values: {
            initial,
            isLoading,
        },
        functions: {
            onSubmit
        }
    }

}

export default useContactUsController