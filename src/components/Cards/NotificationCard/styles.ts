import { StyleSheet } from "react-native";
import { GLOBAL_HORIZONTAL_PADDING, heightPixel } from "../../../utils/helper";
import colors from "../../../utils/colors";

const styles = StyleSheet.create({
    container: {
        height: heightPixel(95),
        width: "100%",
        paddingHorizontal: GLOBAL_HORIZONTAL_PADDING,
        marginVertical: heightPixel(10)
    },
    bg_transparent: {
        backgroundColor: colors.transparent
    },
    bg_primary_opacity: {
        backgroundColor: colors.primary_opacity
    },
    icon_wrapper: {
        flex: 0.2
    },
    content: {
        flex: 0.8,
        height: "100%",
        justifyContent: "space-between",
        paddingVertical: heightPixel(12)
    },
    flex_wrapper: {
        flex: 1
    }
})

export default styles