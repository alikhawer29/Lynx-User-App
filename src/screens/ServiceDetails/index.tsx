import { ScrollView, View } from "react-native"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Image from "../../components/Image"
import Loader from "../../components/Loader"
import Ratings from "../../components/Ratings"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Wrapper from "../../components/Wrapper"
import { ServiceData } from "../../interfaces"
import colors from "../../utils/colors"
import styles from "./styles"
import useServiceDetailsController from "./useServiceDetailsController"

const ServiceDetails = () => {

    const {
        values: {
            data,
            isLoading
        },
        functions: {
            onBookAppointment
        }
    } = useServiceDetailsController()

    const service: ServiceData = data

    return (
        <Wrapper>
            {
                isLoading ?
                    <Loader text="Loading" size={35} vertical={30} /> :
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scroll_content}
                    >
                        <Image
                            source={{ uri: service.image_url }}
                            style={styles.service_image}
                            resize="cover"
                        />

                        <View style={styles.info_section}>
                            <Row align="center" justify="space-between">
                                <Text size={20} weight="bold" line_height={24}>{service.name}</Text>
                                <Ratings rating={service.rating} review_count={service.review_count} size={16} />
                            </Row>
                            <Row align="center" justify="space-between">
                                <Badge text={`Category Type: ${service.category.name}`} size={13} />
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
                                <Text size={24} weight="bold" line_height={28}>${service.category.price.normal}</Text>
                                <Text color={colors.dark_gray} weight="semibold">Normal</Text>
                            </View>
                            <View style={styles.premium_card}>
                                <Text size={24} weight="bold" line_height={28} color={colors.white}>${service.category.price.premium}</Text>
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
            }
        </Wrapper>
    )
}

export default ServiceDetails