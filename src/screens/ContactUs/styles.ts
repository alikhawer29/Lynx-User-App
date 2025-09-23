import { StyleSheet } from "react-native";
import { heightPixel } from "../../utils/helper";

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    button: {
        marginVertical: heightPixel(40),
        width: "100%"
    },
    item: {
        marginBottom: heightPixel(10)
    }
})

export default styles