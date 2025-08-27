import { isFulfilled, Middleware } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";

const successLogger: Middleware = () => (next) => (action) => {

    if (isFulfilled(action)) {

        const show_success = (action as any)?.meta?.baseQueryMeta?.show_success
        const message = (action as any)?.meta?.baseQueryMeta?.message || (action as any)?.payload?.message;

        if (show_success && message) {
            Toast.show({ text1: "Success!", text2: message, type: "success" });
        }
    }

    return next(action);

};

export default successLogger