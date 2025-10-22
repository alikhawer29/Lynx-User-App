import { FC, memo } from "react";
import { View } from "react-native";
import images from "../../../assets/images";
import { IContentCard } from "../../../interfaces";
import colors from "../../../utils/colors";
import { dateFormatter } from "../../../utils/helper";
import Icon from "../../Icon";
import Image from "../../Image";
import Row from "../../Row";
import Text from "../../Text";
import Touchable from "../../Touchable";
import styles from "./styles";

const ContentCard: FC<IContentCard> = ({ data, type, onPress }) => {

    const {
        title,
        description,
        media_url,
        media_thumbnail_url,
        createdAt
    } = data;

    return (
        <Touchable onPress={onPress} style={styles.container}>
            <View style={styles.image_wrapper}>
                <Image
                    source={{ uri: type === "video" ? media_thumbnail_url : media_url }}
                    style={styles.image}
                    resize="cover"
                />
                {type === "video" && (
                    <View style={styles.play_icon_overlay}>
                        <Icon size={50} color={colors.white} rounded source={images.play} />
                    </View>
                )}
            </View>
            <View style={styles.content}>
                <View style={styles.title_row}>
                    <View style={type === "article" ? styles.title_container : { width: "100%" }}>
                        <Text size={20} weight="bold" line_height={28} lines={1}>
                            {title}
                        </Text>
                    </View>
                    {type === "article" && (
                        <Row style={styles.date_row} justify="flex-end" align="center" gap={5}>
                            <Icon source={images.calendar} tint_color={colors.dark_gray} size={12} />
                            <Text size={12}>{dateFormatter(createdAt)}</Text>
                        </Row>
                    )}
                </View>

                <Text size={12.5} color={colors.dark_gray} lines={3} style={styles.description}>
                    {description}
                </Text>

                {type === "article" ? (
                    <Text size={12} color={colors.primary} weight="bold" underline style={styles.read_more_text}>
                        Start Reading
                    </Text>
                ) : (
                    <Row align="center" gap={5} style={styles.date_row_bottom}>
                        <Icon source={images.calendar} tint_color={colors.dark_gray} size={12} />
                        <Text size={12}>{dateFormatter(createdAt)}</Text>
                    </Row>
                )}
            </View>
        </Touchable>
    );
};

export default memo(ContentCard);
