import { FlatList } from "react-native"
import Wrapper from "../../components/Wrapper"
import { NOTIFICATIONS } from "../../utils/data"
import NotificationCard from "../../components/Cards/NotificationCard"

const Notifications = () => {
    return (
        <Wrapper paddingHorizontal={false}>
            <FlatList
                data={NOTIFICATIONS}
                renderItem={({ item }) => <NotificationCard data={item} />}
                showsVerticalScrollIndicator={false}
            />
        </Wrapper>
    )
}

export default Notifications