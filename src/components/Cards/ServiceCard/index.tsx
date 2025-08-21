import { FC, memo } from "react"
import { View } from "react-native"
import images from "../../../assets/images"
import { IServiceCard } from "../../../interfaces"
import colors from "../../../utils/colors"
import Icon from "../../Icon"
import Image from "../../Image"
import Ratings from "../../Ratings"
import Row from "../../Row"
import Text from "../../Text"
import styles from "./styles"
import Touchable from "../../Touchable"
import Badge from "../../Badge"

const ServiceCard: FC<IServiceCard> = ({ data, onPress }) => {

    const {
        title,
        category,
        description,
        normal_price,
        premium_price,
        rating,
        review_count,
        image,
        is_favorite,
    } = data

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <View style={styles.image_wrapper}>
                <Image
                    source={image || images.service.one}
                    style={styles.image}
                    resize="cover"
                />
            </View>
            <View style={styles.content}>
                <Row align="center" justify="space-between">
                    <Row align="center" gap={8}>
                        <Text size={20} weight="bold" line_height={22}>{title}</Text>
                        <Badge text={`Category Type: ${category}`} />
                    </Row>
                    <Icon
                        source={images.heart}
                        size={25}
                        rounded
                        border={colors.medium_gray}
                        less_padding
                        tint_color={is_favorite ? colors.danger : colors.medium_gray}
                    />
                </Row>
                <Text size={12.5} color={colors.dark_gray} lines={3}>
                    {description}
                </Text>
                <Row align="center" justify="space-between">
                    <Row gap={15} align="center">
                        <Text size={16} weight="bold" color={colors.primary}>
                            Normal: ${normal_price}
                        </Text>
                        <Text size={16} weight="bold" color={colors.primary}>
                            Premium: ${premium_price}
                        </Text>
                    </Row>
                    <Ratings review_count={review_count} rating={rating} />
                </Row>
            </View>
        </Touchable>
    )
}

export default memo(ServiceCard)
