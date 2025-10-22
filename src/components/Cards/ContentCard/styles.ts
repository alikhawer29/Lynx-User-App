import { StyleSheet } from "react-native";
import colors from "../../../utils/colors";
import { heightPixel, widthPixel } from "../../../utils/helper";

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.light_gray,
        height: heightPixel(306),
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: heightPixel(8),
    },

    image_wrapper: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        width: "100%",
        height: "100%",
        borderRadius: heightPixel(8),
    },

    content: {
        flex: 0.5,
        justifyContent: "space-between",
        paddingVertical: heightPixel(14),
        paddingHorizontal: widthPixel(12),
    },

    play_icon_overlay: {
        position: "absolute",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },

    title_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: heightPixel(6),
    },

    title_container: {
        width: "70%",
    },

    date_row: {
        width: "30%",
    },

    description: {
        marginVertical: heightPixel(6),
    },

    read_more_text: {
        marginTop: heightPixel(6),
    },

    date_row_bottom: {
        marginTop: heightPixel(8),
    },

    icon_small: {
        width: widthPixel(12),
        height: widthPixel(12),
        tintColor: colors.dark_gray,
        marginRight: widthPixel(5),
    },
});

export default styles;
