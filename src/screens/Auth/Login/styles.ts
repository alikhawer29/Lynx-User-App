import { StyleSheet } from "react-native"
import colors from "../../../utils/colors"
import { heightPixel } from "../../../utils/helper"

const styles = StyleSheet.create({
    row_space_between: {
        marginTop: heightPixel(15),
    },
    login_button: {
        marginVertical: heightPixel(40),
    },
    divider_line: {
        height: 1,
        backgroundColor: colors.light_gray,
        width: "35%",
    },
    divider_text: {
        width: "30%",
    },
    social_logins_row: {
        marginVertical: heightPixel(25),
    },
    social_login_box: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: heightPixel(55),
        borderRadius: heightPixel(8),
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.light_gray,
    },
    register_container: {
        gap: heightPixel(20),
    },
})

export default styles
