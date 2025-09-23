import React, { FC } from "react"
import { View } from "react-native"
import images from "../../assets/images"
import { IEmpty } from "../../interfaces"
import colors from "../../utils/colors"
import Icon from "../Icon"
import Text from "../Text"
import styles from "./styles"

const Empty: FC<IEmpty> = ({ label = "No Data Found" }) => {
    return (
        <View style={styles.container}>
            <Icon
                source={images.no_data}
                size={50}
                tint_color={colors.icon_gray}
            />
            <Text style={styles.text} size={16} color={colors.icon_gray}>
                {label}
            </Text>
        </View>
    )
}

export default Empty


