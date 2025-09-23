import { ImageBackground, View } from "react-native"
import images from "../../assets/images"
import Button from "../../components/Button"
import Icon from "../../components/Icon"
import Row from "../../components/Row"
import Text from "../../components/Text"
import colors from "../../utils/colors"
import styles from "./styles"
import useMyProfileController from "./useMyProfileController"

const MyProfile = () => {

    const {
        values: {
            user
        },
        functions: {
            onDeleteAccount,
            onChangePassword,
            onEditProfile
        }
    } = useMyProfileController()

    return (
        <ImageBackground
            source={images.cover_photo}
            style={styles.background}
            imageStyle={styles.background_image}
        >
            <View style={styles.container}>
                <View style={styles.profile_icon_wrapper}>
                    <Icon source={{ uri: user?.image_url }} size={110} rounded no_padding resize="cover" />
                </View>
                <View style={styles.content}>
                    <Row style={styles.row}>
                        <View style={styles.left_item}>
                            <Text size={16} weight="semibold">
                                First Name
                            </Text>
                            <Text color={colors.dark_gray}>{user?.first_name}</Text>
                        </View>
                        <View style={styles.right_item}>
                            <Text size={16} weight="semibold">
                                Last Name
                            </Text>
                            <Text color={colors.dark_gray}>{user?.last_name}</Text>
                        </View>
                    </Row>

                    <Row style={styles.row}>
                        <View style={styles.left_item}>
                            <Text size={16} weight="semibold">
                                Email Address
                            </Text>
                            <Text color={colors.dark_gray} lines={1}>
                                {user?.email}
                            </Text>
                        </View>
                        <View style={styles.right_item}>
                            <Text size={16} weight="semibold">
                                Phone Number
                            </Text>
                            <Text color={colors.dark_gray}>
                                (+{user?.dialing_code}) {user?.phone}
                            </Text>
                        </View>
                    </Row>

                    <Row style={styles.row}>
                        <View style={styles.left_item}>
                            <Text size={16} weight="semibold">
                                Language
                            </Text>
                            <Text color={colors.dark_gray} capitalize>{user?.language || "-"}</Text>
                        </View>
                    </Row>

                    <View style={styles.actions_container}>
                        <Row justify="space-between" style={styles.actions_row}>
                            <Button
                                text="Edit Profile"
                                style={styles.button}
                                onPress={onEditProfile}
                            />
                            <Button
                                text="Delete Account"
                                type="custom"
                                style={[styles.button, styles.delete_button]}
                                onPress={onDeleteAccount}
                            />
                        </Row>
                        <Button
                            text="Change Password"
                            type="secondary"
                            onPress={onChangePassword}
                        />
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default MyProfile