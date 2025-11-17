import { FC, memo } from "react"
import images from "../../assets/images"
import { IRatings } from "../../interfaces"
import colors from "../../utils/colors"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"

const Ratings: FC<IRatings> = ({ review_count, rating, size = 12 }) => {
    return (
        <Row align="center" gap={6}>
            <Icon source={images.star} size={size} />
            {/* <Text color={colors.dark_gray} size={size}>{rating} {review_count ? `(${review_count}+)` : null}</Text> */}
            <Text color={colors.dark_gray} size={size}>
                {rating} {
                    review_count
                        ? `(${review_count > 100 ? "100+" : review_count})`
                        : null
                }
            </Text>
        </Row>
    )
}

export default memo(Ratings)