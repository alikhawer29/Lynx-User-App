import { StyleSheet } from "react-native"
import colors from "../../utils/colors"
import { GLOBAL_HORIZONTAL_PADDING, heightPixel, widthPixel } from "../../utils/helper"

const styles = StyleSheet.create({
    row: {
        marginVertical: heightPixel(15),
    },
    left_item: {
        width: "55%",
    },
    right_item: {
        width: "45%",
    },
    actions_container: {
        marginVertical: heightPixel(40),
    },
    actions_row: {
        marginBottom: heightPixel(10),
    },
    button: {
        width: "49%",
    },
    delete_button: {
        backgroundColor: colors.danger,
        borderColor: colors.danger,
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
    },
    background_image: {
        resizeMode: "cover",
        height: "40%",
    },
    container: {
        height: "65%",
        backgroundColor: colors.light_primary,
        borderTopLeftRadius: widthPixel(25),
        borderTopRightRadius: widthPixel(25),
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
    },
    profile_icon_wrapper: {
        top: -heightPixel(55),
        alignSelf: "center",
        position: "absolute",
    },
    content: {
        marginTop: heightPixel(70),
    },
})

export default styles
