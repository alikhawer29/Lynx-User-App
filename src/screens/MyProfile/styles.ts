import { StyleSheet } from "react-native"
import colors from "../../utils/colors"
import { heightPixel } from "../../utils/helper"

const styles = StyleSheet.create({
    row: {
        marginVertical: heightPixel(15),
    },
    item: {
        width: "50%",
    },
    actions_container: {
        marginVertical: heightPixel(25),
    },
    actions_row: {
        marginBottom: heightPixel(10),
    },
    button: {
        width: "49%",
    },
    delete_button: {
        backgroundColor: colors.danger,
        borderColor: colors.danger,
    },
})

export default styles