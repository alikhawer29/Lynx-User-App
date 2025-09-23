import { FC, memo } from "react"
import images from "../../assets/images"
import { ICheckbox } from "../../interfaces"
import colors from "../../utils/colors"
import { createInsets } from "../../utils/helper"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import Touchable from "../Touchable"
import styles from "./styles"

const Checkbox: FC<ICheckbox> = ({ checked, label, onPress }) => {
    return (
        <Row gap={10} align="center">
            <Touchable style={[styles.container, checked && styles.selected_container]} onPress={onPress} slop={createInsets(15)}>
                {
                    checked &&
                    <Icon source={images.check} size={10} tint_color={colors.primary} />
                }
            </Touchable>
            {
                label &&
                <Text weight="semibold" lines={1}>{label}</Text>
            }
        </Row>
    )
}

export default memo(Checkbox)