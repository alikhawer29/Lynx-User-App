import { useCallback, useEffect, useRef } from "react";
import { Platform } from "react-native";
import { useModal } from "../../../contexts/ModalContext";
import useImage from "../../../hooks/useImage";
import { useSignupMutation } from "../../../redux/Apis/Auth";
import { LANGUAGES } from "../../../utils/data";
import { formHandler, getDeviceTimezone, getDeviceId } from "../../../utils/helper";
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
    const { image, openGallery } = useImage()

    const [submit, { isSuccess, isLoading }] = useSignupMutation()

    useEffect(() => {
        if (isSuccess) {
            showOkModal({
                type: "success",
                title: "Successfully",
                message: "Account registered successfully."
            }, () => navigateAndSimpleReset(ROUTES.LOGIN), () => navigateAndSimpleReset(ROUTES.LOGIN))
        }
    }, [isSuccess])

    const onSubmit = useCallback(async (data: any) => {
        const device_id = await getDeviceId();

        let payload = { ...data }

        if (image) {
            payload.image = image
        }

        // Add device information
        payload.device_type = Platform.OS; // 'android' or 'ios'
        payload.timezone = getDeviceTimezone();
        payload.device_id = device_id; // Unique device ID

        payload = formHandler(payload)
        submit(payload)

    }, [image])

    const onPressLogin = useCallback(() => {
        navigateAndSimpleReset(ROUTES.LOGIN)
    }, [])

    const onPressUpload = useCallback(() => {
        openGallery()
    }, [])

    return {
        refs: {
            formik_ref
        },
        schema: SIGNUP_SCHEMA,
        values: {
            initial,
            isLoading,
            languages: LANGUAGES,
            image
        },
        functions: {
            onSubmit,
            onPressLogin,
            onPressUpload
        }
    }

}

export default useRegisterController