import { ScrollView, View, Modal } from "react-native"
import Badge from "../../components/Badge"
import Button from "../../components/Button"
import Image from "../../components/Image"
import Row from "../../components/Row"
import Text from "../../components/Text"
import Touchable from "../../components/Touchable"
import Wrapper from "../../components/Wrapper"
import colors from "../../utils/colors"
import styles from "./styles"
import useServiceDateTimeController from "./useServiceDateTimeController"
import images from "../../assets/images"
import Icon from "../../components/Icon"
import CountryPicker from 'react-native-country-picker-modal'
import { useState } from "react"

const ServiceDateTime = () => {
    const [showConfirm, setShowConfirm] = useState(false)

    const {
        values: {
            service,
            selectedTier,
            address,
            floor,
            lat,
            lng,
            firstName,
            lastName,
            phone,
            phoneCountry,
            phoneDialingCode,
            email,
            sessionTime,
            sessionDate,
            selectedTimeSlot,
            availableHours,
            isBookingLoading
        },
        functions: {
            onSelectSessionTime,
            onSelectSessionDate,
            onContinue,
            onEditAddress,
            onEditContact,
            onViewAddress,
            onEditService
        }
    } = useServiceDateTimeController()

    if (!service) {
        return null
    }

    const price = selectedTier === 0 ? service.category.price.normal : service.category.price.premium

    return (
        <Wrapper>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scroll_content}
            >
                <Image
                    source={{ uri: service.image_url }}
                    style={styles.service_image}
                    resize="cover"
                />

                <Row align="center" justify="space-between" style={styles.header_row}>
                    <View>
                        <Text size={20} weight="bold" line_height={24}>{service.name}</Text>
                        <Badge text={`Category Type: ${service.category.name}`} size={13} />
                    </View>
                    <Text size={20} weight="bold" color={colors.primary}>${price}</Text>
                </Row>

                <Text size={14} color={colors.dark_gray} style={styles.price_label}>Normal Price</Text>

                {/* Address Details Section */}
                <View style={styles.section}>
                    <Row align="center" justify="space-between" style={{ marginBottom: 15 }}>
                        <Text size={18} weight="bold" line_height={22}>Address Details</Text>
                        {address && (
                            <Row gap={5}>
                                <Text size={14} weight="bold" color={colors.primary} underline onPress={onViewAddress}>
                                    View
                                </Text>
                                <Text size={14} color={colors.dark_gray}>/</Text>
                                <Text size={14} weight="bold" color={colors.primary} underline onPress={onEditAddress}>
                                    Edit
                                </Text>
                            </Row>
                        )}
                    </Row>
                    {address ? (
                        <View>
                            <Text size={14} weight="semibold" color={colors.black}>
                                {address.split(',')[0]}
                                {floor && `, ${floor}`}
                            </Text>
                            <Text size={14} color={colors.dark_gray} style={{ marginTop: 2 }}>
                                {address.split(',').slice(1).join(',').trim()}
                            </Text>
                        </View>
                    ) : (
                        <Text size={14} color={colors.dark_gray}>No address selected</Text>
                    )}
                </View>

                {/* Contact Details Section */}
                <Touchable style={styles.section} onPress={onEditContact}>
                    <Row align="center" justify="space-between">
                        <Text size={18} weight="bold" line_height={22}>Contact Details</Text>
                        <Text size={14} weight="bold" color={colors.primary} underline>Edit</Text>
                    </Row>
                    <View style={styles.contact_grid}>
                        <View style={styles.contact_item}>
                            <Text size={12} color={colors.dark_gray}>First Name*</Text>
                            <Text size={14} weight="semibold">{firstName || '-'}</Text>
                        </View>
                        <View style={styles.contact_item}>
                            <Text size={12} color={colors.dark_gray}>Last Name*</Text>
                            <Text size={14} weight="semibold">{lastName || '-'}</Text>
                        </View>
                        <View style={styles.contact_item}>
                            <Text size={12} color={colors.dark_gray}>Phone Number*</Text>
                            {phone ? (
                                <Row align="center" gap={5}>
                                    <CountryPicker
                                        countryCode={phoneCountry as any || 'AE'}
                                        withFlag
                                        withEmoji={false}
                                        withFilter={false}
                                        withAlphaFilter={false}
                                        withCallingCode={false}
                                        withCountryNameButton={false}
                                        containerButtonStyle={{ padding: 0, margin: 0 }}
                                    />
                                    <Text size={14} weight="semibold">{phone}</Text>
                                </Row>
                            ) : (
                                <Text size={14} weight="semibold">-</Text>
                            )}
                        </View>
                        <View style={styles.contact_item}>
                            <Text size={12} color={colors.dark_gray}>Email Address*</Text>
                            <Text size={14} weight="semibold">{email || '-'}</Text>
                        </View>
                    </View>
                </Touchable>

                {/* Service Details Section */}
                <View style={styles.section}>
                    <Row align="center" justify="space-between" style={{ marginBottom: 15 }}>
                        <Text size={18} weight="bold" line_height={22}>Service Details</Text>
                        <Text size={14} weight="bold" color={colors.primary} underline onPress={onEditService}>
                            Edit
                        </Text>
                    </Row>

                    {/* Session Time */}
                    <View style={styles.detail_item}>
                        <Text size={14} weight="semibold" style={styles.detail_label}>Session Time</Text>
                        <Row align="center" gap={5}>
                            <Icon source={images.calendar} size={16} tint_color={colors.dark_gray} />
                            <Text size={14} color={colors.black}>
                                {selectedTimeSlot || 'No time slot selected'}
                            </Text>
                        </Row>
                    </View>

                    {/* Session Date */}
                    <View style={styles.detail_item}>
                        <Text size={14} weight="semibold" style={styles.detail_label}>Session Date</Text>
                        <Row align="center" gap={5}>
                            <Icon source={images.calendar} size={16} tint_color={colors.dark_gray} />
                            <Text size={14} color={colors.black}>
                                {sessionDate || 'Select Date'}
                            </Text>
                        </Row>
                    </View>

                </View>

                <Button
                    text="Book Service"
                    type="primary"
                    style={styles.continue_button}
                    // onPress={onContinue}
                    onPress={() => setShowConfirm(true)}

                    loading={isBookingLoading}
                />
            </ScrollView>

            <Modal
                visible={showConfirm}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowConfirm(false)}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20
                }}>
                    <View style={{
                        backgroundColor: "#fff",
                        padding: 25,
                        borderRadius: 20,
                        alignItems: "center",
                        width: "100%",
                        maxWidth: 340,
                        position: "relative"
                    }}>
                        {/* Close Button */}
                        <Touchable
                            onPress={() => setShowConfirm(false)}
                            style={{
                                position: "absolute",
                                top: 15,
                                right: 15,
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: "#F0F0F0",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text size={16} color={colors.dark_gray}>✕</Text>
                        </Touchable>

                        {/* Warning Icon */}
                        <View style={{
                            width: 70,
                            height: 70,
                            borderRadius: 35,
                            backgroundColor: "#FF4D4D20",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 15
                        }}>
                            <Text size={40} color={colors.danger}>!</Text>
                        </View>

                        {/* Title */}
                        <Text size={20} weight="bold" style={{ marginBottom: 8 }}>
                            Booking
                        </Text>

                        {/* Subtitle */}
                        <Text size={14} color={colors.dark_gray} style={{ textAlign: "center", marginBottom: 25 }}>
                            Are You Sure You Want To Book Service?
                        </Text>

                        {/* Buttons */}
                        <Row justify="space-between" style={{ width: "100%", gap: 10 }}>
                            <Button
                                text="Yes"
                                type="primary"
                                style={{ flex: 1 }}
                                onPress={() => {
                                    setShowConfirm(false)
                                    onContinue()
                                }}
                            />

                            <Button
                                text="No"
                                type="secondary"
                                style={{ flex: 1, backgroundColor: colors.dark_gray }}
                                onPress={() => setShowConfirm(false)}
                            />
                        </Row>
                    </View>
                </View>
            </Modal>

        </Wrapper>
    )
}

export default ServiceDateTime

