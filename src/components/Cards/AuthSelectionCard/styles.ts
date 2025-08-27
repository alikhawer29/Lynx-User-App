import { StyleSheet } from "react-native";
import { heightPixel } from "../../../utils/helper";
import colors from "../../../utils/colors";

const styles = StyleSheet.create({
    container: {
        gap: heightPixel(10),
        height: "100%",
    },
    content_container: {
        flex: 0.7,
        height: "100%",
        justifyContent: "center"
    },
    image_container: {
        flex: 0.3,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    image_wrapper: {
        width: heightPixel(96),
        height: heightPixel(96),
        backgroundColor: colors.medium_primary,
        borderRadius: heightPixel(8),
        justifyContent: "center",
        alignItems: "center",
        padding: heightPixel(30),
        borderWidth: 1,
        borderColor: colors.primary
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
})

export default styles