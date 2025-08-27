import { FC, memo } from "react";
import { View } from "react-native";
import { IAuthSelectionCard } from "../../../interfaces";
import colors from "../../../utils/colors";
import { heightPixel } from "../../../utils/helper";
import Image from "../../Image";
import Row from "../../Row";
import Text from "../../Text";
import styles from "./styles";
import Touchable from "../../Touchable";

const AuthSelectionCard: FC<IAuthSelectionCard> = ({ image, title, description, selected = false, onPress }) => {
    return (
        <Touchable onPress={onPress} style={{ height: heightPixel(116), width: "100%", borderWidth: 1, borderRadius: heightPixel(8), borderColor: selected ? colors.primary : colors.medium_gray }}>
            <Row style={styles.container}>
                <View style={styles.image_container}>
                    <View style={styles.image_wrapper}>
                        <Image source={image} style={styles.image} />
                    </View>
                </View>
                <View style={styles.content_container}>
                    <Text weight="bold" size={18} lines={1}>{title}</Text>
                    <Text size={14} color={colors.dark_gray}>{description}</Text>
                </View>
            </Row>
        </Touchable>
    )
}

export default memo(AuthSelectionCard)