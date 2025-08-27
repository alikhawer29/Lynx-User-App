import { DrawerContentScrollView } from "@react-navigation/drawer"
import { View } from "react-native"
import images from "../../assets/images"
import { useModal } from "../../contexts/ModalContext"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { logout, selectLoggedIn } from "../../redux/Slices/AuthSlice"
import colors from "../../utils/colors"
import { navigate, navigateAndSimpleReset } from "../../utils/navigation"
import { NAVIGATORS, ROUTES } from "../../utils/routes"
import Icon from "../Icon"
import Row from "../Row"
import Text from "../Text"
import styles from "./styles"

const DRAWER_ROUTES = [
    {
        key: "home",
        title: "Home",
        icon: images.drawer_icons.home,
        route: NAVIGATORS.BOTTOM,
    },
    {
        key: "appointments",
        title: "My Appointments",
        icon: images.drawer_icons.appointments,
        route: NAVIGATORS.BOTTOM,
    },
    {
        key: "educational",
        title: "Educational Content",
        icon: images.drawer_icons.educational,
        route: NAVIGATORS.BOTTOM,
    },
    {
        key: "offline",
        title: "Offline Content",
        icon: images.drawer_icons.offline,
        route: NAVIGATORS.BOTTOM,
    },
    {
        key: "wishlist",
        title: "Wishlist",
        icon: images.drawer_icons.wishlist,
        route: NAVIGATORS.BOTTOM,
    },
    {
        key: "faqs",
        title: "FAQ’s",
        icon: images.drawer_icons.faqs,
        route: NAVIGATORS.HELP_DESK_STACK,
    },
    {
        key: "about",
        title: "About Us",
        icon: images.drawer_icons.about,
        route: NAVIGATORS.HELP_DESK_STACK,
    },
    {
        key: "contact",
        title: "Contact Us",
        icon: images.drawer_icons.contact,
        route: NAVIGATORS.HELP_DESK_STACK,
    },
]

const DrawerBar = (props) => {

    const dispatch = useAppDispatch()
    const { showYesNoModal } = useModal()
    const isLoggedIn = useAppSelector(selectLoggedIn)

    const onPressLogout = () => {
        showYesNoModal(
            {
                type: "error",
                title: "Logout",
                message: "Are you sure you want to logout?",
            },
            () => {
                dispatch(logout())
                props?.navigation?.closeDrawer()
            }
        )
    }

    const routesToRender = isLoggedIn
        ? DRAWER_ROUTES
        : DRAWER_ROUTES.filter(
            (item) => ["home", "about", "contact"].includes(item.key)
        )

    return (
        <DrawerContentScrollView {...props}>
            <View style={[styles.drawer_item]}>
                <Icon source={images.logo} size={180} />
            </View>

            {routesToRender.map((item) => (
                <Row
                    key={item.key}
                    gap={12}
                    align="center"
                    style={[styles.drawer_item]}
                    onPress={() => navigate(item.route)}
                >
                    <Icon
                        source={item.icon}
                        size={44}
                        tint_color={colors.black}
                        rounded
                        less_padding
                        color={colors.transparent_white}
                        border={colors.medium_gray}
                    />
                    <Text size={16} weight="semibold">
                        {item.title}
                    </Text>
                </Row>
            ))}

            {isLoggedIn && (
                <Row
                    gap={12}
                    align="center"
                    style={[styles.drawer_item]}
                    onPress={onPressLogout}
                >
                    <Icon
                        source={images.drawer_icons.logout}
                        size={44}
                        tint_color={colors.danger}
                        rounded
                        less_padding
                        color={colors.light_danger}
                        border={colors.danger}
                    />
                    <Text size={16} weight="semibold">
                        Log Out
                    </Text>
                </Row>
            )}
        </DrawerContentScrollView>
    )
}

export default DrawerBar