import { StyleSheet } from "react-native";
import { heightPixel } from "../../utils/helper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: heightPixel(80),
    },
    text: {
        marginTop: heightPixel(10),
    },
})

export default styles