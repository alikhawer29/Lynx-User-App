import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { heightPixel, widthPixel } from "../../utils/helper";

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: colors.medium_gray,
        paddingVertical: heightPixel(1.5),
        paddingHorizontal: widthPixel(8),
        borderRadius: heightPixel(100)
    }
})

export default styles