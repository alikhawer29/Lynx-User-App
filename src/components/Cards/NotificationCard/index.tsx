import { FC, memo } from "react"
import { View } from "react-native"
import { INotificationCard } from "../../../interfaces"
import colors from "../../../utils/colors"
import Icon from "../../Icon"
import Row from "../../Row"
import Text from "../../Text"
import styles from "./styles"

const NotificationCard: FC<INotificationCard> = ({ data }) => {

    const { message, date, time, read, image } = data

    return (
        <Row style={[styles.container, read ? styles.bg_transparent : styles.bg_primary_opacity]}>
            <View style={styles.icon_wrapper}>
                <Icon source={image} rounded size={48} no_padding />
            </View>
            <View style={styles.content}>
                <Text size={13} color={colors.pure_black}>{message}</Text>
                <Row justify="space-between">
                    <View style={styles.flex_wrapper}>
                        <Text size={13} color={colors.pure_black}>{date}</Text>
                    </View>
                    <View style={styles.flex_wrapper}>
                        <Text size={13} position="center" color={colors.pure_black}>{time}</Text>
                    </View>
                    <View style={styles.flex_wrapper}>
                        <Text size={13} color={colors.primary} underline position="right">
                            Mark as {read ? "Unread" : "Read"}
                        </Text>
                    </View>
                </Row>
            </View>
        </Row>
    )
}

export default memo(NotificationCard)
