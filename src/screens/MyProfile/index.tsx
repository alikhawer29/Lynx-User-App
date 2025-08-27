import { View } from "react-native"
import Button from "../../components/Button"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
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
        <Wrapper>
            <View>
                <Row style={styles.row}>
                    <View style={styles.item}>
                        <Text size={16} weight="semibold">
                            First Name
                        </Text>
                        <Text color={colors.dark_gray}>{user?.first_name}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text size={16} weight="semibold">
                            Last Name
                        </Text>
                        <Text color={colors.dark_gray}>{user?.last_name}</Text>
                    </View>
                </Row>
                <Row style={styles.row}>
                    <View style={styles.item}>
                        <Text size={16} weight="semibold">
                            Email Address
                        </Text>
                        <Text color={colors.dark_gray} lines={1}>
                            {user?.email}
                        </Text>
                    </View>
                    <View style={styles.item}>
                        <Text size={16} weight="semibold">
                            Phone Number
                        </Text>
                        <Text color={colors.dark_gray}>
                            ({user?.dialing_code}) {user?.phone}
                        </Text>
                    </View>
                </Row>
                <Row style={styles.row}>
                    <View style={styles.item}>
                        <Text size={16} weight="semibold">
                            Language
                        </Text>
                        <Text color={colors.dark_gray}>{user?.language || "-"}</Text>
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
        </Wrapper>
    )
}

export default MyProfile