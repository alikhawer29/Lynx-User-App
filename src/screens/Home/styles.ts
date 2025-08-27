import { StyleSheet } from "react-native"
import colors from "../../utils/colors"
import { heightPixel } from "../../utils/helper"

const styles = StyleSheet.create({
    banner: {
        height: heightPixel(220),
        borderRadius: heightPixel(8),
        overflow: "hidden",
        marginBottom: heightPixel(20),
    },
    banner_image: {
        borderRadius: heightPixel(8),
    },
    banner_gradient: {
        flex: 1,
        padding: heightPixel(24),
        justifyContent: "flex-end",
    },
    banner_title: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 22,
        lineHeight: 32,
    },
    banner_subtitle: {
        width: "70%",
    },
    section: {
        marginBottom: heightPixel(24),
        gap: heightPixel(12)
    },
    about_text: {
        color: colors.dark_gray,
        lineHeight: 20,
    },
})

export default styles