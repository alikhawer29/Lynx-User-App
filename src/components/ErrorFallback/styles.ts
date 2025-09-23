import { StyleSheet } from "react-native";
import { heightPixel, widthPixel } from "../../utils/helper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: widthPixel(20),
        paddingVertical: heightPixel(30),
    },
    image: {
        width: heightPixel(120),
        height: heightPixel(120),
        marginBottom: heightPixel(20),
    },
    title: {
        marginBottom: 10,
    },
    message: {
        marginBottom: heightPixel(20),
        lineHeight: 22,
    },
    button: {
        width: "100%",
        paddingHorizontal: widthPixel(30),
    }
})

export default styles