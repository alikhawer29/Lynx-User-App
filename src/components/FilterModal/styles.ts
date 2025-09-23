import { StyleSheet } from "react-native"
import colors from "../../utils/colors"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel } from "../../utils/helper"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.transparent_white,
    },
    blur: {
        ...StyleSheet.absoluteFillObject,
    },
    modal_content: {
        minHeight: heightPixel(360),
        backgroundColor: colors.white,
        marginTop: 'auto',
        borderTopLeftRadius: heightPixel(40),
        borderTopRightRadius: heightPixel(40),
        paddingVertical: heightPixel(25),
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    },
    header_row: {
        paddingBottom: heightPixel(15),
        borderBottomWidth: 1,
        borderColor: colors.light_gray,
    },
    header_left: {
        width: "20%",
    },
    header_center: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
    },
    header_right: {
        width: "20%",
    },
    checkbox_row: {
        marginTop: heightPixel(15),
        marginBottom: heightPixel(10),
        flexWrap: "wrap",
    },
    checkbox_wrapper: {
        width: "49%",
        marginBottom: heightPixel(20),
    },
    action_row: {
        width: "100%",
        marginTop: heightPixel(50),
    },
    button_style: {
        width: "48%",
    },
})

export default styles