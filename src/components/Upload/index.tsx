import { FC, memo } from "react";
import images from "../../assets/images";
import { IUpload } from "../../interfaces";
import colors from "../../utils/colors";
import Icon from "../Icon";
import Row from "../Row";
import Text from "../Text";

const Upload: FC<IUpload> = ({ text = "Upload", required = false, style }) => {
    return (
        <Row align="center" gap={10} style={style}>
            <Icon source={images.upload} size={24} />
            <Text size={16} weight="semibold">{text} {required && <Text size={12} color={colors.danger}>*</Text>}</Text>
        </Row>
    )
}

export default memo(Upload)