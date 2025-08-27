import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, PAGE_WIDTH, widthPixel } from "../../../utils/helper";

const styles = StyleSheet.create({
    otp_wrapper: {
        marginVertical: heightPixel(7.5),
    },
    label: {
        marginBottom: heightPixel(10),
        marginHorizontal: widthPixel(2),
    },
    otp_input: {
        height: heightPixel(88),
        borderWidth: 1,
        borderColor: colors.medium_gray,
        borderBottomWidth: 1,
        borderRadius: heightPixel(8),
        width: (PAGE_WIDTH - GLOBAL_HORIZONTAL_PADDING * 2 - widthPixel(30)) / 4,
        marginHorizontal: 0,
    },
    otp_container: {
        gap: widthPixel(10),
        width: "100%",
    },
    button: {
        marginVertical: heightPixel(40),
    },
    error: {
        marginTop: heightPixel(4),
        marginLeft: widthPixel(15),
    },
})

export default styles