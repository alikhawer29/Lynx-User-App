import { useCallback } from "react"
import { ScrollView, View } from "react-native"
import { useSelector } from "react-redux"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Image from "../../components/Image"
import Ratings from "../../components/Ratings"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import { useModal } from "../../contexts/ModalContext"
import { ServiceData } from "../../interfaces"
import { selectLoggedIn } from "../../redux/Slices/AuthSlice"
import colors from "../../utils/colors"
import { SERVICES } from "../../utils/data"
import styles from "./styles"

const ServiceDetails = ({ route }) => {

    const { id } = route.params
    const { showOkModal } = useModal()

    const authorize = useSelector(selectLoggedIn)

    const service: ServiceData = SERVICES.find(item => item.id === id) || SERVICES[0]

    const onBookAppointment = useCallback(() => {
        if (!authorize) {
            showOkModal({
                type: "success",
                title: "Login",
                message: "You have to login first"
            })
        }
    }, [])

    return (
        <Wrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll_content}
            >
                <Image
                    source={service.image}
                    style={styles.service_image}
                    resize="cover"
                />

                <View style={styles.info_section}>
                    <Row align="center" justify="space-between">
                        <Text size={20} weight="bold" line_height={24}>{service.title}</Text>
                        <Ratings rating={service.rating} review_count={service.review_count} size={16} />
                    </Row>
                    <Row align="center" justify="space-between">
                        <Badge text={`Category Type: ${service.category}`} size={13} />
                        <Text
                            size={16}
                            weight="bold"
                            color={colors.primary}
                            underline
                        >
                            View Reviews
                        </Text>
                    </Row>
                </View>

                <Text color={colors.dark_gray}>
                    <Text weight="bold" color={colors.dark_gray}>Description:</Text> {service.description}
                </Text>

                <Row gap={10} justify="space-evenly" style={styles.card_container}>
                    <View style={styles.normal_card}>
                        <Text size={24} weight="bold" line_height={28}>${service.normal_price}</Text>
                        <Text color={colors.dark_gray} weight="semibold">Normal</Text>
                    </View>
                    <View style={styles.premium_card}>
                        <Text size={24} weight="bold" line_height={28} color={colors.white}>${service.premium_price}</Text>
                        <Text color={colors.light_gray} weight="semibold">Premium</Text>
                    </View>
                </Row>

                <Text color={colors.dark_gray}>
                    <Text weight="bold" color={colors.dark_gray}>Standard:</Text> Regular service providers at base pricing.
                </Text>
                <Text color={colors.dark_gray}>
                    <Text weight="bold" color={colors.dark_gray}>Premium:</Text> More experienced or highly qualified providers at a premium rate.
                </Text>

                <Button text="Book an Appointment" type="secondary" style={styles.button} onPress={onBookAppointment} />
            </ScrollView>
        </Wrapper>
    )
}

export default ServiceDetails