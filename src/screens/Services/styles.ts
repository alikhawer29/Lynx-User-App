import { StyleSheet } from "react-native";
import { heightPixel } from "../../utils/helper";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    filter_container: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "flex-end"
    },
    search_container: {
        flex: 0.85
    },
    red_dot: {
        width: heightPixel(6),
        height: heightPixel(6),
        backgroundColor: colors.danger,
        borderRadius: heightPixel(3),
        position: "absolute",
        top: heightPixel(5),
        right: heightPixel(5),
        zIndex: 99
    }
})

export default styles