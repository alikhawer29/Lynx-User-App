import { ScrollView, View } from "react-native"
import colors from "../../utils/colors"
import { heightPixel, widthPixel } from "../../utils/helper"

const Wrapper = ({ children, paddingHorizontal = true, scroll = false }) => {

    if (scroll) {
        return (
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: colors.light_primary, paddingHorizontal: paddingHorizontal ? widthPixel(25) : 0, paddingTop: heightPixel(10) }}>
                {children}
            </ScrollView>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.light_primary, paddingHorizontal: paddingHorizontal ? widthPixel(25) : 0, paddingTop: heightPixel(10) }}>
            {children}
        </View>
    )
}

export default Wrapper