import { useState } from "react"
import { SectionList, View } from "react-native"
import NotificationCard from "../../components/Cards/NotificationCard"
import Dropdown from "../../components/Dropdown"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import colors from "../../utils/colors"
import { NOTIFICATIONS } from "../../utils/data"
import { GLOBAL_HORIZONTAL_PADDING, groupNotifications, heightPixel } from "../../utils/helper"

const Notifications = () => {
    const [showing, setShowing] = useState("all")

    const filtered = NOTIFICATIONS.filter(item => {
        if (showing === "read") return item.read
        if (showing === "unread") return !item.read
        return true
    })

    const sections = groupNotifications(filtered)

    return (
        <Wrapper paddingHorizontal={false}>
            <Row
                align="center"
                justify="space-between"
                style={{ paddingHorizontal: GLOBAL_HORIZONTAL_PADDING, marginBottom: heightPixel(10) }}
            >
                <Row style={{ width: "40%" }} align="center" gap={5}>
                    <Text>Showing:</Text>
                    <Dropdown
                        height={40}
                        options={[
                            { label: "All", value: "all" },
                            { label: "Read", value: "read" },
                            { label: "Unread", value: "unread" }
                        ]}
                        value={showing}
                        onChangeText={(e) => setShowing(e?.value)}
                    />
                </Row>
                <Row style={{ width: "50%" }} justify="flex-end">
                    <Text underline color={colors.primary}>Mark All As Read</Text>
                </Row>
            </Row>

            <SectionList
                sections={sections}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <NotificationCard data={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={{ paddingHorizontal: GLOBAL_HORIZONTAL_PADDING, paddingVertical: heightPixel(5) }}>
                        <Text size={16}>{title}</Text>
                    </View>
                )}
                showsVerticalScrollIndicator={false}
            />
        </Wrapper>
    )
}

export default Notifications
