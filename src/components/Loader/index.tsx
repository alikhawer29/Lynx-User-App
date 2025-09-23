import { FC, memo } from "react"
import { View } from "react-native"
import LoaderKitView from "react-native-loader-kit"
import { ILoader } from "../../interfaces"
import colors from "../../utils/colors"
import { heightPixel } from "../../utils/helper"
import Text from "../Text"
import styles from "./styles"

const Loader: FC<ILoader> = ({
    color = colors.secondary,
    type = "BallSpinFadeLoader",
    vertical = 0,
    size = 30,
    text
}) => {
    return (
        <View style={[styles.container, { marginVertical: heightPixel(vertical) }]}>
            <LoaderKitView
                style={[styles.loader, { width: size, height: size }]}
                name={type}
                animationSpeedMultiplier={1.0}
                color={color}
            />
            {
                text ? (
                    <Text
                        position="center"
                        color={color}
                        style={styles.text}
                    >
                        {text}
                    </Text>
                ) : null
            }
        </View>
    )
}

export default memo(Loader)