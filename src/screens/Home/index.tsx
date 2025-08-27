import { useCallback } from "react"
import { ImageBackground, View } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import images from "../../assets/images"
import HomeCarousel from "../../components/HomeCarousel"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import colors from "../../utils/colors"
import { navigate } from "../../utils/navigation"
import { NAVIGATORS, ROUTES } from "../../utils/routes"
import styles from "./styles"

const Home = () => {

    const onPressViewAll = useCallback(() => {
        navigate(NAVIGATORS.SERVICE_STACK, { screen: ROUTES.SERVICES })
    }, [])

    return (
        <Wrapper scroll>
            <ImageBackground
                source={images.home_banner}
                style={styles.banner}
                imageStyle={styles.banner_image}
            >
                <LinearGradient
                    colors={[colors.transparent, colors.black]}
                    style={styles.banner_gradient}
                >
                    <Text size={22} line_height={32} color={colors.white} weight="bold">Lynx Consultancy</Text>
                    <Text size={15} line_height={18} color={colors.white} weight="bold" style={styles.banner_subtitle}>
                        Offers bespoke services, catering to our clients
                    </Text>
                </LinearGradient>
            </ImageBackground>
            <View style={styles.section}>
                <Row align="center" justify="space-between">
                    <Text size={23} line_height={32} weight="bold">All Services</Text>
                    <Text
                        color={colors.primary}
                        underline
                        weight="bold"
                        onPress={onPressViewAll}
                    >
                        View All
                    </Text>
                </Row>
                <HomeCarousel />
            </View>
            <View style={styles.section}>
                <Text size={23} line_height={32} weight="bold">About Lynx Consultancy</Text>
                <Text style={styles.about_text}>
                    We provide reliable and skilled staffing solutions to meet your
                    healthcare facility’s needs. From short-term coverage to
                    long-term placements, our professionals are ready to step in with
                    confidence and care. Let us help you maintain quality patient care
                    with dependable support.
                </Text>
            </View>
        </Wrapper>
    )
}

export default Home
