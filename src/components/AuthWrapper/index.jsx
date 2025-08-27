import { View } from "react-native"
import images from "../../assets/images"
import colors from "../../utils/colors"
import { heightPixel } from "../../utils/helper"
import Icon from "../Icon"
import KeyboardAvoidingWrapper from "../KeyboardAvoidingWrapper"
import Text from "../Text"
import Wrapper from "../Wrapper"

const AuthWrapper = ({ children, title, subtitle, logo = true }) => {
    return (
        <Wrapper>
            <View style={{ flex: 1, width: "100%", alignItems: "center", paddingTop: heightPixel(50) }}>
                <KeyboardAvoidingWrapper>
                    {logo && <Icon source={images.logo} size={120} />}
                    <View style={{ marginVertical: heightPixel(logo ? 20 : 40), width: "80%", gap: heightPixel(6) }}>
                        <Text size={22} weight="bold" line_height={28} position="center">{title}</Text>
                        {subtitle && <Text color={colors.dark_gray} position="center">{subtitle}</Text>}
                    </View>
                    <View style={{ width: "100%" }}>
                        {children}
                    </View>
                </KeyboardAvoidingWrapper>
            </View>
        </Wrapper>
    )
}

export default AuthWrapper