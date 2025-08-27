import { View } from "react-native"
import colors from "../../utils/colors"
import Text from "../Text"
import Wrapper from "../Wrapper"

const UnderDevelopment = () => {
    return (
        <Wrapper>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text size={24} line_height={50} weight="bold" color={colors.primary}>Under Development ...</Text>
            </View>
        </Wrapper>
    )
}

export default UnderDevelopment