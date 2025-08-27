import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit"
import Toast from "react-native-toast-message"

const errorLogger: Middleware = () => (next) => (action) => {

    if (isRejectedWithValue(action)) {
        const message =
            (action as any)?.payload?.data?.message ||
            (action as any)?.error?.message ||
            "Something went wrong"

        console.log("Error Message :: ", message)

        Toast.show({ text1: "Error!", text2: message, type: "error" })

    }

    return next(action)
}

export default errorLogger
