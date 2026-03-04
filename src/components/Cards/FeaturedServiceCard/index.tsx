import { FC, memo } from "react"
import { View } from "react-native"
import { useSelector } from "react-redux"
import images from "../../../assets/images"
import { IServiceCard } from "../../../interfaces"
import { selectLoggedIn } from "../../../redux/Slices/AuthSlice"
import colors from "../../../utils/colors"
import { getServiceTypeLabel } from "../../../utils/data"
import Button from "../../Button"
import Icon from "../../Icon"
import Image from "../../Image"
import Ratings from "../../Ratings"
import Row from "../../Row"
import Text from "../../Text"
import styles from "./styles"

const FeaturedServiceCard: FC<IServiceCard> = ({ data, onPress, onFavorite }) => {

    const {
        name,
        category,
        rating,
        review_count,
        image_url,
        is_favorite,
        service_type,
    } = data

    const serviceTypeLabel = getServiceTypeLabel(service_type)

    const authorized = useSelector(selectLoggedIn)

    return (
        <View style={styles.container}>
            <View style={styles.image_wrapper}>
                <Image
                    source={{ uri: image_url }}
                    style={styles.image}
                    resize="cover"
                />
            </View>
            <View style={styles.content}>
                <View style={styles.text_content_wrapper}>
                    <Row align="center" justify="space-between" gap={8}>
                        <View style={styles.name_wrapper}>
                            <Text size={15} weight="bold" lines={1}>{name}</Text>
                        </View>
                        {
                            authorized &&
                            <Icon
                                source={is_favorite ? images.filled_heart : images.heart}
                                size={20}
                                rounded
                                border={colors.light_gray}
                                less_padding
                                tint_color={is_favorite ? colors.danger : colors.dark_gray}
                                onPress={onFavorite}
                            />
                        }
                    </Row>
                    {serviceTypeLabel ? (
                        <Text size={11} color={colors.primary} style={styles['service_type_text']}>
                            {serviceTypeLabel}
                        </Text>
                    ) : null}
                    <Ratings rating={rating} review_count={review_count} />
                    <Text weight="bold">${category?.price?.normal}</Text>
                </View>
                <Button text="View Details" font_size={12} onPress={onPress} height={35} style={styles.button} />
            </View>
        </View>
    )
}

export default memo(FeaturedServiceCard)
