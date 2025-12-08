import { ScrollView, View } from "react-native"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Image from "../../components/Image"
import Loader from "../../components/Loader"
import Ratings from "../../components/Ratings"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import Wrapper from "../../components/Wrapper"
import { ServiceData } from "../../interfaces"
import colors from "../../utils/colors"
import styles from "./styles"
import useServiceDetailsController from "./useServiceDetailsController"

const ServiceDetails = () => {

    const {
        values: {
            data,
            isLoading,
            selected,
            visitType
        },
        functions: {
            onBookAppointment,
            onSelectTier,
            onSelectVisitType,
            onViewReviews
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
                                <Text size={20} weight="bold" line_height={24}>{service?.name}</Text>
                                <Ratings rating={service?.rating} review_count={service?.review_count} size={16} />
                            </Row>
                            <Row align="center" justify="space-between">
                                {service?.category && <Badge text={`Category Type: ${service.category.name}`} size={13} />}
                                <Touchable onPress={onViewReviews}>
                                    <Text
                                        size={16}
                                        weight="bold"
                                        color={colors.primary}
                                        underline
                                    >
                                        View Reviews
                                    </Text>
                                </Touchable>
                            </Row>
                        </View>

                        <Text color={colors.dark_gray}>
                            <Text weight="bold" color={colors.dark_gray}>Description:</Text> {service?.description}
                        </Text>

                        <Row gap={10} justify="space-evenly" style={styles.card_container}>
                            <Touchable onPress={() => onSelectTier(0)} style={[styles.card, selected === 0 && styles.selected_card]}>
                                <Text color={selected === 0 ? colors.white : colors.black} size={24} weight="bold" line_height={28}>${service?.category?.price?.normal || 0}</Text>
                                <Text color={selected === 0 ? colors.light_gray : colors.dark_gray} weight="semibold">Normal</Text>
                            </Touchable>
                            <Touchable onPress={() => onSelectTier(1)} style={[styles.card, selected === 1 && styles.selected_card]}>
                                <Text color={selected === 1 ? colors.white : colors.black} size={24} weight="bold" line_height={28}>${service?.category?.price?.premium || 0}</Text>
                                <Text color={selected === 1 ? colors.light_gray : colors.dark_gray} weight="semibold">Premium</Text>
                            </Touchable>
                        </Row>
                        <Text color={colors.dark_gray}>
                            <Text weight="bold" color={colors.dark_gray}>Standard:</Text> Regular service providers at base pricing.
                        </Text>
                        <Text color={colors.dark_gray} style={styles.premium_text}>
                            <Text weight="bold" color={colors.dark_gray}>Premium:</Text> More experienced or highly qualified providers at a premium rate.
                        </Text>

                        {/* Visit Type Selection - Only show when service_type is 'both' */}
                        {service?.service_type === 'both' && (
                            <View style={styles.visit_type_section}>
                                <Text size={16} weight="bold" color={colors.black} style={styles.visit_type_title}>
                                    Select Visit Type
                                </Text>
                                <Row gap={10} justify="space-evenly" style={styles.visit_type_container}>
                                    <Touchable
                                        onPress={() => onSelectVisitType('provider_visits_user')}
                                        style={[styles.visit_type_card, visitType === 'provider_visits_user' && styles.selected_visit_card]}
                                    >
                                        <Text
                                            color={visitType === 'provider_visits_user' ? colors.white : colors.black}
                                            size={14}
                                            weight="semibold"
                                            line_height={18}
                                            position="center"
                                        >
                                            Provider Visits You
                                        </Text>
                                    </Touchable>
                                    <Touchable
                                        onPress={() => onSelectVisitType('user_visits_provider')}
                                        style={[styles.visit_type_card, visitType === 'user_visits_provider' && styles.selected_visit_card]}
                                    >
                                        <Text
                                            color={visitType === 'user_visits_provider' ? colors.white : colors.black}
                                            size={14}
                                            weight="semibold"
                                            line_height={18}
                                            position="center"
                                        >
                                            You Visit Provider
                                        </Text>
                                    </Touchable>
                                </Row>
                            </View>
                        )}

                        <Button text="Book an Appointment" type="secondary" style={styles.button} onPress={onBookAppointment} />

                    </ScrollView>
            }
        </Wrapper>
    )
}

export default ServiceDetails