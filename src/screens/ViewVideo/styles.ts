import { StyleSheet } from "react-native"
import colors from "../../utils/colors"
import { heightPixel, widthPixel } from "../../utils/helper"

const styles = StyleSheet.create({
    video_container: {
        height: heightPixel(220),
        width: "100%",
        borderRadius: heightPixel(10),
        overflow: "hidden",
    },
    video: {
        height: "100%",
        width: "100%",
    },
    control_container: {
        height: heightPixel(25),
        borderRadius: heightPixel(8),
        left: widthPixel(20),
        right: widthPixel(20),
        backgroundColor: colors.transparent_dark_white,
        position: "absolute",
        alignSelf: "center",
        bottom: heightPixel(15),
        paddingHorizontal: widthPixel(10),
    },
    time_row: {
        width: "30%",
    },
    progress_bar: {
        height: heightPixel(4),
        width: "70%",
        backgroundColor: colors.white,
        borderRadius: heightPixel(10),
    },
    progress_fill: {
        height: "100%",
        backgroundColor: colors.grayish_black,
        borderRadius: heightPixel(10),
    },
    title_row: {
        marginVertical: heightPixel(15),
    },
    title_section: {
        width: "70%",
    },
    date_section: {
        width: "30%",
    },
    offline_button_wrapper: {
        marginVertical: heightPixel(15),
        width: "40%",
    },
    offline_button: {
        paddingHorizontal: widthPixel(10),
    },
    similar: {
        marginVertical: heightPixel(15)
    }
})

export default styles