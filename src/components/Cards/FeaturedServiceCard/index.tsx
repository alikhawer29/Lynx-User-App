import { FC, memo } from "react"
import { View } from "react-native"
import images from "../../../assets/images"
import { IServiceCard } from "../../../interfaces"
import colors from "../../../utils/colors"
import Button from "../../Button"
import Icon from "../../Icon"
import Image from "../../Image"
import Ratings from "../../Ratings"
import Row from "../../Row"
import Text from "../../Text"
import styles from "./styles"

const FeaturedServiceCard: FC<IServiceCard> = ({ data, onPress }) => {

    const {
        title,
        normal_price,
        rating,
        review_count,
        image,
        is_favorite,
    } = data

    return (
        <View style={styles.container}>
            <View style={styles.image_wrapper}>
                <Image
                    source={image || images.service.one}
                    style={styles.image}
                    resize="cover"
                />
            </View>
            <View style={styles.content}>
                <View style={styles.text_content_wrapper}>
                    <Row align="center" justify="space-between">
                        <Text size={15} weight="bold">{title}</Text>
                        <Icon
                            source={images.heart}
                            size={20}
                            rounded
                            border={colors.medium_gray}
                            less_padding
                            tint_color={is_favorite ? colors.danger : colors.medium_gray}
                        />
                    </Row>
                    <Ratings rating={rating} review_count={review_count} />
                    <Text weight="bold">${normal_price}</Text>
                </View>
                <Button text="View Details" font_size={12} onPress={onPress} height={35} />
            </View>
        </View>
    )
}

export default memo(FeaturedServiceCard)
