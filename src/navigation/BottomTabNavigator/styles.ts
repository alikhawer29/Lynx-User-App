import { StyleSheet } from "react-native"
import colors from "../../utils/colors"
import { BOTTOMBAR_HEIGHT, GLOBAL_HORIZONTAL_PADDING, heightPixel, widthPixel } from "../../utils/helper"

const styles = StyleSheet.create({
    tab_bar: {
        flexDirection: "row",
        // alignItems: "center",
        height: heightPixel(94),
        backgroundColor: colors.white,
        borderTopLeftRadius: widthPixel(25),
        borderTopRightRadius: widthPixel(25)
        // paddingBottom: BOTTOMBAR_HEIGHT,
        // paddingHorizontal: GLOBAL_HORIZONTAL_PADDING
    },
    tab_item: {
        width: "25%",
        alignItems: "center",
        // justifyContent: "center",,
        paddingTop: heightPixel(15),
        height: "100%"
    },
    active_indicator: {
        position: "absolute",
        top: 0,
        height: heightPixel(3),
        width: "40%",
        borderRadius: widthPixel(2),
        backgroundColor: colors.primary,
    },
})

export default styles