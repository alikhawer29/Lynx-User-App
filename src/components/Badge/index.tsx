import { FC, memo } from "react"
import { View } from "react-native"
import { IBadge } from "../../interfaces"
import Text from "../Text"
import styles from "./styles"

const Badge: FC<IBadge> = ({ text, size = 10 }) => {
    return (
        <View style={styles.container}>
            <Text size={size}>{text}</Text>
        </View>
    )
}

export default memo(Badge)