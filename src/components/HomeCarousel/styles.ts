import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { vw, widthPixel } from "../../utils/helper";

const styles = StyleSheet.create({
    page: {
        width: vw * 100 - widthPixel(50),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    dot: {
        width: widthPixel(7),
        height: widthPixel(7),
        borderRadius: 4,
        marginHorizontal: widthPixel(1.5),
        backgroundColor: colors.medium_gray
    },
    active_dot: {
        width: widthPixel(14),
        height: widthPixel(7),
        borderRadius: 4,
        marginHorizontal: widthPixel(1.5),
        backgroundColor: colors.secondary
    }
})

export default styles