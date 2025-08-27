import { FC } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import images from "../../assets/images";
import { selectUser } from "../../redux/Slices/AuthSlice";
import { getGreetingText } from "../../utils/helper";
import Icon from "../Icon";
import Row from "../Row";
import Text from "../Text";

const ProfileViewer: FC = () => {

    const user = useSelector(selectUser)

    return (
        <Row align="center" gap={12}>
            <Icon source={images.profile} size={44} />
            <View>
                <Text size={12}>{getGreetingText()}</Text>
                <Text size={23} weight="bold">{`Hi, ${user.first_name} ${user.last_name} 👋🏻`}</Text>
            </View>
        </Row>
    )
}

export default ProfileViewer