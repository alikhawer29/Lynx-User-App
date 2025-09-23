import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { heightPixel } from "../../utils/helper";

const styles = StyleSheet.create({
    container: {
        height: heightPixel(20),
        width: heightPixel(20),
        borderWidth: heightPixel(2),
        borderColor: colors.primary,
        borderRadius: heightPixel(6),
        backgroundColor: colors.transparent,
        justifyContent: "center",
        alignItems: "center",
    },
    selected_container: {
        backgroundColor: colors.light_primary,
    }
})

export default styles