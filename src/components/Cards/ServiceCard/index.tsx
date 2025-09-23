import { FC, memo } from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"
import images from "../../../assets/images"
import { IServiceCard } from "../../../interfaces"
import { selectLoggedIn } from "../../../redux/Slices/AuthSlice"
import colors from "../../../utils/colors"
import Badge from "../../Badge"
import Icon from "../../Icon"
import Image from "../../Image"
import Ratings from "../../Ratings"
import Row from "../../Row"
import Text from "../../Text"
import Touchable from "../../Touchable"
import styles from "./styles"

const ServiceCard: FC<IServiceCard> = ({ data, onPress, onFavorite }) => {

    const {
        name,
        category,
        description,
        rating,
        review_count,
        image_url,
        is_favorite,
    } = data

    const authorized = useSelector(selectLoggedIn)

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <View style={styles.image_wrapper}>
                <Image
                    source={{ uri: image_url }}
                    style={styles.image}
                    resize="cover"
                />
            </View>
            <View style={styles.content}>
                <Row align="center" justify="space-between">
                    <Row align="center" gap={8}>
                        <Text size={20} weight="bold" line_height={22}>{name}</Text>
                        <Badge text={`Category Type: ${category.name}`} />
                    </Row>
                    {
                        authorized &&
                        <Icon
                            source={is_favorite ? images.filled_heart : images.heart}
                            size={25}
                            rounded
                            border={colors.light_gray}
                            less_padding
                            tint_color={is_favorite ? colors.danger : colors.dark_gray}
                            onPress={onFavorite}
                        />
                    }
                </Row>
                <Text size={12.5} color={colors.dark_gray} lines={3}>
                    {description}
                </Text>
                <Row align="center" justify="space-between">
                    <Row gap={15} align="center">
                        <Text size={16} weight="bold" color={colors.primary}>
                            Normal: ${category.price.normal}
                        </Text>
                        <Text size={16} weight="bold" color={colors.primary}>
                            Premium: ${category.price.premium}
                        </Text>
                    </Row>
                    <Ratings review_count={review_count} rating={rating} />
                </Row>
            </View>
        </Touchable>
    )
}

export default memo(ServiceCard)
