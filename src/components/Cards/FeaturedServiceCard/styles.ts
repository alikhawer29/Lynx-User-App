import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";
import { heightPixel } from "../../../utils/helper";

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.light_gray,
        height: heightPixel(272),
        width: "48%",
        backgroundColor: colors.white,
        borderRadius: heightPixel(8),
        padding: heightPixel(9)
    },
    image_wrapper: {
        flex: 0.55
    },
    image: {
        borderRadius: heightPixel(8)
    },
    content: {
        flex: 0.45,
        justifyContent: "space-between",
    },
    text_content_wrapper: {
        paddingTop: heightPixel(10)
    }
})

export default styles