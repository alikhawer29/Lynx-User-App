import { StyleSheet } from "react-native";
import { heightPixel } from "../../utils/helper";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    scroll_content: {
        paddingBottom: heightPixel(20)
    },
    service_image: {
        height: heightPixel(220),
        borderRadius: heightPixel(8),
    },
    info_section: {
        marginVertical: heightPixel(20),
        gap: heightPixel(10),
    },
    card_container: {
        marginVertical: heightPixel(30)
    },
    normal_card: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        height: heightPixel(87),
        width: "45%",
        borderRadius: heightPixel(8),
        borderWidth: 1,
        borderColor: colors.light_gray,
    },
    premium_card: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary,
        height: heightPixel(87),
        width: "45%",
        borderRadius: heightPixel(8),
        borderWidth: 1,
        borderColor: colors.light_gray,
    },
    button: {
        marginTop: heightPixel(60)
    }
})

export default styles